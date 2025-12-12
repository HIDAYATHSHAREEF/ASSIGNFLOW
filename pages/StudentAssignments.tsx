import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_ASSIGNMENTS, MOCK_SUBMISSIONS } from '../constants';
import { Assignment } from '../types';
import { 
  FileText, 
  Search, 
  Filter, 
  UploadCloud, 
  X, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  MessageSquare
} from 'lucide-react';

export const StudentAssignments: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'open' | 'submitted' | 'late'>('all');
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const filteredAssignments = MOCK_ASSIGNMENTS.filter(a => {
    if (filter === 'all') return true;
    // In a real app, we'd check against MOCK_SUBMISSIONS to see if it's submitted
    if (filter === 'open') return a.status === 'open';
    return true; 
  });

  const getSubmissionForAssignment = (assignmentId: string) => {
    // Hardcoded check for MOCK_SUBMISSIONS linked to current student "st001" (Alex Chen)
    // In real app, check against logged in user ID
    return MOCK_SUBMISSIONS.find(s => s.assignmentId === assignmentId && s.studentId === 'st001');
  };

  const handleOpenSubmit = (assignment: Assignment) => {
    setSelectedAssignment(assignment);
    setUploadProgress(0);
    setIsSubmitting(false);
  };

  const handleUpload = () => {
    setIsSubmitting(true);
    // Simulate upload
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setIsSubmitting(false);
          // In real app, trigger submission success state here
        }, 500);
      }
    }, 200);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-slide-up relative">
      
      {/* Header & Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800">My Assignments</h1>
          <p className="text-slate-500 mt-2 font-light">Track and submit your coursework.</p>
        </div>

        <div className="flex items-center gap-3 bg-white/40 p-1.5 rounded-xl border border-white/30 backdrop-blur-md">
          {['all', 'open', 'submitted', 'late'].map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f as any)}
              className={`
                px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all
                ${filter === f ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}
              `}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => {
          const daysLeft = Math.ceil((new Date(assignment.dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24));
          const isOverdue = daysLeft < 0;
          const submission = getSubmissionForAssignment(assignment.id);

          return (
            <GlassCard key={assignment.id} className="p-6 flex flex-col h-full group" hoverEffect>
              <div className="flex justify-between items-start mb-4">
                 <span className="text-[10px] font-bold uppercase tracking-wider bg-indigo-50 text-indigo-600 px-2 py-1 rounded-md">
                   {assignment.subject}
                 </span>
                 <div className={`flex items-center gap-1.5 text-xs font-bold ${isOverdue ? 'text-red-500' : 'text-slate-500'}`}>
                   <Clock size={14} />
                   {isOverdue ? 'Overdue' : `${daysLeft}d left`}
                 </div>
              </div>

              <h3 className="text-lg font-bold text-slate-800 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">
                {assignment.title}
              </h3>
              
              <p className="text-sm text-slate-500 line-clamp-3 mb-6 flex-1">
                {assignment.description}
              </p>

              <div className="pt-4 border-t border-slate-100 mt-auto flex items-center justify-between">
                <div className="flex flex-col">
                    {submission?.grade ? (
                        <>
                            <span className="text-[10px] uppercase font-bold text-green-600">Graded</span>
                            <span className="text-sm font-bold text-slate-800">{submission.grade}/{assignment.totalPoints}</span>
                        </>
                    ) : (
                        <>
                            <span className="text-[10px] uppercase font-bold text-slate-400">Points</span>
                            <span className="text-sm font-bold text-slate-800">{assignment.totalPoints}</span>
                        </>
                    )}
                </div>
                
                {submission ? (
                    <button 
                      onClick={() => handleOpenSubmit(assignment)}
                      className={`px-4 py-2 rounded-lg text-xs font-medium transition-colors shadow-sm
                        ${submission.status === 'graded' 
                            ? 'bg-green-100 text-green-700 hover:bg-green-200' 
                            : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
                        }
                      `}
                    >
                      {submission.status === 'graded' ? 'View Feedback' : 'View / Resubmit'}
                    </button>
                ) : (
                    <button 
                      onClick={() => handleOpenSubmit(assignment)}
                      className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 active:scale-95"
                    >
                      Upload Work
                    </button>
                )}
              </div>
            </GlassCard>
          );
        })}
      </div>

      {/* Submission/Feedback Modal */}
      {selectedAssignment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm animate-fade-in">
          <GlassCard className="w-full max-w-lg p-0 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
              <h3 className="font-bold text-slate-800">
                  {getSubmissionForAssignment(selectedAssignment.id)?.status === 'graded' ? 'Assignment Feedback' : 'Submit Assignment'}
              </h3>
              <button 
                onClick={() => setSelectedAssignment(null)}
                className="p-1 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-8 space-y-6">
              <div>
                <h4 className="text-lg font-bold text-slate-900">{selectedAssignment.title}</h4>
                <p className="text-sm text-slate-500 mt-1">{selectedAssignment.courseName} • Due {new Date(selectedAssignment.dueDate).toLocaleDateString()}</p>
              </div>

              {/* View Feedback Logic */}
              {getSubmissionForAssignment(selectedAssignment.id)?.status === 'graded' ? (
                  <div className="bg-indigo-50/50 p-6 rounded-xl border border-indigo-100 space-y-4">
                      <div className="flex items-center gap-3 text-indigo-900 font-bold text-lg">
                          <CheckCircle2 className="text-green-500" />
                          Grade: {getSubmissionForAssignment(selectedAssignment.id)?.grade} / {selectedAssignment.totalPoints}
                      </div>
                      <div>
                          <h5 className="text-xs font-bold uppercase text-slate-500 mb-2 flex items-center gap-2">
                              <MessageSquare size={12} /> Teacher Remarks
                          </h5>
                          <p className="text-slate-700 italic">
                              "{getSubmissionForAssignment(selectedAssignment.id)?.remarks || 'No remarks provided.'}"
                          </p>
                      </div>
                      <button 
                        onClick={() => setSelectedAssignment(null)}
                        className="w-full py-3 bg-slate-900 text-white rounded-xl font-medium mt-4 hover:bg-slate-800"
                      >
                        Close
                      </button>
                  </div>
              ) : (
                  <>
                      {/* Upload/Submission Logic */}
                      {uploadProgress === 100 ? (
                        <div className="py-8 flex flex-col items-center justify-center text-center animate-slide-up">
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                            <CheckCircle2 size={32} />
                          </div>
                          <h5 className="text-lg font-bold text-slate-800">Submitted Successfully!</h5>
                          <p className="text-sm text-slate-500 mt-2">Your work has been recorded. Reference ID: #SUB-{Math.floor(Math.random() * 10000)}</p>
                          <button 
                            onClick={() => setSelectedAssignment(null)}
                            className="mt-6 px-6 py-2 bg-slate-900 text-white rounded-xl text-sm font-medium hover:bg-slate-800"
                          >
                            Close
                          </button>
                        </div>
                      ) : (
                        <>
                          <div className="border-2 border-dashed border-slate-300 rounded-2xl p-8 flex flex-col items-center justify-center text-center hover:bg-indigo-50/50 hover:border-indigo-300 transition-all cursor-pointer group">
                            <div className="w-12 h-12 bg-indigo-50 text-indigo-500 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                              <UploadCloud size={24} />
                            </div>
                            <p className="font-medium text-slate-700">Click to upload or drag and drop</p>
                            <p className="text-xs text-slate-400 mt-2">PDF, DOCX, ZIP up to 10MB</p>
                          </div>

                          {uploadProgress > 0 && (
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs font-medium">
                                <span className="text-slate-600">Uploading...</span>
                                <span className="text-indigo-600">{uploadProgress}%</span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-indigo-600 rounded-full transition-all duration-200"
                                  style={{ width: `${uploadProgress}%` }}
                                />
                              </div>
                            </div>
                          )}

                          <div className="flex items-center gap-2 p-3 bg-blue-50 text-blue-700 rounded-lg text-xs">
                            <AlertCircle size={16} />
                            <span>Plagiarism check will be performed automatically.</span>
                          </div>

                          <button 
                            onClick={handleUpload}
                            disabled={isSubmitting || uploadProgress > 0}
                            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-medium shadow-lg shadow-indigo-500/20 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                          >
                            {isSubmitting ? 'Uploading...' : 'Submit Work'}
                          </button>
                        </>
                      )}
                  </>
              )}
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
};
