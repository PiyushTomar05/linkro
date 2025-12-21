import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApplicationDetails } from "../../api/agent";
import { formatDate } from "../../utils/formatDate";
import Button from "../../components/ui/Button";
import ApplicationTimeline from "../../components/ApplicationTimeline";

export default function AgentApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadApp = async () => {
        try {
            const data = await getApplicationDetails(id);
            setApp(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };
    loadApp();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading application details...</div>;
  if (!app) return <div className="p-8 text-center text-red-500">Application not found</div>;

  return (
    <div className="space-y-6">
       <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">Application Status</h1>
           <Link to="/agent/applications">
            <Button variant="secondary">Back to My Applications</Button>
          </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-6">
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Job Information</h2>
                    <h3 className="text-2xl font-bold text-indigo-600 mb-2">{app.jobTitle}</h3>
                    <p className="text-lg text-slate-700 font-medium mb-4">{app.company}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm text-slate-500 mb-6">
                        <div>
                            <span className="block font-semibold text-slate-900">Applied On</span>
                            {formatDate(app.appliedAt)}
                        </div>
                        <div>
                            <span className="block font-semibold text-slate-900">Location</span>
                            {app.jobId?.location || 'N/A'}
                        </div>
                        <div>
                            <span className="block font-semibold text-slate-900">Salary</span>
                            {app.jobId?.salary || 'N/A'}
                        </div>
                         <div>
                            <span className="block font-semibold text-slate-900">Type</span>
                            {app.jobId?.type || 'N/A'}
                        </div>
                    </div>
                    
                    <Link to={`/agent/jobs/${typeof app.jobId === 'object' ? (app.jobId?._id || app.jobId?.id) : app.jobId}`}>
                         <Button variant="outline" className="w-full">View Original Job Post</Button>
                    </Link>
               </div>
               
               {/* Timeline */}
               <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                   <h2 className="text-xl font-bold text-slate-900 mb-6">Application Activity</h2>
                   <ApplicationTimeline timeline={app.timeline} />
               </div>
          </div>

          <div className="space-y-6">
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                    <h3 className="font-bold text-slate-900 mb-4">Current Status</h3>
                    <div className="text-center py-6">
                        <span className={`px-4 py-2 rounded-full text-base font-bold capitalize inline-block
                            ${app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' : 
                              (app.status === 'accepted' || app.status === 'hired') ? 'bg-emerald-50 text-emerald-600' : 
                              app.status === 'interview' ? 'bg-purple-50 text-purple-600' : 'bg-red-50 text-red-600'}`}>
                            {app.status}
                        </span>
                        
                         <div className="mt-6 flex flex-col gap-2 text-sm text-slate-500">
                             {app.lastViewedByRecruiterAt && (
                                 <p className="flex items-center justify-center gap-1.5">
                                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                     </svg>
                                    Viewed by recruiter: {new Date(app.lastViewedByRecruiterAt).toLocaleString()}
                                 </p>
                             )}
                             
                             {app.lastStatusUpdatedAt && (
                                 <p className="flex items-center justify-center gap-1.5">
                                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99" />
                                      </svg>
                                     Status updated: {new Date(app.lastStatusUpdatedAt).toLocaleString()}
                                 </p>
                             )}
                         </div>
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
}
