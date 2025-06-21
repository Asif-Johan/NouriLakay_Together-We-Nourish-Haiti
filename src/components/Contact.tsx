import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, Users, Heart } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    subject: '',
    message: '',
    contactType: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Reset form after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        organization: '',
        subject: '',
        message: '',
        contactType: 'general'
      });
    }, 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      title: 'Email Us',
      details: 'support@nourilakay.ht',
      description: 'Get in touch for general inquiries and support'
    },
    {
      icon: Phone,
      title: 'Call Us',
      details: '+509 1800-NOURI',
      description: '24/7 emergency hotline for food security response'
    },
    {
      icon: MapPin,
      title: 'Visit Us',
      details: 'Port-au-Prince, Haiti',
      description: 'Our headquarters and coordination center'
    },
    {
      icon: Clock,
      title: 'Response Time',
      details: '< 2 hours',
      description: 'Average response time for emergency requests'
    }
  ];

  const officeLocations = [
    {
      city: 'Port-au-Prince',
      address: 'NouriLakay Headquarters, Pétion-Ville, Port-au-Prince',
      phone: '+509 2876 5432',
      type: 'Headquarters'
    },
    {
      city: 'Cap-Haïtien',
      address: 'Northern Regional Office, Cap-Haïtien, Nord',
      phone: '+509 3654 321',
      type: 'Regional Office'
    },
    {
      city: 'Les Cayes',
      address: 'Southern Regional Office, Les Cayes, Sud',
      phone: '+509 2821 123',
      type: 'Regional Office'
    },
    {
      city: 'Gonaïves',
      address: 'Food Security Response Center, Gonaïves, Artibonite',
      phone: '+509 2521 987',
      type: 'Response Center'
    }
  ];

  return (
    <div id="contact" className="bg-gray-50">
      {/* Contact Information */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Whether you're an NGO looking to join our network, a volunteer wanting to help, 
              or someone in need of food assistance, we're here to connect and coordinate across Haiti.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-shadow duration-300">
                <div className="inline-flex p-4 bg-haiti-blue/10 rounded-full mb-4">
                  <info.icon className="h-8 w-8 text-haiti-blue" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{info.title}</h3>
                <p className="text-lg font-medium text-haiti-blue mb-2">{info.details}</p>
                <p className="text-gray-600 text-sm">{info.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form and Quick Actions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 bg-green-100 rounded-full mb-4">
                      <Send className="h-8 w-8 text-green-600" />
                    </div>
                    <h4 className="text-xl font-semibold text-gray-900 mb-2">Message Sent Successfully!</h4>
                    <p className="text-gray-600">We'll get back to you within 2 hours.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200"
                          placeholder="Your full name"
                          required
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200"
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Organization
                        </label>
                        <input
                          type="text"
                          name="organization"
                          value={formData.organization}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200"
                          placeholder="Your organization name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Contact Type *
                        </label>
                        <select
                          name="contactType"
                          value={formData.contactType}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200"
                          required
                        >
                          <option value="general">General Inquiry</option>
                          <option value="ngo">NGO Partnership</option>
                          <option value="volunteer">Volunteer Registration</option>
                          <option value="emergency">Emergency Food Assistance</option>
                          <option value="technical">Technical Support</option>
                          <option value="media">Media & Press</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        name="subject"
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200"
                        placeholder="Brief subject of your message"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        rows={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent transition-all duration-200 resize-none"
                        placeholder="Please provide details about your inquiry..."
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-haiti-blue text-white py-3 px-6 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <Send className="h-5 w-5" />
                          <span>Send Message</span>
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h4>
                <div className="space-y-4">
                  <a 
                    href="/login"
                    className="flex items-center space-x-3 p-4 bg-haiti-blue/10 rounded-lg hover:bg-haiti-blue/20 transition-colors duration-200"
                  >
                    <Users className="h-6 w-6 text-haiti-blue" />
                    <div>
                      <div className="font-medium text-gray-900">Join as NGO</div>
                      <div className="text-sm text-gray-600">Register your organization</div>
                    </div>
                  </a>
                  
                  <a 
                    href="tel:+5091800NOURI"
                    className="flex items-center space-x-3 p-4 bg-haiti-red/10 rounded-lg hover:bg-haiti-red/20 transition-colors duration-200"
                  >
                    <Phone className="h-6 w-6 text-haiti-red" />
                    <div>
                      <div className="font-medium text-gray-900">Emergency Hotline</div>
                      <div className="text-sm text-gray-600">24/7 food security response</div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:volunteer@nourilakay.ht"
                    className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors duration-200"
                  >
                    <Heart className="h-6 w-6 text-green-600" />
                    <div>
                      <div className="font-medium text-gray-900">Volunteer</div>
                      <div className="text-sm text-gray-600">Help fight hunger</div>
                    </div>
                  </a>
                  
                  <a 
                    href="mailto:support@nourilakay.ht"
                    className="flex items-center space-x-3 p-4 bg-haiti-gold/20 rounded-lg hover:bg-haiti-gold/30 transition-colors duration-200"
                  >
                    <MessageSquare className="h-6 w-6 text-yellow-700" />
                    <div>
                      <div className="font-medium text-gray-900">Technical Support</div>
                      <div className="text-sm text-gray-600">Platform assistance</div>
                    </div>
                  </a>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h4 className="text-xl font-semibold text-gray-900 mb-4">Emergency Protocol</h4>
                <div className="space-y-3 text-sm text-gray-600">
                  <p><strong>Step 1:</strong> Call emergency hotline immediately</p>
                  <p><strong>Step 2:</strong> Provide location and food security situation</p>
                  <p><strong>Step 3:</strong> Follow coordinator instructions</p>
                  <p><strong>Step 4:</strong> Stay connected for updates</p>
                </div>
                <div className="mt-4 p-3 bg-haiti-red/10 rounded-lg">
                  <p className="text-haiti-red text-sm font-medium">
                    For life-threatening emergencies, call local emergency services first (114), 
                    then contact our food security coordination hotline.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Office Locations */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-gray-900 mb-4">Our Locations</h3>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Regional offices and response centers across Haiti
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {officeLocations.map((office, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-xl font-semibold text-gray-900">{office.city}</h4>
                  <span className="bg-haiti-blue/10 text-haiti-blue px-2 py-1 rounded-full text-xs font-medium">
                    {office.type}
                  </span>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-600 text-sm">{office.address}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <p className="text-gray-600 text-sm">{office.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;