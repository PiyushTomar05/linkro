import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUser } from "../../api/admin";
import Button from "../../components/ui/Button";
import { validatePassword } from "../../utils/helpers";

export default function CreateUser() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        role: "agent",
        company: "",
        skills: "" // comma separated
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        const passwordError = validatePassword(formData.password);
        if (passwordError) {
            setError(passwordError);
            setLoading(false);
            return;
        }

        try {
            const dataToSubmit = { ...formData };
            if (dataToSubmit.role === 'agent' && dataToSubmit.skills) {
                dataToSubmit.skills = dataToSubmit.skills.split(',').map(s => s.trim());
            }

            await createUser(dataToSubmit);
            navigate("/admin/users");
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">Add New User</h1>
                <Link to="/admin/users">
                    <Button variant="secondary">Back to Users</Button>
                </Link>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
                {error && (
                    <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg text-sm">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                name="name"
                                required
                                className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Email Address</label>
                            <input
                                type="email"
                                name="email"
                                required
                                className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                value={formData.email}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Password</label>
                            <input
                                type="password"
                                name="password"
                                required
                                minLength={6}
                                className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                value={formData.password}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-slate-700 mb-1">Role</label>
                            <select
                                name="role"
                                className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                value={formData.role}
                                onChange={handleChange}
                            >
                                <option value="agent">Agent (Job Seeker)</option>
                                <option value="recruiter">Recruiter</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        {formData.role === 'recruiter' && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Company Name</label>
                                <input
                                    type="text"
                                    name="company"
                                    required
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    value={formData.company}
                                    onChange={handleChange}
                                />
                            </div>
                        )}

                        {formData.role === 'agent' && (
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-slate-700 mb-1">Skills (comma separated)</label>
                                <input
                                    type="text"
                                    name="skills"
                                    placeholder="e.g. React, Node.js, Python"
                                    className="w-full h-10 px-3 rounded-lg border border-slate-200 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
                                    value={formData.skills}
                                    onChange={handleChange}
                                />
                            </div>
                        )}
                    </div>

                    <div className="flex justify-end pt-4">
                        <Button type="submit" loading={loading}>Create User</Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
