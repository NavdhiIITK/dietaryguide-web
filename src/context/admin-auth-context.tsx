import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { blogAuth } from '@/lib/firebase';
import { useToast } from '@/hooks/use-toast';

interface AdminAuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AdminAuthContext = createContext<AdminAuthContextType | undefined>(undefined);

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(blogAuth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(blogAuth, email, password);
    } catch (error: any) {
      console.error('Error signing in:', error);
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: error.code === 'auth/invalid-credential' ? 'Invalid email or password.' : error.message,
      });
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(blogAuth);
    } catch (error: any) {
      console.error('Error signing out:', error);
      toast({ variant: 'destructive', title: 'Sign Out Error', description: error.message });
      throw error;
    }
  };

  const value = { user, loading, signIn, signOutUser };

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (context === undefined) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
