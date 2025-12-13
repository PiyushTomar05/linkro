import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    name: "", 
    email: "", 
    password: "", 
    role: "agent" 
  });
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo, just redirect to login
    navigate("/login");
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Right Side - Form (Swapped for variety) */}
      <div className="flex items-center justify-center p-8 bg-white lg:rounded-l-[3rem] shadow-2xl z-10 lg:order-2">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Join Linkro</h1>
            <p className="mt-2 text-slate-500">Create your account to get started.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
              <Input
                label="Email"
                type="email"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
              />
              <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
              />
              
              <div className="flex flex-col gap-1.5">
                 <label className="text-sm font-medium text-gray-700">I am a...</label>
                 <select 
                    className="px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all duration-200"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                 >
                    <option value="agent">Agent</option>
                    <option value="recruiter">Recruiter</option>
                 </select>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
            
            <div className="text-center text-sm">
               <span className="text-slate-500">Already have an account? </span>
               <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Sign in</Link>
            </div>
          </form>
        </div>
      </div>

      {/* Left Side - Visual */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden lg:order-1">
        <div className="absolute inset-0 bg-gradient-to-bl from-violet-600/20 to-indigo-600/20" />
        <div className="relative z-10 text-center text-white px-12">
           <h2 className="text-5xl font-bold mb-6">Start Your Journey</h2>
           <p className="text-xl text-indigo-100 max-w-lg mx-auto leading-relaxed">
             Join thousands of professionals connecting on Linkro today.
           </p>
        </div>
         {/* Abstract Shapes */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}
