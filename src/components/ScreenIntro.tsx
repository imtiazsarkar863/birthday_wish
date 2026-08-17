import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenIntroProps {
  onStart: () => void;
}

export const ScreenIntro: React.FC<ScreenIntroProps> = ({ onStart }) => {
  const handleStart = () => {
    sounds.playCelebrationChime();
    onStart();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-2xl mx-auto text-center px-4 py-10 relative z-10">
      {/* Decorative top pill in Artistic Flair stone palette */}
      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-stone-200 text-stone-500 text-xs sm:text-sm font-medium tracking-wide mb-8 shadow-xs">
        <Sparkles size={14} className="text-stone-400" />
        <span className="uppercase tracking-widest">A tiny gesture for you</span>
      </div>

      {/* Main card with artistic clean frame */}
      <div className="w-full artistic-card rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200/80 transition-all">
        {/* Playful Cake Icon badge */}
        <div className="w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8 rounded-full bg-[#fbd5d5]/30 border border-[#fbd5d5]/60 flex items-center justify-center shadow-xs">
          <span className="text-4xl sm:text-5xl select-none transform hover:scale-110 transition-transform duration-300 inline-block">
            🎂
          </span>
        </div>

        {/* Large Prominent Title from Artistic Flair theme */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-stone-900 mb-6">
          Happy Birthday, Titli 🎂
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-stone-600 mb-10 italic font-sans">
          &ldquo;I made a tiny something for you.&rdquo;
        </p>

        {/* Start button styled to Artistic Flair theme */}
        <button
          onClick={handleStart}
          className="group inline-flex items-center justify-center gap-3 px-12 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-lg font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-stone-900/20 cursor-pointer"
        >
          <span>Start</span>
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>

        {/* Subtle decorative hint */}
        <div className="mt-10 pt-6 border-t border-stone-200/60 flex items-center justify-center gap-2 text-xs text-stone-400 font-medium">
          <span>✨</span>
          <span>Turn on sound for the best experience</span>
          <span>✨</span>
        </div>
      </div>
    </div>
  );
};
