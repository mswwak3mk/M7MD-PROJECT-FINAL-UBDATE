
import React from 'react';

const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div className="absolute w-full h-full bg-[radial-gradient(ellipse_at_center,_rgba(29,39,57,0.8)_0%,_rgba(10,15,28,1)_100%)]"></div>
      <div
        className="absolute w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(rgba(10, 15, 28, 0.95) 0%, rgba(10, 15, 28, 0.95) 100%),
            url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='%231d2739' fill-opacity='0.4'%3E%3Cpath d='M0 38.59l2.83-2.83 1.41 1.41L1.41 40H0v-1.41zM0 1.4l2.83 2.83 1.41-1.41L1.41 0H0v1.41zM38.59 40l-2.83-2.83 1.41-1.41L40 38.59V40h-1.41zM40 1.41l-2.83 2.83-1.41-1.41L38.59 0H40v1.41z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          animation: 'pan 60s linear infinite',
        }}
      ></div>
       <style>{`
        @keyframes pan {
          0% { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
};

export default AnimatedBackground;
