import { apiClient } from "./client";

const mockEvents = [
  {
    id: "a811f840-10e1-4fd5-a8d5-0c95f6a7b1a1",
    title: "Green Saturday - Clean up canal",
    description: "Community cleanup event focused on urban environment recovery.",
    address: "District 3, Ho Chi Minh City",
    startAt: new Date().toISOString(),
    endAt: new Date(Date.now() + 3 * 60 * 60 * 1000).toISOString(),
    capacity: 120,
    status: "Published",
    skills: ["Logistics", "Communication"],
  },
  {
    id: "723f7f81-b7d5-43ec-b91b-1aaea5d53a10",
    title: "STEM Bus - Teach rural students",
    description: "Volunteer mentors teach basic STEM modules for middle school students.",
    address: "Cu Chi, Ho Chi Minh City",
    startAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
    endAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 4 * 60 * 60 * 1000).toISOString(),
    capacity: 65,
    status: "Published",
    skills: ["Teaching", "Mentoring"],
  },
];

export async function getVolunteerProfile() {
  const { data } = await apiClient.get("/api/volunteer/profile");
  return data;
}

export async function createVolunteerProfile(payload) {
  const { data } = await apiClient.post("/api/volunteer/profile", payload);
  return data;
}

export async function updateVolunteerProfile(payload) {
  const { data } = await apiClient.put("/api/volunteer/profile", payload);
  return data;
}

export async function getMyApplications() {
  const { data } = await apiClient.get("/api/volunteer/applications/my");
  return data;
}

export async function applyToEvent(payload) {
  const { data } = await apiClient.post("/api/volunteer/applications", payload);
  return data;
}

export async function listVolunteerEvents() {
  try {
    const { data } = await apiClient.get("/api/events/public");
    return { source: "api", items: data };
  } catch {
    return { source: "mock", items: mockEvents };
  }
}
