import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView, useScroll } from 'framer-motion';
import EnvelopeComponent from '@/components/EnvelopeComponent';
import LetterComponent from '@/components/LetterComponent';

const LetterSection = () => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-30%" });

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={ref} className="h-[200vh] flex flex-col items-center justify-start p-4 relative">
      <div className="sticky top-0 h-screen w-full flex flex-col items-center justify-center">
        <AnimatePresence>
          {!isOpen && (
            <motion.div
              key="prompt"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="absolute top-1/4 text-center text-white text-2xl dancing-script text-shadow-glow"
            >
              <p>Something special for you...</p>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: '1200px' }}>
          <EnvelopeComponent isOpen={isOpen} onOpen={() => setIsOpen(true)} isInView={isInView} />
          <AnimatePresence>
            {isOpen && <LetterComponent scrollYProgress={scrollYProgress} />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default LetterSection;