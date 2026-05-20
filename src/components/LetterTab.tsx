import React, { useState } from 'react';
import { triggerSoundEffect } from '../utils';
import { Mail, Edit3, Heart } from 'lucide-react';

interface LetterTabProps {
  partnerName: string;
}

export function LetterTab({ partnerName }: LetterTabProps) {
  const [isEditable, setIsEditable] = useState(false);
  const [letterBody, setLetterBody] = useState([
    `There are moments in life that feel like they've been plucked from a dream, and every second I've spent by your side is one of them. Looking back at our journey, from the smallest whispers to the grandest celebrations, my heart finds its home in your smile.`,
    `You have a way of turning the ordinary into something truly cinematic. The way the light catches your eyes, the quiet strength in your hands, and the kindness that flows from you like a soft spring breeze—it all makes me realize how lucky I am to share this life with you.`,
    `As you celebrate another year of life, my only wish is that you feel even a fraction of the joy you bring into the world every single day. You are my favorite story, my most cherished memory, and my brightest future.`,
    `May your day be as beautiful, as elegant, and as radiant as you are.`,
  ]);

  const handleTextChange = (index: number, newText: string) => {
    const updated = [...letterBody];
    updated[index] = newText;
    setLetterBody(updated);
  };

  const handleToggleEdit = () => {
    triggerSoundEffect();
    setIsEditable(!isEditable);
  };

  return (
    <div className="flex flex-col items-center flex-1 py-4 px-6 relative w-full overflow-hidden select-none fade-in">
      {/* Settings Toggle to customise message */}
      <div className="absolute top-2 right-4 z-20">
        <button
          onClick={handleToggleEdit}
          className="text-[10px] tracking-[0.05em] text-brand-outline hover:text-brand-primary flex items-center gap-1.5 py-1.5 px-3 bg-brand-sugar/80 rounded-full border border-brand-outline-light/20 shadow-sm cursor-pointer hover:scale-[1.02]"
        >
          <Edit3 className="w-3 h-3" />
          <span>{isEditable ? 'Save Message' : 'Personalize Letter'}</span>
        </button>
      </div>

      {/* Love Letter Frame */}
      <div className="w-full max-w-sm mt-8 mb-4 bg-brand-sugar border border-brand-outline-light/15 rounded-[32px] p-6 shadow-ambient relative z-10 text-center flex flex-col justify-between min-h-[500px]">
        {/* Sparkle icon at top right */}
        <div className="absolute top-4 right-4 text-brand-primary-light animate-pulse-slow">
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path d="M12 2l2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4z" />
          </svg>
        </div>

        {/* Small Cat Paw at the top center */}
        <div className="flex justify-center mb-6">
          <div className="text-brand-outline/85 w-6 h-6">
            <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
              <path d="M50,42.5 C45,42.5 41,46.5 41,51.5 C41,56.5 45,60.5 50,60.5 C55,60.5 59,56.5 59,51.5 C59,46.5 55,42.5 50,42.5 Z M25,32.5 C20,32.5 16,36.5 16,41.5 C16,46.5 20,50.5 25,50.5 C30,50.5 34,46.5 34,41.5 C34,36.5 30,32.5 25,32.5 Z M75,32.5 C70,32.5 66,36.5 66,41.5 C66,46.5 70,50.5 75,50.5 C80,50.5 84,46.5 84,41.5 C84,36.5 80,32.5 75,32.5 Z M50,12.5 C43,12.5 38.5,17 38.5,23 C38.5,29 43,33.5 50,33.5 C57,33.5 61.5,29 61.5,23 C61.5,17 57,12.5 50,12.5 Z" />
            </svg>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-between">
          <div>
            {/* Header */}
            <h3 className="font-serif text-2xl font-semibold text-brand-primary tracking-tight mb-6">
              To {partnerName === 'My Love' ? 'My Dearest' : partnerName},
            </h3>

            {/* Paragraphs */}
            <div className="space-y-4 text-xs font-serif italic text-brand-text-muted/95 leading-[1.75] font-light text-justify px-2">
              {letterBody.map((paragraph, idx) => (
                <div key={idx}>
                  {isEditable ? (
                    <textarea
                      value={paragraph}
                      onChange={(e) => handleTextChange(idx, e.target.value)}
                      rows={4}
                      className="w-full p-2 text-xs font-serif italic bg-brand-surface border border-brand-outline-light/40 rounded-xl focus:ring-1 focus:ring-brand-primary focus:outline-none resize-none"
                    />
                  ) : (
                    <p className="indent-4">{paragraph}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Signature matching the screenshot */}
          <div className="mt-8 border-t border-brand-outline-light/10 pt-6 flex flex-col items-center">
            <span className="text-[9px] uppercase tracking-[0.2em] text-brand-text-muted/60 font-sans font-bold">
              FOREVER & ALWAYS,
            </span>
            <div className="flex items-center gap-2 mt-2">
              {/* RK decorative leaves */}
              <div className="flex items-center gap-1 opacity-70 text-brand-outline">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21V9m0 0a3 3 0 013-3V3m-3 6a3 3 0 00-3-3V3" />
                </svg>
                <span className="text-xs font-sans tracking-wide font-semibold text-brand-primary">RK</span>
              </div>
              <span className="font-serif text-lg italic text-brand-primary font-medium tracking-wide">
                With Love
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bird Footer design representing "A lifetime of moments together" */}
      <div className="flex flex-col items-center mt-3 mb-6 opacity-85">
        <div className="w-10 h-10 text-brand-outline/80">
          {/* Detailed Little elegant bird silhouette */}
          <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="4" className="w-full h-full">
            <path d="M30 40 C30 40, 40 30, 55 30 C70 30, 80 40, 80 55 C80 65, 75 70, 70 70 M30 40 C20 40, 15 50, 15 60 C15 70, 25 70, 30 70 M30 70 L25 85 M35 70 L35 85 M55 70 L55 85" strokeLinecap="round" />
            <circle cx="65" cy="42" r="4" fill="currentColor" />
          </svg>
        </div>
        <span className="text-[10px] font-sans text-brand-text-muted/65 tracking-[0.1em] mt-1">
          A lifetime of moments together
        </span>
      </div>
    </div>
  );
}
