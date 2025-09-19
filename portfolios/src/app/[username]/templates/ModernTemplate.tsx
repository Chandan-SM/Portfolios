"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, ChevronDown, X, Menu, ArrowRight } from 'lucide-react';
import Image from "../../components/Image";
import { useEffect, useState } from "react";
import { motion } from 'framer-motion';

export default function ModernTemplate({ data }: { data: Portfolio }) {
  const [scrollY, setScrollY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const fallbackImageSrc = "https://res.cloudinary.com/dmewxwr0i/image/upload/v1758277151/Image_ejtzgb.png";
  
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Framer Motion variants for animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-cyan-900/10"></div>
        <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-blob"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-blob" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500/15 rounded-full blur-3xl animate-blob" style={{animationDelay: '6s'}}></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 backdrop-blur-xl bg-black/40 border-b border-white/10 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex justify-between items-center">
          <motion.span 
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent"
          >
            {data.name.split(' ')[0]}
          </motion.span>
          <button 
            onClick={() => setMenuOpen(!menuOpen)} 
            className="md:hidden p-2 rounded-lg backdrop-blur-xl bg-white/10 hover:bg-white/20 transition-all"
          >
            {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          <motion.div 
            initial={false}
            animate={{ 
              opacity: menuOpen ? 1 : 0, 
              height: menuOpen ? 'auto' : 0,
              y: menuOpen ? 0 : -10
            }}
            className={`md:flex flex-col md:flex-row absolute md:static top-full left-0 w-full md:w-auto bg-black/95 md:bg-transparent backdrop-blur-xl md:backdrop-blur-none p-6 md:p-0 gap-6 md:gap-8 transition-all duration-300 ease-in-out md:translate-y-0 ${
              menuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
            }`}
          >
            <a href="#about" className="text-lg hover:text-purple-400 transition-colors duration-300 font-medium">About</a>
            <a href="#experience" className="text-lg hover:text-purple-400 transition-colors duration-300 font-medium">Experience</a>
            <a href="#projects" className="text-lg hover:text-purple-400 transition-colors duration-300 font-medium">Projects</a>
            <a href="#skills" className="text-lg hover:text-purple-400 transition-colors duration-300 font-medium">Skills</a>
            <a href="#contact" className="text-lg hover:text-purple-400 transition-colors duration-300 font-medium">Contact</a>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 z-10">
        <motion.div 
          className="text-center w-full max-w-4xl" 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{transform: `translateY(${scrollY * 0.3}px)`}}
          transition={{ duration: 0.8 }}
        >
          {data.profile_pic && (
            <motion.div 
              className="relative inline-block mb-8 mx-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/30 to-cyan-500/30 rounded-full blur-xl animate-pulse"></div>
              <Image
                src={data.profile_pic}
                alt={data.name}
                width={160}
                height={160}
                className="relative w-40 h-40 sm:w-48 sm:h-48 rounded-full object-cover border-4 border-white/30 shadow-2xl"
                fallback={fallbackImageSrc}
              />
            </motion.div>
          )}
          <div className="relative">
            <motion.h1 
              className="text-5xl sm:text-7xl md:text-9xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
            >
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-300%">
                {data.name}
              </span>
            </motion.h1>
            <motion.p 
              className="text-xl sm:text-2xl md:text-3xl text-gray-300 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
            >
              {data.headline}
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <div className="flex gap-3">
                {data.socials.github && (
                  <a 
                    href={data.socials.github} 
                    className="p-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="GitHub"
                  >
                    <Github className="w-6 h-6" />
                  </a>
                )}
                {data.socials.linkedin && (
                  <a 
                    href={data.socials.linkedin} 
                    className="p-3 backdrop-blur-xl bg-white/10 rounded-2xl border border-white/20 hover:bg-white/20 hover:scale-110 transition-all duration-300 shadow-lg"
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
              </div>
              <a 
                href={`mailto:${data.email}`} 
                className="px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-purple-600/60 to-cyan-600/60 rounded-2xl border border-white/20 hover:from-purple-600/80 hover:to-cyan-600/80 transition-all duration-300 hover:scale-105 shadow-xl font-semibold flex items-center gap-2"
              >
                <Mail className="w-5 h-5" />
                Contact Me
              </a>
            </motion.div>
          </div>
          <motion.div 
            className="absolute bottom-6 left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-8 h-8 text-white/40" />
          </motion.div>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 shadow-2xl"
          >
            <motion.h2 
              variants={itemVariants}
              className="text-4xl sm:text-5xl font-bold mb-8 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              About Me
            </motion.h2>
            <motion.p 
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-300 leading-relaxed text-center max-w-3xl mx-auto"
            >
              {data.about}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="relative z-10 px-4 sm:px-6 py-24 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Experience
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="space-y-8"
          >
            {data.experiences.map((exp, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-6 sm:p-8 hover:bg-white/10 hover:scale-[1.02] transition-all duration-300 shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">R</span> {/* Placeholder for role icon */}
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{exp.role}</h3>
                      <p className="text-lg text-purple-400 font-semibold">{exp.company}</p>
                    </div>
                  </div>
                  <span className="text-gray-400 text-sm sm:text-base font-medium">{exp.duration}</span>
                </div>
                <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-16 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Featured Projects
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          >
            {data.projects.map((project, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="group relative overflow-hidden rounded-3xl shadow-2xl"
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 blur-sm"></div>
                <div className="relative backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 overflow-hidden hover:bg-white/10 transition-all duration-300">
                  {project.image && (
                    <div className="h-40 sm:h-48 overflow-hidden bg-black/20">
                      <Image 
                        width={400}
                        height={200}
                        src={project.image} 
                        alt={project.title} 
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        fallback={fallbackImageSrc}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-lg sm:text-xl font-bold mb-3 text-white">{project.title}</h3>
                    <p className="text-gray-400 mb-6 text-sm sm:text-base">{project.description}</p>
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-300"
                      >
                        View Project <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative z-10 px-4 sm:px-6 py-24 bg-black/20">
        <div className="max-w-6xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Tech Stack
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4"
          >
            {data.skills.map((skill, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="px-6 py-3 backdrop-blur-xl bg-white/5 rounded-full border border-white/10 hover:bg-white/15 hover:scale-105 transition-all duration-300 font-medium text-sm sm:text-base"
                whileHover={{ scale: 1.05 }}
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="relative z-10 px-4 sm:px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl font-bold mb-12 text-center bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Get In Touch
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="backdrop-blur-xl bg-white/5 rounded-3xl border border-white/10 p-8 sm:p-12 text-center shadow-2xl"
          >
            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 leading-relaxed"
            >
              {`Interested in collaborating or have a project in mind? I'd love to hear from you!`}
            </motion.p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a 
                href={`mailto:${data.email}`} 
                className="px-8 py-4 backdrop-blur-xl bg-gradient-to-r from-purple-600/60 to-cyan-600/60 rounded-2xl border border-white/20 hover:from-purple-600/80 hover:to-cyan-600/80 transition-all duration-300 hover:scale-105 shadow-xl font-semibold flex items-center gap-2 text-white w-full sm:w-auto justify-center"
              >
                <Mail className="w-5 h-5" />
                Send Email
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <style jsx>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
        .bg-300\\% {
          background-size: 300% 300%;
        }
        @keyframes blob {
          0%, 100% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
      `}</style>
    </div>
  );
};