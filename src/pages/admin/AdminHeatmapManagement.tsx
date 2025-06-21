import React, { useState } from 'react';
import { Plus, MapPin, Edit3, Trash2, Save, X, Users, AlertTriangle, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '../../components/AdminLayout';
import { useHeatmap, Village } from '../../context/HeatmapContext';

const AdminHeatmapManagement = () => {
  const { villages, addVillage, removeVillage, updateVillage } = useHeatmap();
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingVillage, setEditingVillage] = useState<Village | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    district: '',
    coordinates: { lat: 0, lng: 0 },
    affectedFamilies: 0,
    totalPopulation: 0,
    currentAidSupply: 0,
    urgencyLevel: 'medium' as 'critical' | 'high' | 'medium' | 'low' | 'oversupplied'
  });

  const resetForm = () => {
    setFormData({
      name: '',
      district: '',
      coordinates: { lat: 0, lng: 0 },
      affectedFamilies: 0,
      totalPopulation: 0,
      currentAidSupply: 0,
      urgencyLevel: 'medium'
    });
  };

  const handleInputChange = (field: string, value: any) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create complete village object with all required fields
    const completeVillage = {
      name: formData.name,
      district: formData.district,
      coordinates: formData.coordinates,
      affectedFamilies: formData.affectedFamilies,
      totalPopulation: formData.totalPopulation,
      currentAidSupply: formData.currentAidSupply,
      promisedAidSupply: 0, // Default value
      requiredSupply: 7, // Standard 7-day requirement
      urgencyLevel: formData.urgencyLevel,
      activeNGOs: [], // Default empty array
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: true,
        medicalFacilityOperational: true
      },
      demographics: {
        children: Math.round(formData.totalPopulation * 0.3), // Estimate 30% children
        elderly: Math.round(formData.totalPopulation * 0.1), // Estimate 10% elderly
        disabled: Math.round(formData.totalPopulation * 0.04), // Estimate 4% disabled
        pregnant: Math.round(formData.totalPopulation * 0.02) // Estimate 2% pregnant
      },
      specificNeeds: ['Emergency Food', 'Clean Water'] // Default needs
    };
    
    if (editingVillage) {
      // Update existing village
      updateVillage(editingVillage.id, completeVillage);
      setEditingVillage(null);
    } else {
      // Add new village
      addVillage(completeVillage);
      setShowAddForm(false);
    }
    
    resetForm();
  };

  const handleEdit = (village: Village) => {
    setEditingVillage(village);
    setFormData({
      name: village.name,
      district: village.district,
      coordinates: village.coordinates,
      affectedFamilies: village.affectedFamilies,
      totalPopulation: village.totalPopulation,
      currentAidSupply: village.currentAidSupply,
      urgencyLevel: village.urgencyLevel
    });
  };

  const handleDelete = (villageId: number, villageName: string) => {
    if (window.confirm(`Are you sure you want to remove "${villageName}" from the heatmap? This action cannot be undone and will affect all related applications and data.`)) {
      removeVillage(villageId);
    }
  };

  const handleCancel = () => {
    setShowAddForm(false);
    setEditingVillage(null);
    resetForm();
  };

  const getUrgencyColor = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'high': return 'bg-orange-100 text-orange-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      case 'oversupplied': return 'bg-emerald-100 text-emerald-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getUrgencyIcon = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-600" />;
      case 'high': return <AlertTriangle className="h-4 w-4 text-orange-600" />;
      case 'medium': return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'oversupplied': return <CheckCircle className="h-4 w-4 text-emerald-600" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  // Sample coordinates for Haiti regions
  const sampleCoordinates = [
    { name: 'Port-au-Prince', lat: 18.5944, lng: -72.3074 },
    { name: 'Cap-Haïtien', lat: 19.7580, lng: -72.2014 },
    { name: 'Gonaïves', lat: 19.4515, lng: -72.6890 },
    { name: 'Les Cayes', lat: 18.2006, lng: -73.7500 },
    { name: 'Jacmel', lat: 18.2341, lng: -72.5358 },
    { name: 'Jérémie', lat: 18.6500, lng: -74.1167 },
    { name: 'Fort-Liberté', lat: 19.6667, lng: -71.8333 },
    { name: 'Hinche', lat: 19.1500, lng: -72.0167 }
  ];

  const fillSampleCoordinates = () => {
    const randomLocation = sampleCoordinates[Math.floor(Math.random() * sampleCoordinates.length)];
    setFormData(prev => ({
      ...prev,
      coordinates: { lat: randomLocation.lat, lng: randomLocation.lng }
    }));
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Heatmap Management</h1>
            <p className="text-gray-600 mt-2">Add, edit, or remove places from the food security heatmap</p>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>Add New Place</span>
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Places</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{villages.length}</p>
              </div>
              <div className="p-3 rounded-lg bg-blue-100">
                <MapPin className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Critical Areas</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {villages.filter(v => v.urgencyLevel === 'critical').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-red-100">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Population</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {villages.reduce((sum, v) => sum + v.totalPopulation, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-100">
                <Users className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
          
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Affected Families</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">
                  {villages.reduce((sum, v) => sum + v.affectedFamilies, 0).toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-100">
                <Users className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Add/Edit Form - Simplified */}
        {(showAddForm || editingVillage) && (
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-900">
                {editingVillage ? 'Edit Place' : 'Add New Place'}
              </h3>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Place Name *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., Port-au-Prince"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                  <select
                    value={formData.district}
                    onChange={(e) => handleInputChange('district', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    required
                  >
                    <option value="">Select Department</option>
                    <option value="Ouest">Ouest</option>
                    <option value="Nord">Nord</option>
                    <option value="Artibonite">Artibonite</option>
                    <option value="Sud">Sud</option>
                    <option value="Sud-Est">Sud-Est</option>
                    <option value="Grand'Anse">Grand'Anse</option>
                    <option value="Nord-Est">Nord-Est</option>
                    <option value="Centre">Centre</option>
                    <option value="Nippes">Nippes</option>
                    <option value="Nord-Ouest">Nord-Ouest</option>
                  </select>
                </div>
              </div>

              {/* Coordinates */}
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Latitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lat}
                    onChange={(e) => handleInputChange('coordinates.lat', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., 18.5944"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Longitude *</label>
                  <input
                    type="number"
                    step="any"
                    value={formData.coordinates.lng}
                    onChange={(e) => handleInputChange('coordinates.lng', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., -72.3074"
                    required
                  />
                </div>

                <div className="flex items-end">
                  <button
                    type="button"
                    onClick={fillSampleCoordinates}
                    className="w-full bg-gray-100 text-gray-700 px-4 py-3 rounded-lg hover:bg-gray-200 transition-colors duration-200 text-sm"
                  >
                    Use Sample Location
                  </button>
                </div>
              </div>

              {/* Population Data */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Total Population *</label>
                  <input
                    type="number"
                    value={formData.totalPopulation}
                    onChange={(e) => handleInputChange('totalPopulation', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., 3400"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Food Insecure Families *</label>
                  <input
                    type="number"
                    value={formData.affectedFamilies}
                    onChange={(e) => handleInputChange('affectedFamilies', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., 850"
                    required
                  />
                </div>
              </div>

              {/* Aid Supply and Urgency */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Current Food Supply (days)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={formData.currentAidSupply}
                    onChange={(e) => handleInputChange('currentAidSupply', parseFloat(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    placeholder="e.g., 1.2"
                  />
                  <p className="text-sm text-gray-500 mt-1">Days worth of food currently available</p>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Urgency Level</label>
                  <select
                    value={formData.urgencyLevel}
                    onChange={(e) => handleInputChange('urgencyLevel', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  >
                    <option value="critical">Critical - Immediate Action Required</option>
                    <option value="high">High - Urgent Attention Needed</option>
                    <option value="medium">Medium - Monitor Closely</option>
                    <option value="low">Low - Stable Condition</option>
                    <option value="oversupplied">Oversupplied - Excess Resources</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Note:</h4>
                <p className="text-sm text-blue-800">
                  Additional details like demographics, infrastructure status, and specific needs will be automatically estimated based on the population data you provide. You can edit these details later if needed.
                </p>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
                >
                  <Save className="h-4 w-4" />
                  <span>{editingVillage ? 'Update Place' : 'Add Place'}</span>
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="bg-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-400 transition-colors duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Places List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Current Places on Heatmap</h3>
            <p className="text-gray-600 text-sm mt-1">Manage all locations currently being tracked</p>
          </div>
          
          <div className="divide-y divide-gray-200">
            {villages.length === 0 ? (
              <div className="p-6 text-center text-gray-500">
                No places added yet. Click "Add New Place" to get started.
              </div>
            ) : (
              villages.map((village) => (
                <div key={village.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="p-3 bg-blue-100 rounded-lg">
                        <MapPin className="h-6 w-6 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-semibold text-gray-900">{village.name}</h4>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">{village.district}</span>
                          <div className="flex items-center space-x-1">
                            {getUrgencyIcon(village.urgencyLevel)}
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getUrgencyColor(village.urgencyLevel)}`}>
                              {village.urgencyLevel}
                            </span>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-3">
                          <div>
                            <span className="font-medium">Population:</span> {village.totalPopulation.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Food Insecure:</span> {village.affectedFamilies.toLocaleString()}
                          </div>
                          <div>
                            <span className="font-medium">Current Food:</span> {village.currentAidSupply.toFixed(1)} days
                          </div>
                          <div>
                            <span className="font-medium">Coordinates:</span> {village.coordinates.lat.toFixed(4)}, {village.coordinates.lng.toFixed(4)}
                          </div>
                        </div>

                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <CheckCircle className={`h-4 w-4 ${village.infrastructure.roadsAccessible ? 'text-green-500' : 'text-red-500'}`} />
                            <span>Roads</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className={`h-4 w-4 ${village.infrastructure.communicationAvailable ? 'text-green-500' : 'text-red-500'}`} />
                            <span>Communication</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <CheckCircle className={`h-4 w-4 ${village.infrastructure.medicalFacilityOperational ? 'text-green-500' : 'text-red-500'}`} />
                            <span>Medical</span>
                          </div>
                          <span>•</span>
                          <span>Active NGOs: {village.activeNGOs.length}</span>
                          <span>•</span>
                          <span>Last Updated: {village.lastUpdated}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2 ml-4">
                      <button 
                        onClick={() => handleEdit(village)}
                        className="flex items-center space-x-1 bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
                      >
                        <Edit3 className="h-4 w-4" />
                        <span>Edit</span>
                      </button>
                      <button 
                        onClick={() => handleDelete(village.id, village.name)}
                        className="flex items-center space-x-1 bg-red-600 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Remove</span>
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

export default AdminHeatmapManagement;