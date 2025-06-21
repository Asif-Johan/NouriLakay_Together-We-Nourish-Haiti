import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, useMap } from 'react-leaflet';
import { useHeatmap } from '../context/HeatmapContext';
import { MapPin, Layers, Users, AlertTriangle, CheckCircle, Baby, Heart, Armchair as Wheelchair } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LeafletHeatmap = () => {
  const { villages, selectedVillage, setSelectedVillage, heatmapType, setHeatmapType, getUrgencyColor, getSupplyLevel } = useHeatmap();
  const [mapCenter] = useState<[number, number]>([18.9712, -72.2852]); // Haiti center

  const getSupplyPercentage = (type: 'current' | 'promised' | 'performed') => {
    const totalSupply = villages.reduce((sum, v) => sum + getSupplyLevel(v, type), 0);
    const totalRequired = villages.reduce((sum, v) => sum + v.requiredSupply, 0);
    return Math.round((totalSupply / totalRequired) * 100);
  };

  const getHeatmapTitle = () => {
    switch (heatmapType) {
      case 'current': return 'Current Food Supply';
      case 'promised': return 'Promised Food Aid (Approved Applications)';
      case 'performed': return 'Delivered Food Aid (Completed)';
      default: return 'Food Supply Status';
    }
  };

  const getHeatmapDescription = () => {
    switch (heatmapType) {
      case 'current': return 'Real-time food supply currently available in communities';
      case 'promised': return 'Food aid committed through approved applications';
      case 'performed': return 'Food aid actually delivered and confirmed';
      default: return 'Community-level food supply status';
    }
  };

  const getMarkerSize = (village: any) => {
    const supplyLevel = getSupplyLevel(village, heatmapType);
    const supplyRatio = supplyLevel / village.requiredSupply;
    return supplyRatio > 1 ? 15 : Math.max(8, 20 - (supplyRatio * 10));
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

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 z-0">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-xl font-semibold text-gray-900">{getHeatmapTitle()}</h3>
          <p className="text-gray-600 text-sm mt-1">{getHeatmapDescription()} (7-day food supply requirement)</p>
        </div>
        
        {/* Heatmap Type Selector */}
        <div className="flex items-center space-x-2">
          <Layers className="h-5 w-5 text-gray-400" />
          <select
            value={heatmapType}
            onChange={(e) => setHeatmapType(e.target.value as 'current' | 'promised' | 'performed')}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
          >
            <option value="current">Current Supply</option>
            <option value="promised">Promised Aid</option>
            <option value="performed">Delivered Aid</option>
          </select>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative">
        <div className="w-full h-96 rounded-lg border border-gray-200 overflow-hidden">
          <MapContainer
            center={mapCenter}
            zoom={8}
            style={{ height: '100%', width: '100%' }}
            className="rounded-lg"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            
            {villages.map((village) => {
              const supplyLevel = getSupplyLevel(village, heatmapType);
              const supplyRatio = supplyLevel / village.requiredSupply;
              const color = getUrgencyColor(village, heatmapType);
              const size = getMarkerSize(village);
              
              return (
                <CircleMarker
                  key={village.id}
                  center={[village.coordinates.lat, village.coordinates.lng]}
                  radius={size}
                  fillColor={color}
                  color="#ffffff"
                  weight={2}
                  opacity={1}
                  fillOpacity={0.8}
                  eventHandlers={{
                    click: () => setSelectedVillage(village),
                  }}
                >
                  <Popup>
                    <div className="p-2 min-w-[200px]">
                      <h3 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                        <span>{village.name}</span>
                        {getUrgencyIcon(village.urgencyLevel)}
                      </h3>
                      <div className="space-y-2 text-sm">
                        <div>
                          <strong>Food Supply Status ({heatmapType}):</strong>
                          <div className="bg-gray-100 p-2 rounded mt-1">
                            {supplyLevel.toFixed(1)} / {village.requiredSupply} days
                            <div className="bg-gray-300 h-2 rounded mt-1">
                              <div 
                                className="h-2 rounded transition-all duration-300" 
                                style={{ 
                                  backgroundColor: color, 
                                  width: `${Math.min(100, (supplyLevel / village.requiredSupply) * 100)}%` 
                                }}
                              ></div>
                            </div>
                          </div>
                        </div>
                        <div><strong>Food Insecure Families:</strong> {village.affectedFamilies.toLocaleString()}</div>
                        <div><strong>Population:</strong> {village.totalPopulation.toLocaleString()}</div>
                        <div><strong>Status:</strong> {supplyRatio > 1 ? 'Well Supplied' : village.urgencyLevel}</div>
                        <button 
                          onClick={() => setSelectedVillage(village)}
                          className="mt-2 bg-haiti-blue text-white px-3 py-1 rounded text-xs hover:bg-primary-700 transition-colors duration-200"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  </Popup>
                </CircleMarker>
              );
            })}
          </MapContainer>
        </div>
      </div>

      {/* Legend and Stats */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Legend */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Food Supply Level Legend</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#15803d' }}></div>
              <span className="text-sm text-gray-600">120%+ - Very Well Supplied</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#22c55e' }}></div>
              <span className="text-sm text-gray-600">100-120% - Well Supplied</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#fca5a5' }}></div>
              <span className="text-sm text-gray-600">80-100% - Adequate</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#f87171' }}></div>
              <span className="text-sm text-gray-600">60-80% - Low Supply</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#dc2626' }}></div>
              <span className="text-sm text-gray-600">40-60% - High Need</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#991b1b' }}></div>
              <span className="text-sm text-gray-600">20-40% - Critical</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: '#7f1d1d' }}></div>
              <span className="text-sm text-gray-600">0-20% - Emergency</span>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div>
          <h4 className="font-semibold text-gray-900 mb-3">Supply Overview</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-haiti-blue/10 rounded-lg">
              <div className="text-lg font-bold text-haiti-blue">
                {getSupplyPercentage('current')}%
              </div>
              <div className="text-xs text-haiti-blue">Current</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-lg font-bold text-green-600">
                {getSupplyPercentage('promised')}%
              </div>
              <div className="text-xs text-green-700">Promised</div>
            </div>
            <div className="text-center p-3 bg-haiti-red/10 rounded-lg">
              <div className="text-lg font-bold text-haiti-red">
                {villages.filter(v => getSupplyLevel(v, 'current') > v.requiredSupply).length}
              </div>
              <div className="text-xs text-haiti-red">Well Supplied</div>
            </div>
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
                  <p className="text-gray-600">{selectedVillage.district} Department</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedVillage(null)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              >
                ×
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-6">
              {/* Supply Comparison */}
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-haiti-blue/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-haiti-blue mb-3">Current Supply</h4>
                  <div className="text-2xl font-bold text-haiti-blue mb-2">
                    {selectedVillage.currentAidSupply.toFixed(1)} days
                  </div>
                  <div className="w-full bg-haiti-blue/20 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-haiti-blue transition-all duration-300"
                      style={{ width: `${Math.min(100, (selectedVillage.currentAidSupply / selectedVillage.requiredSupply) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-haiti-blue mt-1">
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

                <div className="bg-haiti-red/10 p-4 rounded-lg">
                  <h4 className="font-semibold text-haiti-red mb-3">Supply Gap</h4>
                  <div className="text-2xl font-bold text-haiti-red mb-2">
                    {Math.max(0, selectedVillage.requiredSupply - getSupplyLevel(selectedVillage, heatmapType)).toFixed(1)} days
                  </div>
                  <div className="w-full bg-haiti-red/20 rounded-full h-3">
                    <div
                      className="h-3 rounded-full bg-haiti-red transition-all duration-300"
                      style={{ width: `${Math.max(0, 100 - (getSupplyLevel(selectedVillage, heatmapType) / selectedVillage.requiredSupply) * 100)}%` }}
                    ></div>
                  </div>
                  <div className="text-sm text-haiti-red mt-1">
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
                    <span className="text-gray-600">Food Insecure Families:</span>
                    <span className="font-semibold text-haiti-red">{selectedVillage.affectedFamilies.toLocaleString()}</span>
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
                    <Baby className="h-8 w-8 text-haiti-blue mx-auto mb-2" />
                    <div className="font-semibold text-gray-900">{selectedVillage.demographics.children}</div>
                    <div className="text-sm text-gray-600">Children</div>
                  </div>
                  <div className="text-center">
                    <Users className="h-8 w-8 text-haiti-red mx-auto mb-2" />
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
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-gray-700">Roads Accessible</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVillage.infrastructure.communicationAvailable ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    )}
                    <span className="text-gray-700">Communication</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedVillage.infrastructure.medicalFacilityOperational ? (
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-600" />
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
                      className="bg-haiti-blue/10 text-haiti-blue px-3 py-1 rounded-full text-sm font-medium"
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
                      className="bg-haiti-red/10 text-haiti-red px-3 py-1 rounded-full text-sm font-medium"
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

export default LeafletHeatmap;