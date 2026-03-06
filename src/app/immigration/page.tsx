"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    FileText,
    ArrowRight,
    ShieldCheck,
    Scale,
    FileCheck,
    Users,
    Landmark,
    Briefcase,
    CheckCircle2,
    Lock,
    Globe2,
    Calendar,
    ChevronDown,
    Plus
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function Immigration() {
    const [openStep, setOpenStep] = useState<number | null>(null);
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const programmes = [
        {
            title: "Entrée Express Canada",
            desc: "Le moyen le plus rapide d'immigrer pour les travailleurs qualifiés. Profil, points (CRS) et invitation (ITA).",
            icon: <Briefcase className="w-8 h-8 text-amber-500" />,
            color: "border-amber-100 bg-amber-50",
            status: "Haute Priorité"
        },
        {
            title: "Parrainage Familial",
            desc: "Réunissez votre famille au Canada. Nous vous assistons pour parrainer votre conjoint, parents ou enfants.",
            icon: <Users className="w-8 h-8 text-sky-500" />,
            color: "border-sky-100 bg-sky-50",
            status: "Services Plus"
        },
        {
            title: "Résidence Permanente",
            desc: "Accompagnement complet pour obtenir le statut de résident permanent et tous ses avantages sociaux.",
            icon: <Landmark className="w-8 h-8 text-emerald-500" />,
            color: "border-emerald-100 bg-emerald-50",
            status: "Expertise OTA"
        },
        {
            title: "Passeport Talent - France",
            desc: "Pour les profils hautement qualifiés, artistes ou investisseurs souhaitant s'installer en France.",
            icon: <FileText className="w-8 h-8 text-blue-600" />,
            color: "border-blue-100 bg-blue-50",
            status: "Nouveau"
        },
        {
            title: "Regroupement Familial",
            desc: "Procédure d'immigration parrainée pour réunir les familles séparées par les frontières.",
            icon: <Users className="w-8 h-8 text-rose-500" />,
            color: "border-rose-100 bg-rose-50",
            status: "Accompagnement"
        }
    ];

    const timeline = [
        {
            step: "01",
            title: "Évaluation Profile",
            desc: "Analyse de vos points, diplômes et expérience.",
            icon: <Calendar className="w-5 h-5" />
        },
        {
            step: "02",
            title: "Constitution",
            desc: "Collecte rigoureuse des documents certifiés.",
            icon: <FileCheck className="w-5 h-5" />
        },
        {
            step: "03",
            title: "Soumission Dossier",
            desc: "Envoi officiel via les portails gouvernementaux.",
            icon: <Globe2 className="w-5 h-5" />
        },
        {
            step: "04",
            title: "Confirmation",
            desc: "Réception de votre visa de résidence.",
            icon: <ShieldCheck className="w-5 h-5" />
        }
    ];

    const destinations = [
        {
            code: "ca",
            country: "Canada",
            title: "Terre d'Opportunités",
            desc: "Le Canada propose plus de 80 programmes d'immigration. Nous maîtrisons les subtilités du système Entrée Express et des Candidats des Provinces (PNP).",
            image: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?q=80&w=800&auto=format&fit=crop",
            programs: [
                "Entrée Express (FSW, CEC)",
                "Candidats des Provinces (PNP)",
                "Regroupement Familial",
                "Investisseurs & Entrepreneurs"
            ],
            color: "from-red-600 to-red-800"
        },
        {
            code: "fr",
            country: "France",
            title: "Expertise Européenne",
            desc: "S'installer en France nécessite une stratégie précise, qu'il s'agisse du Passeport Talent pour les hauts potentiels ou du regroupement familial.",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
            programs: [
                "Passeport Talent (Salarié, Chercheur)",
                "Regroupement Familial (Préfet)",
                "Visiteur (Retraités, Investisseurs)",
                "Création d'Entreprise"
            ],
            color: "from-blue-600 to-blue-800"
        },
        {
            code: "us",
            country: "USA",
            title: "Le Rêve Américain",
            desc: "Le système américain est complexe. Nous vous guidons à travers les visas de travail HB1, les catégories EB-1/2/3 et la loterie Green Card.",
            image: "https://images.unsplash.com/photo-1485738422979-f5c462d49f74?q=80&w=800&auto=format&fit=crop",
            programs: [
                "Visas Basés sur l'Emploi (EB-1, EB-2)",
                "Investissement (EB-5)",
                "Loterie Green Card (DV Lottery)",
                "Fiançailles & Mariage (K-1)"
            ],
            color: "from-sky-600 to-indigo-900"
        },
        {
            code: "gb",
            country: "UK",
            title: "Destination Prestige",
            desc: "Post-Brexit, le Royaume-Uni a lancé un système à points. Nous auditons votre éligibilité pour le Skilled Worker Visa et les visas d'innovation.",
            image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=800&auto=format&fit=crop",
            programs: [
                "Skilled Worker Visa",
                "Global Talent Visa",
                "Innovator Founder Visa",
                "Visa Innovateur"
            ],
            color: "from-navy-900 to-blue-900"
        }
    ];

    return (
        <div className="min-h-screen bg-white font-sans overflow-x-hidden">
            {/* ─── Hero Expert ─── */}
            <section className="relative pt-56 pb-32 px-4 overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1454165833267-035f13f6b4d3?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Expertise Immigration"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-white" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-amber-400/10 border border-amber-400/20 text-amber-400 font-black text-[10px] uppercase tracking-[0.2em] mb-10 backdrop-blur-sm"
                    >
                        <Lock className="w-3.5 h-3.5" />
                        Accompagnement Juridique & Administratif Garanti
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        IMMIGREZ <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 italic uppercase">
                            EN TOUTE SÉCURITÉ.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-xl text-slate-400 max-w-2xl mx-auto mb-14 font-medium leading-relaxed"
                    >
                        Fort de notre expérience sur le terrain, nous transformons la complexité des démarches migratoires en un parcours fluide et serein pour vous et votre famille.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: "0 20px 40px rgba(251, 191, 36, 0.2)" }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-amber-400 text-slate-950 rounded-full font-black text-lg transition-all flex items-center gap-3 shadow-xl"
                            >
                                Commencer mon Évaluation
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </Link>
                        <button className="px-10 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black text-lg hover:bg-white/10 transition-all backdrop-blur-md">
                            Nos Honoraires
                        </button>
                    </div>
                </div>
            </section>

            {/* ─── Stats Authority ─── */}
            <section className="py-20 relative z-20 -mt-10">
                <div className="max-w-6xl mx-auto px-4">
                    <div className="bg-white rounded-[3rem] p-10 md:p-16 shadow-[0_32px_80px_rgba(0,0,0,0.06)] border border-slate-50 grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
                        {[
                            { val: "23", label: "Années d'Expérience", icon: <Calendar className="w-5 h-5 text-amber-500" /> },
                            { val: "98%", label: "Taux de Réussite", icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" /> },
                            { val: "1500+", label: "Familles Installées", icon: <Users className="w-5 h-5 text-sky-500" /> },
                            { val: "12", label: "Avocats Partenaires", icon: <ShieldCheck className="w-5 h-5 text-amber-500" /> },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="space-y-3"
                            >
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-slate-100">
                                    {stat.icon}
                                </div>
                                <div className="text-4xl font-black text-slate-950 tracking-tighter">{stat.val}</div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Destinations & Programs ─── */}
            <section className="py-32 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 inline-block">Destinations Principales</span>
                        <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter mb-6">Explorez de <span className="italic text-amber-500">Nouveaux Horizons.</span></h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Chaque destination a ses propres spécificités. Nous auditons votre profil pour déterminer la voie la plus sûre vers votre résidence.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative rounded-[4rem] overflow-hidden bg-slate-100 min-h-[600px] flex flex-col shadow-sm hover:shadow-2xl transition-all duration-700"
                            >
                                {/* Background Image */}
                                <div className="absolute inset-0">
                                    <img
                                        src={dest.image}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale-[50%] group-hover:grayscale-0"
                                        alt={dest.country}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
                                </div>

                                <div className="relative z-10 p-12 mt-auto">
                                    <div className="flex items-center gap-4 mb-6">
                                        <div className="w-16 h-10 rounded-xl overflow-hidden border border-white/20 shadow-2xl">
                                            <img
                                                src={`https://flagcdn.com/w160/${dest.code}.png`}
                                                className="w-full h-full object-cover"
                                                alt={dest.country}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-black text-white tracking-tight">{dest.country}</h3>
                                            <p className="text-amber-400 font-bold text-xs uppercase tracking-widest">{dest.title}</p>
                                        </div>
                                    </div>

                                    <p className="text-slate-300 font-medium mb-8 leading-relaxed max-w-md">
                                        {dest.desc}
                                    </p>

                                    <div className="space-y-3 mb-10">
                                        {dest.programs.map((prog, pidx) => (
                                            <div key={pidx} className="flex items-center gap-3 text-white/80 font-bold text-sm">
                                                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                                                {prog}
                                            </div>
                                        ))}
                                    </div>

                                    <Link href={`/immigration/${dest.code === 'ca' ? 'canada' : dest.code === 'fr' ? 'france' : dest.code === 'us' ? 'usa' : 'uk'}`}>
                                        <button className="flex items-center gap-3 px-8 py-4 bg-white text-slate-950 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 transition-all">
                                            Découvrir la destination
                                            <ArrowRight className="w-4 h-4" />
                                        </button>
                                    </Link>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── Timeline Process ─── */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Le Parcours de Réussite.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            Une méthode rigoureuse en quatre étapes pour garantir la conformité de votre dossier.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
                        <div className="hidden lg:block absolute top-12 left-0 w-full h-px bg-slate-200 z-0"></div>

                        {timeline.map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative z-10 text-center"
                            >
                                <div className="w-24 h-24 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl flex items-center justify-center mx-auto mb-8 transition-transform hover:scale-110">
                                    <div className="w-16 h-16 rounded-2xl bg-slate-950 text-white flex items-center justify-center font-black text-xl">
                                        {item.step}
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-widest">{item.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed px-4">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── FAQ Section ─── */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <span className="text-[10px] font-black text-amber-500 uppercase tracking-[0.3em] mb-4 inline-block">Réponses d'Experts</span>
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter">Questions <span className="italic text-amber-500">Fréquentes.</span></h2>
                    </div>

                    <div className="space-y-4">
                        {[
                            {
                                q: "Quels sont les délais moyens de traitement pour le Canada ?",
                                a: "Les délais varient selon le programme (Entrée Express, PNP, Parrainage). En général, comptez entre 6 et 18 mois. Notre rôle est d'optimiser votre dossier pour éviter tout retard administratif dû à des documents manquants ou incorrects."
                            },
                            {
                                q: "Comment maximiser mes chances de réussite ?",
                                a: "La réussite repose sur la précision. Nous réalisons un audit initial de 40 points sur votre profil (langues, diplômes, expérience) avant toute soumission. Si votre profil présente des faiblesses, nous vous conseillons sur la stratégie d'amélioration la plus rapide."
                            },
                            {
                                q: "Gérez-vous également le séjour des familles ?",
                                a: "Absolument. Nous sommes spécialisés dans le regroupement familial et les visas de dépendants. Nous veillons à ce que votre installation se fasse conjointement pour minimiser la séparation."
                            },
                            {
                                q: "Comment se déroule l'évaluation initiale ?",
                                a: "Une fois votre espace client créé, vous téléchargez vos documents de base. Notre équipe analyse votre éligibilité sous 48h et vous propose les meilleures options de visa adaptées à votre réalité."
                            }
                        ].map((faq, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-white rounded-[2rem] border border-slate-100 overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                            >
                                <button
                                    onClick={() => setOpenStep(openStep === idx ? null : idx)}
                                    className="w-full p-8 text-left flex items-center justify-between group"
                                >
                                    <span className="text-lg font-black text-slate-900 group-hover:text-amber-500 transition-colors uppercase tracking-tight">{faq.q}</span>
                                    <div className={`w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center transition-transform duration-300 ${openStep === idx ? 'rotate-180 bg-amber-400 text-white' : ''}`}>
                                        <ChevronDown className="w-5 h-5" />
                                    </div>
                                </button>
                                <AnimatePresence>
                                    {openStep === idx && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="px-8 pb-8"
                                        >
                                            <p className="text-slate-500 font-medium leading-relaxed border-t border-slate-50 pt-6">
                                                {faq.a}
                                            </p>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA Final ─── */}
            <section className="py-24 px-4 bg-white">
                <div className="max-w-5xl mx-auto">
                    <div className="bg-slate-950 rounded-[4rem] p-12 md:p-24 relative overflow-hidden text-center">
                        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-400/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2" />
                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                                Prêt à franchir le <br />
                                <span className="text-amber-400 italic">prochain cap ?</span>
                            </h2>
                            <p className="text-xl text-slate-400 mb-12 font-medium max-w-xl mx-auto leading-relaxed">
                                Ne laissez pas votre futur au hasard. Bénéficiez d'un accompagnement basé sur une expérience concrète dès aujourd'hui.
                            </p>
                            <Link href="/auth/register">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-12 py-6 bg-amber-400 text-slate-950 rounded-full font-black text-xl shadow-2xl shadow-amber-500/20 flex items-center gap-3 mx-auto"
                                >
                                    Créer mon Dossier d'Immigration
                                    <ArrowRight className="w-6 h-6" />
                                </motion.button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

