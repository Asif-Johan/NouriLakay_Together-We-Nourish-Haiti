import React, { useState } from 'react';
import { Plus, Package, Clock, CheckCircle, XCircle } from 'lucide-react';
import NGOLayout from '../../components/NGOLayout';
import { useApplications } from '../../context/ApplicationContext';

const NGOApplication = () => {
  const { applications, addApplication } = useApplications();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    aidType: '',
    quantity: '',
    description: '',
    deliveryDate: '',
    org: 'World Food Programme' // This would come from user session in real app
  });

  // Filter applications for current NGO (in real app, this would be based on logged-in user)
  const ngoApplications = applications.filter(app => app.org === 'World Food Programme');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-haiti-blue/10 text-haiti-blue';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'rejected': return <XCircle className="h-5 w-5 text-red-600" />;
      case 'completed': return <CheckCircle className="h-5 w-5 text-haiti-blue" />;
      default: return <Clock className="h-5 w-5 text-yellow-600" />;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addApplication({
      org: formData.org,
      aidType: formData.aidType,
      quantity: formData.quantity,
      description: formData.description,
      deliveryDate: formData.deliveryDate
    });
    setShowForm(false);
    setFormData({ 
      aidType: '', 
      quantity: '', 
      description: '', 
      deliveryDate: '',
      org: 'World Food Programme'
    });
  };

  return (
    <NGOLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Food Aid Applications</h1>
            <p className="text-gray-600 mt-2">Apply for food aid distribution and track your commitments</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-haiti-blue text-white px-6 py-3 rounded-lg hover:bg-primary-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Application</span>
          </button>
        </div>

        {showForm && (
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Food Aid Application</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Aid Type</label>
                  <select
                    value={formData.aidType}
                    onChange={(e) => setFormData({ ...formData, aidType: e.target.value })}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    required
                  >
                    <option value="">Select aid type</option>
                    <option value="Emergency Food Rations">Emergency Food Rations</option>
                    <option value="School Meals">School Meals</option>
                    <option value="Therapeutic Foods">Therapeutic Foods</option>
                    <option value="Cash Transfers">Cash Transfers</option>
                    <option value="Agricultural Support">Agricultural Support</option>
                    <option value="Nutrition Programs">Nutrition Programs</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                  <input
                    type="text"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                    placeholder="e.g., 5,000 family kits, $25,000 USD"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe the food aid items and target beneficiaries in detail"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent resize-none"
                  rows={3}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expected Delivery Date</label>
                <input
                  type="date"
                  value={formData.deliveryDate}
                  onChange={(e) => setFormData({ ...formData, deliveryDate: e.target.value })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
                  required
                />
              </div>
              
              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-haiti-blue text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                >
                  Submit Application
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="bg-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Your Applications</h3>
          </div>
          
          <div className="divide-y divide-gray-200">
            {ngoApplications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No applications submitted yet. Click "New Application" to get started.
              </div>
            ) : (
              ngoApplications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-haiti-blue/10 rounded-lg">
                        <Package className="h-6 w-6 text-haiti-blue" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{app.aidType}</h4>
                        <p className="text-gray-600 mt-1">{app.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                          <span>Quantity: {app.quantity}</span>
                          <span>•</span>
                          <span>Submitted: {app.submittedDate}</span>
                          <span>•</span>
                          <span>Delivery: {app.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(app.status)}
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(app.status)}`}>
                        {app.status.charAt(0).toUpperCase() + app.status.slice(1)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </NGOLayout>
  );
};

export default NGOApplication;