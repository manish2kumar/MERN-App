import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Aperture, Cpu, Network, Database, Hexagon, Terminal } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="bg-algorithmic-grid" />
      
      {/* Navigation */}
      <nav className="app-header surface-noir">
        <div className="header-left" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <Aperture size={28} color="var(--neon-cyan)" />
          <h1 className="app-title">AI Flow Visualizer</h1>
        </div>
        <div className="header-right" style={{ display: 'flex', gap: '20px' }}>
          <Link to="/app" className="btn-quant emerald">
            Initialize Workspace
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero" style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ position: 'relative', zIndex: 10 }}
        >
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <motion.div 
              animate={{ rotate: 360 }} 
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            >
              <Hexagon size={64} color="var(--neon-cyan)" strokeWidth={1} />
            </motion.div>
          </div>

          <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 5rem)' }}>
            AI Node <br />
            <span style={{ color: 'var(--neon-cyan)' }}>Visualization</span>
          </h1>
          <p className="hero-subtitle" style={{ maxWidth: '600px' }}>
            A streamlined environment to type prompts, execute them via OpenRouter AI models, and visualize generated responses with MongoDB persistence.
          </p>
          
          <div className="hero-actions" style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '40px' }}>
            <Link to="/app" className="btn-quant emerald" style={{ padding: '16px 50px', fontSize: '1rem' }}>
              Run App <Terminal size={20} style={{ marginLeft: '10px' }} />
            </Link>
          </div>
        </motion.div>

        {/* 3D Atmospheric Particles (CSS Only, lightweight WQF vibe) */}
        <div className="hero-abstract-art" style={{ position: 'absolute', inset: 0, overflow: 'hidden', zIndex: 0, pointerEvents: 'none' }}>
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                position: 'absolute',
                width: `${Math.random() * 4 + 2}px`,
                height: `${Math.random() * 4 + 2}px`,
                background: i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-emerald)',
                borderRadius: '50%',
                boxShadow: `0 0 10px ${i % 2 === 0 ? 'var(--neon-cyan)' : 'var(--neon-emerald)'}`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, Math.random() * -100 - 50],
                x: [0, Math.random() * 100 - 50],
                opacity: [0, 0.8, 0],
                scale: [0, 1.5, 0]
              }}
              transition={{
                duration: Math.random() * 4 + 3,
                repeat: Infinity,
                delay: Math.random() * 2,
                ease: 'easeInOut'
              }}
            />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="features" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', 
        gap: '40px', 
        maxWidth: '1400px', 
        margin: '60px auto 100px', 
        padding: '0 40px',
        position: 'relative',
        zIndex: 10
      }}>
        <motion.div className="feature-card surface-noir" style={{ padding: '40px', borderRadius: 'var(--radius-md)' }} whileHover={{ y: -5 }}>
          <Network color="var(--neon-cyan)" size={32} style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>Input & Result Nodes</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Build workflows easily by connecting a text input node to an AI result node.
          </p>
        </motion.div>
        
        <motion.div className="feature-card surface-noir" style={{ padding: '40px', borderRadius: 'var(--radius-md)' }} whileHover={{ y: -5 }}>
          <Database color="var(--neon-emerald)" size={32} style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>Database Persistence</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Utilize MongoDB to save and retrieve your flowchart prompt sequences and history.
          </p>
        </motion.div>
        
        <motion.div className="feature-card surface-noir" style={{ padding: '40px', borderRadius: 'var(--radius-md)' }} whileHover={{ y: -5 }}>
          <Cpu color="var(--neon-cyan)" size={32} style={{ marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px', color: '#fff' }}>OpenRouter Integrations</h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
            Experience generating responses using robust free-tier neural language models.
          </p>
        </motion.div>
      </section>

      {/* Footer */}
      <footer style={{
        marginTop: 'auto',
        borderTop: '1px solid var(--border-light)',
        padding: '30px 40px',
        textAlign: 'center',
        background: 'rgba(0,0,0,0.8)',
        position: 'relative',
        zIndex: 10
      }}>
        <p style={{ color: 'var(--text-tertiary)', fontSize: '0.85rem', letterSpacing: '0.05em' }}>
          &copy; {new Date().getFullYear()} AI Flow Visualizer Framework • Built with React Flow & Express
        </p>
      </footer>
    </div>
  );
}
