"use client";

import { motion } from "framer-motion";
import { Plane, GraduationCap, FileText, ArrowRight, Star, ShieldCheck, MapPin, TrendingUp, Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.7 }
  };

  return (
    <div className="min-h-screen bg-[#020617] font-sans selection:bg-amber-500 selection:text-slate-900 text-slate-300">

      {/* ─── INFOGRAPHIC HERO SECTION ─── */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Visuals */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-sky-500/20 blur-[130px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-amber-500/15 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay"></div>
          {/* Subtle Grid */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

          {/* Left Text Content */}
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-amber-400 font-bold text-xs uppercase tracking-widest shadow-2xl"
            >
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Votre Pass Pour Le Monde</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-6xl md:text-8xl font-black text-white tracking-tighter leading-[0.95]"
            >
              Franchissez<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-500 to-amber-400 italic">
                Les Frontières.
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="text-xl text-slate-400 max-w-2xl leading-relaxed font-medium"
            >
              Une approche data-driven pour l'obtention de cas de visa, vos admissions universitaires et procédures d'immigration complexes. <strong className="text-white font-bold">La précision d'une agence experte.</strong>
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <Link href="/auth/register">
                <button className="px-8 py-4 bg-white text-slate-950 rounded-full font-black text-lg hover:scale-105 transition-transform flex items-center justify-center gap-3 shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                  Lancer mon Dossier
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <Link href="#services">
                <button className="px-8 py-4 bg-white/5 text-white border border-white/10 rounded-full font-bold text-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2 backdrop-blur-sm">
                  Découvrir nos services
                </button>
              </Link>
            </motion.div>
          </div>

          {/* Right Visual / Infographic Cards */}
          <div className="lg:col-span-5 relative h-[500px] hidden lg:block">
            {/* Main Center Card */}
            <motion.div
              initial={{ opacity: 0, y: 50, rotate: -5 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 p-8 bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-[3rem] shadow-2xl z-20"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <span className="text-emerald-400 font-black text-sm bg-emerald-400/10 px-3 py-1 rounded-full">+24% ce mois</span>
              </div>
              <h3 className="text-5xl font-black text-white mb-2">98<span className="text-3xl text-slate-500">%</span></h3>
              <p className="text-slate-400 font-bold text-sm uppercase tracking-widest">Taux d'Approbation</p>

              {/* Mini Chart */}
              <div className="flex items-end gap-2 h-16 mt-6 border-b border-slate-700/50 pb-2">
                {[40, 60, 50, 80, 70, 95].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                    className={`flex-1 rounded-t-sm ${i === 5 ? 'bg-sky-500' : 'bg-slate-700'}`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Floating Card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="absolute top-10 right-0 w-48 p-5 bg-amber-500/10 backdrop-blur-xl border border-amber-500/20 rounded-[2rem] shadow-xl z-30"
            >
              <ShieldCheck className="w-8 h-8 text-amber-400 mb-3" />
              <p className="text-white font-black leading-tight text-sm">Contrôle Juridique Inclus</p>
            </motion.div>

            {/* Floating Card 2 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="absolute bottom-10 left-0 w-56 p-5 bg-blue-500/10 backdrop-blur-xl border border-blue-500/20 rounded-[2rem] shadow-xl z-30"
            >
              <div className="flex -space-x-3 mb-3">
                {['CA', 'FR', 'UK'].map((c, i) => (
                  <div key={i} className={`w-10 h-10 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold ${i === 0 ? 'z-30' : i === 1 ? 'z-20' : 'z-10'}`}>
                    {c}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white text-slate-900 flex items-center justify-center text-[10px] font-black z-0">+10k</div>
              </div>
              <p className="text-slate-300 text-xs font-bold leading-tight">Dossiers traités depuis notre création</p>
            </motion.div>
          </div>

        </div>
      </section>

      {/* ─── DATA & STATS SECTION (INFOGRAPHIC) ─── */}
      <section id="data" className="py-20 border-y border-white/5 bg-slate-950/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4 divide-x divide-white/5">
            {[
              { label: "Projets Valides", value: "12,450", sub: "À travers le monde", color: "text-sky-400" },
              { label: "Destinations", value: "45+", sub: "États & Pays", color: "text-amber-400" },
              { label: "Délai moyen", value: "< 24h", sub: "Traitement interne", color: "text-white" },
              { label: "Expertise", value: "10 Ans", sub: "Sur le marché DZ", color: "text-blue-400" },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center px-4"
              >
                <div className={`text-4xl md:text-6xl font-black ${stat.color} mb-2 tracking-tighter`}>{stat.value}</div>
                <div className="text-white font-bold uppercase tracking-widest text-[10px] md:text-sm mb-1">{stat.label}</div>
                <div className="text-slate-500 text-xs md:text-sm">{stat.sub}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BENTO GRID SERVICES ─── */}
      <section id="services" className="py-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-[10px] font-black text-sky-500 uppercase tracking-[0.3em] mb-4">Notre Écosystème</h2>
          <h3 className="text-4xl md:text-6xl font-black text-white tracking-tighter">Trois Piliers d'Expertise.</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px]">

          {/* Bento Item 1 : Tourisme (Large) */}
          <Link href="/tourisme" className="md:col-span-8 row-span-2 relative rounded-[3rem] overflow-hidden group block cursor-pointer border border-white/10 bg-slate-900">
            <div className="absolute inset-0">
              <Image src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2000&auto=format&fit=crop" priority width={1000} height={800} className="w-full h-full object-cover opacity-40 group-hover:scale-105 group-hover:opacity-30 transition-all duration-700" alt="Tourisme & Visas" />
              <div className="absolute inset-x-0 bottom-0 top-1/2 bg-gradient-to-t from-[#020617] via-[#020617]/80 to-transparent" />
            </div>
            <div className="absolute inset-0 p-10 flex flex-col justify-end">
              <div className="w-16 h-16 rounded-3xl bg-sky-500/20 backdrop-blur-md border border-sky-400/30 flex items-center justify-center text-sky-400 mb-6 group-hover:scale-110 transition-transform">
                <Plane className="w-8 h-8" />
              </div>
              <h4 className="text-5xl font-black text-white mb-4 tracking-tighter">Tourisme & Visas C</h4>
              <p className="text-slate-300 font-medium max-w-lg mb-8 text-lg leading-relaxed">Espace Schengen, Turquie, Asie, Amériques. Laissez nos experts préparer un dossier inattaquable pour votre prochain voyage de loisirs ou d'affaires.</p>
              <div className="px-6 py-4 bg-white text-slate-950 rounded-full font-black text-sm hover:bg-slate-200 transition-colors w-fit flex items-center gap-2">
                Prendre Rendez-vous <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
              </div>
            </div>
          </Link>

          {/* Bento Item 2 : Études (Vertical) */}
          <Link href="/etudes" className="md:col-span-4 row-span-2 relative rounded-[3rem] overflow-hidden group block border border-blue-500/20 bg-blue-950/20 backdrop-blur-md hover:bg-blue-900/30 transition-colors">
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900/10 to-[#020617]" />
            <div className="absolute inset-0 p-10 flex flex-col">
              <div className="w-16 h-16 rounded-3xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center text-blue-400 mb-8 group-hover:rotate-12 transition-transform">
                <GraduationCap className="w-8 h-8" />
              </div>
              <h4 className="text-4xl font-black text-white mb-4 leading-[1.1] tracking-tighter">Admissions<br />Universitaires</h4>
              <p className="text-slate-400 font-medium mb-auto">Du choix de l'université jusqu'à l'obtention du CAQ, Permis d'Études et installation sur place.</p>

              <div className="mt-10 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black text-slate-300 uppercase tracking-widest"><span className="text-blue-400">Canada</span><span>85%</span></div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full relative"><div className="absolute inset-0 bg-white/20 animate-pulse"></div></div></div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-black text-slate-300 uppercase tracking-widest"><span className="text-white">France</span><span>60%</span></div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden"><div className="h-full bg-white rounded-full relative w-[60%]"><div className="absolute inset-0 bg-white/20 animate-pulse"></div></div></div>
                </div>
                <div className="w-full py-4 border border-white/10 text-white rounded-2xl font-bold transition-colors flex items-center justify-center gap-2 mt-4 group-hover:border-blue-500/50">
                  Voir les destinations <ArrowRight className="w-4 h-4 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

          {/* Bento Item 3 : Immigration (Horizontal) */}
          <Link href="/immigration" className="md:col-span-12 row-span-1 relative rounded-[3rem] overflow-hidden group block border border-amber-500/20 bg-amber-950/20 backdrop-blur-md hover:bg-amber-900/30 transition-colors">
            <div className="absolute inset-0 flex items-center p-10 md:p-14 gap-10 flex-col md:flex-row">
              <div className="w-24 h-24 rounded-[2rem] bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400 shrink-0 shadow-[0_0_40px_rgba(245,158,11,0.1)] group-hover:scale-110 transition-transform">
                <MapPin className="w-10 h-10" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <h4 className="text-4xl font-black text-white mb-3 tracking-tighter">Immigration & Résidence</h4>
                <p className="text-slate-400 font-medium max-w-2xl text-lg leading-relaxed">Entrée Express, Travailleurs Qualifiés, Regroupement Familial. Des procédures complexes gérées de bout en bout par nos experts juridiques.</p>
              </div>
              <div className="shrink-0 w-full md:w-auto mt-4 md:mt-0">
                <div className="w-full md:w-auto px-10 py-5 bg-amber-500 text-slate-950 rounded-full font-black text-lg flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
                  Calculer mon Score CRS <ArrowRight className="w-5 h-5 group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          </Link>

        </div>
      </section>

      {/* ─── CLIENT PLATFORM SHOWCASE ─── */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617] to-slate-950"></div>
        <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-blue-500/10 blur-[150px] rounded-full pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900/80 backdrop-blur-xl border border-white/10 rounded-[4rem] p-10 md:p-16 flex flex-col lg:flex-row gap-16 shadow-[0_30px_100px_rgba(0,0,0,1)] items-center">

            <div className="lg:w-1/2 space-y-10">
              <div className="inline-block px-4 py-2 bg-blue-500/10 text-blue-400 font-black text-xs uppercase tracking-widest rounded-full border border-blue-500/20">
                Technologie Oussama Travel
              </div>
              <h2 className="text-5xl lg:text-6xl font-black text-white tracking-tighter leading-[1.1]">
                Votre Espace Client <br /><span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-500 to-slate-200 italic">Nouvelle Génération.</span>
              </h2>

              <div className="space-y-6">
                {[
                  { title: "Suivi en temps réel", desc: "Soyez notifié de chaque avancement de votre dossier instantanément." },
                  { title: "Messagerie Chiffrée", desc: "Échangez avec votre conseiller dédié via votre tableau de bord." },
                  { title: "Drive Sécurisé", desc: "Uploadez vos documents dans notre coffre-fort numérique personnel." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4 group">
                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0 group-hover:bg-blue-500 group-hover:text-slate-950 transition-colors">
                      <Check className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.title}</h4>
                      <p className="text-slate-400 text-sm mt-1">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Link href="/auth/register" className="inline-block">
                <button className="px-10 py-5 bg-white text-slate-950 rounded-full font-black text-lg hover:scale-105 transition-transform">
                  Créer un compte gratuit
                </button>
              </Link>
            </div>

            <div className="lg:w-1/2 w-full perspective-[1000px]">
              {/* Infographic Dashboard Mockup */}
              <motion.div
                initial={{ rotateY: -15, rotateX: 5 }}
                whileInView={{ rotateY: 0, rotateX: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true }}
                className="w-full h-auto bg-[#0b1120] rounded-[2rem] border border-slate-700 shadow-2xl relative overflow-hidden flex flex-col transform-gpu"
              >
                {/* Header Mockup */}
                <div className="h-12 border-b border-slate-800/80 bg-slate-900/50 flex items-center px-6 gap-3 backdrop-blur-md">
                  <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
                </div>
                {/* Body Mockup */}
                <div className="p-8 space-y-6">
                  {/* Status Bar */}
                  <div className="flex justify-between items-end">
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-slate-800 rounded"></div>
                      <div className="w-48 h-8 bg-slate-700 rounded-md"></div>
                    </div>
                    <div className="w-16 h-16 rounded-full border-4 border-blue-500 border-r-slate-800 flex items-center justify-center text-blue-400 font-bold text-sm">75%</div>
                  </div>

                  {/* Steps */}
                  <div className="space-y-4">
                    {[1, 2, 3].map((s, i) => (
                      <div key={i} className={`p-4 rounded-2xl border ${i === 0 ? 'bg-emerald-500/10 border-emerald-500/20' : i === 1 ? 'bg-blue-500/10 border-blue-500/20' : 'bg-slate-800/50 border-slate-700'} flex items-center gap-4`}>
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${i === 0 ? 'bg-emerald-500/20 text-emerald-400' : i === 1 ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-700 text-slate-500'}`}>
                          {i === 0 ? <Check className="w-5 h-5" /> : <div className="w-2 h-2 rounded-full bg-current pulse"></div>}
                        </div>
                        <div className="space-y-2 flex-1">
                          <div className="w-1/3 h-3 bg-white/20 rounded"></div>
                          <div className="w-2/3 h-2 bg-white/10 rounded"></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

          </div>
        </div>
      </section>

      {/* ─── FOOTER HIGHLIGHT (CTA) ─── */}
      <section className="py-32 relative overflow-hidden bg-sky-600">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1542296332-2e4473faf563?q=80&w=2000&auto=format&fit=crop')] opacity-10 mix-blend-overlay object-cover"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter leading-none mb-8">Votre Nouveau Départ Commence Ici.</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/auth/register">
                <button className="px-12 py-6 bg-[#020617] text-white rounded-full font-black text-xl hover:scale-105 transition-transform flex items-center gap-3">
                  Créer mon Profil
                  <ArrowRight className="w-6 h-6" />
                </button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
