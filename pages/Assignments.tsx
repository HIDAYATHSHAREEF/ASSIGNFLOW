import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { Assignment } from '../types';
import { MOCK_ASSIGNMENTS } from '../constants';
import { Plus, MoreVertical, Calendar, FileText, Users, Trash2, X } from 'lucide-react';

export const Assignments: React.FC = () => {
  const [assignments, setAssignments] = useState<Assignment[]>(MOCK_ASSIGNMENTS);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseCode: '',
    dueDate: '',
    points: 100
  });

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const assignment: Assignment = {
      id: `new-${Date.now()}`,
      title: newAssignment.title,
      courseCode: newAssignment.courseCode,
      courseName: 'New Course', // Simplification
      subject: 'General',
      dueDate: newAssignment.dueDate,
      totalPoints: newAssignment.points,
      status: 'open',
      description: 'New assignment created by teacher.',
      submissionCount: 0,
      totalStudents: 60
    };
    setAssignments([assignment, ...assignments]);
    setShowCreateModal(false);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Assignments</h1>
          <p className="text-slate-500 mt-2 font-light">Manage coursework and track deadlines.</p>
        </div>
        <button 
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/20 active:scale-95 duration-200"
        >
          <Plus size={18} />
          <span className="font-medium text-sm">Create New</span>
        </button>
      </div>

      <div className="grid gap-4">
        {assignments.map((assignment) => (
          <GlassCard key={assignment.id} className="p-0 group" hoverEffect>
            <div className="flex flex-col md:flex-row items-center p-6 gap-6">
              {/* Icon Status */}
              <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                ${assignment.status === 'open' 
                  ? 'bg-blue-50 text-blue-600 ring-4 ring-blue-50/50' 
                  : 'bg-slate-100 text-slate-500'
                }
              `}>
                <FileText size={20} />
              </div>

              {/* Main Info */}
              <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-12 gap-6 items-center w-full">
                <div className="md:col-span-5">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400 bg-slate-50 px-2 py-1 rounded-md border border-slate-100">
                      {assignment.courseCode}
                    </span>
                    {assignment.status === 'open' ? (
                      <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-green-600 bg-green-50 px-2 py-1 rounded-full border border-green-100">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
                        Closed
                      </span>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900 truncate">{assignment.title}</h3>
                  <p className="text-sm text-slate-500 truncate">{assignment.courseName}</p>
                </div>

                {/* Metrics */}
                <div className="md:col-span-3 flex items-center gap-6">
                  <div className="flex items-center gap-2 text-slate-500">
                    <Calendar size={16} />
                    <div className="flex flex-col">
                      <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400">Due Date</span>
                      <span className="text-sm font-medium text-slate-700">
                        {new Date(assignment.dueDate).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-4 flex items-center gap-4 justify-between w-full">
                  <div className="flex items-center gap-3">
                    <Users size={16} className="text-slate-400" />
                    <div className="flex flex-col w-32">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-slate-500 font-medium">Progress</span>
                        <span className="text-slate-900 font-bold">{Math.round((assignment.submissionCount! / assignment.totalStudents!) * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${(assignment.submissionCount! / assignment.totalStudents!) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">
                        {assignment.submissionCount} / {assignment.totalStudents} Submitted
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                        onClick={() => handleDelete(assignment.id)}
                        className="p-2 hover:bg-red-50 rounded-lg text-slate-400 hover:text-red-600 transition-colors"
                        title="Delete Assignment"
                    >
                        <Trash2 size={18} />
                    </button>
                    <button className="p-2 hover:bg-slate-100 rounded-lg text-slate-400 hover:text-slate-600 transition-colors">
                        <MoreVertical size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
           <GlassCard className="w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold text-slate-800">Create New Assignment</h3>
                <button onClick={() => setShowCreateModal(false)}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
              </div>
              <form onSubmit={handleCreate} className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Title</label>
                      <input 
                        required
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50" 
                        value={newAssignment.title}
                        onChange={e => setNewAssignment({...newAssignment, title: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Course Code</label>
                      <input 
                        required
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50" 
                        value={newAssignment.courseCode}
                        onChange={e => setNewAssignment({...newAssignment, courseCode: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Due Date</label>
                      <input 
                        type="date"
                        required
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50" 
                        value={newAssignment.dueDate}
                        onChange={e => setNewAssignment({...newAssignment, dueDate: e.target.value})}
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Points</label>
                      <input 
                        type="number"
                        required
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50" 
                        value={newAssignment.points}
                        onChange={e => setNewAssignment({...newAssignment, points: Number(e.target.value)})}
                      />
                  </div>
                  <button className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold mt-4">Create Assignment</button>
              </form>
           </GlassCard>
        </div>
      )}
    </div>
  );
};
