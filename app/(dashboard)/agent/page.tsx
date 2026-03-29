'use client';

import { useState, useCallback, useId } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Brain,
  Database,
  BarChart2,
  Image,
  FileSearch,
  Activity,
  Bot
} from 'lucide-react';

import dynamic from 'next/dynamic';
import AgentOrb from '@/components/agent/AgentOrb';
import CommandBar from '@/components/agent/CommandBar';
import ResponseStream, { Message } from '@/components/agent/ResponseStream';
import DraggablePanel from '@/components/agent/DraggablePanel';
import {
  NeuralMapPanel,
  DataMatrixPanel,
  LiveMetricsPanel,
  ImageLabPanel,
  DocumentScanPanel,
  DiagnosticsPanel
} from '@/components/agent/PanelContent';

const ParticleCanvas = dynamic(() => import('@/components/agent/ParticleCanvas'), { ssr: false });

// ── Types ────────────────────────────────────────────────────────────────────
type PanelType = 'neural-map' | 'data-matrix' | 'metrics' | 'image-lab' | 'doc-scan' | 'diagnostics';

interface Panel {
  id: string;
  type: PanelType;
  position: { x: number; y: number };
}

const PANEL_CONFIG: Record<
  PanelType,
  { title: string; icon: React.ReactNode; color: string; width: number }
> = {
  'neural-map': { title: 'Neural Map', icon: <Brain className="h-3.5 w-3.5" />, color: '#38bdf8', width: 280 },
  'data-matrix': { title: 'Data Matrix', icon: <Database className="h-3.5 w-3.5" />, color: '#a78bfa', width: 270 },
  'metrics': { title: 'Live Metrics', icon: <BarChart2 className="h-3.5 w-3.5" />, color: '#34d399', width: 280 },
  'image-lab': { title: 'Image Lab', icon: <Image className="h-3.5 w-3.5" />, color: '#fb923c', width: 260 },
  'doc-scan': { title: 'Document Scanner', icon: <FileSearch className="h-3.5 w-3.5" />, color: '#f472b6', width: 270 },
  'diagnostics': { title: 'Diagnostics', icon: <Activity className="h-3.5 w-3.5" />, color: '#4ade80', width: 260 }
};

// ── AI Response Engine ───────────────────────────────────────────────────────
const RESPONSES: Record<string, { text: string; panels?: PanelType[] }> = {
  'neural map': {
    text: "Neural topology visualization active. I'm mapping 847 synaptic pathways across 12 cognitive layers. Attention heads are fully engaged.",
    panels: ['neural-map']
  },
  'show neural map': {
    text: "Neural topology visualization active. I'm mapping 847 synaptic pathways across 12 cognitive layers.",
    panels: ['neural-map']
  },
  'data matrix': {
    text: 'Data matrix online. All system vectors nominal. Real-time telemetry streaming at 2.4K samples per second.',
    panels: ['data-matrix']
  },
  'open data matrix': {
    text: 'Data matrix online. All system vectors nominal. Real-time telemetry streaming at 2.4K samples per second.',
    panels: ['data-matrix']
  },
  'metrics': {
    text: 'Live metrics dashboard deployed. Inference engine is running at peak performance — 99.1% accuracy on current session.',
    panels: ['metrics']
  },
  'show metrics': {
    text: 'Live metrics dashboard deployed. Inference engine is running at peak performance — 99.1% accuracy.',
    panels: ['metrics']
  },
  'image lab': {
    text: 'Image Lab ready. Drop any image for enhancement, object detection, or semantic extraction. Vision model v4 is loaded.',
    panels: ['image-lab']
  },
  'open image lab': {
    text: 'Image Lab ready. Drop any image for enhancement, object detection, or semantic extraction.',
    panels: ['image-lab']
  },
  'scan document': {
    text: 'Document scanner initialized. OCR and entity extraction pipelines are warm. Upload any document for instant analysis.',
    panels: ['doc-scan']
  },
  'run diagnostics': {
    text: 'Full system diagnostic initiated. All core systems nominal. One minor security advisory flagged — recommend rotating API tokens.',
    panels: ['diagnostics']
  },
  'diagnostics': {
    text: 'Running diagnostics across all subsystems…',
    panels: ['diagnostics']
  },
  'analyze legal case': {
    text: "Legal analysis module engaged. I can process case briefs, identify precedents, extract key arguments, and generate a structured risk assessment. Ready to receive documents.",
    panels: ['doc-scan', 'data-matrix']
  },
  'clear all panels': {
    text: 'All panels dismissed. Clean workspace restored. Command center ready.',
    panels: []
  },
  'hello': {
    text: "Hello. I'm JARVIS — Just A Rather Very Intelligent System. I'm online and fully operational. How can I assist you today?",
    panels: []
  },
  'status': {
    text: 'All systems operational. Neural networks: active. Voice engine: standby. Database: connected. How may I serve you?',
    panels: ['diagnostics']
  }
};

function getResponse(cmd: string): { text: string; panels?: PanelType[] } {
  const lower = cmd.toLowerCase().trim();

  // Exact match
  for (const [key, value] of Object.entries(RESPONSES)) {
    if (lower === key || lower.includes(key)) return value;
  }

  // Fuzzy / fallback
  const fallbacks = [
    "Understood. Processing your request through the cognitive matrix. Stand by for analysis.",
    "Command received. Cross-referencing knowledge base across 47 domains.",
    "Initiating response protocol. Neural pathways are converging on an optimal answer.",
    "Query analyzed. I've identified 3 relevant vectors. Let me synthesize the optimal response.",
    "Processing. My inference engine is running at full capacity on your request."
  ];

  return { text: fallbacks[Math.floor(Math.random() * fallbacks.length)], panels: [] };
}

// ── Page ─────────────────────────────────────────────────────────────────────
export default function AgentPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'init',
      role: 'agent',
      text: "Systems online. I'm JARVIS — your interactive intelligence layer. Speak a command or type below. Try asking me to open a panel, analyze something, or run diagnostics.",
      timestamp: new Date()
    }
  ]);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [thinking, setThinking] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [voiceActive, setVoiceActive] = useState(false);
  const idCounter = useId();

  const uid = useCallback(() => `${idCounter}-${Date.now()}-${Math.random().toString(36).slice(2)}`, [idCounter]);

  const addPanel = useCallback((type: PanelType) => {
    // Randomize position, staggered from center
    const positions: { x: number; y: number }[] = [
      { x: 60, y: 80 },
      { x: 420, y: 80 },
      { x: 760, y: 80 },
      { x: 60, y: 360 },
      { x: 420, y: 360 },
      { x: 760, y: 360 }
    ];
    const pos = positions[Math.floor(Math.random() * positions.length)];
    setPanels((prev) => [...prev, { id: uid(), type, position: pos }]);
  }, [uid]);

  const closePanel = useCallback((id: string) => {
    setPanels((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const handleCommand = useCallback(
    (cmd: string) => {
      const userMsg: Message = { id: uid(), role: 'user', text: cmd, timestamp: new Date() };
      setMessages((prev) => [...prev, userMsg]);
      setThinking(true);

      const delay = 600 + Math.random() * 600;
      setTimeout(() => {
        const { text, panels: newPanels } = getResponse(cmd);

        setThinking(false);
        setSpeaking(true);
        setTimeout(() => setSpeaking(false), 2500);

        const agentMsg: Message = { id: uid(), role: 'agent', text, timestamp: new Date() };
        setMessages((prev) => [...prev, agentMsg]);

        // Handle panels
        if (newPanels !== undefined) {
          if (newPanels.length === 0 && cmd.toLowerCase().includes('clear')) {
            setPanels([]);
          } else {
            newPanels.forEach((type) => addPanel(type));
          }
        }
      }, delay);
    },
    [uid, addPanel]
  );

  return (
    <div
      className="fixed inset-0 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 40%, #001830 0%, #000a1a 50%, #000408 100%)' }}
    >
      {/* Particle neural network */}
      <ParticleCanvas />

      {/* Hex-grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(56,189,248,0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(56,189,248,0.03) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}
      />

      {/* Corner HUD brackets */}
      {(['tl', 'tr', 'bl', 'br'] as const).map((corner) => (
        <div
          key={corner}
          className="fixed w-12 h-12 pointer-events-none"
          style={{
            top: corner.startsWith('t') ? 12 : undefined,
            bottom: corner.startsWith('b') ? 12 : undefined,
            left: corner.endsWith('l') ? 12 : undefined,
            right: corner.endsWith('r') ? 12 : undefined,
            borderTop: corner.startsWith('t') ? '1px solid rgba(56,189,248,0.3)' : undefined,
            borderBottom: corner.startsWith('b') ? '1px solid rgba(56,189,248,0.3)' : undefined,
            borderLeft: corner.endsWith('l') ? '1px solid rgba(56,189,248,0.3)' : undefined,
            borderRight: corner.endsWith('r') ? '1px solid rgba(56,189,248,0.3)' : undefined
          }}
        />
      ))}

      {/* Top HUD bar */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-40 flex items-center gap-6 pointer-events-none">
        <div className="flex items-center gap-1.5">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-green-400"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="text-[9px] tracking-[0.25em] uppercase text-green-400/70 font-medium">Online</span>
        </div>
        <span className="text-[9px] tracking-[0.2em] uppercase text-sky-400/30">JARVIS v3.0</span>
        <div className="flex items-center gap-1.5">
          <Bot className="h-3 w-3 text-sky-400/40" />
          <span className="text-[9px] tracking-[0.2em] uppercase text-sky-400/30">Neural AI</span>
        </div>
      </div>

      {/* Draggable panels */}
      <AnimatePresence>
        {panels.map((panel) => {
          const cfg = PANEL_CONFIG[panel.type];
          return (
            <DraggablePanel
              key={panel.id}
              id={panel.id}
              title={cfg.title}
              icon={cfg.icon}
              accentColor={cfg.color}
              defaultPosition={panel.position}
              onClose={closePanel}
              width={cfg.width}
            >
              {panel.type === 'neural-map' && <NeuralMapPanel />}
              {panel.type === 'data-matrix' && <DataMatrixPanel />}
              {panel.type === 'metrics' && <LiveMetricsPanel />}
              {panel.type === 'image-lab' && <ImageLabPanel />}
              {panel.type === 'doc-scan' && <DocumentScanPanel />}
              {panel.type === 'diagnostics' && <DiagnosticsPanel />}
            </DraggablePanel>
          );
        })}
      </AnimatePresence>

      {/* Central agent UI */}
      <div className="fixed inset-0 flex flex-col items-center justify-center z-30 pointer-events-none" style={{ gap: 0 }}>
        {/* Orb */}
        <div className="pointer-events-none mb-6">
          <AgentOrb speaking={speaking} thinking={thinking} />
        </div>

        {/* Agent name */}
        <motion.div
          className="text-center mb-4 pointer-events-none"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1
            className="text-xl font-bold tracking-[0.4em] uppercase"
            style={{
              background: 'linear-gradient(135deg, #bae6fd 0%, #38bdf8 50%, #0ea5e9 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            JARVIS
          </h1>
          <p className="text-[9px] tracking-[0.3em] text-sky-400/40 mt-1 uppercase">
            Interactive Intelligence System
          </p>
        </motion.div>

        {/* Message stream */}
        <div className="w-full px-4 pointer-events-auto mb-8" style={{ maxWidth: 640 }}>
          <ResponseStream messages={messages} />
        </div>

        {/* Command bar */}
        <div className="w-full px-4 pointer-events-auto" style={{ maxWidth: 680 }}>
          <CommandBar
            onSubmit={handleCommand}
            thinking={thinking}
            onVoiceToggle={setVoiceActive}
            voiceActive={voiceActive}
          />
        </div>
      </div>
    </div>
  );
}
