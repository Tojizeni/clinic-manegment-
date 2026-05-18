import React, { useContext } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import MainLayout from "./layouts/MainLayout";
import Login from "./pages/auth/Login";
import PageShell from "./components/PageShell";

// Real Pages Import (Paths Theek Ki Hain)
import AdminDashboard from "./pages/auth/admin/AdminDashboard";
import DoctorDashboard from "./pages/auth/doctor/DoctorDashboard";
import PatientDashboard from "./pages/auth/patient/PatientDashboard"; // <-- YEH ADD KIYA

// Protected Route Wrapper
const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user } = useContext(AuthContext);
  if (!user) return <Navigate to="/login" replace />;
  if (allowedRoles && !allowedRoles.includes(user.role)) return <Navigate to="/login" replace />;
  return children;
};

function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* ================= ADMIN ROUTES ================= */}
      <Route path="/admin" element={<ProtectedRoute allowedRoles={["Admin"]}><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="doctors" element={<PageShell title="Manage Doctors" description="Add, edit, or remove doctors from the system." />} />
        <Route path="receptionists" element={<PageShell title="Manage Staff" description="Oversee receptionists and their permissions." />} />
        <Route path="analytics" element={<PageShell title="Analytics" description="System usage, revenue charts, and patient flow stats." />} />
        <Route path="subscriptions" element={<PageShell title="Subscriptions" description="Manage SaaS plans, billing, and upgrade requests." />} />
      </Route>

      {/* ================= DOCTOR ROUTES ================= */}
      <Route path="/doctor" element={<ProtectedRoute allowedRoles={["Doctor"]}><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<DoctorDashboard />} />
        <Route path="appointments" element={<PageShell title="My Appointments" description="View all past and upcoming scheduled appointments." />} />
        <Route path="patients" element={<PageShell title="Patients & History" description="Search patients and view their full medical timeline." />} />
        <Route path="ai-checker" element={<PageShell title="AI Symptom Checker" description="Enter symptoms to get AI-assisted diagnosis suggestions." />} />
      </Route>

      {/* ================= RECEPTIONIST ROUTES ================= */}
      <Route path="/reception" element={<ProtectedRoute allowedRoles={["Receptionist"]}><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<PageShell title="Reception Dashboard" description="Overview of today's schedule and waiting patients." />} />
        <Route path="register" element={<PageShell title="Register New Patient" description="Fill in details to add a new patient to the system." />} />
        <Route path="schedule" element={<PageShell title="Manage Schedule" description="Book, cancel, or reschedule patient appointments." />} />
        <Route path="directory" element={<PageShell title="Patient Directory" description="Complete list of all registered patients." />} />
      </Route>

      {/* ================= PATIENT ROUTES ================= */}
      <Route path="/patient" element={<ProtectedRoute allowedRoles={["Patient"]}><MainLayout /></ProtectedRoute>}>
        <Route index element={<Navigate to="profile" replace />} />

        {/* Patient ke sabhi main links ek hi functional page par jayenge */}
        <Route path="profile" element={<PatientDashboard />} />
        <Route path="appointments" element={<PatientDashboard />} />
        <Route path="prescriptions" element={<PatientDashboard />} />
        <Route path="ai-explanations" element={<PageShell title="AI Explanations" description="Understand your diagnoses and lab reports in simple words." />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;