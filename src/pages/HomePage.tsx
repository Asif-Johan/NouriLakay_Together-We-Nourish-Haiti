import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/Features';
import AidStatusDemo from '../components/AidStatusDemo';
import Impact from '../components/Impact';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <Features />
      <AidStatusDemo />
      <Impact />
      <About />
      <Contact />
      <Footer />
    </div>
  );
};

export default HomePage;