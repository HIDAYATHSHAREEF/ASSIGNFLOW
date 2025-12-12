import React from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  FileText, 
  LogOut,
  GraduationCap,
  Library,
  HelpCircle,
  BookMarked
} from 'lucide-react';
import { User } from '../types';

interface SidebarProps {
  currentUser: User;
  currentView: string;
  onChangeView: (view: string) => void;
  onLogout: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentUser, currentView, onChangeView, onLogout }) => {
  
  const teacherItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assignments', label: 'Manage Assignments', icon: BookOpen },
    { id: 'submissions', label: 'Review Submissions', icon: FileText },
    { id: 'students', label: 'All Students', icon: Users },
  ];

  const studentItems = [
    { id: 'dashboard', label: 'My Dashboard', icon: LayoutDashboard },
    { id: 'my-courses', label: 'My Courses', icon: BookMarked },
    { id: 'my-assignments', label: 'My Assignments', icon: BookOpen },
    { id: 'resources', label: 'Dept Resources', icon: Library },
    { id: 'support', label: 'Ask Faculty', icon: HelpCircle },
  ];

  const menuItems = currentUser.role === 'student' ? studentItems : teacherItems;

  return (
    <aside className="fixed left-4 top-4 bottom-4 w-64 rounded-3xl bg-white/50 backdrop-blur-xl border border-white/30 shadow-xl z-50 flex flex-col justify-between overflow-hidden">
      {/* Logo Area */}
      <div className="p-8 pb-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/30">
            <GraduationCap size={18} />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Assign Flow</span>
        </div>

        <div className="flex flex-col gap-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onChangeView(item.id)}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group
                  ${isActive 
                    ? 'bg-indigo-50/80 text-indigo-600 shadow-sm ring-1 ring-indigo-100' 
                    : 'text-slate-500 hover:bg-white/40 hover:text-slate-700'
                  }
                `}
              >
                <Icon size={18} className={isActive ? 'text-indigo-600' : 'text-slate-400 group-hover:text-slate-600'} />
                <span className="font-medium text-sm">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="p-4 border-t border-white/20 bg-white/20">
        <button className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-700 w-full hover:bg-white/40 rounded-xl transition-colors">
          <Settings size={18} />
          <span className="font-medium text-sm">Settings</span>
        </button>
        <div className="mt-4 flex items-center gap-3 px-4 py-3 rounded-xl bg-white/40 border border-white/30">
          <img 
            src={currentUser.avatarUrl} 
            alt="Profile" 
            className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
          />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold text-slate-800 truncate">{currentUser.name}</p>
            <p className="text-xs text-slate-500 truncate uppercase tracking-wider">{currentUser.role}</p>
          </div>
          <button 
            onClick={onLogout}
            className="p-1.5 rounded-lg hover:bg-red-50 text-slate-400 hover:text-red-500 transition-colors"
            title="Log Out"
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  );
};
