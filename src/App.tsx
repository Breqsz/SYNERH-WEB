// src/App.tsx
import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/sonner';

import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { AppProvider } from '@/contexts/AppContext';
import MobileLayout from '@/components/Layout/MobileLayout';

// Pages
import Onboarding from './pages/Onboarding';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Quests from './pages/Quests';
import Profile from './pages/Profile';
import Learning from './pages/Learning';
import AICoach from './pages/AICoach';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';
import Achievements from './pages/Achievements';
import Analytics from './pages/Analytics';
import Help from './pages/Help';
import Privacy from './pages/Privacy';
import QuestDetail from './pages/QuestDetail';

const queryClient = new QueryClient();

const LoadingScreen: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
    <div className="text-center text-white">
      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center animate-pulse">
        <span className="text-2xl font-bold">S</span>
      </div>
      <p className="animate-pulse">Carregando...</p>
    </div>
  </div>
);

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <LoadingScreen />;

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

const AppRoutes: React.FC = () => {
  const { isAuthenticated, loading } = useAuth();
  const onboardingCompleted =
    localStorage.getItem('synerh_onboarding_completed') === 'true';

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Routes>
      {/* Onboarding */}
       <Route path="/onboarding" element={<Onboarding />} />

      {/* Auth */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Login />
          )
        }
      />
      <Route
        path="/register"
        element={
          isAuthenticated ? (
            <Navigate to="/" replace />
          ) : (
            <Register />
          )
        }
      />

      {/* Home */}
      <Route
        path="/"
        element={
          !onboardingCompleted ? (
            <Navigate to="/onboarding" replace />
          ) : (
            <ProtectedRoute>
              <MobileLayout>
                <Home />
              </MobileLayout>
            </ProtectedRoute>
          )
        }
      />

      {/* Rotas protegidas */}
      <Route
        path="/quests"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <Quests />
            </MobileLayout>
          </ProtectedRoute>
        }
      />

      <Route
  path="/quests/:id"
  element={
    <ProtectedRoute>
      <MobileLayout>
        <QuestDetail />
      </MobileLayout>
    </ProtectedRoute>
  }
/>

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <Profile />
            </MobileLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/learning"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <Learning />
            </MobileLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/ai-coach"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <AICoach />
            </MobileLayout>
          </ProtectedRoute>
        }
      />
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <MobileLayout>
              <Settings />
            </MobileLayout>
          </ProtectedRoute>
        }
      />
      <Route
  path="/achievements"
  element={
    <ProtectedRoute>
      <MobileLayout>
        <Achievements />
      </MobileLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/analytics"
  element={
    <ProtectedRoute>
      <MobileLayout>
        <Analytics />
      </MobileLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/help"
  element={
    <ProtectedRoute>
      <MobileLayout>
        <Help />
      </MobileLayout>
    </ProtectedRoute>
  }
/>

<Route
  path="/privacy"
  element={
    <ProtectedRoute>
      <MobileLayout>
        <Privacy />
      </MobileLayout>
    </ProtectedRoute>
  }
/>

      {/* 404 */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AuthProvider>
          <AppProvider>
            <BrowserRouter>
              <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
                <AppRoutes />
              </div>
            </BrowserRouter>
          </AppProvider>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
