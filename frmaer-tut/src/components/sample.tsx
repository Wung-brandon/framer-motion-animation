import React, { useRef, useEffect } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap is imported

const textAnimation = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.8,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 100,
      duration: 0.5,
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.43, 0.13, 0.28, 0.96],
      type: 'spring',
      damping: 12,
      stiffness: 100,
    },
  },
};

const AnimatedText: React.FC<{ text: string | string[], className?: string, repeatDelay?: number }> = ({ text, className, repeatDelay = 5000 }) => {
  const controls = useAnimation();
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { amount: 0.5 });

  useEffect(() => {
    const startAnimation = async () => {
      while (true) {
        await controls.start('visible');
        await new Promise(resolve => setTimeout(resolve, repeatDelay || 5000));
        await controls.start('hidden');
        await new Promise(resolve => setTimeout(resolve, repeatDelay || 5000));
      }
    };

    if (isInView) {
      startAnimation();
    } else {
      controls.start('hidden');
    }

    return () => {
      // Cleanup
    };
  }, [isInView, controls, repeatDelay]);

  return (
    <motion.div
      ref={ref}
      aria-hidden
      initial="hidden"
      animate={controls}
      variants={textAnimation}
      transition={{ delayChildren: 0.04 }}
    >
      {Array.isArray(text) ? text.map((line, lineIndex) => (
        <div key={lineIndex} className="mb-2"> {/* Margin bottom for spacing between lines */}
          {line.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="d-inline-block me-1"> {/* Margin end for spacing between words */}
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={textAnimation}
                  className={className}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="d-inline-block">&nbsp;</span> {/* Add space between words */}
            </span>
          ))}
          <br /> {/* This ensures line breaks */}
        </div>
      )) : (
        <div className="mb-2"> {/* Handling single text string */}
          {text.split(" ").map((word, wordIndex) => (
            <span key={wordIndex} className="d-inline-block me-1"> {/* Margin end for spacing between words */}
              {word.split("").map((char, charIndex) => (
                <motion.span
                  key={charIndex}
                  variants={textAnimation}
                  className={className}
                  style={{ display: 'inline-block' }}
                >
                  {char}
                </motion.span>
              ))}
              <span className="d-inline-block">&nbsp;</span> {/* Add space between words */}
            </span>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AnimatedText;
