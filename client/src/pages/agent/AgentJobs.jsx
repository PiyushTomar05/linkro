import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { searchJobs } from "../../api/agent";
import { MapPinIcon, CurrencyRupeeIcon, ClockIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

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
        setJobs(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[50vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">Find Your Dream Job</h1>
            <p className="text-slate-500 mt-2 text-lg">Browse thorough thousands of active listings.</p>
        </div>
      </div>

      <div className="glass-panel p-2 rounded-2xl flex gap-2 shadow-xl shadow-indigo-500/10">
        <div className="flex-1">
             <div className="relative">
                 <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                 <input 
                    type="text"
                    className="w-full pl-11 pr-4 py-3.5 bg-transparent border-0 focus:ring-0 text-slate-900 placeholder:text-slate-400 font-medium"
                    placeholder="Search by title, company, or location..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                 />
             </div>
        </div>
        <Button size="lg" className="rounded-xl px-8">Search</Button>
      </div>

      <div className="grid gap-5">
        {filteredJobs.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MagnifyingGlassIcon className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900">No jobs found</h3>
                <p className="text-slate-500 max-w-sm mx-auto mt-2">We couldn't find any jobs matching your search. Try adjusting your keywords.</p>
            </div>
        ) : (
            filteredJobs.map((job) => (
                <div key={job.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 group">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-4 mb-6">
                        <div className="flex gap-4">
                            <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center font-bold text-xl text-indigo-600 shrink-0">
                                {job.company?.charAt(0) || "C"}
                            </div>
                            <div>
                                <h3 className="font-bold text-xl text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{job.title}</h3>
                                <p className="text-slate-500 font-medium">{job.company?.name || job.company}</p>
                            </div>
                        </div>
                        <span className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full font-semibold border border-emerald-100 self-start">
                            {job.type}
                        </span>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 mb-6 text-sm">
                        <span className="flex items-center text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <MapPinIcon className="w-4 h-4 mr-2 text-slate-400" />
                            {job.location}
                        </span>
                        <span className="flex items-center text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <CurrencyRupeeIcon className="w-4 h-4 mr-2 text-slate-400" />
                            {job.salary}
                        </span>
                        <span className="flex items-center text-slate-500 bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                            <ClockIcon className="w-4 h-4 mr-2 text-slate-400" />
                            {new Date(job.posted).toLocaleDateString()}
                        </span>
                    </div>

                    <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                        <p className="text-xs text-slate-400 font-medium">Posted by Linkro Recruiter</p>
                        <Link to={`/agent/jobs/${job.id}`}>
                            <Button variant="secondary" className="group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100">
                                View Details
                            </Button>
                        </Link>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
}

