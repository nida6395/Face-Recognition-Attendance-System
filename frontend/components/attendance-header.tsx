export function AttendanceHeader() {
  return (
    <header className="text-center space-y-4">
      <div className="inline-flex items-center justify-center w-16 h-16 md:w-20 md:h-20 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/30 mb-4">
        <svg className="w-8 h-8 md:w-10 md:h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
          />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl font-bold text-slate-100 text-balance leading-tight">
        Face Recognition Attendance System
      </h1>
      <p className="text-base md:text-lg text-slate-400 max-w-2xl mx-auto text-pretty">
        Real-time AI-powered attendance monitoring
      </p>
    </header>
  )
}
