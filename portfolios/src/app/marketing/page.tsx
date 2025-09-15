"use client"
import React, { useState, useEffect } from 'react';
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900 text-white overflow-hidden relative">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            left: mousePosition.x * 0.05 + 'px',
            top: mousePosition.y * 0.05 + 'px',
            transition: 'all 0.3s ease-out'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-gradient-to-r from-indigo-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Navbar */}
      <nav className="fixed z-50 px-6 py-4 bg-black/20 backdrop-blur-md border-b border-white/10 w-[100%]">
        <div className="max-w-[85rem] mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              Portfolios
            </span>
          </div>
          
          <div className="hidden lg:flex items-center space-x-8">
            {/* --- MODIFIED: Commented out redirecting links --- */}
            <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Templates</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
            <Link href={"/auth"}><button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all">
              Sign In
            </button></Link>
            {/* --- MODIFIED: "Get Started" button changed to "Join Waitlist" --- */}
            <button onClick={() => setIsWaitlistOpen(true)} className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-all transform hover:scale-105">
              Join Waitlist
            </button>
          </div>

          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden z-50 rounded-10 flex py-6">
            <div className="flex flex-col space-y-4 px-6 w-full text-center">
              {/* --- MODIFIED: Commented out redirecting links --- */}
              <a href="#" className="hover:text-cyan-400 transition-colors">Features</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Templates</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Pricing</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">About</a>
              <button className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg border border-white/20 transition-all text-center">
                Sign In
              </button>
              {/* --- MODIFIED: "Get Started" button changed to "Join Waitlist" --- */}
              <button onClick={() => setIsWaitlistOpen(true)} className="px-6 py-2 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-lg transition-all text-center">
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 max-w-[85rem] mx-auto px-6 pt-30 md:pt-45 pb-15">
        <div className="text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-purple-500/20 rounded-full border border-cyan-400/30 mb-8 animate-pulse">
            <Sparkles className="w-4 h-4 mr-2 text-cyan-400" />
            <span className="text-xs md:text-sm font-medium bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">
              AI-Powered Portfolio Generation
            </span>
          </div>

          {/* Main Headline */}
          {/* --- MODIFIED: Added typewriter effect --- */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight min-h-[168px] md:min-h-[200px]">
            {/* Desktop & up: Inline */}
            <span className="hidden lg:inline bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
              Showcase Your {currentText}
              <br />
            </span>
            {/* Tablet & down: Stacked */}
            <span className="block lg:hidden">
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
                Showcase Your
              </span>
              <br />
              <span className="bg-gradient-to-r from-white via-cyan-200 to-purple-200 bg-clip-text text-transparent animate-pulse">
                {currentText}
              </span>
              <br />
            </span>
            <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Get Hired.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-l md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Build a stunning, AI-powered portfolio in seconds. 
            <span className="text-cyan-400"> No coding required.</span> 
            <span className="text-purple-400"> Just pure talent showcase.</span>
          </p>

          {/* CTA Buttons */}
          <div className="flex sm:flex-row gap-2 md:gap-5 justify-center items-center mb-16">
            {/* --- MODIFIED: "Create" button changed to "Join Waitlist" --- */}
            <button onClick={() => setIsWaitlistOpen(true)} className="group md:px-8 px-7 md:py-4 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 rounded-xl text-sm md:text-lg font-semibold transition-all transform hover:scale-105 flex items-center shadow-lg shadow-cyan-500/25">
              Join Waitlist
            </button>
            <button className="group md:px-8 px-5 md:py-4 py-3 bg-white/10 hover:bg-white/20 rounded-xl text-sm md:text-lg font-semibold transition-all border border-white/20 flex items-center backdrop-blur-sm">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </button>
          </div>

          {/* Social Proof */}
          <div className="text-center text-gray-400 mb-12 text-sm md:text-lg">
            Join thousands of professionals who landed their dream jobs
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-3 lg:gap-8 md:gap-4 gap-8 max-w-6xl mx-auto">
          <div className="group p-8 bg-white/5 backdrop-blur-sm flex flex-col justify-center items-center rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h3 className="lg:text-2xl md:text-xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              AI-Powered Generation
            </h3>
            <p className="text-gray-300 leading-relaxed text-justify">
              Our advanced AI analyzes your data and creates stunning, personalized portfolios that highlight your unique strengths and achievements.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-sm flex flex-col justify-center items-center rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Star className="w-8 h-8 text-white" />
            </div>
            <h3 className="lg:text-2xl md:text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Premium Templates
            </h3>
            <p className="text-gray-300 leading-relaxed text-justify">
              Choose from professionally designed templates crafted by top designers. Each template is optimized for maximum impact and conversion.
            </p>
          </div>

          <div className="group p-8 bg-white/5 backdrop-blur-sm flex flex-col justify-center items-center rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
            <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-8 h-8 text-white" />
            </div>
            <h3 className="lg:text-2xl md:text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-cyan-400 bg-clip-text text-transparent">
              Recruiter-Optimized
            </h3>
            <p className="text-gray-300 leading-relaxed text-justify">
              Built with hiring managers in mind. Every element is strategically placed to capture attention and showcase your skills effectively.
            </p>
          </div>
        </div>

        <Pricing />
        <Testimonials />
      </div>

       {/* Waitlist Modal */}
      {isWaitlistOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop with blur */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-md"
            onClick={() => setIsWaitlistOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative w-full max-w-lg mx-auto">
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 shadow-2xl shadow-black/50">
              {/* Close Button */}
              <button 
                onClick={() => setIsWaitlistOpen(false)}
                className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>

              {/* Header */}
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">Join Waitlist</h2>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {"We're pleased to see you're interested in our platform! We'll get back to you as soon as we roll out the website and you'll be among the first to experience AI-powered portfolio generation."}
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleWaitlistSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent backdrop-blur-sm"
                    placeholder="Enter your email address"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-6 py-3 bg-gradient-to-r from-cyan-500 to-purple-500 hover:from-cyan-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-white font-semibold transition-all transform hover:scale-105 mt-6"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                      Joining...
                    </div>
                  ) : (
                    'Join Waitlist'
                  )}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div className="text-green-400 text-sm text-center mt-4 p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                    {"🎉 Successfully joined the waitlist! We'll be in touch soon."}
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div className="text-red-400 text-sm text-center mt-4 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                    {"❌ Something went wrong. Please try again."}
                  </div>
                )}
              </form>

              {/* Footer */}
              <p className="text-xs text-gray-400 text-center mt-6">
                {"We respect your privacy. Your information will only be used to notify you about our launch."}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Floating Elements */}
      <div className="absolute top-1/4 left-10 w-4 h-4 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/3 right-20 w-3 h-3 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-1/4 left-1/4 w-2 h-2 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '3s' }} />


      {/* Footer */}
      <Footer />
      {/* <footer className="relative z-10 border-t border-white/20 bg-black/30 backdrop-blur-xl shadow-2xl shadow-black/20">
        <div className="max-w-[85rem] mx-auto px-4 md:px-6 py-6 md:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 m-auto text-sm md:text-base">
              © 2025 Portfolios. All rights reserved.
            </div>
            <div className="flex space-x-4 md:space-x-6 text-gray-400 text-sm md:text-base">
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
              <a href="#" className="hover:text-white transition-colors duration-300">Support</a>
            </div>
          </div>
        </div>
      </footer> */}
    </div>
  );
};

export default Page;