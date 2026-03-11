"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
    AlertCircle,
    Clock,
    FileCheck2,
    FileText,
    FolderOpen,
    Plane,
    PlusCircle,
    ArrowRight,
    CheckCircle2,
    X,
    GraduationCap,
    ShieldCheck,
    Globe2,
    Calendar,
    Send,
    Loader2,
    MessageSquare
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { createClient } from "@/lib/supabase/client";
import ApplicationChat from "@/components/ApplicationChat";
import PushNotificationManager from "@/components/PushNotificationManager";


export default function DashboardOverview() {
    const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
    const [requestStep, setRequestStep] = useState(1);
    const [mounted, setMounted] = useState(false);
    const [userProfile, setUserProfile] = useState<any>(null);
    const [applications, setApplications] = useState<any[]>([]);
    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    // Form state
    const [selectedService, setSelectedService] = useState("");
    const [targetCountry, setTargetCountry] = useState("");
    const [targetDate, setTargetDate] = useState("");
    const [selectedSession, setSelectedSession] = useState("");
    const [visaCategory, setVisaCategory] = useState("");
    const [isOtherCountry, setIsOtherCountry] = useState(false);
    const [isOtherVisaCategory, setIsOtherVisaCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [documents, setDocuments] = useState<any[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const supabase = createClient();

    useEffect(() => {
        setMounted(true);
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;

            if (user) {
                console.log("DEBUG: Utilisateur connecté ID:", user.id);

                // Fetch Profile - On utilise try/catch spécifique ici car c'est là que l'erreur 500 arrive
                try {
                    const { data: profile, error: profileError } = await supabase
                        .from('profiles')
                        .select('*')
                        .eq('id', user.id)
                        .maybeSingle();

                    if (profileError) {
                        console.error("DEBUG ERROR: Erreur lors de la lecture du profil (500 ?):", profileError);
                    } else if (profile) {
                        console.log("DEBUG: Profil chargé avec succès. Rôle:", profile.role);
                        setUserProfile(profile);
                    } else {
                        console.warn("DEBUG: Aucun profil trouvé pour cet utilisateur.");
                    }
                } catch (err: any) {
                    console.error("DEBUG CRITICAL: Exception lors de la lecture du profil:", err.message);
                }

                // Fetch Applications
                const { data: apps, error: appsError } = await supabase
                    .from('applications')
                    .select('*')
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (appsError) {
                    console.error("DEBUG ERROR: Erreur lors de la lecture des dossiers:", appsError.message);
                } else {
                    console.log("DEBUG: Dossiers chargés:", apps?.length || 0);
                    setApplications(apps || []);
                    if (apps && apps.length > 0) {
                        fetchDocuments(user.id, apps[0].id);
                    }
                }
            }
        } catch (error: any) {
            console.error("DEBUG GLOBAL ERROR:", error.message);
        }
    };

    const fetchDocuments = async (userId: string, appId: string) => {
        const { data, error } = await supabase.storage
            .from('client_documents')
            .list(`${userId}/${appId}`);

        if (error) {
            console.error("Error fetching documents:", error);
            return;
        }
        setDocuments(data || []);
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file || !applications[0]) return;

        // Validation côté client : taille max 10 MB
        const MAX_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB
        if (file.size > MAX_SIZE_BYTES) {
            alert("Fichier trop volumineux. La taille maximale est de 10 MB.");
            return;
        }

        // Validation du type MIME (réel, pas seulement l'extension)
        const ALLOWED_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp', 'image/heic'];
        if (!ALLOWED_TYPES.includes(file.type)) {
            alert("Type de fichier non autorisé. Seuls les fichiers PDF et images (JPEG, PNG, WEBP) sont acceptés.");
            return;
        }

        setUploading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) throw new Error("Non authentifié");

            // Utiliser un nom de fichier aléatoire sécurisé (pas Math.random)
            const fileExt = file.name.split('.').pop()?.toLowerCase() || 'bin';
            const safeExt = ['pdf', 'jpg', 'jpeg', 'png', 'webp', 'heic'].includes(fileExt) ? fileExt : 'bin';
            const fileName = `${crypto.randomUUID()}.${safeExt}`;
            const filePath = `${user.id}/${applications[0].id}/${fileName}`;

            const { error: uploadError } = await supabase.storage
                .from('client_documents')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            fetchDocuments(user.id, applications[0].id);
            alert("Document importé avec succès !");
        } catch (error: any) {
            // Ne pas exposer les détails de l'erreur interne
            console.error("Upload error:", error);
            alert("Erreur lors de l'importation. Veuillez réessayer.");
        } finally {
            setUploading(false);
        }
    };


    const handleCreateRequest = async () => {
        setLoading(true);
        try {
            const { data: { user }, error: authError } = await supabase.auth.getUser();
            if (authError) throw authError;
            if (!user) {
                alert("Vous devez être connecté pour créer une demande.");
                return;
            }

            const { data, error } = await supabase
                .from('applications')
                .insert([
                    {
                        user_id: user.id,
                        service_type: selectedService,
                        target_country: targetCountry,
                        target_date: targetDate || null,
                        session: selectedSession || null,
                        visa_category: visaCategory || null,
                        status: 'en_attente',
                        reference_number: `OT-${new Date().getFullYear()}-${crypto.getRandomValues(new Uint32Array(1))[0].toString().slice(-6)}`
                    }
                ])
                .select();

            if (error) {
                console.error("DEBUG ERROR: Échec de l'insertion du dossier:", error);
                throw error;
            }

            console.log("DEBUG: Dossier créé avec succès:", data);

            setIsNewRequestModalOpen(false);
            setRequestStep(1);
            setSelectedService("");
            setTargetCountry("");
            setTargetDate("");
            setSelectedSession("");
            setVisaCategory("");
            setIsOtherCountry(false);
            setIsOtherVisaCategory(false);
            fetchData(); // Refresh list
            alert("Votre demande a été enregistrée avec succès !");
        } catch (err: any) {
            console.error("DEBUG ERROR handleCreateRequest:", err);
            alert("Erreur lors de la création de la demande : " + (err.message || "Erreur inconnue"));
        } finally {
            setLoading(false);
        }
    };

    const stats = [
        { title: "Dossiers Actifs", value: applications.length.toString(), icon: <FolderOpen className="w-6 h-6 text-sky-500" />, bg: "bg-sky-50" },
        { title: "Documents Validés", value: "0", icon: <FileCheck2 className="w-6 h-6 text-emerald-500" />, bg: "bg-emerald-50" },
        { title: "Prochain Voyage", value: applications[0]?.target_country || "À définir", icon: <Plane className="w-6 h-6 text-indigo-500" />, bg: "bg-indigo-50" },
    ];

    const serviceOptions = [
        { id: "etudes", name: "Études à l'étranger", icon: <GraduationCap className="w-6 h-6" />, color: "text-sky-500 bg-sky-50" },
        { id: "visa", name: "Visa Classique", icon: <ShieldCheck className="w-6 h-6" />, color: "text-blue-600 bg-blue-50" },
        { id: "evisa", name: "E-Visa (Électronique)", icon: <Globe2 className="w-6 h-6" />, color: "text-amber-500 bg-amber-50" },
        { id: "immigration", name: "Immigration Express", icon: <FileText className="w-6 h-6" />, color: "text-emerald-500 bg-emerald-50" },
        { id: "assistance", name: "Assistance Documents", icon: <FolderOpen className="w-6 h-6" />, color: "text-indigo-500 bg-indigo-50" },
    ];

    const VISA_COUNTRIES = [
        { name: "Espagne", flag: "🇪🇸" },
        { name: "France", flag: "🇫🇷" },
        { name: "Hollande", flag: "🇳🇱" },
        { name: "Belgique", flag: "🇧🇪" },
        { name: "Luxembourg", flag: "🇱🇺" },
        { name: "Portugal", flag: "🇵🇹" },
        { name: "Finlande", flag: "🇫🇮" },
        { name: "Allemagne", flag: "🇩🇪" },
        { name: "Lituanie", flag: "🇱🇹" },
        { name: "Italie", flag: "🇮🇹" },
        { name: "Croatie", flag: "🇭🇷" },
        { name: "Autriche", flag: "🇦🇹" },
        { name: "Slovénie", flag: "🇸🇮" },
        { name: "Hongrie", flag: "🇭🇺" },
        { name: "Lettonie", flag: "🇱🇻" },
        { name: "Grèce", flag: "🇬🇷" },
        { name: "Suisse", flag: "🇨🇭" },
        { name: "Malte", flag: "🇲🇹" },
        { name: "Pologne", flag: "🇵🇱" },
        { name: "Suède", flag: "🇸🇪" },
        { name: "Turquie", flag: "🇹🇷" },
        { name: "USA", flag: "🇺🇸" },
        { name: "Canada", flag: "🇨🇦" },
        { name: "Royaume-Uni", flag: "🇬🇧" },
    ];

    const IMMIGRATION_COUNTRIES = [
        { name: "Canada", flag: "🇨🇦" },
        { name: "France", flag: "🇫🇷" },
        { name: "USA", flag: "🇺🇸" },
        { name: "Royaume-Uni", flag: "🇬🇧" },
    ];

    const IMMIGRATION_PROGRAMS: Record<string, string[]> = {
        "Canada": [
            "Entrée Express (Express Entry)",
            "Programmes des Candidats des Provinces (PCP/PNP)",
            "Regroupement Familial",
            "Visa Étudiant / Travailleur"
        ],
        "France": [
            "Passeport Talent",
            "Regroupement Familial",
            "Visiteur & Retraités",
            "Études en France"
        ],
        "USA": [
            "Visas de Travail (H-1B, L-1)",
            "Résidence Permanente (Green Card)",
            "Loterie Diversité (DV Lottery)",
            "Études (F-1 / M-1)"
        ],
        "Royaume-Uni": [
            "Skilled Worker Visa",
            "Global Talent Visa",
            "Innovator Founder Visa",
            "Student Visa"
        ]
    };

    const EVISA_COUNTRIES = [
        { name: "Thaïlande", flag: "🇹🇭" },
        { name: "Azerbaïdjan", flag: "🇦🇿" },
        { name: "Égypte", flag: "🇪🇬" },
        { name: "Oman", flag: "🇴🇲" },
        { name: "Ouzbékistan", flag: "🇺🇿" },
        { name: "Vietnam", flag: "🇻🇳" },
        { name: "Turquie", flag: "🇹🇷" },
        { name: "Qatar", flag: "🇶🇦" },
        { name: "Sri Lanka", flag: "🇱🇰" },
        { name: "Indonésie", flag: "🇮🇩" },
        { name: "Singapour", flag: "🇸🇬" },
        { name: "Arabie Saoudite (Omra)", flag: "🇸🇦" },
        { name: "Arabie Saoudite (Touristique)", flag: "🇸🇦" },
        { name: "Arménie", flag: "🇦🇲" },
        { name: "Cambodge", flag: "🇰🇭" },
        { name: "Chine (1ère demande)", flag: "🇨🇳" },
        { name: "Chine (Renouvellement)", flag: "🇨🇳" },
        { name: "Cuba", flag: "🇨🇺" },
        { name: "Éthiopie", flag: "🇪🇹" },
        { name: "Jordanie", flag: "🇯🇴" },
        { name: "Liban", flag: "🇱🇧" },
        { name: "Tanzanie", flag: "🇹🇿" },
    ];

    const FRANCE_STUDY_PROCEDURES = [
        "Campus France (CEF)",
        "Universités Non-Connectées (ex: Paris-Saclay)",
        "Écoles Privées / Grandes Écoles",
        "Parcoursup / Formation Professionnelle"
    ];

    const BELGIQUE_STUDY_PROCEDURES = [
        "Université (Enseignement Académique)",
        "Haute École (Enseignement Pratique)",
        "École des Arts / Conservatoire"
    ];

    const USA_STUDY_PROCEDURES = [
        "University (Admission Directe)",
        "Community College (2 ans + Transfert)",
        "Language Program (Anglais Intensif)"
    ];

    const ITALIE_STUDY_PROCEDURES = [
        "Pack Premium Licence (Admission + Bourse + Visa)",
        "Pack Premium Master/Doctorat (Admission + Bourse + Visa)"
    ];

    const DUBAI_STUDY_PROCEDURES = [
        "Admission Directe (Campus Internationaux)",
        "Pack Cours de Langue + Admission",
        "Assistance Visa Résidence Étudiant"
    ];

    const ETUDE_LEVELS = [
        "Licence / Bachelor (Bac+3)",
        "Master (Bac+5)",
        "Doctorat (PhD)",
        "Autre"
    ];

    if (!mounted) return null;

    const activeDossier = applications[0];

    const getCountryList = () => {
        if (selectedService === "Immigration Express") return IMMIGRATION_COUNTRIES;
        if (selectedService === "E-Visa (Électronique)") return EVISA_COUNTRIES;
        return VISA_COUNTRIES;
    };

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto">
            <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 mb-1">
                        Bonjour, {userProfile?.first_name || "Chargement..."} 👋
                    </h1>
                    <p className="text-gray-500 font-medium tracking-tight">Bienvenue sur votre espace client. Voici l'état de vos demandes.</p>
                </div>
                <button
                    onClick={() => {
                        setIsNewRequestModalOpen(true);
                        setRequestStep(1);
                        setSelectedService("");
                        setTargetCountry("");
                        setIsOtherCountry(false);
                    }}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95"
                >
                    <PlusCircle className="w-5 h-5" />
                    Nouvelle demande
                </button>
            </div>

            {/* Alert / Notification Important */}
            {activeDossier && activeDossier.status === 'en_attente' && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 p-6 bg-amber-50 border border-amber-100 rounded-[2rem] flex items-start gap-5 relative overflow-hidden"
                >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-200/20 blur-3xl rounded-full"></div>
                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center shrink-0">
                        <AlertCircle className="w-6 h-6 text-amber-500" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-amber-900 font-black text-lg mb-1 uppercase tracking-tighter italic">Dossier en attente de vérification</h3>
                        <p className="text-amber-800/80 font-bold text-sm mb-4 leading-relaxed">
                            Votre demande de <strong className="text-amber-950 font-black uppercase">{activeDossier.service_type}</strong> pour la destination <strong className="text-amber-950 font-black uppercase">{activeDossier.target_country}</strong> est en cours d'analyse.
                        </p>
                    </div>
                </motion.div>
            )}

            <PushNotificationManager />

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {stats.map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="p-6 border border-slate-100 bg-white rounded-[2rem] shadow-sm flex items-center gap-4 hover:shadow-xl hover:-translate-y-1 transition-all group"
                    >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${stat.bg} group-hover:scale-110 transition-transform`}>
                            {stat.icon}
                        </div>
                        <div>
                            <div className="text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] mb-1">{stat.title}</div>
                            <div className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Active Dossier */}
            <div className="bg-white border border-slate-100 rounded-[3rem] p-8 md:p-12 shadow-sm mb-10">
                {activeDossier ? (
                    <>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-8 border-b border-slate-50">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-amber-50 rounded-2xl flex items-center justify-center text-amber-500">
                                    <FolderOpen className="w-7 h-7" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Dossier en Cours</h2>
                                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Référence: {activeDossier.reference_number}</p>
                                </div>
                            </div>
                            <span className={`px-5 py-2 border font-black text-[10px] uppercase tracking-widest rounded-full flex items-center gap-2 self-start md:self-center ${activeDossier.status === 'valide' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                activeDossier.status === 'rejete' ? 'bg-rose-50 text-rose-600 border-rose-100' :
                                    'bg-sky-50 text-sky-600 border-sky-100'
                                }`}>
                                <Clock className="w-3 h-3" /> {
                                    activeDossier.status === 'valide' ? 'Validé' :
                                        activeDossier.status === 'rejete' ? 'Rejeté' :
                                            activeDossier.status === 'en_attente' ? 'En attente' : 'En Traitement'
                                }
                            </span>
                            <button
                                onClick={() => setSelectedChat(activeDossier.id)}
                                className="flex items-center gap-2 px-6 py-2 px-4 bg-sky-50 text-sky-600 font-black text-[10px] uppercase tracking-widest rounded-xl hover:bg-sky-600 hover:text-white transition-all shadow-sm active:scale-95 ml-auto"
                            >
                                <MessageSquare className="w-4 h-4" />
                                Contacter le Support
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <h3 className="font-black text-slate-900 text-xl tracking-tight italic">{activeDossier.service_type} - {activeDossier.target_country}</h3>
                                <div className="relative pl-8 space-y-10 border-l-2 border-slate-100">
                                    <div className="relative">
                                        <div className="absolute -left-[41px] w-8 h-8 bg-emerald-500 rounded-xl flex items-center justify-center border-4 border-white shadow-lg">
                                            <CheckCircle2 className="w-4 h-4 text-white" />
                                        </div>
                                        <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">Ouverture du dossier</h4>
                                        <p className="text-xs font-bold text-slate-400 mt-1">Dossier créé le {new Date(activeDossier.created_at).toLocaleDateString()}.</p>
                                    </div>
                                    <div className="relative">
                                        <div className="absolute -left-[41px] w-8 h-8 bg-amber-500 rounded-xl flex items-center justify-center border-4 border-white shadow-lg shadow-amber-200">
                                            <Clock className="w-4 h-4 text-white animate-pulse" />
                                        </div>
                                        <h4 className="font-black text-amber-600 text-sm uppercase tracking-tight italic">Analyse des documents</h4>
                                        <p className="text-xs font-bold text-slate-500 mt-1">L'agent examine vos premières informations.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="space-y-8">
                                <h3 className="font-black text-slate-900 text-xl tracking-tight italic uppercase">Dernières Pièces</h3>

                                <input
                                    type="file"
                                    className="hidden"
                                    ref={fileInputRef}
                                    onChange={handleUpload}
                                    accept=".pdf,image/*"
                                />

                                <div className="space-y-4">
                                    {/* Real documents from storage */}
                                    {documents.length > 0 ? (
                                        documents.map((doc, idx) => (
                                            <div key={idx} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between group hover:border-sky-200 transition-all">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center text-sky-500">
                                                        <FileText className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-black text-slate-900 truncate max-w-[150px]">{doc.name}</p>
                                                        <p className="text-[10px] font-bold text-slate-400">Importé le {new Date(doc.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="px-3 py-1 bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Reçu</span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center p-6 border border-slate-50 rounded-2xl">
                                            <p className="text-xs font-bold text-slate-400 italic">Aucun document envoyé pour le moment.</p>
                                        </div>
                                    )}

                                    <div
                                        onClick={() => !uploading && fileInputRef.current?.click()}
                                        className={`p-5 border-2 border-dashed border-slate-200 bg-white rounded-2xl flex items-center justify-center hover:bg-slate-50 hover:border-sky-400 transition-all cursor-pointer text-slate-400 py-8 group ${uploading ? 'opacity-50 cursor-wait' : ''}`}
                                    >
                                        <div className="text-center">
                                            {uploading ? (
                                                <Loader2 className="w-8 h-8 mx-auto mb-2 text-sky-500 animate-spin" />
                                            ) : (
                                                <PlusCircle className="w-8 h-8 mx-auto mb-2 text-sky-500 group-hover:scale-110 transition-transform" />
                                            )}
                                            <span className="font-black text-xs uppercase tracking-widest">
                                                {uploading ? 'Envoi en cours...' : 'Importer un document'}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="text-center py-20">
                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                            <PlusCircle className="w-10 h-10 text-slate-300" />
                        </div>
                        <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase mb-2">Aucun dossier actif</h2>
                        <p className="text-slate-500 font-medium mb-8">Commencez vos démarches en créant votre première demande.</p>
                        <button
                            onClick={() => { setIsNewRequestModalOpen(true); setRequestStep(1); }}
                            className="bg-amber-400 text-gray-900 px-8 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-amber-500 transition-all shadow-xl shadow-amber-200 active:scale-95"
                        >
                            Nouvelle demande
                        </button>
                    </div>
                )}
            </div>

            {/* New Request Modal */}
            <AnimatePresence>
                {isNewRequestModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsNewRequestModalOpen(false)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col"
                        >
                            <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 bg-white rounded-2xl shadow-sm flex items-center justify-center text-amber-500">
                                        <PlusCircle className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h2 className="text-xl font-black text-slate-900 uppercase tracking-tighter">Nouvelle Demande</h2>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest italic">Étape {requestStep} sur {selectedService === "Immigration Express" ? "3" : "2"}</p>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsNewRequestModalOpen(false)}
                                    className="p-3 hover:bg-white rounded-2xl transition-all shadow-sm"
                                >
                                    <X className="w-6 h-6 text-slate-400" />
                                </button>
                            </div>

                            <div className="p-10">
                                {requestStep === 1 ? (
                                    <div className="space-y-8">
                                        <h3 className="text-lg font-black text-slate-900 italic tracking-tight uppercase">Quel service vous intéresse ?</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            {serviceOptions.map((opt) => (
                                                <button
                                                    key={opt.id}
                                                    onClick={() => { setSelectedService(opt.name); setRequestStep(2); }}
                                                    className={`p-6 border rounded-3xl flex flex-col items-center text-center gap-4 transition-all group ${selectedService === opt.name ? 'border-amber-400 bg-amber-50/50 shadow-inner' : 'border-slate-100 bg-slate-50 hover:shadow-xl hover:bg-white'}`}
                                                >
                                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${opt.color} group-hover:scale-110 transition-transform shadow-sm`}>
                                                        {opt.icon}
                                                    </div>
                                                    <span className="font-black text-sm text-slate-800 uppercase tracking-tight">{opt.name}</span>
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-8 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                                        <h3 className="text-lg font-black text-slate-900 italic tracking-tight uppercase">Dites-nous en plus</h3>
                                        <div className="space-y-6">
                                            <div className="space-y-4">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Pays de Destination</label>
                                                <div className="relative group">
                                                    <Globe2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                    <select
                                                        value={isOtherCountry ? "autre" : targetCountry}
                                                        onChange={(e) => {
                                                            const val = e.target.value;
                                                            if (val === "autre") {
                                                                setIsOtherCountry(true);
                                                                setTargetCountry("");
                                                            } else {
                                                                setIsOtherCountry(false);
                                                                setTargetCountry(val);
                                                            }
                                                        }}
                                                        className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                                    >
                                                        <option value="" disabled>Sélectionnez un pays</option>
                                                        {getCountryList().map((c) => (
                                                            <option key={c.name} value={c.name}>{c.name} {c.flag}</option>
                                                        ))}
                                                        <option value="autre">Autre destination...</option>
                                                    </select>
                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                        <PlusCircle className="w-4 h-4 text-slate-400 rotate-45" />
                                                    </div>
                                                </div>

                                                <AnimatePresence>
                                                    {isOtherCountry && (
                                                        <motion.div
                                                            initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                            animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                                            exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="relative">
                                                                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                                                                <input
                                                                    type="text"
                                                                    autoFocus
                                                                    value={targetCountry}
                                                                    onChange={(e) => setTargetCountry(e.target.value)}
                                                                    placeholder="Précisez votre destination..."
                                                                    className="w-full pl-12 pr-4 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900"
                                                                />
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                                {selectedService === "Immigration Express" && targetCountry && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="mt-8 space-y-4"
                                                    >
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Programme d'Immigration</label>
                                                        <div className="relative group">
                                                            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                            <select
                                                                value={visaCategory}
                                                                onChange={(e) => setVisaCategory(e.target.value)}
                                                                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                                            >
                                                                <option value="" disabled>Sélectionnez un programme</option>
                                                                {IMMIGRATION_PROGRAMS[targetCountry]?.map((p) => (
                                                                    <option key={p} value={p}>{p}</option>
                                                                ))}
                                                                <option value="Autre / Conseil">Autre / Conseil personnalisé</option>
                                                            </select>
                                                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                                <PlusCircle className="w-4 h-4 text-slate-400 rotate-45" />
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </div>

                                            {/* Champs spécifiques : Visa Classique */}
                                            {selectedService === "Visa Classique" && (
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Catégorie de Visa</label>
                                                    <div className="relative group">
                                                        <ShieldCheck className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <select
                                                            value={isOtherVisaCategory ? "autre_cat" : visaCategory}
                                                            onChange={(e) => {
                                                                const val = e.target.value;
                                                                if (val === "autre_cat") {
                                                                    setIsOtherVisaCategory(true);
                                                                    setVisaCategory("");
                                                                } else {
                                                                    setIsOtherVisaCategory(false);
                                                                    setVisaCategory(val);
                                                                }
                                                            }}
                                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 appearance-none cursor-pointer"
                                                        >
                                                            <option value="" disabled>Choisir une catégorie</option>
                                                            <option value="Touristique">Touristique 🏖️</option>
                                                            <option value="Affaire">Affaire 💼</option>
                                                            <option value="autre_cat">Autre...</option>
                                                        </select>
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                                            <PlusCircle className="w-4 h-4 text-slate-400 rotate-45" />
                                                        </div>
                                                    </div>

                                                    {/* Champ manuel si "Autre" est sélectionné pour le Visa */}
                                                    <AnimatePresence>
                                                        {isOtherVisaCategory && (
                                                            <motion.div
                                                                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                animate={{ opacity: 1, height: 'auto', marginTop: 16 }}
                                                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                                                className="overflow-hidden"
                                                            >
                                                                <div className="relative">
                                                                    <PlusCircle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-amber-500" />
                                                                    <input
                                                                        type="text"
                                                                        autoFocus
                                                                        value={visaCategory}
                                                                        onChange={(e) => setVisaCategory(e.target.value)}
                                                                        placeholder="Quelle catégorie de visa ?"
                                                                        className="w-full pl-12 pr-4 py-4 bg-amber-50/30 border border-amber-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900"
                                                                    />
                                                                </div>
                                                            </motion.div>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            )}

                                            {/* Champs spécifiques : Études */}
                                            {selectedService === "Études à l'étranger" && (
                                                <div className="space-y-6">
                                                    {targetCountry === "France" && (
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type de procédure</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {FRANCE_STUDY_PROCEDURES.map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => setSelectedSession(proc)}
                                                                        className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${selectedSession === proc ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                    >
                                                                        {proc}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {targetCountry === "Belgique" && (
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type d'établissement</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {BELGIQUE_STUDY_PROCEDURES.map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => setSelectedSession(proc)}
                                                                        className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${selectedSession === proc ? 'border-red-600 bg-red-50 text-red-700 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                    >
                                                                        {proc}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {targetCountry === "USA" && (
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Type de programme</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {USA_STUDY_PROCEDURES.map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => setSelectedSession(proc)}
                                                                        className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${selectedSession === proc ? 'border-blue-900 bg-blue-50 text-blue-900 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                    >
                                                                        {proc}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {targetCountry === "Italie" && (
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Choisir votre Pack</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {ITALIE_STUDY_PROCEDURES.map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => setSelectedSession(proc)}
                                                                        className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${selectedSession === proc ? 'border-green-600 bg-green-50 text-green-700 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                    >
                                                                        {proc}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    {targetCountry === "Dubaï" && (
                                                        <div className="space-y-4">
                                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Options Dubaï</label>
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {DUBAI_STUDY_PROCEDURES.map((proc) => (
                                                                    <button
                                                                        key={proc}
                                                                        onClick={() => setSelectedSession(proc)}
                                                                        className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${selectedSession === proc ? 'border-slate-900 bg-amber-50 text-slate-900 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                    >
                                                                        {proc}
                                                                    </button>
                                                                ))}
                                                            </div>
                                                        </div>
                                                    )}

                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Niveau d'études actuel</label>
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {ETUDE_LEVELS.map((level) => (
                                                                <button
                                                                    key={level}
                                                                    onClick={() => setVisaCategory(level)}
                                                                    className={`p-4 rounded-2xl border-2 transition-all text-left font-black text-[10px] uppercase tracking-widest ${visaCategory === level ? 'border-sky-600 bg-sky-50 text-sky-700 shadow-inner' : 'border-slate-50 hover:border-slate-200 text-slate-500 bg-slate-50/50'}`}
                                                                >
                                                                    {level}
                                                                </button>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Session souhaitée</label>
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <button
                                                                onClick={() => setSelectedSession("Hiver")}
                                                                className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${selectedSession === "Hiver" ? 'border-sky-600 bg-sky-50 text-sky-700 shadow-inner' : 'border-slate-50 text-slate-400 bg-slate-50/50'}`}
                                                            >
                                                                Hiver ❄️
                                                            </button>
                                                            <button
                                                                onClick={() => setSelectedSession("Automne")}
                                                                className={`p-4 rounded-2xl border-2 transition-all font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 ${selectedSession === "Automne" ? 'border-sky-600 bg-sky-50 text-sky-700 shadow-inner' : 'border-slate-50 text-slate-400 bg-slate-50/50'}`}
                                                            >
                                                                Automne 🍂
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}

                                            {selectedService !== "Études à l'étranger" && (
                                                <div className="space-y-4">
                                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">Date estimée de départ</label>
                                                    <div className="relative group">
                                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                                                        <input
                                                            type="date"
                                                            value={targetDate}
                                                            onChange={(e) => setTargetDate(e.target.value)}
                                                            className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-4 focus:ring-amber-400/10 focus:border-amber-400 transition-all font-bold text-slate-900 uppercase"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="p-8 border-t border-slate-50 bg-slate-50/50 flex items-center justify-between">
                                {requestStep === 2 ? (
                                    <button onClick={() => setRequestStep(1)} className="text-xs font-black text-slate-400 uppercase tracking-widest hover:text-slate-600 transition-colors">Retour</button>
                                ) : <div />}

                                {requestStep === 2 && (
                                    <button
                                        onClick={handleCreateRequest}
                                        disabled={loading || !targetCountry || (selectedService === "Immigration Express" && !visaCategory)}
                                        className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black uppercase tracking-widest text-xs flex items-center gap-3 hover:bg-slate-800 transition-all disabled:opacity-50"
                                    >
                                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <><Send className="w-4 h-4" /> Envoyer la demande</>}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {selectedChat && (
                    <ApplicationChat
                        applicationId={selectedChat}
                        onClose={() => setSelectedChat(null)}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
