import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { TerminalSquare } from 'lucide-react';

const InputNode = memo(({ data }) => {
  return (
    <div className="node-quant">
      <div className="node-header">
        <TerminalSquare size={16} color="var(--neon-cyan)" />
        <span className="node-label">Text Input Node</span>
      </div>
      <textarea
        style={{
          width: '100%',
          background: 'var(--noir-bg)',
          border: '1px solid var(--border-light)',
          borderRadius: 'var(--radius-sm)',
          padding: '16px',
          color: 'var(--text-primary)',
          fontFamily: 'var(--font-quant)',
          fontSize: '0.85rem',
          lineHeight: 1.6,
          resize: 'none',
          outline: 'none',
          minHeight: '140px',
          transition: 'all 0.3s ease',
          boxShadow: 'inset 0 2px 10px rgba(0,0,0,0.5)'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = 'var(--neon-cyan)';
          e.target.style.boxShadow = 'inset 0 0 10px rgba(0, 210, 255, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = 'var(--border-light)';
          e.target.style.boxShadow = 'inset 0 2px 10px rgba(0,0,0,0.5)';
        }}
        placeholder="Awaiting prompt data stream..."
        value={data.prompt}
        onChange={(e) => data.onPromptChange(e.target.value)}
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        style={{ 
          background: 'var(--noir-surface)', 
          border: '2px solid var(--neon-cyan)',
          boxShadow: '0 0 10px var(--neon-cyan)'
        }} 
      />
    </div>
  );
});

InputNode.displayName = 'InputNode';
export default InputNode;
