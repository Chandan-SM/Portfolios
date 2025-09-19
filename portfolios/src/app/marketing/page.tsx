"use client"
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import Framer Motion
import { Sparkles, Zap, Users, Star, Menu, X, Play } from 'lucide-react';
import Testimonials from './testimonials';
import Pricing from './pricing';
import Footer from '../components/footer';
import Link from 'next/link';

const Page = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // --- Start of Typewriter Effect Logic ---
  const wordsToAnimate = ['Self!', 'Projects!', 'Experience!', 'Portfolio!'];
  const [wordIndex, setWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const type = () => {
      const fullWord = wordsToAnimate[wordIndex];
      
      // Determine the new text based on whether we are typing or deleting
      const updatedText = isDeleting 
        ? fullWord.substring(0, currentText.length - 1)
        : fullWord.substring(0, currentText.length + 1);

      setCurrentText(updatedText);

      // Logic to switch between typing and deleting states
      if (!isDeleting && updatedText === fullWord) {
        // Pause for 2 seconds after a word is fully typed
        setTimeout(() => setIsDeleting(true), 2000); 
      } else if (isDeleting && updatedText === '') {
        setIsDeleting(false);
        // Move to the next word in the cycle
        setWordIndex((prevIndex) => (prevIndex + 1) % wordsToAnimate.length);
      }
    };
    
    // Adjust typing speed
    const typingSpeed = isDeleting ? 100 : 200;
    const timer = setTimeout(type, typingSpeed);
    
    // Cleanup timer on component unmount
    return () => clearTimeout(timer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentText, isDeleting, wordIndex]);
  // --- End of Typewriter Effect Logic ---

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const [isWaitlistOpen, setIsWaitlistOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const handleWaitlistSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const response = await fetch('/api/waitlist', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({ name: '', email: '' });
      } else {
        setSubmitStatus('error');
      }
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Framer Motion variants for smooth animations
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
    // hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.6 } // Fixed: Use string easing instead of array
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5 } // Fixed: Use string easing
    }
  };

  const floatingVariants = {
    animate: {
      y: [0, -20, 0],
      x: [0, 10, 0],
      rotate: [0, 5, 0],
      transition: {
        duration: 6,
        repeat: Infinity,
      }
    }
  };

  const modalVariants = {
    hidden: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: {
        damping: 25, 
        stiffness: 300,
        duration: 0.4
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8, 
      y: 50,
      transition: { duration: 0.2 } // Fixed: Use string easing
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0, transition: { duration: 0.2 } } // Fixed: Use string easing
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Navbar - Smooth slide-in */}
      <motion.nav 
        className="fixed z-50 px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10 w-[100%]"
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }} // Fixed: Use string easing
      >
        <div className="max-w-[85rem] mx-auto flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-2"
            variants={itemVariants}
          >
            <motion.div 
              className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.3, ease: "easeOut" }} // Fixed: Use string easing
            >
              <Sparkles className="w-5 h-5 text-white" />
            </motion.div>
            <motion.span 
              className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Portfolios
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="hidden lg:flex items-center space-x-8"
            variants={itemVariants}
          >
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ x: 5, color: "#0ea5e9" }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Features
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ x: 5, color: "#0ea5e9" }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Templates
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ x: 5, color: "#0ea5e9" }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Pricing
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:text-cyan-400 transition-colors"
              whileHover={{ x: 5, color: "#0ea5e9" }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              About
            </motion.a>
            <motion.div 
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              className="group"
            >
              <Link href={"/auth"}>
                <motion.button 
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all"
                  whileHover={{ backgroundColor: "rgba(255,255,255,0.2)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
                >
                  Sign In
                </motion.button>
              </Link>
            </motion.div>
            <motion.button 
              onClick={() => setIsWaitlistOpen(true)} 
              className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-all"
              whileHover={{ scale: 1.05, rotate: [0, -5, 0] }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Join Waitlist
            </motion.button>
          </motion.div>

          <motion.button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1, ease: "easeOut" }} // Fixed: Use string easing
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        {/* Mobile Menu - Slide down with stagger */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0, y: -20 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }} // Fixed: Use string easing
            className="lg:hidden z-50 rounded-10 flex py-6"
          >
            <motion.div 
              className="flex flex-col space-y-4 px-6 w-full text-center"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                Features
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                Templates
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                Pricing
              </motion.a>
              <motion.a 
                href="#" 
                className="hover:text-cyan-400 transition-colors"
                variants={itemVariants}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                About
              </motion.a>
              <motion.button 
                className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                Sign In
              </motion.button>
              <motion.button 
                onClick={() => setIsWaitlistOpen(true)} 
                className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-all"
                variants={itemVariants}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                Join Waitlist
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </motion.nav>

      {/* Hero Section - Staggered entrance */}
      <motion.section 
        className="relative z-10 max-w-[85rem] mx-auto px-6 pt-30 md:pt-45 pb-15"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={containerVariants}
      >
        <motion.div 
          className="text-center"
          variants={containerVariants}
        >
          {/* Badge - Fade in with glow */}
          <motion.div 
            className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-8"
            variants={itemVariants}
            whileHover={{ scale: 1.05, boxShadow: "0 0 20px rgba(34, 197, 94, 0.5)" }}
            transition={{ duration: 0.2 }}
          >
            <motion.div 
              animate={{ 
                scale: [1, 1.1, 1],
              }}
              transition={{ 
                duration: 1, 
                repeat: Infinity, 
                ease: "linear"
              }}
            >
              <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            </motion.div>
            <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Portfolio Generation
            </span>
          </motion.div>

          {/* Main Headline - Staggered lines with typewriter integration */}
          <motion.h1 
            className="text-4xl md:text-6xl font-bold leading-tight min-h-[168px] md:min-h-[200px]"
            variants={itemVariants}
          >
            {/* Desktop & up: Inline */}
            <motion.span 
              className="hidden lg:inline bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
              animate={{ 
                opacity: [1, 0.7, 1],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
              }}
            >
              Showcase Your {currentText}
              <br />
            </motion.span>
            {/* Tablet & down: Stacked */}
            <motion.span className="block lg:hidden">
              <motion.span 
                className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
                animate={{ 
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                }}
              >
                Showcase Your
              </motion.span>
              <br />
              <motion.span 
                className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent"
                animate={{ 
                  opacity: [1, 0.7, 1],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 3, 
                  repeat: Infinity,
                }}
              >
                {currentText}
              </motion.span>
              <br />
            </motion.span>
            <motion.span 
              className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              Get Hired.
            </motion.span>
          </motion.h1>

          {/* Subtitle - Slide up with shimmer */}
          <motion.p 
            className="text-l md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed"
            variants={itemVariants}
            animate={{ 
              // background: "linear-gradient(90deg, #e5e7eb 0%, #06b6d4 50%, #e5e7eb 100%)",
              backgroundSize: "200% 100%",
              backgroundPosition: "100% 0"
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              repeatType: "reverse",
              ease: "linear" // Fixed: Use string easing
            }}
          >
            Build a stunning, AI-powered portfolio in seconds. 
            <span className="text-cyan-400"> No coding required.</span> 
            <span className="text-purple-400"> Just pure talent showcase.</span>
          </motion.p>

          {/* CTA Buttons - Staggered with bounce */}
          <motion.div 
            className="flex sm:flex-row gap-2 md:gap-5 justify-center items-center mb-16"
            variants={containerVariants}
          >
            <motion.button 
              onClick={() => setIsWaitlistOpen(true)} 
              className="group md:px-8 px-7 md:py-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl text-sm md:text-lg font-semibold transition-all"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                boxShadow: "0 10px 25px rgba(6, 182, 212, 0.4)",
                rotate: [0, -2, 0]
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3}} // Fixed: Use string easing
            >
              Join Waitlist
              <motion.span 
                className="ml-2"
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 1, repeat: Infinity }} // Fixed: Use string easing
              >
                →
              </motion.span>
            </motion.button>
            <motion.button 
              className="group md:px-8 px-5 md:py-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm md:text-lg font-semibold transition-all border border-white/20 flex items-center backdrop-blur-sm"
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05, 
                backgroundColor: "rgba(255,255,255,0.2)",
                x: 5
              }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }} // Fixed: Use string easing
            >
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </motion.button>
          </motion.div>

          {/* Social Proof - Fade in */}
          <motion.p 
            className="text-center text-gray-400 mb-12 text-sm md:text-lg"
            variants={itemVariants}
            animate={{ 
              opacity: [0.7, 1, 0.7],
              scale: [1, 1.02, 1]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity, 
              ease: "easeInOut" // Fixed: Use string easing
            }}
          >
            Join thousands of professionals who landed their dream jobs
          </motion.p>
        </motion.div>

        {/* Feature Cards - Scroll-triggered lift */}
        <motion.div 
          className="grid md:grid-cols-3 lg:gap-8 md:gap-4 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {[
            { icon: Zap, title: "AI-Powered Generation", desc: "Our advanced AI analyzes your data and creates stunning, personalized portfolios that highlight your unique strengths and achievements.", color: "from-cyan-400 to-blue-400" },
            { icon: Star, title: "Premium Templates", desc: "Choose from professionally designed templates crafted by top designers. Each template is optimized for maximum impact and conversion.", color: "from-purple-400 to-pink-400" },
            { icon: Users, title: "Recruiter-Optimized", desc: "Built with hiring managers in mind. Every element is strategically placed to capture attention and showcase your skills effectively.", color: "from-green-400 to-cyan-400" }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className={`group p-8 bg-white/5 backdrop-blur-sm flex flex-col justify-center items-center rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300`}
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                transition: { duration: 0.3, ease: "easeOut" } // Fixed: Use string easing
              }}
              custom={index}
            >
              <motion.div 
                className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: 360,
                  transition: { duration: 0.6, ease: "easeOut" } // Fixed: Use string easing
                }}
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <motion.h3 
                className="lg:text-2xl md:text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
                whileHover={{ color: "#06b6d4" }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-gray-300 leading-relaxed text-justify"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5, ease: "easeOut" }} // Fixed: Use string easing
              >
                {feature.desc}
              </motion.p>
            </motion.div>
          ))}
        </motion.div>

        <Pricing />
        <Testimonials />
      </motion.section>

      {/* Floating Elements - Enhanced with Motion */}
      <motion.div 
        className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-400 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '2s' }}
      />
      <motion.div 
        className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '1s' }}
      />
      <motion.div 
        className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full"
        variants={floatingVariants}
        animate="animate"
        style={{ animationDelay: '3s' }}
      />

      {/* Waitlist Modal - Spring animation */}
      {isWaitlistOpen && (
        <motion.div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
          onClick={() => setIsWaitlistOpen(false)}
        >
          {/* Backdrop */}
          <motion.div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            variants={backdropVariants}
            onClick={(e) => e.stopPropagation()}
          />
          
          {/* Modal Content */}
          <motion.div 
            className="relative w-full max-w-lg mx-auto"
            variants={modalVariants}
            onClick={(e) => e.stopPropagation()}
          >
            <motion.div 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl shadow-black/50"
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
            >
              {/* Close Button */}
              <motion.button 
                onClick={() => setIsWaitlistOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
                whileHover={{ scale: 1.2, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
              >
                <X className="w-6 h-6" />
              </motion.button>

              {/* Header */}
              <motion.div 
                className="text-center mb-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div 
                  className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.4, ease: "easeOut" }} // Fixed: Use string easing
                >
                  <Sparkles className="w-8 h-8 text-white" />
                </motion.div>
                <motion.h2 
                  className="text-2xl font-bold text-white mb-2"
                  variants={itemVariants}
                >
                  Join Waitlist
                </motion.h2>
                <motion.p 
                  className="text-gray-300 text-sm leading-relaxed"
                  variants={itemVariants}
                >
                  {"We're pleased to see you're interested in our platform! We'll get back to you as soon as we roll out the website and you'll be among the first to experience AI-powered portfolio generation."}
                </motion.p>
              </motion.div>

              {/* Form */}
              <motion.form 
                onSubmit={handleWaitlistSubmit} 
                className="space-y-4"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div variants={itemVariants}>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <motion.input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your full name"
                    whileFocus={{ scale: 1.02, borderColor: "#06b6d4" }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
                  />
                </motion.div>

                <motion.div variants={itemVariants}>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <motion.input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your email address"
                    whileFocus={{ scale: 1.02, borderColor: "#06b6d4" }}
                    transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
                  />
                </motion.div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2, ease: "easeOut" }} // Fixed: Use string easing
                >
                  {isSubmitting ? (
                    <motion.div 
                      className="flex items-center justify-center"
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }} // Fixed: Use string easing
                    >
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Joining...
                    </motion.div>
                  ) : (
                    'Join Waitlist'
                  )}
                </motion.button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <motion.div 
                    className="text-green-400 text-sm text-center mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, duration: 0.3, ease: "easeOut" }} // Fixed: Use string easing
                  >
                    {"🎉 Successfully joined the waitlist! We'll be in touch soon."}
                  </motion.div>
                )}
                
                {submitStatus === 'error' && (
                  <motion.div 
                    className="text-red-400 text-sm text-center mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, duration: 0.3, ease: "easeOut" }} // Fixed: Use string easing
                  >
                    {"❌ Something went wrong. Please try again."}
                  </motion.div>
                )}
              </motion.form>

              {/* Footer */}
              <motion.p 
                className="text-xs text-gray-400 text-center mt-6"
                variants={itemVariants}
              >
                {"We respect your privacy. Your information will only be used to notify you about our launch."}
              </motion.p>
            </motion.div>
          </motion.div>
        </motion.div>
      )}

      {/* Footer */}
      <Footer />
    </motion.div>
  );
};

export default Page;