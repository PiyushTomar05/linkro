import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from 'react-hot-toast';
import SuspenseLoader from "./components/SuspenseLoader";

/* Layouts */
import DashboardLayout from "./layouts/DashboardLayout";

/* Auth pages */
const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const ForgotPassword = lazy(() => import("./pages/auth/ForgotPassword"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Careers = lazy(() => import("./pages/Careers"));
const Contact = lazy(() => import("./pages/Contact"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));

/* Dashboards */
const AgentDashboard = lazy(() => import("./pages/agent/AgentDashboard"));
const AgentJobs = lazy(() => import("./pages/agent/AgentJobs"));
const AgentJobDetails = lazy(() => import("./pages/agent/AgentJobDetails"));
const AgentApplications = lazy(() => import("./pages/agent/AgentApplications"));
const AgentApplicationDetails = lazy(() => import("./pages/agent/AgentApplicationDetails"));
const RecruiterDashboard = lazy(() => import("./pages/recruiter/RecruiterDashboard"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));

/* Admin Pages */
const ManageUsers = lazy(() => import("./pages/admin/ManageUsers"));
const CreateUser = lazy(() => import("./pages/admin/CreateUser"));
const ManageJobs = lazy(() => import("./pages/admin/ManageJobs"));
const ManageUserDetails = lazy(() => import("./pages/admin/ManageUserDetails"));
const ManageJobDetails = lazy(() => import("./pages/admin/ManageJobDetails"));
const SystemAnalytics = lazy(() => import("./pages/admin/SystemAnalytics"));
const SystemLogs = lazy(() => import("./pages/admin/SystemLogs"));

/* Recruiter Pages */
const RecruiterJobs = lazy(() => import("./pages/recruiter/RecruiterJobs"));
const RecruiterCreateJob = lazy(() => import("./pages/recruiter/RecruiterCreateJob"));
const RecruiterJobDetails = lazy(() => import("./pages/recruiter/RecruiterJobDetails"));
const RecruiterApplications = lazy(() => import("./pages/recruiter/RecruiterApplications"));
const RecruiterApplicationDetails = lazy(() => import("./pages/recruiter/RecruiterApplicationDetails"));

const Profile = lazy(() => import("./pages/common/Profile"));

const Layout = ({ children }) => <DashboardLayout>{children}</DashboardLayout>;

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<SuspenseLoader />}>
        <Routes>
          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          {/* Public */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/terms" element={<Terms />} />

          {/* Protected Agent Routes */}
          <Route element={<ProtectedRoute allowedRoles={['agent']} />}>
            <Route path="/agent/dashboard" element={<Layout><AgentDashboard /></Layout>} />
            <Route path="/agent/jobs" element={<Layout><AgentJobs /></Layout>} />
            <Route path="/agent/jobs/:id" element={<Layout><AgentJobDetails /></Layout>} />
            <Route path="/agent/applications" element={<Layout><AgentApplications /></Layout>} />
            <Route path="/agent/applications/:id" element={<Layout><AgentApplicationDetails /></Layout>} />
          </Route>

          {/* Protected Recruiter Routes */}
          <Route element={<ProtectedRoute allowedRoles={['recruiter']} />}>
            <Route path="/recruiter/dashboard" element={<Layout><RecruiterDashboard /></Layout>} />
            <Route path="/recruiter/jobs" element={<Layout><RecruiterJobs /></Layout>} />
            <Route path="/recruiter/jobs/new" element={<Layout><RecruiterCreateJob /></Layout>} />
            <Route path="/recruiter/jobs/:id/edit" element={<Layout><RecruiterCreateJob /></Layout>} />
            <Route path="/recruiter/jobs/:id" element={<Layout><RecruiterJobDetails /></Layout>} />
            <Route path="/recruiter/candidates" element={<Layout><RecruiterApplications /></Layout>} />
            <Route path="/recruiter/candidates/:id" element={<Layout><RecruiterApplicationDetails /></Layout>} />
          </Route>

          {/* Protected Admin Routes */}
          <Route element={<ProtectedRoute allowedRoles={['admin']} />}>
            <Route path="/admin/dashboard" element={<Layout><AdminDashboard /></Layout>} />
            <Route path="/admin/users" element={<Layout><ManageUsers /></Layout>} />
            <Route path="/admin/users/new" element={<Layout><CreateUser /></Layout>} />
            <Route path="/admin/users/:id" element={<Layout><ManageUserDetails /></Layout>} />
            <Route path="/admin/jobs" element={<Layout><ManageJobs /></Layout>} />
            <Route path="/admin/jobs/:id" element={<Layout><ManageJobDetails /></Layout>} />
            <Route path="/admin/analytics" element={<Layout><SystemAnalytics /></Layout>} />
            <Route path="/admin/logs" element={<Layout><SystemLogs /></Layout>} />
          </Route>

          {/* Common Protected Routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Layout><Profile /></Layout>} />
          </Route>

          {/* Default */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Suspense>
      <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
    </BrowserRouter>
  );
}
