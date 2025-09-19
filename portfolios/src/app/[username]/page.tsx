import { notFound } from "next/navigation";
import ModernTemplate from "./templates/ModernTemplate";
import ClassicTemplate from "./templates/ClassicTemplate";
import MinimalTemplate from "./templates/MinimalTemplate";
import DefaultTemplate from "./templates/DefaultTemplate";
import DarkTemplate from "./templates/DarkTemplate";
import { Metadata } from "next";

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
  params: Promise<{ username: string }>;
}

// Dynamic metadata generation function
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { username } = await params;

  if (!username) {
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found.",
    };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/portfolio/${username}`,
      { 
        cache: "no-store",
      }
    );

    if (!res.ok) {
      throw new Error("Portfolio not found");
    }

    const portfolio: Portfolio = await res.json();

    // Base URL for absolute image paths (required for Open Graph/Twitter)
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"; // Replace with your actual domain

    // Generate keywords from skills, headline, and about (truncated for meta)
    const keywords = [
      ...portfolio.skills.slice(0, 5), // Top 5 skills
      portfolio.headline.toLowerCase().replace(/[^\w\s]/g, '').split(' ').slice(0, 3), // Keywords from headline
      "software engineer", "developer", "portfolio" // Fallback keywords
    ].filter(Boolean).join(", ");

    // Truncate descriptions for meta (keep under 160 chars for description, 200 for OG)
    const metaDescription = portfolio.about.length > 155 
      ? `${portfolio.about.substring(0, 155)}...` 
      : portfolio.about || portfolio.headline;

    const ogDescription = portfolio.headline.length > 195 
      ? `${portfolio.headline.substring(0, 195)}...` 
      : portfolio.headline;

    return {
      // Basic Metadata
      title: `${portfolio.name} | ${portfolio.headline}`,
      description: metaDescription,
      keywords: keywords,
      authors: [{ name: portfolio.name }],
      creator: portfolio.name,
      publisher: portfolio.name,

      // Open Graph (Facebook, LinkedIn, etc.)
            openGraph: {
              title: `${portfolio.name} - ${portfolio.headline}`,
              description: ogDescription,
              url: `${baseUrl}/portfolio/${username}`,
              siteName: `${portfolio.name}'s Portfolio`,
              images: [
                {
                  url: portfolio.profile_pic || `${baseUrl}/default-profile.jpg`, // Fallback to default if no profile_pic
                  width: 1200,
                  height: 630,
                  alt: `${portfolio.name}'s professional profile`,
                  type: "image/jpeg",
                },
                {
                  url: portfolio.projects[0]?.image || `${baseUrl}/default-og.jpg`, // Featured project as secondary image
                  width: 1200,
                  height: 630,
                  alt: "Featured Project",
                },
              ],
              locale: "en_US",
              type: "profile",
            },

      // Twitter Cards (X/Twitter)
      twitter: {
        card: "summary_large_image",
        title: `${portfolio.name} | ${portfolio.headline}`,
        description: ogDescription,
        site: `@${portfolio.socials.twitter?.split('/').pop() || portfolio.username}`, // Use Twitter handle if available
        creator: `@${portfolio.socials.twitter?.split('/').pop() || portfolio.username}`,
        images: [
          portfolio.profile_pic || `${baseUrl}/default-profile.jpg`,
        ],
      },

      // Additional: Robots, Canonical, Alternates
      robots: {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          "max-video-preview": -1,
          "max-image-preview": "large",
          "max-snippet": -1,
        },
      },
      alternates: {
        canonical: `${baseUrl}/portfolio/${username}`,
      },
      category: "technology",
      other: {
        "theme-color": "#3b82f6", // Blue theme color for address bar
        "color-scheme": "light dark", // Support for dark mode
        "apple-mobile-web-app-title": portfolio.name,
        "application-name": portfolio.name,
      },

      // Verification for search consoles (if needed)
      // verification: {
      //   google: process.env.GOOGLE_VERIFICATION_TOKEN, // Optional: Add your token
      //   yandex: process.env.YANDEX_VERIFICATION_TOKEN, // Optional
      // },
    };
  } catch {
    // Fallback metadata for 404 or errors
    return {
      title: "Portfolio Not Found",
      description: "The requested portfolio could not be found. Explore other developer portfolios.",
      openGraph: {
        title: "Portfolio Not Found",
        description: "The requested portfolio could not be found.",
        images: [`${process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"}/default-og.jpg`],
      },
      robots: {
        index: false,
        follow: false,
      },
    };
  }
}

export default async function PortfolioPage(props: PageProps) {
  const params = await props.params;

  const {
    username
  } = params;

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
    case "dark":
      return <DarkTemplate data={portfolio} />;
    default:
      return <DefaultTemplate data={portfolio} />;
  }
}

export type { Portfolio };