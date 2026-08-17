import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { sounds } from '../utils/sound';

export const AudioToggle: React.FC = () => {
  const [enabled, setEnabled] = useState(true);

  const handleToggle = () => {
    const newState = sounds.toggleSound();
    setEnabled(newState);
    if (newState) {
      sounds.playClick();
    }
  };

  return (
    <button
      onClick={handleToggle}
      className="fixed top-5 right-5 z-50 p-3 rounded-full bg-white/90 border border-stone-200 shadow-sm hover:shadow-md hover:bg-stone-50 transition-all active:scale-95 text-stone-700 hover:text-stone-900 cursor-pointer"
      title={enabled ? 'Mute sound effects' : 'Enable sound effects'}
      aria-label={enabled ? 'Mute sound effects' : 'Enable sound effects'}
    >
      {enabled ? <Volume2 size={18} /> : <VolumeX size={18} className="text-stone-400" />}
    </button>
  );
};
