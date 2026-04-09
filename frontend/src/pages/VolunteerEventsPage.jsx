import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { applyToEvent, listVolunteerEvents } from "../shared/api/volunteerApi";

export function VolunteerEventsPage() {
  const queryClient = useQueryClient();
  const [selectedEventId, setSelectedEventId] = useState("");
  const [motivationText, setMotivationText] = useState("");
  const [availabilityNote, setAvailabilityNote] = useState("");
  const [message, setMessage] = useState("");

  const eventsQuery = useQuery({
    queryKey: ["volunteer", "events"],
    queryFn: listVolunteerEvents,
  });

  const applyMutation = useMutation({
    mutationFn: applyToEvent,
    onSuccess: () => {
      setMessage("Application submitted successfully.");
      setMotivationText("");
      setAvailabilityNote("");
      queryClient.invalidateQueries({ queryKey: ["volunteer", "applications"] });
    },
    onError: (error) => {
      setMessage(error?.response?.data?.error || error?.response?.data?.Error || "Apply failed.");
    },
  });

  const payload = eventsQuery.data ?? { source: "api", items: [] };
  const selected = useMemo(
    () => payload.items.find((event) => event.id === selectedEventId),
    [payload.items, selectedEventId]
  );

  function handleApply(event) {
    event.preventDefault();
    if (!selectedEventId) {
      setMessage("Please select an event first.");
      return;
    }

    applyMutation.mutate({
      eventId: selectedEventId,
      motivationText,
      availabilityNote,
    });
  }

  return (
    <div className="card-stack">
      <section className="card">
        <h2>Volunteer Events</h2>
        <p className="muted">List/detail/apply flow for Phase 1.</p>
        {payload.source === "mock" && (
          <p className="muted">Public event API not found in backend yet. Showing fallback sample events.</p>
        )}
      </section>

      <section className="card">
        <h3>Event Listing</h3>
        {eventsQuery.isLoading && <p className="muted">Loading events...</p>}
        {eventsQuery.isError && <p className="muted">Cannot load events.</p>}
        <div className="list-grid">
          {payload.items.map((event) => (
            <button
              type="button"
              key={event.id}
              className={`card-subtle selectable ${selectedEventId === event.id ? "selected" : ""}`}
              onClick={() => setSelectedEventId(event.id)}
            >
              <h4>{event.title}</h4>
              <p>{event.address}</p>
              <p>{new Date(event.startAt).toLocaleString()}</p>
            </button>
          ))}
        </div>
      </section>

      {selected && (
        <section className="card">
          <h3>Event Detail</h3>
          <p><strong>Title:</strong> {selected.title}</p>
          <p><strong>Description:</strong> {selected.description}</p>
          <p><strong>Address:</strong> {selected.address}</p>
          <p><strong>Capacity:</strong> {selected.capacity}</p>
          <p><strong>Skills:</strong> {(selected.skills ?? []).join(", ")}</p>
        </section>
      )}

      <section className="card">
        <h3>Apply to Event</h3>
        <form className="form-grid" onSubmit={handleApply}>
          <label>Selected Event ID</label>
          <input value={selectedEventId} readOnly />

          <label>Motivation</label>
          <textarea value={motivationText} onChange={(e) => setMotivationText(e.target.value)} />

          <label>Availability Note</label>
          <textarea value={availabilityNote} onChange={(e) => setAvailabilityNote(e.target.value)} />

          <button className="button-primary" type="submit" disabled={applyMutation.isPending}>
            {applyMutation.isPending ? "Submitting..." : "Submit application"}
          </button>
        </form>
        {message && <p className="muted">{message}</p>}
      </section>
    </div>
  );
}
