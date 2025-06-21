import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useHeatmap } from './HeatmapContext';

export interface Application {
  id: number;
  org: string;
  aidType: string;
  quantity: string;
  description: string;
  submittedDate: string;
  deliveryDate: string;
  status: 'pending' | 'approved' | 'rejected' | 'completed';
  priority: 'high' | 'medium' | 'low';
  villageId?: number; // Link to village for heatmap updates
  aidDays?: number; // Days worth of aid this application provides
}

interface ApplicationContextType {
  applications: Application[];
  addApplication: (application: Omit<Application, 'id' | 'submittedDate' | 'status' | 'priority'>) => void;
  updateApplicationStatus: (id: number, status: 'approved' | 'rejected' | 'completed') => void;
  deleteApplication: (id: number) => void;
}

const ApplicationContext = createContext<ApplicationContextType | undefined>(undefined);

export const useApplications = () => {
  const context = useContext(ApplicationContext);
  if (!context) {
    throw new Error('useApplications must be used within an ApplicationProvider');
  }
  return context;
};

export const ApplicationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { updateVillageAid } = useHeatmap();
  
  const [applications, setApplications] = useState<Application[]>([
    {
      id: 1,
      org: 'World Food Programme',
      aidType: 'Emergency Food Rations',
      quantity: '10,000 family kits',
      description: 'Ready-to-eat meals and nutritional supplements for food insecure families in Cité Soleil',
      submittedDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      status: 'pending',
      priority: 'high',
      villageId: 1,
      aidDays: 4.2
    },
    {
      id: 2,
      org: 'Action Against Hunger',
      aidType: 'Cash Transfers',
      quantity: '$50,000 USD',
      description: 'Direct cash assistance for food purchases in Jean Rabel markets',
      submittedDate: '2024-01-16',
      deliveryDate: '2024-01-19',
      status: 'pending',
      priority: 'medium',
      villageId: 3,
      aidDays: 3.5
    },
    {
      id: 3,
      org: 'Meds & Food for Kids',
      aidType: 'Therapeutic Foods',
      quantity: '5,000 RUTF packets',
      description: 'Ready-to-use therapeutic food for malnourished children in Port-au-Prince',
      submittedDate: '2024-01-15',
      deliveryDate: '2024-01-17',
      status: 'approved',
      priority: 'high',
      villageId: 7,
      aidDays: 2.8
    },
    {
      id: 4,
      org: 'FAO',
      aidType: 'Agricultural Support',
      quantity: '2,000 seed kits',
      description: 'Seeds and farming tools for sustainable food production in Artibonite Valley',
      submittedDate: '2024-01-15',
      deliveryDate: '2024-01-20',
      status: 'rejected',
      priority: 'low',
      villageId: 5,
      aidDays: 1.5
    },
    {
      id: 5,
      org: 'Papaye Peasant Movement',
      aidType: 'Training & Seeds',
      quantity: '500 farmer training sessions',
      description: 'Resilient farming techniques and climate-adapted seeds for Croix-des-Bouquets',
      submittedDate: '2024-01-17',
      deliveryDate: '2024-01-20',
      status: 'pending',
      priority: 'high',
      villageId: 2,
      aidDays: 4.1
    },
    {
      id: 6,
      org: 'Grown In Haiti',
      aidType: 'Food-bearing Trees',
      quantity: '1,000 fruit tree seedlings',
      description: 'Mango and breadfruit trees for long-term food security in Grand\'Anse',
      submittedDate: '2024-01-17',
      deliveryDate: '2024-01-19',
      status: 'pending',
      priority: 'medium',
      villageId: 6,
      aidDays: 2.3
    },
    {
      id: 7,
      org: 'World Food Programme',
      aidType: 'School Meals',
      quantity: '15,000 daily meals',
      description: 'Nutritious school feeding program for children in La Gonâve',
      submittedDate: '2024-01-14',
      deliveryDate: '2024-01-16',
      status: 'completed',
      priority: 'medium',
      villageId: 4,
      aidDays: 3.2
    },
    {
      id: 8,
      org: 'PPAF',
      aidType: 'Clean Cookstoves',
      quantity: '300 bio-digesters',
      description: 'Improved cooking technology to reduce deforestation and improve health',
      submittedDate: '2024-01-16',
      deliveryDate: '2024-01-18',
      status: 'approved',
      priority: 'high',
      villageId: 6,
      aidDays: 1.8
    }
  ]);

  const addApplication = (newApp: Omit<Application, 'id' | 'submittedDate' | 'status' | 'priority'>) => {
    const application: Application = {
      ...newApp,
      id: Math.max(...applications.map(app => app.id), 0) + 1,
      submittedDate: new Date().toISOString().split('T')[0],
      status: 'pending',
      priority: 'medium' // Default priority
    };
    setApplications(prev => [...prev, application]);
  };

  const updateApplicationStatus = (id: number, status: 'approved' | 'rejected' | 'completed') => {
    setApplications(prev => 
      prev.map(app => {
        if (app.id === id) {
          const updatedApp = { ...app, status };
          
          // Update heatmap when application status changes
          if (app.villageId && app.aidDays) {
            if (status === 'approved') {
              // Add to promised aid when approved
              updateVillageAid(app.villageId, app.aidDays, 'promised');
            } else if (status === 'completed') {
              // Add to performed aid when completed
              updateVillageAid(app.villageId, app.aidDays, 'performed');
            }
          }
          
          return updatedApp;
        }
        return app;
      })
    );
  };

  const deleteApplication = (id: number) => {
    setApplications(prev => prev.filter(app => app.id !== id));
  };

  return (
    <ApplicationContext.Provider value={{
      applications,
      addApplication,
      updateApplicationStatus,
      deleteApplication
    }}>
      {children}
    </ApplicationContext.Provider>
  );
};