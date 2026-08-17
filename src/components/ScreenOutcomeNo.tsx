import React from 'react';
import { ArrowRight, Trophy } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenOutcomeNoProps {
  onContinue: () => void;
}

export const ScreenOutcomeNo: React.FC<ScreenOutcomeNoProps> = ({ onContinue }) => {
  const handleContinue = () => {
    sounds.playCelebrationChime();
    onContinue();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-2xl mx-auto px-4 py-10 relative z-10 text-center">
      <div className="w-full artistic-card rounded-3xl p-8 sm:p-14 shadow-xl border border-stone-200/80 transition-all flex flex-col items-center">
        {/* Playful badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-amber-100 border border-amber-200 text-stone-800 text-xs sm:text-sm font-bold mb-6">
          <Trophy size={15} className="text-amber-700" />
          <span>You caught the untouchable button! 🎉</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 font-sans tracking-tight">
          Muhehehe...
        </h2>

        {/* Message block */}
        <div className="max-w-xl text-base sm:text-lg text-stone-600 leading-relaxed space-y-4 mb-8 font-sans">
          <p className="text-xl font-semibold text-stone-800">
            I knew you wouldn&apos;t 😂
          </p>

          <div className="bg-stone-50/80 p-5 rounded-2xl border border-stone-200/60 text-stone-700 text-left sm:text-center space-y-2">
            <p>Anyways, I&apos;m really sorry for what I did.</p>
            <p>I know I was wrong, and I don&apos;t expect anything from you.</p>
            <p className="font-medium text-stone-900">
              I just genuinely want you to stay happy for the rest of your life.
            </p>
          </div>

          <p className="text-lg font-bold text-stone-800">
            Thank you. Bye.
          </p>

          <div className="p-3.5 bg-amber-50 rounded-xl border border-amber-200 text-stone-900 font-bold text-base sm:text-lg">
            5 taka&apos;r Bapuji cake gile nis kal 😂
          </div>
        </div>

        {/* Continue button */}
        <button
          onClick={handleContinue}
          className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-stone-900 hover:bg-stone-800 text-white rounded-full text-base sm:text-lg font-medium transform transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg cursor-pointer"
        >
          <span>Continue to Wishes 🎂</span>
          <ArrowRight size={20} className="transform group-hover:translate-x-1 transition-transform duration-200" />
        </button>
      </div>
    </div>
  );
};
