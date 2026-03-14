"use client";

import { motion, AnimatePresence } from "framer-motion";
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
import { createClient } from "@/lib/supabase/client";
import ApplicationChat from "@/components/ApplicationChat";

export default function AdminDossiersPage() {
    const [selectedDossier, setSelectedDossier] = useState<any>(null);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [isActionLoading, setIsActionLoading] = useState(false);
    const [showInvoiceForm, setShowInvoiceForm] = useState(false);
    const [invoiceAmount, setInvoiceAmount] = useState("");
    const [invoiceDesc, setInvoiceDesc] = useState("");
    const [mounted, setMounted] = useState(false);
    const [dossiers, setDossiers] = useState<any[]>([]);
    const [agents, setAgents] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [filterAgent, setFilterAgent] = useState<string>("all");
    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        fetchAgents();
        fetchDossiers();
    }, []);

    const fetchAgents = async () => {
        const { data } = await supabase.from('profiles').select('id, first_name, last_name, role').in('role', ['admin', 'employee']);
        if (data) setAgents(data);
    };

    const fetchDossiers = async () => {
        setIsLoading(true);
        try {
            const { data: apps, error } = await supabase
                .from('applications')
                .select(`
                    *,
                    profiles:user_id (
                        first_name,
                        last_name,
                        phone
                    )
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            const dossiersWithDocs = await Promise.all((apps || []).map(async (app) => {
                const { data: files } = await supabase.storage
                    .from('client_documents')
                    .list(`${app.user_id}/${app.id}`);

                const assignedAgent = agents.find(a => a.id === app.assigned_to);

                return {
                    ...app,
                    client: `${app.profiles?.first_name} ${app.profiles?.last_name}`,
                    email: app.profiles?.phone || "Non renseigné",
                    type: app.service_type,
                    dest: app.target_country,
                    date: new Date(app.created_at).toLocaleDateString('fr-FR'),
                    statusLabel: mapStatus(app.status),
                    color: getStatusColor(app.status),
                    icon: getServiceIcon(app.service_type),
                    assignedName: assignedAgent ? `${assignedAgent.first_name} ${assignedAgent.last_name}` : "Non assigné",
                    documents: (files || []).map(f => ({
                        id: f.id || f.name,
                        name: f.name,
                        size: f.metadata ? `${(f.metadata.size / (1024 * 1024)).toFixed(2)}MB` : "0MB",
                        status: "Reçu"
                    }))
                };
            }));

            setDossiers(dossiersWithDocs);
        } catch (err: any) {
            console.error("Erreur fetch admin dossiers:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const mapStatus = (status: string) => {
        const statusMap: any = {
            'en_attente': 'En attente',
            'receptionner': 'Réceptionné',
            'en_cours': 'En Traitement',
            'manque_documents': 'Manque de documents',
            'termine': 'Terminé',
            'admission_recu': 'Admission reçue',
            'admission_refusee': 'Admission refusée',
            'etape_visa': 'Étape Visa',
            'valide': 'Validé',
            'rejete': 'Rejeté'
        };
        return statusMap[status] || status;
    };

    const getStatusColor = (status: string) => {
        if (status === 'valide' || status === 'termine' || status === 'admission_recu') return "bg-emerald-50 text-emerald-600 border-emerald-100";
        if (status === 'rejete' || status === 'admission_refusee') return "bg-rose-50 text-rose-600 border-rose-100";
        if (status === 'en_cours' || status === 'receptionner' || status === 'etape_visa') return "bg-sky-50 text-sky-600 border-sky-100";
        if (status === 'manque_documents') return "bg-amber-50 text-amber-600 border-amber-100";
        return "bg-slate-50 text-slate-600 border-slate-100";
    };

    const getServiceIcon = (type: string) => {
        if (type.includes('Études')) return <GraduationCap className="w-4 h-4" />;
        if (type.includes('Visa')) return <Globe2 className="w-4 h-4" />;
        return <Users className="w-4 h-4" />;
    };

    const handleAssign = async (agentId: string) => {
        if (!selectedDossier) return;
        setIsActionLoading(true);
        try {
            const newAgentId = agentId === "unassigned" ? null : agentId;
            const { error } = await supabase
                .from('applications')
                .update({ assigned_to: newAgentId })
                .eq('id', selectedDossier.id);
            if (error) throw error;

            // Notification ? 
            if (newAgentId && newAgentId !== selectedDossier.assigned_to) {
                // Just log it for now
                console.log("Assigned to", newAgentId);
            }

            await fetchDossiers();
            setSelectedDossier((prev: any) => ({ ...prev, assigned_to: newAgentId }));
        } catch (err: any) {
            alert("Erreur lors de l'attribution : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleAction = async (newStatus: string) => {
        if (!selectedDossier) return;
        setIsActionLoading(true);
        try {
            const { error } = await supabase
                .from('applications')
                .update({ status: newStatus })
                .eq('id', selectedDossier.id);

            if (error) throw error;

            // Envoi de notification Email
            const { data: session } = await supabase.auth.getSession();
            if (session?.session?.access_token && selectedDossier.user_id) {
                const statusName = mapStatus(newStatus);
                const apiUrl = typeof window !== 'undefined' ? `${window.location.origin}/api/send-email` : 'https://oussamatravel.com/api/send-email';
                fetch(apiUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${session.session.access_token}`
                    },
                    body: JSON.stringify({
                        to_user_id: selectedDossier.user_id,
                        subject: `Mise à jour de votre dossier - Oussama Travel`,
                        html: `
                    < div style = "font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; border-radius: 10px;" >
                                <h2 style="color: #0f172a;">Mise à jour de votre dossier</h2>
                                <p style="color: #475569;">Votre dossier <strong>${selectedDossier.type}</strong> (${selectedDossier.dest}) a été mis à jour par notre équipe.</p>
                                <div style="background-color: #f8fafc; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #3b82f6;">
                                    <p style="margin: 0; color: #1e293b; font-weight: bold;">Nouveau statut : ${statusName}</p>
                                </div>
                                <a href="https://www.oussamatravel.com/dashboard" style="display: inline-block; background-color: #3b82f6; color: #fff; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 8px; margin-top: 10px;">Consulter mon dossier</a>
                                <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 30px 0;" />
                                <p style="color: #94a3b8; font-size: 12px; text-align: center;">Oussama Travel - Ne répondez pas directement à cet email.</p>
                            </div >
        `
                    })
                })
                    .then(async (res) => {
                        if (!res.ok) {
                            const errText = await res.text();
                            console.error("Erreur serveur send-email:", errText);
                        }
                    })
                    .catch(err => console.error("Échec réseau send-email:", err));
            }

            await fetchDossiers();
            setSelectedDossier(null);
        } catch (err: any) {
            alert("Erreur lors de la mise à jour : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const handleCreateInvoice = async () => {
        if (!selectedDossier || !invoiceAmount) return;
        setIsActionLoading(true);
        try {
            const { error } = await supabase
                .from('invoices')
                .insert({
                    user_id: selectedDossier.user_id,
                    application_id: selectedDossier.id,
                    amount: parseFloat(invoiceAmount),
                    description: invoiceDesc || `Frais ${selectedDossier.type} - ${selectedDossier.dest} `,
                    status: 'en_attente',
                    due_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
                });

            if (error) throw error;

            alert("Facture générée avec succès !");
            setShowInvoiceForm(false);
            setInvoiceAmount("");
            setInvoiceDesc("");
        } catch (err: any) {
            alert("Erreur lors de la création de la facture : " + err.message);
        } finally {
            setIsActionLoading(false);
        }
    };

    const downloadDocument = async (fileName: string) => {
        if (!selectedDossier) return;
        try {
            const { data, error } = await supabase.storage
                .from('client_documents')
                .download(`${selectedDossier.user_id}/${selectedDossier.id}/${fileName}`);

            if (error) throw error;

            const url = URL.createObjectURL(data);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            a.click();
        } catch (err: any) {
            console.error("Download error:", err);
            alert("Erreur lors du téléchargement : " + (err.message || "Fichier introuvable ou erreur réseau"));
        }
    };

    if (!mounted) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Validation des Dossiers</h1>
                    <p className="text-slate-500 font-medium">Examinez les pièces justificatives et validez les étapes consulaires.</p>
                </div>
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="px-4 py-2 text-[10px] font-black uppercase tracking-widest text-slate-400">Filtrer par agent :</div>
                    <select
                        value={filterAgent}
                        onChange={(e) => setFilterAgent(e.target.value)}
                        className="bg-slate-50 border-none text-sm font-bold text-slate-700 rounded-xl px-4 py-2 outline-none cursor-pointer"
                    >
                        <option value="all">Tous les dossiers</option>
                        <option value="unassigned">Non assignés</option>
                        {agents.map(a => (
                            <option key={a.id} value={a.id}>{a.first_name} {a.last_name}</option>
                        ))}
                    </select>
                </div>
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
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Agent</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td className="px-8 py-12 text-center" colSpan={5}>
                                        <div className="flex flex-col items-center gap-4 text-slate-400">
                                            <Loader2 className="w-10 h-10 animate-spin" />
                                            <p className="font-black text-xs uppercase tracking-widest">Chargement des dossiers...</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : dossiers.filter(d => filterAgent === "all" ? true : filterAgent === "unassigned" ? !d.assigned_to : d.assigned_to === filterAgent).length > 0 ? (
                                dossiers.filter(d => filterAgent === "all" ? true : filterAgent === "unassigned" ? !d.assigned_to : d.assigned_to === filterAgent).map((dossier, i) => (
                                    <motion.tr
                                        key={dossier.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        onClick={() => setSelectedDossier(dossier)}
                                        className="hover:bg-slate-50 transition-colors group cursor-pointer"
                                    >
                                        <td className="px-8 py-6">
                                            <div className="text-sm font-black text-slate-900">{dossier.id.substring(0, 8)}</div>
                                            <div className="text-[10px] font-bold text-slate-400 uppercase">Reçu le {dossier.date}</div>
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
                                            <div className="flex items-center gap-2">
                                                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold ${dossier.assigned_to ? 'bg-indigo-100 text-indigo-600' : 'bg-slate-100 text-slate-400'}`}>
                                                    {dossier.assigned_to ? dossier.assignedName.substring(0, 2).toUpperCase() : '?'}
                                                </div>
                                                <span className={`text-xs font-bold ${dossier.assigned_to ? 'text-slate-900' : 'text-slate-400 italic'}`}>
                                                    {dossier.assignedName}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${dossier.color}`}>
                                                {dossier.statusLabel}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2 pr-2">
                                                <div className="p-2 bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:bg-sky-50 rounded-lg shadow-sm transition-all">
                                                    <Eye className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))
                            ) : (
                                <tr>
                                    <td className="px-8 py-12 text-center" colSpan={6}>
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Aucun dossier trouvé pour ces critères.</p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
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
                                        <h2 className="text-xl font-black text-slate-900">{selectedDossier.id.substring(0, 8)}</h2>
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
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Informations Client</div>
                                        <div className="space-y-4 font-sans">
                                            <div>
                                                <div className="text-xs font-bold text-slate-400">Nom</div>
                                                <div className="text-sm font-black text-slate-900 uppercase">{selectedDossier.client}</div>
                                            </div>
                                            <div>
                                                <div className="text-xs font-bold text-slate-400">Contact</div>
                                                <div className="text-sm font-black text-slate-900">
                                                    {selectedDossier.email}
                                                </div>
                                            </div>

                                            <button
                                                onClick={() => setShowInvoiceForm(!showInvoiceForm)}
                                                className={`w-full mt-4 p-4 border rounded-2xl flex items-center justify-center gap-2 font-black text-[10px] uppercase tracking-widest transition-all shadow-sm ${showInvoiceForm ? 'bg-amber-500 text-white border-amber-500' : 'bg-white text-slate-900 border-slate-200 hover:bg-slate-50'}`}
                                            >
                                                <Plus className={`w-4 h-4 transition-transform ${showInvoiceForm ? 'rotate-45' : ''}`} />
                                                Générer Facture
                                            </button>
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        {showInvoiceForm ? (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-8 bg-amber-50/50 border-2 border-amber-200 rounded-[2rem] space-y-6"
                                            >
                                                <div className="text-[10px] font-black text-amber-600 uppercase tracking-[0.2em]">Paramètres de Facturation</div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-sans">
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Montant (DA)</label>
                                                        <input
                                                            type="number"
                                                            value={invoiceAmount}
                                                            onChange={(e) => setInvoiceAmount(e.target.value)}
                                                            className="w-full p-4 rounded-xl border border-amber-200 focus:ring-4 ring-amber-500/10 outline-none text-sm font-black"
                                                            placeholder="Ex: 5000"
                                                        />
                                                    </div>
                                                    <div>
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">Libellé</label>
                                                        <input
                                                            type="text"
                                                            value={invoiceDesc}
                                                            onChange={(e) => setInvoiceDesc(e.target.value)}
                                                            className="w-full p-4 rounded-xl border border-amber-200 focus:ring-4 ring-amber-500/10 outline-none text-sm font-black"
                                                            placeholder="Ex: Frais de traitement"
                                                        />
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={handleCreateInvoice}
                                                    disabled={isActionLoading || !invoiceAmount}
                                                    className="w-full py-4 bg-slate-900 text-white font-black text-[10px] uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-all disabled:opacity-50 shadow-xl shadow-slate-900/10"
                                                >
                                                    {isActionLoading ? <Loader2 className="w-4 h-4 animate-spin mx-auto" /> : "Envoyer la facture au client"}
                                                </button>
                                            </motion.div>
                                        ) : (
                                            <div className="p-8 bg-white border-2 border-dashed border-slate-100 rounded-[2rem] space-y-4 font-sans h-full min-h-[300px]">
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Pièces Jointes Reçues</div>
                                                <div className="space-y-3">
                                                    {selectedDossier.documents.length > 0 ? (
                                                        selectedDossier.documents.map((doc: any) => (
                                                            <div key={doc.id} className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-2xl hover:shadow-lg transition-all group">
                                                                <div className="flex items-center gap-4 font-sans">
                                                                    <div className="w-10 h-10 bg-sky-50 text-sky-500 rounded-xl flex items-center justify-center">
                                                                        <FileText className="w-5 h-5" />
                                                                    </div>
                                                                    <div>
                                                                        <div className="text-sm font-black text-slate-900 uppercase tracking-tight">{doc.name}</div>
                                                                        <div className="text-[10px] font-bold text-slate-400 uppercase">{doc.size}</div>
                                                                    </div>
                                                                </div>
                                                                <button
                                                                    onClick={() => downloadDocument(doc.name)}
                                                                    className="p-3 bg-slate-50 text-slate-400 hover:text-sky-500 hover:bg-sky-50 rounded-xl transition-all"
                                                                >
                                                                    <Download className="w-5 h-5" />
                                                                </button>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <div className="py-20 text-center text-slate-300 text-[10px] font-black uppercase tracking-widest">
                                                            Aucun document joint
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex flex-wrap items-center justify-between font-sans gap-4">
                                <div className="flex items-center gap-4">
                                    <button
                                        onClick={() => setSelectedChat(selectedDossier.id)}
                                        className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-200 text-sky-600 hover:bg-sky-50 font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-sm active:scale-95"
                                    >
                                        <MessageSquare className="w-5 h-5" />
                                        Support Client
                                    </button>

                                    <div className="flex flex-col gap-1 border-l border-slate-200 pl-4">
                                        <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Conseiller en charge</div>
                                        <select
                                            disabled={isActionLoading}
                                            value={selectedDossier.assigned_to || "unassigned"}
                                            onChange={(e) => handleAssign(e.target.value)}
                                            className="bg-transparent border-none text-sm font-bold text-indigo-600 outline-none cursor-pointer hover:bg-indigo-50 px-2 py-1 rounded"
                                        >
                                            <option value="unassigned">-- Non assigné --</option>
                                            {agents.map(a => (
                                                <option key={a.id} value={a.id}>{a.first_name} {a.last_name} ({a.role})</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="flex flex-col gap-1 items-end">
                                        <div className="text-[9px] font-black text-slate-400 mb-1 uppercase tracking-widest">Modifier d'état du traitement</div>
                                        <select
                                            disabled={isActionLoading}
                                            value={selectedDossier.status}
                                            onChange={(e) => handleAction(e.target.value)}
                                            className="px-6 py-4 bg-white border border-slate-200 text-slate-900 font-black text-[10px] rounded-2xl outline-none focus:ring-2 focus:ring-amber-400 transition-all uppercase tracking-[0.2em] shadow-sm disabled:opacity-50 appearance-none cursor-pointer"
                                        >
                                            <option value="en_attente">⏳ En attente</option>
                                            <option value="receptionner">📩 Réceptionné</option>
                                            <option value="en_cours">⚙️ En Traitement</option>
                                            <option value="manque_documents">⚠️ Documents manquants</option>
                                            <option value="termine">✅ Terminé</option>
                                            <hr />
                                            <optgroup label="Études (Spécifique)">
                                                <option value="admission_recu">🎓 Admission reçue</option>
                                                <option value="admission_refusee">❌ Admission refusée</option>
                                                <option value="etape_visa">🛂 Étape Visa</option>
                                            </optgroup>
                                            <hr />
                                            <option value="valide">✨ Dossier Validé</option>
                                            <option value="rejete">🚫 Dossier Rejeté</option>
                                        </select>
                                    </div>
                                    {isActionLoading && <Loader2 className="w-6 h-6 animate-spin text-amber-500" />}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

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
