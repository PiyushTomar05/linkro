import { useState } from "react";
import { Link } from "react-router-dom";
import Input from "../../components/ui/Input";
import Button from "../../components/ui/Button";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mimic API call
    setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Form */}
      <div className="flex items-center justify-center p-8 bg-white lg:rounded-r-[3rem] shadow-2xl z-10">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">Linkro</h1>
            <p className="mt-2 text-slate-500">Reset your password</p>
          </div>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6">
                <p className="text-sm text-slate-600 text-center">
                    Enter the email address associated with your account and we'll send you a link to reset your password.
                </p>
              <div className="space-y-4">
                <Input
                  label="Email"
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full" loading={loading}>
                Send Reset Link
              </Button>
              
              <div className="text-center text-sm">
                 <Link to="/login" className="font-semibold text-indigo-600 hover:text-indigo-500">Back to Login</Link>
              </div>
            </form>
          ) : (
             <div className="text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                </div>
                <div>
                     <h3 className="text-xl font-bold text-slate-800">Check your email</h3>
                     <p className="mt-2 text-slate-600 text-sm">
                        If an account exists for {email}, we have sent a password reset link.
                     </p>
                </div>
                <Link to="/login" className="inline-block text-indigo-600 font-semibold hover:text-indigo-500">Back to Sign In</Link>
             </div>
          )}
        </div>
      </div>

      {/* Right Side - Visual */}
      <div className="hidden lg:flex relative bg-slate-900 items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-indigo-900 to-slate-900" />
        <div className="relative z-10 text-center text-white px-12">
           <h2 className="text-4xl font-bold mb-4">Secure & Reliable</h2>
           <p className="text-lg text-indigo-200 max-w-md mx-auto">
             We value your security and privacy above all else.
           </p>
        </div>
      </div>
    </div>
  );
}
