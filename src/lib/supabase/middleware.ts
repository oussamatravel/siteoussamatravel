import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // IMPORTANT: Avoid writing any logic between createServerClient and
    // supabase.auth.getUser(). A simple mistake could make it very hard to debug
    // issues with users being randomly logged out.

    const {
        data: { user },
    } = await supabase.auth.getUser()

    const pathname = request.nextUrl.pathname

    // 1. Protéger /dashboard contre les non-authentifiés
    if (!user && pathname.startsWith('/dashboard')) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
    }

    // 2. CRITIQUE: Protéger /admin côté serveur pour les non-authentifiés
    if (!user && pathname.startsWith('/admin')) {
        const url = request.nextUrl.clone()
        url.pathname = '/auth/login'
        return NextResponse.redirect(url)
    }

    // 3. CRITIQUE: Protéger /admin — vérifier le rôle côté serveur
    // Un client authentifié ne doit pas pouvoir accéder aux routes /admin
    if (user && pathname.startsWith('/admin')) {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
        if (!profile || (profile.role !== 'admin' && profile.role !== 'employee')) {
            // Client normal qui tente d'accéder à /admin → rediriger vers /dashboard
            const url = request.nextUrl.clone()
            url.pathname = '/dashboard'
            return NextResponse.redirect(url)
        }
    }

    // 4. Rediriger depuis /auth/login vers la bonne interface si déjà connecté
    if (
        user &&
        (pathname.startsWith('/auth/login') || pathname.startsWith('/auth/register'))
    ) {
        const { data: profile } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .maybeSingle()

        const url = request.nextUrl.clone()
        if (profile && (profile.role === 'admin' || profile.role === 'employee')) {
            url.pathname = '/admin'
        } else {
            url.pathname = '/dashboard'
        }
        return NextResponse.redirect(url)
    }

    // 5. Si un admin/employé atterrit sur /dashboard, le rediriger vers /admin
    if (user && pathname === '/dashboard') {
        const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).maybeSingle()
        if (profile && (profile.role === 'admin' || profile.role === 'employee')) {
            const url = request.nextUrl.clone()
            url.pathname = '/admin'
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}

