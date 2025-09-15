"use client";
import { FormProps, Project } from "../types";
export default function ProjectsForm({ formData, setFormData }: FormProps) {
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "", image: "" },
      ],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
  const updated = [...formData.projects];
  updated[index][field] = value;
  setFormData({ ...formData, projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updated });
  };


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Projects</h2>
      {formData.projects.map((proj, i) => (
        <div key={i} className="border p-4 rounded space-y-2">
          <input
            type="text"
            placeholder="Project Title"
            value={proj.title}
            onChange={(e) => updateProject(i, "title", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <textarea
            placeholder="Project Description"
            value={proj.description}
            onChange={(e) => updateProject(i, "description", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            placeholder="Project Link"
            value={proj.link}
            onChange={(e) => updateProject(i, "link", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <input
            type="url"
            placeholder="Image URL"
            value={proj.image}
            onChange={(e) => updateProject(i, "image", e.target.value)}
            className="w-full p-2 border rounded"
          />
          <button
            onClick={() => removeProject(i)}
            className="text-red-500 text-sm"
          >
            Remove
          </button>
        </div>
      ))}
      <button
        onClick={addProject}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Add Project
      </button>
    </div>
  );
}
