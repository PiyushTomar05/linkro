import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { getJobs } from "../../services/mockService";

export default function AgentJobs() {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  useEffect(() => {
    if (search.trim() === "") {
        setFilteredJobs(jobs);
    } else {
        const lower = search.toLowerCase();
        setFilteredJobs(jobs.filter(j => 
            j.title.toLowerCase().includes(lower) || 
            j.company.toLowerCase().includes(lower) ||
            j.location.toLowerCase().includes(lower)
        ));
    }
  }, [search, jobs]);

  const loadJobs = async () => {
    try {
        const data = await getJobs(); 
        // Showing all jobs to agent
        setJobs(data.filter(j => j.status === 'active'));
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading jobs...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Find Jobs</h1>
      </div>

      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4">
        <div className="flex-1">
             <Input 
                placeholder="Search by title, company, or location..." 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
             />
        </div>
        <Button>Search</Button>
      </div>

      <div className="grid gap-4">
        {filteredJobs.length === 0 ? (
            <div className="text-center p-8 text-slate-500">No jobs found matching your search.</div>
        ) : (
            filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:border-indigo-100 transition-all flex flex-col md:flex-row justify-between md:items-center gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">{job.title}</h3>
                        <p className="text-indigo-600 font-medium">{job.company}</p>
                        <div className="flex flex-wrap gap-3 mt-2 text-sm text-slate-500">
                            <span>{job.location}</span>
                            <span>•</span>
                            <span>{job.type}</span>
                            <span>•</span>
                            <span>{job.salary}</span>
                        </div>
                    </div>
                    <Link to={`/agent/jobs/${job.id}`}>
                        <Button>View Details</Button>
                    </Link>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
