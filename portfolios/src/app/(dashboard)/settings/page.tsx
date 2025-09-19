"use client"
import { AnimatePresence, motion } from "framer-motion";
import { Settings, User, CreditCard, Shield, Save } from "lucide-react";
import { useState } from "react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("account");
  const [formData, setFormData] = useState({ name: "John Doe", email: "john@example.com" });
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSaving(false);
    alert("Settings saved!"); // Replace with toast
  };

  // Motion variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const tabVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.1, duration: 0.3 }
    }),
    active: { 
      scale: 1.05, 
      backgroundColor: "#8b5cf6",
      color: "#ffffff",
      boxShadow: "0 5px 15px rgba(139, 92, 246, 0.3)"
    }
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const inputVariants = {
    focus: { 
      scale: 1.02, 
      borderColor: "#8b5cf6",
      boxShadow: "0 0 0 3px rgba(139, 92, 246, 0.1)"
    }
  };

  const tabs = [
    { id: "account", label: "Account", icon: User },
    { id: "subscription", label: "Subscription", icon: CreditCard },
    { id: "security", label: "Security", icon: Shield },
  ];

  return (
    <motion.div 
      className="space-y-8 max-w-4xl"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div 
        className="flex items-center gap-3"
        variants={sectionVariants}
      >
        <Settings className="w-8 h-8 text-purple-600" />
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
          <p className="text-gray-600">Update your account and subscription settings here.</p>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div 
        className="flex flex-wrap gap-2 bg-white/50 backdrop-blur-sm rounded-xl p-2 border border-white/20"
        variants={containerVariants}
      >
        {tabs.map((tab, i) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
              activeTab === tab.id
                ? "bg-purple-600 text-white shadow-md"
                : "text-gray-700 hover:bg-gray-100"
            }`}
            variants={tabVariants}
            custom={i}
            animate={activeTab === tab.id ? "active" : "inactive"}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <tab.icon className="w-4 h-4" />
            {tab.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === "account" && (
          <motion.section 
            key="account"
            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-purple-600" />
              Account Information
            </h2>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                <motion.input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <motion.input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                  whileFocus="focus"
                  variants={inputVariants}
                />
              </div>
              <motion.button
                type="button"
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center gap-2 bg-purple-600 text-white px-6 py-2 rounded-lg font-medium shadow-md hover:shadow-lg transition-all disabled:opacity-50"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </form>
          </motion.section>
        )}

        {activeTab === "subscription" && (
          <motion.section 
            key="subscription"
            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-purple-600" />
              Subscription
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Current Plan: Starter ($4/mo)</span>
                <motion.button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upgrade
                </motion.button>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                <div>Billing Cycle: Monthly</div>
                <div>Next Payment: 2024-02-01</div>
              </div>
            </div>
          </motion.section>
        )}

        {activeTab === "security" && (
          <motion.section 
            key="security"
            className="bg-white/50 backdrop-blur-sm rounded-xl p-6 border border-white/20"
            variants={sectionVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -20 }}
          >
            <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-purple-600" />
              Security
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                <span className="text-gray-700">Password Strength: Strong</span>
                <motion.button 
                  className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Change Password
                </motion.button>
              </div>
              <div className="text-sm text-gray-600">
                <p>Two-Factor Authentication: Enabled</p>
                <p>Session Active: 2 devices</p>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
