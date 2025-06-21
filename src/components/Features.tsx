import React from 'react';
import { Map, MessageSquare, ClipboardCheck, Heart, Zap, Users } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Map,
      title: 'Real-time Food Security Mapping',
      description: 'Interactive heatmaps showing food insecure areas with live updates from ground teams and nutrition data.',
      color: 'haiti-blue'
    },
    {
      icon: MessageSquare,
      title: 'Ground Information Sharing',
      description: 'NGOs share real-time ground conditions with media attachments and coordinate food security responses effectively.',
      color: 'teal'
    },
    {
      icon: ClipboardCheck,
      title: 'Food Aid Application Tracking',
      description: 'Streamlined system for NGOs to apply for food aid, track commitments, and ensure accountability.',
      color: 'orange'
    },
    {
      icon: Heart,
      title: 'Admin Oversight',
      description: 'Comprehensive admin dashboard for monitoring all activities, approving applications, and ensuring quality.',
      color: 'haiti-red'
    },
    {
      icon: Zap,
      title: 'Rapid Response',
      description: 'Instant notifications and alerts enable faster response times during critical food security situations.',
      color: 'green'
    },
    {
      icon: Users,
      title: 'Community Coordination',
      description: 'Connect multiple NGOs and volunteers for coordinated hunger relief efforts without duplication.',
      color: 'purple'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      'haiti-blue': 'bg-haiti-blue/10 text-haiti-blue group-hover:bg-haiti-blue group-hover:text-white',
      'haiti-red': 'bg-haiti-red/10 text-haiti-red group-hover:bg-haiti-red group-hover:text-white',
      teal: 'bg-teal-100 text-teal-600 group-hover:bg-teal-600 group-hover:text-white',
      orange: 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white',
      purple: 'bg-purple-100 text-purple-600 group-hover:bg-purple-600 group-hover:text-white',
      green: 'bg-green-100 text-green-600 group-hover:bg-green-600 group-hover:text-white',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section id="features" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Powerful Features for Effective Food Security
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform combines cutting-edge technology with humanitarian expertise to ensure 
            no person facing hunger is left behind and every aid effort counts.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="group bg-white p-8 rounded-xl border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className={`inline-flex p-3 rounded-lg mb-6 transition-all duration-300 ${getColorClasses(feature.color)}`}>
                <feature.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;