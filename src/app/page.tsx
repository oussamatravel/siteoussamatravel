"use client";

import { motion } from "framer-motion";
import { Plane, GraduationCap, FileText, ArrowRight, CheckCircle2, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const services = [
    {
      title: "Tourisme & Voyages",
      description: "Découvrez des destinations incroyables avec nos packages sur mesure et notre assistance visa rapide.",
      icon: <Plane className="w-8 h-8 text-sky-500" />,
      link: "/tourisme",
      color: "bg-sky-50 border-sky-100",
      delay: 0.2
    },
    {
      title: "Études à l'Étranger",
      description: "Accompagnement complet pour vos admissions universitaires au Canada, en France, au UK et bien plus.",
      icon: <GraduationCap className="w-8 h-8 text-blue-600" />,
      link: "/etudes",
      color: "bg-blue-50 border-blue-100",
      delay: 0.4
    },
    {
      title: "Immigration & Résidence",
      description: "Des experts qualifiés pour gérer vos processus d'immigration (Travailleurs, Entrée Express, Regroupement).",
      icon: <FileText className="w-8 h-8 text-amber-500" />,
      link: "/immigration",
      color: "bg-amber-50 border-amber-100",
      delay: 0.6
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Navbar Simple */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Logo Oussama Travel */}
            <div className="font-bold flex items-center gap-2">
              <span className="text-2xl text-gray-900 tracking-wider">OUSSAMA</span>
              <span className="text-3xl text-amber-500" style={{ fontFamily: 'cursive' }}>Travel</span>
            </div>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link href="#services" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Services</Link>
            <Link href="#about" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">À Propos</Link>
            <Link href="/dashboard" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Espace Client</Link>
          </div>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <button className="px-5 py-2.5 text-sky-700 font-medium hover:bg-sky-50 rounded-full transition-colors">
                Connexion
              </button>
            </Link>
            <Link href="/auth/register">
              <button className="px-5 py-2.5 bg-amber-400 text-gray-900 font-bold rounded-full hover:bg-amber-500 shadow-lg shadow-amber-200 transition-all">
                Démarrer
              </button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-50 text-amber-700 font-medium text-sm mb-8 border border-amber-200"
        >
          <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
          <span>Agence Certifiée & Reconnue</span>
        </motion.div>

        <motion.h1
          {...fadeIn}
          className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight leading-tight mb-8"
        >
          Votre Avenir, <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-500 via-blue-500 to-amber-500">
            Notre Expertise.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-xl text-gray-600 mb-12 max-w-2xl leading-relaxed"
        >
          De l'obtention de visas touristiques aux admissions universitaires internationales et processus d'immigration complexes, nous vous accompagnons à chaque étape.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/auth/register">
            <button className="px-8 py-4 bg-sky-500 text-white rounded-full font-bold text-lg hover:bg-sky-600 transition-all shadow-xl shadow-sky-200 flex items-center justify-center gap-2">
              Créer mon dossier
              <ArrowRight className="w-5 h-5" />
            </button>
          </Link>
          <button className="px-8 py-4 bg-white text-gray-900 rounded-full font-bold text-lg hover:bg-gray-50 transition-all border shadow-sm flex items-center justify-center gap-2">
            Découvrir nos services
          </button>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left mb-16 flex flex-col md:flex-row md:items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Vos Projets, Nos Solutions</h2>
              <p className="text-lg text-gray-600 max-w-2xl">
                Nous offrons une gamme complète de services spécialisés pour répondre à vos ambitions internationales avec l'excellence Oussama Travel.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Link href={service.link} key={index} className="block">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: service.delay }}
                  whileHover={{ y: -5 }}
                  className={`p-8 rounded-3xl border transition-all cursor-pointer ${service.color} hover:shadow-xl h-full`}
                >
                  <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">{service.title}</h3>
                  <p className="text-gray-600 mb-8 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="flex items-center font-bold text-gray-900 gap-2 group mt-auto">
                    En savoir plus
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Cercles décoratifs aux couleurs du logo */}
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-sky-500/10 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/10 blur-[100px] rounded-full -translate-x-1/2 translate-y-1/2"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">Pourquoi 10,000+ clients croient en Oussama Travel ?</h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Notre plateforme intègre un espace client ultra-sécurisé vous permettant de suivre l'avancement de votre dossier en temps réel et de téléverser vos documents en toute confidentialité.
              </p>
              <div className="space-y-5">
                {[
                  "Processus 100% digitalisé et transparent",
                  "Experts dédiés pour chaque service (Étude & Immigration)",
                  "Taux de réussite record de 98% sur les visas",
                  "Support client réactif et personnalisé 7j/7"
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-amber-400" />
                    </div>
                    <span className="text-gray-200 font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 mb-2">98%</div>
                <div className="text-gray-300 font-medium">Taux d'acceptation</div>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:bg-white/10 transition-colors translate-y-8">
                <div className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-2">15+</div>
                <div className="text-gray-300 font-medium">Pays partenaires</div>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                <div className="text-5xl font-extrabold text-white mb-2">24h</div>
                <div className="text-gray-300 font-medium">Temps de réponse</div>
              </div>
              <div className="p-8 bg-white/5 backdrop-blur-lg border border-white/10 rounded-3xl hover:bg-white/10 transition-colors translate-y-8">
                <ShieldCheck className="w-12 h-12 text-sky-400 mb-4" />
                <div className="text-gray-300 font-medium leading-tight">Paiement en ligne ultra-sécurisé</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-gradient-to-b from-white to-sky-50">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Prêt à décoller vers votre projet ?</h2>
          <p className="text-xl text-gray-600 mb-10">
            Créez votre compte gratuitement, téléversez vos documents et laissez les experts de Oussama Travel s'occuper du reste.
          </p>
          <Link href="/auth/register">
            <button className="px-10 py-5 bg-amber-400 text-gray-900 rounded-full font-bold text-lg hover:bg-amber-500 shadow-xl shadow-amber-200/50 transition-all">
              Créer mon Espace Client
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}
