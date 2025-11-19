import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useApp } from '@/contexts/AppContext';
import { Button } from '@/components/UI/button';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/UI/sheet';
import { 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  Trophy, 
  Star, 
  TrendingUp,
  HelpCircle,
  Shield,
  Coins
} from 'lucide-react';
import { REPUTATION_LEVELS } from '@/utils/constants';

interface DrawerMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerMenuProps> = ({ isOpen, onClose }) => {
  const { user, logout } = useAuth();
  const { darkMode, toggleDarkMode } = useApp();
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose();
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    onClose();
  };

  const getUserLevel = () => {
    if (!user) return REPUTATION_LEVELS[0];
    return REPUTATION_LEVELS.find(level => 
      user.reputation >= level.min && user.reputation <= level.max
    ) || REPUTATION_LEVELS[0];
  };

  const userLevel = getUserLevel();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="left" className="w-80 p-0">
        <div className="h-full bg-gradient-to-b from-blue-50 to-purple-50 dark:from-slate-900 dark:to-blue-900">
          {/* Header com perfil */}
          {user && (
            <SheetHeader className="p-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-2xl font-bold">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1">
                  <SheetTitle className="text-white text-lg font-bold">
                    {user.name}
                  </SheetTitle>
                  <p className="text-blue-100 text-sm">{user.email}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-lg">{userLevel.badge}</span>
                    <span className="text-sm font-medium">{userLevel.title}</span>
                  </div>
                </div>
              </div>
              
              {/* Stats rápidas */}
              <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/20">
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span className="font-bold">{user.reputation}</span>
                  </div>
                  <p className="text-xs text-blue-100">Reputação</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Coins className="h-4 w-4" />
                    <span className="font-bold">{user.tokens}</span>
                  </div>
                  <p className="text-xs text-blue-100">Tokens</p>
                </div>
                <div className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="font-bold">{user.certifications?.length ?? 0}</span>
                  </div>
                  <p className="text-xs text-blue-100">Certificados</p>
                </div>
              </div>
            </SheetHeader>
          )}

          {/* Menu Items */}
          <div className="flex-1 p-4 space-y-2">
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleNavigation('/settings')}
            >
              <Settings className="h-5 w-5" />
              Configurações
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={toggleDarkMode}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              {darkMode ? 'Modo Claro' : 'Modo Escuro'}
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleNavigation('/achievements')}
            >
              <Trophy className="h-5 w-5" />
              Conquistas
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleNavigation('/analytics')}
            >
              <TrendingUp className="h-5 w-5" />
              Meu Progresso
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleNavigation('/help')}
            >
              <HelpCircle className="h-5 w-5" />
              Ajuda & Suporte
            </Button>

            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12"
              onClick={() => handleNavigation('/privacy')}
            >
              <Shield className="h-5 w-5" />
              Privacidade
            </Button>

            {/* Divisor */}
            <div className="border-t border-gray-200 dark:border-gray-700 my-4"></div>

            {/* Logout */}
            <Button
              variant="ghost"
              className="w-full justify-start gap-3 h-12 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
              onClick={handleLogout}
            >
              <LogOut className="h-5 w-5" />
              Sair da Conta
            </Button>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center text-xs text-gray-500 dark:text-gray-400">
              <p>Synerh Mobile 2030+</p>
              <p>Versão 1.0.0 • FIAP Global Solution</p>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DrawerMenu;