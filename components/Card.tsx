
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  glowColor?: 'blue' | 'purple' | 'green';
}

const Card: React.FC<CardProps> = ({ children, className = '', glowColor = 'blue' }) => {
  const glowClasses = {
    blue: 'border-cyan-400 shadow-cyan-400/30 hover:shadow-cyan-400/50',
    purple: 'border-purple-500 shadow-purple-500/30 hover:shadow-purple-500/50',
    green: 'border-green-400 shadow-green-400/30 hover:shadow-green-400/50',
  };

  return (
    <div
      className={`bg-[#111827]/60 backdrop-blur-sm border rounded-lg p-6 transition-all duration-300 transform hover:-translate-y-1 ${glowClasses[glowColor]} ${className}`}
      style={{ boxShadow: `0 0 15px 0px var(--tw-shadow-color)` }}
    >
      {children}
    </div>
  );
};

export default Card;
