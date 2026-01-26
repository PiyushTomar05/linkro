export default function SuspenseLoader() {
    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white/80 backdrop-blur-sm">
            <div className="relative flex items-center justify-center">
                <div className="w-16 h-16 border-4 border-indigo-100 border-t-indigo-600 rounded-full animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold bg-gradient-to-tr from-indigo-600 to-violet-600 bg-clip-text text-transparent">L</span>
                </div>
            </div>
        </div>
    );
}
