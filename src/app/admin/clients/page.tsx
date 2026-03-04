"use client";

import { motion } from "framer-motion";
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
    Calendar
} from "lucide-react";
import { useState } from "react";

export default function AdminClientsPage() {
    const clients = [
        { id: "CL-051", name: "Oussama Travel", email: "oussama@travel.dz", phone: "+213 555 12 34 56", country: "Algérie", registration: "12 Mars 2024", status: "Vérifié", dossiers: 2 },
        { id: "CL-050", name: "Sara Amrani", email: "sara@gmail.com", phone: "+213 666 44 22 11", country: "France", registration: "08 Mars 2024", status: "En attente", dossiers: 1 },
        { id: "CL-049", name: "Karim Brahimi", email: "karim.b@outlook.fr", phone: "+213 777 88 99 00", country: "Canada", registration: "05 Mars 2024", status: "Vérifié", dossiers: 3 },
        { id: "CL-048", name: "Mina Belkacem", email: "mina.b@gmail.com", phone: "+213 550 11 22 33", country: "Malaisie", registration: "01 Mars 2024", status: "Inactif", dossiers: 0 },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion des Clients</h1>
                    <p className="text-slate-500 font-medium">Visualisez, gérez et contactez les utilisateurs de votre plateforme.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-amber-400 text-slate-950 font-black rounded-2xl hover:bg-amber-500 transition-all shadow-lg shadow-amber-500/10">
                    <UserPlus className="w-5 h-5" />
                    Ajouter un Client
                </button>
            </div>

            {/* Filters & Actions */}
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-amber-500 transition-colors" />
                    <input
                        type="text"
                        placeholder="Rechercher par nom, email, ID ou numéro..."
                        className="w-full bg-white border border-slate-200 rounded-[1.25rem] py-4 pl-12 pr-4 text-sm focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-medium text-slate-900 shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-6 py-4 bg-white border border-slate-100 rounded-[1.25rem] font-bold text-sm text-slate-700 hover:bg-slate-50 shadow-sm transition-all focus:ring-2 focus:ring-slate-100">
                        <Filter className="w-4 h-4" />
                        Trier par
                    </button>
                    <button className="flex items-center gap-2 px-6 py-4 bg-slate-950 text-white rounded-[1.25rem] font-bold text-sm hover:opacity-90 transition-all shadow-md">
                        Exporter CSV
                    </button>
                </div>
            </div>

            {/* Clients Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Client</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Informations</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Statut</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">S'est inscrit le</th>
                                <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {clients.map((client, i) => (
                                <motion.tr
                                    key={client.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.05 }}
                                    className="hover:bg-slate-50 transition-colors group"
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
                                        <div className="flex items-center justify-end gap-2">
                                            <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-sky-600 hover:border-sky-100 hover:bg-sky-50 rounded-xl transition-all shadow-sm">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button className="p-3 bg-white border border-slate-100 text-slate-400 hover:text-amber-500 hover:border-amber-100 hover:bg-amber-50 rounded-xl transition-all shadow-sm">
                                                <Users className="w-4 h-4" />
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
                <div className="p-8 bg-slate-50/50 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400">Affichage de 4 clients sur 152</span>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 bg-white border border-slate-200 rounded-lg text-[10px] font-black text-slate-400 uppercase hover:bg-slate-100 transition-all">Précédent</button>
                        <button className="px-4 py-2 bg-slate-950 border border-slate-950 rounded-lg text-[10px] font-black text-white uppercase hover:opacity-90 transition-all">Suivant</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
