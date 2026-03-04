"use client";

import { motion } from "framer-motion";
import { MapPin, CalendarDays, CheckCircle2, ArrowRight, Plane, Globe2, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export default function Tourisme() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const destinations = [
        {
            name: "Dubaï, E.A.U",
            desc: "Découvrez le luxe avec nos packages visa + hôtel + excursions exclusives.",
            price: "Sur devis",
            type: "Package Complet",
            color: "from-sky-500 to-blue-600"
        },
        {
            name: "Malaisie & Asie",
            desc: "Évadez-vous vers des îles paradisiaques et une culture fascinante.",
            price: "Sur devis",
            type: "Voyage Sur Mesure",
            color: "from-amber-400 to-orange-500"
        },
        {
            name: "Europe (Schengen)",
            desc: "Assistance complète pour l'obtention de votre visa touristique Schengen.",
            price: "Prix fixes",
            type: "Assistance Visa",
            color: "from-emerald-400 to-teal-500"
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
                        <Link href="/" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Accueil</Link>
                        <Link href="/etudes" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Études</Link>
                        <Link href="/immigration" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Immigration</Link>
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
            <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-sky-900 relative overflow-hidden">
                {/* Background Elements */}
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/20 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3"></div>
                <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/20 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                <div className="max-w-7xl mx-auto relative z-10 py-16 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-sky-200 font-medium text-sm mb-8 border border-white/20"
                    >
                        <Plane className="w-4 h-4" />
                        <span>Service Rapide & Fiable</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight mb-6"
                    >
                        Explorez le Monde avec <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500">
                            Sérénité.
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-sky-100 max-w-2xl mx-auto mb-10 leading-relaxed"
                    >
                        De la préparation de votre dossier de visa touristique jusqu'à la réservation de vos vols et hôtels, nos experts s'occupent de chaque détail.
                    </motion.p>

                    <Link href="/auth/register">
                        <motion.button
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="px-8 py-4 bg-amber-400 text-gray-900 rounded-full font-bold text-lg hover:bg-amber-500 transition-all shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 mx-auto"
                        >
                            Commencer mon dossier
                            <ArrowRight className="w-5 h-5" />
                        </motion.button>
                    </Link>
                </div>
            </section>

            {/* Processus Section */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">Notre Processus 100% Digital</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">Obtenez votre visa touristique ou planifiez votre séjour en quelques étapes simples directement depuis votre Espace Client.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {[
                            { step: "01", title: "Inscription", desc: "Créez votre compte sur notre portail sécurisé.", icon: <CheckCircle2 className="w-6 h-6" /> },
                            { step: "02", title: "Documents", desc: "Téléversez vos passeports et pièces requises en ligne.", icon: <CalendarDays className="w-6 h-6" /> },
                            { step: "03", title: "Traitement", desc: "Nos agents vérifient et finalisent votre dossier.", icon: <Clock className="w-6 h-6" /> },
                            { step: "04", title: "Voyagez !", desc: "Recevez votre visa ou vos billets, et décollez.", icon: <Plane className="w-6 h-6" /> }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="relative p-6 bg-slate-50 border border-slate-100 rounded-2xl hover:border-sky-200 transition-colors"
                            >
                                <div className="text-4xl font-black text-sky-100 absolute top-4 right-4">{item.step}</div>
                                <div className="w-12 h-12 rounded-xl bg-sky-100 text-sky-600 flex items-center justify-center mb-6 relative z-10">
                                    {item.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                                <p className="text-gray-600">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Destinations Phares */}
            <section className="py-24 bg-slate-50 border-t border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-4">Nos Destinations Populaires</h2>
                            <p className="text-lg text-gray-600 max-w-2xl">Découvrez nos forfaits spéciaux pour vos prochaines vacances.</p>
                        </div>
                        <button className="mt-4 md:mt-0 font-bold text-sky-600 flex items-center gap-2 hover:text-sky-700">
                            Voir tout le catalogue <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 group cursor-pointer hover:shadow-xl transition-all"
                            >
                                <div className={`h-32 bg-gradient-to-r ${dest.color} relative overflow-hidden p-6 flex flex-col justify-between`}>
                                    <div className="absolute inset-0 bg-black/10"></div>
                                    <span className="relative z-10 inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold self-start uppercase tracking-wider">
                                        {dest.type}
                                    </span>
                                    <MapPin className="relative z-10 w-8 h-8 text-white opacity-50 absolute bottom-4 right-4" />
                                </div>
                                <div className="p-8">
                                    <h3 className="text-2xl font-bold text-gray-900 mb-3">{dest.name}</h3>
                                    <p className="text-gray-600 mb-6 line-clamp-2">{dest.desc}</p>
                                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                        <span className="font-bold text-sky-600">{dest.price}</span>
                                        <button className="text-sm font-bold text-gray-900 group-hover:text-amber-500 transition-colors flex items-center gap-1">
                                            Devis en ligne
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-sky-900 text-white text-center">
                <div className="max-w-3xl mx-auto px-4">
                    <ShieldCheck className="w-16 h-16 text-amber-400 mx-auto mb-6" />
                    <h2 className="text-3xl font-bold mb-6">Préparez vos valises, nous gérons l'administration.</h2>
                    <p className="text-sky-100 mb-8 text-lg">Ouvrez votre profil client dès aujourd'hui et commencez à importer vos documents scannés en toute sécurité.</p>
                    <Link href="/auth/register">
                        <button className="px-8 py-4 bg-white text-sky-900 rounded-full font-bold text-lg hover:bg-sky-50 shadow-lg transition-all">
                            Accéder à l'Espace Client
                        </button>
                    </Link>
                </div>
            </section>
        </div>
    );
}
