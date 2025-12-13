import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { CheckCircleIcon, ClipboardDocumentListIcon, StarIcon } from "@heroicons/react/24/outline";

export default function AgentDashboard() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Agent Dashboard</h1>
        <p className="text-slate-500">Track your performance and tasks.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Tasks Completed" 
          value="24" 
          icon={<CheckCircleIcon className="w-6 h-6" />} 
          trend="up" 
          trendValue="5" 
          color="emerald"
        />
        <StatCard 
          title="Pending Tasks" 
          value="7" 
          icon={<ClipboardDocumentListIcon className="w-6 h-6" />} 
          color="orange"
        />
        <StatCard 
          title="Rating" 
          value="4.8" 
          icon={<StarIcon className="w-6 h-6" />} 
          color="indigo"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <h2 className="text-lg font-bold text-slate-900 mb-4">My Tasks</h2>
           <div className="space-y-3">
              {['Verify Candidate Documents', 'Follow up with Recruiter', 'Update Profile'].map((task, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50/50 hover:bg-slate-50">
                  <input type="checkbox" className="w-5 h-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                  <span className="text-sm font-medium text-slate-700">{task}</span>
                </div>
              ))}
           </div>
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden">
           <div className="relative z-10">
              <h2 className="text-lg font-bold mb-1">Weekly Earnings</h2>
              <p className="text-indigo-200 text-sm mb-6">Dec 4 - Dec 11</p>
              
              <div className="text-4xl font-bold mb-2">₹1,240.50</div>
              <p className="text-emerald-300 text-sm font-medium">↑ 12% vs last week</p>
              
              <Button className="mt-6 bg-white/20 hover:bg-white/30 text-white border-0 backdrop-blur-sm w-full">View Details</Button>
           </div>
           
           <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
             <StarIcon className="w-64 h-64" />
           </div>
        </div>
      </div>
    </div>
  );
}
