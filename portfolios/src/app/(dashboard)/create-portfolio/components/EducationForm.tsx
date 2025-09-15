"use client";
import { FormProps, Education } from "../types";
export default function EducationForm({ formData, setFormData }: FormProps) {
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { school: "", degree: "", year: "" },
      ],
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
  const updated = [...formData.education];
  updated[index][field] = value;
  setFormData({ ...formData, education: updated });
  };

  const removeEducation = (index: number) => {
    const updated = formData.education.filter((_, i) => i !== index);
    setFormData({ ...formData, education: updated });
  };


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Education</h2>
      {formData.education.map((edu, i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="School / University"
            value={edu.school}
            onChange={(e) => updateEducation(i, "school", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Degree / Program"
            value={edu.degree}
            onChange={(e) => updateEducation(i, "degree", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="text"
            placeholder="Year"
            value={edu.year}
            onChange={(e) => updateEducation(i, "year", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => removeEducation(i)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addEducation}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Education
      </button>
    </div>
  );
}
