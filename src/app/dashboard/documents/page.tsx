"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    Search,
    Upload,
    Download,
    Trash2,
    CheckCircle2,
    XCircle,
    AlertCircle,
    FileCheck2,
    ShieldCheck,
    MoreVertical,
    X,
    FileBox,
    Loader2
} from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function DocumentsPage() {
    const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [mounted, setMounted] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        fetchDocuments();
    }, []);

    const fetchDocuments = async () => {
        setIsLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { data, error } = await supabase.storage
                .from('client_documents')
                .list(user.id, {
                    limit: 100,
                    offset: 0,
                    sortBy: { column: 'name', order: 'desc' },
                });

            if (error) throw error;

            const formattedDocs = data.map((file) => ({
                id: file.id,
                name: file.name,
                size: `${(file.metadata.size / (1024 * 1024)).toFixed(2)} MB`,
                date: new Date(file.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                status: "En Attente", // Par défaut, Supabase Storage n'a pas de status
                statusColor: "text-amber-600 bg-amber-50 border-amber-100",
                icon: <AlertCircle className="w-4 h-4 text-amber-500" />
            }));

            setDocuments(formattedDocs);
        } catch (err: any) {
            console.error("Erreur fetch docs:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpload = async (e: any) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setIsUploading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random()}.${fileExt}`;
            const filePath = `${user.id}/${file.name}`; // On garde le nom original dans le path utilisateur

            const { error: uploadError } = await supabase.storage
                .from('client_documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            await fetchDocuments();
            setIsUploadModalOpen(false);
        } catch (err: any) {
            alert("Erreur lors de l'upload : " + err.message);
        } finally {
            setIsUploading(false);
        }
    };

    const downloadDocument = async (fileName: string) => {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { data, error } = await supabase.storage
                .from('client_documents')
                .download(`${user.id}/${fileName}`);

            if (error) throw error;

            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        } catch (err: any) {
            alert("Erreur lors du téléchargement : " + err.message);
        }
    };

    const deleteDocument = async (fileName: string) => {
        if (!confirm("Voulez-vous vraiment supprimer ce document ?")) return;

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        try {
            const { error } = await supabase.storage
                .from('client_documents')
                .remove([`${user.id}/${fileName}`]);

            if (error) throw error;
            fetchDocuments();
        } catch (err: any) {
            alert("Erreur lors de la suppression : " + err.message);
        }
    };

    const filteredDocs = documents.filter(doc =>
        doc.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!mounted) return null;

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Mes Documents</h1>
                    <p className="text-gray-600">Gérez votre coffre-fort numérique et importez vos pièces justificatives.</p>
                </div>
                <button
                    onClick={() => setIsUploadModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-gray-900 font-bold rounded-xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-200"
                >
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
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400/50 transition-all"
                    />
                </div>
            </div>

            {/* Document Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {isLoading ? (
                    <div className="col-span-full py-20 flex flex-col items-center justify-center text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin mb-4" />
                        <p className="font-bold">Chargement de votre coffre-fort...</p>
                    </div>
                ) : filteredDocs.length > 0 ? (
                    filteredDocs.map((doc, i) => (
                        <motion.div
                            key={doc.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.9 }}
                            transition={{ delay: i * 0.05 }}
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
                                <button
                                    onClick={() => downloadDocument(doc.name)}
                                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 text-gray-700 font-bold rounded-xl hover:bg-slate-200 transition-all text-sm"
                                >
                                    <Download className="w-4 h-4" />
                                    Télécharger
                                </button>
                                <button
                                    onClick={() => deleteDocument(doc.name)}
                                    className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div
                        onClick={() => setIsUploadModalOpen(true)}
                        className="col-span-full border-2 border-dashed border-slate-200 bg-white/50 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white hover:border-amber-400 hover:shadow-xl transition-all group"
                    >
                        <div className="w-20 h-20 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Upload className="w-10 h-10" />
                        </div>
                        <h4 className="text-2xl font-black text-gray-900 mb-2">Votre coffre-fort est vide</h4>
                        <p className="text-slate-500 font-medium mb-8 max-w-sm">Dés que vous aurez une demande active, vous pourrez importer vos pièces justificatrices ici.</p>
                        <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Importer mon premier fichier</button>
                    </div>
                )}
            </div>

            {/* Upload Modal */}
            <AnimatePresence>
                {isUploadModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isUploading && setIsUploadModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                <h2 className="text-2xl font-black text-slate-900">Importer un fichier</h2>
                                <button
                                    onClick={() => setIsUploadModalOpen(false)}
                                    className="p-2 hover:bg-slate-100 rounded-xl transition-all"
                                    disabled={isUploading}
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-8">
                                {!isUploading ? (
                                    <div className="space-y-6">
                                        <div className="border-4 border-dashed border-slate-100 rounded-[2rem] p-12 flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 hover:border-sky-200 transition-all group relative cursor-pointer">
                                            <input
                                                type="file"
                                                className="absolute inset-0 opacity-0 cursor-pointer"
                                                onChange={handleUpload}
                                                accept=".pdf,.png,.jpg,.jpeg"
                                            />
                                            <div className="w-20 h-20 rounded-3xl bg-white shadow-xl shadow-slate-200/50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                                                <Upload className="w-10 h-10 text-sky-500" />
                                            </div>
                                            <p className="text-lg font-bold text-slate-900 mb-2">Cliquez pour séléctionner</p>
                                            <p className="text-sm text-slate-400">PDF, PNG ou JPG (Max. 10MB)</p>
                                        </div>

                                        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex items-start gap-3">
                                            <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                                            <p className="text-xs text-amber-800 leading-relaxed font-medium">Assurez-vous que le document est bien lisible et non coupé. Les dossiers avec des documents flous sont systématiquement rejetés par le consulat.</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="py-12 flex flex-col items-center justify-center text-center">
                                        <div className="relative w-24 h-24 mb-8">
                                            <Loader2 className="w-full h-full text-sky-500 animate-spin" />
                                        </div>
                                        <h3 className="text-xl font-black text-slate-900 mb-2">Envoi en cours...</h3>
                                        <p className="text-slate-400 font-medium">Veuillez ne pas fermer cette fenêtre.</p>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
