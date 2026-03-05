"use client";

import { motion } from "framer-motion";
import {
    FileSearch,
    Search,
    Filter,
    Upload,
    Download,
    ShieldCheck,
    AlertCircle,
    CheckCircle2,
    XCircle,
    MoreVertical,
    Users,
    Calendar,
    Globe2,
    GraduationCap,
    Eye,
    Check,
    X,
    Plus,
    FileText,
    ArrowLeft,
    Loader2,
    MessageSquare,
    ExternalLink,
    Mail
} from "lucide-react";
import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

export default function AdminDossiersPage() {
    const [selectedDossier, setSelectedDossier] = useState<any>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [dossiers, setDossiers] = useState([
        {
            id: "OT-24-001",
            client: "Oussama Travel",
            email: "directeur.ota@gmail.com",
            type: "Visa Études",
            dest: "Canada",
            date: "12 Mars 2024",
            status: "Prioritaire",
            color: "bg-rose-50 text-rose-600 border-rose-100",
            icon: <GraduationCap className="w-4 h-4" />,
            documents: [
                { id: 1, name: "Passeport_Scan.pdf", size: "1.2MB", status: "Validé" },
                { id: 2, name: "Diplome_Bac.pdf", size: "2.4MB", status: "À vérifier" },
                { id: 3, name: "Relevé_Note.pdf", size: "3.1MB", status: "À vérifier" }
            ]
        },
        {
            id: "OT-24-002",
            client: "Sara Amrani",
            email: "sara.amrani@gmail.com",
            type: "Visa Touriste",
            dest: "Dubaï",
            date: "14 Mars 2024",
            status: "Nouveau",
            color: "bg-sky-50 text-sky-600 border-sky-100",
            icon: <Globe2 className="w-4 h-4" />,
            documents: [
                { id: 4, name: "Passeport_Sara.pdf", size: "1.5MB", status: "Nouveau" },
                { id: 5, name: "Photo_Identite.jpg", size: "0.8MB", status: "Nouveau" }
            ]
        },
        {
            id: "OT-24-003",
            client: "Karim Brahimi",
            email: "karim.br@live.fr",
            type: "Visa Études",
            dest: "France",
            date: "10 Mars 2024",
            status: "À Valider",
            color: "bg-amber-50 text-amber-600 border-amber-100",
            icon: <GraduationCap className="w-4 h-4" />,
            documents: [
                { id: 6, name: "Dossier_Complet.zip", size: "12.5MB", status: "Prêt" }
            ]
        },
        {
            id: "OT-24-004",
            client: "Mourad Yazid",
            email: "mourad.yazid@outlook.com",
            type: "Immigration",
            dest: "Canada",
            date: "08 Mars 2024",
            status: "Incomplet",
            color: "bg-slate-50 text-slate-400 border-slate-100",
            icon: <Users className="w-4 h-4" />,
            documents: [
                { id: 7, name: "Certificat_Langue.pdf", size: "1.1MB", status: "Manquant" }
            ]
        }
    ]);

    const handleAction = (status: string) => {
        setIsActionLoading(true);
        setTimeout(() => {
            setDossiers(dossiers.map(d => d.id === selectedDossier.id ? {
                ...d,
                status,
                color: status === "Validé" ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-rose-50 text-rose-600 border-rose-100"
            } : d));
            setIsActionLoading(false);
            setSelectedDossier(null);
        }, 1000);
    };

    if (!mounted) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Validation des Dossiers</h1>
                    <p className="text-slate-500 font-medium">Examinez les pièces justificatives et validez les étapes consulaires.</p>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 rounded-2xl shadow-sm text-slate-400 font-bold text-xs uppercase tracking-widest">
                    <AlertCircle className="w-4 h-4 text-rose-500" />
                    8 Dossiers URGENTS
                </div>
            </div>

            {/* Grid Filter Options */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-4">
                {["Tout", "Canada", "France", "Dubaï", "Études", "Immigration"].map((filt, i) => (
                    <button key={i} className={`py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all shadow-sm border ${filt === "Tout" ? "bg-slate-950 text-white border-slate-950 shadow-sky-500/10" : "bg-white text-slate-400 border-slate-100 hover:border-amber-400 hover:text-amber-500"
                        }`}>
                        {filt}
                    </button>
                ))}
            </div>

            {/* Table Interface */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Réf. Dossier</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client / Type</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Destination</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions de Validation</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {dossiers.map((dossier, i) => (
                                <motion.tr
                                    key={dossier.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedDossier(dossier)}
                                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                                >
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-slate-900">{dossier.id}</div>
                                        <div className="text-[10px] font-bold text-slate-400 uppercase">Reçu le {dossier.date.split(' ')[0]}</div>
                                    </td>

                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-slate-100 text-slate-950 flex items-center justify-center font-black text-[10px] group-hover:bg-amber-100 group-hover:text-amber-600 transition-colors uppercase">
                                                {dossier.client.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm whitespace-nowrap">{dossier.client}</div>
                                                <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                                                    {dossier.icon}
                                                    {dossier.type}
                                                </div>
                                            </div>
                                        </div>
                                    </td>

                                    <td className="px-8 py-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-slate-200 rounded-xl text-xs font-black text-slate-700 shadow-sm uppercase tracking-widest">
                                            <Globe2 className="w-3 h-3 text-sky-500" />
                                            {dossier.dest}
                                        </div>
                                    </td>

                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${dossier.color}`}>
                                            {dossier.status}
                                        </span>
                                    </td>

                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 pr-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedDossier(dossier); }}
                                                className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg shadow-sm transition-all"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-10 bg-slate-50 border-t border-slate-100 text-center">
                    <button className="px-10 py-4 bg-white border-2 border-dashed border-slate-200 rounded-2xl font-black text-xs text-slate-300 uppercase tracking-[0.3em] hover:text-slate-500 hover:border-slate-300 transition-all">
                        Charger 25 dossiers supplémentaires
                    </button>
                </div>
            </div>
            {/* Dossier Detail Modal */}
            <AnimatePresence>
                {selectedDossier && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isActionLoading && setSelectedDossier(null)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-4xl rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            {/* Modal Header */}
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-sky-500">
                                        {selectedDossier.icon}
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900">{selectedDossier.id}</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{selectedDossier.type} - {selectedDossier.dest}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedDossier(null)}
                                    className="p-2 hover:bg-white rounded-xl transition-all shadow-sm"
                                    disabled={isActionLoading}
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-8 space-y-8">
                                {/* Client Info Section */}
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Informations Client</div>
                                        <div className="space-y-4">
                                            <div>
                                                <div className="text-xs font-bold text-slate-400">Nom</div>
                                                <div className="text-sm font-black text-slate-900">{selectedDossier.client}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-400">Email</div>
                                                <div className="text-sm font-black text-slate-900 flex items-center gap-2">
                                                    {selectedDossier.email}
                                                    <Mail className="w-3 h-3 text-sky-500" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 p-6 border-2 border-dashed border-slate-100 rounded-3xl space-y-4">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pièces Jointes Reçues</div>
                                        <div className="space-y-3">
                                            {selectedDossier.documents.map((doc: any) => (
                                                <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all group cursor-pointer">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center">
                                                            <FileText className="w-5 h-5" />
                                                        </div>
                                                        <div>
                                                            <div className="text-sm font-black text-slate-900 group-hover:text-sky-600 transition-colors">{doc.name}</div>
                                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{doc.size}</div>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mr-2">{doc.status}</span>
                                                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-sky-500 rounded-lg transition-all">
                                                            <Download className="w-4 h-4" />
                                                        </button>
                                                        <button className="p-2 bg-slate-50 text-slate-400 hover:text-amber-500 rounded-lg transition-all">
                                                            <ExternalLink className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Status Card */}
                                <div className="p-6 bg-slate-950 rounded-3xl text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/10 blur-3xl rounded-full"></div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-400">
                                            <ShieldCheck className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <div className="text-xs font-bold text-slate-400 uppercase">Statut Actuel</div>
                                            <div className="text-lg font-black">{selectedDossier.status}</div>
                                        </div>
                                    </div>
                                    <p className="text-sm text-slate-400 leading-relaxed italic">"Vérification finale avant dépôt au consulat."</p>
                                </div>
                            </div>

                            {/* Modal Footer Actions */}
                            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
                                <button className="flex items-center gap-2 px-6 py-3 text-slate-400 hover:text-slate-600 font-bold text-sm uppercase tracking-widest transition-all">
                                    <MessageSquare className="w-4 h-4" />
                                    Commentaire
                                </button>
                                <div className="flex items-center gap-3">
                                    <button
                                        onClick={() => handleAction("Rejeté")}
                                        disabled={isActionLoading}
                                        className="px-6 py-3 bg-white border border-rose-200 text-rose-500 font-black text-xs rounded-xl hover:bg-rose-50 transition-all uppercase tracking-[0.2em] shadow-sm disabled:opacity-50"
                                    >
                                        Rejeter
                                    </button>
                                    <button
                                        onClick={() => handleAction("Validé")}
                                        disabled={isActionLoading}
                                        className="px-8 py-3 bg-emerald-500 text-white font-black text-xs rounded-xl hover:opacity-90 transition-all uppercase tracking-[0.2em] shadow-lg shadow-emerald-200 flex items-center gap-2 disabled:opacity-50"
                                    >
                                        {isActionLoading ? (
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                        ) : (
                                            <Check className="w-4 h-4" />
                                        )}
                                        Valider le Dossier
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div >
    );
}
