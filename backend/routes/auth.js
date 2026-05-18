const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// 1. LOGIN API (React App yahi call karega)
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Check user exist karta hai ya nahi
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ message: "Invalid Credentials" });

        // Password match karo
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: "Invalid Credentials" });

        // JWT Token banao (Optional but good practice)
        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

        // User data bhejo (Password mat bhejo!)
        res.json({
            token,
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
                plan: "Pro Plan"
            }
        });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

// 2. REGISTER API (Receptionist patient add karega ya Admin doctor add karega)
router.post('/register', async (req, res) => {
    try {
        const { name, email, password, role, specialization, age, phone } = req.body;

        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ message: "User already exists" });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create User
        user = new User({
            name, email, password: hashedPassword, role, specialization, age, phone
        });
        await user.save();

        res.status(201).json({ message: `${role} registered successfully!` });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
});

module.exports = router;