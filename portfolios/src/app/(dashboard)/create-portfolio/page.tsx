"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Added Framer Motion
import { PortfolioFormData } from "./types";
import { 
  User, 
  Info, 
  Briefcase, 
  GraduationCap, 
  Code, 
  Brain, 
  Link, 
  Palette, 
  // CheckCircle, 
  ChevronLeft, 
  ChevronRight,
  AlertCircle, 
  Eye
} from "lucide-react"; // Added icons for steps and navigation
import BasicInfoForm from "./components/BasicInfoForm";
import AboutForm from "./components/AboutForm";
import ExperienceForm from "./components/ExperienceForm";
import EducationForm from "./components/EducationForm";
import ProjectsForm from "./components/ProjectsForm";
import SkillsForm from "./components/SkillsForm";
import SocialLinksForm from "./components/SocialLinksForm";
import TemplateSelector from "./components/TemplateSelector";
import PublishButton from "./components/PublishButton";

const STEPS = [
  { id: 1, title: "Basic Info", icon: User, component: BasicInfoForm },
  { id: 2, title: "About Me", icon: Info, component: AboutForm },
  { id: 3, title: "Experience", icon: Briefcase, component: ExperienceForm },
  { id: 4, title: "Education", icon: GraduationCap, component: EducationForm },
  { id: 5, title: "Projects", icon: Code, component: ProjectsForm },
  { id: 6, title: "Skills", icon: Brain, component: SkillsForm },
  { id: 7, title: "Social Links", icon: Link, component: SocialLinksForm },
  { id: 8, title: "Template", icon: Palette, component: TemplateSelector },
];

export default function CreatePortfolioPage() {
  const [formData, setFormData] = useState<PortfolioFormData>({
    name: "",
    username: "",
    email: "",
    profilePic: "",
    headline: "",
    about: "",
    experiences: [],
    education: [],
    projects: [],
    skills: [],
    socials: {
      github: "",
      linkedin: "",
      twitter: "",
      website: "",
    },
    template: "",
  });
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<{ [key: number]: string }>({}); // Step-based errors
  // const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPreview, setShowPreview] = useState(false); // Optional preview toggle

  const CurrentComponent = STEPS[currentStep].component;

  // Simple validation (expand as needed)
  const validateStep = (step: number): boolean => {
    // Placeholder: Check required fields based on step
    const stepErrors: { [key: number]: string } = {};
    if (step === 0 && (!formData.name || !formData.email)) {
      stepErrors[0] = "Name and email are required.";
    }
    // Add more validations for other steps (e.g., at least one project, skills, etc.)
    if (step === 4 && formData.projects.length === 0) {
      stepErrors[4] = "Add at least one project.";
    }
    setErrors(stepErrors);
    return Object.keys(stepErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
    }
  };

  const prevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  // const handleSubmit = async () => {
  //   if (!validateStep(currentStep)) return;
  //   setIsSubmitting(true);
  //   try {
  //     // Simulate API call to save portfolio
  //     await new Promise((resolve) => setTimeout(resolve, 2000)); // Mock delay
  //     // In production: POST to /api/portfolios
  //     alert("Portfolio created successfully!"); // Replace with navigation/toast
  //   } catch (error) {
  //     setErrors({ [currentStep]: "Failed to create portfolio. Please try again." });
  //   } finally {
  //     setIsSubmitting(false);
  //   }
  // };

  // Motion variants for creative animations
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const stepVariants = {
    inactive: { opacity: 0.5, scale: 0.9 },
    active: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        stiffness: 200, 
        damping: 20,
        duration: 0.6 
      }
    }
  };

  const navButtonVariants = {
    hover: { 
      scale: 1.05, 
      boxShadow: "0 5px 15px rgba(139, 92, 246, 0.3)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-br from-gray-50 via-purple-50 to-cyan-50 p-4 md:p-6"
      initial="hidden"
      animate="visible"
      variants={pageVariants}
    >
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <motion.div 
          className="text-center"
          variants={cardVariants}
        >
          <motion.h1 
            className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-600 via-cyan-600 to-purple-600 bg-clip-text text-transparent mb-2"
            whileHover={{ scale: 1.02 }}
          >
            Create Your Portfolio
          </motion.h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            {`Build your professional showcase step by step. We'll guide you through it.`}
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Stepper Sidebar */}
          <motion.aside 
            className="w-full lg:w-80 bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
            variants={cardVariants}
          >
            <h2 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
              Progress
            </h2>
            <div className="space-y-4">
              {STEPS.map((step, i) => (
                <motion.div 
                  key={step.id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition-all ${
                    i === currentStep 
                      ? "bg-gradient-to-r from-purple-100 to-cyan-100 border border-purple-200" 
                      : "bg-gray-50 hover:bg-gray-100"
                  }`}
                  variants={stepVariants}
                  animate={i === currentStep ? "active" : "inactive"}
                  whileHover={{ scale: 1 }}
                >
                  <motion.div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold" >
                    {i + 1}
                  </motion.div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{step.title}</p>
                    <p className="text-xs text-gray-500">{i < currentStep ? "Complete" : "Pending"}</p>
                  </div>
                  <step.icon className={`w-5 h-5 ${i === currentStep ? "text-purple-600" : "text-gray-400"}`} />
                </motion.div>
              ))}
            </div>

            {/* Preview Toggle */}
            <motion.button
              onClick={() => setShowPreview(!showPreview)}
              className="mt-6 w-full flex items-center justify-center gap-2 bg-white/80 hover:bg-white p-3 rounded-lg border border-white/20 transition-all"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Eye className="w-4 h-4" />
              {showPreview ? "Hide" : "Show"} Preview
            </motion.button>
          </motion.aside>

          {/* Main Form Area */}
          <motion.main className="flex-1 space-y-6" variants={cardVariants}>
            {/* Current Step Card */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                className="bg-white/70 backdrop-blur-sm rounded-xl p-6 md:p-8 shadow-lg border border-white/20"
                variants={cardVariants}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    {/* <STEPS.[currentStep].icon className="w-6 h-6 text-purple-600" /> */}
                    <h2 className="text-2xl font-semibold text-gray-900">
                      {STEPS[currentStep].title}
                    </h2>
                  </div>
                  {errors[currentStep] && (
                    <motion.div 
                      className="flex items-center gap-2 text-red-600 bg-red-50 px-3 py-2 rounded-lg"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors[currentStep]}</span>
                    </motion.div>
                  )}
                </div>

                {/* Render Current Form Component */}
                <CurrentComponent formData={formData} setFormData={setFormData} />

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
                  <motion.button
                    onClick={prevStep}
                    disabled={currentStep === 0}
                    className="flex items-center gap-2 px-6 py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    variants={navButtonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Previous
                  </motion.button>

                  {currentStep === STEPS.length - 1 ? (
                    <PublishButton 
                      formData={formData}
                    />
                  ) : (
                    <motion.button
                      onClick={nextStep}
                      className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
                      variants={navButtonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      Next
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Optional Preview Sidebar (Desktop Only) */}
            <AnimatePresence>
              {showPreview && (
                <motion.div 
                  className="lg:block hidden bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-lg"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 50 }}
                  transition={{ duration: 0.3 }}
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-purple-600" />
                    Live Preview
                  </h3>
                  <div className="h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                    {/* Placeholder: Integrate actual preview logic */}
                    Preview of {formData.name || "Your Portfolio"}<br />
                    (Template: {formData.template || "Select one"})<br />
                    <small>Headline: {formData.headline || "Add your headline"}</small>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.main>
        </div>

        {/* Progress Bar */}
        <motion.div 
          className="w-full bg-gray-200 rounded-full h-2"
          variants={cardVariants}
        >
          <motion.div 
            className="bg-gradient-to-r from-purple-600 to-cyan-600 h-2 rounded-full transition-all duration-500"
            initial={{ width: 0 }}
            animate={{ width: `${((currentStep + 1) / STEPS.length) * 100}%` }}
          />
        </motion.div>

        {/* Footer Tip */}
        <motion.p 
          className="text-center text-gray-500 text-sm"
          variants={cardVariants}
        >
          Step {currentStep + 1} of {STEPS.length} • Save your progress anytime (auto-save coming soon)
        </motion.p>
      </div>
    </motion.div>
  );
}
