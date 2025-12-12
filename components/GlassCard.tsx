import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ 
  children, 
  className = '', 
  onClick,
  hoverEffect = false 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`
        relative overflow-hidden
        bg-white/60 backdrop-blur-2xl 
        border border-white/40 shadow-sm 
        rounded-2xl 
        transition-all duration-300 ease-out
        ${hoverEffect ? 'hover:bg-white/70 hover:shadow-lg hover:-translate-y-1 cursor-pointer' : ''}
        ${className}
      `}
    >
      {/* Subtle shine effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-transparent pointer-events-none" />
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};
