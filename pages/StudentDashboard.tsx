import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { User } from '../types';
import { MOCK_ASSIGNMENTS, MOCK_COURSES } from '../constants';
import { 
  Clock, 
  Search,
  Bell,
  MoreHorizontal,
  ArrowRight,
  BookOpen,
  TrendingUp,
  Video,
  GraduationCap,
  FileText
} from 'lucide-react';

interface StudentDashboardProps {
  user: User;
  onCourseSelect?: (courseId: string) => void;
  onNavigate?: (view: string) => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({ user, onCourseSelect, onNavigate }) => {
  const pendingAssignments = MOCK_ASSIGNMENTS.filter(a => a.status === 'open');
  
  // Format current date
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });

  // Mock schedule based on courses
  const todaysSchedule = MOCK_COURSES.slice(0, 3).map((course, index) => ({
    ...course,
    time: ['09:00 AM', '11:30 AM', '02:00 PM'][index],
    duration: '1h 30m',
    type: index === 0 ? 'Lecture' : index === 1 ? 'Lab' : 'Tutorial'
  }));

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in text-slate-800">
      
      {/* Top Header Section */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Hello, {user.name.split(' ')[0]}! 👋</h1>
          <p className="text-slate-500 mt-1 font-medium">{dateStr}</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search courses..." 
              className="pl-10 pr-4 py-3 bg-white/60 border border-white/40 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 w-64 shadow-sm"
            />
          </div>
          <button className="p-3 bg-white/60 border border-white/40 rounded-2xl shadow-sm hover:bg-white transition-colors relative">
            <Bell size={20} className="text-slate-600" />
            <span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        
        {/* Main Content Area */}
        <div className="xl:col-span-8 space-y-8">
          
          {/* Hero/Banner Card */}
          <GlassCard className="p-8 relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 text-white border-0">
             <div className="relative z-10">
               <div className="flex justify-between items-start">
                  <div className="max-w-md">
                    <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-xs font-bold mb-3 border border-white/10">
                      {pendingAssignments.length} Assignments Pending
                    </span>
                    <h2 className="text-2xl font-bold mb-2">You're doing great! 🚀</h2>
                    <p className="text-indigo-100 mb-6 text-sm leading-relaxed">
                      You've completed 80% of your weekly goals. Keep up the momentum to reach the top of the leaderboard.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <button 
                        onClick={() => onNavigate?.('my-courses')}
                        className="px-5 py-2.5 bg-white text-indigo-600 rounded-xl font-bold text-sm hover:bg-indigo-50 transition-all active:scale-95 w-full sm:w-auto text-center"
                      >
                        View Schedule
                      </button>
                      <button 
                        onClick={() => onNavigate?.('my-assignments')}
                        className="px-5 py-2.5 bg-indigo-700/50 text-white rounded-xl font-bold text-sm hover:bg-indigo-700/70 transition-all backdrop-blur-md active:scale-95 w-full sm:w-auto text-center"
                      >
                        Check Grades
                      </button>
                    </div>
                  </div>
                  {/* Decorative circle */}
                  <div className="hidden md:flex items-center justify-center w-32 h-32 rounded-full border-4 border-white/20 relative">
                     <div className="text-center">
                        <div className="text-3xl font-bold">87%</div>
                        <div className="text-[10px] uppercase font-bold text-indigo-200">Attendance</div>
                     </div>
                  </div>
               </div>
             </div>
             {/* Abstract Shapes Background */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
             <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
          </GlassCard>

          {/* Stats Overview: Courses, Assignments, CGPA */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Courses Card */}
            <GlassCard className="p-5 flex flex-col justify-between relative overflow-hidden" hoverEffect>
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-2.5 bg-blue-50 text-blue-600 rounded-xl">
                   <BookOpen size={20} />
                 </div>
                 <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-lg">Sem {user.semester}</span>
               </div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold text-slate-800">{MOCK_COURSES.length}</h3>
                 <p className="text-sm text-slate-500 font-medium">Active Courses</p>
               </div>
            </GlassCard>

            {/* Assignments Card */}
            <GlassCard className="p-5 flex flex-col justify-between relative overflow-hidden" hoverEffect>
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-2.5 bg-yellow-50 text-yellow-600 rounded-xl">
                   <FileText size={20} />
                 </div>
               </div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold text-slate-800">{pendingAssignments.length}</h3>
                 <p className="text-sm text-slate-500 font-medium">Pending Assignments</p>
               </div>
            </GlassCard>

             {/* CGPA Card */}
             <GlassCard className="p-5 flex flex-col justify-between relative overflow-hidden" hoverEffect>
               <div className="flex justify-between items-start mb-4 relative z-10">
                 <div className="p-2.5 bg-purple-50 text-purple-600 rounded-xl">
                   <GraduationCap size={20} />
                 </div>
                 <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-lg flex items-center gap-1">
                    Top 5% <TrendingUp size={12} />
                 </span>
               </div>
               <div className="relative z-10">
                 <h3 className="text-3xl font-bold text-slate-800">{user.cgpa || 'N/A'}</h3>
                 <p className="text-sm text-slate-500 font-medium">Cumulative GPA</p>
               </div>
               {/* Decorative background for CGPA */}
               <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-purple-50 rounded-full z-0 blur-xl opacity-50" />
            </GlassCard>
          </div>

          {/* Current Courses Grid */}
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-slate-800">My Courses</h2>
              <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1">
                View All <ArrowRight size={16} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {MOCK_COURSES.map((course) => (
                 <GlassCard 
                    key={course.id} 
                    className="p-6 group cursor-pointer" 
                    hoverEffect 
                    onClick={() => onCourseSelect && onCourseSelect(course.id)}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${course.color} flex items-center justify-center text-white font-bold shadow-lg shadow-indigo-500/20`}>
                        {course.code.substring(0,2)}
                      </div>
                      <button className="text-slate-400 hover:text-slate-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </div>
                    
                    <h3 className="text-lg font-bold text-slate-800 mb-1 truncate group-hover:text-indigo-600 transition-colors">{course.name}</h3>
                    <p className="text-sm text-slate-500 mb-4">{course.totalClasses} Lessons • {course.credits} Credits</p>
                    
                    {/* Progress */}
                    <div className="space-y-2">
                       <div className="flex justify-between text-xs font-bold text-slate-600">
                         <span>Progress</span>
                         <span>{Math.round((course.attendedClasses / course.totalClasses) * 100)}%</span>
                       </div>
                       <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full bg-gradient-to-r ${course.color}`} 
                            style={{width: `${(course.attendedClasses / course.totalClasses) * 100}%`}}
                          />
                       </div>
                    </div>

                    <div className="mt-6 flex -space-x-2">
                      {[1,2,3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200" />
                      ))}
                      <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                        +24
                      </div>
                    </div>
                 </GlassCard>
               ))}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Schedule & Calendar */}
        <div className="xl:col-span-4 space-y-8">
          
          {/* Calendar Widget */}
          <GlassCard className="p-6">
             <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">September 2023</h3>
                <div className="flex gap-2">
                   <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ArrowRight size={16} className="rotate-180" /></button>
                   <button className="p-1 hover:bg-slate-100 rounded-lg text-slate-400"><ArrowRight size={16} /></button>
                </div>
             </div>
             {/* Simple Calendar Grid Mockup */}
             <div className="grid grid-cols-7 gap-2 text-center text-sm mb-2">
               {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                 <div key={d} className="text-slate-400 text-xs font-bold uppercase">{d}</div>
               ))}
             </div>
             <div className="grid grid-cols-7 gap-2 text-center text-sm">
               {Array.from({length: 30}, (_, i) => i + 1).map(day => (
                  <div 
                    key={day} 
                    className={`
                      aspect-square flex items-center justify-center rounded-xl cursor-pointer transition-colors
                      ${day === 14 ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30' : 'hover:bg-slate-100 text-slate-700'}
                      ${day === 12 || day === 18 ? 'relative after:absolute after:bottom-1 after:w-1 after:h-1 after:bg-red-400 after:rounded-full' : ''}
                    `}
                  >
                    {day}
                  </div>
               ))}
             </div>
          </GlassCard>

          {/* Today's Schedule */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Today's Schedule</h3>
                <button className="text-indigo-600 text-xs font-bold">See All</button>
             </div>
             
             <div className="space-y-3">
               {todaysSchedule.map((item, idx) => (
                 <GlassCard key={idx} className="p-4 flex gap-4 items-center group" hoverEffect>
                    <div className="w-12 flex flex-col items-center justify-center text-slate-500">
                       <span className="text-xs font-bold">{item.time.split(' ')[0]}</span>
                       <span className="text-[10px] uppercase">{item.time.split(' ')[1]}</span>
                    </div>
                    
                    <div className="w-1 h-10 bg-slate-200 rounded-full group-hover:bg-indigo-500 transition-colors" />
                    
                    <div className="flex-1 min-w-0">
                       <h4 className="font-bold text-slate-800 truncate">{item.name}</h4>
                       <p className="text-xs text-slate-500 flex items-center gap-1.5">
                         <span className={`w-2 h-2 rounded-full bg-gradient-to-r ${item.color}`} />
                         {item.type} • Room 304
                       </p>
                    </div>

                    <button className="p-2 bg-indigo-50 text-indigo-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity">
                       <Video size={16} />
                    </button>
                 </GlassCard>
               ))}
             </div>
          </div>

          {/* Upcoming Assignments Mini List */}
          <div className="space-y-4">
             <div className="flex justify-between items-center">
                <h3 className="font-bold text-slate-800 text-lg">Assignments</h3>
                <span className="bg-red-50 text-red-600 px-2 py-0.5 rounded-md text-xs font-bold">{pendingAssignments.length} New</span>
             </div>

             {pendingAssignments.slice(0, 3).map((assignment) => (
               <div key={assignment.id} className="flex items-start gap-3 p-3 rounded-2xl hover:bg-white/40 transition-colors cursor-pointer border border-transparent hover:border-white/40">
                  <div className={`mt-1 p-2 rounded-xl bg-indigo-50 text-indigo-600`}>
                    <BookOpen size={16} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{assignment.title}</h4>
                    <p className="text-xs text-slate-500 mt-0.5">{assignment.courseCode}</p>
                    <div className="flex items-center gap-2 mt-2">
                       <span className="text-[10px] bg-white px-2 py-0.5 rounded-md text-slate-500 border border-slate-100 font-medium">
                         {new Date(assignment.dueDate).toLocaleDateString(undefined, {month:'short', day:'numeric'})}
                       </span>
                    </div>
                  </div>
                  <div className="h-5 w-5 rounded-full border-2 border-slate-200 flex items-center justify-center"></div>
               </div>
             ))}
          </div>

        </div>
      </div>
    </div>
  );
};