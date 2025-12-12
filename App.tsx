import React, { useState } from 'react';
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
import { User } from './types';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentView, setCurrentView] = useState('dashboard');

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  const handleCourseSelect = (courseId: string) => {
    setCurrentView(`course-${courseId}`);
  };

  const renderView = () => {
    if (!currentUser) return null;
    
    // Dynamic Course Route for Student
    if (currentUser.role === 'student' && currentView.startsWith('course-')) {
       const courseId = currentView.split('-')[1];
       return <CourseDetails courseId={courseId} onBack={() => setCurrentView('my-courses')} />;
    }

    // Teacher Routing
    if (currentUser.role === 'teacher') {
      switch (currentView) {
        case 'dashboard':
          return <Dashboard user={currentUser} />;
        case 'assignments':
          return <Assignments />;
        case 'submissions':
          return <Submissions />;
        case 'students':
          return <Students />;
        default:
          return <Dashboard user={currentUser} />;
      }
    } 
    
    // Student Routing
    else if (currentUser.role === 'student') {
       switch (currentView) {
        case 'dashboard':
          return <StudentDashboard 
            user={currentUser} 
            onCourseSelect={handleCourseSelect} 
            onNavigate={setCurrentView}
          />;
        case 'my-courses':
          return <StudentCourses user={currentUser} onCourseSelect={handleCourseSelect} />;
        case 'my-assignments':
          return <StudentAssignments />;
        case 'resources':
          return <DepartmentResources />;
        case 'support':
           // Implementing Ask Doubt feature here inline for simplicity or separate component
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
            user={currentUser} 
            onCourseSelect={handleCourseSelect} 
            onNavigate={setCurrentView}
          />;
      }
    }

    return null;
  };

  return (
    <div className="relative min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-indigo-100 selection:text-indigo-900">
      
      {/* Background Gradients (The "Aurora" effect) - Persists across Login and App */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-200/30 rounded-full blur-[120px] animate-float" />
        <div className="absolute top-[20%] right-[-5%] w-[30%] h-[50%] bg-blue-200/30 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-[-10%] left-[20%] w-[35%] h-[40%] bg-purple-200/20 rounded-full blur-[120px] animate-float" style={{ animationDelay: '4s' }} />
      </div>

      {!currentUser ? (
        <main className="relative z-10">
          <Login onLogin={handleLogin} />
        </main>
      ) : (
        <>
          <Sidebar 
            currentUser={currentUser} 
            currentView={currentView}
            onChangeView={setCurrentView}
            onLogout={handleLogout}
          />

          <main className="relative z-10 pl-72 pt-4 pr-4 pb-4 min-h-screen">
            {renderView()}
          </main>
        </>
      )}

    </div>
  );
};

export default App;