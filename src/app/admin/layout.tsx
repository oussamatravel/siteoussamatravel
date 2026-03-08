"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    Users,
    Files,
    CheckCircle2,
    Clock,
    TrendingUp,
    Settings,
    LogOut,
    Menu,
    X,
    ShieldCheck,
    Bell,
    Search,
    CreditCard,
    MessageSquare,
    BookOpen,
    CalendarCheck
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [counts, setCounts] = useState({ clients: 0, dossiers: 0, rdv: 0, paiements: 0, messages: 0, contacts: 0 });
    const [userRole, setUserRole] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        const fetchCounts = async () => {
            const oneDayAgo = new Date(new Date().getTime() - 24 * 60 * 60 * 1000).toISOString();

            const [
                { count: clientsCount },
                { count: dossiersCount },
                { count: rdvCount },
                { count: paiementsCount },
                { count: messagesCount },
                { count: contactsCount }
            ] = await Promise.all([
                supabase.from('profiles').select('*', { count: 'exact', head: true }).eq('role', 'client').gte('created_at', oneDayAgo),
                supabase.from('applications').select('*', { count: 'exact', head: true }).eq('status', 'en_attente'),
                supabase.from('appointments').select('*', { count: 'exact', head: true }).eq('status', 'en_attente'),
                supabase.from('invoices').select('*', { count: 'exact', head: true }).eq('status', 'en_attente'),
                supabase.from('messages').select('*', { count: 'exact', head: true }).eq('is_read', false),
                supabase.from('contacts').select('*', { count: 'exact', head: true }).eq('is_read', false)
            ]);

            const { data: userData } = await supabase.auth.getUser();
            if (userData.user) {
                const { data: profile } = await supabase.from('profiles').select('role').eq('id', userData.user.id).single();
                if (profile) setUserRole(profile.role);
            }

            setCounts({
                clients: clientsCount || 0,
                dossiers: dossiersCount || 0,
                rdv: rdvCount || 0,
                paiements: paiementsCount || 0,
                messages: messagesCount || 0,
                contacts: contactsCount || 0
            });
        };

        fetchCounts();
        // Polling chaque 30 secondes pour mettre à jour les compteurs
        const interval = setInterval(fetchCounts, 30000);
        return () => clearInterval(interval);
    }, []);

    const allNavigation = [
        { name: "Vue Globale", href: "/admin", icon: <BarChart3 className="w-5 h-5" /> },
        { name: "Gestion Clients", href: "/admin/clients", icon: <Users className="w-5 h-5" /> },
        { name: "Validation Dossiers", href: "/admin/dossiers", icon: <Files className="w-5 h-5" /> },
        { name: "Messagerie", href: "/admin/messages", icon: <MessageSquare className="w-5 h-5" /> },
        { name: "Contacts Publics", href: "/admin/contacts", icon: <Bell className="w-5 h-5" /> },
        { name: "Paiements", href: "/admin/paiements", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Blog", href: "/admin/blog", icon: <BookOpen className="w-5 h-5" /> },
        { name: "Rendez-vous", href: "/admin/rdv", icon: <CalendarCheck className="w-5 h-5" /> },
        { name: "Paramètres Services", href: "/admin/parametres", icon: <Settings className="w-5 h-5" /> },
    ];

    const navigation = allNavigation.filter(item => {
        if (userRole === 'employee') {
            return !["Paiements", "Blog", "Paramètres Services"].includes(item.name);
        }
        return true;
    });

    return (
        <div className="min-h-screen bg-slate-100 flex font-sans">
            {/* Sidebar Admin (Couleur Darker - Indigo/Slate) */}
            <aside className="hidden lg:flex flex-col w-64 bg-slate-950 text-slate-400 border-r border-slate-800 fixed h-full z-40">
                <div className="p-6 border-b border-slate-800 flex items-center justify-between">
                    <Link href="/" className="flex flex-col gap-1">
                        <span className="text-white font-black text-xs tracking-tighter opacity-50">ADMIN PANEL</span>
                        <img
                            src="/logo.png"
                            alt="Oussama Travel Logo"
                            className="h-8 w-auto object-contain"
                        />
                    </Link>
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                </div>

                <nav className="flex-1 py-8 px-4 space-y-1 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;

                        let badgeCount = 0;
                        if (item.name === "Gestion Clients") badgeCount = counts.clients;
                        else if (item.name === "Validation Dossiers") badgeCount = counts.dossiers;
                        else if (item.name === "Rendez-vous") badgeCount = counts.rdv;
                        else if (item.name === "Paiements") badgeCount = counts.paiements;
                        else if (item.name === "Messagerie") badgeCount = counts.messages;
                        else if (item.name === "Contacts Publics") badgeCount = counts.contacts;

                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive
                                    ? "bg-amber-500 text-slate-950 font-black shadow-lg shadow-amber-500/10"
                                    : "hover:bg-slate-900 hover:text-white"
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        <span className="text-sm">{item.name}</span>
                                    </div>
                                    {badgeCount > 0 && (
                                        <span className={`text-[10px] font-black px-2 py-0.5 rounded-full shadow-md ${isActive ? 'bg-slate-950 text-amber-500' : 'bg-red-500 text-white'}`}>
                                            {badgeCount}
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 space-y-4">
                    <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                        <div className="flex items-center gap-2 text-white text-xs font-bold mb-2">
                            <ShieldCheck className={`w-3 h-3 ${userRole === 'admin' ? 'text-amber-500' : 'text-sky-500'}`} />
                            {userRole === 'admin' ? 'ADMIN MODE' : 'STAFF MODE'}
                        </div>
                        <p className="text-[10px] leading-relaxed text-slate-500">Toutes les actions sont enregistrées dans le journal d'audit.</p>
                    </div>
                    <Link href="/">
                        <button className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 rounded-xl transition-all w-full text-sm font-bold">
                            <LogOut className="w-5 h-5" />
                            Quitter l'Admin
                        </button>
                    </Link>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 lg:ml-64 min-h-screen">
                {/* Top Header Admin */}
                <header className="h-20 bg-white border-b border-slate-200 sticky top-0 z-30 px-6 flex items-center justify-between">
                    <div className="relative max-w-md w-full hidden md:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Rechercher un client, un dossier..."
                            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-amber-400 transition-all font-medium"
                        />
                    </div>

                    <div className="flex items-center gap-4">
                        <button className="relative p-2 text-slate-400 hover:bg-slate-50 rounded-xl transition-all">
                            <Bell className="w-5 h-5" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-black text-slate-900 leading-none">{userRole === 'admin' ? 'Admin Oussama' : 'Collaborateur'}</div>
                                <div className={`text-[10px] uppercase mt-1 font-bold ${userRole === 'admin' ? 'text-amber-600' : 'text-sky-600'}`}>
                                    {userRole === 'admin' ? 'Super Utilisateur' : 'Support Client'}
                                </div>
                            </div>
                            <div className="w-10 h-10 rounded-xl bg-slate-950 flex items-center justify-center text-white font-black text-xs border border-slate-800">
                                OA
                            </div>
                        </div>
                    </div>
                </header>

                {/* Dynamic Content */}
                <div className="p-6 lg:p-10">
                    {children}
                </div>
            </main>
        </div>
    );
}
