import cv2
import os
import numpy as np
import pickle

DATASET_DIR = "dataset"
MODEL_DIR = "models"

os.makedirs(MODEL_DIR, exist_ok=True)

recognizer = cv2.face.LBPHFaceRecognizer_create()

faces = []
labels = []
label_map = {}
current_label = 0

for person in os.listdir(DATASET_DIR):
    person_path = os.path.join(DATASET_DIR, person)
    if not os.path.isdir(person_path):
        continue

    label_map[current_label] = person

    for img in os.listdir(person_path):
        img_path = os.path.join(person_path, img)
        gray = cv2.imread(img_path, cv2.IMREAD_GRAYSCALE)
        if gray is None:
            continue

        faces.append(gray)
        labels.append(current_label)

    current_label += 1

recognizer.train(faces, np.array(labels))
recognizer.save(os.path.join(MODEL_DIR, "trainer.yml"))

with open(os.path.join(MODEL_DIR, "labels.pkl"), "wb") as f:
    pickle.dump(label_map, f)

print("✅ Training completed")
print("✅ trainer.yml and labels.pkl saved")
