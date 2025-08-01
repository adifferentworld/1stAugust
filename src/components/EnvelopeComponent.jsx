import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Mail } from 'lucide-react';

const EnvelopeComponent = ({ isOpen, onOpen, isInView }) => {
  const [isGiggling, setIsGiggling] = useState(false);

  useEffect(() => {
    if (isOpen || !isInView) return;
    const giggleInterval = setInterval(() => {
      setIsGiggling(true);
      setTimeout(() => setIsGiggling(false), 2000);
    }, 4000);
    return () => clearInterval(giggleInterval);
  }, [isOpen, isInView]);

  const envelopeVariants = {
    initial: { opacity: 0, y: 50, scale: 0.8 },
    inView: { opacity: 1, y: 0, scale: 1, transition: { duration: 1, delay: 0.5 } },
    open: { scale: 1.2, opacity: 0, transition: { duration: 0.5, delay: 0.8 } }
  };

  const flapVariants = {
    closed: { rotateX: 0 },
    open: { rotateX: -180, transition: { duration: 0.7, ease: 'easeOut' } }
  };

  return (
    <motion.div
      className={`cursor-pointer absolute ${isGiggling && !isOpen ? 'wiggle' : 'bounce-gentle'}`}
      onClick={!isOpen ? onOpen : undefined}
      variants={envelopeVariants}
      initial="initial"
      animate={isInView ? (isOpen ? "open" : "inView") : "initial"}
      whileHover={!isOpen ? { scale: 1.1 } : {}}
      whileTap={!isOpen ? { scale: 0.95 } : {}}
    >
      <div className="relative w-80 h-56 md:w-96 md:h-64 envelope-shadow">
        <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-500 rounded-lg transform rotate-1 pulse-glow"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-pink-300 to-rose-400 rounded-lg border-4 border-white/20 overflow-hidden">
          <div className="absolute inset-4 bg-white/10 rounded backdrop-blur-sm flex items-center justify-center">
            <div className="text-center space-y-2">
              <Mail className="w-12 h-12 text-white/80 mx-auto" />
              <p className="text-white/90 font-medium text-sm md:text-base">
                Click to open
              </p>
            </div>
          </div>
        </div>
        <motion.div
          className="absolute top-0 left-0 w-full h-1/2"
          style={{ transformOrigin: 'bottom', zIndex: 10 }}
          variants={flapVariants}
          animate={isOpen ? 'open' : 'closed'}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-pink-500 to-rose-500" style={{ clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}></div>
        </motion.div>
        <motion.div
          className="absolute top-[48%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
          animate={isOpen ? { opacity: 0, scale: 0 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-red-500 rounded-full p-3 border-4 border-white">
            <Heart className="w-6 h-6 text-white fill-current" />
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EnvelopeComponent;