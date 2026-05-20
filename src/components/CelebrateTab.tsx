import React, { useState } from 'react';
import { triggerSoundEffect } from '../utils';
import { ArrowRight, Sparkles } from 'lucide-react';

interface CelebrateTabProps {
  partnerName: string;
  onProceed: () => void;
}

export function CelebrateTab({ partnerName, onProceed }: CelebrateTabProps) {
  const [candlesLit, setCandlesLit] = useState(true);
  const [blewOut, setBlewOut] = useState(false);

  const handleBlowOut = () => {
    // triggerSoundEffect();
    setCandlesLit(false);
    setBlewOut(true);
    setTimeout(() => {
      // Small delay just to enjoy the blow out effect
    }, 1500);
  };

  const handleRelight = () => {
    // triggerSoundEffect();
    setCandlesLit(true);
    setBlewOut(false);
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 py-4 px-6 relative w-full overflow-hidden select-none text-center fade-in">
      {/* Decorative stars / dots background particles */}
      <div className="absolute top-10 left-10 w-2 h-2 rounded-full bg-brand-secondary/30 animate-pulse" />
      <div className="absolute top-1/4 right-8 w-3 h-3 rounded-full bg-brand-primary-light/40 animate-pulse-slow" />
      <div className="absolute bottom-1/3 left-12 w-2 h-2 rounded-full bg-brand-tertiary-light/50" />
      <div className="absolute top-1/2 left-4 w-1.5 h-1.5 rounded-full bg-brand-outline-light/40" />

      {/* Sweet Star Icon at top */}
      <div className="z-10 mt-6 flex flex-col items-center">
        <div className="w-8 h-8 rounded-full bg-brand-secondary-light/60 flex items-center justify-center text-brand-secondary mb-3">
          <svg viewBox="0 0 100 100" fill="currentColor" className="w-4 h-4">
            <path d="M50,0 L65,35 L100,35 L70,60 L85,100 L50,75 L15,100 L30,60 L0,35 L35,35 Z" />
          </svg>
        </div>
        <h2 className="font-serif text-3xl font-bold text-brand-primary tracking-tight">
          Happy Birthday
        </h2>
        <h3 className="font-serif italic text-2xl text-brand-secondary tracking-wide">
          {partnerName === 'My Love' ? 'My Love' : partnerName}
        </h3>
      </div>

      {/* Main Luxury Cake Image with Glassmorphism Border */}
      <div className="relative w-full max-w-[280px] my-6 z-10">
        <div className="relative overflow-hidden rounded-[20px] bg-brand-sugar p-1 outline-1 outline-neutral-200">
          <img
            src="/src/assets/images/birthday_cake_1779239080298.png"
            alt="Beautiful Birthday Cake"
            className={`w-full h-[280px] object-cover rounded-[19px] transition-all duration-700 ${
              !candlesLit ? 'brightness-75 contrast-105' : 'brightness-100'
            }`}
            referrerPolicy="no-referrer"
          />

          {/* Sparkles / Candleglow overlays */}
          {/* {candlesLit ? (
            <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
              <div className="absolute top-[28%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex gap-4">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-300 animate-ping opacity-75" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-ping opacity-60 delay-300" />
              </div>
            </div>
          ) : null} */}

          {/* Sweet "Blew Out" Overlay */}
          {blewOut && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center pointer-events-none rounded-[19px]">
              <div className="text-white text-xs bg-white/20 backdrop-blur-md px-4 py-2 rounded-full font-serif italic tracking-wide">
                💨 Sparkly wishes made!
              </div>
            </div>
          )}
        </div>

        {/* virtual candle interact */}
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 z-20">
          {candlesLit ? (
            <button
              onClick={handleBlowOut}
              className="px-4 py-1.5 bg-brand-sugar border border-brand-outline-light/40 hover:border-brand-primary rounded-full font-sans text-[10px] font-semibold tracking-wider text-brand-primary uppercase shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all active:scale-95"
            >
              Blow out the candles 🌬️
            </button>
          ) : (
            <button
              onClick={handleRelight}
              className="px-4 py-1.5 bg-brand-sugar border border-brand-outline-light/40 hover:border-brand-primary rounded-full font-sans text-[10px] font-semibold tracking-wider text-brand-text-muted uppercase shadow-md flex items-center gap-1.5 cursor-pointer hover:scale-105 transition-all active:scale-95"
            >
              Relight candles ✨
            </button>
          )}
        </div>
      </div>

      <div className="z-10 max-w-xs mt-3">
        <p className="text-sm font-sans leading-relaxed text-brand-text-muted px-4">
          A day as beautiful as your soul, a moment as timeless as our love.
        </p>
      </div>

      {/* Proceed Button */}
      <div className="w-full z-10 mt-6 mb-4 flex justify-center">
        <button
          onClick={() => {
            // triggerSoundEffect();
            onProceed();
          }}
          className="group flex items-center gap-2 px-6 py-3 rounded-full border border-brand-outline/40 hover:border-brand-primary bg-brand-sugar/80 backdrop-blur-sm font-sans text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary transition-all duration-300 hover:scale-[1.02] active:scale-95 cursor-pointer shadow-sm"
        >
          <span>Memories</span>
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 duration-300" />
        </button>
      </div>
    </div>
  );
}
