const API_BASE_URL = "http://127.0.0.1:8000";

export async function getAttendance() {
  const response = await fetch(`${API_BASE_URL}/attendance`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch attendance");
  }

  return response.json();
}
