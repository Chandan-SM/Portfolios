// app/create-portfolio/types.ts
import React from "react";

export interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
}

export interface Education {
  school: string;
  degree: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  link: string;
  image: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  twitter: string;
  website: string;
}

export interface PortfolioFormData {
  name: string;
  username: string;
  email: string;
  profilePic: string;
  headline: string;
  about: string;
  experiences: Experience[];
  education: Education[];
  projects: Project[];
  skills: string[];
  socials: SocialLinks;
  template: string;
}

export type FormProps = {
  formData: PortfolioFormData;
  setFormData: React.Dispatch<React.SetStateAction<PortfolioFormData>>;
};

export type ReadonlyFormProps = {
  formData: PortfolioFormData;
};
