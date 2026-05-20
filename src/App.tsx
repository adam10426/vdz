/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { FallingPetals } from './components/FallingPetals';
import { TimerTab } from './components/TimerTab';
import { CelebrateTab } from './components/CelebrateTab';
import { MemoryTab } from './components/MemoryTab';
import { LetterTab } from './components/LetterTab';
import { ActiveTab } from './types';
import { triggerSoundEffect } from './utils';
import { Heart, Sparkles, X, Settings2, HelpCircle } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('timer');
  const [partnerName, setPartnerName] = useState('My Love');
  const [targetDate, setTargetDate] = useState(() => {
    const targetDate = new Date('2026-05-24T00:00:00Z');
    return targetDate.toISOString().slice(0, 16); // format: YYYY-MM-DDTHH:mm
  });

  const [hasUnlocked, setHasUnlocked] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Simple state persistence
  useEffect(() => {
    const savedName = localStorage.getItem('partnerName');
    const savedDate = localStorage.getItem('targetDate');
    const savedUnlocked = localStorage.getItem('hasUnlocked');

    if (savedName) setPartnerName(savedName);
    if (savedDate) setTargetDate(savedDate);
    if (savedUnlocked === 'true') setHasUnlocked(true);
  }, []);

  const savePartnerName = (val: string) => {
    setPartnerName(val);
    localStorage.setItem('partnerName', val);
  };

  const saveTargetDate = (val: string) => {
    setTargetDate(val);
    localStorage.setItem('targetDate', val);
  };

  const handleUnlockSurprise = () => {
    // triggerSoundEffect();
    setHasUnlocked(true);
    localStorage.setItem('hasUnlocked', 'true');
    setActiveTab('celebrate');
  };

  const handleFastForward = () => {
    triggerSoundEffect();
    // Move targetDate to 5 seconds ago to force target completion
    const pastTime = new Date(Date.now() - 5000).toISOString().slice(0, 16);
    saveTargetDate(pastTime);
    setHasUnlocked(true);
    localStorage.setItem('hasUnlocked', 'true');
  };

  const handleReset = () => {
    triggerSoundEffect();
    // Reset to defaults
    const tomorrow = new Date(Date.now() + 28 * 60 * 60 * 1000).toISOString().slice(0, 16);
    savePartnerName('My Love');
    saveTargetDate(tomorrow);
    setHasUnlocked(false);
    localStorage.removeItem('hasUnlocked');
    setActiveTab('timer');
    setShowSettings(false);
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col justify-center items-center p-0 md:p-6 select-none font-sans overflow-x-hidden relative">
      {/* Decorative wide blurry ambient glow background blobs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-3/4 w-[350px] h-[350px] rounded-full bg-brand-primary-light/10 blur-[90px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/2 translate-x-3/4 w-[350px] h-[350px] rounded-full bg-brand-tertiary-light/10 blur-[90px] pointer-events-none z-0" />

      {/* Main Glassmorphic Mobile Container Frame */}
      <div className="w-full max-w-md min-h-screen md:min-h-[780px] md:max-h-[820px] md:rounded-[40px] bg-gradient-to-b from-[#fdfbf7] to-[#faedf3] border border-brand-outline-light/15 shadow-2xl flex flex-col justify-between overflow-hidden relative z-10">
        
        {/* Soft floating background blossom particles */}
        <FallingPetals />

        {/* 1. Header Bar matching screenshots perfectly */}
        <header className="flex items-center justify-between px-6 py-4 border-b border-brand-outline-light/10 bg-white/45 backdrop-blur-sm z-20">
          {/* Sparkle icon at left */}
          <div className="text-brand-primary w-5 h-5 flex items-center justify-center">
            <Sparkles className="w-5 h-5 animate-pulse-slow" />
          </div>

          {/* Centered Logo text */}
          <h1 className="font-serif italic text-2xl font-medium tracking-wide text-brand-primary">
            Our Story
          </h1>

          {/* Interactive Heart Button on the right (opens settings!) */}
          <button
            title="Celebration Settings"
            className="text-brand-primary hover:scale-110 active:scale-95 transition-transform p-1 rounded-full cursor-pointer"
          >
            <Heart className="w-5 h-5 fill-brand-primary/10 hover:fill-brand-primary" />
          </button>
        </header>

        {/* 2. Scrollable Body Content */}
        <main className="flex-1 flex flex-col relative overflow-y-auto scrollbar-none z-10 bg-transparent">
          {activeTab === 'timer' && (
            <TimerTab
              partnerName={partnerName}
              targetDate={targetDate}
              onUnlock={handleUnlockSurprise}
              onFastForward={handleFastForward}
            />
          )}

          {activeTab === 'celebrate' && (
            <CelebrateTab
              partnerName={partnerName}
              onProceed={() => setActiveTab('memory')}
            />
          )}

          {activeTab === 'memory' && (
            <MemoryTab onNext={() => setActiveTab('letter')} />
          )}

          {activeTab === 'letter' && (
            <LetterTab partnerName={partnerName} />
          )}
        </main>

        {/* 3. Bottom Tab Navigation matching screenshots perfectly */}
        {/* <footer className="border-t border-brand-outline-light/10 bg-white/70 backdrop-blur-md px-6 py-3 z-20">
          <div className="flex justify-around items-end"> */}
            
            {/* Tab: Timer */}
            {/* <button
              onClick={() => {
                triggerSoundEffect();
                setActiveTab('timer');
              }}
              className="flex flex-col items-center gap-1.5 flex-1 relative cursor-pointer"
            >
              <div className={`px-5 py-1.5 rounded-full transition-all duration-300 ${
                activeTab === 'timer' ? 'bg-brand-primary/15 text-brand-primary font-semibold' : 'text-brand-text-muted/65 hover:text-brand-primary'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4M6 20h12" />
                </svg>
              </div>
              <span className={`text-[10px] tracking-wider font-sans uppercase font-medium transition-all ${
                activeTab === 'timer' ? 'text-brand-primary font-bold' : 'text-brand-text-muted/60'
              }`}>
                Timer
              </span>
            </button> */}

            {/* Tab: Celebrate */}
            {/* <button
              onClick={() => {
                triggerSoundEffect();
                if (!hasUnlocked) {
                  const ok = window.confirm("The surprise is locked behind the countdown. Would you like to check the celebration screen directly?");
                  if (ok) {
                    handleFastForward();
                    setActiveTab('celebrate');
                  }
                  return;
                }
                setActiveTab('celebrate');
              }}
              className="flex flex-col items-center gap-1.5 flex-1 relative cursor-pointer"
            >
              <div className={`px-5 py-1.5 rounded-full transition-all duration-300 ${
                activeTab === 'celebrate' ? 'bg-brand-primary/15 text-brand-primary font-semibold' : 'text-brand-text-muted/65 hover:text-brand-primary'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V6a2 2 0 10-2 2h2zm0 13H4a2 2 0 01-2-2V9a2 2 0 012-2h16a2 2 0 012 2v10a2 2 0 01-2 2h-8z" />
                </svg>
              </div>
              <span className={`text-[10px] tracking-wider font-sans uppercase font-medium transition-all ${
                activeTab === 'celebrate' ? 'text-brand-primary font-bold' : 'text-brand-text-muted/60'
              }`}>
                Celebrate
              </span>
            </button> */}

            {/* Tab: Memory */}
            {/* <button
              onClick={() => {
                triggerSoundEffect();
                setActiveTab('memory');
              }}
              className="flex flex-col items-center gap-1.5 flex-1 relative cursor-pointer"
            >
              <div className={`px-5 py-1.5 rounded-full transition-all duration-300 ${
                activeTab === 'memory' ? 'bg-brand-primary/15 text-brand-primary font-semibold' : 'text-brand-text-muted/65 hover:text-brand-primary'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <span className={`text-[10px] tracking-wider font-sans uppercase font-medium transition-all ${
                activeTab === 'memory' ? 'text-brand-primary font-bold' : 'text-brand-text-muted/60'
              }`}>
                Memory
              </span>
            </button> */}

            {/* Tab: Letter */}
            {/* <button
              onClick={() => {
                triggerSoundEffect();
                setActiveTab('letter');
              }}
              className="flex flex-col items-center gap-1.5 flex-1 relative cursor-pointer"
            >
              <div className={`px-5 py-1.5 rounded-full transition-all duration-300 ${
                activeTab === 'letter' ? 'bg-brand-primary/15 text-brand-primary font-semibold' : 'text-brand-text-muted/65 hover:text-brand-primary'
              }`}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className={`text-[10px] tracking-wider font-sans uppercase font-medium transition-all ${
                activeTab === 'letter' ? 'text-brand-primary font-bold' : 'text-brand-text-muted/60'
              }`}>
                Letter
              </span>
            </button> */}

          {/* </div>
        </footer> */}

        {/* 4. Elegant Settings Sidebar / Drawer component */}
        {showSettings && (
          <div className="absolute inset-0 bg-black/45 backdrop-blur-sm z-40 transition-all flex items-end justify-center md:rounded-[40px]">
            <div className="w-full bg-brand-sugar rounded-t-[36px] p-6 max-h-[85%] overflow-y-auto shadow-2xl relative border-t-2 border-brand-outline-light/20">
              
              {/* Header */}
              <div className="flex items-center justify-between border-b border-brand-outline-light/10 pb-4 mb-5">
                <div className="flex items-center gap-2">
                  <Settings2 className="w-4 h-4 text-brand-primary" />
                  <h3 className="font-serif text-lg font-semibold text-brand-primary">
                    Keepsake Builder
                  </h3>
                </div>
                <button
                  onClick={() => {
                    // triggerSoundEffect();
                    setShowSettings(false);
                  }}
                  className="p-1 text-brand-text-muted hover:text-brand-primary hover:bg-brand-primary-light/10 rounded-full transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Form Controls */}
              <div className="space-y-4">
                
                {/* Partner Name Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-outline">
                    Partner's Name
                  </label>
                  <input
                    type="text"
                    value={partnerName}
                    onChange={(e) => savePartnerName(e.target.value)}
                    placeholder="e.g., Emily, John, My Love"
                    className="w-full px-4 py-3 text-xs bg-[#f5f2ed] border border-brand-outline-light/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
                  />
                </div>

                {/* Target Birthday Datetime Picker */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-sans font-bold uppercase tracking-wider text-brand-outline">
                    Surprise Release Countdown
                  </label>
                  <input
                    type="datetime-local"
                    value={targetDate}
                    onChange={(e) => saveTargetDate(e.target.value)}
                    className="w-full px-4 py-3 text-xs bg-[#f5f2ed] border border-brand-outline-light/40 rounded-xl focus:outline-none focus:ring-1 focus:ring-brand-primary font-medium"
                  />
                  <span className="text-[9px] text-brand-text-muted/60 font-serif italic mt-0.5">
                    Set a future date to show counting down, or set a past date to test the immediate unlock bloom!
                  </span>
                </div>

                {/* Quick actions line */}
                <div className="pt-3 flex gap-2 w-full">
                  <button
                    onClick={() => {
                      handleFastForward();
                      setShowSettings(false);
                      setActiveTab('celebrate');
                    }}
                    className="flex-1 py-3 bg-brand-primary text-white hover:bg-brand-primary/95 font-sans font-semibold text-2xs uppercase tracking-wider rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    Force Bloom 🌸
                  </button>
                  <button
                    onClick={handleReset}
                    className="flex-1 py-3 bg-transparent text-brand-text-muted hover:text-brand-primary hover:bg-brand-primary-light/15 font-sans font-semibold text-2xs uppercase tracking-wider rounded-xl border border-brand-outline-light/40 transition-all cursor-pointer"
                  >
                    Reset defaults
                  </button>
                </div>
              </div>

              {/* Informative info bubble */}
              <div className="mt-6 p-3 bg-brand-primary-light/10 border border-brand-primary-light/20 rounded-xl text-center">
                <p className="text-[10px] text-brand-text-muted/90 font-serif italic leading-normal">
                  💡 This keepsake stores edits automatically inside your local storage device. Customize it with your favourite stories and share!
                </p>
              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
