import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Matter from 'matter-js';
import { Heart } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const PhysicsPlayground = () => {
  const sceneRef = useRef(null);
  const engineRef = useRef(null);
  const renderRef = useRef(null);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (!sceneRef.current) return;

    const engine = Matter.Engine.create();
    engineRef.current = engine;
    engine.world.gravity.y = 0.6;

    const render = Matter.Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: sceneRef.current.clientWidth,
        height: 400,
        wireframes: false,
        background: 'transparent',
      }
    });
    renderRef.current = render;

    const ground = Matter.Bodies.rectangle(
      sceneRef.current.clientWidth / 2, 400, sceneRef.current.clientWidth, 40, 
      { isStatic: true, render: { fillStyle: 'transparent' } }
    );
    const leftWall = Matter.Bodies.rectangle(0, 200, 20, 400, { isStatic: true, render: { fillStyle: 'transparent' } });
    const rightWall = Matter.Bodies.rectangle(sceneRef.current.clientWidth, 200, 20, 400, { isStatic: true, render: { fillStyle: 'transparent' } });

    Matter.World.add(engine.world, [ground, leftWall, rightWall]);

    Matter.Engine.run(engine);
    Matter.Render.run(render);

    const handleResize = () => {
      if (!renderRef.current || !sceneRef.current) return;
      render.bounds.max.x = sceneRef.current.clientWidth;
      render.options.width = sceneRef.current.clientWidth;
      Matter.Body.setPosition(ground, { x: sceneRef.current.clientWidth / 2, y: 400 });
      Matter.Body.setPosition(rightWall, { x: sceneRef.current.clientWidth, y: 200 });
      Matter.Render.setPixelRatio(render, window.devicePixelRatio);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []);

  const createFallingHeart = (x, y) => {
    if (!engineRef.current) return;

    const colors = ['#ff6b9d', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd', '#ff7979', '#badc58'];
    const color = colors[Math.floor(Math.random() * colors.length)];
    const size = Math.random() * 20 + 20;

    const heartSVG = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="${encodeURIComponent(color)}" stroke="none"><path d="M12 4.435c-1.989-5.399-12-4.599-12 3.568 0 4.068 3.06 9.481 12 14.997 8.94-5.516 12-10.929 12-14.997 0-8.166-10.011-8.966-12-3.568z"/></svg>`;
    const texture = `data:image/svg+xml;utf8,${heartSVG}`;

    const body = Matter.Bodies.circle(x, y, size / 2, {
      restitution: 0.7,
      friction: 0.1,
      density: 0.001,
      angle: Math.random() * Math.PI * 2,
      render: {
        sprite: {
          texture: texture,
          xScale: 1,
          yScale: 1
        }
      }
    });

    Matter.World.add(engineRef.current.world, body);

    setTimeout(() => {
      if (engineRef.current && engineRef.current.world) {
        Matter.World.remove(engineRef.current.world, body);
      }
    }, 8000);
  };

  const handleCanvasClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    createFallingHeart(x, y);
    setIsActive(true);
    
    setTimeout(() => setIsActive(false), 200);
  };

  const createHeartRain = () => {
    if (!sceneRef.current) return;
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        createFallingHeart(
          Math.random() * sceneRef.current.clientWidth,
          -50
        );
      }, i * 50);
    }
    
    toast({
      title: "💕 Heart Rain!",
      description: "Love is falling from the sky!",
      duration: 3000,
    });
  };

  return (
    <section className="relative py-16">
      <motion.div
        className="text-center mb-8 px-4"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <h3 className="text-3xl md:text-4xl font-bold text-white dancing-script mb-4">
          Interactive Love Physics ✨
        </h3>
        <p className="text-white/80 text-lg mb-6">
          Tap or click on the area below to create falling hearts!
        </p>
        
        <motion.button
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={createHeartRain}
        >
          <Heart className="inline-block w-5 h-5 mr-2 fill-current" />
          Make it Rain Hearts!
        </motion.button>
      </motion.div>

      <motion.div
        className="relative bg-black/10 rounded-2xl overflow-hidden mx-auto max-w-6xl"
        style={{ height: 400, cursor: 'pointer' }}
        animate={isActive ? { scale: 1.01 } : { scale: 1 }}
        transition={{ duration: 0.1 }}
        onClick={handleCanvasClick}
      >
        <div ref={sceneRef} className="w-full h-full" />
      </motion.div>

      <motion.div
        className="text-center mt-8 px-4"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <p className="text-white/70 text-lg dancing-script">
          Just like our love, these hearts bounce and play together! 💖
        </p>
      </motion.div>
    </section>
  );
};

export default PhysicsPlayground;