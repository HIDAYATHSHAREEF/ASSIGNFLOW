import React, { useState } from 'react';
import { MOCK_COURSES, MOCK_ASSIGNMENTS, MOCK_RESOURCES, MOCK_SUBMISSIONS } from '../constants';
import { GlassCard } from '../components/GlassCard';
import { 
  ArrowLeft, 
  Clock, 
  MapPin, 
  Users, 
  BookOpen, 
  FileText, 
  Download, 
  CheckCircle2, 
  AlertCircle,
  Video,
  Link as LinkIcon,
  File
} from 'lucide-react';

interface CourseDetailsProps {
  courseId: string;
  onBack: () => void;
}

export const CourseDetails: React.FC<CourseDetailsProps> = ({ courseId, onBack }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'assignments' | 'resources'>('overview');
  
  const course = MOCK_COURSES.find(c => c.id === courseId);
  
  if (!course) return <div>Course not found</div>;

  const courseAssignments = MOCK_ASSIGNMENTS.filter(a => a.courseCode === course.code);
  const courseResources = MOCK_RESOURCES.filter(r => r.courseCode === course.code);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-green-600 bg-green-50 border-green-100';
      case 'late': return 'text-red-600 bg-red-50 border-red-100';
      case 'pending': return 'text-yellow-600 bg-yellow-50 border-yellow-100';
      default: return 'text-slate-500 bg-slate-50 border-slate-100';
    }
  };

  const getIconForResourceType = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={20} />;
      case 'video': return <Video className="text-purple-500" size={20} />;
      case 'link': return <LinkIcon className="text-blue-500" size={20} />;
      default: return <File className="text-indigo-500" size={20} />;
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-slide-up">
      {/* Header / Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-white shadow-xl shadow-slate-200/50">
        <div className={`absolute inset-0 bg-gradient-to-r ${course.color} opacity-10`} />
        
        <div className="relative p-8 md:p-10 z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-indigo-600 transition-colors mb-6"
          >
            <ArrowLeft size={18} /> Back to Dashboard
          </button>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="px-3 py-1 rounded-lg bg-white/60 border border-white/40 text-xs font-bold uppercase tracking-wider text-slate-600 backdrop-blur-md">
                  {course.code}
                </span>
                <span className="px-3 py-1 rounded-lg bg-green-50 text-green-700 text-xs font-bold border border-green-100 flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  Active
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">{course.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-slate-500 text-sm font-medium">
                <span className="flex items-center gap-1.5"><Users size={16} /> {course.instructor}</span>
                <span className="flex items-center gap-1.5"><Clock size={16} /> {course.schedule}</span>
                <span className="flex items-center gap-1.5"><MapPin size={16} /> Room 304, Science Block</span>
              </div>
            </div>

            {/* Attendance Ring */}
            <div className="flex items-center gap-4 bg-white/60 p-4 rounded-2xl border border-white/50 backdrop-blur-sm">
               <div className="relative w-16 h-16 flex items-center justify-center">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-slate-200" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className={`${course.attendance < 75 ? 'text-red-500' : 'text-green-500'}`} strokeDasharray={`${course.attendance}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                  </svg>
                  <span className="absolute text-xs font-bold text-slate-700">{course.attendance}%</span>
               </div>
               <div>
                  <p className="text-xs font-bold uppercase text-slate-400">Attendance</p>
                  <p className="text-sm font-semibold text-slate-700">{course.attendedClasses}/{course.totalClasses} Classes</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-1 bg-white/40 p-1.5 rounded-xl border border-white/30 backdrop-blur-md w-fit">
        {['overview', 'assignments', 'resources'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`
              px-6 py-2.5 rounded-lg text-sm font-bold capitalize transition-all
              ${activeTab === tab 
                ? 'bg-white text-indigo-600 shadow-sm' 
                : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'}
            `}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {activeTab === 'overview' && (
             <div className="space-y-6 animate-fade-in">
                <GlassCard className="p-6">
                   <h3 className="text-lg font-bold text-slate-800 mb-4">About this Course</h3>
                   <p className="text-slate-600 leading-relaxed text-sm">
                     This course provides an in-depth exploration of {course.name}. Students will learn key concepts through a mix of lectures, 
                     practical lab sessions, and project-based learning. Emphasis is placed on real-world application and critical thinking.
                   </p>
                   <div className="mt-6 grid grid-cols-3 gap-4">
                      <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                         <div className="text-2xl font-bold text-slate-800">{course.credits}</div>
                         <div className="text-xs text-slate-500 font-bold uppercase">Credits</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                         <div className="text-2xl font-bold text-slate-800">{courseAssignments.length}</div>
                         <div className="text-xs text-slate-500 font-bold uppercase">Assignments</div>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-xl text-center border border-slate-100">
                         <div className="text-2xl font-bold text-slate-800">{courseResources.length}</div>
                         <div className="text-xs text-slate-500 font-bold uppercase">Resources</div>
                      </div>
                   </div>
                </GlassCard>
                
                <h3 className="text-lg font-bold text-slate-800">Recent Activity</h3>
                <div className="space-y-4">
                  {courseAssignments.slice(0, 2).map(assignment => (
                    <GlassCard key={assignment.id} className="p-4 flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
                         <FileText size={18} />
                       </div>
                       <div className="flex-1">
                         <h4 className="font-bold text-slate-800 text-sm">New Assignment Posted</h4>
                         <p className="text-xs text-slate-500">{assignment.title}</p>
                       </div>
                       <span className="text-xs font-bold text-slate-400">2 days ago</span>
                    </GlassCard>
                  ))}
                  {courseResources.slice(0, 1).map(resource => (
                    <GlassCard key={resource.id} className="p-4 flex gap-4 items-center">
                       <div className="w-10 h-10 rounded-full bg-purple-50 text-purple-600 flex items-center justify-center">
                         <UploadCloudIcon />
                       </div>
                       <div className="flex-1">
                         <h4 className="font-bold text-slate-800 text-sm">Material Uploaded</h4>
                         <p className="text-xs text-slate-500">{resource.title}</p>
                       </div>
                       <span className="text-xs font-bold text-slate-400">5 days ago</span>
                    </GlassCard>
                  ))}
                </div>
             </div>
          )}

          {activeTab === 'assignments' && (
            <div className="space-y-4 animate-fade-in">
              {courseAssignments.length > 0 ? (
                courseAssignments.map(assignment => {
                  const submission = MOCK_SUBMISSIONS.find(s => s.assignmentId === assignment.id && s.studentId === 'st001'); // Mock student ID
                  const status = submission ? submission.status : (assignment.status === 'closed' ? 'missed' : 'pending');
                  
                  return (
                    <GlassCard key={assignment.id} className="p-0 overflow-hidden" hoverEffect>
                       <div className="p-6 flex flex-col md:flex-row gap-6">
                          <div className="flex-1">
                             <div className="flex justify-between items-start mb-2">
                                <h3 className="font-bold text-slate-800 text-lg">{assignment.title}</h3>
                                <span className={`px-2.5 py-1 rounded-full text-xs font-bold capitalize border ${getStatusColor(status)}`}>
                                  {status}
                                </span>
                             </div>
                             <p className="text-slate-500 text-sm mb-4">{assignment.description}</p>
                             <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                <span className="flex items-center gap-1"><Clock size={14} /> Due: {new Date(assignment.dueDate).toLocaleDateString()}</span>
                                <span>•</span>
                                <span>{assignment.totalPoints} Points</span>
                             </div>
                          </div>
                          <div className="flex flex-col justify-center gap-2 min-w-[140px]">
                             {submission?.grade ? (
                               <div className="text-center p-3 bg-green-50 rounded-xl border border-green-100">
                                  <div className="text-2xl font-bold text-green-700">{submission.grade}</div>
                                  <div className="text-[10px] uppercase font-bold text-green-600">Score</div>
                               </div>
                             ) : (
                               <button className="w-full py-3 bg-slate-900 text-white text-sm font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                                  {status === 'pending' ? 'Submit' : 'View Details'}
                                </button>
                             )}
                          </div>
                       </div>
                    </GlassCard>
                  );
                })
              ) : (
                <div className="text-center py-12 text-slate-400">No assignments found for this course.</div>
              )}
            </div>
          )}

          {activeTab === 'resources' && (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in">
                {courseResources.length > 0 ? (
                  courseResources.map(resource => (
                    <GlassCard key={resource.id} className="p-4 flex items-start gap-4 group cursor-pointer" hoverEffect>
                       <div className="w-10 h-10 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 group-hover:bg-indigo-50 transition-colors">
                          {getIconForResourceType(resource.type)}
                       </div>
                       <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-slate-800 text-sm truncate group-hover:text-indigo-600 transition-colors">{resource.title}</h4>
                          <p className="text-xs text-slate-500 mt-1">{resource.size} • {new Date(resource.date).toLocaleDateString()}</p>
                       </div>
                       <button className="text-slate-300 hover:text-indigo-600 transition-colors">
                          <Download size={18} />
                       </button>
                    </GlassCard>
                  ))
                ) : (
                  <div className="col-span-full text-center py-12 text-slate-400">No resources found.</div>
                )}
             </div>
          )}

        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
           {/* Instructor Card */}
           <GlassCard className="p-6">
              <h3 className="text-sm font-bold uppercase text-slate-400 mb-4 tracking-wider">Instructor</h3>
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-lg">
                    {course.instructor.charAt(0)}
                 </div>
                 <div>
                    <h4 className="font-bold text-slate-800">{course.instructor}</h4>
                    <p className="text-xs text-slate-500">Department Head</p>
                 </div>
              </div>
              <button className="w-full py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                 Send Message
              </button>
           </GlassCard>

           {/* Quick Actions */}
           <div className="space-y-2">
              <button className="w-full p-4 bg-indigo-600 text-white rounded-2xl font-bold flex items-center justify-between shadow-lg shadow-indigo-500/30 hover:bg-indigo-700 transition-colors group">
                 <span>Course Syllabus</span>
                 <Download size={20} className="group-hover:translate-y-1 transition-transform" />
              </button>
              <button className="w-full p-4 bg-white/60 border border-white/40 rounded-2xl font-bold text-slate-700 flex items-center justify-between hover:bg-white transition-colors">
                 <span>Join Virtual Room</span>
                 <Video size={20} className="text-indigo-600" />
              </button>
           </div>
        </div>

      </div>
    </div>
  );
};

// Helper for icon
const UploadCloudIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);