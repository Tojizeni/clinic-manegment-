const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientName: { type: String, required: true }, // Denormalized for fast UI loading
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    date: { type: String, required: true }, // e.g., "2023-11-20"
    time: { type: String, required: true }, // e.g., "10:00 AM"
    status: { 
        type: String, 
        enum: ['Pending', 'Confirmed', 'In-Progress', 'Completed', 'Cancelled'], 
        default: 'Pending' 
    },
    reason: { type: String, default: "General Checkup" }
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);