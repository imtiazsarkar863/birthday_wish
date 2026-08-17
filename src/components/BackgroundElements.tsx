import React from 'react';
import { Sparkles, Star } from 'lucide-react';

export const BackgroundElements: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
      {/* Base artistic background canvas */}
      <div className="absolute inset-0" style={{ backgroundColor: '#fcf8f2' }} />

      {/* Signature Artistic Flair floating geometric accents */}
      <div
        className="absolute top-10 left-10 w-28 h-28 sm:w-36 sm:h-36 rounded-full opacity-25 animate-float-slow"
        style={{ backgroundColor: '#fbd5d5' }}
      />
      <div
        className="absolute bottom-16 right-10 w-44 h-44 sm:w-56 sm:h-56 rounded-full opacity-25 animate-float-reverse"
        style={{ backgroundColor: '#e0e7ff' }}
      />
      <div
        className="absolute top-1/2 left-[15%] w-6 h-6 rotate-45 opacity-45 animate-pulse-subtle"
        style={{ backgroundColor: '#fde68a' }}
      />
      <div
        className="absolute top-20 right-1/3 w-4 h-4 rounded-full opacity-45 animate-twinkle"
        style={{ backgroundColor: '#c084fc' }}
      />
      <div
        className="absolute bottom-1/3 left-12 w-5 h-5 rotate-12 opacity-35"
        style={{ backgroundColor: '#bbf7d0' }}
      />
      <div
        className="absolute top-1/3 right-16 w-3 h-3 rounded-full opacity-40 animate-twinkle"
        style={{ backgroundColor: '#fbd5d5' }}
      />
      <div
        className="absolute top-2/3 right-1/4 w-5 h-5 rotate-45 opacity-35"
        style={{ backgroundColor: '#fde68a' }}
      />

      {/* Delicate floating celebratory stars (non-romantic) */}
      <div className="absolute top-[18%] left-[82%] animate-float-slow opacity-30">
        <Star size={20} className="text-stone-400" />
      </div>
      <div className="absolute top-[75%] left-[22%] animate-float-reverse opacity-25">
        <Sparkles size={22} className="text-stone-400" />
      </div>
      <div className="absolute top-[88%] right-[38%] animate-twinkle opacity-30">
        <span className="text-lg">✨</span>
      </div>
    </div>
  );
};
