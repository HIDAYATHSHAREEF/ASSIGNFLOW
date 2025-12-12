import React from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_COURSES } from '../constants';
import { User } from '../types';
import { Users, Clock, BookOpen, MoreHorizontal, ArrowRight } from 'lucide-react';

interface StudentCoursesProps {
  user: User;
  onCourseSelect?: (courseId: string) => void;
}

export const StudentCourses: React.FC<StudentCoursesProps> = ({ user, onCourseSelect }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-slide-up">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-slate-800">My Courses</h1>
          <p className="text-slate-500 mt-2 font-light">Enrolled in <span className="font-semibold text-slate-700">Semester {user.semester}</span></p>
        </div>
        <div className="text-sm font-medium text-slate-500 bg-white/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/30">
          Total Credits: <span className="text-indigo-600 font-bold">24</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-6">
        {MOCK_COURSES.map((course) => (
          <GlassCard 
            key={course.id} 
            className="p-0 overflow-hidden group cursor-pointer" 
            hoverEffect
            onClick={() => onCourseSelect && onCourseSelect(course.id)}
          >
            {/* Banner */}
            <div className={`h-24 bg-gradient-to-r ${course.color} relative p-6`}>
              <div className="absolute top-4 right-4">
                 <button className="p-1.5 bg-white/20 hover:bg-white/40 text-white rounded-lg transition-colors">
                    <MoreHorizontal size={20} />
                 </button>
              </div>
              <div className="absolute -bottom-8 left-6 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center text-2xl font-bold text-slate-800 border-4 border-white/50">
                {course.code.substring(0, 2)}
              </div>
            </div>

            {/* Content */}
            <div className="pt-10 px-6 pb-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                   <h2 className="text-xl font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                     {course.name}
                   </h2>
                   <p className="text-sm text-slate-500 font-medium">{course.code}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
                 <span className="w-6 h-6 rounded-full bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                    {course.instructor.charAt(0)}
                 </span>
                 <span>{course.instructor}</span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                       <Clock size={12} /> Schedule
                    </div>
                    <div className="text-xs font-semibold text-slate-700 truncate">
                       {course.schedule}
                    </div>
                 </div>
                 <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                    <div className="flex items-center gap-2 text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">
                       <BookOpen size={12} /> Credits
                    </div>
                    <div className="text-xs font-semibold text-slate-700">
                       {course.credits} Credits
                    </div>
                 </div>
              </div>

              {/* Attendance Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                   <span className="text-slate-500">Attendance</span>
                   <span className={`${course.attendance < 75 ? 'text-red-500' : 'text-green-600'}`}>
                     {course.attendance}% ({course.attendedClasses}/{course.totalClasses})
                   </span>
                </div>
                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                   <div 
                     className={`h-full rounded-full transition-all duration-1000 ${course.attendance < 75 ? 'bg-red-500' : 'bg-green-500'}`}
                     style={{ width: `${course.attendance}%` }}
                   />
                </div>
                {course.attendance < 75 && (
                   <p className="text-[10px] text-red-500 mt-1 font-medium">Warning: Low attendance.</p>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                 <button className="flex items-center gap-2 text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors">
                    View Materials <ArrowRight size={16} />
                 </button>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
};