import { useState, useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from "../../components/ui/Button";
import Input from "../../components/ui/Input";

export default function Profile() {
  const { user, login } = useContext(AuthContext); // Using login to update user state mock
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    role: user?.role || "",
    company: user?.company || "",
    skills: user?.skills || []
  });
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, update via API.
    // Here we just simulate updating local state/context
    // We can't actually update AuthContext user easily without a specific setter, 
    // but the scope of this is mock UI.
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">My Profile</h1>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100">
         <div className="flex items-center gap-6 mb-8">
            <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600">
                {user?.name?.charAt(0)}
            </div>
            <div>
                <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
                <p className="text-slate-500 capitalize">{user?.role}</p>
            </div>
         </div>

         <form onSubmit={handleSubmit} className="space-y-6">
            <Input 
                label="Full Name" 
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
             <Input 
                label="Email Address" 
                type="email"
                value={formData.email}
                disabled
                className="bg-slate-50 text-slate-500"
            />
            {user?.role === 'recruiter' && (
                <Input 
                    label="Company Name" 
                    value={formData.company}
                    onChange={(e) => setFormData({...formData, company: e.target.value})}
                />
            )}
             {user?.role === 'agent' && (
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Skills (Comma separated)</label>
                    <input
                        className="w-full px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                        value={formData.skills}
                        onChange={(e) => setFormData({...formData, skills: e.target.value})}
                        placeholder="React, CSS, Node.js"
                    />
                </div>
            )}

            <div className="pt-4">
                <Button type="submit">Save Changes</Button>
            </div>
            {success && <p className="text-green-600 text-sm font-medium animate-pulse">Profile updated successfully!</p>}
         </form>
      </div>
    </div>
  );
}
