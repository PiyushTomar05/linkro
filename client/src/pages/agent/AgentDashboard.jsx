import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { BriefcaseIcon, CheckCircleIcon, ClockIcon } from "@heroicons/react/24/outline";
import { getApplications } from "../../services/mockService";
import { AuthContext } from "../../context/AuthContext";

export default function AgentDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    applied: 0,
    interviews: 0,
    accepted: 0
  });
  const [recentApps, setRecentApps] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user?.id) {
        loadData();
    }
  }, [user]);

  const loadData = async () => {
    try {
        const apps = await getApplications({ applicantId: user.id });
        setStats({
            applied: apps.length,
            interviews: apps.filter(a => a.status === 'interview').length,
            accepted: apps.filter(a => a.status === 'accepted').length
        });
        setRecentApps(apps.slice(0, 3));
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if(loading) return <div className="p-8 text-center text-slate-500">Loading dashboard...</div>;

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
           <h1 className="text-2xl font-bold text-slate-900">Job Seeker Dashboard</h1>
           <p className="text-slate-500">Track your job applications and success.</p>
        </div>
        <Link to="/agent/jobs"><Button>Find Jobs</Button></Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Jobs Applied" 
          value={stats.applied.toString()} 
          icon={<BriefcaseIcon className="w-6 h-6" />} 
          color="blue"
        />
        <StatCard 
          title="Interviews" 
          value={stats.interviews.toString()} 
          icon={<ClockIcon className="w-6 h-6" />} 
          color="indigo"
        />
        <StatCard 
          title="Offers" 
          value={stats.accepted.toString()} 
          icon={<CheckCircleIcon className="w-6 h-6" />} 
          color="emerald"
        />
      </div>
      
      <div className="grid lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
           <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold text-slate-900">Recent Applications</h2>
                <Link to="/agent/applications" className="text-sm text-indigo-600 hover:text-indigo-500 font-medium">View All</Link>
           </div>
           
           {recentApps.length === 0 ? (
               <p className="text-slate-500">You haven't applied to any jobs yet.</p>
           ) : (
                <div className="space-y-3">
                    {recentApps.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-50/50 hover:bg-slate-50 group transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-white border border-slate-100 flex items-center justify-center font-bold text-slate-400 group-hover:border-indigo-100 group-hover:text-indigo-500 transition-colors">
                                    {app.company?.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <h4 className="font-medium text-slate-900">{app.jobTitle}</h4>
                                    <p className="text-xs text-slate-500">{app.company} • {app.appliedAt}</p>
                                </div>
                            </div>
                            <span className={`px-2 py-0.5 rounded text-xs font-medium capitalize 
                                ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                                  app.status === 'interview' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                                {app.status}
                            </span>
                        </div>
                    ))}
                </div>
           )}
        </div>

        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-2xl shadow-lg p-6 text-white relative overflow-hidden flex flex-col justify-center">
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-2">Complete your Profile</h2>
              <p className="text-indigo-100 mb-6 max-w-sm">Stand out to recruiters by adding your skills, experience, and education.</p>
              
              <div className="w-full bg-white/20 rounded-full h-2 mb-2 overflow-hidden">
                 <div className="bg-emerald-400 h-full w-[70%]"></div>
              </div>
              <p className="text-xs text-indigo-200 mb-6">70% Completed</p>
              
              <Button className="bg-white text-indigo-600 hover:bg-indigo-50 border-0 w-auto self-start">Update Profile</Button>
           </div>
           
           <div className="absolute -right-10 -bottom-10 opacity-20 transform rotate-12">
             <BriefcaseIcon className="w-64 h-64" />
           </div>
        </div>
      </div>
    </div>
  );
}
