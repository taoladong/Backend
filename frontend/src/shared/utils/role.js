export function normalizeRole(role) {
  if (!role) return "";
  return String(role).trim().toLowerCase();
}

export function pickPrimaryRole(roles = []) {
  const normalized = roles.map(normalizeRole);
  if (normalized.includes("volunteer")) return "volunteer";
  if (normalized.includes("organizer")) return "organizer";
  if (normalized.includes("sponsor")) return "sponsor";
  if (normalized.includes("admin")) return "admin";
  return "";
}
