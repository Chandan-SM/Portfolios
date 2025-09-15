"use client";

import { FormProps } from "../types";

export default function BasicInfoForm({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Basic Info</h2>
      <input
        type="text"
        placeholder="Full Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Username (used in URL)"
        value={formData.username}
        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Profile Picture URL"
        value={formData.profilePic}
        onChange={(e) => setFormData({ ...formData, profilePic: e.target.value })}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
