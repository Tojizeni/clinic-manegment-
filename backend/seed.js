// backend/seed.js
const mongoose = require('mongoose');
const User = require('./models/User');
const Appointment = require('./models/Appointment');
const Prescription = require('./models/Prescription');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        await User.deleteMany({});
        await Appointment.deleteMany({});
        await Prescription.deleteMany({});

        const password = await bcrypt.hash("123456", 10);

        // 1. Create Users
        const admin = await User.create({ name: "Admin", email: "admin@clinic.com", password, role: "Admin" });
        const doctor = await User.create({ name: "Dr. Ali", email: "doctor@clinic.com", password, role: "Doctor", specialization: "Cardiologist" });
        const patient = await User.create({ name: "Ahmed Hassan", email: "patient@clinic.com", password, role: "Patient", age: 25 });

        // 2. Create Appointments
        await Appointment.create({
            patientId: patient._id, patientName: patient.name,
            doctorId: doctor._id, doctorName: doctor.name,
            date: "2023-11-20", time: "10:00 AM", status: "Completed", reason: "Chest Pain"
        });
        await Appointment.create({
            patientId: patient._id, patientName: patient.name,
            doctorId: doctor._id, doctorName: doctor.name,
            date: "2023-11-25", time: "11:30 AM", status: "Pending", reason: "Follow-up"
        });

        // 3. Create Prescription
        await Prescription.create({
            patientId: patient._id, patientName: patient.name,
            doctorId: doctor._id, doctorName: doctor.name,
            diagnosis: "Mild Angina",
            medicines: [
                { name: "Aspirin", dosage: "1-0-0", duration: "10 Days" },
                { name: "Nitroglycerin", dosage: "SOS", duration: "As needed" }
            ],
            notes: "Avoid heavy lifting."
        });

        console.log("✅ Database Seeded Successfully with Relations!");
        process.exit();
    } catch (error) {
        console.error("❌ Seed Error:", error);
        process.exit(1);
    }
};

seedDB();