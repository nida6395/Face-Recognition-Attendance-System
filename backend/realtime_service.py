import cv2
import time
import numpy as np
from datetime import datetime
from attendance.attendance import mark_attendance
from recognize_lbph import recognize_face

camera_active = False
cap = None

face_cascade = cv2.CascadeClassifier(
    "haarcascade_frontalface_default.xml"
)

seen_today = set()
current_date = datetime.now().strftime("%Y-%m-%d")

def generate_frames():
    global cap, camera_active, seen_today, current_date

    while True:

        # =========================
        # CAMERA OFF
        # =========================
        if not camera_active:
            if cap is not None:
                cap.release()
                cap = None

            black = np.zeros((480, 640, 3), dtype=np.uint8)
            _, buffer = cv2.imencode(".jpg", black)

            yield (
                b"--frame\r\n"
                b"Content-Type: image/jpeg\r\n\r\n" +
                buffer.tobytes() +
                b"\r\n"
            )

            time.sleep(0.1)
            continue   

        # =========================
        # CAMERA ON
        # =========================
        if cap is None:
            cap = cv2.VideoCapture(0)

        ret, frame = cap.read()
        if not ret:
            continue

        gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        today = datetime.now().strftime("%Y-%m-%d")
        if today != current_date:
            seen_today.clear()
            current_date = today

        for (x, y, w, h) in faces:
            face = gray[y:y+h, x:x+w]
            name, confidence = recognize_face(face)

            if confidence < 70 and name not in seen_today:
                mark_attendance(name)
                seen_today.add(name)

            cv2.rectangle(frame, (x,y), (x+w,y+h), (0,255,0), 2)
            cv2.putText(
                frame,
                name,
                (x, y-10),
                cv2.FONT_HERSHEY_SIMPLEX,
                0.9,
                (0,255,0),
                2
            )

        _, buffer = cv2.imencode(".jpg", frame)

        yield (
            b"--frame\r\n"
            b"Content-Type: image/jpeg\r\n\r\n" +
            buffer.tobytes() +
            b"\r\n"
        )
