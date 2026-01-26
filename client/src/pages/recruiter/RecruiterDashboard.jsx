import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import StatCard from "../../components/ui/StatCard";
import Button from "../../components/ui/Button";
import { UsersIcon, BriefcaseIcon, ClockIcon } from "@heroicons/react/24/outline";
import { getMyJobs, getJobApplications } from "../../api/recruiter";
import { formatDate } from "../../utils/formatDate";
import { AuthContext } from "../../context/AuthContext";

import Skeleton from "../../components/ui/Skeleton";

export default function RecruiterDashboard() {
  const { user } = useContext(AuthContext);
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalCandidates: 0,
    interviews: 0
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
      const [jobs, apps] = await Promise.all([
        getMyJobs(),
        getJobApplications()
      ]);

      setStats({
        activeJobs: jobs.filter(j => j.status === 'active').length,
        totalCandidates: apps.length,
        interviews: apps.filter(a => a.status === 'interview').length
      });

      // Sort apps by date desc (mocking date sort loosely) and take 5
      setRecentApps(apps.slice(0, 5));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex justify-between items-center">
        <div className="space-y-3">
          <Skeleton className="h-8 w-64 rounded-lg" />
          <Skeleton className="h-4 w-96 rounded-md" />
        </div>
        <Skeleton className="h-10 w-32 rounded-xl" />
      </div>

      {/* Stats Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>

      {/* Recent Apps Skeleton */}
      <div className="border border-slate-100 rounded-2xl p-6">
        <Skeleton className="h-7 w-48 mb-6 rounded-md" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <Skeleton key={i} className="h-20 rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Recruiter Dashboard</h1>
          <p className="text-slate-500">Welcome back! Here's what's happening with your jobs.</p>
        </div>
        <Link to="/recruiter/jobs/new">
          <Button>Post New Job</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Active Jobs"
          value={stats.activeJobs.toString()}
          icon={<BriefcaseIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Total Candidates"
          value={stats.totalCandidates.toString()}
          icon={<UsersIcon className="w-6 h-6" />}
          color="indigo"
        />
        <StatCard
          title="Interviews Scheduled"
          value={stats.interviews.toString()}
          icon={<ClockIcon className="w-6 h-6" />}
          color="emerald"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6">
        <h2 className="text-lg font-bold text-slate-900 mb-6">Recent Applications</h2>
        {recentApps.length === 0 ? (
          <p className="text-slate-500">No applications yet.</p>
        ) : (
          <div className="space-y-4">
            {recentApps.map((app) => (
              <div key={app.id} className="flex items-center justify-between p-4 border border-slate-100 rounded-xl hover:border-indigo-100 hover:bg-slate-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-400">
                    {app.applicantName?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900">{app.jobTitle}</h3>
                    <p className="text-sm text-slate-500">Applied by {app.applicantName} • {formatDate(app.appliedAt)}</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link to={`/recruiter/candidates/${app.id}`}>
                    <Button variant="secondary" className="text-xs px-3 py-1.5 h-auto">View Details</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
