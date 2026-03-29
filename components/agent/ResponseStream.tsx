'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

export interface Message {
  id: string;
  role: 'user' | 'agent';
  text: string;
  timestamp: Date;
}

interface ResponseStreamProps {
  messages: Message[];
}

function TypewriterText({ text, isNew }: { text: string; isNew: boolean }) {
  const [displayed, setDisplayed] = useState(isNew ? '' : text);

  useEffect(() => {
    if (!isNew) { setDisplayed(text); return; }
    setDisplayed('');
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) clearInterval(interval);
    }, 18);
    return () => clearInterval(interval);
  }, [text, isNew]);

  return (
    <span>
      {displayed}
      {isNew && displayed.length < text.length && (
        <motion.span
          className="inline-block w-0.5 h-3.5 bg-sky-400 align-middle ml-0.5"
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.6, repeat: Infinity }}
        />
      )}
    </span>
  );
}

export default function ResponseStream({ messages }: ResponseStreamProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const latestIdRef = useRef<string>('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3 w-full max-w-2xl mx-auto max-h-64 overflow-y-auto pr-1 scroll-smooth" style={{ scrollbarWidth: 'none' }}>
      <AnimatePresence initial={false}>
        {messages.map((msg, idx) => {
          const isNewest = idx === messages.length - 1;
          if (isNewest) latestIdRef.current = msg.id;
          const isNew = isNewest && msg.id === latestIdRef.current;

          return (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.role === 'agent' && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-sky-500/20 border border-sky-500/40 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-sky-400" />
                </div>
              )}

              <div
                className={`max-w-sm px-3.5 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  msg.role === 'user'
                    ? 'bg-white/8 border border-white/12 text-white/90 rounded-br-sm'
                    : 'rounded-bl-sm text-sky-100/90'
                }`}
                style={
                  msg.role === 'agent'
                    ? {
                        background: 'rgba(3,105,161,0.15)',
                        border: '1px solid rgba(56,189,248,0.2)',
                        boxShadow: '0 0 20px rgba(56,189,248,0.05)'
                      }
                    : {}
                }
              >
                {msg.role === 'agent' ? (
                  <TypewriterText text={msg.text} isNew={isNew && isNewest} />
                ) : (
                  <span>{msg.text}</span>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/10 border border-white/20 flex items-center justify-center mt-0.5">
                  <div className="w-2 h-2 rounded-full bg-white/60" />
                </div>
              )}
            </motion.div>
          );
        })}
      </AnimatePresence>
      <div ref={bottomRef} />
    </div>
  );
}
