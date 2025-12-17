import React from 'react';

export default function StatCard({ title, value, icon, trend, trendValue, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    blue: "bg-blue-50 text-blue-600",
    orange: "bg-orange-50 text-orange-600",
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="text-2xl font-bold text-slate-900 mt-2">{value}</h3>
        </div>
        <div className={`p-3 rounded-xl ${colors[color]}`}>
          {icon}
        </div>
      </div>
      {(trend || trendValue) && (
        <div className="mt-4 flex items-center text-sm">
          {trend === 'up' ? (
             <span className="text-emerald-600 font-medium flex items-center">
               ↑ {trendValue}
             </span>
          ) : (
             <span className="text-red-500 font-medium flex items-center">
               ↓ {trendValue}
             </span>
          )}
          <span className="text-slate-400 ml-2">from last month</span>
        </div>
      )}
    </div>
  );
}
