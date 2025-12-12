import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_SUBMISSIONS } from '../constants';
import { Submission } from '../types';
import { Search, Filter, Download, AlertTriangle, CheckCircle2, Clock, X, MessageSquare } from 'lucide-react';

export const Submissions: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [gradingSubmission, setGradingSubmission] = useState<Submission | null>(null);
  const [gradeInput, setGradeInput] = useState<number | ''>('');
  const [remarksInput, setRemarksInput] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'submitted': return 'text-blue-600 bg-blue-50 border-blue-100';
      case 'graded': return 'text-green-600 bg-green-50 border-green-100';
      case 'late': return 'text-red-600 bg-red-50 border-red-100';
      default: return 'text-yellow-600 bg-yellow-50 border-yellow-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'submitted': return <CheckCircle2 size={14} />;
      case 'graded': return <CheckCircle2 size={14} />;
      case 'late': return <AlertTriangle size={14} />;
      default: return <Clock size={14} />;
    }
  };

  const handleOpenGrading = (sub: Submission) => {
    setGradingSubmission(sub);
    setGradeInput(sub.grade || '');
    setRemarksInput(sub.remarks || '');
  };

  const handleSaveGrade = () => {
    if (!gradingSubmission) return;
    
    setSubmissions(prev => prev.map(s => {
        if (s.id === gradingSubmission.id) {
            return {
                ...s,
                grade: Number(gradeInput),
                remarks: remarksInput,
                status: 'graded'
            };
        }
        return s;
    }));
    setGradingSubmission(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Submissions</h1>
          <p className="text-slate-500 mt-2 font-light">Advanced React Patterns - CS401</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search student..." 
              className="pl-10 pr-4 py-2 rounded-xl bg-white/50 border border-white/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm text-slate-700 w-64 placeholder:text-slate-400"
            />
          </div>
          <button className="p-2 bg-white/50 border border-white/40 rounded-xl text-slate-600 hover:bg-white/80 transition-colors">
            <Filter size={18} />
          </button>
          <button className="p-2 bg-white/50 border border-white/40 rounded-xl text-slate-600 hover:bg-white/80 transition-colors">
            <Download size={18} />
          </button>
        </div>
      </div>

      <GlassCard className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-xs font-semibold uppercase tracking-wider text-slate-400 bg-slate-50/50">
                <th className="p-6 font-medium">Student</th>
                <th className="p-6 font-medium">Submitted At</th>
                <th className="p-6 font-medium">Status</th>
                <th className="p-6 font-medium">Plagiarism</th>
                <th className="p-6 font-medium">Grade</th>
                <th className="p-6 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {submissions.map((sub, idx) => (
                <tr 
                  key={sub.id} 
                  className={`
                    group hover:bg-indigo-50/30 transition-colors border-b border-slate-50 last:border-0
                    ${idx % 2 === 0 ? 'bg-white/0' : 'bg-slate-50/30'}
                  `}
                >
                  <td className="p-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-500">
                        {sub.studentName.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-800">{sub.studentName}</p>
                        <p className="text-xs text-slate-400">{sub.studentId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="p-6 text-slate-500 font-light">
                    {sub.submittedAt ? new Date(sub.submittedAt).toLocaleString() : '-'}
                  </td>
                  <td className="p-6">
                    <span className={`
                      inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border
                      ${getStatusColor(sub.status)}
                    `}>
                      {getStatusIcon(sub.status)}
                      <span className="capitalize">{sub.status}</span>
                    </span>
                  </td>
                  <td className="p-6">
                    {sub.plagiarismScore !== undefined ? (
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${sub.plagiarismScore > 10 ? 'bg-red-500' : 'bg-green-500'}`}
                            style={{ width: `${sub.plagiarismScore}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-600">{sub.plagiarismScore}%</span>
                      </div>
                    ) : (
                      <span className="text-slate-400 text-xs">-</span>
                    )}
                  </td>
                  <td className="p-6">
                     {sub.grade ? (
                       <span className="font-bold text-slate-800">{sub.grade}/100</span>
                     ) : (
                       <span className="text-slate-400 italic">Pending</span>
                     )}
                  </td>
                  <td className="p-6 text-right">
                    <button 
                        onClick={() => handleOpenGrading(sub)}
                        className="text-indigo-600 hover:text-indigo-800 font-medium text-xs hover:underline"
                    >
                      {sub.status === 'graded' ? 'Edit Grade' : 'Grade Now'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {/* Grading Modal */}
      {gradingSubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/20 backdrop-blur-sm">
           <GlassCard className="w-full max-w-md p-6">
              <div className="flex justify-between items-center mb-6">
                <div>
                    <h3 className="text-lg font-bold text-slate-800">Grade Submission</h3>
                    <p className="text-xs text-slate-500">{gradingSubmission.studentName} - {gradingSubmission.studentId}</p>
                </div>
                <button onClick={() => setGradingSubmission(null)}><X size={20} className="text-slate-400 hover:text-slate-600" /></button>
              </div>
              
              <div className="space-y-4">
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Score (out of 100)</label>
                      <input 
                        type="number"
                        max={100}
                        min={0}
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50" 
                        value={gradeInput}
                        onChange={e => setGradeInput(Number(e.target.value))}
                      />
                  </div>
                  <div>
                      <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Remarks</label>
                      <textarea 
                        className="w-full p-2 rounded-lg border border-slate-200 bg-white/50 h-32 resize-none" 
                        value={remarksInput}
                        onChange={e => setRemarksInput(e.target.value)}
                        placeholder="Enter feedback for student..."
                      />
                  </div>
                  <div className="flex gap-3">
                      <button 
                          onClick={() => setGradingSubmission(null)}
                          className="flex-1 py-3 border border-slate-200 text-slate-600 rounded-xl font-medium hover:bg-slate-50"
                      >
                          Cancel
                      </button>
                      <button 
                        onClick={handleSaveGrade}
                        className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700"
                      >
                          Save Grade
                      </button>
                  </div>
              </div>
           </GlassCard>
        </div>
      )}
    </div>
  );
};
