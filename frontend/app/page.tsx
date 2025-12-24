"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"

import { getAttendance, type AttendanceRecord } from "@/src/services/api"

import { AttendanceTable } from "@/components/attendance-table"
import { AttendanceHeader } from "@/components/attendance-header"
import { EmptyState } from "@/components/empty-state"
import CameraFeed from "@/components/CameraFeed"
import { Skeleton } from "@/components/ui/skeleton"



export default function AttendanceDashboard() {
  const [attendance, setAttendance] = useState<AttendanceRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
  const loadAttendance = async () => {
    try {
      setLoading(true)
      const data = await getAttendance()
      setAttendance(data.attendance || [])
    } catch (error) {
      console.error("Failed to fetch attendance:", error)
    } finally {
      setLoading(false)
    }
  }

  loadAttendance()
  const interval = setInterval(loadAttendance, 3000)
  return () => clearInterval(interval)
}, [])


  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
      <div className="container mx-auto px-4 py-8 md:py-12">
        <AttendanceHeader />

        <main className="mt-8 md:mt-12">
          <Card className="bg-navy-800/50 border-navy-700/50 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-1">
            <div className="p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl md:text-2xl font-semibold text-slate-100">Attendance Records</h2>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-sm text-slate-400">Live</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

              {/* LEFT: CAMERA (ALWAYS SHOW) */}
            <CameraFeed />
              {/* RIGHT: ATTENDANCE */}
            {loading ? (
    <LoadingSkeleton />
  ) : attendance.length === 0 ? (
    <EmptyState />
  ) : (
    <AttendanceTable records={attendance} />
  )}
</div>





            </div>
          </Card>
        </main>

        <footer className="fixed bottom-0 left-0 right-0 py-4 bg-navy-900/80 backdrop-blur-md border-t border-navy-700/30">
          <p className="text-center text-sm text-slate-500">Developed by Nida Siddiqui</p>
        </footer>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-4 gap-4 pb-4 border-b border-navy-700/50">
        {["Name", "Time", "Date", "Status"].map((header) => (
          <Skeleton key={header} className="h-6 bg-navy-700/50" />
        ))}
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 animate-pulse">
          <Skeleton className="h-10 bg-navy-700/30" />
          <Skeleton className="h-10 bg-navy-700/30" />
          <Skeleton className="h-10 bg-navy-700/30" />
          <Skeleton className="h-10 bg-navy-700/30" />
        </div>
      ))}
    </div>
  )
}
