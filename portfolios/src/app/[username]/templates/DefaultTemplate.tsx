"use client"
import { Portfolio } from "../page";
import { Github, Linkedin, Mail, Briefcase, GraduationCap, Code, User, Folder, ExternalLink, ChevronDown, Menu, X } from 'lucide-react';
import { useState, useEffect, useRef } from "react";
import { motion } from 'framer-motion';
import Image from "../../components/Image";

export default function DefaultTemplate({ data }: { data: Portfolio }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isClient, setIsClient] = useState(false); // Track client-side rendering
  const sidebarRef = useRef<HTMLDivElement>(null);
  const navbarRef = useRef<HTMLElement>(null);
  const [navbarHeight, setNavbarHeight] = useState(0);
  const fallbackImageSrc = "https://res.cloudinary.com/dmewxwr0i/image/upload/v1758277151/Image_ejtzgb.png";
  
  // Set client flag on mount
  useEffect(() => {
    setIsClient(true);
  }, []);
  
  // Dynamically calculate navbar height for precise sticky positioning
  useEffect(() => {
    const updateNavbarHeight = () => {
      if (navbarRef.current) {
        setNavbarHeight(navbarRef.current.offsetHeight);
      }
    };
    
    updateNavbarHeight(); // Initial calculation
    
    // Re-calculate on resize
    window.addEventListener('resize', updateNavbarHeight);
    return () => window.removeEventListener('resize', updateNavbarHeight);
  }, []);
  
  // Framer Motion variants for animations
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.6 } 
    }
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8 } 
    }
  };

  const sidebarStyle: React.CSSProperties = {
    top: navbarHeight,
    maxHeight: `calc(100vh - ${navbarHeight}px)`
  };

  // Apply sticky styles only on client and md+ screens (≥768px)
  const sidebarDynamicStyle = isClient && (typeof window !== 'undefined' && window.innerWidth >= 768) 
    ? sidebarStyle 
    : {};

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation - Add ref for height calculation */}
      <motion.nav 
        ref={navbarRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm fixed w-full z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-slate-800">
              {data.name.split(' ')[0]}
            </div>
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-600 hover:text-slate-900 transition-colors"
            >
              {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <motion.ul 
              initial={false}
              animate={{ 
                opacity: menuOpen ? 1 : 0, 
                height: menuOpen ? 'auto' : 0 
              }}
              className={`lg:flex flex-col lg:flex-row items-center gap-8 absolute lg:static top-full left-0 w-full lg:w-auto bg-white lg:bg-transparent border-t lg:border-none pt-4 lg:pt-0 shadow-lg lg:shadow-none transition-all duration-300 ${
                menuOpen ? 'block' : 'hidden'
              }`}
            >
              <li><a href="#about" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">About</a></li>
              <li><a href="#experience" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">Experience</a></li>
              <li><a href="#projects" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">Projects</a></li>
              <li><a href="#skills" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">Skills</a></li>
              <li><a href="#education" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">Education</a></li>
              <li><a href="#contact" className="block py-2 px-4 text-slate-700 hover:text-blue-600 font-medium transition-colors">Contact</a></li>
            </motion.ul>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <motion.header 
        className="relative overflow-hidden bg-white shadow-2xl pt-24 pb-20"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-cyan-500/5 to-indigo-500/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12 text-center lg:text-left">
            <motion.div 
              className="relative flex-shrink-0"
              variants={heroItemVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full blur-3xl opacity-20 animate-pulse"></div>
              {data.profile_pic && (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <Image
                    src={data.profile_pic}
                    alt={data.name}
                    width={200}
                    height={200}
                    className="relative w-48 h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white/50 shadow-2xl ring-4 ring-blue-500/20"
                    fallback={fallbackImageSrc}
                  />
                </motion.div>
              )}
            </motion.div>
            <motion.div 
              className="max-w-2xl"
              variants={heroItemVariants}
            >
              <motion.h1 
                variants={heroItemVariants}
                className="text-4xl sm:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-700 bg-clip-text text-transparent mb-4 leading-tight"
              >
                {data.name}
              </motion.h1>
              <motion.p 
                variants={heroItemVariants}
                className="text-xl sm:text-2xl text-slate-600 mb-8 leading-relaxed"
              >
                {data.headline}
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center"
                variants={heroItemVariants}
              >
                <motion.a 
                  href={`mailto:${data.email}`} 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full hover:shadow-xl font-medium shadow-lg transition-all duration-300"
                >
                  <Mail className="w-5 h-5" />
                  Get in Touch
                </motion.a>
                <motion.div className="flex gap-3">
                  {data.socials.github && (
                    <motion.a 
                      href={data.socials.github} 
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      className="p-3 bg-slate-100/80 backdrop-blur-sm rounded-full shadow-md transition-all duration-300"
                      aria-label="GitHub"
                    >
                      <Github className="w-6 h-6 text-slate-700" />
                    </motion.a>
                  )}
                  {data.socials.linkedin && (
                    <motion.a 
                      href={data.socials.linkedin} 
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      className="p-3 bg-slate-100/80 backdrop-blur-sm rounded-full shadow-md transition-all duration-300"
                      aria-label="LinkedIn"
                    >
                      <Linkedin className="w-6 h-6 text-slate-700" />
                    </motion.a>
                  )}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div 
            className="absolute bottom-[-50px] left-1/2 -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="w-6 h-6 text-slate-400" />
          </motion.div>
        </div>
      </motion.header>

      {/* Main Content - Adjusted padding to account for fixed navbar */}
      <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" style={{ paddingTop: `${navbarHeight + 32}px`, paddingBottom: '4rem' }}>
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          {/* Left/Main Column - Always scrolls normally (full height, no restrictions) */}
          <div className="lg:col-span-2 space-y-8 lg:space-y-12 min-h-screen">
            {/* About */}
            <motion.section 
              id="about"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-slate-800 mb-6 flex items-center gap-3"
              >
                <User className="w-8 h-8 text-blue-600 flex-shrink-0" />
                About Me
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-slate-600 leading-relaxed"
              >
                {data.about}
              </motion.p>
            </motion.section>

            {/* Experience */}
            <motion.section 
              id="experience"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"
              >
                <Briefcase className="w-8 h-8 text-blue-600 flex-shrink-0" />
                Experience
              </motion.h2>
              <motion.div 
                className="relative space-y-8"
                variants={containerVariants}
              >
                {data.experiences.map((exp, i) => (
                  <motion.div 
                    key={i} 
                    className="relative group"
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                  >
                    <div className="absolute left-0 top-0 h-full w-0.5 bg-gradient-to-b from-blue-500 to-cyan-500"></div>
                    <div className="relative pl-8">
                      <motion.div 
                        className="absolute left-[-7] top-0 w-4 h-4 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-md group-hover:scale-110 transition-transform duration-300"
                        whileHover={{ scale: 1.2 }}
                      ></motion.div>
                      <motion.div 
                        className="bg-gradient-to-r from-blue-50/80 to-cyan-50/80 backdrop-blur-sm rounded-xl p-6 border border-blue-200/50 hover:shadow-md transition-all duration-300"
                        whileHover={{ scale: 1.02 }}
                      >
                        <h3 className="text-xl font-bold text-slate-800 mb-1">{exp.role}</h3>
                        <p className="text-lg text-blue-600 font-semibold mb-1">{exp.company}</p>
                        <p className="text-sm text-slate-500 mb-3">{exp.duration}</p>
                        <p className="text-slate-600 leading-relaxed">{exp.description}</p>
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Projects */}
            <motion.section 
              id="projects"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-3xl font-bold text-slate-800 mb-8 flex items-center gap-3"
              >
                <Folder className="w-8 h-8 text-blue-600 flex-shrink-0" />
                Featured Projects
              </motion.h2>
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
                variants={containerVariants}
              >
                {data.projects.map((project, i) => (
                  <motion.div 
                    key={i} 
                    className="group relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-blue-50/50 border border-slate-200/50 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
                    variants={itemVariants}
                    whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  >
                    {project.image && (
                      <motion.div 
                        className="h-48 overflow-hidden bg-slate-100"
                        whileHover={{ scale: 1.05 }}
                      >
                        <Image 
                          src={project.image} 
                          alt={project.title} 
                          width={400}
                          height={200}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          fallback={fallbackImageSrc}
                        />
                      </motion.div>
                    )}
                    <motion.div 
                      className="p-6"
                      whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                    >
                      <motion.h3 
                        className="text-xl font-bold text-slate-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                        whileHover={{ color: "#3b82f6" }}
                      >
                        {project.title}
                      </motion.h3>
                      <p className="text-slate-600 mb-4 leading-relaxed">{project.description}</p>
                      {project.link && (
                        <motion.a 
                          href={project.link} 
                          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-300 group-hover:underline"
                          whileHover={{ x: 5 }}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          View Project <ExternalLink className="w-4 h-4" />
                        </motion.a>
                      )}
                    </motion.div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>
          </div>

          {/* Right/Sidebar Column - Sticky ONLY on md+ (tablets/laptops), scrolls normally on phones */}
          <motion.div 
            ref={sidebarRef}
            className="space-y-8 md:sticky md:overflow-y-auto lg:overflow-y-auto"
            style={sidebarDynamicStyle}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Skills - Tech Stack */}
            <motion.section 
              id="skills"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
              >
                <Code className="w-6 h-6 text-blue-600 flex-shrink-0" />
                Tech Stack
              </motion.h2>
              <motion.div 
                className="flex flex-wrap gap-2"
                variants={containerVariants}
              >
                {data.skills.map((skill, i) => (
                  <motion.span 
                    key={i} 
                    className="px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-700 rounded-full text-sm font-semibold shadow-sm transition-all duration-300 cursor-pointer"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, rotate: 5 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            </motion.section>

            {/* Education */}
            <motion.section 
              id="education"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
              >
                <GraduationCap className="w-6 h-6 text-blue-600 flex-shrink-0" />
                Education
              </motion.h2>
              <motion.div 
                className="space-y-4"
                variants={containerVariants}
              >
                {data.education.map((edu, i) => (
                  <motion.div 
                    key={i}
                    className="bg-gradient-to-r from-slate-50 to-blue-50/50 rounded-xl p-4 border border-slate-200/50 hover:shadow-md transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ y: -2, scale: 1.02 }}
                  >
                    <h3 className="font-bold text-slate-800 text-lg">{edu.school}</h3>
                    <p className="text-slate-600 font-medium">{edu.degree}</p>
                    <p className="text-sm text-slate-500">{edu.year}</p>
                  </motion.div>
                ))}
              </motion.div>
            </motion.section>

            {/* Quick Contact */}
            <motion.section 
              id="contact"
              className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 shadow-lg border border-slate-200/50 hover:shadow-xl transition-shadow duration-300"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
            >
              <motion.h2 
                variants={itemVariants}
                className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-3"
              >
                <Mail className="w-6 h-6 text-blue-600 flex-shrink-0" />
                Contact
              </motion.h2>
              <motion.p 
                variants={itemVariants}
                className="text-sm text-slate-600 mb-4"
              >
                {`Let's connect!`}
              </motion.p>
              <motion.a 
                href={`mailto:${data.email}`} 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg hover:shadow-lg transition-all duration-300 font-medium"
              >
                <Mail className="w-4 h-4" />
                {data.email}
              </motion.a>
            </motion.section>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/50 backdrop-blur-sm border-t border-slate-200 py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-slate-500 text-sm">
          <p>&copy; {new Date().getFullYear()} {data.name}. All rights reserved.</p>
        </div>
      </motion.footer>
    </div>
  );
};