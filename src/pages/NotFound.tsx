import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/context/LanguageContext';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Scale } from 'lucide-react';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1]
    }
  }
};

export default function NotFound() {
  const { t } = useLanguage();

  return (
    <>
      <Helmet>
        <title>404 - {t("title")} | Legal Nexus AI</title>
        <meta name="description" content="Page not found. Please check the URL or return to homepage." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-background/80">
        <div className="container max-w-2xl mx-auto text-center">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.15
                }
              }
            }}
          >
            <motion.div variants={fadeIn} className="mb-8">
              <Scale className="w-24 h-24 mx-auto text-primary/20 mb-6" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-4">
                404 - Page Not Found
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                The page you're looking for doesn't exist or has been moved.
              </p>
            </motion.div>

            <motion.div variants={fadeIn}>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              >
                Return to Homepage
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
}
