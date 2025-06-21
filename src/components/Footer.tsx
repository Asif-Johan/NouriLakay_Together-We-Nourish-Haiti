import React from 'react';
import { Heart, Mail, Phone, MapPin, Github, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Heart className="h-8 w-8 text-haiti-red" />
              <span className="text-2xl font-bold">NouriLakay</span>
            </div>
            <p className="text-gray-300 mb-6 max-w-md">
              Coordinating food security efforts across Haiti through technology to save lives and maximize aid impact. 
              Connecting NGOs, volunteers, and communities for efficient hunger relief response.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-haiti-red transition-colors duration-200">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-haiti-red transition-colors duration-200">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-400 hover:text-haiti-red transition-colors duration-200">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li><button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors duration-200">About Us</button></li>
              <li><button onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors duration-200">Features</button></li>
              <li><button onClick={() => document.getElementById('impact')?.scrollIntoView({ behavior: 'smooth' })} className="text-gray-300 hover:text-white transition-colors duration-200">Impact</button></li>
              <li><a href="/login" className="text-gray-300 hover:text-white transition-colors duration-200">Get Started</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-haiti-red" />
                <span className="text-gray-300">support@nourilakay.ht</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-haiti-red" />
                <span className="text-gray-300">+509 1800-NOURI</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-haiti-red" />
                <span className="text-gray-300">Port-au-Prince, Haiti</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 NouriLakay Haiti. All rights reserved. Built for humanity.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors duration-200">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;