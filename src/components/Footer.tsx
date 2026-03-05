"use client";

import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    Twitter,
    Mail,
    Phone,
    MapPin,
    ExternalLink,
    ArrowRight
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-white pt-24 pb-12 overflow-hidden relative">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-sky-500/5 blur-[120px] rounded-full translate-x-1/2 -translate-y-1/2"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
                    {/* Brand Section */}
                    <div className="space-y-8">
                        <Link href="/" className="inline-block">
                            <img
                                src="/logo.png"
                                alt="Oussama Travel"
                                className="h-16 w-auto object-contain brightness-0 invert"
                            />
                        </Link>
                        <p className="text-slate-400 font-medium leading-relaxed">
                            Votre agence de confiance pour le tourisme, les études et l'immigration. Nous transformons vos rêves internationaux en réalité.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-amber-400 hover:text-slate-900 transition-all border border-white/10">
                                    <Icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-amber-400">Navigation</h4>
                        <ul className="space-y-4">
                            {[
                                { name: "Accueil", href: "/" },
                                { name: "À Propos", href: "/a-propos" },
                                { name: "Services", href: "/#services" },
                                { name: "Études", href: "/etudes" },
                                { name: "Immigration", href: "/immigration" },
                                { name: "Contact", href: "/contact" },
                                { name: "Blog", href: "/blog" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                                        <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services */}
                    <div>
                        <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-sky-400">Nos Services</h4>
                        <ul className="space-y-4">
                            {[
                                "Visas Touristiques",
                                "Admissions Universitaires",
                                "Immigration Canada",
                                "Regroupement Familial",
                                "Assistance Visa Schengen",
                            ].map((service) => (
                                <li key={service} className="text-slate-400 hover:text-white transition-colors flex items-center gap-2 cursor-pointer group">
                                    <div className="w-1 h-1 rounded-full bg-sky-500 group-hover:scale-150 transition-transform"></div>
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="text-lg font-black mb-8 uppercase tracking-widest text-emerald-400">Contact</h4>
                        <ul className="space-y-6">
                            <li className="flex gap-4">
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
                                    <MapPin className="w-5 h-5 text-emerald-400" />
                                </div>
                                <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                    Cité des Bananiers, Bab Ezzouar<br />
                                    Alger, Algérie
                                </p>
                            </li>
                            <li className="flex gap-4 group cursor-pointer" onClick={() => window.open("tel:+213770419460")}>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-sky-500/20 transition-colors">
                                    <Phone className="w-5 h-5 text-sky-400" />
                                </div>
                                <p className="text-slate-400 text-sm font-black flex flex-col justify-center">
                                    +213 770 41 94 60
                                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Support 7j/7</span>
                                </p>
                            </li>
                            <li className="flex gap-4 group cursor-pointer" onClick={() => window.open("mailto:directeur.ota@gmail.com")}>
                                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10 group-hover:bg-emerald-500/20 transition-colors">
                                    <Mail className="w-5 h-5 text-emerald-400" />
                                </div>
                                <p className="text-slate-400 text-sm font-black flex flex-col justify-center">
                                    directeur.ota@gmail.com
                                    <span className="text-[10px] text-slate-500 uppercase tracking-tighter">Réponse en 24h</span>
                                </p>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <p className="text-slate-500 text-sm font-medium">
                        © {new Date().getFullYear()} Oussama Travel Algeria. Tous droits réservés.
                    </p>
                    <div className="flex gap-8 text-slate-500 text-sm font-medium">
                        <Link href="/legal/mentions-legales" className="hover:text-white transition-colors">Mentions Légales</Link>
                        <Link href="/legal/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
                    </div>
                </div>
            </div>

            {/* Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent"></div>
        </footer>
    );
}
