import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Activity, Cpu } from 'lucide-react';

const ResultNode = memo(({ data }) => {
  return (
    <div className="node-quant result-variant">
      <Handle 
        type="target" 
        position={Position.Left} 
        style={{ 
          background: 'var(--noir-surface)', 
          border: '2px solid var(--neon-emerald)', 
          boxShadow: '0 0 10px var(--neon-emerald)'
        }} 
      />
      
      <div className="node-header">
        <Cpu size={16} color="var(--neon-emerald)" />
        <span className="node-label" style={{ color: 'var(--neon-emerald)' }}>Result Node</span>
        {data.loading && (
          <motion.div
            style={{ marginLeft: 'auto' }}
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
          >
             <Activity size={18} color="var(--neon-emerald)" />
          </motion.div>
        )}
      </div>

      <div style={{ 
        background: 'var(--noir-bg)', 
        borderRadius: 'var(--radius-sm)', 
        padding: '20px',
        minHeight: '140px',
        border: '1px solid var(--border-light)',
        position: 'relative',
        overflow: 'hidden',
        boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
      }}>
        {data.loading ? (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <p style={{ color: 'var(--neon-emerald)', fontStyle: 'italic', fontSize: '0.8rem', letterSpacing: '0.1em' }}>ANALYZING DATA STREAM...</p>
            <div style={{ height: '2px', width: '100%', background: 'rgba(0, 255, 157, 0.2)', overflow: 'hidden' }}>
              <motion.div 
                style={{ height: '100%', width: '30%', background: 'var(--neon-emerald)' }} 
                animate={{ x: ['-100%', '300%'] }} 
                transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
              />
            </div>
          </div>
        ) : data.response ? (
          <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'var(--text-primary)', fontWeight: 400, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{data.response}</p>
        ) : (
          <p style={{ color: 'var(--text-tertiary)', fontSize: '0.8rem', letterSpacing: '0.05em' }}>NO SIGNAL DETECTED.</p>
        )}
      </div>
    </div>
  );
});

ResultNode.displayName = 'ResultNode';
export default ResultNode;
