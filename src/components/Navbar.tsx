"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "À Propos", href: "/a-propos" },
        { name: "Services", href: "/#services" },
        { name: "Tourisme", href: "/tourisme" },
        { name: "Études", href: "/etudes" },
        { name: "Immigration", href: "/immigration" },
        { name: "Actualités", href: "/blog" },
        { name: "Contact", href: "/contact" },
        { name: "Espace Client", href: "/dashboard" },
    ];

    return (
        <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${(isScrolled || !isHome)
            ? "bg-white shadow-xl h-20 border-b border-slate-100"
            : "bg-white/60 backdrop-blur-xl h-24 border-b border-white/20"
            }`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <img
                        src="/logo.png"
                        alt="Oussama Travel Logo"
                        className="h-12 md:h-16 w-auto object-contain group-hover:scale-105 transition-transform"
                        style={{ minWidth: '150px' }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`text-sm font-black uppercase tracking-widest transition-colors ${(isScrolled || !isHome)
                                ? "text-slate-900 hover:text-sky-600"
                                : "text-slate-900 md:text-white/90 md:hover:text-white"
                                }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center space-x-4">
                    <Link href="/auth/login">
                        <button className={`px-6 py-2.5 text-sm font-black uppercase tracking-widest transition-all rounded-full ${(isScrolled || !isHome)
                            ? "text-slate-900 hover:bg-slate-50 border border-slate-200"
                            : "text-white hover:bg-white/10"
                            }`}>
                            Connexion
                        </button>
                    </Link>
                    <Link href="/auth/register">
                        <button className="px-6 py-2.5 bg-amber-400 text-slate-900 font-black text-sm uppercase tracking-widest rounded-full hover:bg-amber-500 shadow-xl shadow-amber-500/20 transition-all flex items-center gap-2">
                            Décoller
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-2 text-slate-900 md:text-white mix-blend-difference"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="lg:hidden bg-white border-b border-slate-100 overflow-hidden"
                    >
                        <div className="p-6 space-y-4">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="block text-lg font-black text-slate-900 hover:text-sky-600 transition-colors uppercase tracking-widest"
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 text-slate-600 font-black uppercase tracking-widest">Connexion</button>
                                </Link>
                                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 bg-amber-400 text-slate-900 font-black rounded-2xl uppercase tracking-widest">Démarrer</button>
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
