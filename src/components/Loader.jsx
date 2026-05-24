import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

export default function Loader({ message = 'Loading...' }) {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg)', gap: 16 }}>
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        style={{ width: 44, height: 44, borderRadius: 12, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Zap size={20} color="#fff" fill="#fff" />
      </motion.div>
      <div style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>{message}</div>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="card" style={{ padding: 20 }}>
      <div className="skeleton" style={{ height: 16, width: '55%', marginBottom: 10 }} />
      <div className="skeleton" style={{ height: 30, width: '38%', marginBottom: 8 }} />
      <div className="skeleton" style={{ height: 12, width: '70%' }} />
    </div>
  );
}
