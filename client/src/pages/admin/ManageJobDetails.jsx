import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getJobDetails } from "../../api/admin";
import { formatDate } from "../../utils/formatDate";
import Button from "../../components/ui/Button";

export default function ManageJobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadJob = async () => {
        try {
            const data = await getJobDetails(id);
            setJob(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    loadJob();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading job details...</div>;
  if (error || !job) return <div className="p-8 text-center text-red-500">Job not found</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Job Details <span className="text-slate-400">#{id}</span></h1>
           <Link to="/admin/jobs">
            <Button variant="secondary">Back to Jobs</Button>
          </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-start mb-6">
            <div>
                <h2 className="text-2xl font-bold text-slate-900">{job.title}</h2>
                <p className="text-lg text-indigo-600 font-medium">{job.company}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-bold capitalize
                ${job.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                {job.status}
            </span>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
                <div>
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Description</label>
                     <p className="text-slate-700 leading-relaxed">{job.description}</p>
                </div>
            </div>
            
            <div className="space-y-6 bg-slate-50 p-6 rounded-xl">
                 <div>
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Location</label>
                     <p className="text-slate-900 font-medium">{job.location}</p>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Salary</label>
                     <p className="text-slate-900 font-medium">{job.salary}</p>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Type</label>
                     <p className="text-slate-900 font-medium">{job.type}</p>
                </div>
                 <div>
                     <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Posted On</label>
                     <p className="text-slate-900 font-medium">{formatDate(job.posted)}</p>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
