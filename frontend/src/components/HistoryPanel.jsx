import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Archive, X, Clock, DatabaseBackup } from 'lucide-react';

const HistoryPanel = ({ refreshFlag }) => {
  const [history, setHistory] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      const { data } = await axios.get('http://127.0.0.1:5001/api/history');
      setHistory(data.data || []);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [refreshFlag]);

  return (
    <>
      <button 
        className="btn-quant" 
        onClick={() => { setOpen(!open); fetchHistory(); }}
        style={{ padding: '10px 20px', fontSize: '0.75rem' }}
      >
        <Archive size={16} /> <span>History</span>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="surface-noir" 
              style={{ 
                position: 'fixed', 
                top: 0, 
                right: 0, 
                bottom: 0, 
                width: '100%',
                maxWidth: '400px', 
                zIndex: 2000, 
                padding: '35px', 
                overflowY: 'auto',
                borderLeft: '1px solid var(--neon-cyan)',
                boxShadow: '-10px 0 30px rgba(0,0,0,0.8)'
              }}
            >
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                marginBottom: '20px', 
                borderBottom: '1px solid var(--border-light)', 
                paddingBottom: '20px',
                position: 'sticky',
                top: '-35px',
                background: 'rgba(9, 10, 15, 0.95)',
                backdropFilter: 'blur(20px)',
                paddingTop: '35px',
                marginTop: '-35px',
                marginLeft: '-35px',
                marginRight: '-35px',
                paddingLeft: '35px',
                paddingRight: '35px',
                zIndex: 10
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <DatabaseBackup size={20} color="var(--neon-cyan)" />
                  <h3 style={{ fontSize: '1.1rem', fontWeight: 600, letterSpacing: '0.15em', color: 'var(--neon-cyan)' }}>History</h3>
                </div>
                <X size={24} style={{ cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={() => setOpen(false)} />
              </div>
              
              {history.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '120px', color: 'var(--text-tertiary)' }}>
                  <Archive size={48} style={{ margin: '0 auto 20px', opacity: 0.5 }} />
                  <p style={{ letterSpacing: '0.1em', fontSize: '0.85rem' }}>No History Found</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {history.map((item) => (
                    <motion.div 
                      key={item._id} 
                      className="surface-noir" 
                      style={{ padding: '24px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-light)' }}
                      whileHover={{ scale: 1.02, borderColor: 'var(--neon-cyan)' }}
                    >
                      <p style={{ color: 'var(--neon-cyan)', fontSize: '0.95rem', fontWeight: 600, marginBottom: '12px', letterSpacing: '0.05em', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {item.prompt.slice(0, 50)}...
                      </p>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, marginBottom: '15px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
                        {item.response.slice(0, 100)}{item.response.length > 100 ? '...' : ''}
                      </p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.75rem', color: 'var(--text-tertiary)' }}>
                        <Clock size={12} />
                        {new Date(item.createdAt).toLocaleString()}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

export default HistoryPanel;
