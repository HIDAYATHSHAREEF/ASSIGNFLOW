import React, { useState, useEffect } from 'react';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './pages/Dashboard';
import { Assignments } from './pages/Assignments';
import { Submissions } from './pages/Submissions';
import { Students } from './pages/Students';
import { Login } from './pages/Login';
import { StudentDashboard } from './pages/StudentDashboard';
import { StudentAssignments } from './pages/StudentAssignments';
import { StudentCourses } from './pages/StudentCourses';
import { DepartmentResources } from './pages/DepartmentResources';
import { CourseDetails } from './pages/CourseDetails';
import { AuthProvider, useAuth } from './context/AuthContext';
import { User } from './types';

// Wrapper component to handle routing logic after Auth
const AppContent: React.FC = () => {
  const { user, loading, signOut } = useAuth();
  const [currentView, setCurrentView] = useState('dashboard');

  // If loading, you might show a spinner here
  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!user) {
    return (
      <main className="relative z-10">
        <Login />
      </main>
    );
  }

  const handleCourseSelect = (courseId: string) => {
    setCurrentView(`course-${courseId}`);
  };

  const renderView = () => {
    // Dynamic Course Route for Student
    if (user.role === 'student' && currentView.startsWith('course-')) {
       const courseId = currentView.split('-')[1];
       return <CourseDetails courseId={courseId} onBack={() => setCurrentView('my-courses')} />;
    }

    // Teacher Routing
    if (user.role === 'teacher' || user.role === 'admin') {
      switch (currentView) {
        case 'dashboard':
          return <Dashboard user={user} />;
        case 'assignments':
          return <Assignments />;
        case 'submissions':
          return <Submissions />;
        case 'students':
          return <Students />;
        default:
          return <Dashboard user={user} />;
      }
    } 
    
    // Student Routing
    else if (user.role === 'student') {
       switch (currentView) {
        case 'dashboard':
          return <StudentDashboard 
            user={user} 
            onCourseSelect={handleCourseSelect} 
            onNavigate={setCurrentView}
          />;
        case 'my-courses':
          return <StudentCourses user={user} onCourseSelect={handleCourseSelect} />;
        case 'my-assignments':
          return <StudentAssignments />;
        case 'resources':
          return <DepartmentResources />;
        case 'support':
          return <div className="p-8 max-w-4xl mx-auto">
              <h1 className="text-3xl font-light text-slate-800 mb-6">Ask Faculty</h1>
              <div className="bg-white/60 p-8 rounded-2xl border border-white/40 shadow-sm">
                  <h3 className="text-lg font-bold text-slate-800 mb-4">Send a Query</h3>
                  <textarea className="w-full h-40 bg-white/50 border border-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-indigo-500/20 outline-none" placeholder="Type your doubt here..."></textarea>
                  <button className="mt-4 px-6 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Send Message</button>
              </div>
          </div>;
        default:
          return <StudentDashboard 
            user={user} 
            onCourseSelect={handleCourseSelect} 
            onNavigate={setCurrentView}
          />;
      }
    }

    return null;
  };

  return (
    <>
      <Sidebar 
        currentUser={user} 
        currentView={currentView}
        onChangeView={setCurrentView}
        onLogout={signOut}
      />
      <main className="relative z-10 pl-72 pt-4 pr-4 pb-4 min-h-screen">
        {renderView()}
      </main>
    </>
  );
}

const App: React.FC = () => {
  return (
    <AuthProvider>
      <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
        {/* Background Gradients (The "Aurora" effect) */}
        <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-float" />
          <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-blue-200/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[40%] bg-purple-200/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
        </div>
        
        <AppContent />
      </div>
    </AuthProvider>
  );
};

export default App;