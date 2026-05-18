import React from "react";

const PageShell = ({ title, description }) => {
    return (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <div className="p-6 bg-[#0f172a] rounded-2xl border border-white/5 max-w-md w-full">
                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-teal-500/10 flex items-center justify-center">
                    <svg className="w-8 h-8 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
                </div>
                <h1 className="text-xl font-bold text-white mb-2">{title}</h1>
                <p className="text-sm text-slate-500 mb-6">{description}</p>
                <div className="px-4 py-2 bg-teal-500/10 border border-teal-500/20 rounded-lg inline-block">
                    <span className="text-xs font-bold text-teal-400">COMING SOON</span>
                </div>
            </div>
        </div>
    );
};

export default PageShell;