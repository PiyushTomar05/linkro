import { useState, useEffect } from "react";
import StatCard from "../../components/ui/StatCard";
import { UsersIcon, BriefcaseIcon, DocumentTextIcon, CheckBadgeIcon } from "@heroicons/react/24/outline";
import { getAnalyticsGrowth, getAnalyticsStats } from "../../api/admin";

export default function SystemAnalytics() {
  const [growthData, setGrowthData] = useState([]);
  const [stats, setStats] = useState({
    appStats: { pending: 0, interview: 0, hired: 0, rejected: 0 },
    userStats: { agent: 0, recruiter: 0, admin: 0 },
    jobStats: { active: 0, closed: 0 }
  });
  const [maxCount, setMaxCount] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [growth, analytics] = await Promise.all([
          getAnalyticsGrowth(),
          getAnalyticsStats()
        ]);

        setGrowthData(growth);
        setStats(analytics);

        const max = Math.max(...growth.map(d => d.count), 1);
        setMaxCount(max);
      } catch (error) {
        console.error("Failed to fetch analytics", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Calculate total applications for percentage bar
  const totalApps = Object.values(stats.appStats).reduce((a, b) => a + b, 0) || 1;

  if (loading) return <div className="p-8 text-center text-slate-500">Loading analytics...</div>;

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
        <p className="text-slate-500">Real-time performance monitoring and statistics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Total Recruiters"
          value={stats.userStats.recruiter.toString()}
          icon={<BriefcaseIcon className="w-6 h-6" />}
          color="emerald"
        />
        <StatCard
          title="Total Agents"
          value={stats.userStats.agent.toString()}
          icon={<UsersIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Active Jobs"
          value={stats.jobStats.active.toString()}
          icon={<CheckBadgeIcon className="w-6 h-6" />}
          color="indigo"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">User Growth (Last 7 Days)</h3>
          <div className="flex-1 flex items-end justify-between gap-2 px-2">
            {growthData.length > 0 ? (
              growthData.map((item, i) => (
                <div key={i} className="w-full bg-indigo-50 rounded-t-lg relative group transition-all duration-300 hover:bg-indigo-100"
                  style={{ height: `${(item.count / maxCount) * 100}%`, minHeight: '4px' }}>
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                    {item.count} Users
                  </div>
                </div>
              ))
            ) : (
              <div className="w-full text-center text-slate-400 text-sm">No growth data available</div>
            )}
          </div>
          <div className="flex justify-between mt-2 text-xs text-slate-400 px-2 font-medium">
            {growthData.map((item, i) => (
              <span key={i} className="w-full text-center">{item.day}</span>
            ))}
          </div>
        </div>

        {/* Application Status Distribution */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
          <h3 className="font-bold text-slate-900 mb-6">Application Status Distribution</h3>
          <div className="flex-1 flex flex-col justify-center space-y-6">
            {[
              { label: "Pending", val: stats.appStats.pending, color: "bg-amber-500" },
              { label: "Interview", val: stats.appStats.interview, color: "bg-blue-500" },
              { label: "Hired", val: stats.appStats.hired, color: "bg-emerald-500" },
              { label: "Rejected", val: stats.appStats.rejected, color: "bg-red-500" }
            ].map((item, i) => {
              const percentage = Math.round((item.val / totalApps) * 100);
              return (
                <div key={i}>
                  <div className="flex justify-between text-sm mb-1.5 font-medium">
                    <span className="text-slate-700">{item.label}</span>
                    <span className="text-slate-500">{item.val} ({percentage}%)</span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${percentage}%` }}></div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
