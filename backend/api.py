from fastapi import APIRouter, HTTPException
from fastapi.responses import StreamingResponse
import realtime_service
from realtime_service import generate_frames

import csv
import os

router = APIRouter()

# ===== ABSOLUTE PATH FIX (THIS LINE IS THE KEY) =====


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
CSV_PATH = os.path.join(BASE_DIR, "attendance.csv")



# ===================================================

@router.get("/")
def root():
    return {"status": "Backend running"}


@router.get("/attendance")
def get_attendance():
    if not os.path.exists(CSV_PATH):
        raise HTTPException(
            status_code=404,
            detail="attendance.csv not found"
        )

    with open(CSV_PATH, newline="") as f:
        reader = csv.DictReader(f)
        records = list(reader)

    return {
        "total_records": len(records),
        "attendance": records
    }
@router.post("/start-camera")
def start_camera():
    realtime_service.camera_active = True
    return {"status": "Camera started"}

@router.post("/stop-camera")
def stop_camera():
    realtime_service.camera_active = False
    return {"status": "Camera stopped"}
@router.get("/video")
def video_feed():
    return StreamingResponse(
        generate_frames(),
        media_type="multipart/x-mixed-replace; boundary=frame"
    )


