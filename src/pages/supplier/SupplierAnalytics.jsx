import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useProducts } from '../../context/ProductsContext';
import StatCard from '../../components/StatCard';
import { Package, DollarSign, TrendingUp, AlertTriangle } from 'lucide-react';

const DEMO_SUPPLIER_ID = 's1';

const TT = ({ active, payload, label }) => active && payload?.length ? (
  <div style={{ background: '#fff', border: '1px solid var(--border)', borderRadius: 9, padding: '9px 13px', fontSize: '0.8rem', boxShadow: '0 4px 12px rgba(0,0,0,0.07)' }}>
    <div style={{ color: 'var(--text-muted)', marginBottom: 5 }}>{label}</div>
    {payload.map((p, i) => <div key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: ₹{p.value}</div>)}
  </div>
) : null;

export default function SupplierAnalytics() {
  const { products } = useProducts();
  const myProducts = products.filter(p => p.supplierId === DEMO_SUPPLIER_ID);
  const totalValue = myProducts.reduce((s, p) => s + p.price * p.stock, 0);
  const lowStock = myProducts.filter(p => p.status === 'Low Stock' || p.status === 'Out of Stock').length;
  const activeListings = myProducts.filter(p => p.status === 'In Stock').length;

  const stockData = myProducts.map(p => ({ name: p.name.length > 10 ? p.name.slice(0, 10) + '…' : p.name, stock: p.stock, value: p.price * p.stock }));
  const revenueData = [{ month: 'Jan', revenue: 42000 }, { month: 'Feb', revenue: 48000 }, { month: 'Mar', revenue: 55000 }, { month: 'Apr', revenue: 51000 }, { month: 'May', revenue: 67000 }];

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>Supplier Analytics</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Track your inventory performance and listing insights.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(195px, 1fr))', gap: 14, marginBottom: 22 }}>
        <StatCard title="Total Products" value={myProducts.length} icon={Package} color="#e8622a" delay={0} />
        <StatCard title="Inventory Value" value={`₹${(totalValue/1000).toFixed(1)}K`} icon={DollarSign} color="#2d8a5e" delay={0.05} trend="up" trendValue="+12%" />
        <StatCard title="Active Listings" value={activeListings} icon={TrendingUp} color="#3060c8" delay={0.1} />
        <StatCard title="Low Stock" value={lowStock} icon={AlertTriangle} color="#c47d0e" delay={0.15} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Stock Levels</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Current units available per product</p>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={stockData} margin={{ left: -22 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="name" tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Bar dataKey="stock" fill="#3060c8" radius={[4, 4, 0, 0]} name="Stock" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card" style={{ padding: 22 }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)', marginBottom: 3 }}>Revenue Trend</h3>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 18 }}>Estimated monthly revenue (₹)</p>
          <ResponsiveContainer width="100%" height={190}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0ece6" />
              <XAxis dataKey="month" tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#b8b4ac', fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<TT />} />
              <Line type="monotone" dataKey="revenue" stroke="#e8622a" strokeWidth={2} dot={{ fill: '#e8622a', r: 4 }} name="Revenue (₹)" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card" style={{ overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-light)' }}>
          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text)' }}>Inventory Value Breakdown</h3>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead><tr><th>Product</th><th>Price/Unit</th><th>Stock</th><th>Total Value</th><th>Share</th></tr></thead>
            <tbody>
              {myProducts.sort((a, b) => (b.price * b.stock) - (a.price * a.stock)).map(p => {
                const val = p.price * p.stock;
                const pct = Math.round(val / totalValue * 100);
                return (
                  <tr key={p.id}>
                    <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span>{p.image}</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>{p.name}</span></div></td>
                    <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{p.price}/{p.unit}</td>
                    <td style={{ color: 'var(--text-secondary)' }}>{p.stock}</td>
                    <td style={{ color: '#2d8a5e', fontWeight: 700 }}>₹{val.toLocaleString()}</td>
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <div style={{ flex: 1, background: 'var(--bg)', borderRadius: 4, height: 5, width: 80, overflow: 'hidden' }}>
                          <div style={{ width: `${pct}%`, height: '100%', background: 'var(--primary)', borderRadius: 4 }} />
                        </div>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', minWidth: 28 }}>{pct}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
