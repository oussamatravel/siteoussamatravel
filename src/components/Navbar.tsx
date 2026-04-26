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
    const [isAdmin, setIsAdmin] = useState(false);
    const [canInstall, setCanInstall] = useState(false);

    useEffect(() => {
        setIsAdmin(pathname.startsWith("/admin"));

        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);

        const checkInstall = () => {
            if ((window as any).deferredPrompt) {
                setCanInstall(true);
            }
        };

        const interval = setInterval(checkInstall, 1000);
        return () => {
            window.removeEventListener("scroll", handleScroll);
            clearInterval(interval);
        };
    }, [pathname]);

    const handleInstallClick = async () => {
        const promptEvent = (window as any).deferredPrompt;
        if (!promptEvent) return;
        promptEvent.prompt();
        const { outcome } = await promptEvent.userChoice;
        console.log(`User response to the install prompt: ${outcome}`);
        (window as any).deferredPrompt = null;
        setCanInstall(false);
    };

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
                className={`max-w-7xl mx-auto h-20 md:h-24 rounded-[2.5rem] border transition-all duration-500 pointer-events-auto flex items-center justify-between px-10 relative
                ${(isScrolled || !isHome)
                        ? "bg-white/80 backdrop-blur-2xl border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.05)] py-4"
                        : "bg-white/40 backdrop-blur-xl border-white/50 shadow-xl py-6"
                    }`}
            >
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group shrink-0">
                    <img
                        src="/logo.png"
                        alt="Oussama Travel Logo"
                        className="h-10 md:h-12 w-auto object-contain group-hover:scale-105 transition-transform brightness-0 invert-0"
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
                                className="relative px-5 py-2 text-[11px] font-black uppercase tracking-[0.2em] transition-all group shrink-0 text-slate-600"
                            >
                                <span className={`relative z-10 transition-colors group-hover:text-blue-600 ${isActive ? "text-blue-600" : ""}`}>
                                    {link.name}
                                </span>
                                {isActive && (
                                    <motion.div
                                        layoutId="activeNav"
                                        className="absolute inset-0 bg-blue-500/5 rounded-xl -z-0"
                                    />
                                )}
                            </Link>
                        );
                    })}
                </div>

                {/* Auth Buttons */}
                <div className="hidden lg:flex items-center gap-4 shrink-0">
                    <Link href="/dashboard">
                        <button className="flex items-center gap-2 px-6 py-3 text-[10px] font-black uppercase tracking-widest rounded-full transition-all border text-slate-600 border-slate-200 hover:bg-slate-50">
                            <User className="w-4 h-4 text-blue-600" />
                            Client
                        </button>
                    </Link>
                    <Link href="/auth/register">
                        <button className={`px-8 py-3 font-black text-[10px] uppercase tracking-widest rounded-full transition-all shadow-xl flex items-center gap-2 group
                            ${(isScrolled || !isHome)
                                ? "bg-slate-950 text-white hover:bg-blue-600 hover:scale-105"
                                : "bg-blue-600 text-white hover:bg-slate-950 hover:scale-105"
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
                            className="absolute top-[calc(100%+10px)] left-0 right-0 lg:hidden bg-white/90 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-200 overflow-hidden z-50 p-8 space-y-2"
                        >
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 text-slate-600 hover:text-blue-600 font-black uppercase tracking-widest text-sm group"
                                >
                                    {link.name}
                                    <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-blue-600" />
                                </Link>
                            ))}
                            <div className="pt-6 border-t border-slate-100 grid grid-cols-2 gap-4 mt-4">
                                <Link href="/auth/login" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 text-slate-600 font-black uppercase tracking-widest text-[10px] border border-slate-200 rounded-2xl hover:bg-slate-50">Connexion</button>
                                </Link>
                                <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                                    <button className="w-full py-4 bg-slate-950 text-white font-black rounded-2xl uppercase tracking-widest text-[10px] shadow-lg shadow-slate-900/10">Rejoindre</button>
                                </Link>
                            </div>
                            {canInstall && (
                                <button
                                    onClick={handleInstallClick}
                                    className="w-full mt-4 py-4 bg-sky-500 text-white font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-lg flex items-center justify-center gap-2 animate-pulse"
                                >
                                    📥 Installer l'application officielle
                                </button>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.nav>
        </header>
    );
}
