/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CountdownTime } from './types';

export function calculateTimeRemaining(targetDate: string): CountdownTime {
  const diff = new Date(targetDate).getTime() - new Date().getTime();

  if (diff <= 0) {
    return {
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
      isCompleted: true,
    };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  return {
    days,
    hours,
    minutes,
    seconds,
    isCompleted: false,
  };
}

// Sparkle utility for sound or confetti-like visual highlights
export function triggerSoundEffect() {
  // Simple synthesised high-pitch harp/bell sound using Web Audio API for extreme polish!
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // Play a sequence of 3 magical notes
    const playNote = (freq: number, delay: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime + delay);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + delay + dur);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + delay);
      osc.stop(ctx.currentTime + delay + dur);
    };

    playNote(523.25, 0, 0.4);       // C5
    playNote(659.25, 0.15, 0.45);    // E5
    playNote(783.99, 0.3, 0.5);      // G5
    playNote(1046.50, 0.45, 0.6);    // C6
  } catch (e) {
    console.warn('Audio contextual initialization failed', e);
  }
}
