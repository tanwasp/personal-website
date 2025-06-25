// components/SimultaneousNameAnimation.js
"use client"; // Add this directive for Next.js 13+ App Router

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const letterPaths = {
  T: {
    p1: "M0 20 L0 0 L100 0 L100 20 L60 20 L60 100 L40 100 L40 20 Z",
    p2: "",
  },
  A: {
    p1: "M0 100 L25 0 L50 0 L25 100 Z",
    p2: "M50 0 L75 0 L100 100 L75 100 Z M35 60 L65 60 L60 80 L40 80 Z",
  },
  N: {
    p1: "M0 100 L0 0 L25 0 L25 100 Z",
    p2: "M75 0 L100 0 L100 100 L75 100 Z M25 0 L75 100 L100 100 L50 0 Z",
  },
  I: { p1: "M40 0 L60 0 L60 100 L40 100 Z", p2: "" },
  S: {
    // <-- Revised 'S'
    p1: "M90 25 C 90 0, 10 0, 10 25 C 10 50, 50 45, 50 50 Z",
    p2: "M10 75 C 10 100, 90 100, 90 75 C 90 50, 50 55, 50 50 Z",
  },
  H: {
    p1: "M0 0 L25 0 L25 100 L0 100 Z",
    p2: "M75 0 L100 0 L100 100 L75 100 Z M25 40 L75 40 L75 60 L25 60 Z",
  },
  P: {
    p1: "M0 100 L0 0 L25 0 L25 100 Z",
    p2: "M25 0 L75 0 L100 25 L75 50 L25 50 Z",
  },
  R: {
    p1: "M0 100 L0 0 L25 0 L25 100 Z",
    p2: "M25 0 L75 0 L100 25 L75 50 L25 50 Z M50 50 L100 100 L75 100 L25 50 Z",
  },
  D: {
    p1: "M0 0 L0 100 L25 100 L25 0 Z",
    p2: "M25 0 L75 0 C100 25, 100 75, 75 100 L25 100 Z M50 20 L65 20 C75 35, 75 65, 65 80 L50 80 Z",
  },
  O: {
    p1: "M50 0 C0 0, 0 100, 50 100 Z",
    p2: "M50 0 C100 0, 100 100, 50 100 Z",
  },
  W: {
    // <-- NEW, CLEANER 'W'
    p1: "M0 0 L40 100 L50 100 L10 0 Z",
    p2: "M50 0 L90 100 L20 100 L60  0 Z",
  },
  G: {
    // <-- NEW, CLEANER 'G'
    p1: "M50 5 C 0 5, 0 95, 50 95 L50 75 C 20 75, 20 25, 50 25 Z",
    p2: "M50 5 C 100 5, 100 95, 50 95 L50 75 L100 75 L100 50 L50 50 Z",
  },
  U: {
    p1: "M0 0 L25 0 L25 75 C25 100, 75 100, 75 75 L75 0 L100 0 L100 75 C100 115, 0 115, 0 75 Z",
    p2: "",
  },
  " ": { p1: "", p2: "" },
};

// --- Main Animation Component ---
const SimultaneousNameAnimation = () => {
  const name = "TANISH PRADHAN WONG  AH SUI";
  const [isAssembled, setIsAssembled] = useState(false);

  // Trigger the animation shortly after the component mounts
  useEffect(() => {
    const timer = setTimeout(() => setIsAssembled(true), 500); // 0.5s delay before animation starts
    return () => clearTimeout(timer);
  }, []);

  // Animation variants for each part of a letter
  const partVariants = {
    // Initial 'scattered' state
    scattered: (i) => ({
      x: (Math.random() - 0.5) * 500, // Increase spread for a more dramatic effect
      y: (Math.random() - 0.5) * 500,
      rotate: (Math.random() - 0.5) * 720,
      opacity: 1, // Start fully visible
    }),
    // Final 'assembled' state
    assembled: {
      x: 0,
      y: 0,
      rotate: 0,
      opacity: 1,
      transition: {
        type: "tween", // A smooth, non-bouncy transition
        ease: "easeInOut",
        duration: 2.0, // All parts take 2 seconds to assemble
      },
    },
  };

  return (
    <div className="flex justify-center items-center h-screen w-full bg-gray-900 overflow-hidden">
      <div
        className="flex flex-wrap justify-center items-center"
        style={{ gap: "1vw" }}
      >
        {name.split("").map((char, index) => {
          if (char === " ") {
            return <div key={index} className="w-4 md:w-8"></div>;
          }

          const paths = letterPaths[char];
          if (!paths) return null;

          return (
            <div key={index}>
              <svg
                className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16"
                viewBox="0 0 100 100"
                fill="#E5E7EB" // Letter color (Tailwind's gray-200)
              >
                <motion.path
                  d={paths.p1}
                  custom={index} // Pass index to custom for potential variance
                  variants={partVariants}
                  initial="scattered"
                  animate={isAssembled ? "assembled" : "scattered"}
                />
                {paths.p2 && (
                  <motion.path
                    d={paths.p2}
                    custom={index}
                    variants={partVariants}
                    initial="scattered"
                    animate={isAssembled ? "assembled" : "scattered"}
                  />
                )}
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SimultaneousNameAnimation;
