"use client";

import { useState } from "react";
import { PortfolioFormData } from "./types";
import BasicInfoForm from "./components/BasicInfoForm";
import AboutForm from "./components/AboutForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import ProjectsForm from "./components/ProjectsForm";
import SkillsForm from "./components/SkillsForm";
import SocialLinksForm from "./components/SocialLinksForm";
import TemplateSelector from "./components/TemplateSelector";
import PublishButton from "./components/PublishButton";

export default function CreatePortfolioPage() {
  const [formData, setFormData] = useState<PortfolioFormData>({
    name: "",
    username: "",
    email: "",
    profilePic: "",
    headline: "",
    about: "",
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    socials: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    template: "",
  });

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold">Create Your Portfolio</h1>

      <BasicInfoForm formData={formData} setFormData={setFormData} />
      <AboutForm formData={formData} setFormData={setFormData} />
      <ExperienceForm formData={formData} setFormData={setFormData} />
      <EducationForm formData={formData} setFormData={setFormData} />
      <ProjectsForm formData={formData} setFormData={setFormData} />
      <SkillsForm formData={formData} setFormData={setFormData} />
      <SocialLinksForm formData={formData} setFormData={setFormData} />
      <TemplateSelector formData={formData} setFormData={setFormData} />

      <PublishButton formData={formData} />
    </div>
  );
}
