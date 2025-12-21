export default function StatCard({ title, value, icon, color = "indigo", action }) {
  const colorVariants = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
    violet: "bg-violet-50 text-violet-600",
    fuchsia: "bg-fuchsia-50 text-fuchsia-600"
  };

  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
          
          {action && (
            <div className="mt-4">
              {action}
            </div>
          )}
        </div>
        
        <div className={`p-3 rounded-xl ${colorVariants[color] || colorVariants.indigo} ring-4 ring-white`}>
          {icon}
        </div>
      </div>
    </div>
  );
}
