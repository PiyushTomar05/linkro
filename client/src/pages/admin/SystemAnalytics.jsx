import StatCard from "../../components/ui/StatCard";
import { ArrowTrendingUpIcon, ServerIcon, GlobeAltIcon } from "@heroicons/react/24/outline";

export default function SystemAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">System Analytics</h1>
        <p className="text-slate-500">Real-time performance monitoring.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Server Uptime" 
          value="99.98%" 
          icon={<ServerIcon className="w-6 h-6" />} 
          color="emerald"
        />
        <StatCard 
          title="Requests/Sec" 
          value="450" 
          icon={<ArrowTrendingUpIcon className="w-6 h-6" />} 
          trend="up"
          trendValue="120"
          color="blue"
        />
        <StatCard 
          title="Active Regions" 
          value="4" 
          icon={<GlobeAltIcon className="w-6 h-6" />} 
          color="indigo"
        />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
            <h3 className="font-bold text-slate-900 mb-6">User Growth (Last 7 Days)</h3>
            <div className="flex-1 flex items-end justify-between gap-2 px-2">
                {[40, 65, 45, 80, 55, 90, 75].map((h, i) => (
                    <div key={i} className="w-full bg-indigo-50 rounded-t-lg relative group transition-all duration-300 hover:bg-indigo-100" style={{ height: `${h}%` }}>
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                            {h * 10} Users
                        </div>
                    </div>
                ))}
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-400 px-2 font-medium">
                <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
         </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 min-h-[300px] flex flex-col">
            <h3 className="font-bold text-slate-900 mb-6">Traffic Sources</h3>
            <div className="flex-1 flex flex-col justify-center space-y-6">
                {[
                    { label: "Direct", val: "45%", color: "bg-emerald-500" },
                    { label: "Social", val: "25%", color: "bg-blue-500" },
                    { label: "Organic Search", val: "20%", color: "bg-indigo-500" },
                    { label: "Referral", val: "10%", color: "bg-purple-500" }
                ].map((item, i) => (
                    <div key={i}>
                        <div className="flex justify-between text-sm mb-1.5 font-medium">
                            <span className="text-slate-700">{item.label}</span>
                            <span className="text-slate-500">{item.val}</span>
                        </div>
                        <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${item.color}`} style={{ width: item.val }}></div>
                        </div>
                    </div>
                ))}
            </div>
         </div>
      </div>
    </div>
  );
}
