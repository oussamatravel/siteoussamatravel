"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
    Calendar,
    User,
    Clock,
    ChevronLeft,
    Share2,
    CheckCircle2,
    BookOpen,
    Eye,
    MessageCircle
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function BlogPostDetail() {
    const params = useParams();
    const id = params.id;
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Simulated article data (normally would fetch based on ID)
    const articles = [
        {
            id: 1,
            title: "Nouvelles Directives Visa Études Canada 2024",
            content: `
                <p>Le gouvernement canadien a récemment annoncé des changements majeurs concernant les étudiants internationaux. Ces nouvelles directives visent à préserver l'intégrité du système tout en garantissant une expérience de qualité pour les étudiants.</p>
                
                <h2>1. Plafond des permis d'études</h2>
                <p>Pour la première fois, le Canada instaure un plafond sur le nombre de nouvelles demandes de permis d'études. Cette mesure temporaire de deux ans réduira d'environ 35% le nombre de nouveaux étudiants admis par rapport à 2023.</p>
                
                <h2>2. Preuve de fonds augmentée</h2>
                <p>Le montant de la preuve de fonds nécessaire est passé de 10 000 $ à 20 635 $. Cela s'ajoute aux frais de scolarité de la première année et aux frais de voyage. Cette mise à jour est nécessaire pour refléter le coût de la vie actuel au Canada.</p>
                
                <h2>3. Lettre d'attestation provinciale</h2>
                <p>Désormais, presque chaque demande de permis d'études devra être accompagnée d'une lettre d'attestation de la province ou du territoire où l'étudiant compte s'installer.</p>
                
                <blockquote>
                    "Ces changements sont importants pour que les étudiants arrivent avec les ressources nécessaires pour réussir leur parcours académique au Canada."
                </blockquote>

                <p>Chez Oussama Travel, nous aidons nos clients à naviguer dans ces nouvelles règles en préparant des dossiers financiers solides et en sélectionnant les établissements les mieux adaptés à ces nouveaux critères.</p>
            `,
            category: "Immigration",
            date: "15 Janvier 2024",
            author: "Expert Oussama Travel",
            authorRole: "Consultant Principal",
            readTime: "5 min",
            views: "2.4k",
            image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop",
            tag: "Canada"
        },
        {
            id: 2,
            title: "Top 5 des Destinations sans Visa pour les Algériens",
            content: `
                <p>Voyager avec un passeport algérien peut sembler restrictif, mais il existe des joyaux accessibles sans trop de complications administratives. Voici notre sélection pour vos vacances 2024.</p>
                
                <h2>1. La Malaisie : Un paradis tropical</h2>
                <p>Sans visa pour 90 jours, c'est la destination idéale qui mélange gratte-ciels futuristes et jungle sauvage. Kuala Lumpur et les îles de Langkawi vous attendent.</p>
                
                <h2>2. La Turquie : L'e-Visa simplifié</h2>
                <p>Bien que nécessitant un e-visa pour certains cas, la procédure est instantanée pour beaucoup. C'est le carrefour idéal entre culture, shopping et gastronomie.</p>
                
                <h2>3. La Tunisie : Le voisin accueillant</h2>
                <p>Accessibles par route ou par avion, les plages de Hammamet et le charme de Sidi Bou Saïd restent des valeurs sûres pour un été réussi.</p>
                
                <h2>4. Hong Kong : L'Asie sans limites</h2>
                <p>Peu d'Algériens le savent, mais Hong Kong est accessible avec une simple autorisation de voyage en ligne, offrant une expérience urbaine inégalée.</p>
                
                <p>Oussama Travel propose des packs complets (vol + hôtel + touriste) pour toutes ces destinations afin que vous ne pensiez qu'à vos bagages.</p>
            `,
            category: "Tourisme",
            date: "10 Janvier 2024",
            author: "Conseiller Voyage",
            authorRole: "Chef de Produit",
            readTime: "4 min",
            views: "1.8k",
            image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=1200&auto=format&fit=crop",
            tag: "Voyages"
        }
    ];

    const article = articles.find(a => a.id === Number(id)) || articles[0];

    if (!mounted) return null;

    return (
        <div className="min-h-screen bg-white font-sans">
            {/* Header / Hero */}
            <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
                <img
                    src={article.image}
                    className="w-full h-full object-cover"
                    alt={article.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent"></div>

                <div className="absolute top-0 w-full p-8 flex justify-between items-center z-10">
                    <Link href="/blog">
                        <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                            <ChevronLeft className="w-6 h-6" />
                        </button>
                    </Link>
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-all">
                        <Share2 className="w-5 h-5" />
                    </button>
                </div>

                <div className="absolute bottom-0 w-full p-8 md:p-16 max-w-7xl mx-auto left-1/2 -translate-x-1/2">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <span className="px-4 py-2 bg-amber-400 text-slate-900 rounded-full text-[10px] font-black uppercase tracking-[0.2em]">
                            {article.category}
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white leading-tight tracking-tighter">
                            {article.title}
                        </h1>

                        <div className="flex flex-wrap items-center gap-8 text-white/70 font-bold text-xs uppercase tracking-widest pt-4">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-amber-400" />
                                {article.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock className="w-4 h-4 text-amber-400" />
                                {article.readTime} de lecture
                            </div>
                            <div className="flex items-center gap-2">
                                <Eye className="w-4 h-4 text-amber-400" />
                                {article.views} vues
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Content Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Left Side: Empty or Sidebar for large screens */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-32 flex flex-col gap-6 items-center">
                            <div className="w-px h-20 bg-slate-100 mb-4"></div>
                            <Share2 className="w-5 h-5 text-slate-300 hover:text-sky-500 cursor-pointer transition-colors" />
                            <MessageCircle className="w-5 h-5 text-slate-300 hover:text-sky-500 cursor-pointer transition-colors" />
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-7">
                        <div
                            className="prose prose-slate prose-xl max-w-none 
                            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
                            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium
                            prose-blockquote:border-l-4 prose-blockquote:border-amber-400 prose-blockquote:bg-slate-50 prose-blockquote:p-8 prose-blockquote:rounded-r-3xl prose-blockquote:italic prose-blockquote:font-bold
                            prose-strong:text-slate-900 prose-strong:font-black"
                            dangerouslySetInnerHTML={{ __html: article.content }}
                        />

                        {/* Author Card */}
                        <div className="mt-20 p-10 bg-slate-50 rounded-[3rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8">
                            <div className="w-24 h-24 rounded-full bg-slate-200 overflow-hidden flex-shrink-0">
                                <img src="https://i.pravatar.cc/100?u=oussamatravel" alt="Author" className="w-full h-full object-cover" />
                            </div>
                            <div className="space-y-2 text-center md:text-left">
                                <div className="text-[10px] font-black uppercase tracking-widest text-amber-500">Écrit par</div>
                                <h4 className="text-2xl font-black text-slate-900">{article.author}</h4>
                                <p className="text-slate-500 font-medium">{article.authorRole} chez Oussama Travel</p>
                            </div>
                            <div className="md:ml-auto">
                                <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl font-black text-xs uppercase tracking-widest hover:border-slate-900 transition-all transition-colors">
                                    Voir Profil
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar / CTA */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-32 space-y-8">
                            {/* Newsletter Premium */}
                            <div className="bg-slate-900 p-10 rounded-[3rem] text-white relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/20 blur-3xl rounded-full"></div>
                                <BookOpen className="w-10 h-10 text-sky-400 mb-6" />
                                <h3 className="text-2xl font-black mb-4 uppercase tracking-widest">Guide Gratuit</h3>
                                <p className="text-slate-400 font-medium mb-8 leading-relaxed">
                                    Téléchargez notre guide PDF gratuit "Réussir son projet Canada 2024" en vous abonnant.
                                </p>
                                <input
                                    type="email"
                                    placeholder="Votre email"
                                    className="w-full p-5 bg-white/5 border border-white/10 rounded-2xl mb-4 text-white font-medium focus:ring-2 focus:ring-sky-500 outline-none"
                                />
                                <button className="w-full py-5 bg-sky-500 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-sky-600 transition-colors shadow-xl shadow-sky-500/20">
                                    Obtenir mon guide
                                </button>
                            </div>

                            {/* Related Posts */}
                            <div className="space-y-6">
                                <h3 className="text-xl font-black text-slate-900 uppercase tracking-widest">Articles Liés</h3>
                                {articles.filter(a => a.id !== article.id).map(a => (
                                    <Link key={a.id} href={`/blog/${a.id}`} className="flex gap-4 group cursor-pointer">
                                        <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                                            <img src={a.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        </div>
                                        <div className="space-y-1 py-1">
                                            <div className="text-[8px] font-black uppercase tracking-widest text-amber-500">{a.tag}</div>
                                            <h4 className="text-sm font-black text-slate-900 line-clamp-2 leading-tight group-hover:text-amber-500 transition-colors">
                                                {a.title}
                                            </h4>
                                            <div className="text-[10px] font-bold text-slate-400 italic">{a.date}</div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
