"use client";

import { motion } from "framer-motion";
import { GraduationCap, ArrowRight, BookOpen, Globe2, Trophy, Clock, Search, FileText, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Etudes() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const destinations = [
        {
            country: "Canada",
            desc: "Universités réputées, permis de travail post-diplôme et environnement multiculturel.",
            icon: "🍁",
            color: "bg-red-50 text-red-600 border-red-100",
            programs: ["Bachelors", "Masters", "Collèges techniques"]
        },
        {
            country: "Royaume-Uni",
            desc: "Excellence académique mondiale avec des programmes courts et intensifs (Master en 1 an).",
            icon: "🇬🇧",
            color: "bg-blue-50 text-blue-800 border-blue-100",
            programs: ["Bachelors (3 ans)", "Masters", "Cours d'anglais"]
        },
        {
            country: "France",
            desc: "Une qualité de vie exceptionnelle et des frais de scolarité avantageux dans les universités publiques.",
            icon: "🇫🇷",
            color: "bg-sky-50 text-sky-700 border-sky-100",
            programs: ["Licences", "Masters", "Grandes Écoles (Ingénieur/Commerce)"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Navbar Simple */}
            <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3">
                        <div className="font-bold flex items-center gap-2">
                            <span className="text-2xl text-gray-900 tracking-wider">OUSSAMA</span>
                            <span className="text-3xl text-amber-500" style={{ fontFamily: 'cursive' }}>Travel</span>
                        </div>
                    </Link>
                    <div className="hidden md:flex space-x-8">
                        <Link href="/" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Accueil</Link>
                        <Link href="/tourisme" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Tourisme</Link>
                        <Link href="/immigration" className="text-gray-600 hover:text-blue-600 font-medium transition-colors">Immigration</Link>
                    </div>
                    <div className="flex items-center space-x-4">
                        <Link href="/auth/login">
                            <button className="px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-full hover:bg-amber-500 shadow-lg shadow-amber-200 transition-all">
                                Mon Espace Client
                            </button>
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-blue-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10 py-16 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-blue-200 font-medium text-sm mb-8 border border-white/20"
                    >
                        <GraduationCap className="w-4 h-4" />
                        <span>Admissions Internationales</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
                    >
                        Donnez une Dimension <br />
                        Internationale à vos <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Études</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Orientation, choix de l'université, admission, visa étudiant et recherche de logement. Nous vous encadrons de A à Z pour garantir la réussite de votre projet académique.
                    </motion.p>

                    <Link href="/auth/register">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-bold text-lg hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto"
                        >
                            Déposer mon dossier étudiant
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Processus Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Un Accompagnement en 4 Étapes</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Notre méthodologie éprouvée pour maximiser vos chances d'admission dans les meilleures universités.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Orientation", desc: "Évaluation de votre profil et sélection des programmes adaptés.", icon: <Search className="w-6 h-6" /> },
                            { step: "02", title: "Candidature", desc: "Préparation des lettres de motivation, CV et envoi des dossiers.", icon: <FileText className="w-6 h-6" /> },
                            { step: "03", title: "Admission", desc: "Réception de la lettre d'acceptation de l'université.", icon: <Trophy className="w-6 h-6" /> },
                            { step: "04", title: "Visa Étudiant", desc: "Constitution solide du dossier financier et consulaire pour le visa.", icon: <Globe2 className="w-6 h-6" /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-blue-200 transition-colors"
                            >
                                <div className="text-4xl font-black text-blue-100 absolute top-4 right-4">{item.step}</div>
                                <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center mb-6 relative z-10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Top Destinations d'Etudes */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Destinations Universitaires Phares</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Étudiez dans les pays offrant les meilleures opportunités académiques et professionnelles.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all p-8"
                            >
                                <div className="flex items-center justify-between mb-6">
                                    <span className="text-5xl">{dest.icon}</span>
                                    <span className={`px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${dest.color}`}>Top Choix</span>
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{dest.country}</h3>
                                <p className="text-gray-600 mb-8">{dest.desc}</p>
                                <div className="space-y-3 pt-6 border-t border-slate-100">
                                    <h4 className="text-sm font-bold text-gray-900 uppercase">Programmes pris en charge :</h4>
                                    <ul className="space-y-2">
                                        {dest.programs.map((prog, ptIndex) => (
                                            <li key={ptIndex} className="flex items-center gap-2 text-gray-600 text-sm">
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                                {prog}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-blue-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Ne laissez pas votre avenir au hasard.</h2>
                    <p className="text-blue-100 mb-8 text-lg">Nos conseillers d'orientation vous attendent sur votre Espace Client pour évaluer votre profil gratuitement.</p>
                    <Link href="/auth/register">
                        <button className="px-8 py-4 bg-white text-blue-900 rounded-full font-bold text-lg hover:bg-blue-50 shadow-lg transition-all">
                            Évaluer mon profil (Gratuit)
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
