import React, { useState } from 'react';
import { User, Camera, Save, Edit3, MapPin, Phone, Mail, Globe, Users, Calendar } from 'lucide-react';
import NGOLayout from '../../components/NGOLayout';

const NGOProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'World Food Programme',
    description: 'Leading humanitarian organization fighting hunger worldwide. In Haiti, we provide emergency food assistance, school meals, and support for building resilient food systems to help communities become self-reliant.',
    image: 'https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400',
    location: 'Port-au-Prince, Haiti',
    phone: '+509 2876 5432',
    email: 'contact@wfp.org.ht',
    website: 'www.wfp.org/countries/haiti',
    established: '1961',
    teamSize: '250',
    areasOfFocus: ['Emergency Food Assistance', 'School Meals', 'Nutrition Programs', 'Food Systems', 'Cash Transfers'],
    registrationNumber: 'NGO/HT/1961/001234',
    bankAccount: 'Banque de la République d\'Haïti - ****5678',
    socialMedia: {
      facebook: 'WFPHaiti',
      twitter: '@WFP_Haiti',
      instagram: 'wfp_haiti'
    }
  });

  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleArrayChange = (field: string, value: string) => {
    const items = value.split(',').map(item => item.trim()).filter(item => item);
    setProfileData(prev => ({
      ...prev,
      [field]: items
    }));
  };

  const handleSocialMediaChange = (platform: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleSave = () => {
    // In a real app, this would save to backend
    setIsEditing(false);
    // Show success message
  };

  const handleImageUpload = () => {
    // In a real app, this would handle image upload
    console.log('Image upload functionality would be implemented here');
  };

  return (
    <NGOLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Organization Profile</h1>
            <p className="text-gray-600 mt-2">Manage your organization's information and settings</p>
          </div>
          <div className="flex space-x-3">
            {isEditing ? (
              <>
                <button
                  onClick={() => setIsEditing(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Edit3 className="h-4 w-4" />
                <span>Edit Profile</span>
              </button>
            )}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="text-center">
                <div className="relative inline-block">
                  <img
                    src={profileData.image}
                    alt="Organization"
                    className="w-32 h-32 rounded-full object-cover mx-auto border-4 border-gray-200"
                  />
                  {isEditing && (
                    <button
                      onClick={handleImageUpload}
                      className="absolute bottom-0 right-0 bg-haiti-blue text-white p-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                </div>
                
                <div className="mt-4">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-xl font-bold text-gray-900 text-center w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    />
                  ) : (
                    <h3 className="text-xl font-bold text-gray-900">{profileData.name}</h3>
                  )}
                </div>

                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      />
                    ) : (
                      <span className="text-sm">{profileData.location}</span>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Established {profileData.established}</span>
                  </div>
                  
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Users className="h-4 w-4" />
                    <span className="text-sm">{profileData.teamSize} Team Members</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mt-6">
              <h4 className="font-semibold text-gray-900 mb-4">Quick Stats</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Active Applications</span>
                  <span className="font-semibold">3</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">People Helped</span>
                  <span className="font-semibold">85,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Food Packages</span>
                  <span className="font-semibold">12,500</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Areas Covered</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">About Organization</h4>
              {isEditing ? (
                <textarea
                  value={profileData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent resize-none"
                  rows={4}
                  placeholder="Describe your organization's mission and activities..."
                />
              ) : (
                <p className="text-gray-700 leading-relaxed">{profileData.description}</p>
              )}
            </div>

            {/* Contact Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="tel"
                        value={profileData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-700">{profileData.phone}</span>
                    )}
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      />
                    ) : (
                      <span className="text-gray-700">{profileData.email}</span>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                  <div className="flex items-center space-x-2">
                    <Globe className="h-4 w-4 text-gray-400" />
                    {isEditing ? (
                      <input
                        type="url"
                        value={profileData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                        className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      />
                    ) : (
                      <a href={`https://${profileData.website}`} target="_blank" rel="noopener noreferrer" className="text-haiti-blue hover:text-primary-700">
                        {profileData.website}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Areas of Focus */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Areas of Focus</h4>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={profileData.areasOfFocus.join(', ')}
                    onChange={(e) => handleArrayChange('areasOfFocus', e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    placeholder="Enter areas separated by commas (e.g., Emergency Food Assistance, School Meals, Nutrition Programs)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple areas with commas</p>
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {profileData.areasOfFocus.map((area, index) => (
                    <span
                      key={index}
                      className="bg-haiti-blue/10 text-haiti-blue px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {area}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Legal & Financial Information */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Legal & Financial Information</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Registration Number</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.registrationNumber}
                      onChange={(e) => handleInputChange('registrationNumber', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.registrationNumber}</span>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bank Account</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.bankAccount}
                      onChange={(e) => handleInputChange('bankAccount', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.bankAccount}</span>
                  )}
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Social Media</h4>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Facebook</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.socialMedia.facebook}
                      onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      placeholder="Username"
                    />
                  ) : (
                    <span className="text-gray-700">@{profileData.socialMedia.facebook}</span>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Twitter</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.socialMedia.twitter}
                      onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      placeholder="@username"
                    />
                  ) : (
                    <span className="text-gray-700">{profileData.socialMedia.twitter}</span>
                  )}
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Instagram</label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.socialMedia.instagram}
                      onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                      placeholder="Username"
                    />
                  ) : (
                    <span className="text-gray-700">@{profileData.socialMedia.instagram}</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </NGOLayout>
  );
};

export default NGOProfile;