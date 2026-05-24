import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Star, Shield, ChevronRight } from 'lucide-react';
import SearchFilter from '../../components/SearchFilter';
import { useProducts } from '../../context/ProductsContext';
import { useDebounce } from '../../hooks';

export default function SupplierDiscovery() {
  const { suppliers, products } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [location, setLocation] = useState('All');
  const dQ = useDebounce(query);

  const categories = ['All', ...new Set(suppliers.map(s => s.category))];
  const locations = ['All', ...new Set(suppliers.map(s => s.location.split(',')[1]?.trim() || s.location))];

  const filtered = suppliers.filter(s => {
    const mQ = !dQ || s.name.toLowerCase().includes(dQ.toLowerCase()) || s.category.toLowerCase().includes(dQ.toLowerCase()) || s.location.toLowerCase().includes(dQ.toLowerCase());
    return mQ && (category === 'All' || s.category.includes(category)) && (location === 'All' || s.location.includes(location));
  });

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>Supplier Discovery</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Find verified raw material suppliers near you.</p>
      </div>

      <div style={{ marginBottom: 18 }}>
        <SearchFilter query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} categories={categories} location={location} onLocationChange={setLocation} locations={locations} placeholder="Search suppliers, categories, locations..." />
      </div>

      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>{filtered.length} supplier{filtered.length !== 1 ? 's' : ''} found</p>

      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>🔍</div>
          <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No suppliers found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 16 }}>
          {filtered.map((supplier, i) => {
            const supProducts = products.filter(p => p.supplierId === supplier.id);
            const avgPrice = supProducts.length ? Math.round(supProducts.reduce((s, p) => s + p.price, 0) / supProducts.length) : 0;
            return (
              <motion.div key={supplier.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card card-hover" style={{ overflow: 'hidden' }}>
                {/* Header */}
                <div style={{ padding: '18px', background: 'var(--bg)', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{ width: 46, height: 46, borderRadius: 11, background: '#fff', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', flexShrink: 0 }}>
                    {supplier.avatar}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                      <span style={{ fontWeight: 700, fontSize: '0.92rem', color: 'var(--text)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{supplier.name}</span>
                      {supplier.verified && <Shield size={13} color="#3060c8" fill="#3060c8" />}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 3 }}>
                      <MapPin size={11} color="var(--text-muted)" />
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{supplier.location}</span>
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', flexShrink: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 3, justifyContent: 'flex-end' }}>
                      <Star size={12} fill="#f5a623" color="#f5a623" />
                      <span style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{supplier.rating}</span>
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: 1 }}>Rating</div>
                  </div>
                </div>

                {/* Body */}
                <div style={{ padding: '14px 18px' }}>
                  <span className="badge badge-blue" style={{ marginBottom: 12 }}>{supplier.category}</span>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
                    {[
                      { label: 'Products', value: supProducts.length },
                      { label: 'Avg Price', value: `₹${avgPrice}` },
                      { label: 'Since', value: new Date(supplier.joinedAt).getFullYear() },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginBottom: 2, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{label}</div>
                        <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)' }}>{value}</div>
                      </div>
                    ))}
                  </div>

                  {supProducts.length > 0 && (
                    <div style={{ background: 'var(--bg)', borderRadius: 8, padding: '9px 11px', display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 13 }}>
                      {supProducts.slice(0, 3).map(p => (
                        <span key={p.id} style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', background: '#fff', border: '1px solid var(--border)', padding: '2px 8px', borderRadius: 5 }}>
                          {p.image} {p.name}
                        </span>
                      ))}
                      {supProducts.length > 3 && <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>+{supProducts.length - 3} more</span>}
                    </div>
                  )}

                  <button style={{ width: '100%', padding: '9px', borderRadius: 8, background: 'var(--primary-pale)', border: '1px solid #f0d0c0', color: 'var(--primary)', cursor: 'pointer', fontWeight: 600, fontSize: '0.82rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 5, fontFamily: 'Inter' }}>
                    View Products <ChevronRight size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
