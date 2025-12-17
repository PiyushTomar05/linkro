import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";
import { createJob } from "../../services/mockService";
import { AuthContext } from "../../context/AuthContext";

export default function RecruiterCreateJob() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    salary: "",
    type: "Full-time",
    description: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
        await createJob({
            ...formData,
            company: user.company || "My Company", // Default if not in user profile
            recruiterId: user.id
        });
        navigate("/recruiter/jobs");
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Post a New Job</h1>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
            <Input
                label="Job Title"
                placeholder="e.g. Senior Frontend Developer"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
            />

            <div className="grid md:grid-cols-2 gap-6">
                <Input
                    label="Location"
                    placeholder="e.g. Remote, New York, NY"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                />
                 <Input
                    label="Salary Range"
                    placeholder="e.g. $100k - $120k"
                    value={formData.salary}
                    onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                    required
                />
            </div>
            
            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Job Type</label>
                <select 
                className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Internship">Internship</option>
                </select>
            </div>

            <div className="flex flex-col gap-1.5">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                    className="px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200 min-h-[150px]"
                    placeholder="Describe the role, responsibilities, and requirements..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                />
            </div>

            <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="secondary" onClick={() => navigate("/recruiter/jobs")}>Cancel</Button>
                <Button type="submit" loading={loading}>Post Job</Button>
            </div>
        </form>
      </div>
    </div>
  );
}
