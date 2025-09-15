import { Portfolio } from "../page";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function ClassicTemplate({ data }: { data: Portfolio }) {
  return (
    <div className="bg-gray-50 text-gray-900 font-serif">
      <div className="max-w-4xl mx-auto px-8 py-16">
        {/* Header */}
        <header className="flex flex-col items-center gap-6 text-center">
          {data.profile_pic && (
            <Image
              src={data.profile_pic}
              alt={data.name}
              width={140}
              height={140}
              className="rounded-full border-4 border-gray-200 shadow-sm"
            />
          )}
          <h1 className="text-5xl font-bold">{data.name}</h1>
          <p className="text-xl text-gray-600 italic">{data.headline}</p>
          <div className="flex gap-6 mt-2">
            <a href={`mailto:${data.email}`} className="text-gray-500 hover:text-gray-900 transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            {data.socials.github && (
              <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.socials.linkedin && (
              <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-900 transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </header>

        <main className="mt-20 space-y-16">
          {/* About */}
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
              Experience
            </h2>
            <div className="space-y-8">
              {data.experiences.map((exp, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-gray-700">
                    {exp.company} • {exp.duration}
                  </p>
                  <p className="text-gray-600 mt-2">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-6">
              Projects
            </h2>
            <div className="space-y-8">
              {data.projects.map((project, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-700 mt-1">{project.description}</p>
                  {project.link && (
                    <a href={project.link} className="text-sm text-gray-500 hover:text-gray-900 mt-2 inline-block">
                      View →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Education */}
          <section className="grid md:grid-cols-2 gap-10">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
                Skills
              </h2>
              <ul className="space-y-2 text-gray-700">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-wide border-b border-gray-300 pb-2 mb-4">
                Education
              </h2>
              <div className="space-y-4">
                {data.education.map((edu, i) => (
                  <div key={i}>
                    <h3 className="font-medium">{edu.school}</h3>
                    <p className="text-gray-700">{edu.degree}</p>
                    <p className="text-sm text-gray-500">{edu.year}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="text-center mt-16 pt-6 border-t border-gray-300">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {data.name} — All Rights Reserved
          </p>
        </footer>
      </div>
    </div>
  );
}
