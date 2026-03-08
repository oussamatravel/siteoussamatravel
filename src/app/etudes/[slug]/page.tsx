"use client";

import { motion } from "framer-motion";
import {
    CheckCircle2,
    Clock,
    FileText,
    GraduationCap,
    ShieldCheck,
    ArrowRight,
    MapPin,
    Globe2
} from "lucide-react";
import { use, useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

// Liste des destinations harmonisée avec la page principale
const destinationsData: Record<string, any> = {
    "france": {
        name: "France",
        desc: "Système d'excellence via Campus France. Diplômes reconnus mondialement et frais subventionnés.",
        image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=1200&auto=format&fit=crop",
        programs: ["Licence", "Master", "Doctorat", "Grandes Écoles"]
    },
    "canada": {
        name: "Canada",
        desc: "Un cadre de vie unique et des universités de prestige. Opportunités de travail post-études exceptionnelles.",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
        programs: ["Collégial (DEC)", "Baccalauréat", "Maîtrise", "Doctorat"]
    },
    "espagne": {
        name: "Espagne",
        desc: "Qualité de vie et universités dynamiques. Accès simplifié via l'UNED pour les étudiants internationaux.",
        image: "/destinations/espagne.jpg",
        programs: ["Grado", "Master", "Doctorat"]
    },
    "belgique": {
        name: "Belgique",
        desc: "Enseignement francophone de haute qualité au cœur de l'Europe. Proximité avec les institutions mondiales.",
        image: "https://source.unsplash.com/1200x800/?belgium,brussels,architecture",
        programs: ["Bachelier", "Master", "Spécialisation"]
    },
    "usa": {
        name: "États-Unis",
        desc: "Le hub mondial de l'innovation. Accès aux campus les plus prestigieux et bourses de recherche.",
        image: "/destinations/usa.jpg",
        programs: ["Bachelor's", "Master's", "PhD"]
    },
    "malaisie": {
        name: "Malaisie",
        desc: "Éducation anglo-saxonne à prix abordable. Une destination moderne et accueillante en Asie.",
        image: "https://source.unsplash.com/1200x800/?malaysia,kuala-lumpur",
        programs: ["Bachelor", "Master", "PhD"]
    },
    "dubai": {
        name: "Dubaï",
        desc: "Admission garantie à 100% dans nos universités partenaires de prestige. Frais de scolarité très attractifs à partir de 3000$/an avec lifestyle unique et hub pro mondial.",
        image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop",
        programs: ["Bachelor Direct", "Master / MBA", "Cours d'Anglais"]
    },
    "allemagne": {
        name: "Allemagne",
        desc: "Ingénierie et Technologie de pointe. Les études dans les universités publiques sont souvent gratuites ou très peu coûteuses. Forte demande sur le marché de l'emploi local.",
        image: "https://source.unsplash.com/1200x800/?germany,berlin,architecture",
        programs: ["Studienkolleg", "Master Ingénierie", "Ausbildung"]
    },
    "italie": {
        name: "Italie",
        desc: "Berceau de la culture mondiale, l'Italie séduit par ses filières d'excellence (Architecture, Design, Médecine), avec des bourses régionales attractives (Isee).",
        image: "https://source.unsplash.com/1200x800/?italy,rome,colosseum",
        programs: ["Laurea Triennale", "Laurea Magistrale", "MBA & Arts"]
    },
    "turquie": {
        name: "Turquie",
        desc: "Destination prisée grâce aux bourses Türkiye Bursları, ses universités dynamiques et de nombreuses filières enseignées en anglais.",
        image: "https://source.unsplash.com/1200x800/?istanbul,turkey,mosque",
        programs: ["Licence (Lisans)", "Master (Yüksek Lisans)", "Année Prépa Langue"]
    },
    "irlande": {
        name: "Irlande",
        desc: "Le hub européen de la Tech (siège de Google, Apple, Meta). Idéal pour les études anglophones avec d'excellentes opportunités de travail.",
        image: "https://source.unsplash.com/1200x800/?ireland,dublin,cliffs",
        programs: ["Undergraduate", "Postgraduate", "Anglais Intensif"]
    },
    "chine": {
        name: "Chine",
        desc: "L'étoile montante de l'éducation mondiale. Des bourses du gouvernement chinois (CGS) très généreuses et des cursus technologiques de pointe enseignés en anglais.",
        image: "/destinations/chine.jpg",
        programs: ["Bachelor", "Master", "Bourse du Gouvernement"]
    },
    "tcheque": {
        name: "Rép. Tchèque",
        desc: "Qualité d'enseignement historique au centre de l'Europe. Un coût de la vie très abordable et des centaines de programmes enseignés en anglais (Médecine, IT).",
        image: "/destinations/tcheque.jpg",
        programs: ["Programmes en Anglais", "Master", "PhD"]
    },
    "russie": {
        name: "Russie",
        desc: "Tradition scientifique forte, très réputée pour l'accès simplifié aux cursus médicaux (Médecine, Pharmacie) et techniques sans concours draconiens.",
        image: "https://source.unsplash.com/1200x800/?moscow,russia,kremlin",
        programs: ["Médecine", "Ingénierie", "Année Préparatoire (Langue)"]
    }
};

export default function StudyDestinationPage() {
    const params = useParams();
    const slug = params.slug as string;
    const countryData = destinationsData[slug];

    if (!countryData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-50">
                <div className="text-center p-12 bg-white rounded-[3rem] shadow-xl border border-slate-100">
                    <h1 className="text-4xl font-black text-slate-900 mb-6 uppercase tracking-tighter">Destination non trouvée</h1>
                    <Link href="/etudes">
                        <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-black flex items-center gap-2 mx-auto hover:bg-blue-700 transition-all">
                            Retour aux destinations
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    const steps = [
        { title: "Consultation & Audit", icon: <Globe2 className="w-5 h-5" />, desc: "Analyse de votre profil académique par nos experts." },
        { title: "Constitution du Dossier", icon: <FileText className="w-5 h-5" />, desc: "Préparation de tous les documents (CV, Lettre, Relevés)." },
        { title: "Admission Universitaire", icon: <GraduationCap className="w-5 h-5" />, desc: "Gestion des candidatures et obtention de l'admission." },
        { title: "Procédure Visa", icon: <ShieldCheck className="w-5 h-5" />, desc: "Préparation à l'entretien et dépôt du dossier consulaire." }
    ];

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Hero Section */}
            <section className="relative h-[65vh] flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src={countryData.image}
                        className="w-full h-full object-cover"
                        alt={countryData.name}
                    />
                    <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-[1px]" />
                </div>

                <div className="relative z-10 text-center text-white px-4 max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 mb-8"
                    >
                        <MapPin className="w-4 h-4 text-amber-400" />
                        <span className="uppercase tracking-[0.3em] font-black text-[10px] text-white">Destination Études Premium</span>
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.8]"
                    >
                        Étudiez en <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic uppercase">{countryData.name}</span>
                    </motion.h1>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-20">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-16">
                        <div>
                            <h2 className="text-4xl font-black text-slate-900 mb-8 tracking-tight flex items-center gap-4">
                                <span className="w-3 h-12 bg-blue-600 rounded-full" />
                                Pourquoi choisir {countryData.name} ?
                            </h2>
                            <p className="text-2xl text-slate-500 leading-relaxed font-medium">
                                {countryData.desc}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {steps.map((step, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-10 rounded-[3rem] bg-slate-50 border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-8 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all">
                                        {step.icon}
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-3 uppercase tracking-tight">{step.title}</h3>
                                    <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
                                </motion.div>
                            ))}
                        </div>

                        {/* ====== PACK PREMIUM ITALIE (section spécifique) ====== */}
                        {slug === "italie" && (
                            <div className="space-y-8">
                                {/* Header Pack */}
                                <div className="flex items-center gap-4">
                                    <span className="text-5xl">🇮🇹</span>
                                    <div>
                                        <h2 className="text-3xl font-black text-slate-900 tracking-tight leading-tight">Pack Premium Études en Italie</h2>
                                        <p className="text-slate-500 font-medium mt-1">Admission + Bourse + Visa — Accompagnement structuré de A à Z</p>
                                    </div>
                                </div>

                                {/* Les 2 packs */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Pack Licence */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        className="rounded-[2.5rem] border-2 border-blue-100 bg-gradient-to-br from-blue-50 to-white p-8 flex flex-col"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-blue-500">Pack</div>
                                                <h3 className="text-xl font-black text-slate-900 tracking-tight">Licence</h3>
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">3 universités partenaires</div>
                                        <ul className="space-y-3 flex-grow">
                                            {[
                                                "CV académique professionnel",
                                                "3 lettres de motivation personnalisées",
                                                "Pré-inscription via Universitaly",
                                                "Candidature bourse de district (DSU)"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-700 font-medium text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="/auth/register" className="mt-8 block">
                                            <button className="w-full py-3 bg-blue-600 text-white font-black rounded-2xl text-sm hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                                                Démarrer <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    </motion.div>

                                    {/* Pack Master / Doctorat */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 }}
                                        className="rounded-[2.5rem] bg-slate-950 text-white p-8 flex flex-col relative overflow-hidden border-2 border-slate-800"
                                    >
                                        <div className="absolute top-0 right-0 w-48 h-48 bg-amber-400/10 blur-[60px] rounded-full pointer-events-none" />
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="w-12 h-12 rounded-2xl bg-amber-400 flex items-center justify-center text-slate-950">
                                                <GraduationCap className="w-6 h-6" />
                                            </div>
                                            <div>
                                                <div className="text-[10px] font-black uppercase tracking-widest text-amber-400">Pack</div>
                                                <h3 className="text-xl font-black tracking-tight">Master / Doctorat</h3>
                                            </div>
                                        </div>
                                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">5 universités + 3 universités de secours</div>
                                        <ul className="space-y-3 flex-grow">
                                            {[
                                                "CV optimisé Master/Doctorat",
                                                "5 lettres de motivation stratégiques",
                                                "Pré-inscription Universitaly",
                                                "Candidature bourses (gouvernementale, district & universitaire)",
                                                "Prise de rendez-vous visa",
                                                "Préparation entretien + dossier visa complet"
                                            ].map((item, i) => (
                                                <li key={i} className="flex items-start gap-3 text-slate-300 font-medium text-sm">
                                                    <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                        <Link href="/auth/register" className="mt-8 block relative z-10">
                                            <button className="w-full py-3 bg-amber-400 text-slate-950 font-black rounded-2xl text-sm hover:bg-amber-300 transition-all flex items-center justify-center gap-2">
                                                Démarrer <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    </motion.div>
                                </div>

                                {/* Documents requis */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-[2.5rem] bg-slate-50 border border-slate-100 p-8"
                                >
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight mb-6 flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-600" />
                                        Documents requis
                                    </h3>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        {[
                                            "Passeport en cours de validité",
                                            "Photo d'identité (fond blanc)",
                                            "CV académique à jour",
                                            "Bac + relevés de notes",
                                            "Certificat de langue (si applicable)",
                                            "Licence/Master + relevés (pour Master/Doctorat)",
                                            "Traductions officielles en anglais"
                                        ].map((doc, i) => (
                                            <div key={i} className="flex items-center gap-3 text-slate-700 font-medium text-sm py-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                                                {doc}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Bandeau avantage global */}
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    className="rounded-[2.5rem] bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-8 flex items-center gap-6"
                                >
                                    <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center flex-shrink-0">
                                        <ShieldCheck className="w-7 h-7 text-white" />
                                    </div>
                                    <div>
                                        <h4 className="text-lg font-black mb-1">Accompagnement structuré</h4>
                                        <p className="text-emerald-50 font-medium text-sm leading-relaxed">
                                            Nos packs sont conçus pour maximiser vos chances d'admission, de financement (bourses) et d'obtention du visa étudiant en Italie.
                                        </p>
                                    </div>
                                </motion.div>
                            </div>
                        )}

                        <div className="p-12 rounded-[3.5rem] bg-slate-900 text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full" />
                            <h3 className="text-2xl font-black mb-8 uppercase tracking-widest text-amber-400">Programmes éligibles</h3>
                            <div className="flex flex-wrap gap-4">
                                {countryData.programs.map((prog: string, i: number) => (
                                    <div key={i} className="px-6 py-3 rounded-2xl bg-white/5 border border-white/10 font-black text-sm uppercase tracking-tighter">
                                        {prog}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar CTA */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-32 bg-white rounded-[3.5rem] p-12 shadow-2xl border border-slate-50 text-center">
                            <GraduationCap className="w-20 h-20 text-blue-600 mx-auto mb-8" />
                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter leading-tight uppercase">Vérifiez vos chances d'admission</h3>
                            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
                                Notre équipe analyse votre profil et vous conseille les meilleures universités selon votre budget.
                            </p>
                            <Link href="/auth/register" className="block w-full">
                                <button className="w-full py-6 bg-blue-600 text-white rounded-3xl font-black text-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20 flex items-center justify-center gap-3">
                                    Démarrer mon dossier
                                    <ArrowRight className="w-6 h-6" />
                                </button>
                            </Link>
                            <div className="mt-8 space-y-3">
                                <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest justify-center">
                                    <CheckCircle2 className="w-4 h-4" /> Analyse gratuite sous 24h
                                </div>
                                <div className="flex items-center gap-3 text-emerald-500 font-black text-[10px] uppercase tracking-widest justify-center">
                                    <CheckCircle2 className="w-4 h-4" /> Accompagnement Visa inclus
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

