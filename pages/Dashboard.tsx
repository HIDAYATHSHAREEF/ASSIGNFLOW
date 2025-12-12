import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  PieChart, Pie, Cell 
} from 'recharts';
import { GlassCard } from '../components/GlassCard';
import { DashboardStats, User } from '../types';
import { MOCK_STATS } from '../constants';
import { ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

interface DashboardProps {
  user: User;
}

export const Dashboard: React.FC<DashboardProps> = ({ user }) => {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-light text-slate-800">
            Welcome back, <span className="font-semibold">{user.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-500 mt-2 font-light">Here's what's happening in your department today.</p>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 bg-white/40 px-4 py-2 rounded-full backdrop-blur-md border border-white/30">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
          System Online
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6" hoverEffect>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <CheckCircle2 size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 flex items-center gap-1 bg-green-50 px-2 py-1 rounded-full">
              +12% <ArrowUpRight size={12} />
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Submission Rate</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{MOCK_STATS.submissionRate}%</p>
        </GlassCard>

        <GlassCard className="p-6" hoverEffect>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-yellow-50 text-yellow-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Pending Review</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{MOCK_STATS.pendingAssignments}</p>
        </GlassCard>

        <GlassCard className="p-6" hoverEffect>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <AlertCircle size={20} />
            </div>
            <span className="text-xs font-semibold text-red-600 flex items-center gap-1 bg-red-50 px-2 py-1 rounded-full">
              -2.4% <ArrowUpRight size={12} className="rotate-90" />
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Average Grade</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{MOCK_STATS.averageGrade}/100</p>
        </GlassCard>

        <GlassCard className="p-6" hoverEffect>
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <Clock size={20} />
            </div>
          </div>
          <h3 className="text-slate-500 text-sm font-medium">Total Students</h3>
          <p className="text-2xl font-bold text-slate-800 mt-1">{MOCK_STATS.totalStudents}</p>
        </GlassCard>
      </div>

      {/* Main Content Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Analytics */}
        <div className="lg:col-span-2 space-y-6">
          <GlassCard className="p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-slate-800 mb-6">Submission Activity</h3>
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={MOCK_STATS.dailySubmissions}>
                  <defs>
                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.05)" />
                  <XAxis 
                    dataKey="day" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                    dy={10}
                  />
                  <YAxis 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{fill: '#94a3b8', fontSize: 12}} 
                  />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255,255,255,0.3)',
                      borderRadius: '12px',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                    }}
                    cursor={{ stroke: '#6366f1', strokeWidth: 1, strokeDasharray: '4 4' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="count" 
                    stroke="#6366f1" 
                    strokeWidth={3}
                    fillOpacity={1} 
                    fill="url(#colorCount)" 
                    animationDuration={2000}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        </div>

        {/* Right: Distribution */}
        <div className="lg:col-span-1 space-y-6">
          <GlassCard className="p-6 h-[400px] flex flex-col">
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Status Overview</h3>
            <div className="flex-1 relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={MOCK_STATS.statusDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {MOCK_STATS.statusDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <Tooltip 
                     contentStyle={{ 
                      backgroundColor: 'rgba(255, 255, 255, 0.8)', 
                      backdropFilter: 'blur(10px)',
                      border: 'none',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0,0,0,0.05)'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              {/* Center Text */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="text-center">
                  <p className="text-2xl font-bold text-slate-800">100%</p>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Tracking</p>
                </div>
              </div>
            </div>
            <div className="space-y-3 mt-4">
              {MOCK_STATS.statusDistribution.map((item) => (
                <div key={item.name} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-slate-600">{item.name}</span>
                  </div>
                  <span className="font-medium text-slate-800">{item.value}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
};
