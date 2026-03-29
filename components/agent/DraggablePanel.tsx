'use client';

import { motion, useDragControls } from 'framer-motion';
import { X, Maximize2, Minimize2, GripHorizontal } from 'lucide-react';
import { useState, useRef } from 'react';

interface DraggablePanelProps {
  id: string;
  title: string;
  icon: React.ReactNode;
  accentColor: string;
  defaultPosition: { x: number; y: number };
  children: React.ReactNode;
  onClose: (id: string) => void;
  width?: number;
}

export default function DraggablePanel({
  id,
  title,
  icon,
  accentColor,
  defaultPosition,
  children,
  onClose,
  width = 320
}: DraggablePanelProps) {
  const [minimized, setMinimized] = useState(false);
  const dragControls = useDragControls();
  const constraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragMomentum={false}
      dragElastic={0}
      initial={{ opacity: 0, scale: 0.85, x: defaultPosition.x, y: defaultPosition.y }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      style={{ position: 'fixed', width, zIndex: 50, top: 0, left: 0, x: defaultPosition.x, y: defaultPosition.y }}
      className="select-none"
    >
      <div
        className="rounded-2xl overflow-hidden"
        style={{
          background: 'rgba(0,8,20,0.88)',
          backdropFilter: 'blur(20px)',
          border: `1px solid ${accentColor}40`,
          boxShadow: `0 0 30px ${accentColor}20, 0 4px 40px rgba(0,0,0,0.6)`
        }}
      >
        {/* Title bar */}
        <div
          className="flex items-center gap-2 px-3 py-2.5 cursor-grab active:cursor-grabbing"
          style={{ borderBottom: minimized ? 'none' : `1px solid ${accentColor}25` }}
          onPointerDown={(e) => dragControls.start(e)}
        >
          <GripHorizontal className="h-3.5 w-3.5 text-white/20 flex-shrink-0" />
          <span className="flex-shrink-0" style={{ color: accentColor }}>
            {icon}
          </span>
          <span className="text-xs font-semibold tracking-widest uppercase text-white/80 flex-1 truncate">
            {title}
          </span>
          {/* Corner accent */}
          <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full" style={{ background: accentColor, boxShadow: `0 0 6px ${accentColor}` }} />
          <button
            onClick={() => setMinimized((v) => !v)}
            className="flex-shrink-0 p-1 rounded hover:bg-white/10 transition-colors"
          >
            {minimized ? (
              <Maximize2 className="h-3 w-3 text-white/50 hover:text-white" />
            ) : (
              <Minimize2 className="h-3 w-3 text-white/50 hover:text-white" />
            )}
          </button>
          <button
            onClick={() => onClose(id)}
            className="flex-shrink-0 p-1 rounded hover:bg-red-500/20 transition-colors"
          >
            <X className="h-3 w-3 text-white/50 hover:text-red-400" />
          </button>
        </div>

        {/* Content */}
        <motion.div
          animate={{ height: minimized ? 0 : 'auto', opacity: minimized ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          style={{ overflow: 'hidden' }}
        >
          <div className="p-3">{children}</div>
        </motion.div>
      </div>
    </motion.div>
  );
}
