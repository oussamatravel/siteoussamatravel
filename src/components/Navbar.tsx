"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowRight, User } from "lucide-react";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const pathname = usePathname();
    const isHome = pathname === "/";
    const isDashboard = pathname.startsWith("/dashboard");
    const isAuth = pathname.startsWith("/auth");
    const isAdmin = pathname.startsWith("/admin");

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    if (isDashboard || isAuth || isAdmin) return null;

    const navLinks = [
        { name: "À Propos", href: "/a-propos" },
        { name: "Services", href: "/#services" },
        { name: "Tourisme", href: "/tourisme" },
        { name: "Études", href: "/etudes" },
        { name: "Immigration", href: "/immigration" },
        { name: "Actualités", href: "/blog" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <header className="fixed top-0 w-full z-[100] px-4 py-6 md:px-10 pointer-events-none">
            <motion.nav
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className={`max-w-7xl mx-auto h-20 md:h-24 rounded-[2rem] border transition-all duration-500 pointer-events-auto flex items-center justify-between px-8 relative
                ${(isScrolled || !isHome)
                        ? "bg-sky-950/90 backdrop-blur-2xl border-sky-800 shadow-[0_20px_50px_rgba(7,89,133,0.3)] py-4"
                        : "bg-sky-900/30 backdrop-blur-xl border-white/10 shadow-lg py-6"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <img
                        src="/logo.png"
                        alt="Oussama Travel Logo"
                        className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform"
                        style={{ minWidth: '150px' }}
                    />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-1">
                    {navLinks.map((link) => {
                        const isActive = pathname === link.href;
                        return (
                            <Link
                                key={link.name}
                                href={link.href}
                                className="relative px-4 py-2 text-[13px] font-bold uppercase tracking-[0.15em] transition-all group shrink-0 text-white"
                            >
                                <span className={`relative z-10 transition-colors group-hover:text-amber-400 ${isActive ? "text-amber-400" : ""}`}>
                                    {link.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-white/5 rounded-xl -z-0"
                                    />
                                )}
                                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-amber-400 transition-all group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full shadow-[0_0_10px_#fbbf24]"></span>
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <Link href="/dashboard">
                        <button className="flex items-center gap-2 px-5 py-2.5 text-[11px] font-black uppercase tracking-widest rounded-full transition-all border text-white border-white/20 hover:bg-white/10">
                            <User className="w-4 h-4 text-amber-400" />
                            Espace Client
                        </button>
                    </Link>
                    <Link href="/auth/register">
                        <button className={`px-6 py-2.5 font-black text-[11px] uppercase tracking-widest rounded-full transition-all shadow-xl flex items-center gap-2 group
                            ${(isScrolled || !isHome)
                                ? "bg-amber-400 text-sky-950 hover:bg-white hover:scale-105 shadow-amber-500/20"
                                : "bg-white text-sky-950 hover:bg-amber-400 hover:scale-105 shadow-white/20"
                            }`}>
                            Décoller
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </Link>
                </div>

                {/* Mobile Toggle */}
                <button
                    className="lg:hidden p-3 rounded-2xl transition-colors bg-white/10 text-white"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6 text-amber-400" />}
                </button>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 20, scale: 0.95 }}
                            className="absolute top-[calc(100%+10px)] left-0 right-0 lg:hidden bg-sky-950/95 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-sky-800 overflow-hidden z-50 p-6 space-y-2"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 text-sky-100 hover:text-amber-400 font-black uppercase tracking-widest text-sm group"
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-amber-400" />
                                </Link>
                            ))}
                            <div className="pt-4 border-t border-sky-800 grid grid-cols-2 gap-3 mt-4">
                                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 text-white font-black uppercase tracking-widest text-[10px] border border-sky-800 rounded-2xl hover:bg-white/5">Connexion</button>
                                </Link>
                                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 bg-amber-400 text-sky-950 font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-amber-500/20">Rejoindre</button>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
