import { forwardRef } from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

const Button = forwardRef(({ 
  className = "", 
  variant = "primary", 
  size = "md", 
  loading = false, 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none disabled:opacity-70 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    primary: "bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 rounded-xl",
    secondary: "bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 shadow-sm rounded-xl",
    destructive: "bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 rounded-xl",
    ghost: "text-slate-600 hover:bg-slate-100/50 hover:text-slate-900 rounded-lg",
    link: "text-indigo-600 hover:text-indigo-700 hover:underline p-0 h-auto font-semibold"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
  };

  const styles = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  return (
    <button ref={ref} className={styles} disabled={loading} {...props}>
      {loading ? (
        <>
          <ArrowPathIcon className="w-4 h-4 mr-2 animate-spin" />
          Loading...
        </>
      ) : children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;
