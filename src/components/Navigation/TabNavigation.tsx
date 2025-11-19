import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Home, Zap, BookOpen, User, Bot } from 'lucide-react';
import { Button } from '@/components/UI/button';

const TabNavigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const tabs = [
    { id: 'home', label: 'Home', icon: Home, path: '/' },
    { id: 'quests', label: 'Quests', icon: Zap, path: '/quests' },
    { id: 'learning', label: 'Aprender', icon: BookOpen, path: '/learning' },
    { id: 'ai-coach', label: 'IA Coach', icon: Bot, path: '/ai-coach' },
    { id: 'profile', label: 'Perfil', icon: User, path: '/profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-t border-blue-200/50 dark:border-blue-800/50">
      <div className="flex items-center justify-around px-2 py-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = location.pathname === tab.path;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => navigate(tab.path)}
              className={`flex flex-col items-center gap-1 p-2 h-auto min-w-0 flex-1 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className={`p-1 rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg' 
                  : 'hover:bg-blue-100 dark:hover:bg-blue-900/50'
              }`}>
                <Icon className="h-4 w-4" />
              </div>
              <span className="text-xs font-medium truncate">
                {tab.label}
              </span>
              {isActive && (
                <div className="w-1 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              )}
            </Button>
          );
        })}
      </div>
    </nav>
  );
};

export default TabNavigation;