"use client";

import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, FileCheck2, UserCircle, Bell, LogOut, Menu, X, CreditCard, MessageSquare, Calendar, Home } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import PushNotificationManager from "@/components/PushNotificationManager";


export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(0);
    const supabase = createClient();

    useEffect(() => {
        fetchUnreadCount();

        // Real-time subscription
        const channel = supabase
            .channel('notifications_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'notifications' },
                () => fetchUnreadCount()
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchUnreadCount = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { count, error } = await supabase
            .from('notifications')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (!error && count !== null) {
            setUnreadCount(count);
        }
    };

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push("/auth/login");
        router.refresh();
    };

    const navigation = [
        { name: "Tableau de Bord", href: "/dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
        { name: "Mes Dossiers", href: "/dashboard/dossiers", icon: <FolderOpen className="w-5 h-5" /> },
        { name: "Mes Rendez-vous", href: "/dashboard/rdv", icon: <Calendar className="w-5 h-5" /> },
        { name: "Messagerie", href: "/dashboard/messages", icon: <MessageSquare className="w-5 h-5" /> },
        { name: "Mes Documents", href: "/dashboard/documents", icon: <FileCheck2 className="w-5 h-5" /> },
        { name: "Paiements", href: "/dashboard/paiements", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Mon Profil", href: "/dashboard/profil", icon: <UserCircle className="w-5 h-5" /> },
        { name: "Notifications", href: "/dashboard/notifications", icon: <Bell className="w-5 h-5" /> },
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar Desktop */}
            <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 border-r border-slate-800 fixed h-full z-40">
                <div className="p-6 border-b border-slate-800">
                    <Link href="/" className="flex items-center gap-2">
                        <img
                            src="/logo.png"
                            alt="Oussama Travel Logo"
                            className="h-10 w-auto object-contain"
                        />
                    </Link>
                </div>

                <nav className="flex-1 py-6 px-4 space-y-2 overflow-y-auto">
                    {navigation.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link key={item.name} href={item.href}>
                                <div className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? "bg-amber-500 text-gray-900 font-bold shadow-lg shadow-amber-500/20" : "hover:bg-slate-800 hover:text-white"
                                    }`}>
                                    <div className="flex items-center gap-3">
                                        {item.icon}
                                        {item.name}
                                    </div>
                                    {item.name === "Notifications" && unreadCount > 0 && (
                                        <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm animate-pulse">
                                            {unreadCount}
                                        </div>
                                    )}
                                </div>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-slate-800 space-y-2 bg-slate-900 relative z-10 shrink-0">
                    <Link href="/">
                        <button className="flex items-center gap-3 px-4 py-3 text-sky-400 hover:bg-sky-400/10 hover:text-sky-300 rounded-xl transition-all w-full text-left font-bold border border-sky-500/10">
                            <Home className="w-5 h-5" />
                            Retour au Site
                        </button>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-400/10 hover:text-red-300 rounded-xl transition-all w-full text-left"
                    >
                        <LogOut className="w-5 h-5" />
                        Déconnexion
                    </button>
                </div>
            </aside>

            {/* Header Mobile */}
            <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white z-50 flex items-center justify-between p-4 border-b border-slate-800">
                <Link href="/" className="flex items-center gap-2">
                    <img
                        src="/logo.png"
                        alt="Oussama Travel Logo"
                        className="h-8 w-auto object-contain"
                    />
                </Link>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="flex items-center gap-2 p-2 px-4 shadow-sm bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors text-sm font-bold">
                    {isMobileMenuOpen ? "Fermer" : "Menu"}
                    {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </button>
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 top-[73px] bg-slate-900 z-40 p-4 border-t border-slate-800 overflow-y-auto pb-24">
                    <nav className="space-y-2">
                        {navigation.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)}>
                                    <div className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all ${isActive ? "bg-amber-500 text-gray-900 font-bold" : "text-slate-300 hover:bg-slate-800"
                                        }`}>
                                        <div className="flex items-center gap-3">
                                            {item.icon}
                                            {item.name}
                                        </div>
                                        {item.name === "Notifications" && unreadCount > 0 && (
                                            <div className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">
                                                {unreadCount}
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                        <div className="pt-4 border-t border-slate-800 space-y-2 mt-2">
                            <Link href="/" onClick={() => setIsMobileMenuOpen(false)}>
                                <button className="flex items-center gap-3 px-4 py-3 text-sky-400 border border-sky-500/20 rounded-xl w-full text-left font-bold bg-sky-500/5">
                                    <Home className="w-5 h-5" />
                                    Retour au Site
                                </button>
                            </Link>
                            <button
                                onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }}
                                className="flex items-center gap-3 px-4 py-3 text-red-400 border border-red-500/20 rounded-xl w-full text-left"
                            >
                                <LogOut className="w-5 h-5" />
                                Déconnexion
                            </button>
                        </div>
                    </nav>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 md:ml-64 pt-20 md:pt-0 p-6">
                <PushNotificationManager />
                {children}
            </main>
        </div>
    );
}
