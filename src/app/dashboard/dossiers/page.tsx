"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FolderOpen, Search, Filter, PlusCircle, MoreVertical, Clock, CheckCircle2, AlertCircle, Loader2, MessageSquare, Inbox, GraduationCap, Globe2, XCircle, FileSearch, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import ApplicationChat from "@/components/ApplicationChat";

export default function DossiersPage() {
    const [dossiers, setDossiers] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchDossiers();
    }, []);

    const fetchDossiers = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('applications')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setDossiers(data || []);
        } catch (err: any) {
            console.error("Error fetching dossiers:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const getStatusStyle = (status: string) => {
        const s = status?.toLowerCase();
        switch (s) {
            case 'receptionner':
                return { color: "text-blue-600 bg-blue-50 border-blue-100", label: "Réceptionné", icon: <Inbox className="w-4 h-4" /> };
            case 'en_cours':
                return { color: "text-blue-600 bg-blue-50 border-blue-100", label: "En Traitement", icon: <Clock className="w-4 h-4" /> };
            case 'manque_documents':
                return { color: "text-amber-600 bg-amber-50 border-amber-100", label: "Documents manquants", icon: <FileSearch className="w-4 h-4" /> };
            case 'termine':
            case 'valide':
                return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", label: s === 'termine' ? "Terminé" : "Validé", icon: <CheckCircle2 className="w-4 h-4" /> };
            case 'admission_recu':
                return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", label: "Admission Reçue", icon: <GraduationCap className="w-4 h-4" /> };
            case 'admission_refusee':
                return { color: "text-rose-600 bg-rose-50 border-rose-100", label: "Admission Refusée", icon: <XCircle className="w-4 h-4" /> };
            case 'etape_visa':
                return { color: "text-blue-600 bg-blue-50 border-blue-100", label: "Étape Visa", icon: <Globe2 className="w-4 h-4" /> };
            case 'rejete':
                return { color: "text-rose-600 bg-rose-50 border-rose-100", label: "Rejeté", icon: <AlertCircle className="w-4 h-4" /> };
            default:
                return { color: "text-amber-600 bg-amber-50 border-amber-100", label: "En Attente", icon: <Clock className="w-4 h-4" /> };
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mes Dossiers</h1>
                    <p className="text-gray-600">Gérez et suivez l'avancement de toutes vos demandes.</p>
                </div>
                <Link href="/dashboard" className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-200">
                    <PlusCircle className="w-5 h-5" />
                    Nouvelle Demande
                </Link>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un dossier (ID, pays...)"
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                    />
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-all">
                    <Filter className="w-5 h-5" />
                    Filtres
                </button>
            </div>

            {/* Dossiers Table/Grid */}
            <div className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4">
                        <Loader2 className="w-10 h-10 animate-spin text-amber-500" />
                        <p className="text-gray-500 font-bold animate-pulse uppercase tracking-widest text-[10px]">Chargement de vos dossiers...</p>
                    </div>
                ) : dossiers.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Référence</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Service / Pays</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Statut</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider text-right">Support</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {dossiers.map((dossier, i) => {
                                    const style = getStatusStyle(dossier.status);
                                    return (
                                        <motion.tr
                                            key={dossier.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-slate-50 transition-colors group"
                                        >
                                            <td className="px-6 py-6 font-bold text-gray-900">{dossier.reference_number}</td>
                                            <td className="px-6 py-6">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                                                        {dossier.target_country?.substring(0, 1)}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-gray-900">{dossier.service_type}</div>
                                                        <div className="text-sm text-gray-500">{dossier.target_country}</div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-6 text-gray-600 text-sm">
                                                {new Date(dossier.created_at).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border ${style.color}`}>
                                                    {style.icon}
                                                    {style.label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-6 text-right">
                                                <button
                                                    onClick={() => setSelectedChat(dossier.id)}
                                                    className="p-2.5 bg-sky-50 text-sky-600 hover:bg-sky-600 hover:text-white rounded-xl transition-all shadow-sm"
                                                >
                                                    <MessageSquare className="w-5 h-5" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <FolderOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun dossier trouvé</h3>
                        <p className="text-gray-500 mb-6">Vous n'avez pas encore de demande en cours.</p>
                        <Link href="/dashboard" className="px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl inline-block hover:scale-105 transition-transform shadow-lg shadow-amber-200">
                            Lancer votre première demande
                        </Link>
                    </div>
                )}
            </div>

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
