"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    Plus, Search, Edit, Trash2, Image as ImageIcon, FileText,
    Eye, Save, X, Loader2, Bold, Italic, List, Heading2,
    Heading3, Link2, Quote, AlignLeft, Upload, CheckCircle2, Tag
} from "lucide-react";
import { useState, useEffect, useRef, useCallback } from "react";
import { createClient } from "@/lib/supabase/client";

const CATEGORIES = ["Immigration", "Études", "Tourisme", "Conseils", "Visa", "Actualités"];

// ---------- Toolbar Button ----------
function ToolbarBtn({ icon, label, onClick, active }: { icon: React.ReactNode; label: string; onClick: () => void; active?: boolean }) {
    return (
        <button
            type="button"
            title={label}
            onClick={onClick}
            className={`p-2 rounded-lg transition-all text-sm font-bold ${active ? "bg-sky-100 text-sky-600" : "hover:bg-slate-100 text-slate-600"}`}
        >
            {icon}
        </button>
    );
}

// ---------- Simple Rich Text Editor ----------
function RichEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
    const editorRef = useRef<HTMLDivElement>(null);
    const [activeFormats, setActiveFormats] = useState<string[]>([]);

    const exec = (cmd: string, val?: string) => {
        document.execCommand(cmd, false, val);
        editorRef.current?.focus();
        updateActive();
    };

    const updateActive = () => {
        const formats = ["bold", "italic", "insertUnorderedList", "insertOrderedList"];
        setActiveFormats(formats.filter(f => document.queryCommandState(f)));
    };

    const insertBlock = (tag: string, placeholder: string) => {
        const sel = window.getSelection();
        const node = document.createElement(tag);
        node.textContent = placeholder;
        if (sel && sel.rangeCount > 0) {
            const range = sel.getRangeAt(0);
            range.deleteContents();
            range.insertNode(node);
            range.setStartAfter(node);
            sel.removeAllRanges();
            sel.addRange(range);
        } else {
            editorRef.current?.appendChild(node);
        }
        syncContent();
    };

    const syncContent = () => {
        if (editorRef.current) onChange(editorRef.current.innerHTML);
    };

    useEffect(() => {
        if (editorRef.current && editorRef.current.innerHTML !== value) {
            editorRef.current.innerHTML = value;
        }
    }, []); // only on mount

    return (
        <div className="rounded-2xl border border-slate-200 overflow-hidden">
            {/* Toolbar */}
            <div className="flex flex-wrap gap-1 p-3 bg-slate-50 border-b border-slate-200">
                <ToolbarBtn icon={<Bold className="w-4 h-4" />} label="Gras (Ctrl+B)" onClick={() => exec("bold")} active={activeFormats.includes("bold")} />
                <ToolbarBtn icon={<Italic className="w-4 h-4" />} label="Italique (Ctrl+I)" onClick={() => exec("italic")} active={activeFormats.includes("italic")} />
                <div className="w-px h-7 bg-slate-200 mx-1 self-center" />
                <ToolbarBtn icon={<Heading2 className="w-4 h-4" />} label="Titre H2" onClick={() => exec("formatBlock", "h2")} />
                <ToolbarBtn icon={<Heading3 className="w-4 h-4" />} label="Titre H3" onClick={() => exec("formatBlock", "h3")} />
                <ToolbarBtn icon={<AlignLeft className="w-4 h-4" />} label="Paragraphe" onClick={() => exec("formatBlock", "p")} />
                <div className="w-px h-7 bg-slate-200 mx-1 self-center" />
                <ToolbarBtn icon={<List className="w-4 h-4" />} label="Liste à puces" onClick={() => exec("insertUnorderedList")} />
                <ToolbarBtn icon={<span className="text-xs font-black">1.</span>} label="Liste numérotée" onClick={() => exec("insertOrderedList")} />
                <div className="w-px h-7 bg-slate-200 mx-1 self-center" />
                <ToolbarBtn
                    icon={<Quote className="w-4 h-4" />}
                    label="Citation"
                    onClick={() => exec("formatBlock", "blockquote")}
                />
                <ToolbarBtn
                    icon={<Link2 className="w-4 h-4" />}
                    label="Lien"
                    onClick={() => {
                        const url = prompt("URL du lien :");
                        if (url) exec("createLink", url);
                    }}
                />
            </div>
            {/* Editable area */}
            <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={syncContent}
                onKeyUp={updateActive}
                onMouseUp={updateActive}
                className="min-h-[280px] p-5 text-slate-800 text-sm leading-relaxed focus:outline-none prose prose-slate max-w-none
                    [&_h2]:text-xl [&_h2]:font-black [&_h2]:mt-4 [&_h2]:mb-2
                    [&_h3]:text-lg [&_h3]:font-bold [&_h3]:mt-3 [&_h3]:mb-1
                    [&_p]:mb-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mb-3
                    [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mb-3
                    [&_blockquote]:border-l-4 [&_blockquote]:border-sky-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-500 [&_blockquote]:my-3
                    [&_a]:text-sky-600 [&_a]:underline"
                style={{ minHeight: 280 }}
            />
        </div>
    );
}

// ---------- IMAGE UPLOAD ----------
function ImageUploader({ value, onChange }: { value: string; onChange: (url: string) => void }) {
    const [uploading, setUploading] = useState(false);
    const [preview, setPreview] = useState(value);
    const fileRef = useRef<HTMLInputElement>(null);
    const supabase = createClient();

    const handleFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        setUploading(true);
        const ext = file.name.split(".").pop();
        const path = `blog/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error } = await supabase.storage.from("media").upload(path, file, { upsert: true });
        if (!error) {
            const { data } = supabase.storage.from("media").getPublicUrl(path);
            setPreview(data.publicUrl);
            onChange(data.publicUrl);
        } else {
            // fallback: use object URL for preview and store URL field manually
            const localUrl = URL.createObjectURL(file);
            setPreview(localUrl);
            onChange(localUrl);
            alert("Upload Supabase échoué (vérifiez votre bucket 'media'). L'image est prévisualisée localement.");
        }
        setUploading(false);
    };

    return (
        <div className="space-y-3">
            <div
                onClick={() => fileRef.current?.click()}
                className="relative h-40 rounded-2xl border-2 border-dashed border-slate-200 hover:border-sky-300 transition-colors cursor-pointer overflow-hidden group"
            >
                {preview ? (
                    <>
                        <img src={preview} alt="preview" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-slate-950/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <span className="text-white font-bold text-sm flex items-center gap-2"><Upload className="w-4 h-4" /> Changer l'image</span>
                        </div>
                    </>
                ) : (
                    <div className="flex flex-col items-center justify-center h-full text-slate-400 gap-2">
                        {uploading ? <Loader2 className="w-8 h-8 animate-spin text-sky-500" /> : <ImageIcon className="w-8 h-8" />}
                        <span className="text-sm font-medium">{uploading ? "Upload en cours..." : "Cliquez pour uploader une image"}</span>
                        <span className="text-xs text-slate-300">JPG, PNG, WEBP · max 5 MB</span>
                    </div>
                )}
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
            <div className="flex items-center gap-2">
                <div className="h-px flex-1 bg-slate-100" />
                <span className="text-xs text-slate-400 font-bold">OU</span>
                <div className="h-px flex-1 bg-slate-100" />
            </div>
            <input
                type="url"
                placeholder="Coller une URL d'image (https://...)"
                value={value.startsWith("blob:") ? "" : value}
                onChange={(e) => { setPreview(e.target.value); onChange(e.target.value); }}
                className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all"
            />
        </div>
    );
}

// ===================== MAIN PAGE =====================
export default function AdminBlogPage() {
    const [posts, setPosts] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterCat, setFilterCat] = useState("Tous");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPost, setEditingPost] = useState<any>(null);
    const [tab, setTab] = useState<"edit" | "preview">("edit");
    const [saved, setSaved] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);
    const [isCheckingRole, setIsCheckingRole] = useState(true);
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "Immigration",
        image_url: "",
        tags: "" as string,
        published: true,
    });

    const supabase = createClient();

    useEffect(() => {
        const checkRoleAndFetchData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data } = await supabase.from('profiles').select('role').eq('id', user.id).single();
                if (data) setUserRole(data.role);
            }
            setIsCheckingRole(false);

            if (userRole !== 'employee') {
                fetchPosts();
            }
        };

        checkRoleAndFetchData();
    }, [userRole]);

    const fetchPosts = async () => {
        setIsLoading(true);
        const { data, error } = await supabase.from("blog_posts").select("*").order("created_at", { ascending: false });
        if (!error) setPosts(data || []);
        setIsLoading(false);
    };

    const resetForm = () => setFormData({ title: "", excerpt: "", content: "", category: "Immigration", image_url: "", tags: "", published: true });

    const openNew = () => { setEditingPost(null); resetForm(); setTab("edit"); setIsModalOpen(true); };
    const openEdit = (post: any) => {
        setEditingPost(post);
        setFormData({ title: post.title, excerpt: post.excerpt || "", content: post.content || "", category: post.category, image_url: post.image_url || "", tags: (post.tags || []).join(", "), published: post.published !== false });
        setTab("edit");
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsSaving(false); return; }

        const tagsArr = formData.tags.split(",").map(t => t.trim()).filter(Boolean);
        const slug = formData.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

        const postData = {
            title: formData.title,
            excerpt: formData.excerpt,
            content: formData.content,
            category: formData.category,
            image_url: formData.image_url,
            tags: tagsArr,
            published: formData.published,
            author_id: user.id,
            slug,
            updated_at: new Date().toISOString(),
        };

        let error;
        if (editingPost) {
            ({ error } = await supabase.from("blog_posts").update(postData).eq("id", editingPost.id));
        } else {
            ({ error } = await supabase.from("blog_posts").insert([postData]));
        }

        if (!error) {
            setSaved(true);
            setTimeout(() => { setSaved(false); setIsModalOpen(false); setEditingPost(null); resetForm(); fetchPosts(); }, 1200);
        } else {
            alert("Erreur : " + error.message);
        }
        setIsSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Supprimer cet article définitivement ?")) return;
        await supabase.from("blog_posts").delete().eq("id", id);
        fetchPosts();
    };

    const filtered = posts.filter(p => {
        const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) || (p.category || "").toLowerCase().includes(searchTerm.toLowerCase());
        const matchCat = filterCat === "Tous" || p.category === filterCat;
        return matchSearch && matchCat;
    });

    if (isCheckingRole) return null;

    if (userRole === 'employee') {
        return (
            <div className="max-w-7xl mx-auto py-32 text-center space-y-4">
                <ShieldCheck className="w-20 h-20 text-rose-500 mx-auto mb-6" />
                <h1 className="text-3xl font-black text-slate-900 tracking-tight">Accès Restreint</h1>
                <p className="text-slate-500 font-medium max-w-md mx-auto">La rédaction et la publication d'articles de blog sont réservées à la direction.</p>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8 font-sans pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestion du Blog</h1>
                    <p className="text-slate-500 font-medium">{posts.length} article{posts.length > 1 ? "s" : ""} publié{posts.length > 1 ? "s" : ""}</p>
                </div>
                <button onClick={openNew} className="flex items-center gap-2 px-6 py-3 bg-slate-950 text-white font-black rounded-2xl hover:opacity-90 transition-all shadow-xl active:scale-95">
                    <Plus className="w-5 h-5" />
                    Nouvel Article
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-slate-50 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="relative w-full md:max-w-sm">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input type="text" placeholder="Rechercher..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all" />
                    </div>
                    <div className="flex gap-2 flex-wrap">
                        {["Tous", ...CATEGORIES].map(c => (
                            <button key={c} onClick={() => setFilterCat(c)}
                                className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest transition-all ${filterCat === c ? "bg-slate-950 text-white" : "bg-slate-100 text-slate-500 hover:bg-slate-200"}`}>
                                {c}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">
                                <th className="px-8 py-4">Article</th>
                                <th className="px-8 py-4">Catégorie</th>
                                <th className="px-8 py-4">Statut</th>
                                <th className="px-8 py-4">Date</th>
                                <th className="px-8 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {isLoading ? (
                                <tr><td colSpan={5} className="py-20 text-center">
                                    <Loader2 className="w-8 h-8 animate-spin text-sky-500 mx-auto mb-3" />
                                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Chargement...</p>
                                </td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={5} className="py-16 text-center">
                                    <FileText className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                                    <p className="text-slate-400 font-bold text-sm">Aucun article trouvé</p>
                                    <button onClick={openNew} className="mt-4 text-sky-500 font-black text-sm hover:underline">+ Créer le premier article</button>
                                </td></tr>
                            ) : filtered.map((post) => (
                                <tr key={post.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-14 h-10 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                                                {post.image_url ? <img src={post.image_url} className="w-full h-full object-cover" alt="" /> : <ImageIcon className="w-5 h-5 text-slate-300 mx-auto mt-2.5" />}
                                            </div>
                                            <div>
                                                <div className="font-bold text-slate-900 text-sm mb-0.5 line-clamp-1">{post.title}</div>
                                                <div className="text-[10px] text-slate-400 line-clamp-1">{(post.excerpt || "").substring(0, 60)}...</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className="px-3 py-1 bg-sky-50 text-sky-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-sky-100">{post.category}</span>
                                    </td>
                                    <td className="px-8 py-5">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border ${post.published !== false ? "bg-emerald-50 text-emerald-600 border-emerald-100" : "bg-amber-50 text-amber-600 border-amber-100"}`}>
                                            {post.published !== false ? "Publié" : "Brouillon"}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-xs font-bold text-slate-400">{new Date(post.created_at).toLocaleDateString("fr-FR")}</td>
                                    <td className="px-8 py-5 text-right">
                                        <div className="flex items-center justify-end gap-1">
                                            <button onClick={() => openEdit(post)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-sky-600 transition-all border border-transparent hover:border-slate-100 shadow-sm" title="Modifier">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                            <button onClick={() => handleDelete(post.id)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-red-500 transition-all border border-transparent hover:border-slate-100 shadow-sm" title="Supprimer">
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

            {/* ====== MODAL ====== */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-12 bg-slate-950/50 backdrop-blur-sm overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-4xl shadow-2xl mb-8"
                        >
                            <form onSubmit={handleSave}>
                                {/* Modal Header */}
                                <div className="p-8 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white rounded-t-[2.5rem] z-10">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-sky-50 flex items-center justify-center text-sky-500">
                                            <FileText className="w-5 h-5" />
                                        </div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tight">
                                            {editingPost ? "Modifier l'article" : "Nouvel Article"}
                                        </h2>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        {/* Tabs */}
                                        <div className="flex bg-slate-100 rounded-xl p-1">
                                            <button type="button" onClick={() => setTab("edit")} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${tab === "edit" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}>
                                                <Edit className="w-3.5 h-3.5 inline mr-1" />Éditer
                                            </button>
                                            <button type="button" onClick={() => setTab("preview")} className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${tab === "preview" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}>
                                                <Eye className="w-3.5 h-3.5 inline mr-1" />Aperçu
                                            </button>
                                        </div>
                                        <button type="button" onClick={() => setIsModalOpen(false)} className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-all">
                                            <X className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                {/* Edit Mode */}
                                {tab === "edit" && (
                                    <div className="p-8 space-y-6">
                                        {/* Title */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Titre de l'article *</label>
                                            <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })}
                                                type="text" placeholder="Ex: Comment obtenir un visa Canada en 2025..."
                                                className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl font-bold text-lg focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all" />
                                        </div>

                                        {/* Image */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Image de couverture</label>
                                            <ImageUploader value={formData.image_url} onChange={url => setFormData({ ...formData, image_url: url })} />
                                        </div>

                                        {/* Category + Published */}
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Catégorie</label>
                                                <select value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })}
                                                    className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl font-bold text-sm focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all">
                                                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                                </select>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1"><Tag className="w-3 h-3" />Tags (séparés par virgule)</label>
                                                <input value={formData.tags} onChange={e => setFormData({ ...formData, tags: e.target.value })}
                                                    placeholder="visa, canada, étudiant..." className="w-full px-4 py-3 bg-slate-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all" />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Statut</label>
                                                <div className="flex gap-2 pt-1">
                                                    <button type="button" onClick={() => setFormData({ ...formData, published: true })}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${formData.published ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                        ✓ Publié
                                                    </button>
                                                    <button type="button" onClick={() => setFormData({ ...formData, published: false })}
                                                        className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${!formData.published ? "bg-amber-400 text-white" : "bg-slate-100 text-slate-500"}`}>
                                                        ✎ Brouillon
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Excerpt */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Résumé court (affiché sur la carte) *</label>
                                            <textarea required value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })}
                                                rows={2} placeholder="Un court résumé de l'article visible sur la page blog..."
                                                className="w-full px-5 py-3 bg-slate-50 border-transparent rounded-xl text-sm font-medium focus:bg-white focus:ring-2 focus:ring-sky-500/20 transition-all resize-none" />
                                        </div>

                                        {/* Rich Content Editor */}
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contenu de l'article *</label>
                                            <RichEditor value={formData.content} onChange={v => setFormData(f => ({ ...f, content: v }))} />
                                            <p className="text-[10px] text-slate-400 pl-1">Utilisez la barre d'outils pour formater votre texte (gras, titres, listes...)</p>
                                        </div>
                                    </div>
                                )}

                                {/* Preview Mode */}
                                {tab === "preview" && (
                                    <div className="p-8">
                                        {formData.image_url && (
                                            <div className="h-64 rounded-2xl overflow-hidden mb-8">
                                                <img src={formData.image_url} alt="" className="w-full h-full object-cover" />
                                            </div>
                                        )}
                                        <div className="flex items-center gap-3 mb-4">
                                            <span className="px-3 py-1 bg-sky-50 text-sky-600 text-xs font-black uppercase tracking-widest rounded-full border border-sky-100">{formData.category}</span>
                                            {formData.tags && formData.tags.split(",").filter(Boolean).map(t => (
                                                <span key={t} className="px-3 py-1 bg-slate-100 text-slate-500 text-xs font-bold rounded-full">{t.trim()}</span>
                                            ))}
                                        </div>
                                        <h1 className="text-3xl font-black text-slate-900 mb-4">{formData.title || "Titre de l'article"}</h1>
                                        {formData.excerpt && <p className="text-lg text-slate-500 mb-8 font-medium leading-relaxed">{formData.excerpt}</p>}
                                        <hr className="border-slate-100 mb-8" />
                                        <div
                                            className="prose prose-slate max-w-none text-slate-700 leading-relaxed
                                                [&_h2]:text-2xl [&_h2]:font-black [&_h2]:mt-8 [&_h2]:mb-3
                                                [&_h3]:text-xl [&_h3]:font-bold [&_h3]:mt-6 [&_h3]:mb-2
                                                [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-4
                                                [&_ol]:list-decimal [&_ol]:pl-6 [&_ol]:mb-4
                                                [&_blockquote]:border-l-4 [&_blockquote]:border-sky-300 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-slate-400
                                                [&_a]:text-sky-500 [&_a]:underline"
                                            dangerouslySetInnerHTML={{ __html: formData.content || "<p class='text-slate-400 italic'>Votre contenu apparaîtra ici...</p>" }}
                                        />
                                    </div>
                                )}

                                {/* Modal Footer */}
                                <div className="p-8 bg-slate-50/50 flex gap-3 rounded-b-[2.5rem] border-t border-slate-100">
                                    <button type="button" onClick={() => setIsModalOpen(false)} className="px-6 py-3 rounded-2xl font-black text-slate-600 hover:bg-slate-100 transition-all text-sm">
                                        Annuler
                                    </button>
                                    <button type="submit" disabled={isSaving || saved}
                                        className={`flex-1 py-4 font-black rounded-2xl flex items-center justify-center gap-2 transition-all shadow-xl text-sm disabled:opacity-70 ${saved ? "bg-emerald-500 text-white" : "bg-slate-950 text-white hover:opacity-90"}`}>
                                        {saved ? <><CheckCircle2 className="w-5 h-5" /> Enregistré !</> : isSaving ? <><Loader2 className="w-5 h-5 animate-spin" /> Enregistrement...</> : <><Save className="w-5 h-5" />{editingPost ? "Enregistrer les modifications" : "Publier l'article"}</>}
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
