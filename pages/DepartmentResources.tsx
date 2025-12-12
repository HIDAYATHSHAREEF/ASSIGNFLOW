import React, { useState } from 'react';
import { GlassCard } from '../components/GlassCard';
import { MOCK_RESOURCES } from '../constants';
import { Resource } from '../types';
import { 
  Search, 
  FileText, 
  Video, 
  Link as LinkIcon, 
  Download, 
  Eye, 
  Filter, 
  BookOpen, 
  File, 
  Clock,
  Star
} from 'lucide-react';

export const DepartmentResources: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'All' | 'Notes' | 'Lab Manual' | 'Paper' | 'Reference'>('All');

  const categories = ['All', 'Notes', 'Lab Manual', 'Paper', 'Reference'];

  const filteredResources = MOCK_RESOURCES.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          resource.courseCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || resource.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const getIconForType = (type: string) => {
    switch (type) {
      case 'pdf': return <FileText className="text-red-500" size={24} />;
      case 'video': return <Video className="text-purple-500" size={24} />;
      case 'link': return <LinkIcon className="text-blue-500" size={24} />;
      case 'doc': return <File className="text-indigo-500" size={24} />;
      default: return <FileText className="text-slate-500" size={24} />;
    }
  };

  const getBgForType = (type: string) => {
    switch (type) {
      case 'pdf': return 'bg-red-50';
      case 'video': return 'bg-purple-50';
      case 'link': return 'bg-blue-50';
      case 'doc': return 'bg-indigo-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-light text-slate-800">Dept. Resources</h1>
          <p className="text-slate-500 mt-2 font-light">Access lecture notes, past papers, and reference materials.</p>
        </div>
        
        {/* Quick Stats / Pinned */}
        <div className="flex gap-4">
           <div className="bg-indigo-600 text-white px-5 py-3 rounded-2xl shadow-lg shadow-indigo-500/20 flex items-center gap-3 cursor-pointer hover:bg-indigo-700 transition-colors">
              <Star size={20} className="fill-indigo-400 text-indigo-400" />
              <div>
                <p className="text-[10px] font-bold uppercase opacity-80">Pinned</p>
                <p className="text-sm font-bold">Exam Schedule</p>
              </div>
           </div>
           <div className="bg-white/60 border border-white/40 px-5 py-3 rounded-2xl shadow-sm flex items-center gap-3 backdrop-blur-md">
              <BookOpen size={20} className="text-indigo-600" />
              <div>
                <p className="text-[10px] font-bold uppercase text-slate-400">Total Files</p>
                <p className="text-sm font-bold text-slate-700">{MOCK_RESOURCES.length} items</p>
              </div>
           </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-center bg-white/40 p-2 rounded-2xl border border-white/30 backdrop-blur-md">
        
        {/* Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full lg:w-auto pb-2 lg:pb-0 scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat as any)}
              className={`
                px-5 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200
                ${activeCategory === cat 
                  ? 'bg-white text-indigo-600 shadow-sm ring-1 ring-slate-100' 
                  : 'text-slate-500 hover:text-slate-700 hover:bg-white/40'}
              `}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative w-full lg:w-72">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
           <input 
             type="text" 
             placeholder="Search by title or code..."
             value={searchQuery}
             onChange={(e) => setSearchQuery(e.target.value)}
             className="w-full pl-10 pr-4 py-2.5 bg-white/60 border border-white/40 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm placeholder:text-slate-400"
           />
        </div>
      </div>

      {/* Featured / Recent Section (Horizontal Scroll) */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
           <Clock size={14} /> Recently Uploaded
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {MOCK_RESOURCES.slice(0, 3).map((resource) => (
             <GlassCard key={`featured-${resource.id}`} className="p-5 flex items-start gap-4 group cursor-pointer" hoverEffect>
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${getBgForType(resource.type)}`}>
                   {getIconForType(resource.type)}
                </div>
                <div className="min-w-0 flex-1">
                   <div className="flex justify-between items-start">
                     <span className="text-[10px] font-bold uppercase bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded-md border border-slate-200">
                        {resource.courseCode}
                     </span>
                     <span className="text-[10px] text-slate-400">{resource.date}</span>
                   </div>
                   <h4 className="font-bold text-slate-800 mt-1 truncate group-hover:text-indigo-600 transition-colors">{resource.title}</h4>
                   <p className="text-xs text-slate-500 mt-0.5 truncate">{resource.author}</p>
                </div>
             </GlassCard>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="space-y-4">
         <h3 className="text-sm font-bold uppercase text-slate-400 tracking-wider flex items-center gap-2">
           <Filter size={14} /> Library Results
        </h3>
        
        <div className="grid grid-cols-1 gap-4">
          {filteredResources.length > 0 ? (
            filteredResources.map((resource) => (
              <GlassCard key={resource.id} className="p-0 group" hoverEffect>
                <div className="flex flex-col md:flex-row items-center p-4 gap-4 md:gap-6">
                  
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${getBgForType(resource.type)}`}>
                      {getIconForType(resource.type)}
                  </div>

                  {/* Info */}
                  <div className="flex-1 w-full text-center md:text-left">
                    <div className="flex flex-col md:flex-row md:items-center gap-2 mb-1 justify-center md:justify-start">
                       <h3 className="font-bold text-slate-800 text-lg group-hover:text-indigo-600 transition-colors">
                          {resource.title}
                       </h3>
                       <span className="inline-block px-2 py-0.5 bg-slate-100 border border-slate-200 rounded text-[10px] font-bold uppercase text-slate-500 w-fit mx-auto md:mx-0">
                          {resource.courseCode}
                       </span>
                    </div>
                    <p className="text-sm text-slate-500">{resource.description}</p>
                    <div className="flex items-center justify-center md:justify-start gap-4 mt-2 text-xs text-slate-400 font-medium">
                       <span>{resource.category}</span>
                       <span>•</span>
                       <span>{resource.size}</span>
                       <span>•</span>
                       <span>{resource.downloads} downloads</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-center">
                     <button className="p-2.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-colors">
                        <Eye size={20} />
                     </button>
                     <button className="px-5 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-900/10 flex items-center gap-2 active:scale-95">
                        <Download size={16} />
                        Download
                     </button>
                  </div>
                </div>
              </GlassCard>
            ))
          ) : (
             <div className="text-center py-20 bg-white/30 rounded-3xl border border-white/40 border-dashed">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                   <Search size={24} />
                </div>
                <h3 className="text-slate-800 font-bold text-lg">No resources found</h3>
                <p className="text-slate-500">Try adjusting your filters or search query.</p>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};