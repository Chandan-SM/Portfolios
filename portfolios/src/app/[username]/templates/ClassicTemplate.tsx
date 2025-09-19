"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, ChevronDown, X, Menu, ArrowRight } from 'lucide-react';
import Image from "../../components/Image";
import { useState } from "react";

export default function ClassicTemplate({ data }: { data: Portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const fallbackImageSrc = "https://res.cloudinary.com/dmewxwr0i/image/upload/v1758277151/Image_ejtzgb.png";
  
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Header Background */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        {/* Navigation */}
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <div className="text-2xl font-bold text-gray-800">
              {data.name.split(' ')[0]}
            </div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)} 
              className="lg:hidden p-2 rounded-md hover:bg-gray-100 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <div className={`lg:flex flex-col lg:flex-row items-center gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent shadow-md lg:shadow-none p-4 lg:p-0 border-t border-gray-200 lg:border-none ${
              menuOpen ? 'block' : 'hidden'
            }`}>
              <a href="#about" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">About</a>
              <a href="#experience" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Experience</a>
              <a href="#projects" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Projects</a>
              <a href="#skills" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Skills</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-blue-600 font-medium transition-colors">Contact</a>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-white py-20 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {data.profile_pic && (
            <div className="mb-8 inline-block">
              <Image
                src={data.profile_pic}
                alt={data.name}
                width={160}
                height={160}
                className="w-32 h-32 sm:w-40 sm:h-40 rounded-full object-cover border-4 border-gray-200 shadow-lg mx-auto"
                fallback={fallbackImageSrc}
              />
            </div>
          )}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            {data.name}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-2xl mx-auto">
            {data.headline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex gap-4">
              {data.socials.github && (
                <a 
                  href={data.socials.github} 
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-gray-700" />
                </a>
              )}
              {data.socials.linkedin && (
                <a 
                  href={data.socials.linkedin} 
                  className="p-3 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-gray-700" />
                </a>
              )}
            </div>
            <a 
              href={`mailto:${data.email}`} 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
            >
              <Mail className="w-4 h-4" />
              Contact Me
            </a>
          </div>
          <div className="animate-bounce">
            <ChevronDown className="w-6 h-6 text-gray-400 mx-auto" />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
            About Me
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8">
            <p className="text-lg text-gray-700 leading-relaxed text-center">
              {data.about}
            </p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experiences.map((exp, i) => (
              <div key={i} className="bg-gray-50 rounded-lg p-6 sm:p-8 border border-gray-200 hover:shadow-md transition-shadow">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-blue-600 font-semibold text-sm">E</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{exp.role}</h3>
                      <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-gray-500 font-medium self-start sm:self-auto">{exp.duration}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {data.projects.map((project, i) => (
              <div key={i} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
                {project.image && (
                  <div className="h-48 overflow-hidden bg-gray-100">
                    <Image 
                      width={400}
                      height={200}
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
                      fallback={fallbackImageSrc}
                    />
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{project.title}</h3>
                  <p className="text-gray-600 mb-4 text-sm sm:text-base">{project.description}</p>
                  {project.link && (
                    <a 
                      href={project.link} 
                      className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                    >
                      View Project <ArrowRight className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {data.skills.map((skill, i) => (
              <span 
                key={i} 
                className="px-4 py-2 bg-blue-50 text-blue-700 rounded-full border border-blue-200 hover:bg-blue-100 transition-colors font-medium text-sm sm:text-base"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-12 text-center">
            Get In Touch
          </h2>
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 sm:p-8 text-center">
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              {`Interested in collaborating or have a project in mind? I'd love to hear from you!`}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${data.email}`} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2 w-full sm:w-auto justify-center"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};