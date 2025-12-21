import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Button from "../../components/ui/Button";
import { getUsers, deleteUser } from "../../api/admin";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
        const data = await getUsers();
        setUsers(data);
    } catch (err) {
        console.error("Failed to load users", err);
    } finally {
        setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if(confirm("Are you sure you want to delete this user?")) {
        try {
            await deleteUser(id);
            setUsers(users.filter((u) => u.id !== id));
        } catch (err) {
            console.error("Failed to delete user", err);
            alert("Failed to delete user");
        }
    }
  };

  if (loading) return <div className="p-8 text-center text-slate-500">Loading users...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
        <Button>Add User</Button>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-slate-500 text-sm border-b border-slate-100">
                <th className="p-4 font-medium">Name</th>
                <th className="p-4 font-medium">Email</th>
                <th className="p-4 font-medium">Role</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50">
                  <td className="p-4 font-medium text-slate-900">{user.name}</td>
                  <td className="p-4 text-slate-600">{user.email}</td>
                  <td className="p-4">
                     <span className={`px-2.5 py-1 rounded-full text-xs font-medium capitalize
                      ${user.role === 'admin' ? 'bg-purple-50 text-purple-600' : 
                        user.role === 'recruiter' ? 'bg-blue-50 text-blue-600' : 'bg-indigo-50 text-indigo-600'}`}>
                      {user.role}
                    </span>
                  </td>
                  <td className="p-4">
                    <span className={`inline-flex items-center gap-1.5 capitalize ${user.status === 'active' ? 'text-emerald-600' : 'text-slate-500'}`}>
                        <div className={`w-1.5 h-1.5 rounded-full ${user.status === 'active' ? 'bg-emerald-600' : 'bg-slate-400'}`} />
                        {user.status}
                     </span>
                  </td>
                  <td className="p-4 text-right space-x-2">
                    <Link to={`/admin/users/${user.id}`}>
                        <Button variant="secondary" className="px-3 py-1.5 h-auto text-xs">View</Button>
                    </Link>
                    <Button variant="danger" className="px-3 py-1.5 h-auto text-xs" onClick={() => handleDelete(user.id)}>Delete</Button>
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
