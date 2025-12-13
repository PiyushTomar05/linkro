import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { UsersIcon, BriefcaseIcon, ClockIcon } from "@heroicons/react/24/outline";

export default function RecruiterDashboard() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruiter Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening with your jobs.</p>
        </div>
        <Button>Post New Job</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Active Jobs" 
          value="12" 
          icon={<BriefcaseIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="2" 
          color="blue"
        />
        <StatCard 
          title="Total Candidates" 
          value="48" 
          icon={<UsersIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="14" 
          color="indigo"
        />
        <StatCard 
          title="Interviews Scheduled" 
          value="5" 
          icon={<ClockIcon className="w-6 h-6" />} 
          color="emerald"
        />
      </div>

       <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Applications</h2>
        <div className="space-y-4">
           {[1, 2, 3].map((i) => (
             <div key={i} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-indigo-100 hover:bg-slate-50 transition-colors">
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                   {i === 1 ? 'JD' : i === 2 ? 'JS' : 'MK'}
                 </div>
                 <div>
                   <h3 className="font-medium text-slate-900">Senior Frontend Developer</h3>
                   <p className="text-sm text-slate-500">Applied by John Doe • 2 hours ago</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">View Profile</Button>
                 <Button className="text-xs px-3 py-1.5 h-auto">Schedule Interview</Button>
               </div>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
}
