import cv2
import os

# Load Haar Cascade
face_cascade = cv2.CascadeClassifier(
    "haarcascade_frontalface_default.xml"
)

name = input("Enter your name: ").strip()

dataset_dir = "dataset"
person_dir = os.path.join(dataset_dir, name)

if not os.path.exists(person_dir):
    os.makedirs(person_dir)

# Try camera index 0
cap = cv2.VideoCapture(0)

if not cap.isOpened():
    print("❌ Camera index 0 not working, trying index 1...")
    cap = cv2.VideoCapture(1)

if not cap.isOpened():
    print("❌ Camera not opening. Close other apps using camera.")
    exit()

print("✅ Camera opened successfully")
print("📸 Capturing cropped face images | Press Q to stop")

count = 0
padding = 40

while True:
    ret, frame = cap.read()
    if not ret:
        print("❌ Failed to read frame")
        break

    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    faces = face_cascade.detectMultiScale(
        gray,
        scaleFactor=1.1,
        minNeighbors=7,
        minSize=(80, 80)
    )

    for (x, y, w, h) in faces:
        x1 = max(0, x - padding)
        y1 = max(0, y - padding)
        x2 = min(frame.shape[1], x + w + padding)
        y2 = min(frame.shape[0], y + h + padding)

        face = frame[y1:y2, x1:x2]
        face = cv2.resize(face, (300, 300))

        img_path = os.path.join(person_dir, f"{count}.jpg")
        cv2.imwrite(img_path, face)
        count += 1

        cv2.rectangle(frame, (x1, y1), (x2, y2), (0, 255, 0), 2)

    cv2.imshow("Face Dataset Capture", frame)

    if cv2.waitKey(1) & 0xFF == ord('q') or count >= 25:
        break

cap.release()
cv2.destroyAllWindows()

print(f"✅ Dataset created: {count} images saved for {name}")
