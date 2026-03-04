"use client";

import { motion } from "framer-motion";
import { FileText, ArrowRight, ShieldCheck, Scale, FileCheck, Users, Landmark, Briefcase, CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function Immigration() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const programmes = [
        {
            title: "Travailleurs Qualifiés (Entrée Express)",
            desc: "Immigrez au Canada rapidement si vous possédez des compétences professionnelles recherchées.",
            icon: <Briefcase className="w-8 h-8 text-amber-500" />,
            color: "border-amber-100 bg-amber-50"
        },
        {
            title: "Regroupement Familial",
            desc: "Parrainez vos proches, conjoints ou enfants pour qu'ils vous rejoignent et obtiennent la résidence.",
            icon: <Users className="w-8 h-8 text-sky-500" />,
            color: "border-sky-100 bg-sky-50"
        },
        {
            title: "Programmes Provinciaux",
            desc: "Solutions d'immigration spécifiques adaptées aux besoins économiques de différentes provinces.",
            icon: <Landmark className="w-8 h-8 text-emerald-500" />,
            color: "border-emerald-100 bg-emerald-50"
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
                        <Link href="/" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Accueil</Link>
                        <Link href="/tourisme" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Tourisme</Link>
                        <Link href="/etudes" className="text-gray-600 hover:text-amber-600 font-medium transition-colors">Études</Link>
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
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-slate-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10 py-16 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm text-amber-300 font-medium text-sm mb-8 border border-white/10"
                    >
                        <Scale className="w-4 h-4" />
                        <span>Expertise Juridique & Administrative</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
                    >
                        Votre Projet d'Immigration, <br />
                        En Toute <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">Transparence</span>.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-gray-400 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        Une démarche d'immigration complexe nécessite une expertise rigoureuse. Qu'il s'agisse de résidence permanente, d'Entrée Express ou de parrainage, nos consultants certifiés sécurisent votre dossier.
                    </motion.p>

                    <Link href="/auth/register">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-bold text-lg hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto"
                        >
                            Lancer mon évaluation gratuite
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Garantie Section */}
            <section className="py-16 bg-amber-400 text-gray-900">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                    <div className="flex items-center gap-4">
                        <ShieldCheck className="w-12 h-12" />
                        <div className="text-left">
                            <div className="font-extrabold text-xl">Confidentialité Assurée</div>
                            <div className="font-medium opacity-80 text-sm">Transfert sécurisé de vos données</div>
                        </div>
                    </div>
                    <div className="hidden md:block w-px h-12 bg-gray-900/10"></div>
                    <div className="flex items-center gap-4">
                        <FileCheck className="w-12 h-12" />
                        <div className="text-left">
                            <div className="font-extrabold text-xl">Analyse Rigoureuse</div>
                            <div className="font-medium opacity-80 text-sm">Triple vérification par nos experts</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Programmes Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Maitrise des Programmes Officiels</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Découvrez les meilleures solutions légales pour vous installer à l'étranger selon votre qualification et vos objectifs.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {programmes.map((prog, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ y: -5 }}
                                className={`p-10 border rounded-3xl ${prog.color} cursor-pointer hover:shadow-xl transition-all h-full`}
                            >
                                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                                    {prog.icon}
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">{prog.title}</h3>
                                <p className="text-gray-600 mb-8 leading-relaxed">
                                    {prog.desc}
                                </p>
                                <div className="font-bold text-gray-900 flex items-center gap-2 group">
                                    Vérifier mon éligibilité
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Processus */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[3rem] p-10 md:p-16 text-white overflow-hidden relative">
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

                        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-3xl md:text-4xl font-bold mb-6">L'expertise qui fait la différence.</h2>
                                <p className="text-gray-400 text-lg mb-8">Un dossier incomplet ou mal justifié peut entraîner un refus définitif. C'est pourquoi chaque dossier transitant par Oussama Travel subit un audit interne de conformité aux normes gouvernementales.</p>
                                <ul className="space-y-4 font-medium">
                                    <li className="flex gap-3 text-amber-400"><CheckCircle2 /> Audit de compétences professionnelles</li>
                                    <li className="flex gap-3 text-amber-400"><CheckCircle2 /> Compilation des preuves formelles</li>
                                    <li className="flex gap-3 text-amber-400"><CheckCircle2 /> Suivi centralisé via le tableau de bord</li>
                                </ul>
                            </div>
                            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 backdrop-blur-md">
                                <FileText className="w-12 h-12 text-amber-400 mb-6" />
                                <h3 className="text-2xl font-bold mb-4">Commencez sereinement</h3>
                                <p className="text-gray-400 mb-8">L'ouverture de votre Espace Client et l'import de vos documents d'identité sont 100% sécurisés et gratuits.</p>
                                <Link href="/auth/register">
                                    <button className="w-full py-4 bg-amber-400 text-gray-900 rounded-xl font-bold text-lg hover:bg-amber-500 shadow-lg shadow-amber-500/20 transition-all">
                                        Ouvrir un dossier sécurisé
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
