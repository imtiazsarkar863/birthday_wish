import React from 'react';
import { ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenApologyProps {
  onContinue: () => void;
}

export const ScreenApology: React.FC<ScreenApologyProps> = ({ onContinue }) => {
  const handleContinue = () => {
    sounds.playClick();
    onContinue();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-2xl mx-auto px-4 py-10 relative z-10">
      <div className="w-full artistic-card rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200/80 transition-all text-center flex flex-col items-center">
        {/* Subtle uppercase tracking label */}
        <span className="text-stone-400 uppercase tracking-widest text-xs sm:text-sm font-semibold mb-4">
          Before anything else...
        </span>

        {/* Apology headline */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-stone-900 font-sans tracking-tight">
          I just wanted to say I&apos;m sorry.
        </h2>

        {/* Sincere text container */}
        <div className="max-w-xl text-base sm:text-lg text-stone-600 leading-relaxed space-y-6 mb-10 font-sans">
          <p className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/60 text-stone-700">
            I know I made mistakes, and I know leaving you was something that hurt you. I don&apos;t expect anything from you. I just genuinely hope you&apos;re happy and doing well.
          </p>
          <p className="font-medium text-stone-800 italic">
            Anyway... enough serious stuff.
          </p>
        </div>

        {/* Continue button styled to Artistic Flair theme */}
        <button
          onClick={handleContinue}
          className="group inline-flex items-center justify-center gap-3 px-12 py-4 border-2 border-stone-900 text-stone-900 rounded-full text-lg font-medium hover:bg-stone-900 hover:text-white transition-all duration-200 shadow-md active:scale-95 cursor-pointer"
        >
          <span>Continue</span>
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};
