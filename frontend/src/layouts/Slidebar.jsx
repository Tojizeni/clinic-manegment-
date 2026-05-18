import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Icons from "../components/Icon";

const sidebarLinks = {
    Admin: [
        { name: "Dashboard", path: "/admin/dashboard", icon: "grid" },
        { name: "Manage Doctors", path: "/admin/doctors", icon: "users" },
        { name: "Manage Staff", path: "/admin/receptionists", icon: "userCheck" },
        { name: "Analytics", path: "/admin/analytics", icon: "chart" },
        { name: "Subscriptions", path: "/admin/subscriptions", icon: "creditCard" },
    ],
    Doctor: [
        { name: "My Dashboard", path: "/doctor/dashboard", icon: "grid" },
        { name: "Appointments", path: "/doctor/appointments", icon: "calendar" },
        { name: "Patients & History", path: "/doctor/patients", icon: "folder" },
        { name: "AI Symptom Checker", path: "/doctor/ai-checker", icon: "brain" },
    ],
    Receptionist: [
        { name: "Dashboard", path: "/reception/dashboard", icon: "grid" },
        { name: "Register Patient", path: "/reception/register", icon: "userPlus" },
        { name: "Manage Schedule", path: "/reception/schedule", icon: "calendar" },
        { name: "Patient Directory", path: "/reception/directory", icon: "users" },
    ],
    Patient: [
        { name: "My Profile", path: "/patient/profile", icon: "user" },
        { name: "Appointments", path: "/patient/appointments", icon: "calendar" },
        { name: "My Prescriptions", path: "/patient/prescriptions", icon: "document" },
        { name: "AI Explanations", path: "/patient/ai-explanations", icon: "brain" },
    ]
};

const Sidebar = ({ isCollapsed, isMobileOpen, closeMobile }) => {
    const { user } = useContext(AuthContext);
    const location = useLocation();

    if (!user) return null;

    const links = sidebarLinks[user.role] || [];

    const SidebarContent = () => (
        <div className="flex flex-col h-full bg-[#0B1120] border-r border-white/5">
            <div className={`p-4 border-b border-white/5 ${isCollapsed ? "px-2" : ""}`}>
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-teal-500/10 text-teal-400 shrink-0">
                        <Icons name="grid" className="w-5 h-5" />
                    </div>
                    {!isCollapsed && (
                        <div>
                            <p className="text-sm font-bold text-white">{user.role} Panel</p>
                            <p className="text-[10px] text-slate-500 truncate">Manage your section</p>
                        </div>
                    )}
                </div>
            </div>

            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
                {links.map((link) => {
                    const isActive = location.pathname === link.path;
                    return (
                        <Link
                            key={link.name}
                            to={link.path}
                            onClick={closeMobile}
                            className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group
                                ${isActive
                                    ? "bg-gradient-to-r from-teal-500/20 to-cyan-500/10 text-teal-400 border border-teal-500/20"
                                    : "text-slate-400 hover:text-white hover:bg-white/5"
                                }
                                ${isCollapsed ? "justify-center" : ""}
                            `}
                            title={isCollapsed ? link.name : ""}
                        >
                            <Icons name={link.icon} className={`w-5 h-5 shrink-0 ${isActive ? "text-teal-400" : "text-slate-500 group-hover:text-white"}`} />
                            {!isCollapsed && <span>{link.name}</span>}
                        </Link>
                    );
                })}
            </nav>

            {!isCollapsed && (
                <div className="p-3 mt-auto">
                    <div className="p-4 rounded-xl bg-gradient-to-br from-teal-900/40 to-cyan-900/20 border border-teal-500/10">
                        <p className="text-xs font-bold text-white mb-1">Need Help?</p>
                        <p className="text-[10px] text-slate-400 mb-3">Check our docs or contact support</p>
                        <button className="w-full text-xs font-bold bg-teal-500 hover:bg-teal-400 text-white py-1.5 rounded-lg transition-colors">
                            Support
                        </button>
                    </div>
                </div>
            )}
        </div>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className={`hidden lg:block fixed top-16 left-0 h-[calc(100vh-4rem)] bg-[#0B1120] border-r border-white/5 transition-all duration-300 z-40 ${isCollapsed ? "w-20" : "w-64"}`}>
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {isMobileOpen && (
                <div className="lg:hidden fixed inset-0 z-40 flex">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={closeMobile}></div>
                    <aside className="relative w-64 h-full z-50 animate-slide-in">
                        <SidebarContent />
                    </aside>
                </div>
            )}
        </>
    );
};

export default Sidebar;