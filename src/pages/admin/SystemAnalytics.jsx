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
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400">
            [Chart Placeholder: User Growth]
         </div>
         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 h-64 flex items-center justify-center text-slate-400">
            [Chart Placeholder: Traffic Sources]
         </div>
      </div>
    </div>
  );
}
