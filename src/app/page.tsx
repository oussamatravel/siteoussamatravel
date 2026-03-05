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
            <Link href="/contact" className="text-gray-600 hover:text-sky-600 font-medium transition-colors">Contact</Link>
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

      {/* Testimonials Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Ils nous ont fait confiance</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Découvrez les retours d'expérience de nos clients qui ont réalisé leurs projets avec Oussama Travel.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Amine Belkacem",
                role: "Étudiant au Canada",
                text: "Oussama Travel m'a accompagné de A à Z pour mon visa étudiant. Leur plateforme est révolutionnaire, j'ai pu suivre mon dossier en temps réel !",
                image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=256&h=256&auto=format&fit=crop",
                rating: 5
              },
              {
                name: "Sonia Merad",
                role: "Voyageuse - Dubaï",
                text: "Service exceptionnel ! Mon visa pour Dubaï a été obtenu en 48h. L'équipe est d'un professionnalisme rare. Je recommande les yeux fermés.",
                image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=256&h=256&auto=format&fit=crop",
                rating: 5
              },
              {
                name: "Karim Brahimi",
                role: "Résident Permanent - France",
                text: "Après plusieurs refus ailleurs, l'expertise juridique d'Oussama Travel a fait la différence pour mon dossier d'immigration. Un grand merci !",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=256&h=256&auto=format&fit=crop",
                rating: 5
              }
            ].map((testimonial, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 hover:shadow-2xl hover:bg-white transition-all group"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-8 leading-relaxed text-lg">
                  "{testimonial.text}"
                </p>
                <div className="flex items-center gap-4 border-t border-slate-100 pt-6">
                  <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-white shadow-md">
                    <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900">{testimonial.name}</h4>
                    <p className="text-sm font-bold text-sky-600 uppercase tracking-tighter">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold text-gray-900 mb-4">Questions Fréquentes</h2>
            <p className="text-lg text-gray-600">
              Tout ce que vous devez savoir pour démarrer votre projet sereinement.
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "Quels sont les documents de base nécessaires ?",
                a: "Pour la plupart des procédures, vous aurez besoin d'un passeport valide (minimum 6 mois), de photos d'identité aux normes, et de vos relevés de comptes récents. La liste complète s'affiche dès que vous créez votre dossier dans votre espace client."
              },
              {
                q: "Combien de temps prend le traitement d'un dossier ?",
                a: "Le temps varie selon la destination et le type de visa. Un visa touristique Dubaï prend 48h-72h, tandis qu'une admission universitaire peut prendre 2 à 4 semaines. Oussama Travel s'engage à traiter vos documents en moins de 24h après réception."
              },
              {
                q: "Est-ce que le paiement en ligne est sécurisé ?",
                a: "Absolument. Nous utilisons des protocoles de chiffrement SSL de bout en bout. Vos coordonnées bancaires ne sont jamais stockées sur nos serveurs. Nous acceptons CIB, CCP (virement) et les paiements directs à l'agence."
              },
              {
                q: "Aidez-vous pour la préparation de l'entretien ?",
                a: "Oui, c'est l'une de nos forces. Nous organisons des simulations d'entretiens consulaires pour les visas études et immigration afin de maximiser vos chances de réussite."
              }
            ].map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm"
              >
                <details className="group">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <h3 className="text-lg font-bold text-slate-900">{faq.q}</h3>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-open:rotate-180 transition-transform">
                      <Plus className="w-4 h-4 text-slate-400" />
                    </div>
                  </summary>
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-slate-50 bg-slate-50/30">
                    {faq.a}
                  </div>
                </details>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-sky-50/50"></div>
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">Prêt à décoller vers <br /> votre projet ?</h2>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Rejoignez plus de 10,000 clients satisfaits. Créez votre compte gratuitement et laissez-nous gérer la complexité.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/auth/register">
                <button className="px-10 py-5 bg-slate-900 text-white rounded-full font-black text-lg hover:bg-slate-800 shadow-2xl transition-all flex items-center gap-3 group">
                  Créer mon Espace Client
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
              <div className="flex items-center gap-2 px-6 py-5 text-slate-500 font-bold border border-slate-200 rounded-full bg-white shadow-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                Sans frais d'inscription
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
