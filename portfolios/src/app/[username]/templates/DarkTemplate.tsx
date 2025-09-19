"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, Menu, X, Briefcase, Code, Folder, GraduationCap, User, ExternalLink } from 'lucide-react';
import Image from "../../components/Image";
import { useState } from "react";
import { motion } from 'framer-motion';

export default function DarkTemplate({ data }: { data: Portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const fallbackImageSrc = "https://res.cloudinary.com/dmewxwr0i/image/upload/v1758277151/Image_ejtzgb.png";
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start' 
      });
    }
    setMenuOpen(false);
  };
  
  // Framer Motion variants for subtle animations
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0, 
      transition: { duration: 0.5 } 
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const mobileMenuVariants = {
    closed: { x: "-100%" },
    open: { x: 0 }
  };

  // Nav items configuration for easy mapping
  const navItems = [
    { id: 'home', icon: User, label: 'Home' },
    { id: 'about', icon: User, label: 'About' },
    { id: 'experience', icon: Briefcase, label: 'Experience' },
    { id: 'projects', icon: Folder, label: 'Projects' },
    { id: 'skills', icon: Code, label: 'Skills' },
    { id: 'education', icon: GraduationCap, label: 'Education' },
    { id: 'contact', icon: Mail, label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Mobile Menu - Full overlay on small screens */}
      <motion.div
        className="fixed inset-0 bg-gray-800/95 backdrop-blur-md z-50 lg:hidden"
        initial={false}
        animate={menuOpen ? "open" : "closed"}
        variants={mobileMenuVariants}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold">{data.name}</h1>
          <button 
            onClick={() => setMenuOpen(false)}
            className="p-2 rounded-md text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        <nav className="p-6 space-y-4 mt-8">
          {navItems.map((item) => (
            <motion.a 
              key={item.id}
              className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors font-medium cursor-pointer"
              onClick={() => scrollToSection(item.id)}
              whileHover={{ x: 4 }}
              whileTap={{ scale: 0.98 }}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {item.label}
            </motion.a>
          ))}
        </nav>
        {/* Profile Pic in Mobile Menu */}
        {data.profile_pic && (
          <div className="absolute bottom-6 left-6 right-6 p-4 border-t border-gray-700">
            <Image
              src={data.profile_pic}
              alt={data.name}
              width={80}
              height={80}
              className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-600"
              fallback={fallbackImageSrc}
            />
            <p className="text-center text-sm text-gray-400">{data.headline}</p>
          </div>
        )}
      </motion.div>

      {/* Overlay for mobile menu */}
      {menuOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setMenuOpen(false)}
          className="fixed inset-0 bg-black/50 lg:hidden z-40"
        />
      )}

      {/* Desktop Sidebar - Static on large screens */}
      <aside className="hidden lg:block fixed left-0 top-0 h-full w-64 bg-gray-800/95 backdrop-blur-md border-r border-gray-700 z-40 shadow-2xl">
        <div className="p-6">
          <div className="mb-8">
            <h1 className="text-xl font-bold mb-6">{data.name.split(' ')[0]}</h1>
            {data.profile_pic && (
              <Image
                src={data.profile_pic}
                alt={data.name}
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-2 border-gray-600"
                fallback={fallbackImageSrc}
              />
            )}
            <p className="text-center text-sm text-gray-400">{data.headline}</p>
          </div>
          <nav className="space-y-4">
            {navItems.map((item) => (
              <motion.a 
                key={item.id}
                className="flex items-center gap-3 px-3 py-3 rounded-lg text-gray-300 hover:bg-gray-700 hover:text-white transition-colors font-medium cursor-pointer"
                onClick={() => scrollToSection(item.id)}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                {item.label}
              </motion.a>
            ))}
          </nav>
        </div>
      </aside>

      {/* Main Content - Padded on desktop */}
      <div className={`flex-1 ${menuOpen ? 'lg:ml-0' : 'lg:ml-64'} overflow-y-auto min-h-screen`}>
        {/* Mobile Menu Button */}
        <div className="lg:hidden p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-lg font-bold">{data.name.split(' ')[0]}</h1>
          <button 
            onClick={() => setMenuOpen(true)}
            className="p-2 rounded-md text-gray-400 hover:text-white"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>

        {/* Hero/Home Section */}
        <section id="home" className="min-h-screen flex items-center justify-center py-20 px-6 bg-gradient-to-b from-gray-900 to-gray-800 scroll-mt-16">
          <motion.div 
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <motion.h1 
              variants={itemVariants}
              className="text-5xl md:text-6xl font-bold text-white mb-4"
            >
              {data.name}
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
            >
              {data.headline}
            </motion.p>
            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a 
                href={`mailto:${data.email}`} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Contact Me
              </a>
              <div className="flex gap-3">
                {data.socials.github && (
                  <a href={data.socials.github} className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors" aria-label="GitHub">
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {data.socials.linkedin && (
                  <a href={data.socials.linkedin} className="p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors" aria-label="LinkedIn">
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* About Section */}
        <section id="about" className="py-20 px-6 bg-gray-800 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-6"
            >
              About Me
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-lg text-gray-300 leading-relaxed"
            >
              {data.about}
            </motion.p>
          </div>
        </section>

        {/* Experience Section - Inspired by image: Bullet points */}
        <section id="experience" className="py-20 px-6 bg-gray-900 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-8"
            >
              My Experience
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              {data.experiences.map((exp, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="bg-gray-800 rounded-lg p-6 border-l-4 border-blue-500 hover:bg-gray-700 transition-colors"
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{exp.role}</h3>
                  <p className="text-blue-400 font-medium mb-2">{exp.company}</p>
                  <p className="text-sm text-gray-400 mb-4">{exp.duration}</p>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-start gap-2">
                      <span className="text-blue-400">•</span>
                      <span>{exp.description}</span>
                    </li>
                  </ul>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-20 px-6 bg-gray-800 scroll-mt-16">
          <div className="max-w-6xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-8"
            >
              Featured Projects
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="grid md:grid-cols-2 gap-6"
            >
              {data.projects.map((project, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="group bg-gray-700 rounded-lg overflow-hidden hover:bg-gray-600 transition-colors"
                  whileHover={{ y: -5 }}
                >
                  {project.image && (
                    <div className="h-48 bg-gray-800 overflow-hidden">
                      <Image 
                        src={project.image} 
                        alt={project.title} 
                        width={400}
                        height={200}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        fallback={fallbackImageSrc}
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    {project.link && (
                      <a 
                        href={project.link} 
                        className="flex items-center gap-2 text-blue-400 hover:text-blue-300 font-medium"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View Project <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Skills Section - Inspired by image: Tags in a row */}
        <section id="skills" className="py-20 px-6 bg-gray-900 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-8"
            >
              Technical Skills
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-wrap gap-3 justify-center"
            >
              {data.skills.map((skill, i) => (
                <motion.span 
                  key={i}
                  variants={itemVariants}
                  className="px-4 py-2 bg-gray-700 text-white rounded-full text-sm font-medium hover:bg-blue-600 transition-colors cursor-default"
                  whileHover={{ scale: 1.05 }}
                >
                  {skill}
                </motion.span>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-20 px-6 bg-gray-800 scroll-mt-16">
          <div className="max-w-4xl mx-auto">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-8"
            >
              Education
            </motion.h2>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="space-y-6"
            >
              {data.education.map((edu, i) => (
                <motion.div 
                  key={i}
                  variants={itemVariants}
                  className="bg-gray-700 rounded-lg p-6 hover:bg-gray-600 transition-colors"
                  whileHover={{ x: 5 }}
                >
                  <h3 className="text-xl font-semibold text-white mb-2">{edu.school}</h3>
                  <p className="text-blue-400 font-medium mb-1">{edu.degree}</p>
                  <p className="text-sm text-gray-400">{edu.year}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-20 px-6 bg-gray-900 scroll-mt-16">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h2 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-3xl font-bold text-white mb-6"
            >
              Get In Touch
            </motion.h2>
            <motion.p 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={itemVariants}
              className="text-lg text-gray-300 mb-8"
            >
              {`Interested in collaborating? Let's talk.`}
            </motion.p>
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={containerVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <a 
                href={`mailto:${data.email}`} 
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Email
              </a>
            </motion.div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 border-t border-gray-700 py-6 text-center text-sm text-gray-400 lg:ml-64">
        <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
      </footer>
    </div>
  );
};