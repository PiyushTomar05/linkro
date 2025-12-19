import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { searchJobs } from "../../api/agent";
import { MapPinIcon, CurrencyRupeeIcon, ClockIcon } from "@heroicons/react/24/outline";

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
        const data = await searchJobs(search); 
        // Showing all jobs to agent
        setJobs(data);
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
            filteredJobs.map((job) => ( // Kept filteredJobs.map for search functionality
                <div key={job.id} className="bg-white p-6 rounded-xl border border-slate-100 hover:shadow-md transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-lg text-slate-900 mb-1">{job.title}</h3>
                            <p className="text-slate-500 text-sm">{job.company?.name || job.company}</p>
                        </div>
                        <span className="bg-emerald-50 text-emerald-600 text-xs px-2.5 py-1 rounded-full font-medium">
                            {job.type}
                        </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                        <div className="flex items-center text-slate-500 text-sm">
                            <MapPinIcon className="w-4 h-4 mr-2" />
                            {job.location}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                            <CurrencyRupeeIcon className="w-4 h-4 mr-2" />
                            {job.salary}
                        </div>
                        <div className="flex items-center text-slate-500 text-sm">
                            <ClockIcon className="w-4 h-4 mr-2" />
                            {new Date(job.posted).toLocaleDateString()}
                        </div>
                    </div>

                    <Link to={`/agent/jobs/${job.id}`} className="block">
                        <Button className="w-full">View Details</Button>
                    </Link>
                </div>
            ))
        )}
      </div>
    </div>
  );
}
