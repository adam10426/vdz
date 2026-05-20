import React, { useEffect, useState } from 'react';
import { calculateTimeRemaining, triggerSoundEffect } from '../utils';
import { CountdownTime } from '../types';
import { Sparkles } from 'lucide-react';

interface TimerTabProps {
  partnerName: string;
  targetDate: string;
  onUnlock: () => void;
  onFastForward: () => void;
}

export function TimerTab({ partnerName, targetDate, onUnlock, onFastForward }: TimerTabProps) {
  const [time, setTime] = useState<CountdownTime>(calculateTimeRemaining(targetDate));
  const [showFastForwardOption, setShowFastForwardOption] = useState(false);

  useEffect(() => {
    // Initial Tick
    setTime(calculateTimeRemaining(targetDate));

    const interval = setInterval(() => {
      setTime(calculateTimeRemaining(targetDate));
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  const handleUnlockClick = () => {
    if (time.isCompleted) {
      onUnlock();
    } else {
      // If the countdown is still ticking, we show a beautiful option letting them "fast forward" 
      // to test/experience the birthday bloom! This represents impeccable usability design.
      setShowFastForwardOption(true);
    }
  };

  const padZero = (num: number) => {
    return num.toString().padStart(2, '0');
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 py-4 px-6 relative w-full overflow-hidden select-none text-center fade-in">
      {/* Dog Paw Watermark */}
      <div className="absolute top-2 w-40 h-40 opacity-[0.06] text-brand-primary pointer-events-none select-none z-0">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M50,42.5 C45,42.5 41,46.5 41,51.5 C41,56.5 45,60.5 50,60.5 C55,60.5 59,56.5 59,51.5 C59,46.5 55,42.5 50,42.5 Z M25,32.5 C20,32.5 16,36.5 16,41.5 C16,46.5 20,50.5 25,50.5 C30,50.5 34,46.5 34,41.5 C34,36.5 30,32.5 25,32.5 Z M75,32.5 C70,32.5 66,36.5 66,41.5 C66,46.5 70,50.5 75,50.5 C80,50.5 84,46.5 84,41.5 C84,36.5 80,32.5 75,32.5 Z M50,12.5 C43,12.5 38.5,17 38.5,23 C38.5,29 43,33.5 50,33.5 C57,33.5 61.5,29 61.5,23 C61.5,17 57,12.5 50,12.5 Z M18,59.5 C15,59.5 12,62 12,66 C12,71 16,77 24,77 C32,77 36,71 36,66 C36,62 33,59.5 30,59.5 Z M82,59.5 C79,59.5 76,62 76,66 C76,71 80,77 88,77 C96,77 100,71 100,66 C100,62 97,59.5 94,59.5 Z" />
        </svg>
      </div>

      {/* Bird Outline Watermark at the bottom right */}
      <div className="absolute bottom-16 right-0 w-36 h-36 opacity-[0.05] text-brand-primary pointer-events-none z-0">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="w-full h-full">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
        </svg>
      </div>

      <div className="mt-8 z-10">
        <span className="text-xs uppercase tracking-[0.25em] font-sans font-semibold text-brand-text-muted/80 block mb-6 px-4">
          SOMETHING SPECIAL IS WAITING FOR YOU...
        </span>
        <h1 className="font-serif text-[38px] md:text-[44px] leading-tight font-medium text-brand-primary tracking-tight px-4 max-w-lg mx-auto">
          A surprise blooms when the time arrives.
        </h1>
      </div>

      {/* Countdown Area */}
      <div className="w-full max-w-sm my-10 px-4 z-10">
        <div className="glassmorphic rounded-[24px] shadow-ambient py-8 px-6 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl font-bold text-brand-primary tracking-tight md:text-5xl">
              {padZero(time.days)}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-brand-text-muted mt-2">
              Days
            </span>
          </div>
          <div className="w-[1px] h-12 bg-brand-outline-light/30" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl font-bold text-brand-primary tracking-tight md:text-5xl">
              {padZero(time.hours)}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-brand-text-muted mt-2">
              Hours
            </span>
          </div>
          <div className="w-[1px] h-12 bg-brand-outline-light/30" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl font-bold text-brand-primary tracking-tight md:text-5xl">
              {padZero(time.minutes)}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-brand-text-muted mt-2">
              Mins
            </span>
          </div>
          <div className="w-[1px] h-12 bg-brand-outline-light/30" />
          <div className="flex flex-col items-center">
            <span className="font-serif text-4xl font-bold text-brand-primary tracking-tight md:text-5xl">
              {padZero(time.seconds)}
            </span>
            <span className="text-[10px] uppercase tracking-wider font-sans font-medium text-brand-text-muted mt-2">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* Unlock / patience group */}
      <div className="w-full flex flex-col items-center gap-12 z-10 mt-auto mb-4">
        <p className="font-serif italic text-lg text-brand-text-muted/95 max-w-xs mx-auto">
          Just a little more patience, {partnerName}.
        </p>

        <button
          onClick={handleUnlockClick}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-brand-primary to-brand-tertiary text-white font-sans text-sm font-semibold uppercase tracking-wider shadow-lg shadow-brand-primary/20 hover:scale-[1.03] transition-transform duration-300 active:scale-95 cursor-pointer"
        >
          <span>Unlock the Surprise</span>
          <Sparkles className="w-4 h-4 text-brand-secondary-light" />
        </button>
      </div>

      {/* Elegant Modal for testing countdown / fast forwarding */}
      {showFastForwardOption && (
        <div className="absolute inset-0 bg-black/40 backdrop-blur-md z-30 flex items-center justify-center p-6 transition-all">
          <div className="glassmorphic-gold max-w-xs w-full p-6 rounded-[24px] text-center shadow-2xl relative">
            <h3 className="font-serif text-2xl text-brand-primary font-semibold mb-3">
              Impatience of Love
            </h3>
            <p className="text-sm text-brand-text-muted mb-6 leading-relaxed">
              The sweet surprise is scheduled for your birthday! Please have some patience love :)
            </p>
            <div className="flex flex-col gap-2">
              {/* <button
                onClick={() => {
                  onFastForward();
                  setShowFastForwardOption(false);
                  onUnlock();
                }}
                className="w-full py-3 bg-brand-primary text-white rounded-full font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-brand-primary/95 transition-colors"
              >
                Let It Bloom ➔
              </button> */}
              <button
                onClick={() => setShowFastForwardOption(false)}
                className="w-full py-3 bg-transparent text-brand-text-muted border border-brand-outline-light/40 rounded-full font-sans text-xs font-semibold uppercase tracking-wider cursor-pointer hover:bg-white/45 transition-colors"
              >
                I Will Wait
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
