import React, { useState } from 'react';
import toast from 'react-hot-toast';

const PatientDashboard = () => {
    // 1. Appointments State
    const [appointments, setAppointments] = useState([
        { id: 1, doctor: "Dr. Ali", specialty: "Cardiologist", date: "2023-11-25", time: "10:00 AM", status: "Upcoming" },
        { id: 2, doctor: "Dr. Sara", specialty: "Dermatologist", date: "2023-11-20", time: "02:00 PM", status: "Completed" },
    ]);

    // 2. Prescriptions State
    const [prescriptions] = useState([
        { id: 1, doctor: "Dr. Ali", date: "2023-11-20", diagnosis: "Mild Anxiety", meds: ["Prozac 20mg (1-0-1)", "Multivitamins (0-0-1)"] },
        { id: 2, doctor: "Dr. Sara", date: "2023-10-15", diagnosis: "Skin Allergy", meds: ["Cetirizine 10mg (0-0-1)", "Calamine Lotion (Local)"] },
    ]);

    // 3. Modal State (Book Appointment)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [newAppt, setNewAppt] = useState({ doctor: "Dr. Ali", date: "", time: "" });

    // Action: Book Appointment
    const handleBook = (e) => {
        e.preventDefault();
        if (!newAppt.date || !newAppt.time) return toast.error("Please fill all fields");

        const appointment = {
            id: Date.now(),
            doctor: newAppt.doctor,
            specialty: newAppt.doctor === "Dr. Ali" ? "Cardiologist" : "Dermatologist",
            date: newAppt.date,
            time: newAppt.time,
            status: "Upcoming"
        };

        setAppointments([appointment, ...appointments]);
        setIsModalOpen(false);
        setNewAppt({ doctor: "Dr. Ali", date: "", time: "" });
        toast.success("Appointment Booked Successfully!");
    };

    // Action: Cancel Appointment
    const handleCancel = (id) => {
        setAppointments(appointments.filter(apt => apt.id !== id));
        toast.success("Appointment Cancelled!");
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Welcome Back, Ahmed</h1>
                    <p className="text-slate-500 text-sm">Here is your health overview</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="px-5 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 text-white text-sm font-bold rounded-lg shadow-lg shadow-teal-500/30 hover:shadow-teal-500/50 transition-all"
                >
                    + Book Appointment
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-400">Upcoming Appointments</p>
                    <p className="text-3xl font-bold text-blue-400 mt-1">{appointments.filter(a => a.status === 'Upcoming').length}</p>
                </div>
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-400">Past Visits</p>
                    <p className="text-3xl font-bold text-green-400 mt-1">{appointments.filter(a => a.status === 'Completed').length}</p>
                </div>
                <div className="bg-[#0f172a] p-5 rounded-xl border border-white/5">
                    <p className="text-sm text-slate-400">Active Prescriptions</p>
                    <p className="text-3xl font-bold text-purple-400 mt-1">{prescriptions.length}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Left: Appointments List */}
                <div className="bg-[#0f172a] rounded-xl border border-white/5 p-4">
                    <h2 className="text-lg font-bold text-white mb-4">My Appointments</h2>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {appointments.map(apt => (
                            <div key={apt.id} className="p-4 bg-[#070c16] rounded-lg border border-white/5">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-white font-semibold">{apt.doctor}</p>
                                        <p className="text-xs text-slate-500">{apt.specialty}</p>
                                    </div>
                                    <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${apt.status === 'Upcoming' ? 'bg-blue-500/20 text-blue-400' : 'bg-green-500/20 text-green-400'}`}>
                                        {apt.status}
                                    </span>
                                </div>
                                <div className="flex justify-between items-center mt-3 border-t border-white/5 pt-3">
                                    <p className="text-xs text-slate-400">{apt.date} | {apt.time}</p>
                                    {apt.status === 'Upcoming' && (
                                        <button onClick={() => handleCancel(apt.id)} className="text-[11px] font-bold text-red-400 hover:text-red-300 transition">
                                            Cancel
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: Prescriptions List */}
                <div className="bg-[#0f172a] rounded-xl border border-white/5 p-4">
                    <h2 className="text-lg font-bold text-white mb-4">My Prescriptions</h2>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
                        {prescriptions.map(rx => (
                            <div key={rx.id} className="p-4 bg-[#070c16] rounded-lg border border-white/5">
                                <div className="flex justify-between items-start mb-2">
                                    <div>
                                        <p className="text-white font-semibold">{rx.diagnosis}</p>
                                        <p className="text-xs text-slate-500">By {rx.doctor}</p>
                                    </div>
                                    <span className="text-[10px] text-slate-500">{rx.date}</span>
                                </div>
                                <ul className="space-y-1 border-t border-white/5 pt-2">
                                    {rx.meds.map((med, i) => (
                                        <li key={i} className="text-xs text-teal-400 flex items-center gap-2">
                                            <span className="w-1 h-1 bg-teal-400 rounded-full"></span>
                                            {med}
                                        </li>
                                    ))}
                                </ul>
                                <button className="mt-3 text-xs font-bold text-slate-400 hover:text-white flex items-center gap-1 transition">
                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    Download PDF
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>

            {/* ===== MODAL: Book Appointment ===== */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
                    <div className="relative bg-[#151f32] border border-white/10 rounded-2xl p-6 w-full max-w-md shadow-2xl z-10">
                        <h3 className="text-xl font-bold text-white mb-4">Book New Appointment</h3>
                        <form onSubmit={handleBook} className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-400">Select Doctor</label>
                                <select
                                    value={newAppt.doctor}
                                    onChange={(e) => setNewAppt({ ...newAppt, doctor: e.target.value })}
                                    className="w-full mt-1 p-3 rounded-lg bg-[#070c16] border border-white/10 text-white outline-none focus:border-teal-500"
                                >
                                    <option value="Dr. Ali">Dr. Ali (Cardiologist)</option>
                                    <option value="Dr. Sara">Dr. Sara (Dermatologist)</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Date</label>
                                <input
                                    type="date"
                                    value={newAppt.date}
                                    onChange={(e) => setNewAppt({ ...newAppt, date: e.target.value })}
                                    className="w-full mt-1 p-3 rounded-lg bg-[#070c16] border border-white/10 text-white outline-none focus:border-teal-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm text-slate-400">Time Slot</label>
                                <select
                                    value={newAppt.time}
                                    onChange={(e) => setNewAppt({ ...newAppt, time: e.target.value })}
                                    className="w-full mt-1 p-3 rounded-lg bg-[#070c16] border border-white/10 text-white outline-none focus:border-teal-500"
                                >
                                    <option value="">Select Time</option>
                                    <option value="09:00 AM">09:00 AM</option>
                                    <option value="11:00 AM">11:00 AM</option>
                                    <option value="02:00 PM">02:00 PM</option>
                                    <option value="04:00 PM">04:00 PM</option>
                                </select>
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setIsModalOpen(false)} className="flex-1 py-3 border border-white/10 text-slate-400 rounded-lg hover:bg-white/5 transition">
                                    Cancel
                                </button>
                                <button type="submit" className="flex-1 py-3 bg-teal-500 text-white font-bold rounded-lg hover:bg-teal-600 transition">
                                    Confirm Booking
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PatientDashboard;