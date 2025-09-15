"use client";
import { FormProps, SocialLinks } from "../types";
export default function SocialLinksForm({ formData, setFormData }: FormProps) {
  const updateSocial = (field: keyof SocialLinks, value: string) => {
    setFormData({
      ...formData,
      socials: { ...formData.socials, [field]: value },
    });
  };


  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Social Links</h2>
      <input
        type="url"
        placeholder="GitHub"
        value={formData.socials.github}
        onChange={(e) => updateSocial("github", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="LinkedIn"
        value={formData.socials.linkedin}
        onChange={(e) => updateSocial("linkedin", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Twitter"
        value={formData.socials.twitter}
        onChange={(e) => updateSocial("twitter", e.target.value)}
        className="w-full p-2 border rounded"
      />
      <input
        type="url"
        placeholder="Website"
        value={formData.socials.website}
        onChange={(e) => updateSocial("website", e.target.value)}
        className="w-full p-2 border rounded"
      />
    </div>
  );
}
