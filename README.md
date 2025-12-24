# Face Recognition Attendance System

A real-world, real-time AI-powered attendance system that marks attendance using webcam and LBPH face recognition model.

## Features
- Real-time face detection & recognition
- Automatic attendance marking (once per day per user)
- Modular frontend (Next.js) & backend (FastAPI)
- Live camera feed with Start/Stop control
- CSV-based attendance storage
- Confidence-based attendance filtering

## Tech Stack
**Frontend:** Next.js, React, ShadCN UI  
**Backend:** Python, FastAPI, OpenCV, LBPH Face Recognizer

## Installation & Run

### Backend
```bash
cd backend
python app.py

###Frontend
cd frontend
npm install
npm run dev

###API Endpoints
Endpoint	        Method	     Purpose
/video	            GET	      Live camera stream
/start-camera     	POST	    Start webcam
/stop-camera	      POST	    Stop webcam
/attendance	        GET      	Fetch attendance records

###Developer
Nida Siddiqui
