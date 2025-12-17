import { Link, useLocation } from "react-router-dom";

export default function Sidebar({ admin }) {
  const { pathname } = useLocation();

  // Utility: highlight active link
  const isActive = (path) =>
    pathname.startsWith(path)
      ? "bg-blue-100 text-blue-700 font-semibold"
      : "text-gray-700";

  return (
    <aside className="w-64 bg-white shadow-md h-screen p-4">
      <h2 className="text-2xl font-bold mb-6">Linkro</h2>

      <nav className="flex flex-col space-y-2">

        {/* ADMIN MENU */}
        {admin && (
          <>
            <Link
              to="/admin/dashboard"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/admin/dashboard")}`}
            >
              Dashboard
            </Link>

            <Link
              to="/admin/users"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/admin/users")}`}
            >
              Manage Users
            </Link>

            <Link
              to="/admin/jobs"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/admin/jobs")}`}
            >
              Manage Jobs
            </Link>

            <Link
              to="/admin/analytics"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/admin/analytics")}`}
            >
              Analytics
            </Link>

            <Link
              to="/admin/logs"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/admin/logs")}`}
            >
              System Logs
            </Link>
          </>
        )}

        {/* AGENT / RECRUITER MENU */}
        {!admin && (
          <>
            <Link
              to="/agent/dashboard"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/agent/dashboard")}`}
            >
              Agent Dashboard
            </Link>

            <Link
              to="/recruiter/dashboard"
              className={`p-3 rounded hover:bg-gray-200 ${isActive("/recruiter/dashboard")}`}
            >
              Recruiter Dashboard
            </Link>
          </>
        )}
      </nav>
    </aside>
  );
}
