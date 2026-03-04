"use client";

import { motion } from "framer-motion";
import {
    BarChart3,
    Users,
    Files,
    CheckCircle2,
    Clock,
    TrendingUp,
    AlertCircle,
    ArrowUpRight,
    ArrowDownRight,
    UserCheck,
    Plane,
    FileSearch,
    Check,
    X,
    Eye,
    MoreVertical
} from "lucide-react";

export default function AdminDashboardOverview() {
    const stats = [
        { title: "Nouveaux Clients", value: "14", trend: "+12%", up: true, icon: <UserCheck className="w-5 h-5 text-emerald-500" />, bg: "bg-emerald-50" },
        { title: "Dossiers à Valider", value: "08", trend: "+2", up: true, icon: <FileSearch className="w-5 h-5 text-amber-500" />, bg: "bg-amber-50" },
        { title: "Revenus (Estimation)", value: "250K DA", trend: "+5%", up: true, icon: <BarChart3 className="w-5 h-5 text-sky-500" />, bg: "bg-sky-50" },
        { title: "Taux de Réussite", value: "98.4%", trend: "-0.2%", up: false, icon: <CheckCircle2 className="w-5 h-5 text-indigo-500" />, bg: "bg-indigo-50" },
    ];

    const pendingDossiers = [
        { id: "OT-2024-112", client: "Karim Brahimi", service: "Visa Études Canada", date: "Il y a 2h", status: "À vérifier", avatar: "KB" },
        { id: "OT-2024-110", client: "Sara Amrani", service: "Visa Touriste Dubaï", date: "Il y a 5h", status: "En attente docs", avatar: "SA" },
        { id: "OT-2024-108", client: "Mourad Yazid", service: "Immigration France", date: "Hier", status: "Urgent", avatar: "MY" },
    ];

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Bonjour, Administrateur 👋</h1>
                    <p className="text-slate-500 font-medium">Voici l'activité de l'agence Oussama Travel aujourd'hui.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl font-bold text-sm hover:bg-slate-50 transition-all text-slate-700">Exporter Rapport</button>
                    <button className="px-5 py-2.5 bg-slate-950 text-white rounded-xl font-bold text-sm hover:bg-slate-900 transition-all shadow-lg shadow-sky-500/10">Nouveau Service</button>
                </div>
            </div>

            {/* Grid Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all"
                    >
                        <div className="flex items-center justify-between mb-4">
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${stat.bg}`}>
                                {stat.icon}
                            </div>
                            <div className={`flex items-center gap-1 text-xs font-black px-2 py-1 rounded-full ${stat.up ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"}`}>
                                {stat.up ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {stat.trend}
                            </div>
                        </div>
                        <div className="text-sm font-bold text-slate-500 mb-1">{stat.title}</div>
                        <div className="text-3xl font-black text-slate-900 tracking-tight">{stat.value}</div>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Pending Files Table (2/3) */}
                <div className="lg:col-span-2 space-y-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <Clock className="w-6 h-6 text-amber-500" />
                        Dossiers en attente de traitement
                    </h2>

                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-4 space-y-1">
                            {pendingDossiers.map((dossier, i) => (
                                <div key={dossier.id} className="p-4 rounded-3xl hover:bg-slate-50 transition-all flex items-center justify-between group border border-transparent hover:border-slate-100 cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-xs ring-4 ring-slate-100">
                                            {dossier.avatar}
                                        </div>
                                        <div>
                                            <div className="font-black text-slate-900 text-sm">{dossier.client}</div>
                                            <div className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                {dossier.id} • <span className="text-sky-600">{dossier.service}</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-6">
                                        <div className="hidden md:block text-right">
                                            <div className="text-xs font-black text-slate-900">{dossier.date}</div>
                                            <span className={`text-[9px] font-black uppercase px-2 py-0.5 rounded-full border ${dossier.status === "Urgent" ? "bg-rose-50 text-rose-600 border-rose-100" : "bg-amber-50 text-amber-600 border-amber-100"
                                                }`}>{dossier.status}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <button className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-100 transition-all"><Check className="w-4 h-4" /></button>
                                            <button className="p-2.5 bg-slate-100 text-slate-400 rounded-xl hover:bg-slate-900 hover:text-white transition-all"><Eye className="w-4 h-4" /></button>
                                            <button className="p-2.5 text-slate-300 hover:text-slate-900"><MoreVertical className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-xs font-bold text-slate-500">Affichage de 3 dossiers sur 8 prioritaires</span>
                            <button className="text-xs font-black text-sky-600 hover:text-sky-700 flex items-center gap-1 uppercase tracking-widest">Voir tout le flux <ArrowUpRight className="w-3 h-3" /></button>
                        </div>
                    </div>
                </div>

                {/* Alerts & Notifications Column (1/3) */}
                <div className="space-y-6">
                    <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                        <AlertCircle className="w-6 h-6 text-indigo-500" />
                        Activités Récentes
                    </h2>

                    <div className="space-y-4">
                        {[
                            { user: "Oussama", act: "A importé son Passeport", time: "12m", icon: <Users className="w-4 h-4 text-emerald-500" /> },
                            { user: "System", act: "Paiement 15k DA reçu", time: "45m", icon: <TrendingUp className="w-4 h-4 text-sky-500" /> },
                            { user: "Sara", act: "A ouvert un dossier Dubaï", time: "2h", icon: <Plane className="w-4 h-4 text-amber-500" /> },
                            { user: "Admin", act: "A mis à jour les tarifs", time: "5h", icon: <Settings className="w-4 h-4 text-slate-500" /> }
                        ].map((item, i) => (
                            <div key={i} className="p-5 bg-white border border-slate-100 rounded-3xl flex items-center gap-4 shadow-sm hover:translate-x-1 transition-transform cursor-pointer">
                                <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0">
                                    {item.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-xs font-black text-slate-900 truncate"><span className="text-slate-400 mr-1">Admin:</span> {item.user}</div>
                                    <div className="text-xs font-bold text-slate-500 truncate">{item.act}</div>
                                </div>
                                <span className="text-[10px] font-black text-slate-300 uppercase shrink-0">{item.time}</span>
                            </div>
                        ))}
                    </div>

                    <button className="w-full py-4 bg-white border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
                        Voir le journal d'audit complet
                    </button>
                </div>
            </div>
        </div>
    );
}

// Ajout des imports manquants si nécessaires (Settings, Plane)
import { Settings } from "lucide-react";
