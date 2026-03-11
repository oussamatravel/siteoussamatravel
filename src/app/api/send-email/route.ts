import { NextRequest, NextResponse } from 'next/server';
import { sendEmail } from '@/lib/email';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: NextRequest) {
    try {
        if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
            return NextResponse.json({
                error: `Variables secrètes manquantes sur Vercel : URL=${!!process.env.NEXT_PUBLIC_SUPABASE_URL}, ROLE_KEY=${!!process.env.SUPABASE_SERVICE_ROLE_KEY}`
            }, { status: 500 });
        }

        // Instanciation à l'intérieur de la route pour éviter l'erreur de Build Vercel (collect data)
        const supabaseAdmin = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.SUPABASE_SERVICE_ROLE_KEY
        );

        const body = await request.json();
        const { to_user_id, subject, html, text } = body;

        if (!to_user_id || !subject || !html) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        // 1. Récupérer l'ID utilisateur de celui qui fait la requête pour autoriser
        const authHeader = request.headers.get('Authorization');
        if (!authHeader) {
            return NextResponse.json({ error: 'Missing Authorization header' }, { status: 401 });
        }

        // Extraction du token (Bearer xyz)
        const token = authHeader.replace('Bearer ', '');
        const { data: { user }, error: userError } = await supabaseAdmin.auth.getUser(token);

        if (userError || !user) {
            return NextResponse.json({ error: 'Invalid Token' }, { status: 401 });
        }

        // Autoriser seulement admin ou employee
        const { data: profile } = await supabaseAdmin
            .from('profiles')
            .select('role')
            .eq('id', user.id)
            .single();

        if (!profile || (profile.role !== 'admin' && profile.role !== 'employee')) {
            return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
        }

        // 2. Fetch de l'adresse email du client destinataire via auth.users
        const { data: clientUser, error: clientError } = await supabaseAdmin.auth.admin.getUserById(to_user_id);

        if (clientError || !clientUser || !clientUser.user) {
            console.error("Client email not found for ID:", to_user_id);
            return NextResponse.json({ error: 'Client email not found' }, { status: 404 });
        }

        const clientEmail = clientUser.user.email;

        if (!clientEmail) {
            return NextResponse.json({ error: 'Client has no email' }, { status: 400 });
        }

        // 3. Envoyer l'email
        const result = await sendEmail({
            to: clientEmail,
            subject: subject,
            html: html,
            text: text,
        });

        if (result.error) {
            return NextResponse.json({ error: result.error }, { status: 500 });
        }

        return NextResponse.json({ success: true, message: 'Email envoyé avec succès.' }, { status: 200 });

    } catch (error: any) {
        console.error("API send-email error:", error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
