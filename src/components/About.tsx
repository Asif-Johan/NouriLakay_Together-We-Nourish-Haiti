import React from 'react';
import { Shield, Users, Heart, Target, Award, Globe, Calendar } from 'lucide-react';

const About = () => {
  const teamMembers = [
    {
      name: 'Dr. Marie-Claire Joseph',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/3760263/pexels-photo-3760263.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former UN food security specialist with 15+ years experience in humanitarian aid coordination across Haiti.'
    },
    {
      name: 'Jean-Baptiste Pierre',
      role: 'Technology Director',
      image: 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Tech entrepreneur passionate about using technology for social impact and food security in Haiti.'
    },
    {
      name: 'Fabiola Desir',
      role: 'Operations Manager',
      image: 'https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Expert in NGO coordination and field operations with extensive experience in Haiti food relief.'
    },
    {
      name: 'Dr. Frantz Voltaire',
      role: 'Advisory Board',
      image: 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg?auto=compress&cs=tinysrgb&w=300',
      bio: 'Former FAO coordinator and expert in humanitarian logistics in the Caribbean region.'
    }
  ];

  const milestones = [
    {
      year: '2019',
      title: 'Foundation',
      description: 'NouriLakay was founded after the severe food crisis in Haiti, recognizing the need for better coordination.'
    },
    {
      year: '2020',
      title: 'First Deployment',
      description: 'Successfully coordinated relief efforts for 50+ NGOs during major food insecurity in Port-au-Prince.'
    },
    {
      year: '2021',
      title: 'Technology Upgrade',
      description: 'Launched real-time heatmap system and mobile application for field teams across Haiti.'
    },
    {
      year: '2022',
      title: 'National Coverage',
      description: 'Expanded operations to cover all 10 departments of Haiti with 100+ partner organizations.'
    },
    {
      year: '2023',
      title: 'International Recognition',
      description: 'Received UN Innovation Award for humanitarian technology and food security response in the Caribbean.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Launched AI-powered food crisis prediction system and automated resource allocation for Haiti.'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassion',
      description: 'Every decision we make is driven by empathy for those facing food insecurity in Haiti.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We believe in the power of coordinated efforts and shared resources across Haiti.'
    },
    {
      icon: Target,
      title: 'Efficiency',
      description: 'Maximizing impact through smart technology and optimized resource allocation.'
    },
    {
      icon: Award,
      title: 'Transparency',
      description: 'Complete accountability in food aid distribution and resource utilization.'
    },
    {
      icon: Globe,
      title: 'Innovation',
      description: 'Continuously improving our platform with cutting-edge technology for Haiti.'
    },
    {
      icon: Shield,
      title: 'Reliability',
      description: 'Dependable platform that works when Haitian communities need it most.'
    }
  ];

  return (
    <div id="about" className="bg-gray-50">
      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              About NouriLakay Haiti
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to revolutionize food security response in Haiti through technology, 
              ensuring no person facing hunger is left behind and every aid effort counts.
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                To create a Haiti where food security response is swift, coordinated, and effective. 
                We leverage cutting-edge technology to connect NGOs, volunteers, and communities across all 10 departments, 
                ensuring that food aid reaches those who need it most, when they need it most.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Through real-time coordination, transparent tracking, and data-driven insights, 
                we're transforming how humanitarian aid is delivered during Haiti's ongoing food security challenges.
              </p>
            </div>
            <div className="relative">
              <img 
                src="https://images.pexels.com/photos/6591162/pexels-photo-6591162.jpeg" 
                alt="Haiti food relief coordination"
                className="rounded-xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-haiti-blue bg-opacity-10 rounded-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do for Haiti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex p-3 bg-haiti-blue/10 rounded-lg mb-4">
                  <value.icon className="h-6 w-6 text-haiti-blue" />
                </div>
                <h4 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h4>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Key milestones in our mission to improve food security response in Haiti
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-haiti-blue/20"></div>
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-200">
                      <div className="text-2xl font-bold text-haiti-blue mb-2">{milestone.year}</div>
                      <h4 className="text-xl font-semibold text-gray-900 mb-2">{milestone.title}</h4>
                      <p className="text-gray-600">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline dot */}
                  <div className="relative z-10 w-4 h-4 bg-haiti-blue rounded-full border-4 border-white shadow-lg"></div>
                  
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}


      {/* Impact Stats */}
      <section className="py-20 bg-haiti-blue">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-white mb-4">Our Impact in Haiti</h3>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Real numbers that show the difference we're making across Haiti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '500K+', label: 'Lives Impacted' },
              { number: '100+', label: 'Partner NGOs' },
              { number: '50+', label: 'Food Responses' },
              { number: '10', label: 'Departments Covered' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-blue-100 text-lg">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;