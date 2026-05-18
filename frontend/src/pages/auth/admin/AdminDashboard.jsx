import React, { useState } from 'react';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    // Initial Mock Data
    const [staff, setStaff] = useState([
        { id: 1, name: "Dr. Ali", email: "ali@clinic.com", role: "Doctor", status: "Active" },
        { id: 2, name: "Dr. Sara", email: "sara@clinic.com", role: "Doctor", status: "Active" },
        { id: 3, name: "Sarah Khan", email: "sarah@clinic.com", role: "Receptionist", status: "Active" },
        { id: 4, name: "Ahmed", email: "ahmed@clinic.com", role: "Receptionist", status: "On Leave" },
    ]);

    // Delete Staff Function (ACTUALLY REMOVES FROM UI)
    const handleDelete = (id) => {
        setStaff(staff.filter(member => member.id !== id));
        toast.success("Staff member removed successfully!");
    };

    // Toggle Status Function
    const toggleStatus = (id) => {
        setStaff(staff.map(member =>
            member.id === id
                ? { ...member, status: member.status === 'Active' ? 'On Leave' : 'Active' }
                : member
        ));
        toast.success("Status updated!");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Admin Overview</h1>
                <button className="px-4 py-2 bg-teal-500 hover:bg-teal-600 text-white text-sm font-bold rounded-lg transition">
                    + Add New Staff
                </button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                    { title: "Total Doctors", value: staff.filter(s => s.role === 'Doctor').length, color: "bg-teal-500" },
                    { title: "Total Staff", value: staff.length, color: "bg-blue-500" },
                    { title: "Active Now", value: staff.filter(s => s.status === 'Active').length, color: "bg-green-500" },
                    { title: "On Leave", value: staff.filter(s => s.status === 'On Leave').length, color: "bg-orange-500" },
                ].map((stat, i) => (
                    <div key={i} className="bg-[#0f172a] p-5 rounded-xl border border-white/5">
                        <p className="text-sm text-slate-400">{stat.title}</p>
                        <p className="text-3xl font-bold text-white mt-1">{stat.value}</p>
                        <div className={`w-10 h-1 ${stat.color} rounded mt-3`}></div>
                    </div>
                ))}
            </div>

            {/* Staff Management Table */}
            <div className="bg-[#0f172a] rounded-xl border border-white/5 p-6">
                <h2 className="text-lg font-bold text-white mb-4">Manage Staff & Doctors</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-slate-300 text-sm">
                        <thead className="text-xs text-slate-500 uppercase border-b border-white/10">
                            <tr>
                                <th className="pb-3 pr-4">Name</th>
                                <th className="pb-3 pr-4">Email</th>
                                <th className="pb-3 pr-4">Role</th>
                                <th className="pb-3 pr-4">Status</th>
                                <th className="pb-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staff.length === 0 ? (
                                <tr><td colSpan="5" className="py-8 text-center text-slate-500">No staff found.</td></tr>
                            ) : (
                                staff.map(doc => (
                                    <tr key={doc.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                                        <td className="py-4 pr-4 font-medium text-white">{doc.name}</td>
                                        <td className="py-4 pr-4">{doc.email}</td>
                                        <td className="py-4 pr-4">
                                            <span className={`px-2 py-1 text-xs rounded-full ${doc.role === 'Doctor' ? 'bg-teal-500/20 text-teal-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                                {doc.role}
                                            </span>
                                        </td>
                                        <td className="py-4 pr-4">
                                            <button
                                                onClick={() => toggleStatus(doc.id)}
                                                className={`px-2 py-1 text-xs rounded-full cursor-pointer transition ${doc.status === 'Active' ? 'bg-green-500/20 text-green-400 hover:bg-red-500/20 hover:text-red-400' : 'bg-red-500/20 text-red-400 hover:bg-green-500/20 hover:text-green-400'}`}
                                            >
                                                {doc.status}
                                            </button>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button
                                                onClick={() => handleDelete(doc.id)}
                                                className="text-xs font-semibold text-red-400 hover:text-red-300 hover:underline"
                                            >
                                                Remove
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;