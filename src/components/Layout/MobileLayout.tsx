// src/components/Layout/MobileLayout.tsx

import React, { useState, ReactNode } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Menu, Bell, Search } from 'lucide-react';

import DrawerMenu from '@/components/Navigation/DrawerMenu';
import TabNavigation from '@/components/Navigation/TabNavigation';
import { Button } from '@/components/UI/button';
import { useAuth } from '@/contexts/AuthContext';

interface MobileLayoutProps {
  children: ReactNode;
}

/**
 * Layout principal mobile:
 * - Header com menu lateral, busca, notificações, avatar e tokens
 * - Conteúdo central (children)
 * - TabNavigation fixa embaixo
 */
const MobileLayout: React.FC<MobileLayoutProps> = ({ children }) => {
  const { user } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleOpenMenu = () => setIsDrawerOpen(true);
  const handleCloseMenu = () => setIsDrawerOpen(false);

  const handleGoToProfile = () => {
    navigate('/profile');
  };

  const handleSearchClick = () => {
    // aqui depois dá pra trocar por página/modal de busca real
    alert('Busca global ainda em desenvolvimento 😄');
  };

  const handleNotificationsClick = () => {
    // aqui depois dá pra trocar por drawer/modal de notificações
    alert('Central de notificações em desenvolvimento 😄');
  };

  const firstLetter =
    (user?.name && user.name.trim().charAt(0).toUpperCase()) || 'S';

  const tokens = (user as any)?.tokens ?? 0;

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Drawer lateral */}
      <DrawerMenu isOpen={isDrawerOpen} onClose={handleCloseMenu} />

      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-white/10 bg-slate-950/60 backdrop-blur-md sticky top-0 z-20">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            className="p-2"
            onClick={handleOpenMenu}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <div className="flex flex-col">
            <span className="text-[11px] uppercase tracking-[0.2em] text-blue-300">
              Synerh 2030+
            </span>
            <span className="text-sm font-semibold">
              {location.pathname === '/' ? 'Dashboard' : 'Explorando'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Busca */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2"
            onClick={handleSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>

          {/* Notificações */}
          <Button
            variant="ghost"
            size="sm"
            className="p-2 relative"
            onClick={handleNotificationsClick}
          >
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
          </Button>

          {/* Avatar + Tokens (se logado) */}
          {user && (
            <div className="flex items-center gap-2 ml-1">
              {/* Avatar */}
              <button
                className="h-8 w-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-xs font-bold"
                onClick={handleGoToProfile}
              >
                {firstLetter}
              </button>

              {/* Tokens */}
              <button
                className="flex items-center gap-1 bg-gradient-to-r from-emerald-500 to-cyan-500 px-2 py-1 rounded-full"
                onClick={handleGoToProfile}
              >
                <span className="text-xs">💎</span>
                <span className="text-[11px] font-semibold">{tokens}</span>
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto pb-16">{children}</main>

      {/* Navegação inferior */}
      <footer className="border-t border-white/10 bg-slate-950/80 backdrop-blur-md sticky bottom-0 z-20">
        <TabNavigation />
      </footer>
    </div>
  );
};

export default MobileLayout;
