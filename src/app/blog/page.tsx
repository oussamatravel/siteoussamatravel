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
import { createClient } from "@/lib/supabase/client";

export default function BlogPage() {
    const [mounted, setMounted] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [articles, setArticles] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [activeCategory, setActiveCategory] = useState("Tous");

    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        fetchArticles();
    }, []);

    const fetchArticles = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) {
            const formatted = (data || []).map(post => ({
                id: post.id,
                title: post.title,
                excerpt: post.excerpt,
                category: post.category,
                date: new Date(post.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
                author: "Expert Oussama Travel",
                readTime: "5 min",
                image: post.image_url || "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=800&auto=format&fit=crop",
                tag: post.category
            }));
            setArticles(formatted);
        }
        setIsLoading(false);
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            article.tag.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = activeCategory === "Tous" || article.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-slate-50 font-sans pt-48 pb-20">
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
                        {["Tous", "Immigration", "Études", "Tourisme", "Conseils"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`px-6 py-3 border rounded-full font-bold text-sm transition-all whitespace-nowrap shadow-sm ${activeCategory === cat
                                        ? "bg-sky-500 text-white border-sky-500 shadow-sky-200"
                                        : "bg-white text-slate-600 border-slate-200 hover:border-sky-500 hover:text-sky-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Articles Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {isLoading ? (
                        [1, 2, 3].map((n) => (
                            <div key={n} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm animate-pulse h-[400px]">
                                <div className="bg-slate-100 h-48 rounded-2xl mb-6"></div>
                                <div className="bg-slate-100 h-6 w-3/4 rounded mb-4"></div>
                                <div className="bg-slate-100 h-4 w-full rounded mb-2"></div>
                                <div className="bg-slate-100 h-4 w-1/2 rounded"></div>
                            </div>
                        ))
                    ) : filteredArticles.map((article, i) => (
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

                    {!isLoading && filteredArticles.length === 0 && (
                        <div className="col-span-full text-center py-20 bg-white border-2 border-dashed border-slate-100 rounded-[3rem]">
                            <p className="text-slate-400 font-bold">Aucun article trouvé pour cette recherche.</p>
                        </div>
                    )}
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
