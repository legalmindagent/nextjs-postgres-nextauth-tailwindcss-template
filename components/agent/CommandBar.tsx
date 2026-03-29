'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Zap } from 'lucide-react';

interface CommandBarProps {
  onSubmit: (cmd: string) => void;
  thinking: boolean;
  onVoiceToggle: (active: boolean) => void;
  voiceActive: boolean;
}

export default function CommandBar({ onSubmit, thinking, onVoiceToggle, voiceActive }: CommandBarProps) {
  const [value, setValue] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!value.trim() || thinking) return;
    onSubmit(value.trim());
    setValue('');
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const hints = [
    'analyze legal case',
    'open data matrix',
    'show neural map',
    'scan document',
    'run diagnostics',
    'open image lab',
    'show metrics',
    'clear all panels'
  ];

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Hint chips */}
      <div className="flex flex-wrap gap-1.5 justify-center mb-3">
        {hints.map((hint) => (
          <button
            key={hint}
            onClick={() => { onSubmit(hint); }}
            className="px-2.5 py-1 rounded-full text-[10px] tracking-wider uppercase font-medium text-sky-400/70 border border-sky-500/20 hover:border-sky-400/50 hover:text-sky-300 hover:bg-sky-400/5 transition-all"
          >
            {hint}
          </button>
        ))}
      </div>

      {/* Input bar */}
      <form onSubmit={handleSubmit}>
        <div
          className="relative flex items-center rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(0,8,20,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(56,189,248,0.25)',
            boxShadow: '0 0 30px rgba(56,189,248,0.1), inset 0 1px 0 rgba(255,255,255,0.05)'
          }}
        >
          {/* Left icon */}
          <div className="pl-4 pr-2 flex-shrink-0">
            <AnimatePresence mode="wait">
              {thinking ? (
                <motion.div key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Zap className="h-4 w-4 text-amber-400 animate-pulse" />
                </motion.div>
              ) : (
                <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Zap className="h-4 w-4 text-sky-500/60" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder={thinking ? 'Processing command…' : 'Command JARVIS — press / to focus'}
            disabled={thinking}
            className="flex-1 bg-transparent py-3.5 text-sm text-white placeholder:text-white/25 focus:outline-none disabled:opacity-50"
            style={{ caretColor: '#38bdf8' }}
          />

          {/* Voice toggle */}
          <button
            type="button"
            onClick={() => onVoiceToggle(!voiceActive)}
            className={`p-3 mx-1 rounded-xl transition-all ${voiceActive ? 'bg-red-500/20 text-red-400' : 'text-white/30 hover:text-white/60 hover:bg-white/5'}`}
          >
            {voiceActive ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
          </button>

          {/* Submit */}
          <button
            type="submit"
            disabled={!value.trim() || thinking}
            className="flex items-center gap-1.5 mr-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide uppercase transition-all disabled:opacity-30"
            style={{
              background: value.trim() && !thinking ? 'rgba(56,189,248,0.15)' : 'transparent',
              color: value.trim() && !thinking ? '#38bdf8' : 'rgba(255,255,255,0.3)',
              border: `1px solid ${value.trim() && !thinking ? 'rgba(56,189,248,0.4)' : 'transparent'}`
            }}
          >
            <Send className="h-3 w-3" />
            <span>Send</span>
          </button>
        </div>
      </form>

      {/* Scanning line under input */}
      <motion.div
        className="h-px mt-0.5 rounded-full"
        style={{ background: 'linear-gradient(90deg, transparent, rgba(56,189,248,0.6), transparent)' }}
        animate={{ opacity: [0.3, 0.8, 0.3] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}
