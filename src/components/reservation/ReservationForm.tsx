"use client";

import { useState, FormEvent } from "react";
import Button from "@/components/ui/Button";

export default function ReservationForm() {
  const [form, setForm] = useState({
    customer_name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    notes: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, guests: parseInt(form.guests) }),
      });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error?.message || "Failed to book");
      }
      setStatus("success");
      setForm({ customer_name: "", phone: "", date: "", time: "", guests: "2", notes: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Name *</label>
          <input
            type="text"
            required
            value={form.customer_name}
            onChange={(e) => setForm({ ...form, customer_name: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Phone *</label>
          <input
            type="tel"
            required
            pattern="03[0-9]{9}"
            placeholder="03XXXXXXXXX"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-1">Date *</label>
          <input
            type="date"
            required
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Time *</label>
          <input
            type="time"
            required
            value={form.time}
            onChange={(e) => setForm({ ...form, time: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Guests *</label>
          <select
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: e.target.value })}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm"
          >
            {Array.from({ length: 20 }, (_, i) => (
              <option key={i + 1} value={i + 1}>
                {i + 1} {i === 0 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Special Requests</label>
        <textarea
          rows={3}
          value={form.notes}
          onChange={(e) => setForm({ ...form, notes: e.target.value })}
          placeholder="Birthday celebration, wheelchair access, etc."
          className="w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gradient-start text-sm resize-none"
        />
      </div>
      {status === "success" && (
        <p className="text-green-600 text-sm">Reservation submitted! We&apos;ll confirm shortly.</p>
      )}
      {status === "error" && <p className="text-red-600 text-sm">{errorMsg}</p>}
      <Button type="submit" disabled={status === "loading"}>
        {status === "loading" ? "Booking..." : "Reserve Table"}
      </Button>
    </form>
  );
}
