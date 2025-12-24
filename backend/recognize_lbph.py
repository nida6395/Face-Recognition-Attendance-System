import cv2
import pickle
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

MODEL_PATH = os.path.join(MODEL_DIR, "trainer.yml")
LABEL_MAP_PATH = os.path.join(MODEL_DIR, "labels.pkl")

recognizer = cv2.face.LBPHFaceRecognizer_create()
recognizer.read(MODEL_PATH)

with open(LABEL_MAP_PATH, "rb") as f:
    label_map = pickle.load(f)

def recognize_face(face):
    label, confidence = recognizer.predict(face)
    name = label_map.get(label, "Unknown")
    return name, confidence
