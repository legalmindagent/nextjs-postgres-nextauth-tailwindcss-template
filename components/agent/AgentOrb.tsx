'use client';

import { motion } from 'framer-motion';

interface AgentOrbProps {
  speaking: boolean;
  thinking: boolean;
}

export default function AgentOrb({ speaking, thinking }: AgentOrbProps) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Outermost ring — slow spin */}
      <motion.div
        className="absolute rounded-full border border-sky-500/20"
        style={{ width: 220, height: 220 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        {[0, 90, 180, 270].map((deg) => (
          <div
            key={deg}
            className="absolute w-2 h-2 rounded-full bg-sky-400/60"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translate(108px) translate(-50%, -50%)`
            }}
          />
        ))}
      </motion.div>

      {/* Second ring — counter spin */}
      <motion.div
        className="absolute rounded-full border border-cyan-400/20"
        style={{ width: 180, height: 180 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      >
        {[45, 135, 225, 315].map((deg) => (
          <div
            key={deg}
            className="absolute w-1.5 h-1.5 rounded-full bg-cyan-400/70"
            style={{
              top: '50%',
              left: '50%',
              transform: `rotate(${deg}deg) translate(88px) translate(-50%, -50%)`
            }}
          />
        ))}
      </motion.div>

      {/* Glow halo */}
      <motion.div
        className="absolute rounded-full"
        style={{
          width: 140,
          height: 140,
          background:
            'radial-gradient(circle, rgba(56,189,248,0.35) 0%, rgba(14,165,233,0.1) 50%, transparent 70%)',
          filter: 'blur(8px)'
        }}
        animate={{
          scale: speaking ? [1, 1.3, 1] : thinking ? [1, 1.15, 1] : [1, 1.05, 1],
          opacity: speaking ? [0.7, 1, 0.7] : [0.4, 0.6, 0.4]
        }}
        transition={{ duration: speaking ? 0.5 : 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Core sphere */}
      <motion.div
        className="relative rounded-full flex items-center justify-center overflow-hidden"
        style={{
          width: 110,
          height: 110,
          background:
            'radial-gradient(circle at 35% 35%, rgba(186,230,253,0.9), rgba(14,165,233,0.7) 40%, rgba(3,105,161,0.95) 70%, rgba(7,89,133,1))',
          boxShadow:
            '0 0 40px rgba(56,189,248,0.6), 0 0 80px rgba(56,189,248,0.3), inset 0 0 30px rgba(255,255,255,0.15)'
        }}
        animate={{
          scale: speaking ? [1, 1.08, 1] : [1, 1.02, 1],
          boxShadow: speaking
            ? [
                '0 0 40px rgba(56,189,248,0.6), 0 0 80px rgba(56,189,248,0.4)',
                '0 0 60px rgba(56,189,248,0.9), 0 0 120px rgba(56,189,248,0.6)',
                '0 0 40px rgba(56,189,248,0.6), 0 0 80px rgba(56,189,248,0.4)'
              ]
            : ['0 0 40px rgba(56,189,248,0.5), 0 0 80px rgba(56,189,248,0.25)']
        }}
        transition={{ duration: speaking ? 0.5 : 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Scan line */}
        <motion.div
          className="absolute left-0 right-0 h-px bg-white/30"
          animate={{ top: ['10%', '90%', '10%'] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        />
        {/* Shine */}
        <div
          className="absolute rounded-full"
          style={{
            width: 40,
            height: 40,
            top: 12,
            left: 16,
            background: 'radial-gradient(circle, rgba(255,255,255,0.45), transparent 70%)',
            filter: 'blur(4px)'
          }}
        />
      </motion.div>

      {/* Speaking waveform rings */}
      {speaking &&
        [1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border border-sky-400/30"
            style={{ width: 110 + i * 28, height: 110 + i * 28 }}
            initial={{ opacity: 0.7, scale: 1 }}
            animate={{ opacity: 0, scale: 1.5 }}
            transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.3, ease: 'easeOut' }}
          />
        ))}

      {/* Thinking dots */}
      {thinking && (
        <div className="absolute -bottom-8 flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-sky-400"
              animate={{ opacity: [0.3, 1, 0.3], y: [0, -4, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
