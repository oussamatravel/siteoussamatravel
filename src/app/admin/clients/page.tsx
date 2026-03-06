"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Users,
    Search,
    Filter,
    Mail,
    Phone,
    MoreVertical,
    ShieldCheck,
    UserPlus,
    Edit,
    Trash2,
    UserX,
    MapPin,
    Calendar,
    X,
    CheckCircle2,
    FileText,
    ExternalLink,
    ArrowRight,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminClientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const [clients, setClients] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [stats, setStats] = useState({
        total: 0,
        verified: 0,
        pending: 0,
        new: 0
    });
    const supabase = createClient();

    useEffect(() => {
        fetchClients();
    }, []);

    const fetchClients = async () => {
        setIsLoading(true);
        try {
            // 1. Fetch profiles
            const { data: profiles, error } = await supabase
                .from('profiles')
                .select(`
                    *,
                    applications:applications(count)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;

            // 2. Format profiles
            const formattedClients = (profiles || []).map(p => ({
                id: p.id.substring(0, 8).toUpperCase(),
                realId: p.id,
                name: `${p.first_name || ""} ${p.last_name || ""}`.trim() || "Sans nom",
                email: p.email || "Non renseigné",
                phone: p.phone || "Non renseigné",
                country: "Algérie",
                registration: new Date(p.created_at).toLocaleDateString('fr-FR'),
                rawCreatedAt: p.created_at,
                status: p.role === 'admin' ? "Admin" : "Vérifié",
                dossiers: p.applications?.[0]?.count || 0,
                lastLogin: "Récemment",
                address: "Non renseignée"
            }));

            setClients(formattedClients);

            // 3. Stats Calculation
            const now = new Date();
            const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

            setStats({
                total: formattedClients.length,
                verified: formattedClients.filter(c => c.status === "Vérifié" || c.status === "Admin").length,
                pending: formattedClients.filter(c => c.status === "En attente").length,
                new: formattedClients.filter(c => new Date(c.rawCreatedAt) > sevenDaysAgo).length
            });

            // 3. Simple Stats Calculation

        } catch (err: any) {
            console.error("Erreur fetch clients:", err.message);
        } finally {
            setIsLoading(false);
        }
    };

    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.id.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!mounted) return null;

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion des Clients</h1>
                    <p className="text-slate-500 font-medium">Visualisez, gérez et contactez les utilisateurs de votre plateforme.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-950 font-black rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-500/10 active:scale-95">
                    <UserPlus className="w-5 h-5" />
                    Ajouter un Client
                </button>
            </div>

            {/* Stats Summary */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                    { label: "Total Clients", value: stats.total.toString(), icon: <Users className="w-5 h-5 text-indigo-500" /> },
                    { label: "Vérifiés", value: stats.verified.toString(), icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
                    { label: "En Attente", value: stats.pending.toString(), icon: <Calendar className="w-5 h-5 text-amber-500" /> },
                    { label: "Nouveaux (7j)", value: `+${stats.new}`, icon: <UserPlus className="w-5 h-5 text-sky-500" /> },
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center">{stat.icon}</div>
                        <div>
                            <div className="text-2xl font-black text-slate-900 leading-none mb-1">{stat.value}</div>
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email, ID..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-medium text-slate-900 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-[1.25rem] font-bold text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all">
                        <Filter className="w-4 h-4" />
                        Filtrer
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-slate-950 text-white rounded-[1.25rem] font-bold text-sm hover:opacity-90 transition-all shadow-md">
                        Exporter CSV
                    </button>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Informations</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Inscrit le</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="px-8 py-20 text-center text-slate-400">
                                        <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4" />
                                        <p className="font-bold uppercase text-[10px] tracking-widest">Récupération des profils...</p>
                                    </td>
                                </tr>
                            ) : filteredClients.map((client, i) => (
                                <motion.tr
                                    key={client.realId}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    onClick={() => setSelectedClient(client)}
                                    className="hover:bg-slate-50 transition-colors group cursor-pointer"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black text-xs ring-4 ring-amber-500/5 group-hover:scale-110 transition-transform">
                                                {client.name.substring(0, 1)}
                                            </div>
                                            <div>
                                                <div className="font-black text-slate-900 group-hover:text-amber-600 transition-colors">{client.name}</div>
                                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{client.id}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="space-y-1">
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                                                <Mail className="w-3 h-3 text-slate-400" />
                                                {client.email}
                                            </div>
                                            <div className="flex items-center gap-2 text-sm text-slate-600 font-medium tracking-tight">
                                                <Phone className="w-3 h-3 text-slate-400" />
                                                {client.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider border shadow-sm ${client.status === "Vérifié" ? "bg-emerald-50 text-emerald-600 border-emerald-100" :
                                            client.status === "En attente" ? "bg-amber-50 text-amber-600 border-amber-100" : "bg-slate-50 text-slate-400 border-slate-100"
                                            }`}>
                                            {client.status === "Vérifié" && <ShieldCheck className="w-3 h-3" />}
                                            {client.status}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-sm font-black text-slate-900">{client.registration}</div>
                                        <div className="text-[10px] font-bold text-slate-400 flex items-center gap-1 uppercase">
                                            <MapPin className="w-3 h-3" />
                                            {client.country}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center justify-end gap-2 pr-2">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); setSelectedClient(client); }}
                                                className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:border-sky-100 hover:bg-sky-50 rounded-xl transition-all shadow-sm"
                                            >
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-red-600 hover:border-red-100 hover:bg-red-50 rounded-xl transition-all shadow-sm">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {filteredClients.length === 0 && (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto">
                            <UserX className="w-10 h-10 text-slate-300" />
                        </div>
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Aucun client trouvé pour "{searchTerm}"</p>
                    </div>
                )}
                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Affichage de {filteredClients.length} clients sur {stats.total}</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all">Précédent</button>
                        <button className="px-4 py-2 bg-slate-950 border border-slate-950 rounded-lg text-[10px] font-black text-white uppercase hover:opacity-90 transition-all">Suivant</button>
                    </div>
                </div>
            </div>

            {/* Client Detail Modal */}
            <AnimatePresence>
                {selectedClient && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedClient(null)}
                            className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col max-h-[90vh]"
                        >
                            <div className="p-8 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 bg-amber-400 text-slate-950 rounded-2xl shadow-xl shadow-amber-500/10 flex items-center justify-center font-black text-xl">
                                        {selectedClient.name.substring(0, 1)}
                                    </div>
                                    <div>
                                        <h2 className="text-2xl font-black text-slate-900 tracking-tight">{selectedClient.name}</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Client ID: {selectedClient.id}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setSelectedClient(null)}
                                    className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-10 space-y-10">
                                <div className="grid grid-cols-2 gap-8">
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Principal</div>
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-sky-500" />
                                            {selectedClient.email}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Numéro Mobile</div>
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-emerald-500" />
                                            {selectedClient.phone}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dernière Connexion</div>
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            <Calendar className="w-4 h-4 text-amber-500" />
                                            {selectedClient.lastLogin}
                                        </div>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Localisation</div>
                                        <div className="font-bold text-slate-900 flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-rose-500" />
                                            {selectedClient.address}
                                        </div>
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white relative overflow-hidden">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full"></div>
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-3">
                                            <FileText className="w-8 h-8 text-sky-400" />
                                            <h3 className="text-xl font-black uppercase tracking-tighter">Historique Dossiers</h3>
                                        </div>
                                        <span className="px-4 py-1.5 bg-white/10 rounded-full text-xs font-black uppercase tracking-wider">{selectedClient.dossiers} Dossiers</span>
                                    </div>
                                    <div className="space-y-3">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-emerald-500/20 text-emerald-400 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-4 h-4" /></div>
                                                <div className="text-sm font-bold">Visa Études Canada 2024</div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between group hover:bg-white/10 transition-colors cursor-pointer opacity-50">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-amber-500/20 text-amber-400 rounded-lg flex items-center justify-center"><Loader2 className="w-4 h-4 animate-spin" /></div>
                                                <div className="text-sm font-bold">Assistance Visa Schengen</div>
                                            </div>
                                            <ExternalLink className="w-4 h-4 text-slate-500" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-8 border-t border-slate-100 bg-slate-50/50 flex items-center justify-end gap-3">
                                <button className="px-6 py-3 border border-slate-200 text-slate-500 font-black text-xs rounded-xl hover:bg-white transition-all uppercase tracking-widest">Bloquer le Compte</button>
                                <button
                                    onClick={async () => {
                                        const newRole = selectedClient.status === "Admin" ? "client" : "admin";
                                        if (!confirm(`Voulez-vous passer ce client en tant que ${newRole} ?`)) return;

                                        const { error } = await supabase
                                            .from('profiles')
                                            .update({ role: newRole })
                                            .eq('id', selectedClient.realId);

                                        if (error) alert(error.message);
                                        else {
                                            await fetchClients();
                                            setSelectedClient(null);
                                        }
                                    }}
                                    className="px-8 py-3 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-200"
                                >
                                    Changer de Rôle
                                    <ArrowRight className="w-4 h-4" />
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
