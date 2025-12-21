import { forwardRef, useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

const Input = forwardRef(({ label, error, className = "", type = "text", ...props }, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";
  const inputType = isPassword ? (showPassword ? "text" : "password") : type;

  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1.5 ml-1">
          {label}
        </label>
      )}
      <div className="relative group">
        <input
          ref={ref}
          type={inputType}
          className={`
            w-full px-4 py-2.5 
            bg-white border border-slate-200 
            text-slate-900 placeholder:text-slate-400 text-sm 
            rounded-xl shadow-sm transition-all duration-200
            focus:outline-none focus:ring-4 focus:ring-indigo-500/10 focus:border-indigo-500 
            group-hover:border-slate-300
            disabled:bg-slate-50 disabled:text-slate-500
            ${error ? "border-red-300 focus:border-red-500 focus:ring-red-100" : ""}
            ${className}
          `}
          {...props}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none"
          >
            {showPassword ? (
              <EyeSlashIcon className="w-5 h-5" />
            ) : (
              <EyeIcon className="w-5 h-5" />
            )}
          </button>
        )}
      </div>
      {error && (
        <p className="mt-1.5 text-sm text-red-600 ml-1 flex items-center gap-1">
           {error}
        </p>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
