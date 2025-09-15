"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, ChevronDown, X, Menu, ArrowRight } from 'lucide-react';
import Image from "next/image";
import { useEffect, useState } from "react";

// The main component for the Modern portfolio template.
export default function ModernTemplate({ data }: { data: Portfolio }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-cyan-900/20"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-600/30 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600/20 rounded-full blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            {data.name.split(' ')[0]}
          </span>
          <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden">
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <div className={`${menuOpen ? 'flex' : 'hidden'} md:flex flex-col md:flex-row absolute md:relative top-full left-0 w-full md:w-auto bg-black/90 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 gap-6`}>
            <a href="#about" className="hover:text-purple-400 transition-colors">About</a>
            <a href="#experience" className="hover:text-purple-400 transition-colors">Experience</a>
            <a href="#projects" className="hover:text-purple-400 transition-colors">Projects</a>
            <a href="#contact" className="hover:text-purple-400 transition-colors">Contact</a>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-6 z-10">
        <div className="text-center" style={{transform: `translateY(${scrollY * 0.3}px)`}}>
          {data.profile_pic && (
            <div className="relative inline-block mb-8">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <Image
                src={data.profile_pic}
                alt={data.name}
                width={20}
                height={20}
                className="relative w-40 h-40 rounded-full object-cover border-2 border-white/20"
              />
            </div>
          )}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-black mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300%">
                {data.name}
              </span>
            </h1>
            <p className="text-2xl md:text-3xl text-gray-300 mb-8">{data.headline}</p>
            <div className="flex gap-4 justify-center">
              {data.socials.github && (
                <a href={data.socials.github} className="p-3 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-110">
                  <Github className="w-6 h-6" />
                </a>
              )}
              {data.socials.linkedin && (
                <a href={data.socials.linkedin} className="p-3 backdrop-blur-xl bg-white/10 rounded-xl border border-white/20 hover:bg-white/20 transition-all hover:scale-110">
                  <Linkedin className="w-6 h-6" />
                </a>
              )}
              <a href={`mailto:${data.email}`} className="px-6 py-3 backdrop-blur-xl bg-gradient-to-r from-purple-600/50 to-cyan-600/50 rounded-xl border border-white/20 hover:from-purple-600/70 hover:to-cyan-600/70 transition-all hover:scale-110 flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </div>
          </div>
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-12">
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              About Me
            </h2>
            <p className="text-xl text-gray-300 leading-relaxed">{data.about}</p>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 px-6 py-24">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Experience
          </h2>
          <div className="space-y-8">
            {data.experiences.map((exp, i) => (
              <div key={i} className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 hover:bg-white/10 transition-all hover:scale-[1.02]">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
                    <p className="text-xl text-purple-400">{exp.company}</p>
                  </div>
                  <span className="text-gray-400">{exp.duration}</span>
                </div>
                <p className="text-gray-300">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.projects.map((project, i) => (
              <div key={i} className="group relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-3xl opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all">
                  {project.image && (
                    <div className="h-48 overflow-hidden">
                      <Image width={20} height={20} src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                    <p className="text-gray-400 mb-4">{project.description}</p>
                    {project.link && (
                      <a href={project.link} className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300">
                        View Project <ArrowRight className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative z-10 px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
            Tech Stack
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {data.skills.map((skill, i) => (
              <span key={i} className="px-6 py-3 backdrop-blur-xl bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-all hover:scale-110">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
        .bg-300\% {
          background-size: 300% 300%;
        }
      `}</style>
    </div>
  );
};