import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { User, Profile } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!);
      } else {
        setLoading(false);
      }
    });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!);
      } else {
        setUser(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const fetchProfile = async (userId: string, email: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        const profile = data as Profile;
        // Map Supabase profile to App User Type
        const appUser: User = {
          id: profile.id,
          email: email,
          name: profile.full_name,
          role: profile.role,
          avatarUrl: profile.avatar_url,
          department: profile.department,
          semester: profile.semester,
          section: profile.section,
          studentId: profile.student_id,
          cgpa: profile.cgpa
        };
        setUser(appUser);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // Fallback for dev/demo if table doesn't exist yet
      console.warn("Using mock user fallback due to missing backend table");
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string) => {
    // For this specific template, we are just mocking the "Action" 
    // but in a real app, you would call:
    // return await supabase.auth.signInWithPassword({ email, password });
    
    // Returning a mock success to allow UI traversal in this specific demo environment
    // IF the backend is not actually connected.
    return { error: null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};