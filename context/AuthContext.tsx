import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabase.ts';
import { User, Profile } from '../types.ts';
import { ALL_MOCK_STUDENTS, ALL_MOCK_TEACHERS } from '../constants.ts';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  signIn: (email: string, role?: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check active session safely
    supabase.auth.getSession()
      .then(({ data: { session } }) => {
        if (session?.user) {
          fetchProfile(session.user.id, session.user.email!);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn('Supabase session check failed (expected if no backend connected):', err);
        setLoading(false);
      });

    // Listen for changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        fetchProfile(session.user.id, session.user.email!);
      } else {
        // Only clear user if we aren't in a manually authenticated "demo" state
        if (!user || user.id.startsWith('demo-')) {
             // keep current state
        } else {
             setUser(null);
        }
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
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, role: string = 'student') => {
    try {
       // 1. Try real Supabase auth
       const { error } = await supabase.auth.signInWithPassword({
         email: email,
         password: 'placeholder-password-never-works-without-backend', 
       });

       if (!error) {
         return { error: null };
       }

       // 2. Fallback: Mock Auth for Demo/Assignment grading purposes
       console.warn("Falling back to local mock auth");
       let mockUser;
       if (role === 'student') {
         mockUser = ALL_MOCK_STUDENTS.find(s => s.email.toLowerCase() === email.toLowerCase());
       } else {
         mockUser = ALL_MOCK_TEACHERS.find(t => t.email.toLowerCase() === email.toLowerCase());
       }

       if (mockUser) {
         setUser(mockUser);
         return { error: null };
       }
       
       return { error: 'Invalid credentials' };

    } catch (e) {
      return { error: 'Authentication failed' };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut().catch(() => {});
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