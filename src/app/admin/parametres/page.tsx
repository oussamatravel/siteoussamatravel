"use client";

import { motion } from "framer-motion";
import {
    Settings,
    Globe2,
    Landmark,
    CreditCard,
    ShieldCheck,
    Bell,
    Save,
    Plus,
    ChevronRight,
    Info,
    Smartphone,
    Server,
    Database
} from "lucide-react";

export default function AdminParametresPage() {
    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Paramètres du Système</h1>
                    <p className="text-slate-500 font-medium">Configurez les services, les tarifs et la sécurité de Oussama Travel.</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl shadow-sky-500/10 active:scale-95">
                    <Save className="w-5 h-5 mx-1" />
                    Appliquer les changements
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                {/* Settings Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    {[
                        { name: "Services & Tarifs", icon: <Globe2 className="w-5 h-5" />, active: true },
                        { name: "Passerelle Paiement", icon: <CreditCard className="w-5 h-5" />, active: false },
                        { name: "Sécurisation App", icon: <ShieldCheck className="w-5 h-5" />, active: false },
                        { name: "Notifications SMS/Email", icon: <Bell className="w-5 h-5" />, active: false },
                        { name: "Base de Données", icon: <Database className="w-5 h-5" />, active: false }
                    ].map((item, i) => (
                        <button key={i} className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all border ${item.active
                                ? "bg-white text-slate-950 font-black border-slate-100 shadow-xl shadow-slate-200/50 translate-x-1"
                                : "bg-transparent text-slate-400 border-transparent hover:bg-white hover:text-slate-600"
                            }`}>
                            <div className="flex items-center gap-4 text-xs uppercase tracking-widest">
                                {item.icon}
                                {item.name}
                            </div>
                            {item.active && <ChevronRight className="w-4 h-4 text-amber-500" />}
                        </button>
                    ))}
                </div>

                {/* Settings Content Area */}
                <div className="lg:col-span-3 space-y-8">
                    {/* Section 1: Services & Tarifs */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12"
                    >
                        <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                            <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                                <Landmark className="w-6 h-6 text-amber-500" />
                                Catalogue des Services Actifs
                            </h3>
                            <button className="p-2 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all"><Plus className="w-5 h-5" /></button>
                        </div>

                        <div className="space-y-6">
                            {/* Service Row 1 */}
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:bg-white transition-all cursor-pointer group">
                                <div>
                                    <div className="font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">Visa Études - Canada</div>
                                    <div className="text-[10px] font-black font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Globe2 className="w-3 h-3" />
                                        International / Academic
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Frais Agence</div>
                                        <div className="text-lg font-black text-slate-900 tracking-tight">15,000 DA</div>
                                    </div>
                                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Service Row 2 */}
                            <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-lg hover:bg-white transition-all cursor-pointer group">
                                <div>
                                    <div className="font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors">Visa Touriste - Dubaï (E.A.U)</div>
                                    <div className="text-[10px] font-black font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                        <Globe2 className="w-3 h-3" />
                                        Tourist / E-Visa
                                    </div>
                                </div>
                                <div className="flex items-center gap-8">
                                    <div className="text-right">
                                        <div className="text-xs font-bold text-slate-400 uppercase mb-1">Frais Agence</div>
                                        <div className="text-lg font-black text-slate-900 tracking-tight">8,500 DA</div>
                                    </div>
                                    <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                        <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 p-6 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                            <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                            <div>
                                <h4 className="font-black text-amber-900 text-sm mb-1 uppercase tracking-tight">Modification des Tarifs</h4>
                                <p className="text-xs text-amber-800 leading-relaxed font-medium">Les changements de prix s'appliqueront uniquement aux <strong className="font-black">nouveaux dossiers</strong> ouverts après l'enregistrement.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Section 2: État du Serveur (Monitoring) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-500 shadow-sm border border-indigo-100">
                                <Smartphone className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Notification PUSH</div>
                                <div className="text-xl font-black text-slate-900">Actif (Connecté)</div>
                            </div>
                        </div>
                        <div className="p-8 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-center gap-6">
                            <div className="w-14 h-14 rounded-2xl bg-slate-950 flex items-center justify-center text-white shadow-xl shadow-slate-200">
                                <Server className="w-7 h-7" />
                            </div>
                            <div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Stockage Cloud</div>
                                <div className="text-xl font-black text-slate-900 text-indigo-600">92% Libre</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
