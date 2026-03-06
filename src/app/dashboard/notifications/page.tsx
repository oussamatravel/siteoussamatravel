"use client";

import { motion } from "framer-motion";
import { Bell, Clock, CheckCircle2, AlertCircle, Info, MoreHorizontal, Settings, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function NotificationsPage() {
    const [notifications, setNotifications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filter, setFilter] = useState("Tout");
    const supabase = createClient();

    useEffect(() => {
        fetchNotifications();
    }, []);

    const fetchNotifications = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('notifications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const formatted = (data || []).map(notif => ({
                id: notif.id,
                type: notif.type === 'success' ? 'Succès' : notif.type === 'error' ? 'Action Requise' : 'Info',
                title: notif.title,
                desc: notif.description,
                time: formatTime(notif.created_at),
                icon: getIcon(notif.type),
                bg: getBg(notif.type),
                read: notif.is_read
            }));

            setNotifications(formatted);
        } catch (err: any) {
            console.error("Error fetching notifications:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (id: string) => {
        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('id', id);

        if (!error) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }
    };

    const markAllAsRead = async () => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('notifications')
            .update({ is_read: true })
            .eq('user_id', user.id)
            .eq('is_read', false);

        if (!error) {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }
    };

    const formatTime = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffMin = Math.round(diffMs / 60000);
        const diffHrs = Math.round(diffMs / 3600000);
        const diffDays = Math.round(diffMs / 86400000);

        if (diffMin < 60) return `Il y a ${diffMin} min`;
        if (diffHrs < 24) return `Il y a ${diffHrs} h`;
        return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'success': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
            case 'error': return <AlertCircle className="w-5 h-5 text-amber-500" />;
            default: return <Info className="w-5 h-5 text-sky-500" />;
        }
    };

    const getBg = (type: string) => {
        switch (type) {
            case 'success': return 'bg-emerald-50 border-emerald-100';
            case 'error': return 'bg-amber-50 border-amber-100';
            default: return 'bg-sky-50 border-sky-100';
        }
    };

    const filteredNotifs = notifications.filter(n => {
        if (filter === "Tout") return true;
        if (filter === "Dossiers") return n.title.toLowerCase().includes("dossier");
        return true;
    });

    return (
        <div className="p-6 md:p-10 max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Notifications</h1>
                    <p className="text-gray-600">Restez informé de l'avancement de vos demandes en temps réel.</p>
                </div>
                <button className="p-3 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all text-gray-500">
                    <Settings className="w-5 h-5" />
                </button>
            </div>

            <div className="flex gap-4 mb-8">
                {["Tout", "Dossiers", "Documents"].map((f) => (
                    <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-6 py-2 font-bold rounded-full text-sm transition-all ${filter === f ? "bg-slate-900 text-white shadow-lg" : "bg-white text-gray-600 border border-slate-200 hover:bg-slate-50"}`}
                    >
                        {f}
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                {isLoading ? (
                    <div className="text-center py-20 bg-white border border-slate-100 rounded-3xl">
                        <Loader2 className="w-10 h-10 animate-spin text-sky-500 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Chargement des notifications...</p>
                    </div>
                ) : filteredNotifs.map((notif, i) => (
                    <motion.div
                        key={notif.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        onClick={() => !notif.read && markAsRead(notif.id)}
                        className={`p-6 border rounded-3xl transition-all hover:shadow-lg group flex items-start gap-4 cursor-pointer translate-y-0 hover:-translate-y-1 ${notif.read ? "bg-white border-slate-100" : "bg-white border-blue-200 shadow-md ring-2 ring-blue-500/5 shadow-blue-500/10"
                            }`}
                    >
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${notif.bg}`}>
                            {notif.icon}
                        </div>

                        <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border ${notif.bg}`}>{notif.type}</span>
                                {!notif.read && (
                                    <div className="w-2.5 h-2.5 bg-blue-600 rounded-full"></div>
                                )}
                            </div>
                            <h3 className={`text-lg font-bold mb-1 truncate ${notif.read ? "text-gray-900" : "text-blue-900"}`}>{notif.title}</h3>
                            <p className="text-gray-500 text-sm mb-4 line-clamp-2 leading-relaxed font-medium">{notif.desc}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-400 font-bold uppercase tracking-wider">
                                <Clock className="w-3 h-3" />
                                {notif.time}
                            </div>
                        </div>

                        <button className="p-2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-50 rounded-xl hover:bg-slate-100">
                            <MoreHorizontal className="w-5 h-5 text-gray-400" />
                        </button>
                    </motion.div>
                ))}

                {notifications.length === 0 && (
                    <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl">
                        <Bell className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Tout est à jour !</h3>
                        <p className="text-gray-500">Revenez plus tard pour voir vos activités.</p>
                    </div>
                )}
            </div>

            <div className="mt-10 pt-10 border-t border-slate-100 text-center">
                <button
                    onClick={markAllAsRead}
                    className="text-sm font-bold text-sky-600 hover:text-sky-700 hover:underline transition-all"
                >
                    Tout marquer comme lu
                </button>
            </div>
        </div>
    );
}
