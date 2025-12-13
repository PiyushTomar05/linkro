import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import DashboardLayout from "./layouts/DashboardLayout";

/* Auth pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Dashboards */
import AgentDashboard from "./pages/agent/AgentDashboard";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

/* Admin Pages */
import ManageUsers from "./pages/admin/ManageUsers";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageUserDetails from "./pages/admin/ManageUserDetails";
import ManageJobDetails from "./pages/admin/ManageJobDetails";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import SystemLogs from "./pages/admin/SystemLogs";

const Layout = ({ children }) => <DashboardLayout>{children}</DashboardLayout>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Dashboards */}
        <Route path="/agent/dashboard" element={<Layout><AgentDashboard /></Layout>} />
        <Route path="/recruiter/dashboard" element={<Layout><RecruiterDashboard /></Layout>} />
        <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/users" element={<Layout><ManageUsers /></Layout>} />
        <Route path="/admin/users/:id" element={<Layout><ManageUserDetails /></Layout>} />

        <Route path="/admin/jobs" element={<Layout><ManageJobs /></Layout>} />
        <Route path="/admin/jobs/:id" element={<Layout><ManageJobDetails /></Layout>} />

        <Route path="/admin/analytics" element={<Layout><SystemAnalytics /></Layout>} />
        <Route path="/admin/logs" element={<Layout><SystemLogs /></Layout>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
