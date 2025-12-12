import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { ALL_MOCK_STUDENTS } from '../constants';
import { User } from '../types';
import { 
  Search, 
  Filter, 
  Mail, 
  GraduationCap, 
  BookOpen, 
  MoreHorizontal, 
  X,
  MapPin,
  Phone,
  Calendar,
  Award
} from 'lucide-react';

export const Students: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');
  const [selectedStudent, setSelectedStudent] = useState<User | null>(null);

  // Extract unique departments for filter
  const departments = ['All', ...Array.from(new Set(ALL_MOCK_STUDENTS.map(s => s.department || 'General')))];

  const filteredStudents = ALL_MOCK_STUDENTS.filter(student => {
    const matchesSearch = 
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      (student.studentId || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDept = deptFilter === 'All' || student.department === deptFilter;
    
    return matchesSearch && matchesDept;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-slide-up">
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Student Directory</h1>
          <p className="text-slate-500 mt-2 font-light">Manage and view student performance metrics.</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
           {/* Search */}
           <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search name or roll no..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2.5 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-700 w-full sm:w-64 placeholder:text-slate-400 shadow-sm"
            />
          </div>

          {/* Filter */}
          <div className="relative group">
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <Filter size={16} className="text-slate-400" />
            </div>
            <select 
                value={deptFilter}
                onChange={(e) => setDeptFilter(e.target.value)}
                className="pl-10 pr-8 py-2.5 appearance-none rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-700 w-full sm:w-48 shadow-sm cursor-pointer"
            >
                {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                ))}
            </select>
          </div>
        </div>
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredStudents.map((student) => (
          <GlassCard 
            key={student.id} 
            className="p-6 flex flex-col items-center text-center group relative cursor-pointer" 
            hoverEffect
            onClick={() => setSelectedStudent(student)}
          >
            {/* Top Pattern */}
            <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-indigo-50/50 to-transparent rounded-t-2xl z-0" />
            
            <div className="relative z-10 mb-4">
                <div className="w-20 h-20 rounded-full p-1 bg-white shadow-lg shadow-indigo-500/10">
                    <img 
                        src={student.avatarUrl} 
                        alt={student.name} 
                        className="w-full h-full rounded-full object-cover bg-slate-100"
                    />
                </div>
                <div className="absolute bottom-0 right-0 bg-green-500 w-4 h-4 rounded-full border-2 border-white" title="Online"></div>
            </div>

            <h3 className="relative z-10 text-lg font-bold text-slate-800 group-hover:text-indigo-600 transition-colors">
                {student.name}
            </h3>
            <p className="relative z-10 text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
                {student.studentId}
            </p>

            <div className="relative z-10 w-full grid grid-cols-2 gap-2 mb-6">
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">Dept</span>
                    <span className="text-xs font-semibold text-slate-700 truncate">{student.department?.split(' ')[0]}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded-lg border border-slate-100">
                    <span className="block text-[10px] font-bold uppercase text-slate-400">CGPA</span>
                    <span className={`text-xs font-bold ${(student.cgpa || 0) >= 8.5 ? 'text-green-600' : 'text-slate-700'}`}>
                        {student.cgpa}
                    </span>
                </div>
            </div>

            <div className="relative z-10 w-full flex items-center justify-between gap-3 pt-4 border-t border-slate-100">
                <div className="text-xs text-left">
                    <span className="block text-slate-400">Semester</span>
                    <span className="font-bold text-slate-700">{student.semester} - {student.section}</span>
                </div>
                <button className="p-2 rounded-lg hover:bg-indigo-50 text-slate-400 hover:text-indigo-600 transition-colors">
                    <Mail size={18} />
                </button>
            </div>
          </GlassCard>
        ))}
      </div>

      {filteredStudents.length === 0 && (
         <div className="text-center py-20 bg-white/30 rounded-3xl border border-white/40 border-dashed">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
               <Search size={24} />
            </div>
            <h3 className="text-slate-800 font-bold text-lg">No students found</h3>
            <p className="text-slate-500">Try adjusting your search or filter.</p>
         </div>
      )}

      {/* Student Detail Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
           <GlassCard className="w-full max-w-2xl p-0 overflow-hidden shadow-2xl">
              {/* Modal Header */}
              <div className="h-32 bg-gradient-to-r from-indigo-500 to-purple-600 relative">
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="absolute top-4 right-4 p-2 bg-black/10 hover:bg-black/20 text-white rounded-full transition-colors backdrop-blur-md"
                  >
                    <X size={20} />
                  </button>
              </div>

              <div className="px-8 pb-8">
                  {/* Profile Image Overlap */}
                  <div className="flex justify-between items-end -mt-12 mb-6">
                      <div className="w-24 h-24 rounded-2xl p-1.5 bg-white shadow-xl">
                         <img 
                            src={selectedStudent.avatarUrl} 
                            alt={selectedStudent.name} 
                            className="w-full h-full rounded-xl object-cover bg-slate-100"
                        />
                      </div>
                      <div className="flex gap-3">
                          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-sm font-bold hover:bg-indigo-100 transition-colors">
                             <Mail size={16} /> Email
                          </button>
                          <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10">
                             Edit Profile
                          </button>
                      </div>
                  </div>

                  {/* Main Info */}
                  <div className="mb-8">
                      <h2 className="text-2xl font-bold text-slate-900">{selectedStudent.name}</h2>
                      <div className="flex flex-wrap gap-4 mt-2 text-sm text-slate-500">
                          <span className="flex items-center gap-1.5"><GraduationCap size={16} /> {selectedStudent.studentId}</span>
                          <span className="flex items-center gap-1.5"><BookOpen size={16} /> {selectedStudent.department}</span>
                          <span className="flex items-center gap-1.5"><MapPin size={16} /> Campus A, Hostel 4</span>
                      </div>
                  </div>

                  {/* Stats Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="p-1.5 bg-green-100 text-green-600 rounded-lg">
                                <Award size={16} />
                             </div>
                             <span className="text-xs font-bold uppercase text-slate-400">CGPA</span>
                          </div>
                          <div className="text-2xl font-bold text-slate-800">{selectedStudent.cgpa}</div>
                          <div className="text-xs text-slate-500">Top 10% of class</div>
                      </div>
                      
                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="p-1.5 bg-blue-100 text-blue-600 rounded-lg">
                                <Calendar size={16} />
                             </div>
                             <span className="text-xs font-bold uppercase text-slate-400">Attendance</span>
                          </div>
                          <div className="text-2xl font-bold text-slate-800">92%</div>
                          <div className="text-xs text-slate-500">142/154 Days</div>
                      </div>

                      <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                          <div className="flex items-center gap-2 mb-2">
                             <div className="p-1.5 bg-purple-100 text-purple-600 rounded-lg">
                                <BookOpen size={16} />
                             </div>
                             <span className="text-xs font-bold uppercase text-slate-400">Backlogs</span>
                          </div>
                          <div className="text-2xl font-bold text-slate-800">0</div>
                          <div className="text-xs text-slate-500">Clean Record</div>
                      </div>
                  </div>

                  {/* Detailed Info List */}
                  <div className="bg-white/50 rounded-2xl border border-white/60 p-6 space-y-4">
                      <h3 className="font-bold text-slate-800">Contact Information</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                              <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Email Address</span>
                              <span className="font-medium text-slate-700">{selectedStudent.email}</span>
                          </div>
                          <div>
                              <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Phone Number</span>
                              <span className="font-medium text-slate-700">+91 98765 43210</span>
                          </div>
                          <div>
                              <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Guardian Name</span>
                              <span className="font-medium text-slate-700">Mr. Rajesh Kumar</span>
                          </div>
                          <div>
                              <span className="block text-xs font-bold uppercase text-slate-400 mb-1">Section</span>
                              <span className="font-medium text-slate-700">Semester {selectedStudent.semester} - Section {selectedStudent.section}</span>
                          </div>
                      </div>
                  </div>
              </div>
           </GlassCard>
        </div>
      )}
    </div>
  );
};