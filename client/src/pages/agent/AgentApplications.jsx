import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { getApplications } from "../../services/mockService";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function AgentApplications() {
  const { user } = useContext(AuthContext);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if(user?.id) loadApps();
  }, [user]);

  const loadApps = async () => {
    try {
        const data = await getApplications({ applicantId: user.id });
        setApplications(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading your applications...</div>;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Applications</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {applications.length === 0 ? (
            <div className="p-8 text-center">
                <p className="text-slate-500 mb-4">You haven't applied to any jobs yet.</p>
                <Link to="/agent/jobs">
                    <Button>Find Jobs</Button>
                </Link>
            </div>
        ) : (
            <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                    <th className="p-4 font-medium">Job Title</th>
                    <th className="p-4 font-medium">Company</th>
                    <th className="p-4 font-medium">Applied Date</th>
                    <th className="p-4 font-medium">Status</th>
                </tr>
                </thead>
                <tbody className="text-sm">
                {applications.map((app) => (
                    <tr key={app.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                    <td className="p-4 font-medium text-slate-900">{app.jobTitle}</td>
                    <td className="p-4 text-slate-600">{app.company}</td>
                    <td className="p-4 text-slate-600">{app.appliedAt}</td>
                    <td className="p-4">
                         <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                            ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                              app.status === 'interview' ? 'bg-indigo-50 text-indigo-600' : 'bg-green-50 text-green-600'}`}>
                            {app.status}
                        </span>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
            </div>
        )}
      </div>
    </div>
  );
}
