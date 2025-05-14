import React from "react";

export const SkipToMain: React.FC = () => {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-0 focus:left-0 focus:z-50 focus:p-4 focus:bg-white focus:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
      aria-label="Skip to main content"
    >
      Skip to main content
    </a>
  );
};
