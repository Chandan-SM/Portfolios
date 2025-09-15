"use client";

import { FormProps } from "../types";

export default function AboutForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">About Me</h2>
      <input
        type="text"
        placeholder="Headline (e.g., Full Stack Developer)"
        value={formData.headline}
        onChange={(e) => setFormData({ ...formData, headline: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Short bio about yourself..."
        value={formData.about}
        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
        className="w-full p-2 border rounded"
        rows={4}
      />
    </div>
  );
}
