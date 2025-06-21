import React from 'react';
import { Heart, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => scrollToSection('hero')} className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-haiti-red" />
            <span className="text-2xl font-bold text-haiti-blue">NouriLakay</span>
          </button>
          
          <nav className="hidden md:flex items-center space-x-8">
            <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200">About</button>
            <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200">Features</button>
            <button onClick={() => scrollToSection('impact')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200">Impact</button>
            <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200">Contact</button>
            <Link to="/login" className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
              Get Started
            </Link>
          </nav>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-4">
              <button onClick={() => scrollToSection('about')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200 text-left">About</button>
              <button onClick={() => scrollToSection('features')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200 text-left">Features</button>
              <button onClick={() => scrollToSection('impact')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200 text-left">Impact</button>
              <button onClick={() => scrollToSection('contact')} className="text-gray-700 hover:text-haiti-blue transition-colors duration-200 text-left">Contact</button>
              <Link to="/login" className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 text-center">
                Get Started
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;