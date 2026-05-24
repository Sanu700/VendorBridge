import { motion } from 'framer-motion';
import { MapPin, Package } from 'lucide-react';

export default function ProductCard({ product, onEdit, onDelete, showActions = false, delay = 0 }) {
  const statusBadge = { 'In Stock': 'badge-green', 'Low Stock': 'badge-amber', 'Out of Stock': 'badge-red' };

  return (
    <motion.div initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay }}
      className="card card-hover" style={{ overflow: 'hidden' }}>
      {/* Top */}
      <div style={{ padding: '16px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12, background: 'var(--bg)' }}>
        <div style={{ width: 42, height: 42, borderRadius: 10, background: '#fff', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', flexShrink: 0 }}>
          {product.image}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.name}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 1 }}>{product.category}</div>
        </div>
        <span className={`badge ${statusBadge[product.status] || 'badge-amber'}`}>{product.status}</span>
      </div>

      {/* Body */}
      <div style={{ padding: '14px 16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12 }}>
          <div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Price</div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'var(--primary)', fontFamily: 'Plus Jakarta Sans' }}>
              ₹{product.price}<span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 400 }}>/{product.unit}</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 1, textTransform: 'uppercase', letterSpacing: '0.04em' }}>Stock</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: product.stock <= 20 ? '#c47d0e' : '#2d8a5e' }}>{product.stock} {product.unit}s</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <Package size={11} color="var(--text-muted)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{product.supplierName}</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
            <MapPin size={11} color="var(--text-muted)" />
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{product.location}</span>
          </div>
        </div>

        {/* Sparkline */}
        {product.priceHistory?.length > 1 && (
          <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--border-light)' }}>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 2, height: 20 }}>
              {product.priceHistory.slice(-7).map((p, i) => {
                const max = Math.max(...product.priceHistory), min = Math.min(...product.priceHistory);
                const h = max === min ? 10 : ((p - min) / (max - min)) * 16 + 4;
                const isLast = i === product.priceHistory.slice(-7).length - 1;
                return <div key={i} style={{ flex: 1, height: h, borderRadius: 2, background: isLast ? '#e8622a' : '#f0d0c0', minWidth: 4 }} />;
              })}
            </div>
          </div>
        )}

        {showActions && (
          <div style={{ display: 'flex', gap: 8, marginTop: 12 }}>
            <button onClick={() => onEdit?.(product)} style={{ flex: 1, padding: '7px', border: '1.5px solid #c5d5f0', borderRadius: 7, background: '#eef3fd', color: '#3060c8', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Edit</button>
            <button onClick={() => onDelete?.(product.id)} style={{ flex: 1, padding: '7px', border: '1.5px solid #f0c8c5', borderRadius: 7, background: '#fdecea', color: '#c0392b', cursor: 'pointer', fontSize: '0.8rem', fontWeight: 600 }}>Delete</button>
          </div>
        )}
      </div>
    </motion.div>
  );
}
