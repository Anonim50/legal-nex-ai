import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const stagger = {
  visible: {
    transition: {
      staggerChildren: 0.2
    }
  }
};

export const HeroSection = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const trackCTAClick = (ctaName: string) => {
    window.dispatchEvent(new CustomEvent("cta_click", { detail: { cta: ctaName } }));
  };

  // Handlers for CTA buttons
  const handleTryFreeClick = () => {
    trackCTAClick("hero_try_free");
    navigate("/auth", { state: { activeTab: "signup" } });
  };

  const handleRequestDemoClick = () => {
    trackCTAClick("hero_request_demo");
    navigate("/auth", { state: { activeTab: "signup", isDemoRequest: true } });
  };

  // Safely extract the text from translation objects
  const heroTitle = t("title") || "AI-Powered Legal Assistant for Uzbekistan";
  const heroSubtitle = t("subtitle") || "Streamline your legal work with the first AI assistant fully adapted to Uzbekistan's legislation";
  const ctaPrimary = t("cta.primary") || "Try for Free";
  const ctaSecondary = t("cta.secondary") || "Request Demo";

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-20 px-4">
      {/* Background Gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50 via-neutral-100/50 to-neutral-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(0,85,255,0.1),transparent_70%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(0,197,122,0.1),transparent_70%)]"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={stagger}
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center"
        >
          {/* Left Column - Text Content */}
          <div className="text-center lg:text-left">
            <motion.h1
              variants={fadeIn}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
            >
              {heroTitle}
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl md:text-2xl text-neutral-600 mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {heroSubtitle}
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white text-lg px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 transform"
                onClick={handleTryFreeClick}
                aria-label={ctaPrimary}
              >
                {ctaPrimary}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="border-2 border-primary text-primary hover:bg-primary/5 text-lg px-8 py-6 rounded-xl transition-all duration-300 hover:scale-105 transform"
                onClick={handleRequestDemoClick}
                aria-label={ctaSecondary}
              >
                {ctaSecondary}
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Image */}
          <motion.div
            variants={fadeIn}
            className="relative mx-auto lg:mx-0 max-w-2xl w-full"
          >
            <div className="relative rounded-2xl shadow-2xl overflow-hidden bg-white/80 backdrop-blur-sm">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                src="/hero-image.svg"
                alt="Legal AI Interface"
                className="w-full h-auto object-cover hover:opacity-90 transition-all duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.onerror = null;
                  target.src = '/placeholder.svg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent mix-blend-overlay"></div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -z-10 inset-0 bg-gradient-to-r from-primary/20 to-accent/20 blur-3xl transform translate-x-1/4 translate-y-1/4 opacity-50"></div>
            <div className="absolute -z-10 -inset-4 bg-gradient-to-l from-accent/20 to-primary/20 blur-2xl opacity-30 animate-pulse"></div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
