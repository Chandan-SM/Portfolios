"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FormProps, Project } from "../types";
import { Code, FileText, Link as LinkIcon, Image as ImageIcon, Trash2, AlertCircle, Plus } from "lucide-react"; // Icons

// Reuse variants from previous dynamic forms
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20, scale: 0.95 },
  visible: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0, 
    x: 20, 
    scale: 0.95,
    transition: { duration: 0.2 }
  }
};

const inputVariants = {
  focus: { 
    scale: 1.02, 
    borderColor: "#8b5cf6",
    boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)",
    transition: { duration: 0.2 }
  },
  rest: { 
    scale: 1, 
    borderColor: "#e5e7eb",
    boxShadow: "none"
  }
};

const buttonVariants = {
  hover: { 
    scale: 1.02, 
    backgroundColor: "#7c3aed",
    transition: { duration: 0.2 }
  },
  tap: { scale: 0.95 }
};

export default function ProjectsForm({ formData, setFormData }: FormProps) {
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        { title: "", description: "", link: "", image: "" },
      ],
    });
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const updated = [...formData.projects];
    updated[index][field] = value;
    setFormData({ ...formData, projects: updated });
  };

  const removeProject = (index: number) => {
    const updated = formData.projects.filter((_, i) => i !== index);
    setFormData({ ...formData, projects: updated });
  };

  const validate = () => {
    if (formData.projects.length === 0) return "Add at least one project to showcase your work.";
    return null;
  };

  return (
    <motion.div 
      className="space-y-6 bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 shadow-md"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center gap-3 mb-4">
        <Code className="w-6 h-6 text-purple-600" />
        <h2 className="text-xl font-semibold text-gray-900">Projects</h2>
      </div>

      <AnimatePresence>
        {formData.projects.map((proj, i) => (
          <motion.div
            key={i}
            className="bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 space-y-3"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Title */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-purple-500" />
                Project Title
              </label>
              <motion.input
                type="text"
                placeholder="e.g., E-Commerce App"
                value={proj.title}
                onChange={(e) => updateProject(i, "title", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Description */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <FileText className="w-4 h-4 text-purple-500" />
                Description
              </label>
              <motion.textarea
                placeholder="Describe the project: tech stack, challenges, outcomes..."
                value={proj.description}
                onChange={(e) => updateProject(i, "description", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all resize-vertical"
                rows={3}
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Link */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <LinkIcon className="w-4 h-4 text-purple-500" />
                Live Link (optional)
              </label>
              <motion.input
                type="url"
                placeholder="e.g., https://github.com/user/project"
                value={proj.link}
                onChange={(e) => updateProject(i, "link", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Image */}
            <motion.div className="space-y-1" variants={inputVariants}>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                <ImageIcon className="w-4 h-4 text-purple-500" />
                Screenshot URL (optional)
              </label>
              <motion.input
                type="url"
                placeholder="e.g., https://example.com/project-screenshot.jpg"
                value={proj.image}
                onChange={(e) => updateProject(i, "image", e.target.value)}
                className="w-full px-4 py-2 rounded-lg bg-white/10 text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 border border-gray-300 transition-all"
                whileFocus="focus"
                variants={inputVariants}
              />
            </motion.div>

            {/* Remove Button */}
            <motion.button
              onClick={() => removeProject(i)}
              className="flex items-center gap-2 text-red-500 hover:text-red-600 text-sm font-medium transition-colors"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <Trash2 className="w-4 h-4" />
              Remove Project
            </motion.button>
          </motion.div>
        ))}
      </AnimatePresence>

      {/* Add Button */}
      <motion.button
        onClick={addProject}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-lg font-medium shadow-md hover:shadow-lg transition-all"
        variants={buttonVariants}
        whileHover="hover"
        whileTap="tap"
        animate={{ 
          scale: [1, 1.01, 1],
          transition: { duration: 1, repeat: Infinity, ease: "easeInOut" }
        }}
      >
        <Plus className="w-4 h-4" />
        Add Project
      </motion.button>

      {/* Validation */}
      {validate() && (
        <motion.p 
          className="text-red-400 text-sm flex items-center gap-2"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <AlertCircle className="w-4 h-4" />
          {validate()}
        </motion.p>
      )}
    </motion.div>
  );
}