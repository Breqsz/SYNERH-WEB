// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useEffect, useState } from 'react';
import { auth, db } from '@/lib/firebase';
import {
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  User as FirebaseUser,
} from 'firebase/auth';
import { ref, get, set, update } from 'firebase/database';

interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  bio?: string;
  skills: string[];
  experience: string;
  certifications: string[];
  reputation: number;
  tokens: number;
  joinDate: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
};

const buildDefaultUser = (fbUser: FirebaseUser, nameOverride?: string): User => ({
  id: fbUser.uid,
  email: fbUser.email || '',
  name: nameOverride || fbUser.email?.split('@')[0] || 'Usuário',
  avatar: '',
  bio: '',
  skills: [],
  experience: '',
  certifications: [],
  reputation: 0,
  tokens: 0,
  joinDate: new Date().toISOString(),
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Listener global de autenticação
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (fbUser) => {
      if (!fbUser) {
        setUser(null);
        setLoading(false);
        return;
      }

      try {
        // Tenta carregar do Realtime Database
        const userRef = ref(db, `users/${fbUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          setUser(snapshot.val() as User);
        } else {
          const newUser = buildDefaultUser(fbUser);
          try {
            await set(userRef, newUser);
          } catch (dbErr) {
            console.error('Erro ao gravar usuário no DB (onAuthStateChanged):', dbErr);
          }
          setUser(newUser);
        }
      } catch (err) {
        console.error('Erro no onAuthStateChanged (DB):', err);
        // Fallback: usa apenas os dados do auth, sem DB
        const simpleUser = buildDefaultUser(fbUser);
        setUser(simpleUser);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const fbUser = cred.user;

      let userData: User;

      // Tenta buscar/gravar no DB, mas não quebra se der erro
      try {
        const userRef = ref(db, `users/${fbUser.uid}`);
        const snapshot = await get(userRef);

        if (snapshot.exists()) {
          userData = snapshot.val() as User;
        } else {
          userData = buildDefaultUser(fbUser);
          try {
            await set(userRef, userData);
          } catch (dbErr) {
            console.error('Erro ao gravar usuário no DB (login):', dbErr);
          }
        }
      } catch (dbErr) {
        console.error('Erro ao acessar DB no login (fallback para auth apenas):', dbErr);
        userData = buildDefaultUser(fbUser);
      }

      setUser(userData);
      return true;
    } catch (error) {
      console.error('Erro no login (auth):', error);
      // Joga o erro pra tela tratar mensagem bonitinha (usuário não existe, senha errada, etc.)
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (
    email: string,
    password: string,
    name: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      const fbUser = cred.user;

      const newUser = buildDefaultUser(fbUser, name);

      try {
        await set(ref(db, `users/${fbUser.uid}`), newUser);
      } catch (dbErr) {
        console.error('Erro ao gravar usuário no DB (register):', dbErr);
      }

      setUser(newUser);
      return true;
    } catch (error) {
      console.error('Erro no registro (auth):', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    signOut(auth).catch(console.error);
    setUser(null);
  };

  const updateProfile = (updates: Partial<User>) => {
    if (!user) return;

    const updatedUser: User = { ...user, ...updates };
    setUser(updatedUser);

    try {
      update(ref(db, `users/${user.id}`), updates).catch((err) => {
        console.error('Erro ao atualizar perfil no DB:', err);
      });
    } catch (err) {
      console.error('Erro ao chamar update no DB:', err);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    loading,
    login,
    register,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
