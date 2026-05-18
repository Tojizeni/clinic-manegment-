import React, { useState, useEffect, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Icons from "../components/Icon";

const TopNavbar = ({ toggleSidebar }) => {
    const { user, logout } = useContext(AuthContext);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const profileRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (profileRef.current && !profileRef.current.contains(e.target)) {
                setIsProfileOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    if (!user) return null;

    return (
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-[#0B1120] border-b border-white/10 flex items-center justify-between px-4 lg:px-6">

            {/* Left: Hamburger & Logo */}
            <div className="flex items-center gap-3">
                <button onClick={toggleSidebar} className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                </button>
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-lg shadow-teal-500/30">
                        <span className="text-white font-bold text-sm">AI</span>
                    </div>
                    <div className="hidden sm:block">
                        <h1 className="text-sm font-bold text-white leading-tight">AI Clinic Smart</h1>
                        <p className="text-[10px] text-slate-500 leading-tight">SaaS Platform</p>
                    </div>
                </Link>
            </div>

            {/* Right: Plan, Notifications, Profile */}
            <div className="flex items-center gap-3">
                <div className="hidden md:flex items-center px-2.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-400 mr-1.5"></span>
                    <span className="text-[11px] font-bold text-teal-400 uppercase tracking-wider">{user.plan}</span>
                </div>

                <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors">
                    <Icons name="calendar" className="w-5 h-5" />
                    <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#0B1120]"></span>
                </button>

                <div ref={profileRef} className="relative">
                    <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-white/10 transition-colors">
                        <img src={user.avatar} alt="Avatar" className="w-8 h-8 rounded-full object-cover border-2 border-teal-500/50" />
                        <div className="hidden md:block text-left">
                            <p className="text-sm font-semibold text-white leading-tight">{user.name}</p>
                            <p className="text-[10px] text-slate-500 leading-tight">{user.role}</p>
                        </div>
                        <svg className="w-4 h-4 text-slate-500 hidden md:block" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-2 w-56 bg-[#151f32] border border-white/10 rounded-xl shadow-2xl shadow-black/50 py-2 z-50">
                            <div className="px-4 py-2 border-b border-white/5 mb-2">
                                <p className="text-sm font-bold text-white">{user.name}</p>
                                <p className="text-xs text-slate-500">Role: {user.role}</p>
                            </div>
                            <Link to="/profile" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                <Icons name="user" className="w-4 h-4" /> Profile Settings
                            </Link>
                            <Link to="/billing" className="flex items-center gap-2 px-4 py-2 text-sm text-slate-300 hover:bg-white/5 hover:text-white">
                                <Icons name="creditCard" className="w-4 h-4" /> Billing & Plan
                            </Link>
                            <button onClick={logout} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 mt-2 border-t border-white/5 pt-3">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default TopNavbar;