import React, { useState } from 'react';
import toast from 'react-hot-toast';

const DoctorDashboard = () => {
    const [appointments, setAppointments] = useState([
        { id: 1, patient: "Ahmed Hassan", time: "09:00 AM", status: "Waiting", reason: "Severe Headache" },
        { id: 2, patient: "Sana Khan", time: "09:30 AM", status: "Waiting", reason: "Flu Symptoms" },
        { id: 3, patient: "Bilal Ahmed", time: "10:00 AM", status: "Waiting", reason: "Follow-up Checkup" },
    ]);

    const [activePatient, setActivePatient] = useState(null);

    // Start Consultation
    const handleStart = (id) => {
        setAppointments(appointments.map(apt =>
            apt.id === id ? { ...apt, status: "In-Progress" } : apt
        ));
        const patient = appointments.find(a => a.id === id);
        setActivePatient(patient);
        toast.success(`Consultation started with ${patient.patient}`);
    };

    // Complete & Write Prescription
    const handleComplete = () => {
        setAppointments(appointments.map(apt =>
            apt.id === activePatient.id ? { ...apt, status: "Completed" } : apt
        ));
        toast.success(`Prescription saved for ${activePatient.patient}!`);
        setActivePatient(null); // Hide form
    };

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-white">My Dashboard</h1>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-400">Waiting</p>
                        <p className="text-2xl font-bold text-yellow-400">{appointments.filter(a => a.status === 'Waiting').length}</p>
                    </div>
                    <div className="p-3 bg-yellow-500/10 rounded-lg text-yellow-500">⏳</div>
                </div>
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-400">In-Progress</p>
                        <p className="text-2xl font-bold text-blue-400">{appointments.filter(a => a.status === 'In-Progress').length}</p>
                    </div>
                    <div className="p-3 bg-blue-500/10 rounded-lg text-blue-500">🩺</div>
                </div>
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5 flex justify-between items-center">
                    <div>
                        <p className="text-sm text-slate-400">Completed</p>
                        <p className="text-2xl font-bold text-green-400">{appointments.filter(a => a.status === 'Completed').length}</p>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg text-green-500">✅</div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Patient Queue List */}
                <div className="lg:col-span-2 bg-[#0f172a] rounded-xl border border-white/5 p-4">
                    <h2 className="text-lg font-bold text-white mb-4">Patient Queue</h2>
                    <div className="space-y-3">
                        {appointments.map(apt => (
                            <div key={apt.id} className={`flex items-center justify-between p-4 rounded-lg border transition-all ${activePatient?.id === apt.id ? "bg-blue-500/10 border-blue-500/30" : "bg-[#070c16] border-white/5"}`}>
                                <div>
                                    <p className="text-white font-semibold">{apt.patient}</p>
                                    <p className="text-xs text-slate-500">{apt.time} - {apt.reason}</p>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`text-xs px-2 py-1 rounded-full font-medium
                                        ${apt.status === 'Waiting' ? 'bg-yellow-500/20 text-yellow-400' :
                                            apt.status === 'In-Progress' ? 'bg-blue-500/20 text-blue-400' :
                                                'bg-green-500/20 text-green-400'}`}
                                    >
                                        {apt.status}
                                    </span>
                                    {apt.status === "Waiting" && (
                                        <button
                                            onClick={() => handleStart(apt.id)}
                                            className="px-3 py-1 bg-teal-500 text-white text-xs font-bold rounded-lg hover:bg-teal-600 transition"
                                        >
                                            Start
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Prescription Writer (Right Side - Appears when active) */}
                <div className="bg-[#0f172a] rounded-xl border border-white/5 p-4 h-fit">
                    {activePatient ? (
                        <>
                            <h2 className="text-lg font-bold text-white mb-1">Write Prescription</h2>
                            <p className="text-xs text-slate-500 mb-4">Patient: <span className="text-teal-400">{activePatient.patient}</span></p>

                            <div className="space-y-3">
                                <div>
                                    <label className="text-xs text-slate-400">Diagnosis</label>
                                    <input type="text" placeholder="e.g., Viral Fever" className="w-full mt-1 p-2 rounded-lg bg-[#070c16] border border-white/10 text-white text-sm focus:border-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400">Medicine 1</label>
                                    <input type="text" placeholder="e.g., Panadol 500mg" className="w-full mt-1 p-2 rounded-lg bg-[#070c16] border border-white/10 text-white text-sm focus:border-teal-500 outline-none" />
                                </div>
                                <div>
                                    <label className="text-xs text-slate-400">Notes</label>
                                    <textarea rows="2" placeholder="Rest for 2 days..." className="w-full mt-1 p-2 rounded-lg bg-[#070c16] border border-white/10 text-white text-sm focus:border-teal-500 outline-none resize-none" />
                                </div>

                                <button
                                    onClick={handleComplete}
                                    className="w-full py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-bold rounded-lg hover:opacity-90 transition mt-2"
                                >
                                    Complete & Save Prescription
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center py-10 text-slate-500">
                            <p className="text-4xl mb-2">📋</p>
                            <p className="text-sm">Select a patient to start consultation</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
};

export default DoctorDashboard;