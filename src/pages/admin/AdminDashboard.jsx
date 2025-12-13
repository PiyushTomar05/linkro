import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { UsersIcon, BriefcaseIcon, CurrencyRupeeIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Admin Dashboard</h1>
        <p className="text-slate-500">Overview of system performance and key metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Users" 
          value="2,543" 
          icon={<UsersIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="12%" 
          color="indigo"
        />
        <StatCard 
          title="Active Jobs" 
          value="185" 
          icon={<BriefcaseIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="5%" 
          color="emerald"
        />
        <StatCard 
          title="Revenue" 
          value="₹45k" 
          icon={<CurrencyRupeeIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="8%" 
          color="blue"
        />
        <StatCard 
          title="System Health" 
          value="98%" 
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
              {[
                { user: "Sarah Smith", action: "Posted a new job", role: "Recruiter", date: "2 mins ago", status: "Success" },
                { user: "John Doe", action: "Updated profile", role: "Agent", date: "15 mins ago", status: "Success" },
                { user: "Mike Johnson", action: "Failed login attempt", role: "Agent", date: "1 hour ago", status: "Failed" },
                { user: "Emma Wilson", action: "Registered", role: "Recruiter", date: "2 hours ago", status: "Success" },
                { user: "Alex Brown", action: "Deleted job post", role: "Admin", date: "3 hours ago", status: "Success" },
              ].map((item, idx) => (
                <tr key={idx} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="py-3.5 font-medium text-slate-900">{item.user}</td>
                  <td className="py-3.5 text-slate-600">{item.action}</td>
                  <td className="py-3.5">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium 
                      ${item.role === 'Admin' ? 'bg-purple-50 text-purple-600' : 
                        item.role === 'Recruiter' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
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
