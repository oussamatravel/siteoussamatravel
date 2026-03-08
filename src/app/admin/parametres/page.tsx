"use client";

import { motion, AnimatePresence } from "framer-motion";
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
    Database,
    Lock,
    Eye,
    EyeOff,
    CheckCircle2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminParametresPage() {
    const [activeTab, setActiveTab] = useState("Services & Tarifs");
    const [mounted, setMounted] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCheckingRole, setIsCheckingRole] = useState(true);
    const supabase = createClient();

    useEffect(() => {
        const checkRole = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (data) setUserRole(data.role);
            }
            setIsCheckingRole(false);
        };
        checkRole();
        setMounted(true);
    }, []);

    const tabs = [
        { name: "Services & Tarifs", icon: <Globe2 className="w-5 h-5" /> },
        { name: "Passerelle Paiement", icon: <CreditCard className="w-5 h-5" /> },
        { name: "Sécurisation App", icon: <ShieldCheck className="w-5 h-5" /> },
        { name: "Notifications", icon: <Bell className="w-5 h-5" /> },
        { name: "Base de Données", icon: <Database className="w-5 h-5" /> }
    ];

    if (!mounted || isCheckingRole) return null;

    if (userRole === 'employee') {
        return (
            <div className="max-w-7xl mx-auto py-32 text-center space-y-4">
                <ShieldCheck className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Accès Restreint</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto">Votre niveau d'accès "Employé" ne vous permet pas de consulter ou de modifier les paramètres du système.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-10 font-sans pb-20">
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
                    {tabs.map((item, i) => (
                        <button
                            key={i}
                            onClick={() => setActiveTab(item.name)}
                            className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl transition-all border ${activeTab === item.name
                                ? "bg-white text-slate-950 font-black border-slate-100 shadow-xl shadow-slate-200/50 translate-x-1"
                                : "bg-transparent text-slate-400 border-transparent hover:bg-white hover:text-slate-600"
                                }`}
                        >
                            <div className="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest">
                                {item.icon}
                                {item.name}
                            </div>
                            {activeTab === item.name && <ChevronRight className="w-4 h-4 text-amber-500" />}
                        </button>
                    ))}
                </div>

                {/* Settings Content Area */}
                <div className="lg:col-span-3">
                    <AnimatePresence mode="wait">
                        {activeTab === "Services & Tarifs" && (
                            <motion.div
                                key="services"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12">
                                    <div className="flex items-center justify-between mb-10 pb-6 border-b border-slate-50">
                                        <h3 className="text-xl font-black text-slate-900 flex items-center gap-2 uppercase tracking-tighter">
                                            <Landmark className="w-6 h-6 text-amber-500" />
                                            Catalogue des Services Actifs
                                        </h3>
                                        <button className="p-3 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-100 transition-all shadow-sm shadow-amber-200/20"><Plus className="w-5 h-5" /></button>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Service Row 1 */}
                                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:bg-white transition-all cursor-pointer group">
                                            <div>
                                                <div className="font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors uppercase tracking-tight">Visa Études - Canada</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Globe2 className="w-3 h-3" />
                                                    International / Academic
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Frais Agence</div>
                                                    <div className="text-lg font-black text-slate-900 tracking-tight">15,000 DA</div>
                                                </div>
                                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer shadow-inner">
                                                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Service Row 2 */}
                                        <div className="p-6 bg-slate-50 border border-slate-100 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:bg-white transition-all cursor-pointer group">
                                            <div>
                                                <div className="font-extrabold text-slate-900 mb-1 group-hover:text-amber-600 transition-colors uppercase tracking-tight">Visa Touriste - Dubaï (E.A.U)</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                                                    <Globe2 className="w-3 h-3" />
                                                    Tourist / E-Visa
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-8">
                                                <div className="text-right">
                                                    <div className="text-[9px] font-black text-slate-400 uppercase mb-1">Frais Agence</div>
                                                    <div className="text-lg font-black text-slate-900 tracking-tight">8,500 DA</div>
                                                </div>
                                                <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer shadow-inner">
                                                    <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="mt-12 p-8 bg-amber-50 rounded-[2rem] border border-amber-100 flex items-start gap-4">
                                        <Info className="w-6 h-6 text-amber-500 shrink-0 mt-0.5" />
                                        <div>
                                            <h4 className="font-black text-amber-900 text-sm mb-1 uppercase tracking-tight italic">Note sur la tarification</h4>
                                            <p className="text-xs text-amber-800 leading-relaxed font-medium">Les changements de prix s'appliqueront uniquement aux <strong className="font-black">nouveaux dossiers</strong> ouverts après l'enregistrement des paramètres.</p>
                                        </div>
                                    </div>
                                </div>
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
                                            <div className="text-xl font-black text-indigo-600 tracking-tighter">92% Libre</div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Passerelle Paiement" && (
                            <motion.div
                                key="payment"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 space-y-10"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-2xl flex items-center justify-center shadow-sm">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Configuration des Paiements</h3>
                                        <p className="text-slate-400 text-sm font-medium">Gérez la réception de vos paiements en ligne.</p>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:border-sky-500 transition-all">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-10 bg-white border border-slate-200 flex items-center justify-center rounded-lg font-black text-xs text-slate-400 italic">STRIPE</div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm">Stripe Checkout</div>
                                                <div className="text-xs text-emerald-500 font-bold tracking-widest uppercase">Connecté & Actif</div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <div className="text-right">
                                                <div className="text-[10px] font-black text-slate-400 uppercase">Prochaine facture</div>
                                                <div className="text-sm font-black text-slate-900">01 Avril 2024</div>
                                            </div>
                                            <ChevronRight className="w-5 h-5 text-slate-300" />
                                        </div>
                                    </div>

                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between opacity-50 cursor-not-allowed">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-10 bg-white border border-slate-200 flex items-center justify-center rounded-lg font-black text-xs text-slate-400 italic font-serif">PayPal</div>
                                            <div>
                                                <div className="font-black text-slate-900 text-sm">PayPal Express</div>
                                                <div className="text-xs text-slate-400 font-bold tracking-widest uppercase">Non configuré</div>
                                            </div>
                                        </div>
                                        <button className="text-[10px] font-black text-sky-600 uppercase tracking-widest border border-sky-500 px-4 py-2 rounded-lg hover:bg-sky-50 transition-colors">Activer</button>
                                    </div>
                                </div>

                                <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center text-center space-y-4">
                                    <Plus className="w-8 h-8 text-slate-200" />
                                    <p className="text-slate-400 font-black text-xs uppercase tracking-widest">Ajouter une nouvelle méthode de paiement</p>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Sécurisation App" && (
                            <motion.div
                                key="security"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 space-y-10"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-sky-50 text-sky-500 rounded-2xl flex items-center justify-center shadow-sm">
                                        <Lock className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Sécurité et Accessibilité</h3>
                                        <p className="text-slate-400 text-sm font-medium">Contrôlez les accès et chiffrez vos données.</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">2FA (Double Facteur)</div>
                                            <div className="w-12 h-6 bg-slate-200 rounded-full relative p-1 cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full shadow-sm"></div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-bold italic">"Exiger une vérification par SMS pour chaque connexion administrative."</p>
                                    </div>

                                    <div className="p-8 bg-slate-50 border border-slate-100 rounded-[2.5rem] space-y-6">
                                        <div className="flex items-center justify-between">
                                            <div className="text-sm font-black text-slate-900 uppercase tracking-tighter italic">Masquer PI (RGPD)</div>
                                            <div className="w-12 h-6 bg-emerald-500 rounded-full relative p-1 cursor-pointer">
                                                <div className="w-4 h-4 bg-white rounded-full ml-auto shadow-sm"></div>
                                            </div>
                                        </div>
                                        <p className="text-xs text-slate-400 leading-relaxed font-bold italic">"Flouter automatiquement les numéros de passeport dans l'interface agent."</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Clés API Secrètes</h4>
                                    <div className="p-6 bg-slate-950 rounded-3xl flex items-center justify-between group overflow-hidden relative">
                                        <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 blur-2xl rounded-full"></div>
                                        <code className="text-sky-300 font-mono text-sm tracking-widest truncate max-w-[80%]">sk_test_************************</code>
                                        <div className="flex items-center gap-3">
                                            <EyeOff className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors cursor-pointer" />
                                            <Save className="w-4 h-4 text-slate-600 group-hover:text-white transition-colors cursor-pointer" />
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === "Notifications" && (
                            <motion.div
                                key="notif"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-8 md:p-12 space-y-12"
                            >
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-2xl flex items-center justify-center shadow-sm">
                                        <Bell className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter">Flux de Notifications</h3>
                                        <p className="text-slate-400 text-sm font-medium">Définissez quand vos clients reçoivent des alertes.</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    {[
                                        { event: "Changement statut dossier", channel: "Email & PUSH", active: true },
                                        { event: "Paiement reçu", channel: "Email Uniquement", active: true },
                                        { event: "Nouveau document importé", channel: "PUSH (Admin)", active: true },
                                        { event: "Relance document manquant", channel: "Email & SMS", active: false },
                                    ].map((notif, i) => (
                                        <div key={i} className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group">
                                            <div>
                                                <div className="font-black text-slate-900 text-sm italic">{notif.event}</div>
                                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{notif.channel}</div>
                                            </div>
                                            <div className={`w-12 h-6 ${notif.active ? "bg-emerald-500" : "bg-slate-200"} rounded-full relative p-1 cursor-pointer transition-colors shadow-inner`}>
                                                <div className={`w-4 h-4 bg-white rounded-full ${notif.active ? "ml-auto" : ""} shadow-sm`}></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
}
