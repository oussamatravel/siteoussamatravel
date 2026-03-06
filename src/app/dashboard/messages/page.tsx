"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    MessageSquare,
    Search,
    Loader2,
    Clock,
    ArrowRight,
    SearchX,
    Globe2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import ApplicationChat from "@/components/ApplicationChat";

export default function ClientMessagesPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        fetchApplications();

        const channel = supabase
            .channel('client_apps_list')
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'applications'
            }, () => {
                fetchApplications();
            })
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .eq('user_id', user.id)
                .order('updated_at', { ascending: false });

            if (error) throw error;
            setApplications(data || []);
        } catch (err: any) {
            console.error("Error fetching applications for client messages:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredApps = applications.filter(app => {
        const search = searchTerm.toLowerCase();
        return app.service_type.toLowerCase().includes(search) ||
            app.target_country.toLowerCase().includes(search) ||
            app.reference_number?.toLowerCase().includes(search);
    });

    if (!mounted) return null;

    return (
        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-10 font-sans pb-20">
            <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Mes Discussions Support</h1>
                <p className="text-slate-500 font-medium">Échangez avec nos conseillers pour chacun de vos dossiers.</p>
            </div>

            {/* Search Bar */}
            <div className="relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Rechercher par service, pays ou référence..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-slate-200 rounded-[2rem] py-6 pl-16 pr-6 text-sm focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-medium text-slate-900 shadow-sm"
                />
            </div>

            {/* Application List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 text-center">
                        <Loader2 className="w-10 h-10 animate-spin text-amber-500 mx-auto mb-4" />
                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Chargement de vos conversations...</p>
                    </div>
                ) : filteredApps.length > 0 ? (
                    filteredApps.map((app, i) => (
                        <motion.div
                            key={app.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => setSelectedChat(app.id)}
                            className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-sky-200 transition-all cursor-pointer group relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-24 h-24 bg-sky-50 rounded-full -mr-12 -mt-12 transition-transform group-hover:scale-110"></div>

                            <div className="relative flex items-center justify-between mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 bg-sky-50 text-sky-600 rounded-2xl flex items-center justify-center font-black text-lg shadow-sm">
                                        <Globe2 className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-black text-slate-900 leading-tight group-hover:text-sky-600 transition-colors uppercase tracking-tight">
                                            {app.target_country}
                                        </h3>
                                        <div className="flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                                            {app.service_type}
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3 bg-slate-50 text-slate-400 rounded-xl group-hover:bg-sky-500 group-hover:text-white transition-all">
                                    <MessageSquare className="w-5 h-5" />
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-1.5">
                                    <Clock className="w-3.5 h-3.5" />
                                    Mise à jour : {new Date(app.updated_at).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-50 rounded-full text-slate-600 font-black">
                                    REF: {app.reference_number || app.id.substring(0, 8)}
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full py-32 text-center bg-white rounded-[3rem] border border-slate-50">
                        <SearchX className="w-20 h-20 text-slate-100 mx-auto mb-6" />
                        <h3 className="text-xl font-black text-slate-900 mb-2">Aucune conversation trouvée</h3>
                        <p className="text-slate-400 font-medium">Lancez une nouvelle demande ou ajustez votre recherche.</p>
                    </div>
                )}
            </div>

            {/* Chat Modal */}
            <AnimatePresence>
                {selectedChat && (
                    <ApplicationChat
                        applicationId={selectedChat}
                        onClose={() => setSelectedChat(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
