"use client"

import { useState } from "react"

export default function CameraFeed() {
  const [cameraOn, setCameraOn] = useState(false)
  const [streamKey, setStreamKey] = useState(0)

  const startCamera = async () => {
    try {
      await fetch("http://127.0.0.1:8000/start-camera", {
        method: "POST",
      })
      setCameraOn(true)
      setTimeout(() => {
      setStreamKey(Date.now()) // 🔥 force reload stream
    }, 300)} 
    catch (err) {
      console.error("Start camera failed", err)
    }
  }

  const stopCamera = async () => {
    try {
      await fetch("http://127.0.0.1:8000/stop-camera", {
        method: "POST",
      })
      setCameraOn(false)
      setStreamKey(0)
    } catch (err) {
      console.error("Stop camera failed", err)
    }
  }

  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={startCamera}
          
          className="px-4 py-2 bg-green-600 text-white rounded disabled:opacity-50"
        >
          Start Camera
        </button>

        <button
          onClick={stopCamera}
          
          className="px-4 py-2 bg-red-600 text-white rounded disabled:opacity-50"
        >
          Stop Camera
        </button>
      </div>

      {/* Camera Stream */}
      <div className="rounded-lg border border-navy-700 bg-black h-[320px] flex items-center justify-center">
        {cameraOn ? (
          <img
            key={streamKey}
            src="http://127.0.0.1:8000/video"
            className="rounded-lg w-full h-full object-cover"
            alt="Live Camera Feed"
          />
        ) : (
          <span className="text-slate-400">Camera is OFF</span>
        )}
      </div>
    </div>
  )
}
