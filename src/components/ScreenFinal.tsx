import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { RotateCcw, Sparkles, PartyPopper } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenFinalProps {
  onReplay: () => void;
  userChoice?: 'yes' | 'no' | null;
}

interface WishBalloon {
  id: number;
  color: string;
  borderColor: string;
  bgLight: string;
  wish: string;
  popped: boolean;
}

const ARTISTIC_PALETTE = ['#fbd5d5', '#e0e7ff', '#fde68a', '#c084fc', '#bbf7d0', '#f5d0fe'];

export const ScreenFinal: React.FC<ScreenFinalProps> = ({ onReplay, userChoice }) => {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [balloons, setBalloons] = useState<WishBalloon[]>([
    { id: 1, color: 'text-stone-800', borderColor: 'border-[#fbd5d5]', bgLight: 'bg-[#fbd5d5]/30', wish: 'Endless Smiles & Laughter ⭐', popped: false },
    { id: 2, color: 'text-stone-800', borderColor: 'border-[#e0e7ff]', bgLight: 'bg-[#e0e7ff]/40', wish: 'Peace of Mind & Calm Days 🕊️', popped: false },
    { id: 3, color: 'text-stone-800', borderColor: 'border-[#bbf7d0]', bgLight: 'bg-[#bbf7d0]/30', wish: 'Great Health & Energy 🌿', popped: false },
    { id: 4, color: 'text-stone-800', borderColor: 'border-[#fde68a]', bgLight: 'bg-[#fde68a]/40', wish: 'Success in All Your Goals 🚀', popped: false },
    { id: 5, color: 'text-stone-800', borderColor: 'border-[#c084fc]', bgLight: 'bg-[#c084fc]/25', wish: 'Lots of Delicious Food 🍰', popped: false },
    { id: 6, color: 'text-stone-800', borderColor: 'border-[#fbd5d5]', bgLight: 'bg-[#fbd5d5]/40', wish: 'A Truly Wonderful Year Ahead ✨', popped: false },
  ]);

  useEffect(() => {
    sounds.playCelebrationChime();
    const duration = 2.5 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors: ARTISTIC_PALETTE,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors: ARTISTIC_PALETTE,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  const triggerConfetti = () => {
    sounds.playCelebrationChime();
    confetti({
      particleCount: 75,
      spread: 70,
      origin: { y: 0.6 },
      colors: ARTISTIC_PALETTE,
    });
  };

  const handleBlowCandle = () => {
    sounds.playBlow();
    setCandlesBlown(true);
    triggerConfetti();
  };

  const handlePopBalloon = (id: number) => {
    sounds.playPop();
    setBalloons((prev) =>
      prev.map((b) => (b.id === id ? { ...b, popped: true } : b))
    );
  };

  const handleReplayClick = () => {
    sounds.playClick();
    onReplay();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] w-full max-w-2xl mx-auto px-4 py-8 relative z-10 text-center">
      <div className="w-full artistic-card rounded-3xl p-6 sm:p-12 shadow-2xl border border-stone-200/80 space-y-8">
        
        {/* Top Artistic Flair subtitle */}
        <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-stone-100 border border-stone-200 text-stone-600 text-xs sm:text-sm font-medium">
          <PartyPopper size={15} className="text-stone-700" />
          <span className="uppercase tracking-widest">Birthday Celebration</span>
          <Sparkles size={15} className="text-stone-500" />
        </div>

        {/* Main Title Required by Prompt */}
        <div>
          <h2 className="text-4xl sm:text-5xl font-bold text-stone-900 mb-6 font-sans tracking-tight">
            Happy Birthday, Titli 🎂
          </h2>

          {/* Sincere Wishes in Artistic Flair styling */}
          <div className="max-w-xl mx-auto text-base sm:text-lg text-stone-600 space-y-4 mb-6 font-sans">
            <p className="italic bg-stone-50/80 p-5 rounded-2xl border border-stone-200/60 text-stone-700">
              Whatever happened between us, I genuinely hope life treats you well. Stay happy, take care of yourself, and have a beautiful year ahead.
            </p>
            <p className="font-bold text-xl text-stone-900 pt-1">
              Happy Birthday once again, Titli! 🎉
            </p>
            <div className="p-3.5 bg-amber-50/90 rounded-2xl border border-amber-200 text-stone-900 font-bold text-base sm:text-lg shadow-xs">
              5 takar bapuji cake kine kheye nis 😂
            </div>
          </div>
        </div>

        {/* Interactive Virtual Birthday Cake in subtle pastel styling */}
        <div className="p-6 rounded-2xl bg-white/80 border border-stone-200 max-w-md mx-auto shadow-inner">
          <div className="flex flex-col items-center">
            {/* Candle flames */}
            <div className="flex justify-center gap-6 mb-1">
              {[0, 1, 2].map((idx) => (
                <div key={idx} className="flex flex-col items-center">
                  {!candlesBlown ? (
                    <div className="w-3 h-5 bg-gradient-to-t from-amber-500 via-amber-300 to-yellow-100 rounded-full animate-pulse shadow-[0_0_10px_rgba(251,191,36,0.8)]" />
                  ) : (
                    <div className="w-2 h-4 text-xs opacity-60 text-stone-400">💨</div>
                  )}
                  <div className="w-1.5 h-6 bg-stone-300 rounded-t-sm" />
                </div>
              ))}
            </div>

            {/* Cake Layers */}
            <div className="w-44 h-10 bg-[#fbd5d5]/60 rounded-t-xl border border-stone-200 flex items-center justify-center relative shadow-xs">
              <span className="text-xs font-bold text-stone-800 tracking-widest">TITLI</span>
            </div>
            <div className="w-56 h-12 bg-[#fde68a]/50 rounded-b-xl border-x border-b border-stone-200 shadow-md flex items-center justify-center gap-3">
              <span>🍓</span>
              <span>⭐</span>
              <span>🍓</span>
              <span>⭐</span>
              <span>🍓</span>
            </div>

            {/* Cake Plate */}
            <div className="w-64 h-3 bg-stone-200 rounded-full mt-1 border border-stone-300 shadow-xs" />

            {/* Candle Interaction Button */}
            {!candlesBlown ? (
              <button
                onClick={handleBlowCandle}
                className="mt-4 px-6 py-2 rounded-full bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm shadow-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>🌬️ Blow out candles</span>
              </button>
            ) : (
              <div className="mt-4 inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-emerald-800 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
                <span>✨ Candles blown! Make a wonderful wish! 🎂</span>
              </div>
            )}
          </div>
        </div>

        {/* Pop-the-Balloon Birthday Wishes in Artistic Pastels */}
        <div>
          <div className="flex items-center justify-center gap-2 mb-3 text-stone-700 font-semibold text-sm sm:text-base">
            <span>🎈</span>
            <span>Pop balloons for birthday wishes:</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {balloons.map((b) => (
              <div
                key={b.id}
                onClick={() => !b.popped && handlePopBalloon(b.id)}
                className={`p-3.5 rounded-2xl border transition-all duration-300 cursor-pointer text-center select-none ${
                  b.popped
                    ? `${b.bgLight} ${b.borderColor} scale-100 shadow-xs`
                    : 'bg-white border-stone-200 hover:border-stone-400 hover:scale-105 shadow-sm active:scale-95'
                }`}
              >
                {!b.popped ? (
                  <div className="flex flex-col items-center justify-center py-2 space-y-1">
                    <span className="text-2xl animate-bounce">🎈</span>
                    <span className="text-xs font-semibold text-stone-500">Tap to pop!</span>
                  </div>
                ) : (
                  <div className="py-1">
                    <span className="text-xs font-bold text-stone-800 leading-tight block">
                      {b.wish}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons: Confetti & Replay */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={triggerConfetti}
            className="w-full sm:w-auto px-6 py-3.5 rounded-full font-semibold text-stone-800 bg-stone-100 hover:bg-stone-200 border border-stone-300 shadow-xs transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
          >
            <PartyPopper size={18} />
            <span>More Confetti! 🎉</span>
          </button>

          {/* Replay ↻ Button matching Artistic Flair theme */}
          <button
            onClick={handleReplayClick}
            className="w-full sm:w-auto px-8 py-3.5 bg-stone-200 text-stone-700 rounded-full hover:bg-stone-300 transition-colors flex items-center justify-center gap-2 font-medium active:scale-95 cursor-pointer"
          >
            <RotateCcw size={18} />
            <span>Replay ↻</span>
          </button>
        </div>

      </div>
    </div>
  );
};
