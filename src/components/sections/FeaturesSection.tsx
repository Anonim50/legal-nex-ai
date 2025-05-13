import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import {
  FileText,
  Code,
  MessageSquare,
  Database,
  BookOpen,
  Shield,
  CheckCircle,
  Zap,
  Scale,
  Search,
  Users,
  Lock
} from "lucide-react";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export const FeaturesSection = () => {
  const { t } = useLanguage();

  const featureIcons = [
    { icon: Scale, color: "text-blue-600", bg: "bg-blue-50", gradient: "from-blue-500/20 to-blue-600/20" },
    { icon: Search, color: "text-purple-600", bg: "bg-purple-50", gradient: "from-purple-500/20 to-purple-600/20" },
    { icon: BookOpen, color: "text-emerald-600", bg: "bg-emerald-50", gradient: "from-emerald-500/20 to-emerald-600/20" },
    { icon: MessageSquare, color: "text-amber-600", bg: "bg-amber-50", gradient: "from-amber-500/20 to-amber-600/20" },
    { icon: Users, color: "text-rose-600", bg: "bg-rose-50", gradient: "from-rose-500/20 to-rose-600/20" },
    { icon: Lock, color: "text-indigo-600", bg: "bg-indigo-50", gradient: "from-indigo-500/20 to-indigo-600/20" }
  ];

  // Ensure features is always an array
  const features = Array.isArray(t("features.items")) ? t("features.items") : [];

  return (
    <section className="py-24 bg-gradient-to-b from-white to-neutral-50/50 relative overflow-hidden">
      {/* Background Patterns */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(0,197,122,0.05),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(0,85,255,0.05),transparent_70%)]"></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            {t("features.title") || "Key Features"}
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            className="text-xl text-neutral-600 max-w-3xl mx-auto"
          >
            {t("features.subtitle") || "Powerful tools designed for Uzbekistan's legal landscape"}
          </motion.p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature: any, index: number) => {
            const IconConfig = featureIcons[index % featureIcons.length];
            const Icon = IconConfig.icon;

            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="group relative"
              >
                <div className="relative p-8 bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full">
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${IconConfig.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl`}></div>

                  {/* Content */}
                  <div className="relative z-10">
                    <div className={`${IconConfig.bg} ${IconConfig.color} w-14 h-14 rounded-xl flex items-center justify-center mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                      <Icon className="w-7 h-7" />
                    </div>

                    <h3 className="text-xl font-bold mb-4 text-neutral-900 group-hover:text-neutral-800">
                      {feature.title || `Feature ${index + 1}`}
                    </h3>

                    <p className="text-neutral-600 group-hover:text-neutral-700 line-clamp-3">
                      {feature.description || ""}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
