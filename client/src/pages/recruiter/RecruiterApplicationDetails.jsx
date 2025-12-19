import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobApplications } from "../../api/recruiter";
import Button from "../../components/ui/Button";

export default function RecruiterApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock get by ID by filtering all
    const loadApp = async () => {
        try {
            const apps = await getJobApplications();
            // Check both _id (MongoDB) and id (virtual/mock)
            const found = apps.find(a => a._id === id || a.id === id);
            setApp(found);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    loadApp();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading application...</div>;
  if (!app) return <div className="p-8 text-center text-red-500">Application not found</div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Application Details</h1>
          <Link to="/recruiter/candidates">
            <Button variant="secondary">Back to Candidates</Button>
          </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Candidate Profile</h2>
                    <div className="flex items-center gap-6 mb-8">
                        <div className="w-20 h-20 rounded-full bg-slate-100 flex items-center justify-center font-bold text-2xl text-slate-400">
                             {app.applicantName?.charAt(0)}
                        </div>
                        <div>
                            <h3 className="text-2xl font-bold text-slate-900">{app.applicantName}</h3>
                            <p className="text-slate-500">{app.applicantEmail}</p>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <h4 className="font-semibold text-slate-900">Resume</h4>
                        <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                             <span className="text-sm text-slate-600">resume_john_doe.pdf</span>
                             <Button variant="secondary" className="px-3 py-1 h-auto text-xs">Download</Button>
                        </div>
                    </div>
                </div>
          </div>

          <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">Application Status</h3>
                    <div className="space-y-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Applying For</label>
                            <p className="font-medium text-indigo-600">{app.jobTitle}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Applied Date</label>
                            <p className="font-medium text-slate-900">{app.appliedAt}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Current Status</label>
                             <div className="mt-1">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                                    ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-emerald-50 text-emerald-600'}`}>
                                    {app.status}
                                </span>
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                        <Button className="w-full">Move to Interview</Button>
                        <Button variant="danger" className="w-full">Reject Application</Button>
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
}
