import React, { useEffect } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import "./css/LandingPage.css";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const TypewriterEffect = ({ words, className }) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);

  useEffect(() => {
    if (isInView) {
      animate(
        "span",
        {
          display: "inline-block",
          opacity: 1,
        },
        {
          duration: 0.3,
          delay: stagger(0.1),
          ease: "easeInOut",
        }
      );
    }
  }, [isInView, animate]);

  const renderWords = () => {
    return (
      <motion.div ref={scope} className="inline-block">
        {words.map((line, lineIdx) => (
          <div key={`line-${lineIdx}`} className="block">
            {line.map((word, wordIdx) => (
              <React.Fragment key={`word-${lineIdx}-${wordIdx}`}>
                {word.text.split("").map((char, charIdx) => (
                  <motion.span
                    key={`char-${lineIdx}-${wordIdx}-${charIdx}`}
                    className={cn(`text-white opacity-0`, word.className)}
                    style={{ marginRight: "0.05em" }}
                  >
                    {char}
                  </motion.span>
                ))}
                {wordIdx < line.length - 1 && (
                  <span style={{ marginRight: "2.1em" }}></span>
                )}
              </React.Fragment>
            ))}
          </div>
        ))}
      </motion.div>
    );
  };

  return (
    <div className={cn("typewriter-container", className)}>
      {renderWords()}
    </div>
  );
};

function LandingPage() {
  const words = [
    [
      { text: "We", className: "large-text" },
      { text: "care", className: "large-text" },
      { text: "about", className: "large-text" },
    ],
    [
      { text: "your", className: "large-text" },
      { text: "Health", className: "landing-page-slogan" },
    ],
  ];

  return (
    <div className="landing-page">
      <div className="content">
        <div className="text-section">
          <TypewriterEffect words={words} className="landing-page-typewriter" />
          <div className="button-group landing-page-button-group">
            <div>
            <button
        className="font-sans flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-green-700 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group"
        type="submit"
      >
        Explore
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 19"
          className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
        >
          <path
            className="fill-gray-800 group-hover:fill-gray-800"
            d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
          ></path>
        </svg>
      </button>
            </div>
          </div>
          <div className="lemon-glass">
            <img src="/images/lemonGlass.svg" className="lemon-glass-image-left" alt="Lemon Glass" />
          </div>
        </div>
        <div className="image-section">
          <img src="/images/FinalPlate.svg" alt="Right Side" className="right-image" />
        </div>
      </div>
    </div>
  );
}

export default LandingPage;