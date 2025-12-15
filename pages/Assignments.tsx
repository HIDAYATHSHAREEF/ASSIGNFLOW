import React, { useState, useEffect } from 'react';
import { GlassCard } from '../components/GlassCard.tsx';
import { Assignment } from '../types.ts';
import { MOCK_ASSIGNMENTS } from '../constants.ts'; 
import { supabase } from '../lib/supabase.ts';
import { useAuth } from '../context/AuthContext.tsx';
import { Plus, MoreVertical, Calendar, FileText, Users, Trash2, X, Loader2 } from 'lucide-react';

export const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    title: '',
    courseCode: '',
    dueDate: '',
    points: 100
  });

  // Fetch Assignments from Supabase
  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('assignments')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.warn("Supabase fetch failed (likely no table), using mocks", error);
        setAssignments(MOCK_ASSIGNMENTS);
      } else if (data) {
        const mappedData: Assignment[] = data.map((d: any) => ({
           id: d.id,
           title: d.title,
           courseCode: d.course_code || d.courseCode,
           courseName: d.course_name || d.courseName || 'Course',
           subject: d.subject || 'General',
           dueDate: d.due_date || d.dueDate,
           totalPoints: d.total_points || d.totalPoints,
           status: d.status,
           description: d.description,
           submissionCount: d.submission_count || 0,
           totalStudents: d.total_students || 60
        }));
        setAssignments(mappedData);
      }
    } catch (e) {
      setAssignments(MOCK_ASSIGNMENTS);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(a => a.id !== id));
      
      const { error } = await supabase.from('assignments').delete().eq('id', id);
      if (error) {
         console.error('Error deleting', error);
         fetchAssignments(); // Revert on error
      }
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      title: newAssignment.title,
      course_code: newAssignment.courseCode,
      course_name: 'Advanced Course', // Placeholder logic
      subject: 'General',
      due_date: newAssignment.dueDate,
      total_points: newAssignment.points,
      status: 'open',
      description: 'New assignment created by teacher.',
      teacher_id: user?.id
    };

    const { data, error } = await supabase
        .from('assignments')
        .insert([payload])
        .select();

    if (error) {
        console.error("Error creating assignment", error);
        // Fallback for demo
        const mockNew: Assignment = {
            id: `new-${Date.now()}`,
            title: newAssignment.title,
            courseCode: newAssignment.courseCode,
            courseName: 'Advanced Course',
            subject: 'General',
            dueDate: newAssignment.dueDate,
            totalPoints: newAssignment.points,
            status: 'open',
            description: 'New assignment created by teacher.',
            submissionCount: 0,
            totalStudents: 60
        };
        setAssignments([mockNew, ...assignments]);
    } else if (data) {
        fetchAssignments();
    }

    setShowCreateModal(false);
    setIsSubmitting(false);
    setNewAssignment({ title: '', courseCode: '', dueDate: '', points: 100 });
  };

  if (loading) {
     return <div className="p-8 flex justify-center"><Loader2 className="animate-spin text-indigo-600" /></div>;
  }

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
              <div className={`
                w-12 h-12 rounded-2xl flex items-center justify-center shrink-0
                ${assignment.status === 'open' 
                  ? 'bg-blue-50 text-blue-600 ring-4 ring-blue-50/50' 
                  : 'bg-slate-100 text-slate-500'
                }
              `}>
                <FileText size={20} />
              </div>

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
                        <span className="text-slate-900 font-bold">{Math.round(((assignment.submissionCount || 0) / (assignment.totalStudents || 1)) * 100)}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-indigo-500 rounded-full transition-all duration-1000"
                          style={{ width: `${((assignment.submissionCount || 0) / (assignment.totalStudents || 1)) * 100}%` }}
                        />
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1">
                        {assignment.submissionCount || 0} / {assignment.totalStudents || 0} Submitted
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
                  <button 
                    disabled={isSubmitting}
                    className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold mt-4 flex items-center justify-center"
                  >
                    {isSubmitting ? <Loader2 className="animate-spin" /> : 'Create Assignment'}
                  </button>
              </form>
           </GlassCard>
        </div>
      )}
    </div>
  );
};