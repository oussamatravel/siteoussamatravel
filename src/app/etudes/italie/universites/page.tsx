"use client";

import { motion } from "framer-motion";
import {
    Search,
    GraduationCap,
    Clock,
    Euro,
    FileText,
    Youtube,
    Link as LinkIcon,
    CheckCircle2,
    XCircle,
    ArrowRight,
    MapPin,
    Calendar,
    Globe2,
    Info,
    ChevronRight,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";

export default function ItalianUniversitiesPublic() {
    const [universities, setUniversities] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("tous");

    const supabase = createClient();

    useEffect(() => {
        fetchUniversities();
    }, []);

    const fetchUniversities = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('italian_universities')
            .select('*')
            .order('status', { ascending: false }) // Ouvert en premier
            .order('name', { ascending: true });

        if (!error) setUniversities(data || []);
        setIsLoading(false);
    };

    const filteredUnis = universities.filter(u => {
        const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "tous" || u.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const stats = {
        total: universities.length,
        open: universities.filter(u => u.status === 'ouvert').length,
        closed: universities.filter(u => u.status === 'ferme').length
    };

    return (
        <div className="min-h-screen bg-slate-50 font-sans pb-24">
            {/* Hero Section */}
            <section className="relative pt-44 pb-32 px-4 overflow-hidden bg-slate-950">
                <div className="absolute inset-0">
                    <img
                        src="https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2000&auto=format&fit=crop"
                        className="w-full h-full object-cover opacity-20"
                        alt="Italy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-950 to-slate-50" />
                </div>

                <div className="max-w-7xl mx-auto relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-white font-black text-[10px] uppercase tracking-[0.3em] mb-10 backdrop-blur-md"
                    >
                        <img src="https://flagcdn.com/w40/it.png" className="w-5" alt="Italy Flag" />
                        Universités Publiques Italiennes 2026
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-5xl md:text-8xl font-black text-white tracking-tighter leading-[0.85] mb-8"
                    >
                        LISTE DES <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200 italic uppercase">
                            ADMISSIONS.
                        </span>
                    </motion.h1>

                    <p className="text-xl text-slate-400 max-w-2xl mx-auto font-medium leading-relaxed">
                        Consultez en temps réel les universités ouvertes, les frais d'admission et les conditions requises pour votre projet d'études en Italie.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="max-w-7xl mx-auto px-4 -mt-16 relative z-20">
                {/* Stats & Filters */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
                    <div className="lg:col-span-1 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                            <GraduationCap className="w-6 h-6" />
                        </div>
                        <div>
                            <div className="text-2xl font-black text-slate-900 leading-none">{stats.total}</div>
                            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">Établissements</div>
                        </div>
                    </div>
                    <div className="lg:col-span-3 bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 flex flex-col md:flex-row items-center gap-6">
                        <div className="relative flex-1 w-full">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                            <input
                                type="text"
                                placeholder="Rechercher une université (Milan, Rome, Turin...)"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-2xl py-4 pl-12 pr-6 text-sm focus:ring-4 focus:ring-amber-400/10 transition-all font-medium"
                            />
                        </div>
                        <div className="flex bg-slate-50 p-1.5 rounded-2xl shrink-0">
                            {[
                                { id: 'tous', label: 'Tous' },
                                { id: 'ouvert', label: 'Ouverts' },
                                { id: 'ferme', label: 'Fermés' }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setStatusFilter(tab.id)}
                                    className={`px-6 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                                        statusFilter === tab.id
                                            ? 'bg-white text-slate-900 shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                    }`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Desktop Table View */}
                <div className="bg-white rounded-[3rem] shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden hidden md:block">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                    <th className="px-10 py-6">Université</th>
                                    <th className="px-10 py-6">Frais & Conditions</th>
                                    <th className="px-10 py-6">Deadline</th>
                                    <th className="px-10 py-6">Statut</th>
                                    <th className="px-10 py-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {isLoading ? (
                                    <tr>
                                        <td colSpan={5} className="py-32 text-center">
                                            <Loader2 className="w-12 h-12 animate-spin text-amber-500 mx-auto mb-4" />
                                            <p className="text-slate-400 font-black uppercase text-xs tracking-[0.2em]">Synchronisation avec Supabase...</p>
                                        </td>
                                    </tr>
                                ) : filteredUnis.map((uni, i) => (
                                    <motion.tr
                                        key={uni.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className="hover:bg-slate-50/50 transition-colors group"
                                    >
                                        <td className="px-10 py-8">
                                            <div className="flex items-center gap-4">
                                                <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400 shadow-lg shadow-slate-900/10 group-hover:scale-110 transition-transform">
                                                    <GraduationCap className="w-6 h-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-black text-slate-900 text-lg tracking-tight leading-tight mb-1">{uni.name}</h3>
                                                    <div className="flex gap-4">
                                                        {uni.application_link && (
                                                            <a href={uni.application_link} target="_blank" className="text-[10px] font-black text-sky-500 hover:text-sky-600 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                                                                <Globe2 className="w-3 h-3" /> Site Officiel
                                                            </a>
                                                        )}
                                                        {uni.tutorial_link && (
                                                            <a href={uni.tutorial_link} target="_blank" className="text-[10px] font-black text-red-500 hover:text-red-600 uppercase tracking-widest flex items-center gap-1.5 transition-colors">
                                                                <Youtube className="w-3 h-3" /> Tutoriel
                                                            </a>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="space-y-2">
                                                <div className="flex items-center gap-2 text-sm font-black text-slate-700">
                                                    <Euro className="w-4 h-4 text-emerald-500" />
                                                    {uni.admission_fee}
                                                </div>
                                                <div className="flex flex-wrap gap-2">
                                                    {uni.english_requirements && (
                                                        <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-md text-[9px] font-black uppercase border border-indigo-100">
                                                            {uni.english_requirements}
                                                        </span>
                                                    )}
                                                    {uni.cgpa_requirement && (
                                                        <span className="px-2 py-0.5 bg-slate-100 text-slate-500 rounded-md text-[9px] font-black uppercase border border-slate-200">
                                                            Min {uni.cgpa_requirement}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <div className="flex flex-col">
                                                <span className="text-xs font-black text-slate-900">
                                                    {uni.deadline ? new Date(uni.deadline).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' }) : 'À venir'}
                                                </span>
                                                <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">Année 2025/26</span>
                                            </div>
                                        </td>
                                        <td className="px-10 py-8">
                                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border shadow-sm ${
                                                uni.status === 'ouvert'
                                                    ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                    : 'bg-rose-50 text-rose-600 border-rose-100'
                                            }`}>
                                                <div className={`w-1.5 h-1.5 rounded-full ${uni.status === 'ouvert' ? 'bg-emerald-500 animate-pulse' : 'bg-rose-500'}`} />
                                                {uni.status === 'ouvert' ? 'Ouvert' : 'Fermé'}
                                            </span>
                                        </td>
                                        <td className="px-10 py-8 text-right">
                                            <Link href="/auth/register">
                                                <button className="px-6 py-3 bg-slate-950 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 hover:text-slate-950 transition-all shadow-lg shadow-slate-900/10 flex items-center gap-2 ml-auto">
                                                    Postuler <ChevronRight className="w-4 h-4" />
                                                </button>
                                            </Link>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mobile Card View */}
                <div className="md:hidden space-y-6">
                    {filteredUnis.map((uni) => (
                        <div key={uni.id} className="bg-white p-8 rounded-[3rem] shadow-sm border border-slate-100 space-y-6">
                            <div className="flex items-start justify-between">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-2xl bg-slate-900 flex items-center justify-center text-amber-400">
                                        <GraduationCap className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="font-black text-slate-900 text-lg leading-tight">{uni.name}</h3>
                                        <span className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                            uni.status === 'ouvert'
                                                ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                : 'bg-rose-50 text-rose-600 border-rose-100'
                                        }`}>
                                            {uni.status === 'ouvert' ? 'Ouvert' : 'Fermé'}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Frais</div>
                                    <div className="text-sm font-black text-slate-900">{uni.admission_fee}</div>
                                </div>
                                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                                    <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Deadline</div>
                                    <div className="text-sm font-black text-slate-900">
                                        {uni.deadline ? new Date(uni.deadline).toLocaleDateString('fr-FR') : 'À venir'}
                                    </div>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                <span className="px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-[10px] font-black uppercase">
                                    {uni.english_requirements || 'Standard Info'}
                                </span>
                                <span className="px-3 py-1.5 bg-slate-100 text-slate-500 rounded-lg text-[10px] font-black uppercase">
                                    CGPA: {uni.cgpa_requirement || 'N/A'}
                                </span>
                            </div>

                            <div className="flex gap-3">
                                {uni.application_link && (
                                    <a href={uni.application_link} className="flex-1 py-4 bg-slate-100 text-slate-900 rounded-2xl font-black text-[10px] uppercase tracking-widest text-center">Site</a>
                                )}
                                <Link href="/auth/register" className="flex-[2]">
                                    <button className="w-full py-4 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl">Démarrer Dossier</button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {!isLoading && filteredUnis.length === 0 && (
                    <div className="py-32 text-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl border border-slate-100">
                            <Info className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-900 mb-2">Aucun résultat trouvé</h3>
                        <p className="text-slate-400 font-medium">Essayez d'ajuster vos filtres ou votre recherche.</p>
                        <button
                            onClick={() => { setSearchTerm(""); setStatusFilter("tous"); }}
                            className="mt-8 text-amber-600 font-black uppercase text-[10px] tracking-widest hover:underline"
                        >
                            Réinitialiser tout
                        </button>
                    </div>
                )}
            </section>

            {/* Bottom Help Section */}
            <section className="py-32 px-4">
                <div className="max-w-5xl mx-auto rounded-[4rem] bg-gradient-to-br from-indigo-600 to-blue-700 p-12 md:p-20 text-white relative overflow-hidden text-center">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full pointer-events-none" />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-8 leading-tight">
                            Besoin d'aide pour <br />
                            <span className="text-amber-400 italic">votre admission ?</span>
                        </h2>
                        <p className="text-blue-50 text-lg font-medium mb-12 max-w-2xl mx-auto opacity-80 leading-relaxed">
                            Notre équipe d'experts à Béjaïa vous accompagne dans toutes les démarches : choix des universités, préparation du dossier, bourses DSU et visa.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6">
                            <Link href="/contact">
                                <button className="px-10 py-5 bg-white text-blue-700 rounded-3xl font-black text-sm uppercase tracking-widest hover:bg-amber-400 hover:text-slate-950 transition-all shadow-2xl flex items-center gap-3">
                                    Parler à un Expert <ArrowRight className="w-5 h-5" />
                                </button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}
