import React, { ReactNode } from "react";

interface SectionProps {
  id?: string;
  className?: string;
  children: ReactNode;
}

export const Section = ({ id, className = "", children }: SectionProps) => {
  return (
    <section
      id={id}
      className={`min-h-screen flex bg-gradient-to-b from-white to-neutral-50 ${className}`}
    >
      <div className="w-11/12 md:w-10/12 lg:w-9/12 mx-auto">{children}</div>
    </section>
  );
};
