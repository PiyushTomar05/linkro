import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getJobs, deleteJob, updateJobStatus } from "../../api/admin";
import { toast } from "react-hot-toast";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    try {
      const data = await getJobs();
      setJobs(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to load jobs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this job?")) {
      try {
        await deleteJob(id);
        setJobs(jobs.filter(j => j.id !== id));
        toast.success("Job deleted");
      } catch (err) {
        console.error(err);
        toast.error("Failed to delete job");
      }
    }
  };

  const handleStatusToggle = async (job) => {
    const newStatus = job.status === 'active' ? 'closed' : 'active';
    try {
      await updateJobStatus(job.id, newStatus);
      setJobs(jobs.map(j => j.id === job.id ? { ...j, status: newStatus } : j));
      toast.success(`Job ${newStatus}`);
    } catch (err) {
      console.error(err);
      toast.error("Failed to update status");
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading jobs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Manage Jobs</h1>
        {/* <Button>Post Job for User</Button> */}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Job Title</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Location</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                  <td className="p-4 font-medium text-slate-900">{job.title}</td>
                  <td className="p-4 text-slate-600">{job.company?.name || job.company}</td>
                  <td className="p-4 text-slate-600">{job.location}</td>
                  <td className="p-4">
                    <button
                      onClick={() => handleStatusToggle(job)}
                      className={`inline-flex items-center gap-1.5 capitalize px-2 py-1 rounded-lg border transition-all
                            ${job.status === 'active'
                          ? 'text-emerald-700 bg-emerald-50 border-emerald-100 hover:bg-emerald-100'
                          : 'text-slate-600 bg-slate-50 border-slate-200 hover:bg-slate-100'}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${job.status === 'active' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                      {job.status}
                    </button>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link to={`/admin/jobs/${job.id}`}>
                      <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs">View</Button>
                    </Link>
                    <Button variant="danger" className="px-3 py-1.5 h-auto text-xs " onClick={() => handleDelete(job.id)}>Delete</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
