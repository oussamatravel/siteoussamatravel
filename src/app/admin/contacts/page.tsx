"use client";

import { motion } from "framer-motion";
import {
    Contact,
    Search,
    Loader2,
    Calendar,
    Mail,
    Phone,
    CheckCircle2,
    SearchX
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone: string;
    service: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function AdminContactsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel('contacts_list')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'contacts'
            }, () => {
                fetchMessages();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('contacts')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setMessages(data || []);
        } catch (err: any) {
            console.error("Error fetching contacts:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const markAsRead = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('contacts')
                .update({ is_read: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            fetchMessages(); // Refresh to update counts and list
        } catch (err: any) {
            alert("Erreur lors de la mise à jour : " + err.message);
        }
    };

    const filteredMessages = messages.filter(msg => {
        const search = searchTerm.toLowerCase();
        return (
            msg.name.toLowerCase().includes(search) ||
            msg.email.toLowerCase().includes(search) ||
            msg.service.toLowerCase().includes(search)
        );
    });

    return (
        <div className="max-w-6xl mx-auto space-y-10 font-sans pb-20">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Messages Publics</h1>
                <p className="text-slate-500 font-medium">Gérez les demandes issues du formulaire de contact public.</p>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Rechercher par nom, email, service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-100 rounded-[2rem] py-6 pl-16 pr-6 text-sm focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 transition-all font-medium text-slate-900 shadow-sm"
                />
            </div>

            {/* Messages List */}
            <div className="space-y-6">
                {isLoading ? (
                    <div className="py-20 text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mx-auto mb-4" />
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Chargement des messages...</p>
                    </div>
                ) : filteredMessages.length > 0 ? (
                    filteredMessages.map((msg, i) => (
                        <motion.div
                            key={msg.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className={`bg-white p-6 md:p-8 rounded-[2.5rem] border ${msg.is_read ? 'border-slate-100' : 'border-indigo-200 bg-indigo-50/10'} shadow-sm hover:shadow-xl transition-all relative overflow-hidden`}
                        >
                            <div className="flex flex-col md:flex-row gap-6 md:items-start justify-between relative z-10">
                                <div className="space-y-4 flex-1">
                                    <div className="flex flex-wrap items-center gap-4">
                                        <h3 className="text-xl font-black text-slate-900">{msg.name}</h3>
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${msg.is_read ? 'bg-slate-100 text-slate-500' : 'bg-indigo-100 text-indigo-600'}`}>
                                            {msg.is_read ? 'Lu' : 'Nouveau'}
                                        </span>
                                        <span className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[10px] font-black uppercase tracking-widest">
                                            {msg.service}
                                        </span>
                                    </div>

                                    <div className="flex flex-wrap gap-4 text-sm font-bold text-slate-500">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4" />
                                            {msg.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4" />
                                            {msg.phone}
                                        </div>
                                    </div>

                                    <div className="p-4 bg-slate-50 rounded-2xl text-slate-700 text-sm leading-relaxed border border-slate-100">
                                        {msg.message}
                                    </div>
                                </div>

                                <div className="flex flex-col items-end gap-4 shrink-0">
                                    <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-2 rounded-xl">
                                        <Calendar className="w-3.5 h-3.5" />
                                        {new Date(msg.created_at).toLocaleString()}
                                    </div>
                                    <button
                                        onClick={() => markAsRead(msg.id, msg.is_read)}
                                        className={`px-6 py-3 rounded-full text-xs font-black uppercase tracking-widest transition-all ${msg.is_read ? 'bg-slate-100 text-slate-500 hover:bg-slate-200' : 'bg-indigo-500 text-white hover:bg-indigo-600 shadow-lg shadow-indigo-500/20'
                                            }`}
                                    >
                                        <span className="flex items-center gap-2">
                                            <CheckCircle2 className="w-4 h-4" />
                                            {msg.is_read ? "Marquer Non Lu" : "Marquer Comme Lu"}
                                        </span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="py-32 text-center bg-white rounded-[3rem] border border-slate-50">
                        <SearchX className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-slate-900 mb-2">Aucun message de contact</h3>
                        <p className="text-slate-400 font-medium">Il n'y a pas de nouvelle demande publique.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
