import React from 'react';
import { X, MapPin, Users, Clock, AlertTriangle, CheckCircle, XCircle, Phone, Heart, Baby, Armchair as Wheelchair, Layers } from 'lucide-react';
import { useHeatmap } from '../context/HeatmapContext';

const Heatmap = () => {
  const { 
    villages, 
    selectedVillage, 
    setSelectedVillage, 
    heatmapType, 
    setHeatmapType, 
    getUrgencyColor, 
    getSupplyDeficit, 
    getSupplyLevel 
  } = useHeatmap();

  const handleVillageClick = (village: any) => {
    setSelectedVillage(village);
  };

  const closeModal = () => {
    setSelectedVillage(null);
  };

  const getUrgencyText = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return 'CRITICAL - Immediate Action Required';
      case 'high': return 'HIGH - Urgent Attention Needed';
      case 'medium': return 'MEDIUM - Monitor Closely';
      case 'low': return 'LOW - Stable Condition';
      case 'oversupplied': return 'OVERSUPPLIED - Excess Resources Available';
      default: return 'Unknown';
    }
  };

  const getUrgencyIcon = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return <AlertTriangle className="h-5 w-5 text-red-600" />;
      case 'high': return <AlertTriangle className="h-5 w-5 text-orange-600" />;
      case 'medium': return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'oversupplied': return <CheckCircle className="h-5 w-5 text-green-700" />;
      default: return <Clock className="h-5 w-5 text-gray-600" />;
    }
  };

  const getSupplyPercentage = (village: any, type: 'current' | 'promised' | 'performed') => {
    const supplyLevel = getSupplyLevel(village, type);
    return Math.round((supplyLevel / village.requiredSupply) * 100);
  };

  const getHeatmapTitle = () => {
    switch (heatmapType) {
      case 'current': return 'Current Aid Supply';
      case 'promised': return 'Promised Aid (Approved Applications)';
      case 'performed': return 'Delivered Aid (Completed)';
      default: return 'Aid Supply Status';
    }
  };

  const getHeatmapDescription = () => {
    switch (heatmapType) {
      case 'current': return 'Real-time aid currently available in villages';
      case 'promised': return 'Aid committed through approved applications';
      case 'performed': return 'Aid actually delivered and confirmed';
      default: return 'Village-level aid supply status';
    }
  };

  return (
    <div className="relative">
      {/* Heatmap Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{getHeatmapTitle()}</h3>
            <p className="text-gray-600 text-sm mt-1">{getHeatmapDescription()} (7-day food supply requirement)</p>
          </div>
          
          {/* Heatmap Type Selector */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-400" />
              <select
                value={heatmapType}
                onChange={(e) => setHeatmapType(e.target.value as 'current' | 'promised' | 'performed')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
              >
                <option value="current">Current Supply</option>
                <option value="promised">Promised Aid</option>
                <option value="performed">Delivered Aid</option>
              </select>
            </div>
            
            {/* Legend */}
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-600">Supply Level:</div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#15803d' }}></div>
                <span className="text-xs text-gray-600">120%+</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#22c55e' }}></div>
                <span className="text-xs text-gray-600">100%+</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#fca5a5' }}></div>
                <span className="text-xs text-gray-600">80%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#f87171' }}></div>
                <span className="text-xs text-gray-600">60%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#dc2626' }}></div>
                <span className="text-xs text-gray-600">40%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#991b1b' }}></div>
                <span className="text-xs text-gray-600">20%</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 rounded" style={{ backgroundColor: '#7f1d1d' }}></div>
                <span className="text-xs text-gray-600">0%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Map Area */}
        <div className="relative bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg h-96 overflow-hidden">
          {/* Map Background */}
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 800 400" className="w-full h-full">
              {/* Simplified Chennai district outline */}
              <path
                d="M100 50 L700 50 L700 350 L100 350 Z M150 100 L650 100 L650 300 L150 300 Z"
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2"
                strokeDasharray="5,5"
              />
              <text x="400" y="30" textAnchor="middle" className="fill-blue-600 text-sm font-medium">
                Chennai District - Flood Affected Areas ({getHeatmapTitle()})
              </text>
            </svg>
          </div>

          {/* Village Markers */}
          {villages.map((village, index) => {
            const x = 150 + (index % 4) * 150 + Math.random() * 50;
            const y = 120 + Math.floor(index / 4) * 80 + Math.random() * 40;
            const supplyLevel = getSupplyLevel(village, heatmapType);
            const supplyRatio = supplyLevel / village.requiredSupply;
            
            return (
              <div
                key={village.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-200 hover:scale-110"
                style={{ 
                  left: `${x}px`, 
                  top: `${y}px`,
                }}
                onClick={() => handleVillageClick(village)}
              >
                {/* Village Circle */}
                <div
                  className="w-8 h-8 rounded-full border-2 border-white shadow-lg flex items-center justify-center relative"
                  style={{ backgroundColor: getUrgencyColor(village, heatmapType) }}
                >
                  <MapPin className="h-4 w-4 text-white" />
                  
                  {/* Urgency Indicator */}
                  {village.urgencyLevel === 'critical' && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-600 rounded-full animate-pulse"></div>
                  )}
                  {supplyRatio > 1.0 && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-600 rounded-full"></div>
                  )}
                </div>
                
                {/* Village Label */}
                <div className="absolute top-10 left-1/2 transform -translate-x-1/2 bg-white px-2 py-1 rounded shadow-md border text-xs font-medium text-gray-700 whitespace-nowrap">
                  {village.name}
                  <div className="text-xs text-gray-500">
                    {getSupplyPercentage(village, heatmapType)}% supplied
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-5 gap-4 mt-6">
          <div className="text-center p-3 bg-red-50 rounded-lg">
            <div className="text-2xl font-bold text-red-600">
              {villages.filter(v => {
                const ratio = getSupplyLevel(v, heatmapType) / v.requiredSupply;
                return ratio < 0.3;
              }).length}
            </div>
            <div className="text-sm text-red-700">Critical Villages</div>
          </div>
          <div className="text-center p-3 bg-orange-50 rounded-lg">
            <div className="text-2xl font-bold text-orange-600">
              {villages.filter(v => {
                const ratio = getSupplyLevel(v, heatmapType) / v.requiredSupply;
                return ratio >= 0.3 && ratio < 0.6;
              }).length}
            </div>
            <div className="text-sm text-orange-700">High Priority</div>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">
              {villages.reduce((sum, v) => sum + v.affectedFamilies, 0).toLocaleString()}
            </div>
            <div className="text-sm text-blue-700">Total Families</div>
          </div>
          <div className="text-center p-3 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(villages.reduce((sum, v) => sum + (getSupplyLevel(v, heatmapType) / v.requiredSupply), 0) / villages.length * 100)}%
            </div>
            <div className="text-sm text-green-700">Avg. Supply Level</div>
          </div>
          <div className="text-center p-3 bg-emerald-50 rounded-lg">
            <div className="text-2xl font-bold text-emerald-600">
              {villages.filter(v => getSupplyLevel(v, heatmapType) > v.requiredSupply).length}
            </div>
            <div className="text-sm text-emerald-700">Oversupplied</div>
          </div>
        </div>
      </div>

      {/* Village Detail Modal */}
      {selectedVillage && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto z-1">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <div className="flex items-center space-x-3">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: getUrgencyColor(selectedVillage, heatmapType) }}
                >
                  <MapPin className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedVillage.name}</h2>
                  <p className="text-gray-600">{selectedVillage.district} District</p>
                </div>
              </div>
              <button
                onClick={closeModal}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                <X className="h-6 w-6 text-gray-600" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Supply Comparison */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-3">Current Supply</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-2">
                    {selectedVillage.currentAidSupply.toFixed(1)} days
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-blue-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, (selectedVillage.currentAidSupply / selectedVillage.requiredSupply) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-blue-700 mt-1">
                    {Math.round((selectedVillage.currentAidSupply / selectedVillage.requiredSupply) * 100)}% of requirement
                  </div>
                </div>

                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-3">Promised Aid</h4>
                  <div className="text-2xl font-bold text-green-600 mb-2">
                    {selectedVillage.promisedAidSupply.toFixed(1)} days
                  </div>
                  <div className="w-full bg-green-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-green-600 transition-all duration-300"
                      style={{ width: `${Math.min(100, (selectedVillage.promisedAidSupply / selectedVillage.requiredSupply) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-green-700 mt-1">
                    {Math.round((selectedVillage.promisedAidSupply / selectedVillage.requiredSupply) * 100)}% of requirement
                  </div>
                </div>

                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-3">Supply Gap</h4>
                  <div className="text-2xl font-bold text-purple-600 mb-2">
                    {Math.max(0, selectedVillage.requiredSupply - getSupplyLevel(selectedVillage, heatmapType)).toFixed(1)} days
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-purple-600 transition-all duration-300"
                      style={{ width: `${Math.max(0, 100 - (getSupplyLevel(selectedVillage, heatmapType) / selectedVillage.requiredSupply) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-purple-700 mt-1">
                    {Math.max(0, 100 - Math.round((getSupplyLevel(selectedVillage, heatmapType) / selectedVillage.requiredSupply) * 100))}% deficit
                  </div>
                </div>
              </div>

              {/* Population Impact */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Population Impact</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Population:</span>
                    <span className="font-semibold">{selectedVillage.totalPopulation.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Affected Families:</span>
                    <span className="font-semibold text-red-600">{selectedVillage.affectedFamilies.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Impact Rate:</span>
                    <span className="font-semibold">
                      {Math.round((selectedVillage.affectedFamilies * 4) / selectedVillage.totalPopulation * 100)}%
                    </span>
                  </div>
                </div>
              </div>

              {/* Demographics */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Vulnerable Demographics</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <Baby className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{selectedVillage.demographics.children}</div>
                    <div className="text-sm text-gray-600">Children</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{selectedVillage.demographics.elderly}</div>
                    <div className="text-sm text-gray-600">Elderly</div>
                  </div>
                  <div className="text-center">
                    <Wheelchair className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{selectedVillage.demographics.disabled}</div>
                    <div className="text-sm text-gray-600">Disabled</div>
                  </div>
                  <div className="text-center">
                    <Heart className="h-8 w-8 text-pink-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{selectedVillage.demographics.pregnant}</div>
                    <div className="text-sm text-gray-600">Pregnant</div>
                  </div>
                </div>
              </div>

              {/* Infrastructure Status */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Infrastructure Status</h4>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    {selectedVillage.infrastructure.roadsAccessible ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-gray-700">Roads Accessible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVillage.infrastructure.communicationAvailable ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-gray-700">Communication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVillage.infrastructure.medicalFacilityOperational ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <XCircle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-gray-700">Medical Facility</span>
                  </div>
                </div>
              </div>

              {/* Active NGOs */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Active NGOs ({selectedVillage.activeNGOs.length})</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVillage.activeNGOs.map((ngo, index) => (
                    <span
                      key={index}
                      className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {ngo}
                    </span>
                  ))}
                </div>
              </div>

              {/* Specific Needs */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">Specific Needs</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedVillage.specificNeeds.map((need, index) => (
                    <span
                      key={index}
                      className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {need}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Heatmap;