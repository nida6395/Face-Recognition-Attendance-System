import csv
import os
from datetime import datetime

ATTENDANCE_DIR = "attendance"
os.makedirs(ATTENDANCE_DIR, exist_ok=True)
# attendance.py




def mark_attendance(name):
    today = datetime.now().strftime("%Y-%m-%d")
    time_now = datetime.now().strftime("%H:%M:%S")

    file_path = f"{ATTENDANCE_DIR}/attendance_{today}.csv"

    # Check if file exists
    file_exists = os.path.isfile(file_path)

    # Check if name already marked
    if file_exists:
        with open(file_path, "r") as f:
            reader = csv.reader(f)
            for row in reader:
                if row and row[0] == name:
                    return  # already marked
                

    # Write attendance
    with open(file_path, "a", newline="") as f:
        writer = csv.writer(f)
        if not file_exists:
            writer.writerow(["Name", "Time", "Date"])

        writer.writerow([name, time_now, today])
