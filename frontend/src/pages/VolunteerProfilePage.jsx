import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createVolunteerProfile,
  getMyApplications,
  getVolunteerProfile,
  updateVolunteerProfile,
} from "../shared/api/volunteerApi";
import { useState } from "react";

function toNullableNumber(value) {
  if (value === "" || value == null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

export function VolunteerProfilePage() {
  const queryClient = useQueryClient();
  const [message, setMessage] = useState("");

  const profileQuery = useQuery({
    queryKey: ["volunteer", "profile"],
    queryFn: getVolunteerProfile,
  });

  const applicationsQuery = useQuery({
    queryKey: ["volunteer", "applications"],
    queryFn: getMyApplications,
  });

  const saveMutation = useMutation({
    mutationFn: async (payload) => {
      if (profileQuery.data) {
        return updateVolunteerProfile(payload);
      }
      return createVolunteerProfile(payload);
    },
    onSuccess: () => {
      setMessage("Profile saved.");
      queryClient.invalidateQueries({ queryKey: ["volunteer", "profile"] });
    },
    onError: (error) => {
      setMessage(error?.response?.data?.error || error?.response?.data?.Error || "Cannot save profile.");
    },
  });

  function handleSave(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const payload = {
      fullName: String(formData.get("fullName") || ""),
      phone: String(formData.get("phone") || ""),
      address: String(formData.get("address") || ""),
      bio: String(formData.get("bio") || "") || null,
      bloodGroup: String(formData.get("bloodGroup") || "") || null,
      avatar: String(formData.get("avatar") || "") || null,
      languagesText: String(formData.get("languagesText") || "") || null,
      interestsText: String(formData.get("interestsText") || "") || null,
      latitude: toNullableNumber(formData.get("latitude")),
      longitude: toNullableNumber(formData.get("longitude")),
      skills: String(formData.get("skills") || "")
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    };

    saveMutation.mutate(payload);
  }

  const profile = profileQuery.data;
  const totalHours = profile?.totalVolunteerHours ?? 0;
  const totalApplications = applicationsQuery.data?.length ?? 0;

  return (
    <div className="card-stack">
      <section className="card">
        <h2>Volunteer Profile</h2>
        <p className="muted">Cap nhat ho so ky nang va thong tin ca nhan.</p>
      </section>

      <section className="card">
        <h3>Passport Summary</h3>
        <p><strong>Total volunteer hours:</strong> {totalHours}</p>
        <p><strong>Total applications:</strong> {totalApplications}</p>
      </section>

      <section className="card">
        <h3>Profile Form</h3>
        {profileQuery.isLoading && <p className="muted">Loading profile...</p>}
        <form className="form-grid" onSubmit={handleSave}>
          <label>Full Name</label>
          <input name="fullName" defaultValue={profile?.fullName ?? ""} required />

          <label>Phone</label>
          <input name="phone" defaultValue={profile?.phone ?? ""} required />

          <label>Address</label>
          <input name="address" defaultValue={profile?.address ?? ""} required />

          <label>Skills (comma separated)</label>
          <input name="skills" defaultValue={(profile?.skills ?? []).join(", ")} />

          <label>Languages</label>
          <input name="languagesText" defaultValue={profile?.languagesText ?? ""} />

          <label>Interests</label>
          <input name="interestsText" defaultValue={profile?.interestsText ?? ""} />

          <label>Blood Group</label>
          <input name="bloodGroup" defaultValue={profile?.bloodGroup ?? ""} />

          <label>Bio</label>
          <textarea name="bio" defaultValue={profile?.bio ?? ""} />

          <label>Latitude</label>
          <input name="latitude" defaultValue={profile?.latitude ?? ""} />

          <label>Longitude</label>
          <input name="longitude" defaultValue={profile?.longitude ?? ""} />

          <button className="button-primary" type="submit" disabled={saveMutation.isPending}>
            {saveMutation.isPending ? "Saving..." : "Save profile"}
          </button>
        </form>
        {message && <p className="muted">{message}</p>}
      </section>
    </div>
  );
}
