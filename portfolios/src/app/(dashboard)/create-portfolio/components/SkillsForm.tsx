"use client";
import { FormProps } from "../types";
export default function SkillsForm({ formData, setFormData }: FormProps) {
  const addSkill = () => {
    setFormData({
      ...formData,
      skills: [...formData.skills, ""],
    });
  };

  const updateSkill = (index: number, value: string) => {
  const updated = [...formData.skills];
  updated[index] = value;
  setFormData({ ...formData, skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = formData.skills.filter((_, i) => i !== index);
    setFormData({ ...formData, skills: updated });
  };


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Skills</h2>
      <div className="flex flex-wrap gap-2">
        {formData.skills.map((skill, i) => (
          <div key={i} className="flex items-center gap-2 border p-2 rounded">
            <input
              type="text"
              placeholder="Skill"
              value={skill}
              onChange={(e) => updateSkill(i, e.target.value)}
              className="p-1 border rounded"
            />
            <button
              onClick={() => removeSkill(i)}
              className="text-red-500 text-sm"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
      <button
        onClick={addSkill}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Skill
      </button>
    </div>
  );
}
