import React from 'react';
import { motion } from 'framer-motion';

const Butterfly = () => {
  const duration = Math.random() * 4 + 3; // 3 to 7 seconds
  const delay = Math.random() * 1;
  const colors = ['#8e44ad', '#3498db', '#e74c3c', '#f1c40f', '#2ecc71', '#ff6b9d'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  const size = Math.random() * 30 + 20;

  const xInitial = window.innerWidth / 2;
  const yInitial = window.innerHeight / 2;
  const xTarget = (Math.random() - 0.5) * window.innerWidth * 1.5;
  const yTarget = (Math.random() - 0.5) * window.innerHeight * 1.5;

  return (
    <motion.div
      style={{
        position: 'absolute',
        top: yInitial,
        left: xInitial,
        width: size,
        height: size,
      }}
      initial={{ x: 0, y: 0, opacity: 1, scale: 0 }}
      animate={{
        x: xTarget,
        y: yTarget,
        opacity: [1, 1, 0],
        scale: [0, 1, 1.2, 0],
        rotate: Math.random() * 720 - 360,
      }}
      transition={{
        duration,
        delay,
        ease: 'easeOut'
      }}
    >
      <div className="relative w-full h-full">
        {/* Left Wing */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            left: 0,
            width: '50%',
            height: '60%',
            backgroundColor: color,
            borderRadius: '50% 10% 10% 50%',
            transformOrigin: 'right center',
          }}
          animate={{ rotateZ: [-20, 20] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
        />
        {/* Right Wing */}
        <motion.div
          style={{
            position: 'absolute',
            top: '20%',
            right: 0,
            width: '50%',
            height: '60%',
            backgroundColor: color,
            borderRadius: '10% 50% 50% 10%',
            transformOrigin: 'left center',
          }}
          animate={{ rotateZ: [20, -20] }}
          transition={{ duration: 0.3, repeat: Infinity, repeatType: 'reverse' }}
        />
      </div>
    </motion.div>
  );
};

export default Butterfly;