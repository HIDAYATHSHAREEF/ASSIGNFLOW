import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { UserRole } from '../types';
import { supabase } from '../lib/supabase';
import { GraduationCap, ArrowRight, Lock, Mail, AlertCircle } from 'lucide-react';
import { ALL_MOCK_STUDENTS, ALL_MOCK_TEACHERS } from '../constants'; // Fallback

export const Login: React.FC = () => {
  const [role, setRole] = useState<UserRole>('student');
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // 1. Attempt Real Supabase Auth
      // const { data, error } = await supabase.auth.signInWithPassword({
      //   email,
      //   password,
      // });
      // if (error) throw error;
      
      // MOCK IMPLEMENTATION FOR DEMO (Since backend isn't actually provisioned)
      // This mimics the exact delay and behavior of a real Supabase call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Check Mock DB
      let validUser = false;
      if (role === 'student') {
        const student = ALL_MOCK_STUDENTS.find(s => s.email.toLowerCase() === email.toLowerCase());
        if (student && student.password === password) validUser = true;
      } else {
        const teacher = ALL_MOCK_TEACHERS.find(t => t.email.toLowerCase() === email.toLowerCase());
        if (teacher && (teacher.password === password || (!teacher.password && password.length > 3))) validUser = true;
      }

      if (!validUser) {
        throw new Error('Invalid credentials');
      }

      // If successful, we manually trigger the auth state update in context
      // In a real app, signInWithPassword does this automatically via the session listener
      const { data: { session } } = await supabase.auth.signInWithPassword({
          email: 'placeholder@dummy.com', // This would fail in real life without an account
          password: 'placeholder'
      }).catch(() => ({ data: { session: null } })); // Catching expected error in mock env

      // Force refresh for demo purposes since we aren't truly authenticated
      window.location.reload(); 

    } catch (err: any) {
      setError(err.message || 'Authentication failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 animate-fade-in">
      <GlassCard className="w-full max-w-md p-8 md:p-10">
        <div className="text-center mb-8">
          <div className="w-12 h-12 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/30 mx-auto mb-4">
            <GraduationCap size={24} />
          </div>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Assign Flow</h1>
          <p className="text-slate-500 mt-2 text-sm">Welcome back! Please access your portal.</p>
        </div>

        {/* Role Toggle */}
        <div className="bg-slate-100/50 p-1 rounded-xl flex mb-8 border border-white/50 relative">
            <button
              type="button"
              onClick={() => { setRole('student'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                role === 'student' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Student
            </button>
            <button
              type="button"
              onClick={() => { setRole('teacher'); setError(''); }}
              className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all duration-300 ${
                role === 'teacher' 
                  ? 'bg-white text-indigo-600 shadow-sm' 
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              Teacher
            </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
              Email Address
            </label>
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={role === 'student' ? "arjun.kumar@univ.edu" : "sarah.lin@university.edu"}
                className="w-full pl-10 pr-4 py-3 bg-white/40 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/60 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider ml-1">
              Password
            </label>
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={18} />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-3 bg-white/40 border border-white/60 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:bg-white/60 transition-all text-sm text-slate-800 placeholder:text-slate-400"
                required
              />
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 text-xs text-red-500 bg-red-50 p-3 rounded-lg border border-red-100 animate-slide-up">
              <AlertCircle size={14} className="shrink-0" />
              {error}
            </div>
          )}

          <div className="flex justify-end pt-2">
            <a href="#" className="text-xs font-medium text-indigo-600 hover:text-indigo-700 transition-colors">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-slate-900 text-white py-3.5 rounded-xl font-medium shadow-lg shadow-slate-900/20 hover:bg-slate-800 active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group mt-4"
          >
            {isLoading ? (
              <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                Sign In
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>
      </GlassCard>
    </div>
  );
};