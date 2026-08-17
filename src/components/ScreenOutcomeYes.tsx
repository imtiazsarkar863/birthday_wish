import React from 'react';
import { ArrowRight } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenOutcomeYesProps {
  onContinue: () => void;
}

export const ScreenOutcomeYes: React.FC<ScreenOutcomeYesProps> = ({ onContinue }) => {
  const handleContinue = () => {
    sounds.playCelebrationChime();
    onContinue();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-2xl mx-auto px-4 py-10 relative z-10 text-center">
      <div className="w-full artistic-card rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200/80 transition-all flex flex-col items-center">
        {/* Soft icon container */}
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-stone-100 flex items-center justify-center border border-stone-200 shadow-xs">
          <span className="text-3xl">🙂</span>
        </div>

        {/* Title */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-stone-900 mb-6 leading-snug font-sans tracking-tight">
          Oh... okay
        </h2>

        {/* Message */}
        <div className="max-w-xl text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-8 font-sans">
          <p className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/60 text-stone-700">
            I am again sorry and happy birthday, its your day enjoy it to the fullest.
          </p>
          <p className="text-lg font-bold text-stone-900">
            Thank you.
          </p>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-base sm:text-lg font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <span>See Birthday Wishes 🎉</span>
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};
