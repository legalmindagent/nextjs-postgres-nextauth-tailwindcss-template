'use client';

import { motion } from 'framer-motion';

// ── Neural Map ──────────────────────────────────────────────────────────────
export function NeuralMapPanel() {
  const nodes = [
    { id: 'core', x: 50, y: 50, label: 'CORE', color: '#38bdf8', size: 14 },
    { id: 'memory', x: 20, y: 20, label: 'MEM', color: '#a78bfa', size: 9 },
    { id: 'vision', x: 80, y: 20, label: 'VIS', color: '#34d399', size: 9 },
    { id: 'lang', x: 15, y: 72, label: 'NLP', color: '#fb923c', size: 9 },
    { id: 'logic', x: 82, y: 72, label: 'LOG', color: '#f472b6', size: 9 },
    { id: 'sensor', x: 50, y: 10, label: 'SEN', color: '#facc15', size: 7 },
    { id: 'action', x: 50, y: 90, label: 'ACT', color: '#4ade80', size: 7 }
  ];
  const edges = [
    ['core', 'memory'], ['core', 'vision'], ['core', 'lang'],
    ['core', 'logic'], ['core', 'sensor'], ['core', 'action'],
    ['memory', 'lang'], ['vision', 'logic']
  ];

  return (
    <div className="relative w-full" style={{ height: 160 }}>
      <svg viewBox="0 0 100 100" className="w-full h-full">
        {edges.map(([a, b]) => {
          const na = nodes.find((n) => n.id === a)!;
          const nb = nodes.find((n) => n.id === b)!;
          return (
            <motion.line
              key={`${a}-${b}`}
              x1={na.x} y1={na.y} x2={nb.x} y2={nb.y}
              stroke="rgba(56,189,248,0.3)" strokeWidth="0.5"
              animate={{ opacity: [0.2, 0.6, 0.2] }}
              transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
            />
          );
        })}
        {nodes.map((n) => (
          <motion.g key={n.id}>
            <motion.circle
              cx={n.x} cy={n.y} r={n.size / 2 + 3}
              fill={n.color} opacity={0.1}
              animate={{ r: [n.size / 2 + 3, n.size / 2 + 6, n.size / 2 + 3] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <circle cx={n.x} cy={n.y} r={n.size / 2} fill={n.color} opacity={0.85} />
            <text x={n.x} y={n.y + n.size / 2 + 5} textAnchor="middle" fontSize="3.5" fill={n.color} opacity={0.8}>
              {n.label}
            </text>
          </motion.g>
        ))}
      </svg>
      <div className="absolute top-1 right-1 text-[9px] text-sky-400/60 tracking-widest">ACTIVE</div>
    </div>
  );
}

// ── Data Matrix ─────────────────────────────────────────────────────────────
export function DataMatrixPanel() {
  const rows = [
    { label: 'CPU LOAD', value: 23, unit: '%', color: '#38bdf8' },
    { label: 'MEMORY', value: 67, unit: '%', color: '#a78bfa' },
    { label: 'NETWORK', value: 142, unit: 'Mb/s', color: '#34d399' },
    { label: 'LATENCY', value: 4, unit: 'ms', color: '#facc15' },
    { label: 'UPTIME', value: 99.9, unit: '%', color: '#4ade80' }
  ];

  return (
    <div className="space-y-2">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-2">
          <span className="text-[9px] tracking-widest text-white/40 w-16 flex-shrink-0">{row.label}</span>
          <div className="flex-1 h-1 rounded-full bg-white/5 overflow-hidden">
            <motion.div
              className="h-full rounded-full"
              style={{ background: row.color, boxShadow: `0 0 8px ${row.color}` }}
              initial={{ width: 0 }}
              animate={{ width: `${Math.min(row.value, 100)}%` }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
            />
          </div>
          <span className="text-[10px] font-mono font-bold flex-shrink-0" style={{ color: row.color }}>
            {row.value}{row.unit}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Live Metrics ─────────────────────────────────────────────────────────────
export function LiveMetricsPanel() {
  const points = Array.from({ length: 30 }, (_, i) => ({
    x: i,
    y: 40 + Math.sin(i * 0.4) * 18 + Math.random() * 10
  }));
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'}${(p.x / 29) * 100},${p.y}`).join(' ');
  const area = `${path} L100,70 L0,70 Z`;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: 'TOKENS/S', value: '2.4K', color: '#38bdf8' },
          { label: 'ACCURACY', value: '99.1%', color: '#4ade80' },
          { label: 'SESSIONS', value: '14', color: '#a78bfa' }
        ].map((m) => (
          <div key={m.label} className="rounded-lg p-2 text-center" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${m.color}20` }}>
            <div className="text-sm font-bold font-mono" style={{ color: m.color }}>{m.value}</div>
            <div className="text-[8px] tracking-widest text-white/30 mt-0.5">{m.label}</div>
          </div>
        ))}
      </div>
      <svg viewBox="0 0 100 70" className="w-full" style={{ height: 60 }}>
        <defs>
          <linearGradient id="metricGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={area} fill="url(#metricGrad)" />
        <path d={path} fill="none" stroke="#38bdf8" strokeWidth="1" opacity="0.8" />
      </svg>
    </div>
  );
}

// ── Image Lab ────────────────────────────────────────────────────────────────
export function ImageLabPanel() {
  return (
    <div className="space-y-2">
      <div
        className="relative rounded-xl overflow-hidden flex items-center justify-center"
        style={{ height: 120, background: 'rgba(56,189,248,0.04)', border: '1px dashed rgba(56,189,248,0.2)' }}
      >
        <div className="text-center">
          <div className="text-2xl mb-1">🖼</div>
          <p className="text-[10px] text-white/30 tracking-widest">DROP IMAGE HERE</p>
          <p className="text-[9px] text-white/20 mt-0.5">or click to browse</p>
        </div>
        {/* Scan lines */}
        {[20, 40, 60, 80].map((y) => (
          <div
            key={y}
            className="absolute left-0 right-0 h-px"
            style={{ top: `${y}%`, background: 'rgba(56,189,248,0.07)' }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-1.5">
        {['ENHANCE', 'ANALYZE', 'EXTRACT'].map((op) => (
          <button
            key={op}
            className="py-1.5 rounded-lg text-[9px] tracking-widest font-medium text-sky-400/60 border border-sky-500/15 hover:border-sky-400/40 hover:text-sky-300 hover:bg-sky-400/5 transition-all"
          >
            {op}
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Document Scanner ─────────────────────────────────────────────────────────
export function DocumentScanPanel() {
  const lines = [
    { w: '85%', indent: false },
    { w: '70%', indent: false },
    { w: '90%', indent: false },
    { w: '60%', indent: true },
    { w: '75%', indent: true },
    { w: '80%', indent: false },
    { w: '55%', indent: false }
  ];

  return (
    <div className="space-y-2">
      <div
        className="relative rounded-xl overflow-hidden p-3"
        style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
      >
        {lines.map((line, i) => (
          <motion.div
            key={i}
            className="h-1.5 rounded-full mb-1.5"
            style={{
              width: line.w,
              marginLeft: line.indent ? 12 : 0,
              background: i === 2 ? 'rgba(56,189,248,0.4)' : 'rgba(255,255,255,0.1)'
            }}
            initial={{ width: 0 }}
            animate={{ width: line.w }}
            transition={{ duration: 0.4, delay: i * 0.08 }}
          />
        ))}
        {/* Scan beam */}
        <motion.div
          className="absolute left-0 right-0 h-5 pointer-events-none"
          style={{ background: 'linear-gradient(180deg, transparent, rgba(56,189,248,0.12), transparent)' }}
          animate={{ top: ['0%', '90%', '0%'] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>
      <div className="flex items-center gap-1.5">
        <div className="flex-1 h-0.5 rounded-full bg-green-400/30">
          <motion.div
            className="h-full rounded-full bg-green-400"
            animate={{ width: ['0%', '78%'] }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
          />
        </div>
        <span className="text-[9px] text-green-400 font-mono">78%</span>
      </div>
      <p className="text-[9px] text-white/30 tracking-wider">EXTRACTING ENTITIES…</p>
    </div>
  );
}

// ── Diagnostics ──────────────────────────────────────────────────────────────
export function DiagnosticsPanel() {
  const checks = [
    { label: 'CORE SYSTEMS', status: 'OK', color: '#4ade80' },
    { label: 'NEURAL NETS', status: 'OK', color: '#4ade80' },
    { label: 'VOICE ENGINE', status: 'OK', color: '#4ade80' },
    { label: 'DB CLUSTER', status: 'OK', color: '#4ade80' },
    { label: 'SECURITY', status: 'WARN', color: '#facc15' },
    { label: 'EXTERNAL API', status: 'IDLE', color: '#94a3b8' }
  ];

  return (
    <div className="space-y-1.5">
      {checks.map((c, i) => (
        <motion.div
          key={c.label}
          className="flex items-center justify-between"
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07 }}
        >
          <span className="text-[9px] tracking-widest text-white/40">{c.label}</span>
          <div className="flex items-center gap-1.5">
            <motion.div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: c.color }}
              animate={{ opacity: c.status === 'OK' ? [1, 0.4, 1] : 1 }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-[9px] font-mono font-bold" style={{ color: c.color }}>{c.status}</span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
