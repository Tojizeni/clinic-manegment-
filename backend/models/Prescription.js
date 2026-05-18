const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
    appointmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Appointment' },
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    patientName: { type: String, required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    doctorName: { type: String, required: true },
    diagnosis: { type: String, required: true }, // e.g., "Viral Fever"
    medicines: [{ 
        name: String, 
        dosage: String, // e.g., "1-0-1"
        duration: String // e.g., "5 Days"
    }],
    notes: { type: String, default: "Rest well and drink plenty of fluids." }
}, { timestamps: true });

module.exports = mongoose.model('Prescription', prescriptionSchema);