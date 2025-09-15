import { Portfolio } from "../page";
import { Github, Linkedin, Mail } from "lucide-react";
import Image from "next/image";

export default function MinimalTemplate({ data }: { data: Portfolio }) {
  return (
    <div className="bg-white text-gray-900 font-sans antialiased">
      <div className="max-w-3xl mx-auto px-6 py-20">
        {/* Header */}
        <header className="text-center space-y-6">
          {data.profile_pic && (
            <Image
              src={data.profile_pic}
              alt={data.name}
              width={128}
              height={128}
              className="rounded-full mx-auto ring-2 ring-gray-200"
            />
          )}
          <h1 className="text-4xl font-bold tracking-tight">{data.name}</h1>
          <p className="text-lg text-gray-500">{data.headline}</p>
          <div className="flex justify-center gap-6 mt-4">
            <a href={`mailto:${data.email}`} className="text-gray-400 hover:text-black transition-colors">
              <Mail className="w-5 h-5" />
            </a>
            {data.socials.github && (
              <a href={data.socials.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <Github className="w-5 h-5" />
              </a>
            )}
            {data.socials.linkedin && (
              <a href={data.socials.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-black transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            )}
          </div>
        </header>

        <main className="mt-20 space-y-20">
          {/* About */}
          <section>
            <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
              About
            </h2>
            <p className="text-gray-700 leading-relaxed">{data.about}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
              Experience
            </h2>
            <div className="space-y-10">
              {data.experiences.map((exp, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span className="font-medium text-gray-800">{exp.company}</span>
                    <span>{exp.duration}</span>
                  </div>
                  <h3 className="text-lg font-semibold">{exp.role}</h3>
                  <p className="text-gray-700">{exp.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-2xl font-semibold mb-6 border-b border-gray-200 pb-2">
              Projects
            </h2>
            <div className="space-y-12">
              {data.projects.map((project, i) => (
                <div key={i}>
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <p className="text-gray-700 mt-2">{project.description}</p>
                  {project.link && (
                    <a
                      href={project.link}
                      className="text-sm text-gray-500 hover:text-black mt-2 inline-block"
                    >
                      View Project →
                    </a>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Skills & Education */}
          <section className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
                Skills
              </h2>
              <ul className="space-y-2 text-gray-700">
                {data.skills.map((skill, i) => (
                  <li key={i}>• {skill}</li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-semibold mb-4 border-b border-gray-200 pb-2">
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
        <footer className="text-center mt-24 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} {data.name}
          </p>
        </footer>
      </div>
    </div>
  );
}
