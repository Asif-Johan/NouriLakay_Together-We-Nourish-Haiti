import React from 'react';
import { Map, Users, AlertTriangle, CheckCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import LeafletHeatmap from '../../components/LeafletHeatmap';

const AdminDashboard = () => {
  const stats = [
    { icon: Users, label: 'Active NGOs', value: '45', color: 'blue' },
    { icon: AlertTriangle, label: 'Active Alerts', value: '8', color: 'red' },
    { icon: CheckCircle, label: 'Approved Apps', value: '127', color: 'green' },
    { icon: Map, label: 'Affected Areas', value: '23', color: 'purple' }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-600',
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-2">System overview and monitoring</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-1 gap-6">
          <LeafletHeatmap />

          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent System Activity</h3>
            <div className="space-y-4">
              {[
                { action: 'New NGO registered', details: 'As Sunnah Foundation Sylhet', time: '5 min ago', type: 'success' },
                { action: 'Application approved', details: 'Medical supplies - BRAC', time: '12 min ago', type: 'info' },
                { action: 'Critical alert issued', details: 'Feni District - High water levels', time: '25 min ago', type: 'alert' },
                { action: 'Aid delivery confirmed', details: '500 food packets distributed', time: '1 hour ago', type: 'success' }
              ].map((activity, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                  <div className={`w-3 h-3 rounded-full ${
                    activity.type === 'alert' ? 'bg-red-500' :
                    activity.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{activity.action}</p>
                    <p className="text-sm text-gray-600">{activity.details}</p>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;