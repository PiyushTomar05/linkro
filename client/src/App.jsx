import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

/* Layouts */
import DashboardLayout from "./layouts/DashboardLayout";

/* Auth pages */
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import ForgotPassword from "./pages/auth/ForgotPassword";

/* Dashboards */
import AgentDashboard from "./pages/agent/AgentDashboard";
import AgentJobs from "./pages/agent/AgentJobs";
import AgentJobDetails from "./pages/agent/AgentJobDetails";
import AgentApplications from "./pages/agent/AgentApplications";
import RecruiterDashboard from "./pages/recruiter/RecruiterDashboard";
import AdminDashboard from "./pages/admin/AdminDashboard";

/* Admin Pages */
import ManageUsers from "./pages/admin/ManageUsers";
import ManageJobs from "./pages/admin/ManageJobs";
import ManageUserDetails from "./pages/admin/ManageUserDetails";
import ManageJobDetails from "./pages/admin/ManageJobDetails";
import SystemAnalytics from "./pages/admin/SystemAnalytics";
import SystemLogs from "./pages/admin/SystemLogs";

/* Recruiter Pages */
import RecruiterJobs from "./pages/recruiter/RecruiterJobs";
import RecruiterCreateJob from "./pages/recruiter/RecruiterCreateJob";
import RecruiterJobDetails from "./pages/recruiter/RecruiterJobDetails";
import RecruiterApplications from "./pages/recruiter/RecruiterApplications";
import RecruiterApplicationDetails from "./pages/recruiter/RecruiterApplicationDetails";

import Profile from "./pages/common/Profile";

const Layout = ({ children }) => <DashboardLayout>{children}</DashboardLayout>;

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dashboards */}
        <Route path="/agent/dashboard" element={<Layout><AgentDashboard /></Layout>} />
        <Route path="/agent/jobs" element={<Layout><AgentJobs /></Layout>} />
        <Route path="/agent/jobs/:id" element={<Layout><AgentJobDetails /></Layout>} />
        <Route path="/agent/applications" element={<Layout><AgentApplications /></Layout>} />

        <Route path="/recruiter/dashboard" element={<Layout><RecruiterDashboard /></Layout>} />
        <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />

        {/* ADMIN ROUTES */}
        <Route path="/admin/users" element={<Layout><ManageUsers /></Layout>} />
        <Route path="/admin/users/:id" element={<Layout><ManageUserDetails /></Layout>} />

        <Route path="/admin/jobs" element={<Layout><ManageJobs /></Layout>} />
        <Route path="/admin/jobs/:id" element={<Layout><ManageJobDetails /></Layout>} />

        <Route path="/admin/analytics" element={<Layout><SystemAnalytics /></Layout>} />
        <Route path="/admin/logs" element={<Layout><SystemLogs /></Layout>} />

        {/* RECRUITER ROUTES */}
        <Route path="/recruiter/jobs" element={<Layout><RecruiterJobs /></Layout>} />
        <Route path="/recruiter/jobs/new" element={<Layout><RecruiterCreateJob /></Layout>} />
        <Route path="/recruiter/jobs/:id/edit" element={<Layout><RecruiterCreateJob /></Layout>} />
        <Route path="/recruiter/jobs/:id" element={<Layout><RecruiterJobDetails /></Layout>} />
        <Route path="/recruiter/candidates" element={<Layout><RecruiterApplications /></Layout>} />
        <Route path="/recruiter/candidates/:id" element={<Layout><RecruiterApplicationDetails /></Layout>} />

        <Route path="/profile" element={<Layout><Profile /></Layout>} />

        {/* Default */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
