"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Image as ImageIcon,
    FileText,
    Eye,
    Save,
    X,
    Loader2
} from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "Immigration",
        image_url: ""
    });

    const supabase = createClient();

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase
            .from('blog_posts')
            .select('*')
            .order('created_at', { ascending: false });

        if (!error) setPosts(data || []);
        setIsLoading(false);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const postData = {
            ...formData,
            author_id: user.id,
            updated_at: new Date().toISOString()
        };

        let error;
        if (editingPost) {
            const { error: err } = await supabase
                .from('blog_posts')
                .update(postData)
                .eq('id', editingPost.id);
            error = err;
        } else {
            const { error: err } = await supabase
                .from('blog_posts')
                .insert([postData]);
            error = err;
        }

        if (!error) {
            setIsModalOpen(false);
            setEditingPost(null);
            setFormData({ title: "", excerpt: "", content: "", category: "Immigration", image_url: "" });
            fetchPosts();
        } else {
            alert("Erreur lors de l'enregistrement: " + error.message);
        }
        setIsLoading(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cet article ?")) return;
        const { error } = await supabase.from('blog_posts').delete().eq('id', id);
        if (!error) fetchPosts();
    };

    const openEdit = (post: any) => {
        setEditingPost(post);
        setFormData({
            title: post.title,
            excerpt: post.excerpt,
            content: post.content,
            category: post.category,
            image_url: post.image_url
        });
        setIsModalOpen(true);
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-20">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion du Blog</h1>
                    <p className="text-slate-500 font-medium">Publiez des guides et actualités pour vos clients.</p>
                </div>
                <button
                    onClick={() => { setEditingPost(null); setFormData({ title: "", excerpt: "", content: "", category: "Immigration", image_url: "" }); setIsModalOpen(true); }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl active:scale-95"
                >
                    <Plus className="w-5 h-5" />
                    Nouvel Article
                </button>
            </div>

            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Rechercher un article..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-12 pr-6 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all text-sm font-medium"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th className="px-8 py-5">Article</th>
                                <th className="px-8 py-5">Catégorie</th>
                                <th className="px-8 py-5">Date</th>
                                <th className="px-8 py-5 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-sky-500 mx-auto mb-4" />
                                        <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Chargement des articles...</p>
                                    </td>
                                </tr>
                            ) : filteredPosts.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors group">
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                                {post.image_url ? (
                                                    <img src={post.image_url} className="w-full h-full object-cover" alt="" />
                                                ) : (
                                                    <ImageIcon className="w-6 h-6 text-slate-300 mx-auto mt-3" />
                                                )}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-1">{post.title}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{post.excerpt.substring(0, 50)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-100">
                                            {post.category}
                                        </span>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="text-xs font-bold text-slate-500">{new Date(post.created_at).toLocaleDateString()}</div>
                                    </td>
                                    <td className="px-8 py-6 text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <button onClick={() => openEdit(post)} className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-sky-600 shadow-sm border border-transparent hover:border-slate-100">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-white rounded-lg transition-all text-slate-400 hover:text-red-600 shadow-sm border border-transparent hover:border-slate-100">
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/40 backdrop-blur-sm">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-2xl overflow-hidden shadow-2xl"
                        >
                            <form onSubmit={handleSave} className="flex flex-col h-[85vh] md:h-auto">
                                <div className="p-8 border-b border-slate-50 flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                            {editingPost ? "Modifier l'article" : "Nouvel Article"}
                                        </h2>
                                    </div>
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-50 rounded-full transition-all text-slate-400">
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                <div className="p-8 space-y-6 overflow-y-auto max-h-[60vh]">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Titre de l'article</label>
                                        <input
                                            required
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                            type="text"
                                            placeholder="Ex: Nouveau changement visa Canada..."
                                            className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all font-bold"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Catégorie</label>
                                            <select
                                                value={formData.category}
                                                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                                className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all font-bold"
                                            >
                                                <option>Immigration</option>
                                                <option>Études</option>
                                                <option>Tourisme</option>
                                                <option>Conseils</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">URL Image (Unsplash, etc.)</label>
                                            <input
                                                value={formData.image_url}
                                                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                                type="url"
                                                placeholder="https://images.unsplash..."
                                                className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all font-bold"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Court extrait (EXCERPT)</label>
                                        <textarea
                                            required
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                            rows={2}
                                            placeholder="Résumé de l'article..."
                                            className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Contenu complet (Markdown possible)</label>
                                        <textarea
                                            required
                                            value={formData.content}
                                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                            rows={8}
                                            placeholder="Écrivez votre article ici..."
                                            className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>

                                <div className="p-8 bg-slate-50/50 flex gap-4">
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className="flex-1 py-4 bg-slate-950 text-white font-black rounded-2xl flex items-center justify-center gap-2 hover:opacity-90 transition-all shadow-xl shadow-slate-200 disabled:opacity-50"
                                    >
                                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                        {editingPost ? "Enregistrer les modifications" : "Publier l'article"}
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
