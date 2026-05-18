const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: { 
        type: String, 
        enum: ['Admin', 'Doctor', 'Receptionist', 'Patient'], 
        required: true 
    },
    // Doctor specific field (Sirf doctor ke liye useful hoga, baaki ke liye null rahega)
    specialization: { type: String },
    // Patient specific
    age: { type: Number },
    phone: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);