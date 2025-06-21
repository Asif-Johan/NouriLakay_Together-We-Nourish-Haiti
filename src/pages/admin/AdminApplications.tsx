import React from 'react';
import { Package, CheckCircle, XCircle, Clock, Eye, Trash2 } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useApplications } from '../../context/ApplicationContext';

const AdminApplications = () => {
  const { applications, updateApplicationStatus, deleteApplication } = useApplications();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const pendingApplications = applications.filter(app => app.status === 'pending');
  const processedApplications = applications.filter(app => app.status !== 'pending');

  const handleApprove = (id: number) => {
    updateApplicationStatus(id, 'approved');
  };

  const handleReject = (id: number) => {
    updateApplicationStatus(id, 'rejected');
  };

  const handleComplete = (id: number) => {
    updateApplicationStatus(id, 'completed');
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this application? This action cannot be undone.')) {
      deleteApplication(id);
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Application Management</h1>
          <p className="text-gray-600 mt-2">Review and approve NGO aid applications</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Review</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{pendingApplications.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-yellow-100">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Approved</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {applications.filter(app => app.status === 'approved').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Completed</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {applications.filter(app => app.status === 'completed').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Rejected</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {applications.filter(app => app.status === 'rejected').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
        </div>

        {pendingApplications.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200">
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Pending Applications</h3>
              <p className="text-gray-600 text-sm mt-1">Applications requiring your review</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {pendingApplications.map((app) => (
                <div key={app.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{app.org}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(app.priority)}`}>
                            {app.priority} priority
                          </span>
                        </div>
                        <h5 className="font-medium text-gray-700 mb-1">{app.aidType} - {app.quantity}</h5>
                        <p className="text-gray-600 mb-2">{app.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Submitted: {app.submittedDate}</span>
                          <span>•</span>
                          <span>Delivery: {app.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                        <span>Details</span>
                      </button>
                      <button 
                        onClick={() => handleApprove(app.id)}
                        className="flex items-center space-x-1 bg-green-600 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
                      >
                        <CheckCircle className="h-4 w-4" />
                        <span>Approve</span>
                      </button>
                      <button 
                        onClick={() => handleReject(app.id)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <XCircle className="h-4 w-4" />
                        <span>Reject</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Processed Applications</h3>
            <p className="text-gray-600 text-sm mt-1">Previously reviewed applications</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {processedApplications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No processed applications yet.
              </div>
            ) : (
              processedApplications.map((app) => (
                <div key={app.id} className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <Package className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-semibold text-gray-900">{app.org}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(app.status)}`}>
                            {app.status}
                          </span>
                        </div>
                        <h5 className="font-medium text-gray-700 mb-1">{app.aidType} - {app.quantity}</h5>
                        <p className="text-gray-600 mb-2">{app.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Submitted: {app.submittedDate}</span>
                          <span>•</span>
                          <span>Delivery: {app.deliveryDate}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200">
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </button>
                      {app.status === 'approved' && (
                        <button 
                          onClick={() => handleComplete(app.id)}
                          className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                        >
                          <CheckCircle className="h-4 w-4" />
                          <span>Complete</span>
                        </button>
                      )}
                      <button 
                        onClick={() => handleDelete(app.id)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminApplications;