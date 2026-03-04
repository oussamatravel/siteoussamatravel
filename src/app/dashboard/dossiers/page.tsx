"use client";

import { motion } from "framer-motion";
import { FolderOpen, Search, Filter, PlusCircle, MoreVertical, Clock, CheckCircle2, AlertCircle } from "lucide-react";

export default function DossiersPage() {
    const dossiers = [
        {
            id: "OT-2024-001",
            type: "Visa Études",
            destination: "Canada",
            status: "Action Requise",
            date: "12 Mars 2024",
            statusColor: "text-amber-600 bg-amber-50 border-amber-100",
            icon: <AlertCircle className="w-4 h-4" />
        },
        {
            id: "OT-2023-085",
            type: "Visa Touriste",
            destination: "Dubaï",
            status: "Terminé",
            date: "15 Janvier 2024",
            statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
            icon: <CheckCircle2 className="w-4 h-4" />
        },
        {
            id: "OT-2024-005",
            type: "Immigration",
            destination: "France",
            status: "En Traitement",
            date: "02 Avril 2024",
            statusColor: "text-blue-600 bg-blue-50 border-blue-100",
            icon: <Clock className="w-4 h-4" />
        }
    ];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mes Dossiers</h1>
                    <p className="text-gray-600">Gérez et suivez l'avancement de toutes vos demandes.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-200">
                    <PlusCircle className="w-5 h-5" />
                    Nouvelle Demande
                </button>
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
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-100">
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">ID Dossier</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Type / Pays</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Date</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider">Statut</th>
                                <th className="px-6 py-4 text-sm font-bold text-gray-900 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {dossiers.map((dossier, i) => (
                                <motion.tr
                                    key={dossier.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="hover:bg-slate-50 transition-colors group"
                                >
                                    <td className="px-6 py-6 font-bold text-gray-900">{dossier.id}</td>
                                    <td className="px-6 py-6">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                                                {dossier.destination.substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-bold text-gray-900">{dossier.type}</div>
                                                <div className="text-sm text-gray-500">{dossier.destination}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6 text-gray-600 text-sm">{dossier.date}</td>
                                    <td className="px-6 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${dossier.statusColor}`}>
                                            {dossier.icon}
                                            {dossier.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-6 text-right">
                                        <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-slate-200 rounded-lg transition-all">
                                            <MoreVertical className="w-5 h-5" />
                                        </button>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Void State if needed */}
            {dossiers.length === 0 && (
                <div className="text-center py-20 bg-white border border-dashed border-slate-200 rounded-3xl mt-6">
                    <FolderOpen className="w-16 h-16 text-slate-200 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900 mb-2">Aucun dossier trouvé</h3>
                    <p className="text-gray-500 mb-6">Vous n'avez pas encore de demande en cours.</p>
                    <button className="px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl">
                        Lancer votre première demande
                    </button>
                </div>
            )}
        </div>
    );
}
