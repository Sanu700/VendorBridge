import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown } from 'lucide-react';

export default function StatCard({ title, value, subtitle, icon: Icon, trend, trendValue, color = '#e8622a', delay = 0 }) {
  const bg = color + '12';
  return (
    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="stat-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
        <div style={{ width: 38, height: 38, borderRadius: 9, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={18} color={color} />
        </div>
        {trendValue !== undefined && (
          <span style={{ display: 'flex', alignItems: 'center', gap: 3, fontSize: '0.75rem', fontWeight: 600, color: trend === 'up' ? '#2d8a5e' : trend === 'down' ? '#c0392b' : '#9c9691' }}>
            {trend === 'up' ? <TrendingUp size={11} /> : trend === 'down' ? <TrendingDown size={11} /> : null}
            {trendValue}
          </span>
        )}
      </div>
      <div style={{ fontSize: '1.65rem', fontWeight: 800, color: 'var(--text)', fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: 4, fontWeight: 500 }}>{title}</div>
      {subtitle && <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 3 }}>{subtitle}</div>}
    </motion.div>
  );
}
