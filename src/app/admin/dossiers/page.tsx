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
    Plus
} from "lucide-react";
import { useState } from "react";

export default function AdminDossiersPage() {
    const dossiers = [
        {
            id: "OT-24-001",
            client: "Oussama Travel",
            type: "Visa Études",
            dest: "Canada",
            date: "12 Mars 2024",
            status: "Prioritaire",
            color: "bg-rose-50 text-rose-600 border-rose-100",
            icon: <GraduationCap className="w-4 h-4" />
        },
        {
            id: "OT-24-002",
            client: "Sara Amrani",
            type: "Visa Touriste",
            dest: "Dubaï",
            date: "14 Mars 2024",
            status: "Nouveau",
            color: "bg-sky-50 text-sky-600 border-sky-100",
            icon: <Globe2 className="w-4 h-4" />
        },
        {
            id: "OT-24-003",
            client: "Karim Brahimi",
            type: "Visa Études",
            dest: "France",
            date: "10 Mars 2024",
            status: "À Valider",
            color: "bg-amber-50 text-amber-600 border-amber-100",
            icon: <GraduationCap className="w-4 h-4" />
        },
        {
            id: "OT-24-004",
            client: "Mourad Yazid",
            type: "Immigration",
            dest: "Canada",
            date: "08 Mars 2024",
            status: "Incomplet",
            color: "bg-slate-50 text-slate-400 border-slate-100",
            icon: <Users className="w-4 h-4" />
        }
    ];

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
                                            <button className="flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white font-black text-[10px] rounded-lg hover:opacity-90 shadow-md transition-all uppercase tracking-widest">
                                                <Check className="w-3 h-3" />
                                                Valider
                                            </button>
                                            <button className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg shadow-sm transition-all">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                            <button className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg shadow-sm transition-all">
                                                <X className="w-4 h-4" />
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
        </div>
    );
}
