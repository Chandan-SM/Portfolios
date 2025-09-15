import { Portfolio } from "../page";
import { Github, Globe, Linkedin, Mail, Briefcase, GraduationCap, Code, User, Folder, ExternalLink } from 'lucide-react';

import Image from "next/image";

// The main component for the Default portfolio template.
export default function DefaultTemplate({ data }: { data: Portfolio }) {
  // const [activeSection, setActiveSection] = useState('about');
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <header className="relative overflow-hidden bg-white shadow-xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-cyan-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-6 py-20">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-full blur-2xl opacity-30 scale-110"></div>
              {data.profile_pic && (
                <Image
                  src={data.profile_pic}
                  alt={data.name}
                  width={20}
                  height={20}
                  className="relative w-48 h-48 rounded-full object-cover border-4 border-white shadow-2xl"
                />
              )}
            </div>
            <div className="text-center md:text-left">
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                {data.name}
              </h1>
              <p className="text-2xl text-slate-600 mt-4">{data.headline}</p>
              <div className="flex flex-wrap gap-4 mt-8 justify-center md:justify-start">
                <a href={`mailto:${data.email}`} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:shadow-lg transition-all hover:scale-105">
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </a>
                <div className="flex gap-3">
                  {data.socials.github && (
                    <a href={data.socials.github} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                      <Github className="w-6 h-6 text-slate-700" />
                    </a>
                  )}
                  {data.socials.linkedin && (
                    <a href={data.socials.linkedin} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                      <Linkedin className="w-6 h-6 text-slate-700" />
                    </a>
                  )}
                  {data.socials.website && (
                    <a href={data.socials.website} className="p-3 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                      <Globe className="w-6 h-6 text-slate-700" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-12">
            {/* About */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <User className="w-8 h-8 text-blue-600" />
                About Me
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">{data.about}</p>
            </section>

            {/* Experience */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <Briefcase className="w-8 h-8 text-blue-600" />
                Experience
              </h2>
              <div className="space-y-8">
                {data.experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-blue-200">
                    <div className="absolute -left-2 top-0 w-4 h-4 bg-blue-600 rounded-full"></div>
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6">
                      <h3 className="text-xl font-bold text-slate-800">{exp.role}</h3>
                      <p className="text-lg text-blue-600 font-semibold">{exp.company}</p>
                      <p className="text-sm text-slate-500 mt-1">{exp.duration}</p>
                      <p className="text-slate-600 mt-3">{exp.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3">
                <Folder className="w-8 h-8 text-blue-600" />
                Projects
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                {data.projects.map((project, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-blue-50 border border-slate-200 hover:shadow-xl transition-all">
                    {project.image && (
                      <div className="h-48 overflow-hidden">
                        <Image src={project.image} alt={project.title} width={20} height={20} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                      </div>
                    )}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-slate-800">{project.title}</h3>
                      <p className="text-slate-600 mt-2">{project.description}</p>
                      {project.link && (
                        <a href={project.link} className="inline-flex items-center gap-2 mt-4 text-blue-600 hover:text-blue-700 font-semibold">
                          View Project <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Skills */}
            <section className="bg-white rounded-2xl p-8 shadow-lg sticky top-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                <Code className="w-6 h-6 text-blue-600" />
                Skills
              </h2>
              <div className="flex flex-wrap gap-3">
                {data.skills.map((skill, i) => (
                  <span key={i} className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold hover:shadow-md transition-shadow">
                    {skill}
                  </span>
                ))}
              </div>

              {/* Education */}
              <h2 className="text-2xl font-bold text-slate-800 mb-6 mt-10 flex items-center gap-3">
                <GraduationCap className="w-6 h-6 text-blue-600" />
                Education
              </h2>
              {data.education.map((edu, i) => (
                <div key={i} className="bg-gradient-to-r from-slate-50 to-blue-50 rounded-xl p-4">
                  <h3 className="font-bold text-slate-800">{edu.school}</h3>
                  <p className="text-slate-600">{edu.degree}</p>
                  <p className="text-sm text-slate-500">{edu.year}</p>
                </div>
              ))}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};