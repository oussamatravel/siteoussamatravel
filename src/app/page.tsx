"use client";

import { motion } from "framer-motion";
import { Plane, GraduationCap, FileText, ArrowRight, CheckCircle2, Star, ShieldCheck, Plus } from "lucide-react";
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

      {/* Hero Section */}
      <section className="pt-52 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
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

      {/* Partners Section */}
      <section className="py-20 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">Ils nous soutiennent</h3>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale group hover:grayscale-0 transition-all duration-700">
              {/* Simulated Partner Logos */}
              {["Air Algérie", "Campus France", "IRCC Canada", "Emirates", "VFS Global"].map((partner, i) => (
                <div key={i} className="font-black text-2xl tracking-tighter text-slate-900 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-slate-900 text-white flex items-center justify-center text-xs">OTA</div>
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Stats */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
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

      {/* Success Stories Section */}
      <section className="py-24 bg-slate-50 overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-[4rem] overflow-hidden shadow-2xl aspect-[4/5] md:aspect-auto md:h-[600px]"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=1200&auto=format&fit=crop"
                className="w-full h-full object-cover"
                alt="Happy students"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 p-8 bg-white/10 backdrop-blur-xl rounded-[2.5rem] border border-white/20 text-white">
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />)}
                </div>
                <p className="text-lg font-bold italic mb-4">"Grâce à Oussama Travel, je commence ma nouvelle vie à Montréal ce lundi. Le processus a été fluide et sans stress."</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-amber-400 flex items-center justify-center text-slate-900 font-black">Y</div>
                  <div>
                    <div className="font-black">Yacine Kherroubi</div>
                    <div className="text-xs font-bold text-amber-400">Visa Résidence Permanente 2024</div>
                  </div>
                </div>
              </div>
            </motion.div>

            <div className="space-y-10">
              <h2 className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter leading-tight">
                Plus qu'une Agence, <br />
                <span className="text-sky-500 italic">Un Partenaire de Vie.</span>
              </h2>
              <div className="space-y-8">
                {[
                  { title: "Engagement Total", desc: "Nous ne dormons pas tant que votre visa n'est pas entre vos mains ou votre admission confirmée." },
                  { title: "Réseau Mondial", desc: "Collaborations directes avec des universités au Canada, en France, en Espagne et en Malaisie." },
                  { title: "Transparence Prix", desc: "Aucun frais caché. Chaque centime est justifié et sécurisé via notre plateforme." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6 group">
                    <div className="w-14 h-14 rounded-2xl bg-white shadow-xl flex items-center justify-center text-sky-500 font-black group-hover:bg-slate-900 group-hover:text-white transition-all transform group-hover:scale-110">
                      0{i + 1}
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 mb-2">{item.title}</h4>
                      <p className="text-slate-500 font-medium leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link href="/contact" className="inline-block">
                <button className="px-10 py-5 bg-sky-500 text-white rounded-full font-black text-lg hover:bg-sky-600 transition-all shadow-xl shadow-sky-500/20 active:scale-95">
                  Prendre Rendez-vous
                </button>
              </Link>
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

      {/* Latest Blog Posts Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Nos Dernières Actualités</h2>
              <p className="text-lg text-slate-500 max-w-2xl font-medium">
                Restez informé des changements de lois, des nouveaux processus de visa et des conseils de nos experts.
              </p>
            </div>
            <Link href="/blog">
              <button className="px-8 py-4 bg-slate-50 text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-all flex items-center gap-2 border border-slate-200 shadow-sm whitespace-nowrap">
                Voir tout le blog
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Nouvelles Directives Visa Études Canada 2024",
                category: "Immigration",
                image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=400&auto=format&fit=crop",
                tag: "Canada"
              },
              {
                title: "Top 5 des Destinations sans Visa pour les Algériens",
                category: "Tourisme",
                image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?q=80&w=400&auto=format&fit=crop",
                tag: "Voyages"
              },
              {
                title: "Réussir son Entretien Consulaire en 10 Étapes",
                category: "Conseils",
                image: "https://images.unsplash.com/photo-1521791136064-7986c2923216?q=80&w=400&auto=format&fit=crop",
                tag: "Visa"
              }
            ].map((post, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="relative h-64 rounded-[2rem] overflow-hidden mb-6 shadow-lg border border-slate-100">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-4 py-2 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-sky-600 shadow-sm">
                      {post.tag}
                    </span>
                  </div>
                </div>
                <h3 className="text-xl font-black text-slate-900 group-hover:text-sky-600 transition-colors leading-tight">
                  {post.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-sky-500 font-bold text-sm">
                  Lire l'article
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                </div>
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
