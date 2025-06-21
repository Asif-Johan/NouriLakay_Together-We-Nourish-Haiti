import React, { useState } from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup } from 'react-leaflet';
import { useHeatmap } from '../context/HeatmapContext';
import { MapPin, TrendingUp, Package, Users, AlertTriangle, CheckCircle, Layers } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const AidStatusDemo = () => {
  const { villages, getUrgencyColor, getSupplyLevel } = useHeatmap();
  const [demoType, setDemoType] = useState<'current' | 'promised'>('current');
  const [mapCenter] = useState<[number, number]>([18.9712, -72.2852]); // Haiti center

  // Calculate overall statistics
  const totalPopulation = villages.reduce((sum, v) => sum + v.totalPopulation, 0);
  const totalAffectedFamilies = villages.reduce((sum, v) => sum + v.affectedFamilies, 0);
  const criticalAreas = villages.filter(v => v.urgencyLevel === 'critical').length;
  const wellSuppliedAreas = villages.filter(v => getSupplyLevel(v, 'current') > v.requiredSupply).length;

  const getSupplyPercentage = (type: 'current' | 'promised') => {
    const totalSupply = villages.reduce((sum, v) => sum + getSupplyLevel(v, type), 0);
    const totalRequired = villages.reduce((sum, v) => sum + v.requiredSupply, 0);
    return Math.round((totalSupply / totalRequired) * 100);
  };

  const getMarkerSize = (village: any) => {
    const supplyLevel = getSupplyLevel(village, demoType);
    const supplyRatio = supplyLevel / village.requiredSupply;
    return supplyRatio > 1 ? 12 : Math.max(6, 15 - (supplyRatio * 8));
  };

  const getUrgencyIcon = (urgencyLevel: string) => {
    switch (urgencyLevel) {
      case 'critical': return <AlertTriangle className="h-3 w-3 text-red-600" />;
      case 'high': return <AlertTriangle className="h-3 w-3 text-orange-600" />;
      case 'medium': return <AlertTriangle className="h-3 w-3 text-yellow-600" />;
      case 'low': return <CheckCircle className="h-3 w-3 text-green-600" />;
      case 'oversupplied': return <CheckCircle className="h-3 w-3 text-emerald-600" />;
      default: return <AlertTriangle className="h-3 w-3 text-gray-600" />;
    }
  };

  return (
    <section id="aid-status" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Real-Time Food Aid Distribution Status
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Live tracking of food security efforts across Haiti. See where aid is needed most 
            and how our coordinated response is making a difference in the fight against hunger.
          </p>
        </div>

        {/* Overall Statistics */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-gradient-to-br from-haiti-blue/10 to-haiti-blue/20 p-6 rounded-xl border border-haiti-blue/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-haiti-blue text-sm font-medium">Total Population</p>
                <p className="text-3xl font-bold text-haiti-blue mt-1">{totalPopulation.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-haiti-blue/20">
                <Users className="h-8 w-8 text-haiti-blue" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-haiti-red/10 to-haiti-red/20 p-6 rounded-xl border border-haiti-red/20">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-haiti-red text-sm font-medium">Food Insecure Families</p>
                <p className="text-3xl font-bold text-haiti-red mt-1">{totalAffectedFamilies.toLocaleString()}</p>
              </div>
              <div className="p-3 rounded-lg bg-haiti-red/20">
                <AlertTriangle className="h-8 w-8 text-haiti-red" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-6 rounded-xl border border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">Critical Areas</p>
                <p className="text-3xl font-bold text-orange-900 mt-1">{criticalAreas}</p>
              </div>
              <div className="p-3 rounded-lg bg-orange-200">
                <MapPin className="h-8 w-8 text-orange-700" />
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl border border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-600 text-sm font-medium">Well Supplied</p>
                <p className="text-3xl font-bold text-green-900 mt-1">{wellSuppliedAreas}</p>
              </div>
              <div className="p-3 rounded-lg bg-green-200">
                <CheckCircle className="h-8 w-8 text-green-700" />
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Map */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900">Live Food Aid Distribution Map</h3>
              <p className="text-gray-600 mt-1">Interactive map showing food supply levels across Haiti's most vulnerable communities</p>
            </div>
            
            {/* Map Type Selector */}
            <div className="flex items-center space-x-2">
              <Layers className="h-5 w-5 text-gray-400" />
              <select
                value={demoType}
                onChange={(e) => setDemoType(e.target.value as 'current' | 'promised')}
                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-haiti-blue focus:border-transparent"
              >
                <option value="current">Current Food Supply</option>
                <option value="promised">Promised Food Aid</option>
              </select>
            </div>
          </div>

          {/* Map Container */}
          <div className="w-full h-96 rounded-lg border border-gray-200 overflow-hidden mb-6">
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
                const supplyLevel = getSupplyLevel(village, demoType);
                const supplyRatio = supplyLevel / village.requiredSupply;
                const color = getUrgencyColor(village, demoType);
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
                  >
                    <Popup>
                      <div className="p-2 min-w-[180px]">
                        <h4 className="font-semibold text-gray-900 mb-2 flex items-center space-x-2">
                          <span>{village.name}</span>
                          {getUrgencyIcon(village.urgencyLevel)}
                        </h4>
                        <div className="space-y-1 text-sm">
                          <div><strong>Department:</strong> {village.district}</div>
                          <div><strong>Food Supply Level:</strong> {supplyLevel.toFixed(1)} / {village.requiredSupply} days</div>
                          <div><strong>Food Insecure Families:</strong> {village.affectedFamilies.toLocaleString()}</div>
                          <div><strong>Status:</strong> {supplyRatio > 1 ? 'Well Supplied' : village.urgencyLevel}</div>
                          <div className="bg-gray-100 p-2 rounded mt-2">
                            <div className="bg-gray-300 h-2 rounded">
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
                      </div>
                    </Popup>
                  </CircleMarker>
                );
              })}
            </MapContainer>
          </div>

          {/* Supply Status Summary */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-haiti-blue/10 p-4 rounded-lg">
              <h4 className="font-semibold text-haiti-blue mb-3">Current Food Supply Status</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-haiti-blue">Overall Coverage:</span>
                <span className="font-bold text-haiti-blue">{getSupplyPercentage('current')}%</span>
              </div>
              <div className="w-full bg-haiti-blue/20 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-haiti-blue transition-all duration-300"
                  style={{ width: `${getSupplyPercentage('current')}%` }}
                ></div>
              </div>
              <p className="text-sm text-haiti-blue mt-2">
                Food aid currently available and distributed to affected areas
              </p>
            </div>

            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-semibold text-green-900 mb-3">Promised Food Aid Status</h4>
              <div className="flex items-center justify-between mb-2">
                <span className="text-green-700">Committed Coverage:</span>
                <span className="font-bold text-green-900">{getSupplyPercentage('promised')}%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-3">
                <div
                  className="h-3 rounded-full bg-green-600 transition-all duration-300"
                  style={{ width: `${getSupplyPercentage('promised')}%` }}
                ></div>
              </div>
              <p className="text-sm text-green-700 mt-2">
                Food aid committed through approved NGO applications
              </p>
            </div>
          </div>
        </div>

        {/* Impact Metrics */}
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-gradient-to-br from-haiti-gold/20 to-haiti-gold/30 rounded-xl border border-haiti-gold/30">
            <div className="inline-flex p-4 bg-haiti-gold/30 rounded-full mb-4">
              <TrendingUp className="h-8 w-8 text-yellow-700" />
            </div>
            <h4 className="text-2xl font-bold text-yellow-800 mb-2">75%</h4>
            <p className="text-yellow-700 font-medium">Faster Response</p>
            <p className="text-yellow-600 text-sm mt-2">
              Coordinated efforts reduce response time significantly
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-haiti-blue/10 to-haiti-blue/20 rounded-xl border border-haiti-blue/20">
            <div className="inline-flex p-4 bg-haiti-blue/20 rounded-full mb-4">
              <Package className="h-8 w-8 text-haiti-blue" />
            </div>
            <h4 className="text-2xl font-bold text-haiti-blue mb-2">92%</h4>
            <p className="text-haiti-blue font-medium">Delivery Accuracy</p>
            <p className="text-haiti-blue/80 text-sm mt-2">
              Precise targeting ensures aid reaches those who need it most
            </p>
          </div>

          <div className="text-center p-6 bg-gradient-to-br from-haiti-red/10 to-haiti-red/20 rounded-xl border border-haiti-red/20">
            <div className="inline-flex p-4 bg-haiti-red/20 rounded-full mb-4">
              <Users className="h-8 w-8 text-haiti-red" />
            </div>
            <h4 className="text-2xl font-bold text-haiti-red mb-2">100+</h4>
            <p className="text-haiti-red font-medium">Partner NGOs</p>
            <p className="text-haiti-red/80 text-sm mt-2">
              Growing network working together for maximum impact
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <div className="bg-gradient-to-r from-haiti-blue to-haiti-red rounded-xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Join Our Coordinated Food Security Efforts</h3>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Be part of Haiti's most effective food security network. Together, we can ensure 
              no person facing hunger is left behind and every aid effort counts.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/login" 
                className="inline-flex items-center justify-center px-8 py-3 bg-white text-haiti-blue font-semibold rounded-lg hover:bg-gray-100 transition-all duration-200"
              >
                Join as NGO Partner
              </a>
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-haiti-blue transition-all duration-200"
              >
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AidStatusDemo;