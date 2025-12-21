import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { 
  HomeIcon, 
  UsersIcon, 
  BriefcaseIcon, 
  ChartBarIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  XMarkIcon,
  DocumentTextIcon
} from "@heroicons/react/24/outline";

export default function DashboardLayout({ children }) {
  const { user, logout } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getNavItems = () => {
    const role = user?.role;
    if (role === "admin") {
      return [
        { name: "Dashboard", path: "/admin/dashboard", icon: HomeIcon },
        { name: "Users", path: "/admin/users", icon: UsersIcon },
        { name: "Jobs", path: "/admin/jobs", icon: BriefcaseIcon },
        { name: "Analytics", path: "/admin/analytics", icon: ChartBarIcon },
      ];
    } else if (role === "recruiter") {
      return [
        { name: "Dashboard", path: "/recruiter/dashboard", icon: HomeIcon },
        { name: "My Jobs", path: "/recruiter/jobs", icon: BriefcaseIcon },
        { name: "Candidates", path: "/recruiter/candidates", icon: UsersIcon },
      ];
    } else if (role === "agent") {
      return [
        { name: "Dashboard", path: "/agent/dashboard", icon: HomeIcon },
        { name: "Find Jobs", path: "/agent/jobs", icon: BriefcaseIcon },
        { name: "My Applications", path: "/agent/applications", icon: DocumentTextIcon },
      ];
    }
    return [];
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen flex relative overflow-hidden">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside 
        className={`
          fixed lg:static inset-y-0 left-0 z-50 w-72 bg-white/80 backdrop-blur-xl border-r border-slate-200/60 shadow-2xl lg:shadow-none transform transition-transform duration-300 ease-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div className="h-full flex flex-col p-4">
          {/* Logo */}
          <div className="h-20 flex items-center px-4 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-indigo-500/30">
                L
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent tracking-tight">
                Linkro
              </span>
            </div>
            <button 
              className="ml-auto lg:hidden text-slate-400 hover:text-slate-600 transition-colors"
              onClick={() => setSidebarOpen(false)}
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>

          {/* Nav */}
          <nav className="flex-1 space-y-1.5 overflow-y-auto px-2 py-4">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`
                    group flex items-center gap-3.5 px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 relative overflow-hidden
                    ${isActive 
                      ? "bg-indigo-50 text-indigo-600 shadow-sm ring-1 ring-indigo-500/10" 
                      : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                    }
                  `}
                >
                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-600 rounded-r-full" />
                  )}
                  <item.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* User Profile / Logout */}
          <div className="mt-auto pt-4 border-t border-slate-100">
             <Link to="/profile" className="block">
              <div className="bg-slate-50/80 p-3 rounded-2xl border border-slate-100 mb-3 flex items-center gap-3 hover:bg-white hover:shadow-md transition-all cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center text-indigo-600 font-bold text-sm ring-2 ring-indigo-50 group-hover:ring-indigo-100 transition-all">
                   {user?.name?.charAt(0) || "U"}
                </div>
                <div className="flex-1 min-w-0">
                   <p className="text-sm font-semibold text-slate-900 truncate">{user?.name}</p>
                   <p className="text-xs text-slate-500 truncate capitalize">{user?.role}</p>
                </div>
             </div>
             </Link>

             <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all duration-200"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen transition-all duration-300">
        {/* Header (Mobile Only) */}
        <header className="h-16 lg:hidden flex items-center px-4 sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-slate-500 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bars3Icon className="w-6 h-6" />
          </button>
          <span className="ml-3 font-semibold text-slate-800">Linkro</span>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 md:p-8 lg:p-10 max-w-7xl mx-auto w-full animate-in fade-in duration-500 slide-in-from-bottom-2">
          {children}
        </main>
      </div>
    </div>
  );
}
