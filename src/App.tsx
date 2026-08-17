import React, { useState } from 'react';
import { BackgroundElements } from './components/BackgroundElements';
import { AudioToggle } from './components/AudioToggle';
import { ScreenIntro } from './components/ScreenIntro';
import { ScreenApology } from './components/ScreenApology';
import { ScreenUntouchable } from './components/ScreenUntouchable';
import { ScreenOutcomeYes } from './components/ScreenOutcomeYes';
import { ScreenOutcomeNo } from './components/ScreenOutcomeNo';
import { ScreenFinal } from './components/ScreenFinal';

type ScreenStep = 'intro' | 'apology' | 'untouchable' | 'outcome_yes' | 'outcome_no' | 'final';

export default function App() {
  const [currentStep, setCurrentStep] = useState<ScreenStep>('intro');
  const [userChoice, setUserChoice] = useState<'yes' | 'no' | null>(null);

  const handleStart = () => {
    setCurrentStep('apology');
  };

  const handleContinueFromApology = () => {
    setCurrentStep('untouchable');
  };

  const handleSelectYes = () => {
    setUserChoice('yes');
    setCurrentStep('outcome_yes');
  };

  const handleSelectNo = () => {
    setUserChoice('no');
    setCurrentStep('outcome_no');
  };

  const handleContinueToFinal = () => {
    setCurrentStep('final');
  };

  const handleReplay = () => {
    setUserChoice(null);
    setCurrentStep('intro');
  };

  // Helper for progress calculation
  const getStepNumber = (step: ScreenStep): number => {
    switch (step) {
      case 'intro':
        return 1;
      case 'apology':
        return 2;
      case 'untouchable':
        return 3;
      case 'outcome_yes':
      case 'outcome_no':
        return 3;
      case 'final':
        return 4;
      default:
        return 1;
    }
  };

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between overflow-x-hidden font-sans text-slate-800">
      {/* Dynamic festive ambient background (Strictly non-romantic) */}
      <BackgroundElements />

      {/* Sound toggle button */}
      <AudioToggle />

      {/* Main interactive screen viewport */}
      <main className="flex-1 flex items-center justify-center p-3 sm:p-6 w-full max-w-4xl mx-auto z-10 transition-all duration-300">
        {currentStep === 'intro' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenIntro onStart={handleStart} />
          </div>
        )}

        {currentStep === 'apology' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenApology onContinue={handleContinueFromApology} />
          </div>
        )}

        {currentStep === 'untouchable' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenUntouchable
              onSelectYes={handleSelectYes}
              onSelectNo={handleSelectNo}
            />
          </div>
        )}

        {currentStep === 'outcome_yes' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenOutcomeYes onContinue={handleContinueToFinal} />
          </div>
        )}

        {currentStep === 'outcome_no' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenOutcomeNo onContinue={handleContinueToFinal} />
          </div>
        )}

        {currentStep === 'final' && (
          <div className="w-full animate-[fadeIn_0.4s_ease-out]">
            <ScreenFinal onReplay={handleReplay} userChoice={userChoice} />
          </div>
        )}
      </main>

      {/* Subtle bottom footer with step indicator in Artistic Flair stone styling */}
      <footer className="w-full py-5 text-center z-10 relative select-none">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 backdrop-blur-xs border border-stone-200 text-xs text-stone-500 font-medium shadow-2xs">
          <span>Titli&apos;s Birthday 🎂</span>
          <span>•</span>
          <div className="flex gap-1.5 items-center">
            {[1, 2, 3, 4].map((stepNum) => {
              const currentNum = getStepNumber(currentStep);
              return (
                <div
                  key={stepNum}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    currentNum === stepNum
                      ? 'w-5 bg-stone-900'
                      : currentNum > stepNum
                      ? 'bg-stone-400'
                      : 'bg-stone-200'
                  }`}
                />
              );
            })}
          </div>
        </div>
      </footer>
    </div>
  );
}
