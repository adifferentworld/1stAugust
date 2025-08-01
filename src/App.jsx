import React from 'react';
import { Helmet } from 'react-helmet';
import { Toaster } from '@/components/ui/toaster';
import Header from '@/components/Header';
import Greeting from '@/components/Greeting';
import PoetrySection from '@/components/PoetrySection';
import LetterSection from '@/components/LetterSection';
import PhysicsPlayground from '@/components/PhysicsPlayground';
import FloatingHearts from '@/components/FloatingHearts';

function App() {
  return (
    <div className="min-h-screen parallax-bg relative overflow-x-hidden">
      <Helmet>
        <title>For Nam Nam - Happy Girlfriend Day ❤️</title>
        <meta name="description" content="A special interactive love letter for Nam Nam on Girlfriend Day" />
      </Helmet>

      <FloatingHearts />
      <Header />
      
      <main className="relative z-10">
        <Greeting />
        <PoetrySection />
        <LetterSection />
        <PhysicsPlayground />
      </main>

      <Toaster />
    </div>
  );
}

export default App;