"use client";

import { motion } from "framer-motion";
import {
    MapPin,
    CalendarDays,
    CheckCircle2,
    ArrowRight,
    Plane,
    Globe2,
    ShieldCheck,
    Clock,
    Star,
    Umbrella,
    Camera,
    CreditCard
} from "lucide-react";
import Link from "next/link";

export default function Tourisme() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const destinations = [
        {
            name: "Dubaï - Oasis du Futur",
            desc: "Visa express en 48h. Packages incluant le Musée du Futur, Safari Désert et Safari Lounge.",
            price: "Dès 120,000 DZD",
            type: "Best Seller",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
            color: "from-sky-500 to-blue-600"
        },
        {
            name: "Antalya - Perle de la Turquie",
            desc: "Séjours All-Inclusive 5 étoiles. Vols directs, transferts et assistance visa e-Visa Turquie.",
            price: "Dès 185,000 DZD",
            type: "Haut de Gamme",
            image: "https://images.unsplash.com/photo-15420518418c7-433433e7bad1?q=80&w=800&auto=format&fit=crop",
            color: "from-emerald-500 to-teal-500"
        },
        {
            name: "Malaisie - Nature & Modernité",
            desc: "Plages de rêve et Kuala Lumpur. Package sans visa pour les citoyens algériens.",
            price: "Dès 245,000 DZD",
            type: "Aventure",
            image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
            color: "from-amber-400 to-orange-500"
        }
    ];

    const advantages = [
        {
            icon: <Clock className="w-6 h-6 text-sky-500" />,
            title: "Rapidité record",
            desc: "Traitement de vos dossiers de visa en moins de 24h ouvrables."
        },
        {
            icon: <ShieldCheck className="w-6 h-6 text-emerald-500" />,
            title: "Hébergement Garanti",
            desc: "Réservations confirmées dans des hôtels de prestige sélectionnés par nos soins."
        },
        {
            icon: <CreditCard className="w-6 h-6 text-amber-500" />,
            title: "Paiement Flexible",
            desc: "Possibilité de paiement en plusieurs fois ou via virement CCP/CIB."
        },
        {
            icon: <Umbrella className="w-6 h-6 text-rose-500" />,
            title: "Assurance Voyage",
            desc: "Assurance internationale comprise couvrant jusqu'à 30,000 €."
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <section className="pt-48 pb-32 px-4 sm:px-6 lg:px-8 bg-sky-900 relative overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <img
                        src="https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Travel bg"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-sky-900 via-sky-900/80 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-sky-200 font-black text-xs uppercase tracking-widest mb-8 border border-white/20"
                    >
                        <Globe2 className="w-4 h-4" />
                        <span>Votre partenaire évasion n°1 en Algérie</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        Vivez des <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 uppercase italic">
                            Émotions
                        </span> Sans Limites.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-sky-100/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        Nous ne vendons pas seulement des billets, nous créons vos souvenirs les plus précieux. Oussama Travel s'occupe de tout votre séjour.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-amber-400 text-slate-900 rounded-full font-black text-lg hover:bg-amber-300 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3"
                            >
                                Créer mon Dossier Voyage
                                <ArrowRight className="w-5 h-5 font-black" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Destinations Grid */}
            <section className="py-24 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {destinations.map((dest, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all group cursor-pointer border border-slate-100 flex flex-col h-full"
                            >
                                <div className="h-64 relative overflow-hidden">
                                    <img
                                        src={dest.image}
                                        alt={dest.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                    />
                                    <div className="absolute top-6 left-6">
                                        <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-sm">
                                            {dest.type}
                                        </span>
                                    </div>
                                    <div className="absolute bottom-6 left-6 flex items-center gap-1 text-white">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                    </div>
                                </div>
                                <div className="p-10 flex flex-col flex-grow">
                                    <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight">{dest.name}</h3>
                                    <p className="text-slate-500 font-medium mb-8 flex-grow leading-relaxed">
                                        {dest.desc}
                                    </p>
                                    <div className="flex items-center justify-between pt-8 border-t border-slate-50">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Prix à partir de</span>
                                            <span className="text-xl font-black text-sky-600 tracking-tight">{dest.price}</span>
                                        </div>
                                        <button className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center hover:bg-sky-500 transition-colors shadow-xl">
                                            <ArrowRight className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Oussama Travel? */}
            <section className="py-24 bg-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Plus qu'une Agence, <br /> Votre Support 24/7.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Nous avons réinventé le voyage en Algérie avec une plateforme 100% digitalisée pour un confort total.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {advantages.map((adv, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="text-center group"
                            >
                                <div className="w-20 h-20 rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center mx-auto mb-8 group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:rotate-6 shadow-sm">
                                    {adv.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-widest">{adv.title}</h3>
                                <p className="text-slate-500 font-medium leading-relaxed">{adv.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Visa Services */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-slate-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-sky-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-6xl font-black text-white mb-12 tracking-tighter leading-tight">
                                Besoin uniquement <br />
                                <span className="text-sky-400">du Visa ?</span>
                            </h2>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                                <div className="space-y-8">
                                    <p className="text-slate-400 text-lg font-medium leading-relaxed">
                                        Nous gérons les procédures de visa touristique pour toutes les grandes destinations. Notre taux de réussite record de 98 % sur les visas Schengen et Dubaï parle pour nous.
                                    </p>
                                    <div className="space-y-4">
                                        {["Visa Schengen (France, Espagne, Italie)", "Visa Turquie (E-Visa / Classique)", "Visa USA & Canada Tourisme", "Visa Égypte & Dubaï Express"].map((v, i) => (
                                            <div key={i} className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest bg-white/5 border border-white/10 p-5 rounded-2xl hover:bg-white/10 transition-all cursor-pointer">
                                                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                                                {v}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/5 backdrop-blur-md border border-white/10 p-10 rounded-[3rem] shadow-2xl">
                                    <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest text-amber-400">Le Saviez-vous ?</h3>
                                    <p className="text-slate-300 font-medium leading-relaxed mb-8">
                                        En créant votre espace client, vous recevez une notification SMS/Mail dès que votre dossier progresse vers le dépôt au centre de visa !
                                    </p>
                                    <Link href="/auth/register" className="block">
                                        <button className="w-full py-5 bg-white text-slate-900 rounded-full font-black text-lg hover:bg-slate-100 transition-all flex items-center justify-center gap-3">
                                            Ouvrir mon profil
                                            <ArrowRight className="w-5 h-5" />
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
