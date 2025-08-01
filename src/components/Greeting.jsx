import React from 'react';
import { motion } from 'framer-motion';
import { Heart, ArrowDown } from 'lucide-react';

const Greeting = () => {
  return (
    <section className="min-h-screen flex items-center justify-center text-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
        className="space-y-4"
      >
        <h1 className="text-4xl md:text-6xl font-bold text-white dancing-script text-shadow-glow">
          For My Beautiful Nam Nam
        </h1>
        <div className="flex justify-center items-center space-x-2 text-pink-200">
          <Heart className="w-6 h-6 fill-current" />
          <span className="text-lg md:text-xl">Happy Girlfriend Day</span>
          <Heart className="w-6 h-6 fill-current" />
        </div>
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="text-white/80 text-lg pt-16 flex flex-col items-center space-y-2"
        >
          <span>Scroll down to see your surprise...</span>
          <ArrowDown className="animate-bounce w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Greeting;