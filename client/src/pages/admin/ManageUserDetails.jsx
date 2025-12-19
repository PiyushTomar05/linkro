import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getUserById } from "../../api/admin";
import Button from "../../components/ui/Button";

export default function ManageUserDetails() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUser = async () => {
        try {
            const data = await getUserById(id);
            setUser(data);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };
    loadUser();
  }, [id]);

  if (loading) return <div className="p-8 text-center text-slate-500">Loading user details...</div>;
  if (error || !user) return <div className="p-8 text-center text-red-500">User not found</div>;
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">User Details <span className="text-slate-400">#{id}</span></h1>
          <Link to="/admin/users">
            <Button variant="secondary">Back to Users</Button>
          </Link>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 max-w-2xl">
        <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-indigo-100 flex items-center justify-center text-2xl font-bold text-indigo-600">
                {user.name.charAt(0)}
            </div>
            <div className="space-y-1">
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500">{user.email}</p>
                <div className="flex gap-2 mt-2">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border
                      ${user.role === 'admin' ? 'bg-purple-50 text-purple-600 border-purple-100' : 
                        user.role === 'recruiter' ? 'bg-blue-50 text-blue-600 border-blue-100' : 'bg-emerald-50 text-emerald-600 border-emerald-100'}`}>
                      {user.role}
                    </span>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize border
                      ${user.status === 'active' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-100 text-slate-600 border-slate-200'}`}>
                      {user.status}
                    </span>
                </div>
            </div>
        </div>

        <div className="mt-8 border-t border-slate-100 pt-8 grid gap-6 md:grid-cols-2">
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">User ID</label>
                <p className="mt-1 text-slate-900 font-medium">{user.id}</p>
            </div>
            <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Joined Date</label>
                <p className="mt-1 text-slate-900 font-medium">{user.joined}</p>
            </div>
            {user.company && (
                <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Company</label>
                    <p className="mt-1 text-slate-900 font-medium">{user.company}</p>
                </div>
            )}
             {user.skills && (
                <div className="md:col-span-2">
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider">Skills</label>
                    <div className="mt-2 flex flex-wrap gap-2">
                        {user.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-slate-100 text-slate-700 text-xs rounded-md">{skill}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
      </div>
    </div>
  );
}
