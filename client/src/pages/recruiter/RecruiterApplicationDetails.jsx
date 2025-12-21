import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getApplicationDetails, getJobApplications, updateApplicationStatus } from "../../api/recruiter";
import { formatDate } from "../../utils/formatDate";
import Button from "../../components/ui/Button";
import ApplicationTimeline from "../../components/ApplicationTimeline";

export default function RecruiterApplicationDetails() {
  const { id } = useParams();
  const [app, setApp] = useState(null);
  const [loading, setLoading] = useState(true);
  const [note, setNote] = useState("");

  useEffect(() => {
    const loadApp = async () => {
        try {
            // Fetch single app which also marks as viewed
            const data = await getApplicationDetails(id);
            setApp(data);
            setLoading(false);
        } catch (err) {
            console.error(err);
            setLoading(false);
        }
    };
    loadApp();
  }, [id]);

  const handleStatusUpdate = async (status) => {
      try {
          const promoNote = prompt("Add a note (optional):", note);
          // Don't update if user cancelled prompt (returns null)
          if (promoNote === null) return;
          
          await updateApplicationStatus(app.id, status, promoNote);
          
          // Re-fetch to get updated timeline and timestamps
          const updatedApp = await getApplicationDetails(id);
          setApp(updatedApp);
          setNote(""); // Reset
      } catch (err) {
          console.error("Failed to update status", err);
          alert("Failed to update status");
      }
  };

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
                        {app.resume ? (
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between">
                                 <span className="text-sm text-slate-600 truncate max-w-[200px]">{app.resume}</span>
                                 <a 
                                    href={`http://localhost:5000/uploads/resumes/${app.resume}`} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                 >
                                    <Button variant="secondary" className="px-3 py-1 h-auto text-xs">Download</Button>
                                 </a>
                            </div>
                        ) : (
                            <div className="p-4 bg-slate-50 rounded-xl border border-dashed border-slate-300 text-center text-slate-500 text-sm">
                                No resume uploaded
                            </div>
                        )}
                    </div>
                    
                    <div className="space-y-4 mt-8">
                        <h4 className="font-semibold text-slate-900">Skills</h4>
                        <div className="flex flex-wrap gap-2">
                            {app.skills && app.skills.length > 0 ? (
                                app.skills.map((skill, index) => (
                                    <span key={index} className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-sm font-medium">
                                        {skill}
                                    </span>
                                ))
                            ) : (
                                <span className="text-slate-500 text-sm">No skills listed</span>
                            )}
                        </div>
                    </div>
                </div>
                
                {/* Timeline Section */}
                <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
                    <h2 className="text-xl font-bold text-slate-900 mb-6">Application Timeline</h2>
                    <ApplicationTimeline timeline={app.timeline} />
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
                            <p className="font-medium text-slate-900">{formatDate(app.appliedAt)}</p>
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 uppercase">Current Status</label>
                             <div className="mt-1">
                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                                    ${
                                        app.status === 'hired' ? 'bg-green-50 text-green-600' :
                                        app.status === 'rejected' ? 'bg-red-50 text-red-600' :
                                        app.status === 'interview' ? 'bg-blue-50 text-blue-600' :
                                        app.status === 'pending' ? 'bg-yellow-50 text-yellow-600' :
                                        'bg-slate-100 text-slate-600'
                                    }`}>
                                    {app.status}
                                </span>
                             </div>
                        </div>
                    </div>
                    
                    <div className="mt-6 pt-6 border-t border-slate-100 space-y-2">
                        {app.status === 'pending' && (
                            <>
                                <Button className="w-full" onClick={() => handleStatusUpdate('interview')}>Move to Interview</Button>
                                <Button variant="danger" className="w-full" onClick={() => handleStatusUpdate('rejected')}>Reject Application</Button>
                            </>
                        )}
                        {app.status === 'interview' && (
                            <>
                                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={() => handleStatusUpdate('hired')}>Hire Candidate</Button>
                                <Button variant="danger" className="w-full" onClick={() => handleStatusUpdate('rejected')}>Reject Application</Button>
                            </>
                        )}
                         {app.status === 'rejected' && (
                             <div className="text-center text-red-500 font-medium p-2 bg-red-50 rounded">Application Rejected</div>
                        )}
                        {app.status === 'hired' && (
                             <div className="text-center text-emerald-600 font-medium p-2 bg-emerald-50 rounded">Candidate Hired</div>
                        )}
                    </div>
                </div>
          </div>
      </div>
    </div>
  );
}
