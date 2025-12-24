export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-6">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500/20 to-blue-600/20 animate-pulse" />
        <div className="absolute inset-4 rounded-full bg-navy-800 flex items-center justify-center">
          <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
        </div>
      </div>
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-slate-300">No attendance recorded yet</h3>
        <p className="text-sm text-slate-500 max-w-md">
          Waiting for face recognition to detect and log attendance records
        </p>
      </div>
    </div>
  )
}
