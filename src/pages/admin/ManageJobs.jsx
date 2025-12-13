import { useState } from "react";
import Button from "../../components/ui/Button";

export default function ManageJobs() {
  const [jobs, setJobs] = useState([
    { id: 1, title: "Senior Frontend Dev", company: "TechCorp", postedBy: "Sarah Smith", status: "active" },
    { id: 2, title: "Product Manager", company: "Innovate Inc", postedBy: "Mike Low", status: "closed" },
    { id: 3, title: "UX Designer", company: "DesignStudio", postedBy: "Sarah Smith", status: "active" },
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Manage Jobs</h1>
        <Button>Post Job for User</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Job Title</th>
                <th className="p-4 font-medium">Company</th>
                <th className="p-4 font-medium">Recruiter</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {jobs.map((job) => (
                <tr key={job.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-900">{job.title}</td>
                  <td className="p-4 text-slate-600">{job.company}</td>
                  <td className="p-4 text-slate-600">{job.postedBy}</td>
                  <td className="p-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                      ${job.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
                      {job.status}
                    </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs">Edit</Button>
                    <Button variant="danger" className="px-3 py-1.5 h-auto text-xs">Close</Button>
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
