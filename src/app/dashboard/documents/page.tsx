"use client";

import { motion } from "framer-motion";
import { FileText, Search, Upload, Download, Trash2, CheckCircle2, XCircle, AlertCircle, FileCheck2, ShieldCheck, MoreVertical } from "lucide-react";

export default function DocumentsPage() {
    const documents = [
        {
            id: "doc-001",
            name: "Passeport - Oussama.pdf",
            size: "2.4 MB",
            date: "12 Mars 2024",
            status: "Validé",
            statusColor: "text-emerald-600 bg-emerald-50 border-emerald-100",
            icon: <CheckCircle2 className="w-4 h-4 text-emerald-500" />
        },
        {
            id: "doc-002",
            name: "Diplôme Bachelor.pdf",
            size: "4.1 MB",
            date: "10 Janvier 2024",
            status: "En Attente",
            statusColor: "text-amber-600 bg-amber-50 border-amber-100",
            icon: <AlertCircle className="w-4 h-4 text-amber-500" />
        },
        {
            id: "doc-003",
            name: "Relevés de Compte - Famille.pdf",
            size: "8.7 MB",
            date: "02 Avril 2024",
            status: "Rejeté",
            statusColor: "text-red-600 bg-red-50 border-red-100",
            icon: <XCircle className="w-4 h-4 text-red-500" />
        }
    ];

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mes Documents</h1>
                    <p className="text-gray-600">Gérez votre coffre-fort numérique et importez vos pièces justificatives.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-200">
                    <Upload className="w-5 h-5" />
                    Importer un document
                </button>
            </div>

            {/* Security Banner */}
            <div className="mb-10 p-6 bg-slate-900 text-white rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center gap-6">
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-sky-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur shadow-xl shadow-sky-500/10 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-8 h-8 text-sky-400" />
                </div>
                <div>
                    <h3 className="text-xl font-bold mb-1">Stockage Ultra-Sécurisé (SSL/AES-256)</h3>
                    <p className="text-slate-400">Vos documents personnels sont chiffrés et accessibles uniquement par vous et les experts désignés de Oussama Travel.</p>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="flex flex-col md:flex-row gap-4 mb-8">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Rechercher un document par nom..."
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                    />
                </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {documents.map((doc, i) => (
                    <motion.div
                        key={doc.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white border border-slate-100 rounded-3xl p-6 shadow-sm hover:shadow-xl hover:border-sky-100 transition-all group relative cursor-pointer"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                                <FileText className="w-7 h-7" />
                            </div>
                            <button className="p-2 text-gray-400 hover:text-gray-900 hover:bg-slate-100 rounded-xl transition-all">
                                <MoreVertical className="w-5 h-5" />
                            </button>
                        </div>

                        <h3 className="text-lg font-bold text-gray-900 mb-1 truncate">{doc.name}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <span>{doc.size}</span>
                            <span>•</span>
                            <span>{doc.date}</span>
                        </div>

                        <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${doc.statusColor} mb-8`}>
                            {doc.icon}
                            {doc.status}
                        </div>

                        <div className="flex items-center gap-3 pt-6 border-t border-slate-50">
                            <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-gray-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm">
                                <Download className="w-4 h-4" />
                                Télécharger
                            </button>
                            <button className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all">
                                <Trash2 className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                ))}

                {/* Upload Card Place Holder */}
                <div className="border-2 border-dashed border-slate-200 bg-white/50 rounded-3xl p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all h-full min-h-[250px] group">
                    <div className="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-1">Ajouter un document</h4>
                    <p className="text-sm text-gray-500 px-10">Glissez-déposez vos fichiers PDF, PNG ou JPG ici.</p>
                </div>
            </div>
        </div>
    );
}
