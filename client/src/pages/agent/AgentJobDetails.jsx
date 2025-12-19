import { useState, useEffect, useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getJobDetails, applyForJob, getMyApplications } from "../../api/agent";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";

export default function AgentJobDetails() {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [job, setJob] = useState(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    loadData();
  }, [id, user]);

  const loadData = async () => {
     try {
         const jobData = await getJobDetails(id);
         setJob(jobData);
         
         if (user) {
             const apps = await getMyApplications();
             // Check if any application matches this job ID.
             // Note: backend might populate jobId, so check both id string and object._id
             const applied = apps.some(a => (a.jobId?._id === id || a.jobId === id));
             setHasApplied(applied);
         }
     } catch (err) {
         console.error(err);
     } finally {
         setLoading(false);
     }
  };

  const handleApply = async () => {
    if (!user) {
        navigate("/login");
        return;
    }
    setApplying(true);
    try {
        await applyForJob(id);
        setHasApplied(true);
    } catch (err) {
        console.error("Failed to apply", err);
    } finally {
        setApplying(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading job details...</div>;
  if (!job) return <div className="p-8 text-center text-red-500">Job not found</div>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row justify-between md:items-start gap-4">
         <div>
            <h1 className="text-2xl font-bold text-slate-900 mb-1">{job.title}</h1>
            <p className="text-xl text-indigo-600 font-medium mb-4">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-sm text-slate-500">
                <span className="flex items-center gap-1">
                    📍 {job.location}
                </span>
                <span className="flex items-center gap-1">
                    💼 {job.type}
                </span>
                <span className="flex items-center gap-1">
                    💰 {job.salary}
                </span>
            </div>
         </div>
         <div className="flex gap-2 flex-col sm:flex-row">
             <Link to="/agent/jobs"><Button variant="secondary" className="w-full sm:w-auto">Back to Search</Button></Link>
             
             {hasApplied ? (
                 <Button disabled className="bg-green-600 hover:bg-green-700 w-full sm:w-auto">Applied ✓</Button>
             ) : (
                 <Button onClick={handleApply} loading={applying} className="w-full sm:w-auto">Apply Now</Button>
             )}
         </div>
      </div>

      {/* Description */}
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Job Requirements & Description</h2>
          <p className="text-slate-700 leading-relaxed whitespace-pre-line">{job.description}</p>
      </div>
    </div>
  );
}
