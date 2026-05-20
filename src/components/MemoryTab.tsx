import React, { useState } from 'react';
import { triggerSoundEffect } from '../utils';
import { ChevronLeft, ChevronRight, Plus, Sparkles } from 'lucide-react';

interface Memory {
  id: number;
  title: string;
  description: string;
  image: string;
}

interface MemoryTabProps {
  onNext: () => void;
}

export function MemoryTab({ onNext }: MemoryTabProps) {
  const [memories, setMemories] = useState<Memory[]>([
    {
      id: 1,
      title: 'Gentle Purrs',
      description: 'Where it all began, with soft paws and warm hearts.',
      image: '/src/assets/images/cuddling_kittens_1779239106154.png',
    },
    {
      id: 2,
      title: 'First Touch',
      description: 'Holding hands amidst plumeria blossoms. Soft, warm, and true.',
      image: '/src/assets/images/hands_holding_1779239154534.png',
    },
    {
      id: 3,
      title: 'Sweet Sanctuary',
      description: 'Laughing under golden sun rays, carving out our little piece of eternity.',
      image: '/src/assets/images/picnic_under_tree_1779239288204.png',
    },
  ]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');

  const handleNextCard = () => {
    triggerSoundEffect();
    setActiveIndex((prev) => (prev + 1) % memories.length);
  };

  const handlePrevCard = () => {
    triggerSoundEffect();
    setActiveIndex((prev) => (prev - 1 + memories.length) % memories.length);
  };

  const handleAddMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) return;

    triggerSoundEffect();
    const newMemory: Memory = {
      id: Date.now(),
      title: newTitle,
      description: newDesc,
      // Default to Picsum if we don't have a file uploader
      image: `https://picsum.photos/seed/${newTitle.length + Date.now()}/400/400`,
    };

    setMemories([...memories, newMemory]);
    setActiveIndex(memories.length); // switch to the newly created memory!
    setNewTitle('');
    setNewDesc('');
    setShowAddForm(false);
  };

  return (
    <div className="flex flex-col items-center justify-between flex-1 py-4 px-6 relative w-full overflow-hidden select-none text-center fade-in">
      {/* Title block */}
      <div className="z-10 mt-6 px-4">
        <h2 className="font-serif text-[32px] font-semibold text-brand-primary tracking-tight">
          Moments in Time
        </h2>
        <p className="text-xs font-sans text-brand-text-muted/90 mt-1 max-w-xs mx-auto leading-relaxed">
          Swipe through the chapters of our journey together.
        </p>
      </div>

      {/* Carousel block */}
      <div className="w-full max-w-sm my-6 relative flex flex-col items-center z-10">
        <div className="w-full relative px-6 flex items-center justify-center">
          {/* Left Button */}
          <button
            onClick={handlePrevCard}
            className="absolute left-0 w-8 h-8 rounded-full bg-brand-sugar/80 border border-brand-outline-light/30 flex items-center justify-center text-brand-primary shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Card Frame (Screenshot styled) */}
          <div className="w-full bg-brand-sugar rounded-[28px] border border-brand-outline-light/15 p-5 shadow-ambient flex flex-col items-center select-none max-w-[280px]">
            <img
              src={memories[activeIndex].image}
              alt={memories[activeIndex].title}
              className="w-full h-[180px] object-cover rounded-[20px] shadow-sm select-none"
              referrerPolicy="no-referrer"
            />
            <h3 className="font-serif text-xl font-medium text-brand-primary tracking-tight mt-5 mb-1">
              {memories[activeIndex].title}
            </h3>
            <p className="font-serif italic text-xs text-brand-text-muted/90 leading-relaxed px-2 text-center">
              &ldquo;{memories[activeIndex].description}&rdquo;
            </p>
          </div>

          {/* Right Button */}
          <button
            onClick={handleNextCard}
            className="absolute right-0 w-8 h-8 rounded-full bg-brand-sugar/80 border border-brand-outline-light/30 flex items-center justify-center text-brand-primary shadow-sm hover:scale-105 active:scale-95 cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex justify-center gap-1.5 mt-5">
          {memories.map((_, index) => (
            <span
              key={index}
              onClick={() => {
                triggerSoundEffect();
                setActiveIndex(index);
              }}
              className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                index === activeIndex ? 'w-4 bg-brand-primary' : 'w-2 bg-brand-outline-light/40'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Sweet add memory container */}
      <div className="w-full z-10 px-4 mb-2">
        {!showAddForm ? (
          <button
            onClick={() => setShowAddForm(true)}
            className="text-[10px] tracking-[0.08em] uppercase font-sans font-semibold text-brand-outline hover:text-brand-primary flex items-center justify-center gap-1 mx-auto py-1 cursor-pointer"
          >
            <Plus className="w-3 h-3" /> Add custom memory chapter
          </button>
        ) : (
          <form
            onSubmit={handleAddMemory}
            className="glassmorphic p-4 rounded-2xl text-left max-w-[280px] mx-auto mt-2"
          >
            <h4 className="font-serif text-xs font-bold text-brand-primary mb-2 uppercase tracking-wide">
              New Journey Chapter
            </h4>
            <input
              type="text"
              placeholder="Chapter Title (e.g., First Coffee)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 text-xs bg-brand-sugar/80 rounded-lg border border-brand-outline-light/30 mb-2 focus:ring-1 focus:ring-brand-primary focus:outline-none"
              required
            />
            <textarea
              placeholder="Where it all began..."
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              rows={2}
              className="w-full p-2 text-xs bg-brand-sugar/80 rounded-lg border border-brand-outline-light/30 mb-2 focus:ring-1 focus:ring-brand-primary focus:outline-none resize-none"
              required
            />
            <div className="flex gap-2 justify-end">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-2.5 py-1 text-[10px] text-brand-text-muted hover:underline uppercase tracking-wider cursor-pointer font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-3 py-1 bg-brand-primary text-white text-[10px] rounded-full uppercase tracking-wider cursor-pointer hover:bg-brand-primary/95 transition-colors font-semibold shadow-sm"
              >
                Add Chapter
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Action Button at bottom */}
      <div className="w-full z-10 mt-auto mb-4 flex justify-center">
        <button
          onClick={() => {
            triggerSoundEffect();
            onNext();
          }}
          className="relative inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-gradient-to-r from-brand-primary to-brand-tertiary text-white font-sans text-xs font-semibold uppercase tracking-wider shadow-md hover:scale-[1.03] transition-transform duration-300 active:scale-95 cursor-pointer"
        >
          <span>Continue Our Journey</span>
          <Sparkles className="w-3.5 h-3.5 text-brand-secondary-light" />
        </button>
      </div>
    </div>
  );
}
