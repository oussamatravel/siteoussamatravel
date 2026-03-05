"use client";

import { motion } from "framer-motion";
import { CalendarDays, CheckCircle2, ArrowRight, FileText, ShieldCheck, Clock, Users } from "lucide-react";
import Link from "next/link";

const destinations = [
    { flag: "🇪🇸", code: "es", country: "Espagne", zone: "Schengen" },
    { flag: "🇫🇷", code: "fr", country: "France", zone: "Schengen" },
    { flag: "🇳🇱", code: "nl", country: "Hollande", zone: "Schengen" },
    { flag: "🇧🇪", code: "be", country: "Belgique", zone: "Schengen" },
    { flag: "🇱🇺", code: "lu", country: "Luxembourg", zone: "Schengen" },
    { flag: "🇵🇹", code: "pt", country: "Portugal", zone: "Schengen" },
    { flag: "🇫🇮", code: "fi", country: "Finlande", zone: "Schengen" },
    { flag: "🇩🇪", code: "de", country: "Allemagne", zone: "Schengen" },
    { flag: "🇱🇹", code: "lt", country: "Lituanie", zone: "Schengen" },
    { flag: "🇮🇹", code: "it", country: "Italie", zone: "Schengen" },
    { flag: "🇭🇷", code: "hr", country: "Croatie", zone: "Schengen" },
    { flag: "🇦🇹", code: "at", country: "Autriche", zone: "Schengen" },
    { flag: "🇸🇮", code: "si", country: "Slovénie", zone: "Schengen" },
    { flag: "🇭🇺", code: "hu", country: "Hongrie", zone: "Schengen" },
    { flag: "🇱🇻", code: "lv", country: "Lettonie", zone: "Schengen" },
    { flag: "🇬🇷", code: "gr", country: "Grèce", zone: "Schengen" },
    { flag: "🇨🇭", code: "ch", country: "Suisse", zone: "Schengen" },
    { flag: "🇲🇹", code: "mt", country: "Malte", zone: "Schengen" },
    { flag: "🇵🇱", code: "pl", country: "Pologne", zone: "Schengen" },
    { flag: "🇸🇪", code: "se", country: "Suède", zone: "Schengen" },
    { flag: "🇹🇷", code: "tr", country: "Turquie", zone: "Hors-Schengen" },
    { flag: "🇺🇸", code: "us", country: "USA", zone: "Hors-Schengen" },
    { flag: "🇨🇦", code: "ca", country: "Canada", zone: "Hors-Schengen" },
    { flag: "🇬🇧", code: "gb", country: "Royaume-Uni", zone: "Hors-Schengen" },
];

const visaTypes = [
    {
        icon: "🏖️",
        title: "Visa Touristique",
        desc: "Pour les voyages de loisirs, visites culturelles ou séjours de courte durée.",
        points: ["Durée de 15 à 90 jours", "Simple ou multiple entrées", "Pas d'activité professionnelle"],
    },
    {
        icon: "💼",
        title: "Visa d'Affaires",
        desc: "Pour les déplacements professionnels, réunions, salons ou conférences.",
        points: ["Lettre d'invitation entreprise", "Justificatif d'activité commerciale", "Durée 15 à 90 jours"],
    },
    {
        icon: "👨‍👩‍👧",
        title: "Visa Visite Familiale",
        desc: "Pour rejoindre un membre de votre famille résidant en Europe.",
        points: ["Attestation d'accueil", "Lien de parenté prouvé", "Hébergement garanti"],
    },
];

const steps = [
    { num: "01", title: "Prise de RDV", desc: "Nous prenons votre rendez-vous auprès du centre de visa (VFS Global, TLS Contact)", icon: <CalendarDays className="w-6 h-6" /> },
    { num: "02", title: "Montage du dossier", desc: "Préparation complète de tous les documents requis selon l'ambassade ciblée.", icon: <FileText className="w-6 h-6" /> },
    { num: "03", title: "Vérification", desc: "Contrôle rigoureux de chaque pièce avant le dépôt pour maximiser les chances d'obtention.", icon: <ShieldCheck className="w-6 h-6" /> },
    { num: "04", title: "Suivi & Récupération", desc: "Suivi du dossier et vous informer dès que votre visa est prêt à être récupéré.", icon: <Clock className="w-6 h-6" /> },
];

export default function RdvVisaPage() {
    const schengen = destinations.filter(d => d.zone === "Schengen");
    const horsSchengen = destinations.filter(d => d.zone === "Hors-Schengen");

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero */}
            <section className="pt-48 pb-32 px-4 bg-slate-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-15"
                        alt="Visa RDV Background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-50"></div>
                </div>

                <div className="max-w-5xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-amber-500/20 text-amber-300 text-xs font-black uppercase tracking-widest mb-8 border border-amber-400/30"
                    >
                        <CalendarDays className="w-4 h-4" />
                        Service complet clé en main
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-7xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        RDV Visa &
                        <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic uppercase">Traitement.</span>
                    </motion.h1>
                    <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-8 font-medium leading-relaxed">
                        Nous gérons la totalité de votre dossier consulaire. De la prise de rendez-vous jusqu'à la remise du visa, vous n'avez rien à faire.
                    </p>
                    <div className="flex flex-wrap justify-center gap-6 text-sm font-black">
                        <div className="flex items-center gap-2 text-emerald-400">
                            <CheckCircle2 className="w-4 h-4" />
                            24 Pays disponibles
                        </div>
                        <div className="flex items-center gap-2 text-amber-400">
                            <Users className="w-4 h-4" />
                            Tourisme · Affaires · Famille
                        </div>
                        <div className="flex items-center gap-2 text-sky-400">
                            <ShieldCheck className="w-4 h-4" />
                            Dossier vérifié avant dépôt
                        </div>
                    </div>
                </div>
            </section>

            {/* Types de visas */}
            <section className="py-24 px-4 -mt-10 relative z-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Types de Visas Traités</h2>
                        <p className="text-slate-500 text-lg font-medium">Choisissez le motif de votre voyage, nous adaptons votre dossier.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {visaTypes.map((vt, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[3rem] p-10 shadow-xl border border-slate-100 hover:shadow-2xl transition-all group"
                            >
                                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform inline-block">{vt.icon}</div>
                                <h3 className="text-2xl font-black text-slate-900 mb-4 uppercase tracking-tight">{vt.title}</h3>
                                <p className="text-slate-500 font-medium mb-6 leading-relaxed">{vt.desc}</p>
                                <div className="space-y-3">
                                    {vt.points.map((p, pi) => (
                                        <div key={pi} className="flex items-center gap-3 text-sm text-slate-700 font-bold">
                                            <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                                            {p}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Destinations */}
            <section className="py-28 bg-slate-950 px-4 relative overflow-hidden">
                {/* Background ambient */}
                <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center mb-20">
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-[0.3em] mb-4">24 pays disponibles</p>
                        <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter mb-5 leading-none">
                            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic">Destinations</span>
                        </h2>
                        <p className="text-slate-500 text-lg font-medium max-w-lg mx-auto">
                            Nous traitons vos visas pour les pays suivants, à des délais record.
                        </p>
                    </div>

                    {/* ─── Schengen ─── */}
                    <div className="mb-20">
                        <div className="flex items-center gap-5 mb-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-blue-500/20" />
                            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600/20 to-blue-400/10 border border-blue-500/30 rounded-2xl backdrop-blur-sm">
                                <span className="text-xl">🇪🇺</span>
                                <div>
                                    <p className="text-white font-black text-sm uppercase tracking-wider leading-none">Zone Schengen</p>
                                    <p className="text-blue-400/70 text-[9px] font-black uppercase tracking-widest mt-0.5">{schengen.length} pays · Visa unifié</p>
                                </div>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-blue-500/20" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {schengen.map((dest, i) => (
                                <Link key={i} href="/auth/register">
                                    <motion.div
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.025, duration: 0.4 }}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        className="group cursor-pointer"
                                    >
                                        {/* Card */}
                                        <div className="relative h-36 rounded-3xl overflow-hidden border border-white/8 hover:border-blue-400/40 transition-all duration-400 bg-white/3">
                                            {/* Gradient bg */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/20 via-slate-900/60 to-slate-950/90" />
                                            {/* Glow on hover */}
                                            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/8 transition-all duration-400" />
                                            {/* Top glow line */}
                                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Giant flag BG */}
                                            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                                <img
                                                    src={`https://flagcdn.com/w320/${dest.code}.png`}
                                                    alt={`Drapeau ${dest.country}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                {/* Overlay pour assombrir un peu l'image et garder le texte lisible */}
                                                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors" />
                                            </div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-3">
                                                <div className="w-16 h-12 rounded-lg overflow-hidden border border-white/20 shadow-2xl group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-300">
                                                    <img
                                                        src={`https://flagcdn.com/w160/${dest.code}.png`}
                                                        alt={dest.country}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-white font-black text-sm text-center leading-tight tracking-tight drop-shadow-md mt-1">{dest.country}</span>
                                            </div>

                                            {/* Bottom bar */}
                                            <div className="absolute bottom-0 inset-x-0 py-1 bg-blue-500/10 border-t border-blue-400/10 group-hover:bg-blue-500/20 transition-colors">
                                                <span className="text-[8px] font-black text-blue-400/80 uppercase tracking-[0.15em] block text-center">Schengen</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* ─── Hors Schengen ─── */}
                    <div>
                        <div className="flex items-center gap-5 mb-12">
                            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-amber-500/20" />
                            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-600/20 to-amber-400/10 border border-amber-500/30 rounded-2xl backdrop-blur-sm">
                                <span className="text-xl">🌍</span>
                                <div>
                                    <p className="text-white font-black text-sm uppercase tracking-wider leading-none">Hors Schengen</p>
                                    <p className="text-amber-400/70 text-[9px] font-black uppercase tracking-widest mt-0.5">{horsSchengen.length} pays · Visa spécifique</p>
                                </div>
                            </div>
                            <div className="flex-1 h-px bg-gradient-to-l from-transparent to-amber-500/20" />
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                            {horsSchengen.map((dest, i) => (
                                <Link key={i} href="/auth/register">
                                    <motion.div
                                        initial={{ opacity: 0, y: 24 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.08, duration: 0.4 }}
                                        whileHover={{ y: -6, scale: 1.02 }}
                                        className="group cursor-pointer"
                                    >
                                        <div className="relative h-40 rounded-3xl overflow-hidden border border-white/8 hover:border-amber-400/40 transition-all duration-400 bg-white/3">
                                            {/* Gradient bg */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-amber-900/20 via-slate-900/60 to-slate-950/90" />
                                            {/* Glow on hover */}
                                            <div className="absolute inset-0 bg-amber-500/0 group-hover:bg-amber-500/8 transition-all duration-400" />
                                            {/* Top glow line */}
                                            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-amber-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

                                            {/* Giant flag BG */}
                                            <div className="absolute inset-0 pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                                                <img
                                                    src={`https://flagcdn.com/w320/${dest.code}.png`}
                                                    alt={`Drapeau ${dest.country}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                />
                                                <div className="absolute inset-0 bg-slate-950/60 group-hover:bg-slate-950/40 transition-colors" />
                                            </div>

                                            {/* Content */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 p-4">
                                                <div className="w-20 h-14 rounded-xl overflow-hidden border border-white/20 shadow-2xl group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-300">
                                                    <img
                                                        src={`https://flagcdn.com/w160/${dest.code}.png`}
                                                        alt={dest.country}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                                <span className="text-white font-black text-base text-center leading-tight tracking-tight drop-shadow-md mt-1">{dest.country}</span>
                                            </div>

                                            {/* Bottom bar */}
                                            <div className="absolute bottom-0 inset-x-0 py-1.5 bg-amber-500/10 border-t border-amber-400/10 group-hover:bg-amber-500/20 transition-colors">
                                                <span className="text-[8px] font-black text-amber-400/80 uppercase tracking-[0.15em] block text-center">Hors Schengen</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </section>


            {/* Notre Processus */}
            <section className="py-24 bg-slate-50 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Notre Processus en 4 Étapes</h2>
                        <p className="text-slate-500 text-lg font-medium">Simple, rapide et sans stress.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {steps.map((s, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[3rem] p-10 shadow-sm border border-slate-100 hover:shadow-xl transition-all group relative overflow-hidden"
                            >
                                <div className="absolute top-6 right-6 text-6xl font-black text-slate-50 select-none">{s.num}</div>
                                <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mb-6 group-hover:bg-amber-500 group-hover:text-white transition-all">
                                    {s.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-3 uppercase tracking-tight">{s.title}</h3>
                                <p className="text-slate-500 font-medium text-sm leading-relaxed">{s.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 px-4">
                <div className="max-w-4xl mx-auto">
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-20 text-center text-white relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-sky-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 relative z-10">
                            Prêt à déposer votre <br />
                            <span className="text-amber-400 italic">demande de visa ?</span>
                        </h2>
                        <p className="text-slate-400 text-lg mb-10 relative z-10 max-w-xl mx-auto font-medium">
                            Créez votre dossier en ligne et notre équipe à Béjaïa vous contacte dans les 24h ouvrables.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6 justify-center relative z-10">
                            <Link href="/auth/register">
                                <button className="px-10 py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-50 transition-all flex items-center gap-3 shadow-xl">
                                    Commencer ma demande
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                            <Link href="/contact">
                                <button className="px-10 py-5 bg-amber-500 text-white rounded-full font-black text-lg hover:bg-amber-400 transition-all shadow-xl">
                                    Nous contacter
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
