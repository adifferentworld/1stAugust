import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

const PoetryLine = ({ children, index }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="poetry-line text-center py-8 md:py-12"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
    >
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white dancing-script text-shadow-glow leading-relaxed px-4">
        {children}
      </h2>
      <motion.div
        className="w-24 h-1 bg-gradient-to-r from-pink-400 to-rose-500 mx-auto mt-4 rounded-full"
        initial={{ width: 0 }}
        animate={isInView ? { width: 96 } : {}}
        transition={{ duration: 0.8, delay: index * 0.2 + 0.5, ease: "easeOut" }}
      />
    </motion.div>
  );
};

const PoetrySection = () => {
  const poetryLines = [
    "You are my brightest sun in winters",
    "You are the cool wind of my summer",
    "You are the golden precious leaves of autumn",
    "You are the rain because it shines as your eyes shimmer."
  ];

  return (
    <section className="space-y-8 md:space-y-16 py-16 md:py-32">
      {poetryLines.map((line, index) => (
        <PoetryLine key={index} index={index}>
          {line}
        </PoetryLine>
      ))}
    </section>
  );
};

export default PoetrySection;