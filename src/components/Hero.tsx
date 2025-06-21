import React from 'react';
import { ArrowRight, MapPin, Users, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section id="hero" className="relative bg-gradient-to-br from-blue-50 to-haiti-blue/10 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-haiti-blue/10 to-haiti-red/10"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Coordinated
                <span className="text-haiti-blue block">Food Security</span>
                for Haiti
              </h1>
              <p className="text-xl text-gray-600 max-w-lg">
                Connecting NGOs, volunteers, and communities for rapid, efficient food aid response across Haiti. 
                Real-time coordination saves lives and maximizes aid impact in the fight against hunger.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                to="/login" 
                className="inline-flex items-center justify-center px-8 py-3 bg-haiti-blue text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-200 hover:scale-105 shadow-lg"
              >
                Join as NGO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button 
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-haiti-blue hover:text-haiti-blue transition-all duration-200"
              >
                Learn More
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              {[
                { icon: MapPin, label: 'Real-time Mapping', value: '24/7' },
                { icon: Users, label: 'Active NGOs', value: '7+' },
                { icon: Heart, label: 'Lives Impacted', value: '500K+' }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="h-8 w-8 text-haiti-blue mx-auto mb-2" />
                  <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-600">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-white rounded-2xl shadow-2xl p-8">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium text-gray-600">Live Coordination Active</span>
                </div>
                
                <div className="bg-red-50 p-4 rounded-lg border-l-4 border-haiti-red">
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-haiti-red" />
                    <span className="font-semibold text-red-700">Food Crisis Alert: Cité Soleil</span>
                  </div>
                  <p className="text-sm text-red-600 mt-1">Critical food insecurity detected. 5 NGOs coordinating emergency response.</p>
                </div>

                <div className="space-y-3">
                  {[
                    { org: 'World Food Programme', status: 'Deploying', time: '2 min ago' },
                    { org: 'Action Against Hunger', status: 'En route', time: '5 min ago' },
                    { org: 'Meds & Food for Kids', status: 'Preparing', time: '8 min ago' }
                  ].map((update, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <div className="font-medium text-gray-900">{update.org}</div>
                        <div className="text-sm text-gray-600">{update.status}</div>
                      </div>
                      <div className="text-xs text-gray-500">{update.time}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;