import React, { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    // Step 1: Page load hone par LocalStorage check karo
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("clinic_user");
        return savedUser ? JSON.parse(savedUser) : null;
    });

    // Step 2: Jab bhi user change ho, LocalStorage mein save karo
    useEffect(() => {
        if (user) {
            localStorage.setItem("clinic_user", JSON.stringify(user));
        } else {
            localStorage.removeItem("clinic_user");
        }
    }, [user]);

    const login = async (email, password) => {
        await new Promise(resolve => setTimeout(resolve, 500));

        const cleanEmail = email.trim().toLowerCase();
        const cleanPassword = password.trim();

        if (cleanPassword !== "123456") {
            throw new Error("Invalid Credentials");
        }

        const mockDatabase = {
            "admin@clinic.com": { name: "Admin User", role: "Admin", plan: "Pro Plan" },
            "doctor@clinic.com": { name: "Dr. Ali", role: "Doctor", plan: "Pro Plan" },
            "reception@clinic.com": { name: "Sarah Khan", role: "Receptionist", plan: "Free Plan" },
            "patient@clinic.com": { name: "Ahmed Hassan", role: "Patient", plan: "Pro Plan" }
        };

        const foundUser = mockDatabase[cleanEmail];

        if (!foundUser) {
            throw new Error("User not found.");
        }

        const loggedInUser = {
            ...foundUser,
            email: cleanEmail,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        };

        setUser(loggedInUser);
        return loggedInUser.role;
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};