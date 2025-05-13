import React from "react";
import { cn } from "@/lib/utils";

interface SectionDividerProps {
  className?: string;
  variant?: "wave" | "curve" | "angle";
}

export const SectionDivider = ({ className, variant = "wave" }: SectionDividerProps) => {
  const paths = {
    wave: "M0,96L48,112C96,128,192,160,288,186.7C384,213,480,235,576,213.3C672,192,768,128,864,128C960,128,1056,192,1152,208C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
    curve: "M0,160L1440,256L1440,320L0,320Z",
    angle: "M0,160L1440,0L1440,320L0,320Z"
  };

  return (
    <div className={cn("w-full overflow-hidden", className)}>
      <svg
        className="w-full h-[2vw] min-h-[20px] max-h-[60px]"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
      >
        <path
          fill="currentColor"
          fillOpacity="0.05"
          d={paths[variant]}
        />
      </svg>
    </div>
  );
}; 