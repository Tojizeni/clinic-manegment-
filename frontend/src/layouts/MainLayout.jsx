import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import TopNavbar from "./TopNabvar";
import Sidebar from "./Slidebar";

const MainLayout = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    const toggleSidebar = () => {
        if (window.innerWidth < 1024) {
            setIsMobileOpen(!isMobileOpen);
        } else {
            setIsCollapsed(!isCollapsed);
        }
    };

    const closeMobile = () => setIsMobileOpen(false);

    return (
        <div className="min-h-screen bg-[#070c16] text-white">
            <TopNavbar toggleSidebar={toggleSidebar} />
            <Sidebar
                isCollapsed={isCollapsed}
                isMobileOpen={isMobileOpen}
                closeMobile={closeMobile}
            />

            <main className={`pt-16 transition-all duration-300 ${isCollapsed ? "lg:pl-20" : "lg:pl-64"}`}>
                <div className="p-6">
                    <Outlet />
                </div>
            </main>

            <style jsx>{`
                @keyframes slide-in {
                    from { transform: translateX(-100%); }
                    to { transform: translateX(0); }
                }
                .animate-slide-in {
                    animation: slide-in 0.3s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default MainLayout;