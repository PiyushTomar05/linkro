import { useState, useEffect } from "react";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { UsersIcon, BriefcaseIcon, CurrencyRupeeIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { getSystemStats, getSystemLogs } from "../../services/mockService";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0
  });
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        try {
            const [statsData, logsData] = await Promise.all([
                getSystemStats(),
                getSystemLogs()
            ]);
            setStats(statsData);
            setLogs(logsData);
        } catch (error) {
            console.error("Failed to fetch dashboard data", error);
        } finally {
            setLoading(false);
        }
    };
    fetchData();
  }, []);

  if (loading) {
      return <div className="p-8 text-center text-slate-500">Loading dashboard data...</div>;
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Overview of system performance and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value={stats.totalUsers.toLocaleString()} 
          icon={<UsersIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="12%" 
          color="indigo"
        />
        <StatCard 
          title="Total Jobs" 
          value={stats.totalJobs.toLocaleString()} 
          icon={<BriefcaseIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="5%" 
          color="emerald"
        />
        <StatCard 
          title="Applications" 
          value={stats.totalApplications.toLocaleString()} 
          icon={<CurrencyRupeeIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="8%" 
          color="blue"
        />
        <StatCard 
          title="Active Jobs" 
          value={stats.activeJobs.toLocaleString()} 
          icon={<ComputerDesktopIcon className="w-6 h-6" />} 
          color="orange"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-slate-900">Recent User Activity</h2>
          <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">View All</Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="text-slate-500 text-sm border-b border-slate-100">
                <th className="py-3 font-medium">User</th>
                <th className="py-3 font-medium">Action</th>
                <th className="py-3 font-medium">Role</th>
                <th className="py-3 font-medium">Date</th>
                <th className="py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {logs.map((item) => (
                <tr key={item.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="py-3.5 font-medium text-slate-900">{item.user}</td>
                  <td className="py-3.5 text-slate-600">{item.action}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize 
                      ${item.role === 'admin' ? 'bg-purple-50 text-purple-600' : 
                        item.role === 'recruiter' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                      {item.role}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-500">{item.date}</td>
                  <td className="py-3.5">
                     <span className={`inline-flex items-center gap-1.5 ${item.status === 'Success' ? 'text-emerald-600' : 'text-red-600'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Success' ? 'bg-emerald-600' : 'bg-red-600'}`} />
                        {item.status}
                     </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
