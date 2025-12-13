import { useParams } from "react-router-dom";

export default function ManageJobDetails() {
  const { id } = useParams();
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">Job Details <span className="text-slate-400">#{id}</span></h1>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
        <p className="text-slate-500">Details for job {id} would appear here.</p>
      </div>
    </div>
  );
}
