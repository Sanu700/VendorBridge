import { motion } from 'framer-motion';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, BarChart, Bar } from 'recharts';
import { useProducts } from '../../context/ProductsContext';
import { PRICE_TRENDS } from '../../data/mockData';
import { TrendingDown, Award, AlertTriangle } from 'lucide-react';

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 9, padding: '9px 13px', fontSize: '0.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}>
    <div style={{ color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
    {payload.map((p, i) => <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ₹{p.value}</div>)}
  </div>
) : null;

export default function VendorAnalytics() {
  const { products } = useProducts();
  const bestPrices = Object.values(products.reduce((acc, p) => { if (!acc[p.category] || p.price < acc[p.category].price) acc[p.category] = p; return acc; }, {})).slice(0, 5);
  const mostDemanded = [...products].sort((a, b) => b.price - a.price).slice(0, 5);
  const lowStockItems = products.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');
  const radarData = [{ s: 'Vegetables', A: 80 }, { s: 'Spices', A: 95 }, { s: 'Grains', A: 70 }, { s: 'Dairy', A: 65 }, { s: 'Oils', A: 88 }, { s: 'Flour', A: 75 }];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>Market Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Data-driven insights for smarter purchasing decisions.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 16, marginBottom: 16 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Monthly Price Trends</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>5-month commodity comparison</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={PRICE_TRENDS.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="month" tick={{ fill: '#b8b4ac', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#b8b4ac', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Line type="monotone" dataKey="rice" stroke="#e8622a" strokeWidth={2} dot={{ fill: '#e8622a', r: 3 }} name="Rice" />
              <Line type="monotone" dataKey="onion" stroke="#3060c8" strokeWidth={2} dot={{ fill: '#3060c8', r: 3 }} name="Onion" />
              <Line type="monotone" dataKey="oil" stroke="#2d8a5e" strokeWidth={2} dot={{ fill: '#2d8a5e', r: 3 }} name="Oil" />
              <Line type="monotone" dataKey="spices" stroke="#7c3aed" strokeWidth={2} dot={{ fill: '#7c3aed', r: 3 }} name="Spices" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Market Demand Index</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 14 }}>Category demand scores</p>
          <ResponsiveContainer width="100%" height={200}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="#e8e4dc" />
              <PolarAngleAxis dataKey="s" tick={{ fill: '#9c9691', fontSize: 10 }} />
              <PolarRadiusAxis tick={{ fill: '#c8c4bc', fontSize: 9 }} />
              <Radar name="Demand" dataKey="A" stroke="#e8622a" fill="#e8622a" fillOpacity={0.1} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: 16 }}>
        {/* Best Prices */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
            <TrendingDown size={17} color="#2d8a5e" />
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Best Prices Today</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {bestPrices.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 26, height: 26, borderRadius: 6, background: '#e8f5ee', color: '#2d8a5e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.72rem', flexShrink: 0 }}>#{i + 1}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{p.supplierName}</div>
                </div>
                <span style={{ fontWeight: 700, color: '#2d8a5e', fontSize: '0.875rem' }}>₹{p.price}/{p.unit}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Most Demanded */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
            <Award size={17} color="var(--primary)" />
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Most Demanded</h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {mostDemanded.map((p, i) => (
              <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ fontSize: '1.1rem' }}>{p.image}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text)', fontWeight: 500 }}>{p.name}</div>
                  <div style={{ fontSize: '0.73rem', color: 'var(--text-muted)' }}>{p.category}</div>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 6, padding: '3px 8px', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)' }}>{Math.round(85 - i * 8)}%</div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Low Stock */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7, marginBottom: 18 }}>
            <AlertTriangle size={17} color="#c47d0e" />
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>
              Low Stock Alerts <span style={{ fontSize: '0.75rem', background: '#fdf5e0', color: '#c47d0e', padding: '2px 7px', borderRadius: 10, marginLeft: 4 }}>{lowStockItems.length}</span>
            </h3>
          </div>
          {lowStockItems.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '20px 0', color: '#2d8a5e', fontSize: '0.875rem' }}>✓ All items well-stocked!</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {lowStockItems.map(p => (
                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: 9, padding: '9px 11px', borderRadius: 9, background: p.status === 'Out of Stock' ? '#fdecea' : '#fdf5e0', border: `1px solid ${p.status === 'Out of Stock' ? '#f0c8c5' : '#ecd898'}` }}>
                  <span style={{ fontSize: '1rem' }}>{p.image}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text)', fontWeight: 500 }}>{p.name}</div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{p.supplierName}</div>
                  </div>
                  <span className={`badge ${p.status === 'Out of Stock' ? 'badge-red' : 'badge-amber'}`} style={{ fontSize: '0.7rem' }}>{p.status === 'Out of Stock' ? 'Out' : `${p.stock} left`}</span>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
