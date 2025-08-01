
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const FloatingHearts = () => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const createHeart = () => {
      const id = Math.random();
      const newHeart = {
        id,
        x: Math.random() * window.innerWidth,
        size: Math.random() * 20 + 15,
        duration: Math.random() * 3 + 4,
        delay: Math.random() * 2,
      };
      
      setHearts(prev => [...prev, newHeart]);
      
      setTimeout(() => {
        setHearts(prev => prev.filter(heart => heart.id !== id));
      }, (newHeart.duration + newHeart.delay) * 1000);
    };

    const interval = setInterval(createHeart, 800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="floating-hearts">
      {hearts.map(heart => (
        <motion.div
          key={heart.id}
          className="heart absolute"
          style={{
            left: heart.x,
            fontSize: heart.size,
          }}
          initial={{ y: window.innerHeight + 50, opacity: 0, rotate: 0 }}
          animate={{ 
            y: -100, 
            opacity: [0, 0.7, 0.7, 0], 
            rotate: 360,
            x: heart.x + (Math.random() - 0.5) * 100
          }}
          transition={{
            duration: heart.duration,
            delay: heart.delay,
            ease: "easeOut"
          }}
        >
          <Heart className="fill-current" />
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingHearts;
