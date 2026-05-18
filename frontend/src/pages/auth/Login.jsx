import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Purana error hatayo

        try {
            const role = await login(email, password);
            // Role ke hisaab sahi dashboard par bhej do
            navigate(`/${role.toLowerCase()}/dashboard`);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen bg-[#070c16] flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-[#0f172a] p-8 rounded-2xl border border-white/10 shadow-2xl">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-500 shadow-lg shadow-teal-500/30 mb-4">
                        <span className="text-white font-extrabold text-xl">AI</span>
                    </div>
                    <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                    <p className="text-sm text-slate-500 mt-1">Sign in to AI Clinic Smart</p>
                </div>

                {/* Error Message Box */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="text-sm font-medium text-slate-400">Email Address</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full mt-1 p-3 rounded-lg bg-[#070c16] border border-white/10 text-white focus:border-teal-500 outline-none transition"
                            placeholder="e.g. doctor@clinic.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="text-sm font-medium text-slate-400">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 p-3 rounded-lg bg-[#070c16] border border-white/10 text-white focus:border-teal-500 outline-none transition"
                            placeholder="Enter 123456"
                            required
                        />
                    </div>
                    <button type="submit" className="w-full py-3 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white font-bold rounded-lg transition-all duration-300 shadow-lg shadow-teal-500/30">
                        Sign In
                    </button>
                </form>

                {/* Demo Credentials Helper for Judges */}
                <div className="mt-6 p-4 bg-[#070c16] rounded-lg border border-dashed border-white/10">
                    <p className="text-xs text-slate-500 text-center mb-2 font-bold uppercase tracking-wider">Demo Accounts (Password: 123456)</p>
                    <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
                        <p className="cursor-pointer hover:text-teal-400 truncate" onClick={() => { setEmail("admin@clinic.com"); setPassword("123456") }}>Admin</p>
                        <p className="cursor-pointer hover:text-teal-400 truncate" onClick={() => { setEmail("doctor@clinic.com"); setPassword("123456") }}>Doctor</p>
                        <p className="cursor-pointer hover:text-teal-400 truncate" onClick={() => { setEmail("reception@clinic.com"); setPassword("123456") }}>Receptionist</p>
                        <p className="cursor-pointer hover:text-teal-400 truncate" onClick={() => { setEmail("patient@clinic.com"); setPassword("123456") }}>Patient</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;