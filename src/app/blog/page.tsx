"use client";

import { motion } from "framer-motion";
import {
    Calendar,
    User,
    ArrowRight,
    Search,
    Tag,
    Clock,
    ChevronRight
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogPage() {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        setMounted(true);
    }, []);

    const articles = [
        {
            id: 1,
            title: "Nouvelles Directives Visa Études Canada 2024",
            excerpt: "Tout ce qu'il faut savoir sur les changements récents concernant les permis d'études et les preuves de fonds.",
            category: "Immigration",
            date: "15 Janvier 2024",
            author: "Expert Oussama Travel",
            readTime: "5 min",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
            tag: "Canada"
        },
        {
            id: 2,
            title: "Top 5 des Destinations sans Visa pour les Algériens",
            excerpt: "Préparez vos prochaines vacances avec notre sélection de pays magnifiques accessibles facilement cet été.",
            category: "Tourisme",
            date: "10 Janvier 2024",
            author: "Conseiller Voyage",
            readTime: "4 min",
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=800&auto=format&fit=crop",
            tag: "Voyages"
        },
        {
            id: 3,
            title: "Réussir son Entretien Consulaire en 10 Étapes",
            excerpt: "Les secrets pour convaincre l'officier consulaire lors de votre demande de visa pour la France ou l'Espagne.",
            category: "Conseils",
            date: "05 Janvier 2024",
            author: "Oussama Travel Team",
            readTime: "8 min",
            image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=800&auto=format&fit=crop",
            tag: "Visa"
        },
        {
            id: 4,
            title: "Travailler à Dubaï : Le Guide Complet du Visa Travail",
            excerpt: "Découvrez les opportunités professionnelles aux Émirats Arabes Unis et comment obtenir votre résidence.",
            category: "Immigration",
            date: "02 Janvier 2024",
            author: "Expert Dubaï",
            readTime: "12 min",
            image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop",
            tag: "Dubaï"
        },
        {
            id: 5,
            title: "Bourses d'Études en Europe : Comment Postuler ?",
            excerpt: "Guide pratique pour dénicher les meilleures bourses et financer vos études supérieures en Europe.",
            category: "Études",
            date: "28 Décembre 2023",
            author: "Consultante Académique",
            readTime: "7 min",
            image: "https://images.unsplash.com/photo-1523050335392-93851179ae22?q=80&w=800&auto=format&fit=crop",
            tag: "Europe"
        }
    ];

    const filteredArticles = articles.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.tag.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-black text-slate-900 mb-6 tracking-tight"
                    >
                        Actualités & <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 to-blue-600">
                            Guides de Voyage
                        </span>
                    </motion.h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                        Restez informé des dernières lois d'immigration, procédures de visa et opportunités d'études à l'international.
                    </p>
                </div>

                {/* Search & Filter Bar */}
                <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un article..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-4 bg-white rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all shadow-sm font-medium"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 w-full md:w-auto">
                        {["Tous", "Immigration", "Études", "Tourisme"].map((cat) => (
                            <button
                                key={cat}
                                className="px-6 py-3 bg-white border border-slate-200 rounded-full font-bold text-sm text-slate-600 hover:border-sky-500 hover:text-sky-600 transition-all whitespace-nowrap shadow-sm"
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredArticles.map((article, i) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="bg-white rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full"
                        >
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={article.image}
                                    alt={article.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-sm border border-slate-100">
                                        {article.tag}
                                    </span>
                                </div>
                            </div>

                            <div className="p-8 flex flex-col flex-grow">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                        <Calendar className="w-4 h-4" />
                                        {article.date}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400">
                                        <Clock className="w-4 h-4" />
                                        {article.readTime}
                                    </div>
                                </div>

                                <h2 className="text-xl font-black text-slate-900 mb-4 group-hover:text-sky-600 transition-colors leading-snug">
                                    {article.title}
                                </h2>
                                <p className="text-slate-500 text-sm leading-relaxed mb-8 flex-grow">
                                    {article.excerpt}
                                </p>

                                <div className="pt-6 border-t border-slate-100 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <span className="text-xs font-bold text-slate-700">{article.author}</span>
                                    </div>
                                    <Link href={`/blog/${article.id}`} className="text-sky-500 hover:text-sky-600">
                                        <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                                    </Link>
                                </div>
                            </div>
                        </motion.article>
                    ))}
                </div>

                {/* Newsletter Section */}
                <div className="mt-24 bg-slate-900 rounded-[3rem] p-10 md:p-20 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
                    <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
                                Ne manquez plus aucune <br /> mise à jour importante.
                            </h2>
                            <p className="text-slate-400 font-medium mb-0">
                                Rejoignez notre liste de diffusion pour recevoir les alertes de visa et les nouvelles opportunités directement par email.
                            </p>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <input
                                type="email"
                                placeholder="Votre adresse email"
                                className="flex-grow px-8 py-5 bg-white/5 border border-white/10 rounded-full text-white font-medium focus:outline-none focus:ring-2 focus:ring-sky-500/50 transition-all backdrop-blur-md"
                            />
                            <button className="px-10 py-5 bg-sky-500 text-white rounded-full font-black hover:bg-sky-600 shadow-xl shadow-sky-500/20 transition-all whitespace-nowrap">
                                S'abonner
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
