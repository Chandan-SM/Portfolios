"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, X, Menu, ArrowRight } from 'lucide-react';
import Image from "../../components/Image";
import { useState } from "react";

export default function MinimalTemplate({ data }: { data: Portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fallbackImageSrc = "https://res.cloudinary.com/dmewxwr0i/image/upload/v1758277151/Image_ejtzgb.png";
  
  return (
    <div className="min-h-screen bg-white text-gray-900 selection:bg-gray-100">
      {/* Navigation - Simple top bar */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm border-b border-gray-100 z-50">
        <div className="max-w-4xl mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="text-xl font-medium text-gray-900">
              {data.name}
            </div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="lg:hidden p-1 text-gray-600 hover:text-gray-900"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
            <ul className={`lg:flex flex-col lg:flex-row items-start lg:items-center gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent pt-4 lg:pt-0 border-t lg:border-none ${
              menuOpen ? 'block' : 'hidden'
            }`}>
              <li><a href="#about" className="block py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">About</a></li>
              <li><a href="#experience" className="block py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Experience</a></li>
              <li><a href="#projects" className="block py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Projects</a></li>
              <li><a href="#skills" className="block py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Skills</a></li>
              <li><a href="#contact" className="block py-2 text-sm text-gray-600 hover:text-gray-900 font-medium transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section - Full viewport with max width */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4">
        <div className="max-w-2xl mx-auto text-center">
          {data.profile_pic && (
            <div className="mb-8">
              <Image
                src={data.profile_pic}
                alt={data.name}
                width={120}
                height={120}
                className="w-24 h-24 rounded-full object-cover mx-auto grayscale hover:grayscale-0 transition-all duration-300"
                fallback={fallbackImageSrc}
              />
            </div>
          )}
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-light tracking-tight text-gray-900 mb-4 leading-tight">
            {data.name}
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-md mx-auto leading-relaxed">
            {data.headline}
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <div className="flex gap-4">
              {data.socials.github && (
                <a 
                  href={data.socials.github} 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5" />
                </a>
              )}
              {data.socials.linkedin && (
                <a 
                  href={data.socials.linkedin} 
                  className="text-gray-500 hover:text-gray-900 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
            </div>
            <a 
              href={`mailto:${data.email}`} 
              className="px-6 py-3 border border-gray-300 text-gray-900 rounded-full hover:border-gray-400 transition-all duration-200 font-medium text-sm flex items-center gap-2 hover:shadow-sm"
            >
              <Mail className="w-4 h-4" />
              {data.email}
            </a>
          </div>
        </div>
      </section>

      {/* Content Wrapper - Single column with generous spacing */}
      <div className="max-w-3xl mx-auto px-4 pb-20">
        {/* About Section - Simple heading and paragraph */}
        <section id="about" className="py-20">
          <h2 className="text-3xl font-light text-gray-900 mb-8 border-b border-gray-100 pb-4">
            About
          </h2>
          <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg">{data.about}</p>
          </div>
        </section>

        {/* Experience Section - Clean timeline-like list */}
        <section id="experience" className="py-20 border-t border-gray-100">
          <h2 className="text-3xl font-light text-gray-900 mb-12 border-b border-gray-100 pb-4">
            Experience
          </h2>
          <div className="space-y-16">
            {data.experiences.map((exp, i) => (
              <div key={i} className="group relative">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-2xl font-medium text-gray-900">{exp.role}</h3>
                  <span className="text-sm text-gray-500 whitespace-nowrap">{exp.duration}</span>
                </div>
                <p className="text-lg text-gray-600 mb-4 italic">{exp.company}</p>
                <p className="text-gray-700 leading-relaxed text-lg">{exp.description}</p>
                {i < data.experiences.length - 1 && (
                  <div className="absolute left-0 top-8 h-16 border-l-2 border-gray-200"></div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section - Stacked cards with minimal borders */}
        <section id="projects" className="py-20 border-t border-gray-100">
          <h2 className="text-3xl font-light text-gray-900 mb-12 border-b border-gray-100 pb-4">
            Projects
          </h2>
          <div className="space-y-20">
            {data.projects.map((project, i) => (
              <article key={i} className="group">
                {project.image && (
                  <div className="mb-8 overflow-hidden rounded-lg">
                    <Image 
                      src={project.image} 
                      alt={project.title} 
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-500"
                      fallback={fallbackImageSrc}
                    />
                  </div>
                )}
                <h3 className="text-2xl font-medium text-gray-900 mb-3">{project.title}</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">{project.description}</p>
                {project.link && (
                  <a 
                    href={project.link} 
                    className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium text-sm transition-colors duration-200"
                  >
                    View Project 
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </a>
                )}
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section - Inline list */}
        <section id="skills" className="py-20 border-t border-gray-100">
          <h2 className="text-3xl font-light text-gray-900 mb-8 border-b border-gray-100 pb-4">
            Skills
          </h2>
          <ul className="flex flex-wrap gap-4 text-sm text-gray-600">
            {data.skills.map((skill, i) => (
              <li key={i} className="font-medium">
                {skill}
                {i < data.skills.length - 1 && <span>, </span>}
              </li>
            ))}
          </ul>
        </section>

        {/* Contact Section - Bottom aligned, simple */}
        <section id="contact" className="py-20 border-t border-gray-100">
          <h2 className="text-3xl font-light text-gray-900 mb-8 border-b border-gray-100 pb-4">
            Contact
          </h2>
          <div className="text-center">
            <p className="text-gray-600 mb-8 text-lg">{`Let's connect.`}</p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center sm:items-center">
              <a 
                href={`mailto:${data.email}`} 
                className="px-6 py-3 border border-gray-300 text-gray-900 rounded-full hover:border-gray-400 transition-all duration-200 font-medium text-sm flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <Mail className="w-4 h-4" />
                Email me
              </a>
            </div>
          </div>
        </section>
      </div>

      {/* Footer - Minimal */}
      <footer className="border-t border-gray-100 py-8 text-center text-xs text-gray-400">
        <p>&copy; {new Date().getFullYear()} {data.name.split(' ')[0]}. Made with care.</p>
      </footer>
    </div>
  );
};