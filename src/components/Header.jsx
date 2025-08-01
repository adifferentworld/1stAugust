import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const Header = () => {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="fixed top-0 left-0 right-0 z-50"
    >
      <div className="mt-4 mx-auto max-w-xs md:max-w-sm rounded-full bg-white/10 backdrop-blur-lg shadow-lg border border-white/20">
        <div className="flex items-center justify-center p-3">
          <Heart className="w-5 h-5 text-pink-300 mr-2 fill-current" />
          <h1 className="text-xl font-bold text-white dancing-script text-shadow-glow">
            For Nam Nam
          </h1>
          <Heart className="w-5 h-5 text-pink-300 ml-2 fill-current" />
        </div>
      </div>
    </motion.header>
  );
};

export default Header;