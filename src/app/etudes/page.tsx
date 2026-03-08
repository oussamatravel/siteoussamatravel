"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    GraduationCap,
    ArrowRight,
    BookOpen,
    Globe2,
    Trophy,
    Clock,
    Search,
    FileText,
    CheckCircle2,
    Compass,
    Backpack,
    School,
    ShieldCheck,
    Calculator
} from "lucide-react";
import Link from "next/link";
import StudyCalculator from "@/components/StudyCalculator";

export default function Etudes() {
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    const destinations = [
        {
            code: "fr",
            country: "France",
            desc: "Procédure administrative des étudiants algériens en France. Système d'excellence via l'Espace Campus France. Frais de scolarité abordables et subventionnés par l'Etat français. Accompagnement de A à Z : Admission, TCF/DELF, Hébergement, Visa.",
            icon: "🇫🇷",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800&auto=format&fit=crop",
            color: "text-blue-700",
            bg: "bg-blue-50",
            programs: ["LMD (Licence/Master/Doctorat)", "Grandes Écoles", "Écoles d'Ingénieur", "BTS/DUT"]
        },
        {
            code: "ca",
            country: "Canada",
            desc: "Le Canada compte 96 universités très accueillantes pour les étudiants internationaux. Nous vous accompagnons pour l'admission (AEC, DEC, BAC, Maîtrise), le CAQ, et le Permis d'Études Canadien.",
            icon: "🇨🇦",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
            color: "text-red-600",
            bg: "bg-red-50",
            programs: ["DEC (Collégial)", "Bachelor (Universitaire)", "Maîtrise & Doctorat", "AEC"]
        },
        {
            code: "es",
            country: "Espagne",
            desc: "Idéal pour les étudiants internationaux souhaitant allier qualité de vie exceptionnelle, coût de scolarité accessible (via l'UNEDasiss) et grandes universités publiques (Barcelone, Madrid, Valence).",
            icon: "🇪🇸",
            image: "/destinations/espagne.jpg",
            color: "text-yellow-600",
            bg: "bg-yellow-50",
            programs: ["Grado Universitaire", "Programmes Master", "Doctorat"]
        },
        {
            code: "be",
            country: "Belgique",
            desc: "Équivalence de diplômes souple et cadre francophone. Proximité directe avec les institutions européennes. Qualité d'enseignement supérieure à un tarif très avantageux.",
            icon: "🇧🇪",
            image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=800&auto=format&fit=crop",
            color: "text-red-700",
            bg: "bg-red-50",
            programs: ["Bachelier", "Master", "Filières Ingénieur"]
        },
        {
            code: "us",
            country: "États-Unis",
            desc: "Le rêve américain s'ouvre à vous : les campus universitaires les plus avancés au monde et une grande diversité de cursus de prestige mondial (IVY League etc.).",
            icon: "🇺🇸",
            image: "/destinations/usa.jpg",
            color: "text-blue-900",
            bg: "bg-blue-50",
            programs: ["Bachelor's Degree", "Master (MS/MBA)", "Doctorat (PhD)"]
        },
        {
            code: "my",
            country: "Malaisie",
            desc: "L'alternative parfaite : hub éducatif asiatique en pleine expansion, proposant des diplômes internationaux anglo-saxons avec un coût de vie et de scolarité extrêmement réduit.",
            icon: "🇲🇾",
            image: "https://images.unsplash.com/photo-1528127269322-539801943592?q=80&w=800&auto=format&fit=crop",
            color: "text-emerald-800",
            bg: "bg-emerald-50",
            programs: ["Bachelor (Twinning Programs)", "Master", "PhD"]
        },
        {
            code: "it",
            country: "Italie",
            desc: "Berceau de la culture mondiale, l'Italie séduit par ses filières d'excellence (Architecture, Design, Médecine), avec des bourses régionales attractives (Isee).",
            icon: "🇮🇹",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800&auto=format&fit=crop",
            color: "text-green-700",
            bg: "bg-green-50",
            programs: ["Laurea Triennale", "Laurea Magistrale", "MBA & Arts"]
        },
        {
            code: "tr",
            country: "Turquie",
            desc: "Destination prisée grâce aux bourses Türkiye Bursları, ses universités dynamiques (Istanbul, Ankara) et de nombreuses filières enseignées 100% en anglais ou turc.",
            icon: "🇹🇷",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800&auto=format&fit=crop",
            color: "text-red-600",
            bg: "bg-red-50",
            programs: ["Licence (Lisans)", "Master (Yüksek Lisans)", "Année Prépa Langue"]
        },
        {
            code: "ie",
            country: "Irlande",
            desc: "Le hub européen de la Tech (siège de Google, Apple, Meta). Idéal pour les études anglophones post-Brexit avec d'excellentes opportunités de travail pendant et après les études.",
            icon: "🇮🇪",
            image: "https://images.unsplash.com/photo-1590089415225-401ed6f9db8e?q=80&w=800&auto=format&fit=crop",
            color: "text-green-800",
            bg: "bg-green-50",
            programs: ["Undergraduate", "Postgraduate", "Anglais Intensif"]
        },
        {
            code: "cn",
            country: "Chine",
            desc: "L'étoile montante de l'éducation mondiale. Des bourses du gouvernement chinois (CGS) très généreuses et des cursus technologiques/business de pointe enseignés en anglais.",
            icon: "🇨🇳",
            image: "/destinations/chine.jpg",
            color: "text-red-700",
            bg: "bg-red-50",
            programs: ["Bachelor", "Master", "Bourse du Gouvernement"]
        },
        {
            code: "cz",
            country: "Rép. Tchèque",
            desc: "Qualité d'enseignement historique au centre de l'Europe. Un coût de la vie très abordable et des centaines de programmes enseignés entièrement en anglais (Médecine, IT).",
            icon: "🇨🇿",
            image: "/destinations/tcheque.jpg",
            color: "text-blue-800",
            bg: "bg-blue-50",
            programs: ["Programmes en Anglais", "Master", "PhD"]
        },
        {
            code: "ru",
            country: "Russie",
            desc: "Tradition scientifique forte, très réputée pour l'accès simplifié aux cursus médicaux (Médecine, Pharmacie) et techniques sans concours draconiens. Cursus en Russe ou Anglais.",
            icon: "🇷🇺",
            image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?q=80&w=800&auto=format&fit=crop",
            color: "text-blue-600",
            bg: "bg-blue-50",
            programs: ["Médecine", "Ingénierie", "Année Préparatoire (Langue)"]
        },
        {
            code: "de",
            country: "Allemagne",
            desc: "Ingénierie et Technologie de pointe. Les études dans les universités publiques sont souvent gratuites ou très peu coûteuses. Forte demande sur le marché de l'emploi local.",
            icon: "🇩🇪",
            image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?q=80&w=800&auto=format&fit=crop",
            color: "text-amber-900",
            bg: "bg-amber-50",
            programs: ["Studienkolleg", "Master Ingénierie", "Ausbildung"]
        },
        {
            code: "ae",
            country: "Dubaï",
            desc: "Admission garantie à 100% dans nos universités partenaires de prestige. Frais de scolarité très attractifs à partir de 3000$/an avec lifestyle unique et hub pro mondial.",
            icon: "🇦🇪",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
            color: "text-slate-900",
            bg: "bg-slate-50",
            programs: ["Bachelor Direct", "Master / MBA", "Cours d'Anglais"]
        }
    ];

    const services = [
        {
            title: "Orientation Stratégique",
            desc: "Bilan complet de votre profil académique pour choisir la meilleure université selon votre budget.",
            icon: <Compass className="w-6 h-6" />
        },
        {
            title: "Dossier d'Admission",
            desc: "Rédaction de lettres de motivation percutantes et gestion complète des inscriptions universitaires.",
            icon: <FileText className="w-6 h-6" />
        },
        {
            title: "Préparation Visa",
            desc: "Montage du dossier financier (garants, blocs) et simulation d'entretien consulaire personnalisée.",
            icon: <ShieldCheck className="w-6 h-6" />
        },
        {
            title: "Accueil & Logement",
            desc: "Accompagnement après l'arrivée : recherche de logement étudiant et démarches de résidence.",
            icon: <School className="w-6 h-6" />
        }
    ];

    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);

    return (
        <div className="min-h-screen bg-slate-50 font-sans">
            {/* Hero Section */}
            <section className="pt-48 pb-32 px-4 sm:px-6 lg:px-8 bg-blue-900 relative overflow-hidden">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Education background"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-900 via-blue-900/90 to-slate-50"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center text-white">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-white/10 backdrop-blur-md text-blue-200 font-black text-xs uppercase tracking-widest mb-8 border border-white/20"
                    >
                        <Trophy className="w-4 h-4" />
                        <span>Partenaire de plus de 150 universités mondiales</span>
                    </motion.div>

                    <motion.h1
                        {...fadeIn}
                        className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8"
                    >
                        Votre <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic uppercase">Diplôme</span> <br />
                        Sans Frontières.
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed"
                    >
                        L'éducation internationale est le meilleur investissement pour votre avenir. Oussama Travel vous guide dans le labyrinthe des admissions universitaires mondiales.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            onClick={() => setIsCalculatorOpen(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-5 bg-amber-400 text-slate-900 rounded-full font-black text-lg hover:bg-amber-300 transition-all shadow-2xl shadow-amber-500/30 flex items-center justify-center gap-3"
                        >
                            Évaluer mes chances
                            <Calculator className="w-5 h-5 font-black" />
                        </motion.button>
                        <Link href="/auth/register">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-10 py-5 bg-white/10 backdrop-blur-md text-white border border-white/20 rounded-full font-black text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-3"
                            >
                                Commencer mon Admissions
                                <ArrowRight className="w-5 h-5 font-black" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </section>

            {/* Destinations Section */}
            <section className="py-24 -mt-20 relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {destinations.map((dest, i) => {
                            const slugMap: Record<string, string> = {
                                'us': 'usa', 'fr': 'france', 'ca': 'canada', 'es': 'espagne',
                                'be': 'belgique', 'my': 'malaisie', 'ae': 'dubai', 'de': 'allemagne',
                                'it': 'italie', 'tr': 'turquie', 'ie': 'irlande', 'cn': 'chine',
                                'cz': 'tcheque', 'ru': 'russie'
                            };
                            const slug = slugMap[dest.code] || dest.code;
                            return (
                                <Link key={i} href={`/etudes/${slug}`} className="block group h-full">
                                    <motion.div
                                        initial={{ opacity: 0, y: 40 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.1 }}
                                        className="bg-white rounded-[3rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all border border-slate-100 flex flex-col h-full relative"
                                    >
                                        {/* Ambient Flag Background In The Whole Card */}
                                        <div className="absolute inset-0 opacity-5 group-hover:opacity-10 transition-opacity duration-500 pointer-events-none z-0">
                                            <img
                                                src={`https://flagcdn.com/w640/${dest.code}.png`}
                                                alt={dest.country}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                            />
                                        </div>
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/90 to-white/50 z-0 pointer-events-none" />

                                        <div className="h-64 relative overflow-hidden z-10 rounded-t-[3rem]">
                                            <img
                                                src={dest.image}
                                                alt={dest.country}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
                                            <div className="absolute top-6 left-6">
                                                <div className="w-16 h-12 bg-white/90 backdrop-blur-md rounded-xl flex items-center justify-center shadow-lg border border-white/40 overflow-hidden transform group-hover:scale-110 transition-transform duration-300">
                                                    <img
                                                        src={`https://flagcdn.com/w160/${dest.code}.png`}
                                                        alt={dest.country}
                                                        className="w-full h-full object-cover"
                                                    />
                                                </div>
                                            </div>
                                            <div className="absolute bottom-6 left-6">
                                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-white text-slate-900 shadow-xl`}>
                                                    Top Destination
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-10 flex flex-col flex-grow relative z-10 bg-white/40 backdrop-blur-sm">
                                            <h3 className="text-3xl font-black text-slate-900 mb-4 tracking-tight leading-tight group-hover:text-blue-900 transition-colors">{dest.country}</h3>
                                            <p className="text-slate-500 font-medium mb-8 leading-relaxed">
                                                {dest.desc}
                                            </p>
                                            <div className="space-y-3 pt-6 border-t border-slate-200/50 flex-grow">
                                                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Programmes disponibles</p>
                                                {dest.programs.map((prog, pIdx) => (
                                                    <div key={pIdx} className="flex items-center gap-3 text-slate-700 font-black text-sm uppercase tracking-tighter">
                                                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500"></div>
                                                        {prog}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Hover Arrow */}
                                        <div className="absolute bottom-8 right-8 w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-4 group-hover:translate-x-0 transition-all duration-300 shadow-xl z-20">
                                            <ArrowRight className="w-5 h-5" />
                                        </div>
                                    </motion.div>
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Why Oussama Travel? Services */}
            <section className="py-24 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">Accompagnement <br /> Haute Définition.</h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
                            Nous ne sommes pas que des consultants, nous sommes vos partenaires de réussite académique à long terme.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {services.map((svc, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:bg-white hover:shadow-2xl transition-all group text-center"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-blue-100 text-blue-600 flex items-center justify-center mx-auto mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                    {svc.icon}
                                </div>
                                <h3 className="text-lg font-black text-slate-900 mb-4 uppercase tracking-widest">{svc.title}</h3>
                                <p className="text-sm text-slate-500 font-medium leading-relaxed">{svc.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Admission */}
            <section className="py-32 bg-slate-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-blue-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-sky-500/10 blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

                        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                            <div>
                                <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter leading-tight">
                                    Évaluez vos chances <br />
                                    <span className="text-sky-400">gratuitement.</span>
                                </h2>
                                <p className="text-blue-100/70 text-lg font-medium leading-relaxed mb-8">
                                    Une inscription universitaire ne s'improvise pas. Nos conseillers analysent vos relevés de notes et vos relevés pour vous proposer les meilleures options en 48h.
                                </p>
                                <ul className="space-y-4">
                                    {["Analyse de dossier gratuite", "Simulation entretien consulaire", "Recherche de bourses d'études", "Aide à l'ouverture de compte bloqué"].map((item, i) => (
                                        <div key={i} className="flex items-center gap-4 text-white font-black text-xs uppercase tracking-widest">
                                            <div className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                            {item}
                                        </div>
                                    ))}
                                </ul>
                            </div>
                            <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 md:p-16 rounded-[4rem] shadow-3xl text-center">
                                <GraduationCap className="w-20 h-20 text-amber-400 mx-auto mb-8" />
                                <h3 className="text-2xl font-black text-white mb-6 uppercase tracking-widest">Session d'Orientation</h3>
                                <p className="text-slate-300 font-medium mb-10">Rejoignez notre espace client pour planifier votre appel avec un expert.</p>
                                <Link href="/auth/register">
                                    <button className="w-full py-5 bg-white text-blue-900 rounded-full font-black text-lg hover:bg-slate-50 transition-all flex items-center justify-center gap-3">
                                        Commencer mon Admission
                                        <ArrowRight className="w-5 h-5" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <StudyCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </div>
    );
}
