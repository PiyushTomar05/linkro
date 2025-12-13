import { useState } from "react";

export default function SystemLogs() {
  const logs = [
    { time: "10:45:22", type: "INFO", message: "User login successful (ID: 452)" },
    { time: "10:42:10", type: "WARN", message: "High latency detected in region US-East" },
    { time: "10:30:05", type: "ERROR", message: "Database connection timeout (Retry 1)" },
    { time: "10:15:00", type: "INFO", message: "Daily backup completed" },
  ];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-slate-900">System Logs</h1>

      <div className="bg-slate-900 rounded-2xl shadow-lg p-6 font-mono text-sm text-slate-300 overflow-hidden">
        <div className="space-y-3">
          {logs.map((log, i) => (
             <div key={i} className="flex gap-4 border-b border-slate-800 pb-2 last:border-0 last:pb-0">
               <span className="text-slate-500 shrink-0">{log.time}</span>
               <span className={`font-bold shrink-0 ${
                 log.type === 'ERROR' ? 'text-red-400' : 
                 log.type === 'WARN' ? 'text-yellow-400' : 'text-emerald-400'
               }`}>{log.type}</span>
               <span className="truncate">{log.message}</span>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
