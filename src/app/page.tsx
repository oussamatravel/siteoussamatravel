"use client";

import { motion, Variants } from "framer-motion";
import { 
  Plane, 
  GraduationCap, 
  MapPin, 
  ArrowRight, 
  CheckCircle2, 
  Globe2, 
  Search,
  Sparkles,
  Users,
  ShieldCheck,
  Star,
  TrendingUp,
  Compass,
  LayoutDashboard
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.6 }
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 overflow-x-hidden">
      
      {/* ─── HERO SECTION (ULTRA PREMIUM) ─── */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-20 px-4 overflow-hidden">
        {/* Cinematic Background Image */}
        <div className="absolute inset-0 z-0">
          <Image 
            src="/travel_study_hero_bg_1777198899219.png" 
            alt="Premium Travel & Study"
            fill
            className="object-cover opacity-60 scale-105"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white/80 via-white/40 to-white" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-transparent to-white/30" />
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-blue-400/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-amber-400/10 blur-[120px] rounded-full animate-pulse" />

        <div className="max-w-7xl mx-auto w-full relative z-10 text-center lg:text-left grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-8 space-y-8"
          >
            <motion.div 
              variants={itemVariants}
              className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/80 backdrop-blur-md border border-slate-200 text-blue-600 font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-blue-900/5"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-blue-500"></span>
              </span>
              L'Agence de Référence à Béjaïa
            </motion.div>

            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-8xl lg:text-[10rem] font-black tracking-tighter leading-[0.8] text-slate-950 uppercase"
            >
              Visez le <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-sky-500 to-amber-500 italic">
                Sommet.
              </span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-3xl text-slate-500 max-w-2xl font-medium leading-tight"
            >
              Plus qu'une agence, votre partenaire vers la <br />
              <span className="text-slate-900 font-black border-b-4 border-amber-400/30">réussite internationale.</span>
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-6 pt-4"
            >
              <Link href="/auth/register">
                <button className="px-12 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl hover:bg-blue-600 transition-all shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex items-center justify-center gap-4 group">
                  Démarrer mon Dossier
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                </button>
              </Link>
              <Link href="#services">
                <button className="px-10 py-7 bg-white/50 backdrop-blur-xl text-slate-600 border border-slate-200 rounded-[2.5rem] font-black text-xl hover:bg-white hover:shadow-xl transition-all flex items-center justify-center gap-3">
                  Explorer
                </button>
              </Link>
            </motion.div>
          </motion.div>

          {/* Side Info Cards (Glassmorphism) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 1 }}
            className="lg:col-span-4 hidden lg:flex flex-col gap-6"
          >
            <div className="p-8 bg-white/60 backdrop-blur-2xl border border-white/50 rounded-[3rem] shadow-2xl shadow-slate-200/50 transform hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-lg shadow-blue-200">
                <Star className="w-6 h-6 fill-white" />
              </div>
              <h3 className="text-4xl font-black text-slate-950 mb-2 leading-none">98%</h3>
              <p className="text-slate-500 font-bold uppercase text-[10px] tracking-widest">Taux de visa 2025</p>
            </div>

            <div className="p-8 bg-slate-950 text-white rounded-[3rem] shadow-2xl shadow-blue-900/20 transform hover:-translate-y-2 transition-transform">
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center mb-6 shadow-lg shadow-amber-400/20">
                <GraduationCap className="w-6 h-6" />
              </div>
              <p className="text-2xl font-black leading-tight mb-2">+150 Universités</p>
              <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Partenariats Mondiaux</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ─── SERVICES GRID (BENTO ULTRA CLEAN) ─── */}
      <section id="services" className="py-32 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <motion.h2 
            {...fadeIn}
            className="text-[10px] font-black text-blue-600 uppercase tracking-[0.5em] mb-4"
          >
            Nos Domaines d'Action
          </motion.h2>
          <motion.h3 
            {...fadeIn}
            className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter"
          >
            Expertise Sans <span className="italic text-slate-400">Compromis.</span>
          </motion.h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          
          {/* Tourisme & Visa (Large) */}
          <Link href="/tourisme" className="md:col-span-8 group relative overflow-hidden rounded-[4rem] bg-slate-50 border border-slate-100 p-12 h-[500px] flex flex-col justify-end hover:shadow-3xl hover:shadow-sky-100 transition-all duration-700">
            <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-0 group-hover:opacity-10 transition-opacity">
              <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=1200" fill className="object-cover" alt="Travel" />
            </div>
            <div className="w-20 h-20 rounded-3xl bg-blue-600 text-white flex items-center justify-center mb-10 shadow-2xl shadow-blue-200 group-hover:scale-110 transition-transform">
              <Plane className="w-10 h-10" />
            </div>
            <h4 className="text-4xl md:text-6xl font-black text-slate-950 mb-4 tracking-tighter uppercase">Visas & <br />Tourisme</h4>
            <p className="text-slate-500 text-lg font-medium max-w-md mb-10 leading-relaxed">
              Dossiers personnalisés pour visas Schengen, Turquie, Asie et plus. Précision et rapidité garanties.
            </p>
            <div className="flex items-center gap-4 text-blue-600 font-black text-xs uppercase tracking-[0.3em] group-hover:translate-x-4 transition-transform">
              Voir les détails <ArrowRight className="w-5 h-5" />
            </div>
          </Link>

          {/* Etudes (Tall) */}
          <Link href="/etudes" className="md:col-span-4 group relative overflow-hidden rounded-[4rem] bg-indigo-50 border border-indigo-100 p-12 flex flex-col hover:shadow-3xl hover:shadow-indigo-100 transition-all duration-700">
            <div className="w-20 h-20 rounded-3xl bg-indigo-600 text-white flex items-center justify-center mb-10 shadow-2xl shadow-indigo-200 group-hover:rotate-12 transition-transform">
              <GraduationCap className="w-10 h-10" />
            </div>
            <h4 className="text-4xl font-black text-slate-950 mb-4 tracking-tighter uppercase leading-none">Études <br />Mondiales</h4>
            <p className="text-slate-500 font-medium mb-10 leading-relaxed">
              Admission dans les universités d'élite en Italie, France et Canada.
            </p>
            <div className="mt-auto space-y-4">
               <div className="px-6 py-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/50 text-[10px] font-black uppercase text-indigo-600 tracking-widest text-center">
                 Liste Universités Italie 2026
               </div>
               <div className="px-6 py-4 bg-indigo-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest text-center shadow-lg shadow-indigo-200">
                 Démarrer Admissions
               </div>
            </div>
          </Link>

          {/* Immigration (Wide) */}
          <Link href="/immigration" className="md:col-span-12 group relative overflow-hidden rounded-[4rem] bg-amber-50 border border-amber-100 p-12 md:p-16 flex flex-col md:flex-row items-center gap-10 hover:shadow-3xl hover:shadow-amber-100 transition-all duration-700">
             <div className="w-24 h-24 rounded-[2.5rem] bg-amber-500 text-white flex items-center justify-center shadow-2xl shadow-amber-200 group-hover:scale-110 transition-transform shrink-0">
               <MapPin className="w-12 h-12" />
             </div>
             <div className="flex-1 text-center md:text-left">
               <h4 className="text-4xl md:text-5xl font-black text-slate-950 mb-4 tracking-tighter uppercase">Immigration Canada</h4>
               <p className="text-slate-500 text-lg font-medium max-w-3xl leading-relaxed">
                 Experts en Entrée Express, Travailleurs Qualifiés et Regroupement Familial. Nous bâtissons votre avenir au Canada.
               </p>
             </div>
             <div className="w-full md:w-auto px-12 py-6 bg-slate-950 text-white rounded-full font-black text-lg shadow-2xl hover:bg-amber-500 transition-colors shrink-0">
               Calculer mon Score
             </div>
          </Link>
        </div>
      </section>

      {/* ─── WHY US (VIBRANT) ─── */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-10">
              <h2 className="text-4xl md:text-7xl font-black text-slate-950 tracking-tighter leading-[0.9]">
                La Confiance <br />
                <span className="text-blue-600">Se Mérite.</span>
              </h2>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Depuis plus de 10 ans, nous accompagnons les familles algériennes dans leurs projets les plus ambitieux.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Transparence", desc: "Aucun frais caché.", icon: <ShieldCheck className="w-6 h-6" /> },
                  { title: "Rapidité", desc: "Traitement sous 24h.", icon: <TrendingUp className="w-6 h-6" /> },
                  { title: "Expertise", desc: "Consultants agréés.", icon: <CheckCircle2 className="w-6 h-6" /> },
                  { title: "Support", desc: "Accompagnement 24/7.", icon: <Users className="w-6 h-6" /> },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4 p-6 bg-white rounded-3xl border border-slate-100 shadow-sm">
                    <div className="text-blue-600 mt-1">{item.icon}</div>
                    <div>
                      <h4 className="font-black text-slate-950 uppercase text-xs tracking-widest mb-1">{item.title}</h4>
                      <p className="text-slate-400 text-xs font-medium">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="relative h-[600px] w-full rounded-[4rem] overflow-hidden shadow-3xl">
              <Image src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200" fill className="object-cover" alt="Team" />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900/60 to-transparent" />
              <div className="absolute bottom-10 left-10 p-10 bg-white/10 backdrop-blur-3xl rounded-[3rem] border border-white/20 text-white max-w-xs">
                 <p className="text-4xl font-black mb-2">+12k</p>
                 <p className="text-xs font-bold uppercase tracking-widest opacity-80">Dossiers traités avec succès depuis Béjaïa.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── PLATFORM (TECH FEEL) ─── */}
      <section className="py-32 px-4 max-w-7xl mx-auto">
         <div className="bg-gradient-to-br from-slate-900 to-slate-950 rounded-[5rem] p-12 md:p-24 relative overflow-hidden shadow-3xl">
           <div className="absolute -top-24 -right-24 w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full" />
           <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full" />
           
           <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
             <div className="space-y-10">
                <div className="inline-block px-6 py-2 bg-white/5 border border-white/10 rounded-full text-blue-400 font-black text-[10px] uppercase tracking-widest">
                  Plateforme Exclusive Client
                </div>
                <h2 className="text-4xl md:text-7xl font-black text-white tracking-tighter leading-none">
                  Votre Projet <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-sky-300 italic">Dans Votre Poche.</span>
                </h2>
                <p className="text-slate-400 text-xl font-medium leading-relaxed">
                  Accédez à votre espace sécurisé pour suivre votre visa, uploader vos documents et discuter avec nos experts en direct.
                </p>
                <Link href="/auth/register">
                  <button className="px-12 py-6 bg-white text-slate-950 rounded-full font-black text-xl hover:bg-blue-400 hover:text-white transition-all shadow-xl flex items-center gap-4">
                    Rejoindre l'Espace <LayoutDashboard className="w-6 h-6" />
                  </button>
                </Link>
             </div>

             <div className="relative">
               {/* Dashboard Mockup Visual */}
               <motion.div 
                 whileHover={{ rotateY: -5, rotateX: 5 }}
                 className="bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] p-10 space-y-8 shadow-2xl transition-transform duration-500"
               >
                 <div className="flex items-center justify-between">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500" />
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-emerald-500" />
                    </div>
                    <div className="w-20 h-2 bg-white/10 rounded-full" />
                 </div>
                 <div className="space-y-4">
                    <div className="h-16 w-full bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center px-6 gap-6">
                       <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                       <div className="h-3 w-1/2 bg-white/20 rounded-full" />
                    </div>
                    <div className="h-16 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center px-6 gap-6">
                       <div className="w-6 h-6 rounded-full border-2 border-blue-500 animate-spin border-t-transparent" />
                       <div className="h-3 w-2/3 bg-white/20 rounded-full" />
                    </div>
                    <div className="h-16 w-full bg-white/5 border border-white/10 rounded-2xl flex items-center px-6 gap-6 opacity-40">
                       <div className="w-6 h-6 rounded-full bg-white/10" />
                       <div className="h-3 w-1/3 bg-white/10 rounded-full" />
                    </div>
                 </div>
               </motion.div>
             </div>
           </div>
         </div>
      </section>

      {/* ─── CONTACT CALLOUT ─── */}
      <section className="py-32 text-center bg-white">
         <motion.div 
            whileInView={{ scale: [0.95, 1], opacity: [0, 1] }}
            className="max-w-4xl mx-auto px-4"
         >
           <h2 className="text-4xl md:text-8xl font-black text-slate-950 tracking-tighter mb-12">
             Commençons <br />
             <span className="text-blue-600 uppercase italic">Aujourd'hui.</span>
           </h2>
           <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
             <Link href="/contact">
               <button className="px-12 py-7 bg-slate-950 text-white rounded-[2.5rem] font-black text-xl shadow-2xl hover:bg-blue-600 transition-all flex items-center gap-4">
                 Nous Contacter <ArrowRight className="w-6 h-6" />
               </button>
             </Link>
             <Link href="/auth/register">
               <button className="px-12 py-7 bg-white text-slate-900 border border-slate-200 rounded-[2.5rem] font-black text-xl hover:bg-slate-50 transition-all">
                 S'inscrire
               </button>
             </Link>
           </div>
           <p className="mt-16 text-slate-300 font-black uppercase text-[10px] tracking-[0.5em]">Bejaia • Alger • Oran • Tizi Ouzou</p>
         </motion.div>
      </section>

    </div>
  );
}
