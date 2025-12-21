import React from 'react';

const ApplicationTimeline = ({ timeline }) => {
    if (!timeline || timeline.length === 0) {
        return <div className="text-slate-500 text-sm">No timeline events found.</div>;
    }

    // Sort timeline by date descending (newest first)
    const sortedTimeline = [...timeline].sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'interview': return 'bg-purple-100 text-purple-800';
            case 'hired': return 'bg-emerald-100 text-emerald-800';
            case 'accepted': return 'bg-emerald-100 text-emerald-800'; // Fallback if accepted is used
            case 'rejected': return 'bg-red-100 text-red-800';
            default: return 'bg-slate-100 text-slate-800';
        }
    };

    return (
        <div className="space-y-6 relative border-l-2 border-slate-200 ml-3 pl-6 py-2">
            {sortedTimeline.map((event, index) => (
                <div key={index} className="relative">
                    {/* Dot */}
                    <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-white border-2 border-slate-300"></div>
                    
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
                        <div>
                             <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium capitalize mb-1 inline-block ${getStatusColor(event.status)}`}>
                                {event.status}
                             </span>
                             {event.note && (
                                 <p className="text-sm text-slate-700 mt-1 italic">"{event.note}"</p>
                             )}
                             {event.updatedBy && (
                                 <p className="text-xs text-slate-400 mt-1">
                                    Updated by {event.updatedBy.name || 'System'} ({event.updatedBy.role || 'System'})
                                 </p>
                             )}
                        </div>
                        <span className="text-xs text-slate-400 whitespace-nowrap">
                            {new Date(event.updatedAt).toLocaleString()}
                        </span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ApplicationTimeline;
