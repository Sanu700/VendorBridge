import { motion } from 'framer-motion';
import { Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import StatCard from '../../components/StatCard';
import { useProducts } from '../../context/ProductsContext';
import { useAuth } from '../../context/AuthContext';

const DEMO_SUPPLIER_ID = 's1';

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 9, padding: '9px 13px', fontSize: '0.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}>
    <div style={{ color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
    {payload.map((p, i) => <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ₹{p.value}</div>)}
  </div>
) : null;

export default function SupplierHome() {
  const { products } = useProducts();
  const { user } = useAuth();
  const myProducts = products.filter(p => p.supplierId === DEMO_SUPPLIER_ID);

  const totalValue = myProducts.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStockItems = myProducts.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock');
  const activeListings = myProducts.filter(p => p.status === 'In Stock').length;

  const categoryData = Object.entries(myProducts.reduce((acc, p) => { acc[p.category] = (acc[p.category] || 0) + 1; return acc; }, {})).map(([name, value]) => ({ name, value }));
  const colors = ['#e8622a', '#3060c8', '#2d8a5e', '#7c3aed', '#c47d0e'];

  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>
          Supplier Dashboard 👋
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage your inventory and track your listings in real-time.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard title="Total Products" value={myProducts.length} subtitle="Active listings" icon={Package} trend="up" trendValue="+2 this week" color="#e8622a" delay={0} />
        <StatCard title="Inventory Value" value={`₹${(totalValue/1000).toFixed(1)}K`} subtitle="Across all products" icon={DollarSign} trend="up" trendValue="+12%" color="#2d8a5e" delay={0.05} />
        <StatCard title="Active Listings" value={activeListings} subtitle="In stock right now" icon={TrendingUp} trendValue={`${myProducts.length - activeListings} inactive`} color="#3060c8" delay={0.1} />
        <StatCard title="Low Stock Alerts" value={lowStockItems.length} subtitle="Need restocking" icon={AlertTriangle} trend={lowStockItems.length > 0 ? 'down' : 'up'} trendValue={lowStockItems.length > 0 ? 'Action needed' : 'All clear'} color="#c47d0e" delay={0.15} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 16, marginBottom: 18 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Product Prices</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Current price per unit across your listings</p>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={myProducts.map(p => ({ name: p.name.length > 10 ? p.name.slice(0,10)+'…' : p.name, price: p.price }))} margin={{ left: -20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="name" tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="price" fill="#e8622a" radius={[4,4,0,0]} name="Price (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Product Mix</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Products by category</p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 11 }}>
            {categoryData.map(({ name, value }, i) => {
              const max = Math.max(...categoryData.map(c => c.value));
              const pct = Math.round((value / max) * 100);
              return (
                <div key={name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', fontWeight: 500 }}>{name}</span>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: colors[i % colors.length] }}>{value} item{value!==1?'s':''}</span>
                  </div>
                  <div style={{ background: 'var(--bg)', borderRadius: 4, height: 5, overflow: 'hidden' }}>
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.7, delay: i * 0.08 }}
                      style={{ height: '100%', background: colors[i % colors.length], borderRadius: 4 }} />
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop: 20, padding: '12px 14px', background: lowStockItems.length > 0 ? '#fdf5e0' : '#e8f5ee', border: `1px solid ${lowStockItems.length > 0 ? '#ecd898' : '#c0ddd0'}`, borderRadius: 10 }}>
            <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginBottom: 3 }}>Inventory Health</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: lowStockItems.length > 0 ? '#c47d0e' : '#2d8a5e' }}>
              {lowStockItems.length > 0 ? `⚠️ ${lowStockItems.length} items need attention` : '✅ All stocked up!'}
            </div>
          </div>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Your Listings</h3>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>All products you've listed on the marketplace</p>
          </div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Product</th><th>Category</th><th>Price</th><th>Stock</th><th>Value</th><th>Status</th></tr></thead>
            <tbody>
              {myProducts.map(p => (
                <tr key={p.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: '1.1rem' }}>{p.image}</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>{p.name}</span></div></td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{p.price}/{p.unit}</td>
                  <td style={{ color: p.stock <= 20 ? '#c47d0e' : 'var(--text-secondary)', fontWeight: 500 }}>{p.stock}</td>
                  <td style={{ color: '#2d8a5e', fontWeight: 600 }}>₹{(p.price * p.stock).toLocaleString()}</td>
                  <td><span className={`badge ${p.status==='In Stock'?'badge-green':p.status==='Low Stock'?'badge-amber':'badge-red'}`}>{p.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
