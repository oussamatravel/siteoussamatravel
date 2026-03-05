"use client";

import { motion } from "framer-motion";
import { Clock, FileText, CheckCircle2, ArrowRight, Globe2, Zap } from "lucide-react";
import Link from "next/link";

const evisas = [
    {
        flag: "🇹🇭",
        country: "Thaïlande",
        type: "Visa 30 jours",
        delai: "15 à 25 jours ouvrables",
        dossier: ["Résidence en français", "Scan passeport", "Scan photo"],
        color: "from-red-500 to-red-700",
        fast: false,
    },
    {
        flag: "🇦🇿",
        country: "Azerbaïdjan",
        type: "Visa 30 jours",
        delai: "1 à 3 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo", "Lettre de garantie"],
        color: "from-sky-500 to-blue-600",
        fast: true,
    },
    {
        flag: "🇪🇬",
        country: "Égypte",
        type: "E-Visa",
        delai: "24 heures ouvrables",
        dossier: ["Billets d'avion confirmés", "Scan passeport"],
        color: "from-amber-500 to-orange-600",
        fast: true,
    },
    {
        flag: "🇴🇲",
        country: "Oman",
        type: "Visa 10 jours",
        delai: "2 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-green-600 to-emerald-700",
        fast: true,
    },
    {
        flag: "🇺🇿",
        country: "Ouzbékistan",
        type: "Visa 1 mois",
        delai: "10 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-blue-500 to-indigo-600",
        fast: false,
    },
    {
        flag: "🇻🇳",
        country: "Vietnam",
        type: "Visa 30 jours",
        delai: "3 à 10 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-red-600 to-rose-700",
        fast: false,
    },
    {
        flag: "🇹🇷",
        country: "Turquie",
        type: "Visa 30 jours",
        delai: "24 heures ouvrables",
        dossier: ["Passeport valide", "Visa Schengen / UK / USA en cours"],
        color: "from-red-500 to-red-700",
        fast: true,
    },
    {
        flag: "🇶🇦",
        country: "Qatar",
        type: "Visa 1 mois",
        delai: "72 heures ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-purple-600 to-indigo-700",
        fast: true,
    },
    {
        flag: "🇱🇰",
        country: "Sri Lanka",
        type: "Visa 30 jours",
        delai: "2 à 6 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-yellow-500 to-orange-500",
        fast: false,
    },
    {
        flag: "🇮🇩",
        country: "Indonésie",
        type: "Visa 30 jours",
        delai: "8 à 12 jours ouvrables",
        dossier: ["Passeport", "Photo (fichier original)"],
        color: "from-red-500 to-rose-600",
        fast: false,
    },
    {
        flag: "🇸🇬",
        country: "Singapour",
        type: "Visa 30 jours",
        delai: "5 à 10 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-red-600 to-red-800",
        fast: false,
    },
    {
        flag: "🇸🇦",
        country: "Arabie Saoudite – Omra",
        type: "Visa Omra 30 jours",
        delai: "5 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-green-700 to-green-900",
        fast: false,
    },
    {
        flag: "🇸🇦",
        country: "Arabie Saoudite – Touristique",
        type: "Visa Touristique 90 jours",
        delai: "5 jours ouvrables",
        dossier: ["Attestation de travail", "RC ou Registre du Commerce", "Relevé de compte", "Extrait de naissance", "Scan passeport"],
        color: "from-emerald-600 to-green-800",
        fast: false,
    },
    {
        flag: "🇦🇲",
        country: "Arménie",
        type: "Visa Touristique 30 jours",
        delai: "5 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-orange-500 to-red-600",
        fast: false,
    },
    {
        flag: "🇰🇭",
        country: "Cambodge",
        type: "Visa 30 jours",
        delai: "5 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-blue-600 to-indigo-700",
        fast: false,
    },
    {
        flag: "🇨🇳",
        country: "Chine – Première Demande",
        type: "Visa Touristique",
        delai: "7 jours ouvrables",
        dossier: ["Attestation de travail", "RC", "Relevé de compte (min. 3 000 €)", "Scan passeport", "Scan photo"],
        color: "from-red-600 to-red-900",
        fast: false,
    },
    {
        flag: "🇨🇳",
        country: "Chine – Renouvellement",
        type: "Visa Touristique",
        delai: "7 jours ouvrables",
        dossier: ["Attestation de travail", "RC", "Relevé de compte (3 000 €)", "Ancien visa + Cachet de sortie", "Scan passeport", "Scan photo"],
        color: "from-red-700 to-rose-900",
        fast: false,
    },
    {
        flag: "🇨🇺",
        country: "Cuba",
        type: "Visa Touristique",
        delai: "24 heures ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-blue-600 to-sky-700",
        fast: true,
    },
    {
        flag: "🇪🇹",
        country: "Éthiopie",
        type: "Visa 30 jours",
        delai: "7 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-green-600 to-yellow-700",
        fast: false,
    },
    {
        flag: "🇯🇴",
        country: "Jordanie",
        type: "Visa 90 jours",
        delai: "24 heures ouvrables",
        dossier: ["Scan passeport uniquement"],
        color: "from-amber-600 to-orange-700",
        fast: true,
    },
    {
        flag: "🇱🇧",
        country: "Liban",
        type: "Visa 90 jours",
        delai: "7 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-red-500 to-red-700",
        fast: false,
    },
    {
        flag: "🇹🇿",
        country: "Tanzanie",
        type: "Visa Touristique",
        delai: "7 jours ouvrables",
        dossier: ["Scan passeport", "Scan photo"],
        color: "from-sky-500 to-blue-700",
        fast: false,
    },
];

export default function EvisaPage() {
    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero */}
            <section className="pt-48 pb-32 px-4 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1530789253388-582c481c54b0?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-15"
                        alt="E-Visa Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-50"></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-sky-500/20 text-sky-300 text-xs font-black uppercase tracking-widest mb-8 border border-sky-400/30"
                    >
                        <Zap className="w-4 h-4" />
                        Service 100% en ligne
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        Visas Électroniques
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic uppercase">& Résidences.</span>
                    </motion.h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-6 font-medium leading-relaxed">
                        Envoyez-nous simplement vos documents. Nous gérons tout le reste. Vite, sûr et sans déplacement.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-black">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            22 Destinations
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                            <Zap className="w-4 h-4" />
                            Certains en 24h seulement
                        </div>
                        <div className="flex items-center gap-2 text-sky-400">
                            <Globe2 className="w-4 h-4" />
                            Traitement 100% digital
                        </div>
                    </div>
                </div>
            </section>

            {/* Grid destinations */}
            <section className="py-24 -mt-16 relative z-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {evisas.map((ev, i) => (
                            <Link key={i} href="/auth/register" className="block">
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.04 }}
                                    whileHover={{ y: -4 }}
                                    className="bg-white rounded-[2.5rem] shadow-lg border border-slate-100 hover:shadow-2xl hover:border-sky-200 transition-all overflow-hidden group flex flex-col h-full"
                                >
                                    {/* Header */}
                                    <div className={`bg-gradient-to-br ${ev.color} p-8 flex items-center justify-between`}>
                                        <div>
                                            <span className="text-5xl">{ev.flag}</span>
                                            <h3 className="text-white font-black text-xl mt-3 leading-tight">{ev.country}</h3>
                                            <span className="text-white/80 text-xs font-bold uppercase tracking-widest">{ev.type}</span>
                                        </div>
                                        {ev.fast && (
                                            <div className="flex flex-col items-center gap-1 bg-white/20 rounded-2xl px-3 py-2 backdrop-blur-sm">
                                                <Zap className="w-5 h-5 text-yellow-300" />
                                                <span className="text-white text-[9px] font-black uppercase tracking-widest">Express</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-8 flex flex-col flex-grow gap-6">
                                        <div className="flex items-start gap-4 p-4 bg-slate-50 rounded-2xl">
                                            <Clock className="w-5 h-5 text-sky-500 mt-0.5 flex-shrink-0" />
                                            <div>
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Délai de traitement</p>
                                                <p className="text-slate-900 font-black text-sm">{ev.delai}</p>
                                            </div>
                                        </div>

                                        <div className="flex-grow">
                                            <div className="flex items-center gap-2 mb-3">
                                                <FileText className="w-4 h-4 text-amber-500" />
                                                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Documents requis</p>
                                            </div>
                                            <div className="space-y-2">
                                                {ev.dossier.map((doc, di) => (
                                                    <div key={di} className="flex items-center gap-2 text-slate-600 text-sm font-medium">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-sky-400 flex-shrink-0"></div>
                                                        {doc}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-50">
                                            <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Déposer mon dossier</span>
                                            <div className="w-10 h-10 rounded-xl bg-slate-900 group-hover:bg-sky-500 text-white flex items-center justify-center transition-colors">
                                                <ArrowRight className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 relative z-10">
                            Votre destination n'est <br />
                            <span className="text-amber-400 italic">pas dans la liste ?</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 relative z-10">
                            Contactez nous, nous avons des solutions pour presque toutes les destinations du monde.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
                            <Link href="/contact">
                                <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-50 transition-all flex items-center gap-3 shadow-xl">
                                    Nous contacter
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/auth/register">
                                <button className="px-10 py-5 bg-sky-500 text-white rounded-full font-black text-lg hover:bg-sky-600 transition-all shadow-xl">
                                    Ouvrir mon dossier
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
