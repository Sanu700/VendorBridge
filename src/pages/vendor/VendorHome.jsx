import { useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Package, Users, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import StatCard from '../../components/StatCard';
import { useProducts } from '../../context/ProductsContext';
import { PRICE_TRENDS } from '../../data/mockData';
import { useAuth } from '../../context/AuthContext';

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 9, padding: '9px 13px', fontSize: '0.8rem', boxShadow: '0 4px 14px rgba(0,0,0,0.08)' }}>
    <div style={{ color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
    {payload.map((p, i) => <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ₹{p.value}</div>)}
  </div>
) : null;

export default function VendorHome() {
  const { products, suppliers } = useProducts();
  const { user } = useAuth();
  const [period, setPeriod] = useState('weekly');

  const inStock = products.filter(p => p.status === 'In Stock').length;
  const lowStock = products.filter(p => p.status === 'Low Stock').length;
  const outOfStock = products.filter(p => p.status === 'Out of Stock').length;
  const avgPrice = Math.round(products.reduce((s, p) => s + p.price, 0) / products.length);

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>
          Good morning, {user?.displayName?.split(' ')[0] || 'Vendor'} 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Here's what's happening in your supply market today.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard title="Avg. Price Index" value={`₹${avgPrice}`} subtitle="Across all categories" icon={TrendingUp} trend="up" trendValue="+3.2%" color="#e8622a" delay={0} />
        <StatCard title="Products Tracked" value={products.length} subtitle="Across all suppliers" icon={Package} trend="up" trendValue="+4" color="#3060c8" delay={0.05} />
        <StatCard title="Verified Suppliers" value={suppliers.length} subtitle="Active in market" icon={Users} trend="up" trendValue="2 new" color="#2d8a5e" delay={0.1} />
        <StatCard title="Alerts" value={lowStock + outOfStock} subtitle={`${lowStock} low · ${outOfStock} out`} icon={AlertTriangle} trend={outOfStock > 0 ? 'down' : 'up'} trendValue={outOfStock > 0 ? `${outOfStock} critical` : 'All clear'} color="#c47d0e" delay={0.15} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: 16, marginBottom: 18 }}>
        {/* Price chart */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 18 }}>
            <div>
              <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Price Trends</h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Key commodities this period</p>
            </div>
            <div style={{ display: 'flex', gap: 6 }}>
              {['weekly', 'monthly'].map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{ padding: '5px 13px', borderRadius: 7, border: 'none', cursor: 'pointer', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Inter', background: period === p ? '#fdf2ed' : 'var(--bg)', color: period === p ? 'var(--primary)' : 'var(--text-muted)', border: period === p ? '1px solid #f0d0c0' : '1px solid var(--border)' }}>
                  {p === 'weekly' ? 'Week' : 'Month'}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={PRICE_TRENDS[period]}>
              <defs>
                {[['rice','#e8622a'],['onion','#3060c8'],['oil','#2d8a5e']].map(([k,c]) => (
                  <linearGradient key={k} id={`g-${k}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={c} stopOpacity={0.12} />
                    <stop offset="95%" stopColor={c} stopOpacity={0} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey={period === 'weekly' ? 'day' : 'month'} tick={{ fill: '#b8b4ac', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#b8b4ac', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Area type="monotone" dataKey="rice" stroke="#e8622a" fill="url(#g-rice)" strokeWidth={2} name="Rice (₹/kg)" />
              <Area type="monotone" dataKey="onion" stroke="#3060c8" fill="url(#g-onion)" strokeWidth={2} name="Onion (₹/kg)" />
              <Area type="monotone" dataKey="oil" stroke="#2d8a5e" fill="url(#g-oil)" strokeWidth={2} name="Oil (₹/L)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Stock breakdown */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Stock Status</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Market availability overview</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
            {[
              { label: 'In Stock', count: inStock, color: '#2d8a5e', pct: Math.round(inStock / products.length * 100) },
              { label: 'Low Stock', count: lowStock, color: '#c47d0e', pct: Math.round(lowStock / products.length * 100) },
              { label: 'Out of Stock', count: outOfStock, color: '#c0392b', pct: Math.round(outOfStock / products.length * 100) },
            ].map(({ label, count, color, pct }) => (
              <div key={label}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{label}</span>
                  <span style={{ fontSize: '0.82rem', fontWeight: 600, color }}>{count} ({pct}%)</span>
                </div>
                <div style={{ background: 'var(--bg)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                  <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7 }}
                    style={{ height: '100%', background: color, borderRadius: 4 }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 24 }}>
            <h4 style={{ fontWeight: 700, fontSize: '0.85rem', color: 'var(--text)', marginBottom: 12 }}>By Category</h4>
            <ResponsiveContainer width="100%" height={110}>
              <BarChart data={[{name:'Veg',v:4},{name:'Spices',v:4},{name:'Oils',v:2},{name:'Dairy',v:3},{name:'Flour',v:2}]} margin={{ left: -28, right: 0 }}>
                <XAxis dataKey="name" tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
                <Bar dataKey="v" fill="#e8622a" radius={[3,3,0,0]} opacity={0.75} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Market feed */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Live Market Feed</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Recent updates from suppliers</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5, background: '#e8f5ee', border: '1px solid #c0ddd0', borderRadius: 20, padding: '4px 10px', fontSize: '0.72rem', color: '#2d8a5e', fontWeight: 600 }}>
            <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#2d8a5e', animation: 'pulse 2s infinite' }} /> Live
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Product</th><th>Category</th><th>Supplier</th><th>Price</th><th>Stock</th><th>Status</th><th>Location</th></tr></thead>
            <tbody>
              {products.slice(0, 8).map(p => (
                <tr key={p.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: '1.1rem' }}>{p.image}</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>{p.name}</span></div></td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td>{p.supplierName}</td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{p.price}/{p.unit}</td>
                  <td style={{ color: p.stock <= 20 ? '#c47d0e' : 'var(--text-secondary)', fontWeight: 500 }}>{p.stock}</td>
                  <td><span className={`badge ${p.status==='In Stock'?'badge-green':p.status==='Low Stock'?'badge-amber':'badge-red'}`}>{p.status}</span></td>
                  <td style={{ fontSize: '0.82rem' }}>{p.location}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
