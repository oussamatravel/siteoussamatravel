"use client";

import { motion } from "framer-motion";
import { Receipt, CreditCard, Download, Search, Filter, Clock, CheckCircle2, AlertCircle, Loader2, Upload, X, FileText, Image as ImageIcon, ArrowUpRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

export default function PaiementsPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isUploading, setIsUploading] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
    const supabase = createClient();

    useEffect(() => {
        fetchInvoices();
    }, []);

    const fetchInvoices = async () => {
        setIsLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('invoices')
                .select('*')
                .eq('user_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setInvoices(data || []);
        } catch (err) {
            console.error("Error fetching invoices:", err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUploadReceipt = async (e: React.ChangeEvent<HTMLInputElement>, invoiceId: string) => {
        const file = e.target.files?.[0];
        if (!file || !invoiceId) return;

        setIsUploading(invoiceId);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const fileExt = file.name.split('.').pop();
            const fileName = `${user.id}/${invoiceId}_${Math.random()}.${fileExt}`;
            const filePath = `${fileName}`;

            // 1. Upload to storage
            const { error: uploadError } = await supabase.storage
                .from('payment_receipts')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('payment_receipts')
                .getPublicUrl(filePath);

            // 3. Update invoice in DB
            const { error: updateError } = await supabase
                .from('invoices')
                .update({
                    receipt_url: publicUrl,
                    status: 'en_verification',
                    receipt_uploaded_at: new Date().toISOString()
                })
                .eq('id', invoiceId);

            if (updateError) throw updateError;

            // Refresh invoices
            fetchInvoices();
            setSelectedInvoice(null);
        } catch (err: any) {
            console.error("Detailed Upload Error:", err);
            alert("Erreur lors de l'envoi du reçu : " + (err.message || "Veuillez réessayer."));
        } finally {
            setIsUploading(null);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'paye':
                return { color: "text-emerald-600 bg-emerald-50 border-emerald-100", label: "Payé", icon: <CheckCircle2 className="w-4 h-4" /> };
            case 'en_verification':
                return { color: "text-sky-600 bg-sky-50 border-sky-100", label: "En Vérification", icon: <Loader2 className="w-4 h-4 animate-spin" /> };
            case 'annule':
                return { color: "text-slate-400 bg-slate-50 border-slate-100", label: "Annulé", icon: <AlertCircle className="w-4 h-4" /> };
            default:
                return { color: "text-amber-600 bg-amber-50 border-amber-100", label: "En Attente", icon: <Clock className="w-4 h-4" /> };
        }
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Paiements & Factures</h1>
                    <p className="text-gray-600">Consultez l'historique de vos règlements et téléchargez vos factures.</p>
                </div>
                <div className="flex items-center gap-3 p-4 bg-sky-50 rounded-2xl border border-sky-100">
                    <div className="w-10 h-10 bg-sky-500 text-white rounded-xl flex items-center justify-center shadow-lg shadow-sky-200">
                        <CreditCard className="w-5 h-5" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black text-sky-600 uppercase tracking-widest leading-none mb-1">Total Payé</div>
                        <div className="text-lg font-black text-slate-900 leading-none">
                            {invoices.filter(i => i.status === 'paye').reduce((sum, i) => sum + i.amount, 0).toLocaleString()} DA
                        </div>
                    </div>
                </div>
            </div>

            {/* Invoices List */}
            <div className="bg-white border border-slate-100 rounded-[2.5rem] overflow-hidden shadow-sm">
                {isLoading ? (
                    <div className="p-20 flex flex-col items-center justify-center gap-4 text-slate-400">
                        <Loader2 className="w-10 h-10 animate-spin" />
                        <p className="font-black text-xs uppercase tracking-widest">Récupération de vos factures...</p>
                    </div>
                ) : invoices.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50 border-b border-slate-100">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">N° Facture</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Description</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Montant</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {invoices.map((inv, i) => {
                                    const style = getStatusStyle(inv.status);
                                    return (
                                        <motion.tr
                                            key={inv.id}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="hover:bg-slate-50 transition-colors group"
                                        >
                                            <td className="px-8 py-6 font-black text-slate-900 uppercase text-sm">
                                                #{inv.id.substring(0, 8)}
                                            </td>
                                            <td className="px-8 py-6">
                                                <div className="text-sm font-bold text-slate-900">{inv.description || "Service Oussama Travel"}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Émise le {new Date(inv.created_at).toLocaleDateString()}</div>
                                            </td>
                                            <td className="px-8 py-6 font-black text-slate-900 text-sm">
                                                {inv.amount.toLocaleString()} DA
                                            </td>
                                            <td className="px-8 py-6">
                                                <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${style.color}`}>
                                                    {style.icon}
                                                    {style.label}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                                                {inv.status === 'en_attente' && (
                                                    <button
                                                        onClick={() => setSelectedInvoice(inv)}
                                                        className="px-4 py-2 bg-amber-500 text-slate-950 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-amber-400 transition-all flex items-center gap-2 shadow-lg shadow-amber-500/10"
                                                    >
                                                        <Upload className="w-3.5 h-3.5" />
                                                        Payer
                                                    </button>
                                                )}
                                                {inv.receipt_url && (
                                                    <a
                                                        href={inv.receipt_url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="p-2.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl transition-all border border-sky-100"
                                                        title="Voir le reçu envoyé"
                                                    >
                                                        <FileText className="w-4 h-4" />
                                                    </a>
                                                )}
                                                <button className="p-2.5 bg-slate-50 text-slate-400 hover:text-slate-900 hover:bg-slate-200 rounded-xl transition-all border border-slate-100">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </td>
                                        </motion.tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-20 px-10">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 text-slate-200">
                            <Receipt className="w-10 h-10" />
                        </div>
                        <h3 className="text-xl font-black text-gray-900 mb-2">Aucune facture disponible</h3>
                        <p className="text-gray-500 max-w-sm mx-auto font-medium">Vous n'avez pas encore de factures émises pour vos demandes en cours.</p>
                    </div>
                )}
            </div>

            {/* Modal Upload Reçu */}
            {selectedInvoice && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => !isUploading && setSelectedInvoice(null)}
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl relative overflow-hidden"
                    >
                        <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-amber-500 text-slate-900 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                    <Upload className="w-5 h-5" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black text-slate-900 leading-tight">Envoyer un Reçu</h3>
                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Facture #{selectedInvoice.id.substring(0, 8)}</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setSelectedInvoice(null)}
                                className="p-2 hover:bg-slate-200 rounded-xl transition-colors text-slate-400"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="p-8 space-y-6">
                            <div className="p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-center space-y-4">
                                <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center mx-auto text-slate-400">
                                    <ImageIcon className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-slate-900">Cliquez pour choisir un fichier</p>
                                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-widest mt-1">Images ou PDF (Max 5Mo)</p>
                                </div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={(e) => handleUploadReceipt(e, selectedInvoice.id)}
                                    className="hidden"
                                    accept="image/*,.pdf"
                                />
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    disabled={isUploading === selectedInvoice.id}
                                    className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm disabled:opacity-50"
                                >
                                    {isUploading === selectedInvoice.id ? "Envoi en cours..." : "Choisir le fichier"}
                                </button>
                            </div>

                            <div className="flex items-start gap-3 p-4 bg-amber-50 rounded-xl border border-amber-100">
                                <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />
                                <p className="text-[10px] text-amber-700 font-bold leading-relaxed">
                                    En envoyant votre reçu, le statut de votre facture passera en "En Vérification". Notre équipe validera votre paiement sous 24h.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}

            {/* Support section */}
            <div className="mt-12 p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-6 text-center md:text-left">
                    <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-500 shrink-0">
                        <Receipt className="w-8 h-8" />
                    </div>
                    <div>
                        <h4 className="text-lg font-black text-slate-900">Besoin d'aide pour un paiement ?</h4>
                        <p className="text-sm text-slate-500 font-medium">Notre équipe de support est là pour vous accompagner si vous rencontrez des difficultés.</p>
                    </div>
                </div>
                <button className="px-8 py-4 bg-slate-950 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-slate-200 shrink-0">
                    Contacter le support
                </button>
            </div>
        </div>
    );
}
