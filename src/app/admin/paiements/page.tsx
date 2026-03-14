"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Receipt,
    Search,
    Filter,
    Download,
    CheckCircle2,
    Clock,
    AlertCircle,
    MoreVertical,
    BarChart3,
    TrendingUp,
    Loader2,
    ArrowUpRight,
    Plus,
    X,
    FileText,
    Users,
    Eye,
    Check,
    Ban
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminPaiementsPage() {
    const [invoices, setInvoices] = useState<any[]>([]);
    const [clients, setClients] = useState<any[]>([]);
    const [stats, setStats] = useState({ total: 0, pending: 0, paid: 0, verification: 0 });
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCheckingRole, setIsCheckingRole] = useState(true);

    // Form state
    const [newInvoice, setNewInvoice] = useState({
        userId: "",
        amount: "",
        description: "",
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    const [selectedInvoice, setSelectedInvoice] = useState<any>(null);

    const supabase = createClient();

    useEffect(() => {
        const checkRoleAndFetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (data) setUserRole(data.role);
            }
            setIsCheckingRole(false);

            // Only fetch financial data if the user is an admin
            if (userRole !== 'employee') {
                fetchInvoices();
                fetchClients();
            }
        };

        checkRoleAndFetchData();
    }, [userRole]);

    const fetchInvoices = async () => {
        setIsLoading(true);
        try {
            const { data, error } = await supabase
                .from('invoices')
                .select(`
                    *,
                    profiles:user_id (first_name, last_name)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const invs = data || [];
            setInvoices(invs);

            const paid = invs.filter(i => i.status === 'paye').reduce((sum, i) => sum + i.amount, 0);
            const pending = invs.filter(i => i.status === 'en_attente').reduce((sum, i) => sum + i.amount, 0);
            const verification = invs.filter(i => i.status === 'en_verification').reduce((sum, i) => sum + i.amount, 0);

            setStats({
                total: paid + pending + verification,
                paid: paid,
                pending: pending,
                verification: verification
            });

        } catch (err: any) {
            console.error("Error fetching admin invoices details:", err.message || err);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClients = async () => {
        const { data } = await supabase.from('profiles').select('id, first_name, last_name').order('first_name');
        setClients(data || []);
    };

    const exportToCSV = () => {
        if (invoices.length === 0) return;

        const headers = ["ID", "Client", "Description", "Montant", "Statut", "Date"];
        const rows = invoices.map(inv => [
            inv.id,
            `${inv.profiles?.first_name} ${inv.profiles?.last_name}`,
            inv.description,
            inv.amount,
            inv.status,
            new Date(inv.created_at).toLocaleDateString()
        ]);

        const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const link = document.createElement("a");
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", `factures_oussama_travel_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleCreateInvoice = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newInvoice.userId || !newInvoice.amount) return;

        setIsActionLoading(true);
        try {
            const { error } = await supabase
                .from('invoices')
                .insert({
                    user_id: newInvoice.userId,
                    amount: parseFloat(newInvoice.amount),
                    description: newInvoice.description || "Frais de dossier",
                    status: 'en_attente',
                    due_date: newInvoice.dueDate
                });

            if (error) throw error;

            alert("Facture créée avec succès !");
            setIsModalOpen(false);
            setNewInvoice({
                userId: "",
                amount: "",
                description: "",
                dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
            });
            fetchInvoices();
        } catch (err: any) {
            alert("Erreur de création : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleUpdateStatus = async (invoiceId: string, newStatus: string) => {
        if (!confirm(`Voulez-vous marquer cette facture comme ${newStatus === 'paye' ? 'payée' : 'annulée'} ?`)) return;

        setIsActionLoading(true);
        try {
            const { error } = await supabase
                .from('invoices')
                .update({ status: newStatus })
                .eq('id', invoiceId);

            if (error) throw error;

            // Créer une notification pour le client
            const invoice = invoices.find(i => i.id === invoiceId);
            if (invoice) {
                await supabase.from('notifications').insert({
                    user_id: invoice.user_id,
                    title: newStatus === 'paye' ? 'Paiement Validé' : 'Paiement Rejeté',
                    description: newStatus === 'paye'
                        ? `Votre paiement de ${invoice.amount} DA a été validé. Merci !`
                        : `Le reçu envoyé pour votre facture de ${invoice.amount} DA a été rejeté.`,
                    type: newStatus === 'paye' ? 'success' : 'error'
                });
            }

            fetchInvoices();
        } catch (err: any) {
            alert("Erreur lors de la mise à jour : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleDeleteInvoice = async (invoiceId: string) => {
        if (!confirm("Voulez-vous supprimer définitivement cette facture ?")) return;

        setIsActionLoading(true);
        try {
            const { error } = await supabase
                .from('invoices')
                .delete()
                .eq('id', invoiceId);

            if (error) throw error;

            alert("Facture supprimée !");
            fetchInvoices();
        } catch (err: any) {
            alert("Erreur lors de la suppression : " + err.message);
        } finally {
            setIsActionLoading(false);
            setSelectedInvoice(null);
        }
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'paye':
                return "bg-emerald-50 text-emerald-600 border-emerald-100";
            case 'en_verification':
                return "bg-sky-50 text-sky-600 border-sky-100";
            case 'annule':
                return "bg-slate-50 text-slate-400 border-slate-100";
            default:
                return "bg-amber-50 text-amber-600 border-amber-100";
        }
    };

    if (isCheckingRole) return null;

    if (userRole === 'employee') {
        return (
            <div className="max-w-7xl mx-auto py-32 text-center space-y-4">
                <Ban className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Espace Financier Sécurisé</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto">L'accès aux factures et aux paiements est strictement réservé à la direction.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion Financière</h1>
                    <p className="text-slate-500 font-medium">Suivez les revenus et gérez les factures de l'agence.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={exportToCSV}
                        className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all text-slate-700 flex items-center gap-2"
                    >
                        <Download className="w-4 h-4" />
                        Exporter CSV
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="px-5 py-2.5 bg-slate-950 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg shadow-sky-500/10 flex items-center gap-2"
                    >
                        <Plus className="w-4 h-4" />
                        Nouvelle Facture
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: "Volume d'Affaire Total", value: `${stats.total.toLocaleString()} DA`, icon: <BarChart3 className="w-5 h-5 text-indigo-500" />, bg: "bg-indigo-50" },
                    { title: "Paiements Confirmés", value: `${stats.paid.toLocaleString()} DA`, icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" },
                    { title: "En Vérification", value: `${stats.verification.toLocaleString()} DA`, icon: <Loader2 className="w-5 h-5 text-sky-500 animate-spin" />, bg: "bg-sky-50" },
                    { title: "Factures en Attente", value: `${stats.pending.toLocaleString()} DA`, icon: <Clock className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50" },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.title}</span>
                        </div>
                        <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            {/* Invoices Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden font-sans">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Réf / Date</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Description</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Montant</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-amber-500 mx-auto mb-4" />
                                        <p className="text-slate-400 font-black text-[10px] uppercase tracking-widest">Chargement des transactions...</p>
                                    </td>
                                </tr>
                            ) : invoices.length > 0 ? (
                                invoices.map((inv, i) => (
                                    <motion.tr
                                        key={inv.id}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50 transition-colors group cursor-pointer font-sans"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-slate-900 uppercase">#{inv.id.substring(0, 8)}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">{new Date(inv.created_at).toLocaleDateString()}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-black text-[10px] text-slate-500 uppercase">
                                                    {inv.profiles?.first_name?.substring(0, 1) || "?"}
                                                </div>
                                                <div className="text-sm font-black text-slate-900 uppercase truncate max-w-[150px]">
                                                    {inv.profiles?.first_name} {inv.profiles?.last_name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-bold text-slate-500 truncate max-w-[200px]">{inv.description || "Service Agence"}</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="text-base font-black text-slate-900 whitespace-nowrap">{inv.amount.toLocaleString()} DA</div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${getStatusStyle(inv.status)}`}>
                                                {inv.status === 'paye' ? 'Réglé' : inv.status === 'annule' ? 'Annulé' : inv.status === 'en_verification' ? 'Vérification' : 'En Attente'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6 text-right flex items-center justify-end gap-2">
                                            {inv.receipt_url && (
                                                <a
                                                    href={inv.receipt_url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-2.5 bg-sky-50 text-sky-600 hover:bg-sky-100 rounded-xl transition-all border border-sky-100"
                                                    title="Voir le reçu"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </a>
                                            )}
                                            {inv.status === 'en_verification' && (
                                                <>
                                                    <button
                                                        onClick={() => handleUpdateStatus(inv.id, 'paye')}
                                                        className="p-2.5 bg-emerald-50 text-emerald-600 hover:bg-emerald-100 rounded-xl transition-all border border-emerald-100"
                                                        title="Valider le paiement"
                                                    >
                                                        <Check className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleUpdateStatus(inv.id, 'en_attente')}
                                                        className="p-2.5 bg-amber-50 text-amber-600 hover:bg-amber-100 rounded-xl transition-all border border-amber-100"
                                                        title="Rejeter et redemander"
                                                    >
                                                        <Ban className="w-4 h-4" />
                                                    </button>
                                                </>
                                            )}
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setSelectedInvoice(inv);
                                                }}
                                                className="p-2.5 bg-white border border-slate-100 text-slate-400 hover:text-slate-900 hover:shadow-sm rounded-xl transition-all"
                                            >
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-8 py-20 text-center">
                                        <Receipt className="w-16 h-16 text-slate-100 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Aucune facture émise pour le moment.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal de Création de Facture */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isActionLoading && setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-lg rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.2)] relative overflow-hidden flex flex-col border border-slate-100"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-950">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-amber-500 text-slate-950 rounded-xl flex items-center justify-center shadow-lg shadow-amber-500/20">
                                        <Plus className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-white leading-tight">Nouvelle Facture</h2>
                                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Émission manuelle</p>
                                    </div>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-800 rounded-xl transition-colors">
                                    <X className="w-5 h-5 text-slate-500" />
                                </button>
                            </div>

                            <form onSubmit={handleCreateInvoice} className="p-8 space-y-6 bg-white">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Choisir le Client</label>
                                        <div className="relative">
                                            <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <select
                                                required
                                                value={newInvoice.userId}
                                                onChange={(e) => setNewInvoice({ ...newInvoice, userId: e.target.value })}
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white focus:ring-4 ring-amber-500/10 outline-none text-sm font-black text-slate-900 transition-all appearance-none cursor-pointer"
                                            >
                                                <option value="">Sélectionner un client...</option>
                                                {clients.map(c => (
                                                    <option key={c.id} value={c.id}>{c.first_name} {c.last_name}</option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Montant (DA)</label>
                                            <input
                                                type="number"
                                                required
                                                value={newInvoice.amount}
                                                onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
                                                placeholder="0.00"
                                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white focus:ring-4 ring-amber-500/10 outline-none text-sm font-black text-slate-900 transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Échéance</label>
                                            <input
                                                type="date"
                                                required
                                                value={newInvoice.dueDate}
                                                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
                                                className="w-full p-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white focus:ring-4 ring-amber-500/10 outline-none text-sm font-black text-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] block mb-2 px-1">Libellé de la facture</label>
                                        <div className="relative">
                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                            <input
                                                type="text"
                                                value={newInvoice.description}
                                                onChange={(e) => setNewInvoice({ ...newInvoice, description: e.target.value })}
                                                placeholder="Ex: Traitement Dossier Canada..."
                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-amber-500 focus:bg-white focus:ring-4 ring-amber-500/10 outline-none text-sm font-black text-slate-900 transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        disabled={isActionLoading}
                                        className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl shadow-slate-900/20 hover:bg-slate-900 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group"
                                    >
                                        {isActionLoading ? (
                                            <Loader2 className="w-5 h-5 animate-spin" />
                                        ) : (
                                            <>
                                                <span>Émettre la Facture</span>
                                                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-amber-500" />
                                            </>
                                        )}
                                    </button>
                                    <p className="text-[9px] text-center text-slate-400 mt-4 font-black uppercase tracking-widest leading-relaxed">
                                        Une notification sera envoyée au client dès la validation.
                                    </p>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
            <AnimatePresence>
                {selectedInvoice && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => !isActionLoading && setSelectedInvoice(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-sm rounded-[2.5rem] shadow-2xl relative overflow-hidden flex flex-col border border-slate-100"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white shadow-sm rounded-xl flex items-center justify-center text-slate-900">
                                        <Receipt className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-sm font-black text-slate-900 uppercase tracking-tight">#{selectedInvoice.id.substring(0, 8)}</h2>
                                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{selectedInvoice.amount.toLocaleString()} DA</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedInvoice(null)} className="p-2 hover:bg-white rounded-xl transition-colors shadow-sm">
                                    <X className="w-5 h-5 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-6 space-y-3">
                                <button
                                    onClick={() => {
                                        handleUpdateStatus(selectedInvoice.id, 'paye');
                                        setSelectedInvoice(null);
                                    }}
                                    className="w-full px-4 py-4 text-xs font-black text-emerald-600 bg-emerald-50 hover:bg-emerald-100 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest"
                                >
                                    <Check className="w-4 h-4" />
                                    Confirmer Paiement
                                </button>
                                <button
                                    onClick={() => {
                                        handleUpdateStatus(selectedInvoice.id, 'annule');
                                        setSelectedInvoice(null);
                                    }}
                                    className="w-full px-4 py-4 text-xs font-black text-rose-600 bg-rose-50 hover:bg-rose-100 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest"
                                >
                                    <Ban className="w-4 h-4" />
                                    Annuler la Facture
                                </button>
                                <div className="h-px bg-slate-50 my-2" />
                                <button
                                    onClick={() => {
                                        handleDeleteInvoice(selectedInvoice.id);
                                        setSelectedInvoice(null);
                                    }}
                                    className="w-full px-4 py-4 text-xs font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-2xl flex items-center justify-center gap-3 transition-all uppercase tracking-widest"
                                >
                                    <X className="w-4 h-4" />
                                    Supprimer définitivement
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
