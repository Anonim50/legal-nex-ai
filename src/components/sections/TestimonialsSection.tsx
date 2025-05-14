import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import {
  Testimonial,
  TestimonialItems,
  TestimonialTitle,
} from "@/types/translations";

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

export const TestimonialsSection: React.FC = () => {
  const { t, isLoading } = useLanguage();
  const testimonials = t<TestimonialItems>("testimonials.items") ?? [];
  const title =
    t<TestimonialTitle>("testimonials.title") ?? "What Our Users Say";

  if (isLoading) {
    return (
      <div
        role="status"
        aria-label="Loading testimonials"
        className="animate-pulse"
      >
        {/* Loading skeleton */}
        <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-8"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-8 shadow-md">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (!testimonials?.length) {
    return null;
  }

  return (
    <section
      className="py-24 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Background Pattern */}
      <div
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,197,122,0.03),transparent_70%)]"
        aria-hidden="true"
      ></div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <motion.h2
            id="testimonials-title"
            variants={fadeInUp}
            className="text-balance text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent"
          >
            {title}
          </motion.h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial: Testimonial, index: number) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 focus-within:ring-2 focus-within:ring-primary"
              tabIndex={0}
              role="article"
              aria-label={`Testimonial from ${testimonial.name}`}
            >
              <div className="mb-6">
                <Quote
                  className="w-10 h-10 text-primary/20"
                  aria-hidden="true"
                />
              </div>

              <blockquote className="mb-6">
                <p className="text-lg text-balance text-neutral-700 italic">
                  "{testimonial.quote}"
                </p>
              </blockquote>

              <div className="flex items-center gap-4">
                {testimonial.image ? (
                  <img
                    src={testimonial.image}
                    alt={`${testimonial.name}'s profile`}
                    className="w-12 h-12 rounded-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="w-12 h-12 rounded-full bg-primary/5 flex items-center justify-center"
                    aria-hidden="true"
                  >
                    <span className="text-lg font-medium text-primary">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                )}
                <div>
                  <div className="font-medium text-neutral-900">
                    {testimonial.name}
                  </div>
                  {testimonial.role && (
                    <div className="text-sm text-neutral-500">
                      {testimonial.role}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
