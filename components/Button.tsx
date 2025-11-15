
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  glowColor?: 'blue' | 'purple' | 'green';
}

const NeonButton: React.FC<ButtonProps> = ({ children, className = '', glowColor = 'purple', ...props }) => {
  const colorClasses = {
    blue: 'bg-cyan-500/80 hover:bg-cyan-500 text-white shadow-cyan-500/50',
    purple: 'bg-purple-600/80 hover:bg-purple-600 text-white shadow-purple-600/50',
    green: 'bg-green-500/80 hover:bg-green-500 text-white shadow-green-500/50',
  };

  return (
    <button
      className={`px-6 py-2 rounded-md font-bold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#0a0f1c] ${colorClasses[glowColor]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default NeonButton;
