"use client"

import type { AttendanceRecord } from "@/src/services/api"

import { useEffect, useState } from "react"

interface AttendanceTableProps {
  records: AttendanceRecord[]
}

export function AttendanceTable({ records }: AttendanceTableProps) {
  const [mounted, setMounted] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setMounted(true)
    setLoading(false)
  }, [])

  if (!mounted || loading) {
    return (
      <div className="flex justify-center items-center py-10 text-slate-400">
        Loading attendance data...
      </div>
    )
  }

  

  return (
    
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-navy-700/50">
            <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Name</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Time</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Date</th>
            <th className="text-left py-4 px-4 text-sm font-medium text-slate-400 uppercase tracking-wider">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-navy-700/30">
          {records.length === 0 && (
  <tr>
    <td colSpan={4} className="text-center py-6 text-slate-400">
      No attendance records yet
    </td>
  </tr>
)}

          {records.map((record, index) => (
            <tr
              key={`${record.name}-${record.time}-${index}`}
              className={`transition-all duration-500 hover:bg-navy-700/20 ${
                mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
              }`}
              style={{
                transitionDelay: `${index * 50}ms`,
              }}
            >
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shadow-lg shadow-blue-500/30">
                    {record.name ? record.name.charAt(0).toUpperCase() : "?"}

                  </div>
                  <span className="text-slate-200 font-medium">
  {record.name ?? "Unknown"}
</span>

                </div>
              </td>
              <td className="py-4 px-4 text-slate-300">{record.time}</td>
              <td className="py-4 px-4 text-slate-300">{record.date}</td>
              <td className="py-4 px-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  Present
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}


