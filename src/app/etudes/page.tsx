"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { 
    GraduationCap, 
    ArrowRight, 
    Globe2, 
    Trophy, 
    Calculator,
    CheckCircle2,
    Compass,
    FileText,
    School,
    ShieldCheck,
    Sparkles,
    Search
} from "lucide-react";
import Link from "next/link";
import StudyCalculator from "@/components/StudyCalculator";

export default function Etudes() {
    const [isCalculatorOpen, setIsCalculatorOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    const destinations = [
        {
            code: "fr",
            country: "France",
            desc: "Système d'excellence via Campus France. Frais de scolarité subventionnés et diplômes reconnus mondialement.",
            icon: "🇫🇷",
            image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=800",
            programs: ["LMD", "Grandes Écoles", "Ingénierie"]
        },
        {
            code: "ca",
            country: "Canada",
            desc: "Une destination de rêve avec 96 universités accueillantes. Accompagnement complet pour le CAQ et Permis d'Études.",
            icon: "🇨🇦",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800",
            programs: ["Bachelor", "Maîtrise", "AEC/DEC"]
        },
        {
            code: "it",
            country: "Italie",
            desc: "Filières d'excellence en Architecture, Design et Médecine. Bourses régionales attractives (ISEE).",
            icon: "🇮🇹",
            image: "https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=800",
            programs: ["Laurea Triennale", "Magistrale", "Arts"],
            special: true,
            link: "/etudes/italie/universites",
            linkText: "Liste des Universités"
        },
        {
            code: "es",
            country: "Espagne",
            desc: "Qualité de vie et universités publiques accessibles via l'UNEDasiss. Idéal pour le commerce et les arts.",
            icon: "🇪🇸",
            image: "/destinations/espagne.jpg",
            programs: ["Grado", "Master", "Doctorat"]
        },
        {
            code: "be",
            country: "Belgique",
            desc: "Équivalence souple et cadre francophone. Enseignement supérieur de haut niveau à tarif avantageux.",
            icon: "🇧🇪",
            image: "https://images.unsplash.com/photo-1491557345352-5929e343eb89?q=80&w=800",
            programs: ["Bachelier", "Master", "Ingénieur"]
        },
        {
            code: "tr",
            country: "Turquie",
            desc: "Bourses Türkiye Bursları et universités dynamiques. Cursus en Anglais ou Turc.",
            icon: "🇹🇷",
            image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=800",
            programs: ["Licence", "Master", "Prépa Langue"]
        }
    ];

    const filteredDestinations = destinations.filter(d => 
        d.country.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.6 }
    };

    return (
        <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
            
            {/* ─── HERO SECTION (LIGHT & PRESTIGIOUS) ─── */}
            <section className="relative pt-44 pb-24 px-4 overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-indigo-50/50 to-transparent rounded-full blur-[120px] -z-10" />
                
                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-indigo-50 text-indigo-600 font-black text-[10px] uppercase tracking-[0.3em] mb-8 border border-indigo-100 shadow-sm"
                    >
                        <Trophy className="w-4 h-4" />
                        Votre Avenir Académique
                    </motion.div>

                    <motion.h1 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 text-slate-950 uppercase"
                    >
                        Le Monde Est <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-400 italic">Votre Campus.</span>
                    </motion.h1>

                    <motion.p 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto font-medium mb-16 leading-relaxed"
                    >
                        De l'admission à l'obtention du visa, nous vous accompagnons dans les universités les plus prestigieuses de la planète.
                    </motion.p>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                        <button 
                            onClick={() => setIsCalculatorOpen(true)}
                            className="px-12 py-6 bg-slate-950 text-white rounded-[2rem] font-black text-lg hover:bg-indigo-600 transition-all shadow-2xl shadow-indigo-900/10 flex items-center gap-3 group"
                        >
                            Évaluer mes chances
                            <Calculator className="w-5 h-5 transition-transform group-hover:rotate-12" />
                        </button>
                        <div className="relative group">
                            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input 
                                type="text" 
                                placeholder="Rechercher un pays..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-14 pr-10 py-6 bg-slate-50 border border-slate-200 rounded-[2rem] font-bold text-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white transition-all w-full sm:w-[300px]"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* ─── DESTINATIONS GRID ─── */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {filteredDestinations.map((dest, i) => {
                        const slugMap: Record<string, string> = {
                            'us': 'usa', 'fr': 'france', 'ca': 'canada', 'es': 'espagne',
                            'be': 'belgique', 'it': 'italie', 'tr': 'turquie'
                        };
                        const slug = slugMap[dest.code] || dest.code;
                        
                        return (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`group relative bg-white rounded-[3.5rem] border border-slate-100 p-2 overflow-hidden hover:shadow-3xl hover:shadow-slate-200/50 transition-all duration-500 ${dest.special ? 'ring-4 ring-indigo-500/10' : ''}`}
                            >
                                <Link href={`/etudes/${slug}`}>
                                    <div className="relative h-64 rounded-[3rem] overflow-hidden mb-8">
                                        <img src={dest.image} alt={dest.country} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent" />
                                        <div className="absolute top-6 left-6 px-4 py-2 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl text-2xl">
                                            {dest.icon}
                                        </div>
                                        {dest.special && (
                                            <div className="absolute top-6 right-6 px-4 py-2 bg-indigo-600 text-white rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-2">
                                                <Sparkles className="w-3 h-3" /> Admission Ouverte
                                            </div>
                                        )}
                                    </div>
                                </Link>

                                <div className="px-8 pb-10 flex flex-col h-full">
                                    <h3 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter uppercase leading-none">{dest.country}</h3>
                                    <p className="text-slate-500 font-medium mb-8 leading-relaxed line-clamp-2">
                                        {dest.desc}
                                    </p>
                                    
                                    <div className="space-y-3 mb-10">
                                        {dest.programs.map((prog, pIdx) => (
                                            <div key={pIdx} className="flex items-center gap-3 text-slate-400 font-black text-[10px] uppercase tracking-widest">
                                                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400"></div>
                                                {prog}
                                            </div>
                                        ))}
                                    </div>

                                    {dest.link ? (
                                        <Link href={dest.link}>
                                            <button className="w-full py-5 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all flex items-center justify-center gap-3 shadow-xl">
                                                {dest.linkText}
                                                <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </Link>
                                    ) : (
                                        <Link href={`/etudes/${slug}`}>
                                            <button className="w-full py-5 bg-slate-50 text-slate-600 border border-slate-100 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-50 transition-all flex items-center justify-center gap-2">
                                                Détails Procédure <ArrowRight className="w-4 h-4 opacity-50 group-hover:translate-x-1 transition-transform" />
                                            </button>
                                        </Link>
                                    )}
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ─── SERVICES ─── */}
            <section className="py-24 bg-slate-50 border-y border-slate-100">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-20">
                        <h2 className="text-4xl md:text-6xl font-black text-slate-950 tracking-tighter uppercase mb-6 leading-none">Accompagnement <br /> <span className="text-indigo-600">Sur Mesure.</span></h2>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">Nous gérons chaque étape de votre dossier pour maximiser vos chances de réussite.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: "Orientation", desc: "Bilan complet et choix stratégique de l'université.", icon: <Compass className="w-6 h-6" /> },
                            { title: "Admissions", desc: "Gestion des inscriptions et lettres de motivation.", icon: <FileText className="w-6 h-6" /> },
                            { title: "Visa Études", desc: "Montage du dossier financier et simulation d'entretien.", icon: <ShieldCheck className="w-6 h-6" /> },
                            { title: "Accueil", desc: "Recherche de logement et installation sur place.", icon: <School className="w-6 h-6" /> },
                        ].map((svc, i) => (
                            <motion.div 
                                key={i}
                                {...fadeIn}
                                transition={{ delay: i * 0.1 }}
                                className="p-8 bg-white rounded-[2.5rem] border border-slate-100 hover:shadow-2xl transition-all text-center group"
                            >
                                <div className="w-16 h-16 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center mx-auto mb-8 group-hover:bg-indigo-600 group-hover:text-white transition-all transform group-hover:-rotate-6">
                                    {svc.icon}
                                </div>
                                <h3 className="text-sm font-black text-slate-950 mb-3 uppercase tracking-widest">{svc.title}</h3>
                                <p className="text-xs text-slate-500 font-medium leading-relaxed">{svc.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ─── CTA ─── */}
            <section className="py-32 px-4 text-center">
                <div className="max-w-4xl mx-auto bg-slate-950 rounded-[4rem] p-12 md:p-24 text-white relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/20 blur-[100px] rounded-full" />
                    <div className="relative z-10">
                        <GraduationCap className="w-20 h-20 text-indigo-400 mx-auto mb-10" />
                        <h2 className="text-4xl md:text-7xl font-black tracking-tighter leading-tight mb-8">
                            Prêt pour le <br /> grand départ ?
                        </h2>
                        <Link href="/auth/register">
                            <button className="px-12 py-7 bg-white text-slate-950 rounded-full font-black text-xl hover:bg-indigo-400 hover:text-white transition-all flex items-center gap-4 mx-auto">
                                Créer mon Dossier <ArrowRight className="w-6 h-6" />
                            </button>
                        </Link>
                    </div>
                </div>
            </section>

            <StudyCalculator isOpen={isCalculatorOpen} onClose={() => setIsCalculatorOpen(false)} />
        </div>
    );
}
