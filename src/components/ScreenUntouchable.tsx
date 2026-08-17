import React, { useState, useRef, useEffect, useCallback } from 'react';
import { HelpCircle } from 'lucide-react';
import { sounds } from '../utils/sound';

interface ScreenUntouchableProps {
  onSelectYes: () => void;
  onSelectNo: () => void;
}

const TAUNT_MESSAGES = [
  'Nope! 💨',
  'Too fast! ⚡',
  'Almost! 🏃',
  'Nice try, Titli! 🤭',
  'Whoops! 🎈',
  'Too slow! 🐢',
  'Nu-uh! 🙃',
  'Catch me if you can! 💫',
  '404: Click not found 🤖',
  'Missed me! ✨',
  'Dodged! 💨',
  'Hehe, still untouchable! 😜',
];

export const ScreenUntouchable: React.FC<ScreenUntouchableProps> = ({
  onSelectYes,
  onSelectNo,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const arenaRef = useRef<HTMLDivElement>(null);
  const noBtnRef = useRef<HTMLButtonElement>(null);

  // Position offset relative to original center position in the arena
  const [btnPos, setBtnPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isWobbling, setIsWobbling] = useState(false);
  const [escapeCount, setEscapeCount] = useState(0);
  const [currentTaunt, setCurrentTaunt] = useState<string>('');
  const [tauntVisible, setTauntVisible] = useState(false);
  const lastDodgeTimeRef = useRef<number>(0);
  const tauntTimeoutRef = useRef<number | null>(null);

  // Dodge action that moves the NO button away from a given position or randomly
  const dodgeButton = useCallback(
    (pointerX?: number, pointerY?: number) => {
      const now = Date.now();
      if (now - lastDodgeTimeRef.current < 60) return;
      lastDodgeTimeRef.current = now;

      sounds.playWhoosh();
      setIsWobbling(true);
      setTimeout(() => setIsWobbling(false), 300);

      // Determine arena bounds
      if (!arenaRef.current || !noBtnRef.current) return;
      const arenaRect = arenaRef.current.getBoundingClientRect();
      const btnRect = noBtnRef.current.getBoundingClientRect();

      const btnWidth = btnRect.width || 140;
      const btnHeight = btnRect.height || 56;

      const padding = 16;
      const maxRangeX = Math.max(20, (arenaRect.width - btnWidth) / 2 - padding);
      const maxRangeY = Math.max(20, (arenaRect.height - btnHeight) / 2 - padding);

      let newX = 0;
      let newY = 0;

      if (pointerX !== undefined && pointerY !== undefined) {
        const btnCenterX = btnRect.left + btnWidth / 2;
        const btnCenterY = btnRect.top + btnHeight / 2;

        const deltaX = btnCenterX - pointerX;
        const deltaY = btnCenterY - pointerY;

        let dirX = deltaX === 0 ? (Math.random() > 0.5 ? 1 : -1) : Math.sign(deltaX);
        let dirY = deltaY === 0 ? (Math.random() > 0.5 ? 1 : -1) : Math.sign(deltaY);

        const leapDistanceX = maxRangeX * (0.6 + Math.random() * 0.4);
        const leapDistanceY = maxRangeY * (0.5 + Math.random() * 0.5);

        newX = dirX * leapDistanceX + (Math.random() * 20 - 10);
        newY = dirY * leapDistanceY + (Math.random() * 20 - 10);

        if (Math.abs(newX) > maxRangeX) {
          newX = -Math.sign(newX) * (maxRangeX * 0.75);
        }
        if (Math.abs(newY) > maxRangeY) {
          newY = -Math.sign(newY) * (maxRangeY * 0.75);
        }
      } else {
        const signX = Math.random() > 0.5 ? 1 : -1;
        const signY = Math.random() > 0.5 ? 1 : -1;
        newX = signX * maxRangeX * (0.5 + Math.random() * 0.5);
        newY = signY * maxRangeY * (0.5 + Math.random() * 0.5);
      }

      newX = Math.max(-maxRangeX, Math.min(maxRangeX, newX));
      newY = Math.max(-maxRangeY, Math.min(maxRangeY, newY));

      setBtnPos({ x: Math.round(newX), y: Math.round(newY) });
      setEscapeCount((prev) => {
        const next = prev + 1;
        const randomTaunt = TAUNT_MESSAGES[Math.floor(Math.random() * TAUNT_MESSAGES.length)];
        setCurrentTaunt(randomTaunt);
        setTauntVisible(true);

        if (tauntTimeoutRef.current) {
          window.clearTimeout(tauntTimeoutRef.current);
        }
        tauntTimeoutRef.current = window.setTimeout(() => {
          setTauntVisible(false);
        }, 1200);

        return next;
      });
    },
    []
  );

  // Proximity detection for desktop mouse pointer
  const handlePointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!noBtnRef.current) return;
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(e.clientX - btnCenterX, e.clientY - btnCenterY);
      const threshold = 110;
      if (dist < threshold) {
        dodgeButton(e.clientX, e.clientY);
      }
    },
    [dodgeButton]
  );

  // Touch listener for mobile devices
  const handleTouchMove = useCallback(
    (e: React.TouchEvent<HTMLDivElement>) => {
      if (e.touches.length === 0 || !noBtnRef.current) return;
      const touch = e.touches[0];
      const rect = noBtnRef.current.getBoundingClientRect();
      const btnCenterX = rect.left + rect.width / 2;
      const btnCenterY = rect.top + rect.height / 2;

      const dist = Math.hypot(touch.clientX - btnCenterX, touch.clientY - btnCenterY);
      const threshold = 100;
      if (dist < threshold) {
        dodgeButton(touch.clientX, touch.clientY);
      }
    },
    [dodgeButton]
  );

  const handleButtonApproach = () => {
    dodgeButton();
  };

  const handleNoClick = () => {
    if (escapeCount < 6) {
      dodgeButton();
      return;
    }
    sounds.playCelebrationChime();
    onSelectNo();
  };

  const handleYesClick = () => {
    sounds.playClick();
    onSelectYes();
  };

  useEffect(() => {
    return () => {
      if (tauntTimeoutRef.current) {
        window.clearTimeout(tauntTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onTouchMove={handleTouchMove}
      className="flex flex-col items-center justify-center min-h-[75vh] w-full max-w-2xl mx-auto px-4 py-8 relative z-10 select-none text-center"
    >
      <div className="w-full artistic-card rounded-3xl p-8 sm:p-12 shadow-2xl border border-stone-200/80 relative overflow-hidden">
        {/* Artistic Flair subtitle */}
        <div className="mb-4">
          <span className="text-stone-400 uppercase tracking-widest text-xs sm:text-sm font-semibold">
            One honest question, Titli...
          </span>
        </div>

        {/* Main Question */}
        <h3 className="text-3xl sm:text-4xl md:text-4xl font-bold mt-2 mb-4 text-stone-900 font-sans tracking-tight leading-tight">
          Are you still angry on me<br className="hidden sm:inline" /> and do you still hate me?
        </h3>

        {/* Escape counter pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-stone-100 border border-stone-200 text-xs text-stone-600 font-medium mb-8">
          <span>Escapes:</span>
          <span className="font-bold text-stone-900 bg-stone-200 px-2 py-0.5 rounded-full">
            {escapeCount}
          </span>
        </div>

        {/* INTERACTIVE BUTTON ARENA */}
        <div
          ref={arenaRef}
          className="relative w-full h-64 sm:h-72 rounded-2xl border-2 border-dashed border-stone-300/80 p-4 flex items-center justify-center overflow-hidden touch-none"
          style={{ backgroundColor: '#fcf8f2' }}
        >
          {/* Subtle background decoration */}
          <div className="absolute top-4 left-4 w-12 h-12 rounded-full opacity-15" style={{ backgroundColor: '#fbd5d5' }} />
          <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full opacity-15" style={{ backgroundColor: '#e0e7ff' }} />

          {/* YES Button (Fixed on the Left side with Artistic Flair styling) */}
          <div className="absolute left-[10%] sm:left-[16%] z-10">
            <button
              onClick={handleYesClick}
              className="w-36 sm:w-44 py-4 bg-stone-800 hover:bg-stone-900 text-white rounded-2xl text-xl font-bold shadow-xl transition-transform hover:scale-105 active:scale-90 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>YES</span>
              <span className="text-2xl">🙂</span>
            </button>
          </div>

          {/* UNTOUCHABLE NO Button (Dynamic dodging with Artistic Flair border styling) */}
          <div
            className="absolute right-[10%] sm:right-[16%] z-20 transition-all duration-200 ease-out"
            style={{
              transform: `translate(${btnPos.x}px, ${btnPos.y}px)`,
            }}
          >
            {/* Playful Floating Speech Bubble */}
            {tauntVisible && (
              <div className="absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1 bg-stone-900 text-white text-xs font-bold rounded-lg shadow-md animate-bounce pointer-events-none z-30">
                {currentTaunt}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-stone-900 rotate-45" />
              </div>
            )}

            <button
              ref={noBtnRef}
              onMouseEnter={handleButtonApproach}
              onPointerEnter={handleButtonApproach}
              onTouchStart={handleButtonApproach}
              onClick={handleNoClick}
              className={`w-36 sm:w-44 py-4 bg-white border-4 border-stone-900 text-stone-900 rounded-2xl text-xl font-bold shadow-xl active:scale-90 transition-transform duration-100 flex items-center justify-center gap-2 cursor-pointer ${
                isWobbling ? 'animate-shake-escape' : ''
              }`}
              style={{
                touchAction: 'none',
              }}
            >
              <span>NO</span>
              <span className="text-2xl">😶</span>
            </button>
          </div>
        </div>

        {/* Tip below arena */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-xs sm:text-sm text-stone-400 font-medium">
          <span>💡</span>
          <span>Try touching the &ldquo;NO&rdquo; button if you can!</span>
        </div>
      </div>
    </div>
  );
};
