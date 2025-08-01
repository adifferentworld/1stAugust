import React, { useState } from "react";
import { motion, useTransform } from "framer-motion";
import Butterfly from "@/components/Butterfly";

const LetterComponent = ({ scrollYProgress }) => {
  const [showButterflies, setShowButterflies] = useState(false);

  const letter = `To Nam Nam,
the light to my mornings and the twilight to my dawn,

I’ve never claimed to be a writer — my words may stumble where my heart races ahead. But still, here I am, giving it my best... because you are worth it. 💌

Every moment with you feels like poetry written without a pen — just a rhythm between two souls. You’ve made ordinary days unforgettable and silence feel like music. 🎶

So instead of just words, I built you something — a little website, with animations that dance like my thoughts when I think of you. It’s not perfect, but it’s made with everything I have. Just for you. 💻✨

Happy Girlfriend Day, my love.
You are not just part of my story — you are the reason I started writing one. 🌹

Yours, and only yours,
Hannu ❤️`;

  const rotateY = useTransform(scrollYProgress, [0.1, 0.3], [0, 180]);
  const opacity = useTransform(scrollYProgress, [0.1, 0.6], [1, 0]);
  const thankYouOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);

  useTransform(scrollYProgress, (latest) => {
    if (latest > 0.2 && !showButterflies) {
      setShowButterflies(true);
    }
  });

  return (
    <>
      <motion.div
        className="absolute"
        initial={{ y: 50, opacity: 0, scale: 0.8, rotateX: -90 }}
        animate={{ y: 0, opacity: 1, scale: 1, rotateX: 0 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{ rotateY, opacity, transformStyle: "preserve-3d" }}
      >
        {/* Front of the letter */}
        <div
          className="letter-content rounded-2xl p-8 md:p-12 shadow-2xl border-4 border-white/20 max-w-2xl w-full"
          style={{ backfaceVisibility: "hidden" }}
        >
          <div className="text-gray-800 space-y-6 leading-relaxed max-h-[70vh] overflow-y-auto pr-4">
            {letter.split("\n\n").map((paragraph, index) => (
              <motion.p
                key={index}
                className={`${index === 0 ? "text-2xl md:text-3xl dancing-script font-semibold text-purple-800" : "text-base md:text-lg"} ${index === letter.split("\n\n").length - 1 ? "text-right dancing-script text-xl md:text-2xl font-semibold text-purple-800" : ""}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1.5 + index * 0.1 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </div>
        <div
          className="absolute inset-0 letter-content rounded-2xl p-8 md:p-12 shadow-2xl border-4 border-white/20 flex items-center justify-center"
          style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }}
        >
          <motion.h2
            className="text-4xl text-purple-800 dancing-script font-semibold"
            style={{ opacity: thankYouOpacity }}
          >
            Thank you for reading ❤️
          </motion.h2>
        </div>
      </motion.div>
      {showButterflies && (
        <div className="absolute inset-0">
          {Array.from({ length: 25 }).map((_, i) => (
            <Butterfly key={i} />
          ))}
        </div>
      )}
    </>
  );
};

export default LetterComponent;

