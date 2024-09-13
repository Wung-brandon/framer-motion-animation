import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const defaultAnimation = {
  hidden: {
    opacity: 0,
    x: -20,
    y: 20,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    x: 0,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.28, 0.96],
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedText: React.FC<{ text: string | string[]; className?: string, repeatDelay?: number }> = ({ text, className, repeatDelay = 1000 }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const textArray = Array.isArray(text) ? text : [text];
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    const startAnimation = async () => {
      while (true) {
        // Animate text visible
        await controls.start('visible');
        await new Promise(resolve => setTimeout(resolve, repeatDelay)); // Adjusted delay time
        
        // Animate text hidden in reverse order
        await controls.start('hidden');
        await new Promise(resolve => setTimeout(resolve, repeatDelay)); // Adjusted delay time
      }
    };

    if (isInView) {
      startAnimation();
    } else {
      controls.start('hidden');
    }

    return () => {
      // Cleanup if needed
    };
  }, [isInView, controls, repeatDelay]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial="hidden"
      animate={controls}
      variants={{
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.04,
            staggerDirection: 1, // Stagger forward
          }
        },
        hidden: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.04,
            staggerDirection: -1, // Stagger backward
          }
        }
      }}
    >
      {textArray.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-2"> {/* Margin bottom for spacing between lines */}
          {line.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="d-inline-block me-1"> {/* Margin end for spacing between words */}
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={defaultAnimation}
                  className={className}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              {/* Add space between words */}
              <span className="d-inline-block">&nbsp;</span>
            </span>
          ))}
          {/* Add space between lines */}
          <br /> {/* This ensures line breaks */}
        </div>
      ))}
    </motion.div>
  );
};

export default AnimatedText;
