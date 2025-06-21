import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Village {
  id: number;
  name: string;
  district: string;
  coordinates: { lat: number; lng: number };
  affectedFamilies: number;
  totalPopulation: number;
  currentAidSupply: number; // Days worth of food supply available
  promisedAidSupply: number; // Days worth of aid promised by approved applications
  requiredSupply: number; // Days worth of food supply needed (always 7 for weekly supply)
  urgencyLevel: 'critical' | 'high' | 'medium' | 'low' | 'oversupplied';
  lastUpdated: string;
  activeNGOs: string[];
  infrastructure: {
    roadsAccessible: boolean;
    communicationAvailable: boolean;
    medicalFacilityOperational: boolean;
  };
  demographics: {
    children: number;
    elderly: number;
    disabled: number;
    pregnant: number;
  };
  specificNeeds: string[];
}

interface HeatmapContextType {
  villages: Village[];
  selectedVillage: Village | null;
  heatmapType: 'current' | 'promised' | 'performed';
  setSelectedVillage: (village: Village | null) => void;
  setHeatmapType: (type: 'current' | 'promised' | 'performed') => void;
  updateVillageAid: (villageId: number, aidDays: number, type: 'promised' | 'performed') => void;
  addVillage: (village: Omit<Village, 'id' | 'lastUpdated'>) => void;
  removeVillage: (villageId: number) => void;
  updateVillage: (villageId: number, updates: Partial<Village>) => void;
  getUrgencyColor: (village: Village, type: 'current' | 'promised' | 'performed') => string;
  getSupplyDeficit: (village: Village, type: 'current' | 'promised' | 'performed') => number;
  getSupplyLevel: (village: Village, type: 'current' | 'promised' | 'performed') => number;
}

const HeatmapContext = createContext<HeatmapContextType | undefined>(undefined);

export const useHeatmap = () => {
  const context = useContext(HeatmapContext);
  if (!context) {
    throw new Error('useHeatmap must be used within a HeatmapProvider');
  }
  return context;
};

export const HeatmapProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedVillage, setSelectedVillage] = useState<Village | null>(null);
  const [heatmapType, setHeatmapType] = useState<'current' | 'promised' | 'performed'>('current');
  const [villages, setVillages] = useState<Village[]>([
    {
      id: 1,
      name: 'Cité Soleil',
      district: 'Ouest',
      coordinates: { lat: 18.5944, lng: -72.3074 },
      affectedFamilies: 85000,
      totalPopulation: 340000,
      currentAidSupply: 0.8,
      promisedAidSupply: 3.2,
      requiredSupply: 7,
      urgencyLevel: 'critical',
      lastUpdated: '2024-01-18 14:30',
      activeNGOs: ['World Food Programme', 'Action Against Hunger', 'Meds & Food for Kids'],
      infrastructure: {
        roadsAccessible: false,
        communicationAvailable: true,
        medicalFacilityOperational: false
      },
      demographics: {
        children: 102000,
        elderly: 34000,
        disabled: 13600,
        pregnant: 6800
      },
      specificNeeds: ['Emergency Food', 'Clean Water', 'Medical Supplies', 'Security']
    },
    {
      id: 2,
      name: 'Croix-des-Bouquets',
      district: 'Ouest',
      coordinates: { lat: 18.5833, lng: -72.2167 },
      affectedFamilies: 62000,
      totalPopulation: 248000,
      currentAidSupply: 1.5,
      promisedAidSupply: 4.8,
      requiredSupply: 7,
      urgencyLevel: 'critical',
      lastUpdated: '2024-01-18 13:45',
      activeNGOs: ['FAO', 'Papaye Peasant Movement'],
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: true,
        medicalFacilityOperational: true
      },
      demographics: {
        children: 74400,
        elderly: 24800,
        disabled: 9920,
        pregnant: 4960
      },
      specificNeeds: ['Food Supplies', 'Agricultural Support', 'Seeds']
    },
    {
      id: 3,
      name: 'Jean Rabel',
      district: 'Nord-Ouest',
      coordinates: { lat: 19.8500, lng: -73.1833 },
      affectedFamilies: 48000,
      totalPopulation: 192000,
      currentAidSupply: 2.1,
      promisedAidSupply: 5.5,
      requiredSupply: 7,
      urgencyLevel: 'high',
      lastUpdated: '2024-01-18 12:20',
      activeNGOs: ['Action Against Hunger', 'Grown In Haiti'],
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: false,
        medicalFacilityOperational: true
      },
      demographics: {
        children: 57600,
        elderly: 19200,
        disabled: 7680,
        pregnant: 3840
      },
      specificNeeds: ['Cash Transfers', 'Seeds and Tools', 'Communication Equipment']
    },
    {
      id: 4,
      name: 'La Gonâve',
      district: 'Ouest',
      coordinates: { lat: 18.8333, lng: -73.0000 },
      affectedFamilies: 32000,
      totalPopulation: 128000,
      currentAidSupply: 3.2,
      promisedAidSupply: 6.8,
      requiredSupply: 7,
      urgencyLevel: 'medium',
      lastUpdated: '2024-01-18 11:15',
      activeNGOs: ['World Food Programme'],
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: true,
        medicalFacilityOperational: true
      },
      demographics: {
        children: 38400,
        elderly: 12800,
        disabled: 5120,
        pregnant: 2560
      },
      specificNeeds: ['Food Distribution', 'Transportation']
    },
    {
      id: 5,
      name: 'Artibonite Valley',
      district: 'Artibonite',
      coordinates: { lat: 19.4515, lng: -72.6890 },
      affectedFamilies: 92000,
      totalPopulation: 368000,
      currentAidSupply: 0.5,
      promisedAidSupply: 2.8,
      requiredSupply: 7,
      urgencyLevel: 'critical',
      lastUpdated: '2024-01-18 15:00',
      activeNGOs: ['FAO', 'Papaye Peasant Movement', 'World Food Programme'],
      infrastructure: {
        roadsAccessible: false,
        communicationAvailable: false,
        medicalFacilityOperational: false
      },
      demographics: {
        children: 110400,
        elderly: 36800,
        disabled: 14720,
        pregnant: 7360
      },
      specificNeeds: ['Emergency Food', 'Agricultural Recovery', 'Infrastructure Repair']
    },
    {
      id: 6,
      name: 'Grand\'Anse',
      district: 'Grand\'Anse',
      coordinates: { lat: 18.6500, lng: -74.1167 },
      affectedFamilies: 68000,
      totalPopulation: 272000,
      currentAidSupply: 1.8,
      promisedAidSupply: 4.2,
      requiredSupply: 7,
      urgencyLevel: 'critical',
      lastUpdated: '2024-01-18 14:45',
      activeNGOs: ['Grown In Haiti', 'PPAF'],
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: true,
        medicalFacilityOperational: false
      },
      demographics: {
        children: 81600,
        elderly: 27200,
        disabled: 10880,
        pregnant: 5440
      },
      specificNeeds: ['Food Security', 'Reforestation', 'Clean Cookstoves']
    },
    {
      id: 7,
      name: 'Port-au-Prince',
      district: 'Ouest',
      coordinates: { lat: 18.5944, lng: -72.3074 },
      affectedFamilies: 420000,
      totalPopulation: 1680000,
      currentAidSupply: 2.5,
      promisedAidSupply: 5.8,
      requiredSupply: 7,
      urgencyLevel: 'high',
      lastUpdated: '2024-01-18 13:30',
      activeNGOs: ['World Food Programme', 'Meds & Food for Kids', 'Action Against Hunger'],
      infrastructure: {
        roadsAccessible: true,
        communicationAvailable: true,
        medicalFacilityOperational: true
      },
      demographics: {
        children: 504000,
        elderly: 168000,
        disabled: 67200,
        pregnant: 33600
      },
      specificNeeds: ['Food Distribution', 'Child Nutrition', 'Urban Agriculture']
    },
    {
      id: 8,
      name: 'Nord-Ouest Department',
      district: 'Nord-Ouest',
      coordinates: { lat: 19.7580, lng: -72.2014 },
      affectedFamilies: 58000,
      totalPopulation: 232000,
      currentAidSupply: 1.2,
      promisedAidSupply: 3.6,
      requiredSupply: 7,
      urgencyLevel: 'critical',
      lastUpdated: '2024-01-18 14:15',
      activeNGOs: ['Action Against Hunger', 'FAO'],
      infrastructure: {
        roadsAccessible: false,
        communicationAvailable: true,
        medicalFacilityOperational: true
      },
      demographics: {
        children: 69600,
        elderly: 23200,
        disabled: 9280,
        pregnant: 4640
      },
      specificNeeds: ['Emergency Food', 'Road Access', 'Agricultural Support']
    }
  ]);

  const updateVillageAid = (villageId: number, aidDays: number, type: 'promised' | 'performed') => {
    setVillages(prev => 
      prev.map(village => {
        if (village.id === villageId) {
          const updatedVillage = { ...village };
          
          if (type === 'promised') {
            updatedVillage.promisedAidSupply = Math.max(0, updatedVillage.promisedAidSupply + aidDays);
          } else if (type === 'performed') {
            updatedVillage.currentAidSupply = Math.max(0, updatedVillage.currentAidSupply + aidDays);
          }
          
          // Update urgency level based on current supply
          const supplyRatio = updatedVillage.currentAidSupply / updatedVillage.requiredSupply;
          if (supplyRatio > 1.0) updatedVillage.urgencyLevel = 'oversupplied';
          else if (supplyRatio < 0.3) updatedVillage.urgencyLevel = 'critical';
          else if (supplyRatio < 0.5) updatedVillage.urgencyLevel = 'high';
          else if (supplyRatio < 0.8) updatedVillage.urgencyLevel = 'medium';
          else updatedVillage.urgencyLevel = 'low';

          updatedVillage.lastUpdated = new Date().toISOString().slice(0, 16).replace('T', ' ');
          
          return updatedVillage;
        }
        return village;
      })
    );
  };

  const addVillage = (newVillage: Omit<Village, 'id' | 'lastUpdated'>) => {
    const village: Village = {
      ...newVillage,
      id: Math.max(...villages.map(v => v.id), 0) + 1,
      lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
    };
    setVillages(prev => [...prev, village]);
  };

  const removeVillage = (villageId: number) => {
    setVillages(prev => prev.filter(village => village.id !== villageId));
    // Close modal if the selected village is being removed
    if (selectedVillage?.id === villageId) {
      setSelectedVillage(null);
    }
  };

  const updateVillage = (villageId: number, updates: Partial<Village>) => {
    setVillages(prev => 
      prev.map(village => 
        village.id === villageId 
          ? { 
              ...village, 
              ...updates, 
              lastUpdated: new Date().toISOString().slice(0, 16).replace('T', ' ')
            }
          : village
      )
    );
  };

  const getSupplyLevel = (village: Village, type: 'current' | 'promised' | 'performed'): number => {
    switch (type) {
      case 'current':
        return village.currentAidSupply;
      case 'promised':
        return village.promisedAidSupply;
      case 'performed':
        return village.currentAidSupply; // Performed is same as current (what's actually delivered)
      default:
        return village.currentAidSupply;
    }
  };

  const getUrgencyColor = (village: Village, type: 'current' | 'promised' | 'performed'): string => {
    const supplyLevel = getSupplyLevel(village, type);
    const supplyRatio = supplyLevel / village.requiredSupply;
    
    // Green shades for over-supplied areas
    if (supplyRatio > 1.2) return '#15803d'; // Dark green - Very oversupplied
    if (supplyRatio > 1.0) return '#22c55e'; // Green - Oversupplied
    
    // Red shades for under-supplied areas
    if (supplyRatio < 0.2) return '#7f1d1d'; // Very dark red - Critical
    if (supplyRatio < 0.4) return '#991b1b'; // Dark red - Critical
    if (supplyRatio < 0.6) return '#dc2626'; // Red - High
    if (supplyRatio < 0.8) return '#f87171'; // Light red - Medium
    return '#fca5a5'; // Very light red - Low
  };

  const getSupplyDeficit = (village: Village, type: 'current' | 'promised' | 'performed'): number => {
    const supplyLevel = getSupplyLevel(village, type);
    return Math.max(0, village.requiredSupply - supplyLevel);
  };

  return (
    <HeatmapContext.Provider value={{
      villages,
      selectedVillage,
      heatmapType,
      setSelectedVillage,
      setHeatmapType,
      updateVillageAid,
      addVillage,
      removeVillage,
      updateVillage,
      getUrgencyColor,
      getSupplyDeficit,
      getSupplyLevel
    }}>
      {children}
    </HeatmapContext.Provider>
  );
};