import React from 'react';
import { TrendingUp, Clock, Target, Award } from 'lucide-react';

const Impact = () => {
  const stats = [
    {
      icon: TrendingUp,
      value: '75%',
      label: 'Faster Response Time',
      description: 'Coordinated efforts reduce response time by 75% compared to traditional methods'
    },
    {
      icon: Clock,
      value: '24/7',
      label: 'Real-time Monitoring',
      description: 'Continuous monitoring ensures immediate response to emerging food security situations'
    },
    {
      icon: Target,
      value: '92%',
      label: 'Food Aid Delivery Accuracy',
      description: 'Precise targeting ensures aid reaches the most food insecure areas first'
    },
    {
      icon: Award,
      value: '100+',
      label: 'Partner NGOs',
      description: 'Growing network of verified NGOs working together for maximum impact'
    }
  ];

  return (
    <section id="impact" className="py-24 bg-gradient-to-br from-gray-50 to-haiti-blue/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Measurable Impact on Communities
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Technology-driven coordination creates tangible improvements in food security response 
            effectiveness and community resilience across Haiti.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center hover:shadow-xl transition-shadow duration-300">
              <div className="inline-flex p-4 bg-haiti-blue/10 rounded-full mb-4">
                <stat.icon className="h-8 w-8 text-haiti-blue" />
              </div>
              <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-lg font-semibold text-gray-700 mb-3">{stat.label}</div>
              <p className="text-gray-600 text-sm leading-relaxed">{stat.description}</p>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Real Stories, Real Impact
              </h3>
              <blockquote className="text-lg text-gray-700 italic mb-6">
                "NouriLakay transformed our food security response. Instead of working in isolation, 
                we now coordinate with 8 other NGOs in real-time. We've reduced response time 
                from days to hours and eliminated duplicate efforts in critical areas like Cité Soleil."
              </blockquote>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-haiti-blue rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold">MJ</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Marie-Claire Joseph</div>
                  <div className="text-gray-600">Director, World Food Programme Haiti</div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-haiti-blue/10 to-haiti-red/10 p-8 rounded-xl">
              <h4 className="text-xl font-semibold text-gray-900 mb-6">Recent Success Story</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Food Crisis Event:</span>
                  <span className="font-semibold">Artibonite Valley 2024</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">NGOs Coordinated:</span>
                  <span className="font-semibold">12 Organizations</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">People Helped:</span>
                  <span className="font-semibold">85,000+ Individuals</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Response Time:</span>
                  <span className="font-semibold text-green-600">Under 6 hours</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Impact;