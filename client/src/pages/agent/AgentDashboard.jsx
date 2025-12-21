import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { BriefcaseIcon, CheckCircleIcon, ClockIcon, ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { getMyApplications } from "../../api/agent";
import { formatDate } from "../../utils/formatDate";
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
        const apps = await getMyApplications();
        setStats({
            applied: apps.length,
            interviews: apps.filter(a => a.status === 'interview').length,
            accepted: apps.filter(a => a.status === 'hired' || a.status === 'accepted').length
        });
        setRecentApps(apps.slice(0, 3));
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if(loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 bg-clip-text text-transparent">
             Welcome back, {user?.name?.split(' ')[0]}
           </h1>
           <p className="text-slate-500 mt-2 text-lg">Here's what's happening with your job search today.</p>
        </div>
        <Link to="/agent/jobs">
            <Button size="lg" className="shadow-xl shadow-indigo-500/20">
                Find New Jobs
            </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard 
          title="Total Applications" 
          value={stats.applied.toString()} 
          icon={<BriefcaseIcon className="w-6 h-6" />} 
          color="blue"
        />
        <StatCard 
          title="Interviews Scheduled" 
          value={stats.interviews.toString()} 
          icon={<ClockIcon className="w-6 h-6" />} 
          color="violet"
        />
        <StatCard 
          title="Offers Received" 
          value={stats.accepted.toString()} 
          icon={<CheckCircleIcon className="w-6 h-6" />} 
          color="emerald"
        />
      </div>
      
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-panel rounded-3xl p-6 sm:p-8">
           <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Recent Applications</h2>
                <Link to="/agent/applications" className="text-sm text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1 group">
                    View All 
                    <ArrowLongRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
           </div>
           
           {recentApps.length === 0 ? (
               <div className="text-center py-12 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                    <BriefcaseIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-medium">No applications yet</p>
                    <p className="text-slate-400 text-sm mt-1 mb-4">Start your career journey today</p>
                    <Link to="/agent/jobs"><Button variant="secondary" size="sm">Browse Jobs</Button></Link>
               </div>
           ) : (
                <div className="space-y-4">
                    {recentApps.map((app) => (
                        <div key={app.id} className="flex items-center justify-between p-4 rounded-2xl border border-slate-100 bg-white hover:border-indigo-100 hover:shadow-lg hover:shadow-indigo-500/5 transition-all duration-300 group">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-bold text-lg text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                                    {app.company?.charAt(0) || 'C'}
                                </div>
                                <div>
                                    <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">{app.jobTitle || "Unknown Job"}</h4>
                                    <p className="text-sm text-slate-500 font-medium">{app.company || "Unknown Company"}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold capitalize border
                                    ${app.status === 'pending' ? 'bg-amber-50 text-amber-600 border-amber-100' : 
                                      app.status === 'accepted' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                                      'bg-slate-50 text-slate-600 border-slate-100'}
                                `}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                                      ${app.status === 'pending' ? 'bg-amber-500' : 
                                        app.status === 'accepted' ? 'bg-emerald-500' : 
                                        'bg-slate-400'}
                                    `}></span>
                                    {app.status}
                                </span>
                                <p className="text-xs text-slate-400 mt-1.5 font-medium">
                                    {formatDate(app.appliedAt)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
           )}
        </div>

        {/* Profile Card */}
        <div className="bg-gradient-to-br from-indigo-600 to-violet-600 rounded-3xl shadow-xl shadow-indigo-500/20 p-8 text-white relative overflow-hidden flex flex-col justify-between">
           <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-3 leading-tight">Complete your<br/>Profile</h2>
              <p className="text-indigo-100 mb-8 text-sm leading-relaxed opacity-90">Maximize your chances by adding your skills, experience, and education details.</p>
              
              <div className="space-y-2 mb-8">
                <div className="flex justify-between text-xs font-semibold uppercase tracking-wider text-indigo-200">
                    <span>Progress</span>
                    <span>70%</span>
                </div>
                <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                    <div className="bg-gradient-to-r from-emerald-300 to-emerald-400 h-full w-[70%] shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
                </div>
              </div>
              
              <Link to="/profile" className="block w-full">
                  <Button className="!bg-none !bg-amber-400 text-indigo-950 font-bold border-0 w-full shadow-lg shadow-black/10 hover:!bg-amber-300">Update Profile</Button>
              </Link>
           </div>
           
           {/* Decorative Elements */}
           <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
           <div className="absolute bottom-0 right-0 -mr-8 -mb-8 opacity-10">
             <BriefcaseIcon className="w-48 h-48 transform -rotate-12" />
           </div>
        </div>
      </div>
    </div>
  );
}

