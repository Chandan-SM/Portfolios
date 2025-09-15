"use client";

import { FormProps, Experience } from "../types";
export default function ExperienceForm({ formData, setFormData }: FormProps) {
  const addExperience = () => {
    setFormData({
      ...formData,
      experiences: [
        ...formData.experiences,
        { company: "", role: "", duration: "", description: "" },
      ],
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
  const updated = [...formData.experiences];
  updated[index][field] = value;
  setFormData({ ...formData, experiences: updated });
};

const removeExperience = (index: number) => {
  const updated = formData.experiences.filter((_, i) => i !== index);
  setFormData({ ...formData, experiences: updated });
};


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Work Experience</h2>
      {formData.experiences.map((exp, i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Company"
            value={exp.company}
            onChange={(e) => updateExperience(i, "company", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Role"
            value={exp.role}
            onChange={(e) => updateExperience(i, "role", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Duration"
            value={exp.duration}
            onChange={(e) => updateExperience(i, "duration", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Description"
            value={exp.description}
            onChange={(e) => updateExperience(i, "description", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => removeExperience(i)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addExperience}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Experience
      </button>
    </div>
  );
}
