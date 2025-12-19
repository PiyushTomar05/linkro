import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobDetails, getJobApplications } from "../../api/recruiter";
import Button from "../../components/ui/Button";

export default function RecruiterJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        try {
            const [jobData, appsData] = await Promise.all([
                getJobDetails(id),
                getJobApplications({ jobId: id })
            ]);
            
            setJob(jobData);
            setCandidates(appsData);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading details...</div>;
  if (!job) return <div className="p-8 text-center text-red-500">Job not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between md:items-start gap-4">
         <div>
            <div className="flex items-center gap-3 mb-2">
                <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                 <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                    ${job.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                    {job.status}
                </span>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span>{job.location}</span>
                <span>•</span>
                <span>{job.type}</span>
                <span>•</span>
                <span>{job.salary}</span>
                <span>•</span>
                <span>Posted on {job.posted}</span>
            </div>
         </div>
         <div className="flex gap-2">
             <Link to="/recruiter/jobs"><Button variant="secondary">Back</Button></Link>
             <Button>Edit Job</Button>
         </div>
      </div>

      {/* Description */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Job Description</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
      </div>

      {/* Candidates */}
      <div className="space-y-4">
         <h2 className="text-xl font-bold text-slate-900">Candidates ({candidates.length})</h2>
         {candidates.length === 0 ? (
             <div className="bg-slate-50 p-8 rounded-2xl text-center text-slate-500">
                 No candidates have applied for this job yet.
             </div>
         ) : (
             <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                    <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                        <th className="p-4 font-medium">Candidate</th>
                        <th className="p-4 font-medium">Applied Date</th>
                        <th className="p-4 font-medium">Status</th>
                        <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                    </thead>
                    <tbody className="text-sm">
                    {candidates.map((app) => (
                        <tr key={app.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                        <td className="p-4">
                            <div className="font-medium text-slate-900">{app.applicantName || "Unknown"}</div>
                            <div className="text-xs text-slate-500">{app.applicantEmail || "No email"}</div>
                        </td>
                        <td className="p-4 text-slate-600">{new Date(app.appliedAt).toLocaleDateString()}</td>
                        <td className="p-4">
                            <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                            ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {app.status}
                            </span>
                        </td>
                        <td className="p-4 text-right">
                             <Link to={`/recruiter/applications/${app.id}`}>
                                <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs">View Application</Button>
                            </Link>
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
