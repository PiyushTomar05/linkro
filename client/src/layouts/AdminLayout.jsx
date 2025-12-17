import Sidebar from "../components/Sidebar";

export default function AdminLayout({ children }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar admin />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
