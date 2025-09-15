import { notFound } from "next/navigation";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import DefaultTemplate from "./templates/DefaultTemplate";

interface Portfolio {
  name: string;
  username: string;
  email: string;
  profile_pic: string;
  headline: string;
  about: string;
  experiences: Array<{
    company: string;
    role: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    school: string;
    degree: string;
    year: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    link?: string;
    image?: string;
  }>;
  skills: string[];
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    website?: string;
  };
  template: string;
}

interface PageProps {
  params: { username: string };
}

export default async function PortfolioPage({ params: { username } }: PageProps) {
  // The 'username' variable is now directly available.
  // No need for: const username = params.username;

  if (!username) {
    return notFound();
  }

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/${username}`,
    { cache: "no-store" }
  );

  if (!res.ok) return notFound();

  const portfolio: Portfolio = await res.json();

  switch (portfolio.template) {
    case "modern":
      return <ModernTemplate data={portfolio} />;
    case "classic":
      return <ClassicTemplate data={portfolio} />;
    case "minimal":
      return <MinimalTemplate data={portfolio} />;
    default:
      return <DefaultTemplate data={portfolio} />;
  }
}

export type { Portfolio };
