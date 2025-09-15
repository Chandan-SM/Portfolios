"use client";

// import Image from "next/image";
import { FormProps } from "../types";
const templates = [
  { id: "modern", name: "Modern", preview: "/templates/modern.png" },
  { id: "classic", name: "Classic", preview: "/templates/classic.png" },
  { id: "minimal", name: "Minimal", preview: "/templates/minimal.png" },
];
export default function TemplateSelector({ formData, setFormData }: FormProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Choose a Template</h2>
      <div className="grid grid-cols-3 gap-4">
        {templates.map((tpl) => (
          <div
            key={tpl.id}
            className={`border p-2 rounded cursor-pointer ${
              formData.template === tpl.id ? "border-blue-500" : ""
            }`}
            onClick={() => setFormData({ ...formData, template: tpl.id })}
          >
            {/* <Image src={tpl.preview} alt={tpl.name} className="w-full rounded" /> */}
            <p className="text-center mt-2">{tpl.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
