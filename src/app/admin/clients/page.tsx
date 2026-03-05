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

export default function AdminClientsPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedClient, setSelectedClient] = useState<any>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const clients = [
        { id: "CL-051", name: "Oussama Travel", email: "oussama@travel.dz", phone: "+213 555 12 34 56", country: "Algérie", registration: "12 Mars 2024", status: "Vérifié", dossiers: 2, lastLogin: "Il y a 10 min", address: "Bab Ezzouar, Alger" },
        { id: "CL-050", name: "Sara Amrani", email: "sara@gmail.com", phone: "+213 666 44 22 11", country: "France", registration: "08 Mars 2024", status: "En attente", dossiers: 1, lastLogin: "Il y a 2h", address: "Paris, France" },
        { id: "CL-049", name: "Karim Brahimi", email: "karim.b@outlook.fr", phone: "+213 777 88 99 00", country: "Canada", registration: "05 Mars 2024", status: "Vérifié", dossiers: 3, lastLogin: "Hier", address: "Montréal, QC" },
        { id: "CL-048", name: "Mina Belkacem", email: "mina.b@gmail.com", phone: "+213 550 11 22 33", country: "Malaisie", registration: "01 Mars 2024", status: "Inactif", dossiers: 0, lastLogin: "3 jours", address: "Kuala Lumpur" },
    ];

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
                    { label: "Total Clients", value: "152", icon: <Users className="w-5 h-5 text-indigo-500" /> },
                    { label: "Vérifiés", value: "128", icon: <ShieldCheck className="w-5 h-5 text-emerald-500" /> },
                    { label: "En Attente", value: "14", icon: <Calendar className="w-5 h-5 text-amber-500" /> },
                    { label: "Nouveaux (7j)", value: "+22", icon: <UserPlus className="w-5 h-5 text-sky-500" /> },
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
                            {filteredClients.map((client, i) => (
                                <motion.tr
                                    key={client.id}
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
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Affichage de {filteredClients.length} clients sur 152</span>
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
                                <button className="px-8 py-3 bg-slate-900 text-white font-black text-xs rounded-xl hover:bg-slate-800 transition-all uppercase tracking-widest flex items-center gap-2 shadow-xl shadow-slate-200">
                                    Modifier Profil
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
