import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLanguage } from "@/context/LanguageContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { CookieConsent } from "@/components/CookieConsent";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProblemSolutionSection } from "@/components/sections/ProblemSolutionSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AdvantagesSection } from "@/components/sections/AdvantagesSection";
import { PersonasSection } from "@/components/sections/PersonasSection";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { PricingSection } from "@/components/sections/PricingSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CTASection } from "@/components/sections/CTASection";
import { formatRussianText } from "@/utils/typography";
import { SectionDivider } from "@/components/common/SectionDivider";
import { SkipToMain } from "@/components/common/SkipToMain";

const Index = () => {
  const { t, language } = useLanguage();

  // Enhanced metadata setup with proper typography
  useEffect(() => {
    let pageTitle = t("meta.title");
    let pageDescription = t("meta.description");

    // Apply advanced typography formatting for Russian language
    if (language === "ru") {
      pageTitle = formatRussianText(pageTitle);
      pageDescription = formatRussianText(pageDescription);
    }

    document.title = pageTitle;

    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", pageDescription);
    }

    // Setup analytics with enhanced language tracking
    const setupAnalytics = () => {
      // Enhanced analytics to track language and region
      window.addEventListener("cta_click", (event) => {
        const data = (event as CustomEvent).detail;
        console.log("Analytics: CTA clicked", {
          ...data,
          language,
        });
      });

      window.addEventListener("form_submit", (event) => {
        const data = (event as CustomEvent).detail;
        console.log("Analytics: Form submitted", {
          ...data,
          language,
        });
      });

      window.addEventListener("lang_toggle", (event) => {
        console.log("Analytics: Language changed", (event as CustomEvent).detail);
      });

      window.addEventListener("download_pdf", (event) => {
        const data = (event as CustomEvent).detail;
        console.log("Analytics: PDF downloaded", {
          ...data,
          language,
        });
      });
    };

    setupAnalytics();
  }, [t, language]);

  useEffect(() => {
    document.documentElement.classList.add("scroll-smooth");
  }, []);

  return (
    <>
      <Helmet>
        <html lang={language} />
        <title>{t("title")} | Legal Nexus AI</title>
        <meta name="description" content={t("subtitle")} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://legalnexus.ai" />
        <meta property="og:title" content={t("title")} />
        <meta property="og:description" content={t("subtitle")} />
        <meta property="og:image" content="/og-image.jpg" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content="https://legalnexus.ai" />
        <meta name="twitter:title" content={t("title")} />
        <meta name="twitter:description" content={t("subtitle")} />
        <meta name="twitter:image" content="/og-image.jpg" />

        {/* Additional Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#00C57A" />
        <link rel="canonical" href="https://legalnexus.ai" />

        {/* Preload Critical Resources */}
        <link
          rel="preload"
          href="/hero-image.svg"
          as="image"
          type="image/svg+xml"
        />
      </Helmet>

      <SkipToMain />

      <Header />
      <main id="main-content">
        <HeroSection />
        <SectionDivider variant="wave" />
        <FeaturesSection />
        <SectionDivider variant="curve" />
        <TestimonialsSection />
        <SectionDivider variant="angle" />
        <FAQSection />
        <SectionDivider variant="wave" />
        <PricingSection />
        <CTASection />
        <Footer />
      </main>
      <CookieConsent />
    </>
  );
};

export default Index;
