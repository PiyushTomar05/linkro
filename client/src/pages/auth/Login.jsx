import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Login() {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "admin@linkro.com", password: "password" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    
    try {
      const user = await login(formData.email, formData.password);
      // Redirect based on role
      if (user.role === "admin") navigate("/admin/dashboard");
      else if (user.role === "agent") navigate("/agent/dashboard");
      else if (user.role === "recruiter") navigate("/recruiter/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  const fillDemoDates = (role) => {
      if (role === 'admin') setFormData({ email: 'admin@linkro.com', password: 'password' });
      if (role === 'recruiter') setFormData({ email: 'recruiter@company.com', password: 'password' });
      if (role === 'agent') setFormData({ email: 'john@example.com', password: 'password' });
  }

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-white lg:rounded-r-[3rem] shadow-2xl z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Linkro</h1>
            <p className="mt-2 text-slate-500">Welcome back! Please enter your details.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Email"
                type="email"
                placeholder="admin@linkro.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              <div className="flex justify-end">
                <Link to="/forgot-password" class="text-xs font-semibold text-indigo-600 hover:text-indigo-500">Forgot Password?</Link>
              </div>
            </div>

            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <Button type="submit" className="w-full" loading={loading}>
              Sign In
            </Button>
            
            <div className="text-center text-sm">
               <span className="text-slate-500">Don't have an account? </span>
               <Link to="/register" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign up</Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-xs text-gray-500 text-center">
              <p>Demo Login (Click to fill):</p>
              <div className="flex justify-center gap-2 mt-2 flex-wrap">
                 <button type="button" onClick={() => fillDemoDates('admin')} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded border transition-colors">Admin</button>
                 <button type="button" onClick={() => fillDemoDates('recruiter')} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded border transition-colors">Recruiter</button>
                 <button type="button" onClick={() => fillDemoDates('agent')} className="bg-slate-100 hover:bg-slate-200 px-3 py-1 rounded border transition-colors">Job Seeker</button>
              </div>
            </div>
          </form>
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-violet-600/20" />
        <div className="relative z-10 text-center text-white px-12">
           <h2 className="text-5xl font-bold mb-6">Connect & Grow</h2>
           <p className="text-xl text-indigo-100 max-w-lg mx-auto leading-relaxed">
             Efficiently manage your recruitment process with Linkro's advanced platform.
           </p>
        </div>
        
        {/* Abstract Shapes */}
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-indigo-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-violet-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
      </div>
    </div>
  );
}
