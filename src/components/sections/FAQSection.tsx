import React, { useEffect, useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQSection = () => {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    const animElements = sectionRef.current?.querySelectorAll(".animate-stagger");
    animElements?.forEach((el) => observer.observe(el));

    return () => {
      animElements?.forEach((el) => observer.unobserve(el));
    };
  }, []);

  const faqTitle = t("faq.title") || "Frequently Asked Questions";
  const faqItems = Object.entries(t("faq") || {}) as [string, FAQItem][];

  return (
    <section
      id="faq"
      className="py-20 md:py-28 bg-gradient-to-b from-neutral-softGray to-white relative"
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,197,122,0.03),transparent_70%)] pointer-events-none"></div>

      <div className="container max-w-3xl mx-auto text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold text-primary animate-stagger">{faqTitle}</h2>
      </div>

      <Accordion type="single" collapsible className="max-w-2xl mx-auto space-y-4">
        {faqItems.map(([key, item]) => (
          <AccordionItem
            key={key}
            value={key}
            className="animate-stagger bg-white rounded-xl shadow-md border border-neutral-100 overflow-hidden px-4"
          >
            <AccordionTrigger className="text-left py-5 font-medium">
              {item.question}
            </AccordionTrigger>
            <AccordionContent className="text-neutral-gray pb-5">
              {item.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-12 text-center animate-stagger">
        <p className="text-neutral-gray">
          Can't find the answer you're looking for? <a href="#contact" className="text-primary hover:underline font-medium">Contact our support team</a>
        </p>
      </div>
    </section>
  );
};
