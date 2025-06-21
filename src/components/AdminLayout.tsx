import React from 'react';
import { Heart, Map, MessageSquare, ClipboardCheck, LogOut, Home, Settings } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const navigation = [
    { name: 'Dashboard', href: '/admin/dashboard', icon: Home },
    { name: 'Heatmap', href: '/admin/dashboard', icon: Map },
    { name: 'Monitor Posts', href: '/admin/inform', icon: MessageSquare },
    { name: 'Applications', href: '/admin/applications', icon: ClipboardCheck },
    { name: 'Manage Places', href: '/admin/heatmap-management', icon: Settings },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <div className="w-64 bg-white shadow-sm flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <Heart className="h-8 w-8 text-haiti-red" />
            <span className="text-2xl font-bold text-haiti-blue">NouriLakay</span>
          </div>
          <p className="text-sm text-gray-600 mt-2">Admin Control Panel</p>
        </div>

        <nav className="p-4 flex-1">
          <ul className="space-y-2">
            {navigation.map((item) => (
              <li key={item.name}>
                <button
                  onClick={() => navigate(item.href)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg text-left transition-all duration-200 ${
                    isActive(item.href)
                      ? 'bg-haiti-blue/10 text-haiti-blue border-r-2 border-haiti-blue'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <button
            onClick={() => navigate('/')}
            className="w-full flex items-center space-x-3 px-4 py-3 text-gray-600 hover:bg-gray-50 hover:text-gray-900 rounded-lg transition-all duration-200"
          >
            <LogOut className="h-5 w-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  );
};

export default AdminLayout;