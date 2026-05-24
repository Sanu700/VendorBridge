import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useProducts } from '../../context/ProductsContext';
import toast from 'react-hot-toast';

const CATEGORY_OPTIONS = ['Vegetables', 'Grains', 'Pulses', 'Spices', 'Oils', 'Dairy', 'Flour', 'Condiments'];
const UNIT_OPTIONS = ['kg', 'litre', 'piece', 'dozen', 'quintal'];
const EMOJI_OPTIONS = ['🌾', '🥔', '🧅', '🌶️', '🫙', '🥛', '🧀', '🫘', '🌿', '🟡', '🍚', '🥣'];
const DEMO_SUPPLIER_ID = 's1';
const DEMO_SUPPLIER_NAME = 'Ram Agro Traders';
const DEFAULT = { name: '', category: 'Vegetables', price: '', unit: 'kg', stock: '', location: 'Delhi', image: '🌾', status: 'In Stock' };

const Label = ({ children, required }) => (
  <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
    {children}{required && <span style={{ color: 'var(--primary)', marginLeft: 2 }}>*</span>}
  </label>
);

export default function AddProduct() {
  const [form, setForm] = useState(DEFAULT);
  const [saving, setSaving] = useState(false);
  const { addProduct } = useProducts();
  const navigate = useNavigate();
  const f = (key, val) => setForm(prev => ({ ...prev, [key]: val }));

  const handleSubmit = async () => {
    if (!form.name || !form.price || !form.stock) { toast.error('Please fill all required fields.'); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 500));
    addProduct({ ...form, price: Number(form.price), stock: Number(form.stock), supplierId: DEMO_SUPPLIER_ID, supplierName: DEMO_SUPPLIER_NAME });
    toast.success('Product added to marketplace! 🎉');
    navigate('/supplier/products');
  };

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>Add New Product</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>List a new product on the VendorBridge marketplace.</p>
      </div>

      <div style={{ maxWidth: 600 }}>
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
            {/* Emoji */}
            <div>
              <Label>Product Icon</Label>
              <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                {EMOJI_OPTIONS.map(e => (
                  <button key={e} onClick={() => f('image', e)}
                    style={{ width: 38, height: 38, borderRadius: 8, border: `2px solid ${form.image === e ? 'var(--primary)' : 'var(--border)'}`, background: form.image === e ? 'var(--primary-pale)' : '#fff', cursor: 'pointer', fontSize: '1.2rem', transition: 'all 0.12s' }}>
                    {e}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label required>Product Name</Label>
              <input className="input-field" placeholder="e.g., Basmati Rice, Toor Dal..." value={form.name} onChange={e => f('name', e.target.value)} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div><Label>Category</Label>
                <select className="input-field" value={form.category} onChange={e => f('category', e.target.value)}>
                  {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
                </select>
              </div>
              <div><Label>Unit</Label>
                <select className="input-field" value={form.unit} onChange={e => f('unit', e.target.value)}>
                  {UNIT_OPTIONS.map(u => <option key={u}>{u}</option>)}
                </select>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <div><Label required>Price (₹ per unit)</Label><input className="input-field" type="number" placeholder="68" value={form.price} onChange={e => f('price', e.target.value)} /></div>
              <div><Label required>Stock Quantity</Label><input className="input-field" type="number" placeholder="500" value={form.stock} onChange={e => f('stock', e.target.value)} /></div>
            </div>

            <div>
              <Label>Location</Label>
              <input className="input-field" placeholder="e.g., Azadpur Mandi, Delhi" value={form.location} onChange={e => f('location', e.target.value)} />
            </div>

            {/* Live preview */}
            {form.name && (
              <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                style={{ background: 'var(--primary-pale)', border: '1px solid #f0d0c0', borderRadius: 11, padding: '14px 16px' }}>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginBottom: 9, textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>Preview</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <span style={{ fontSize: '1.8rem' }}>{form.image}</span>
                  <div>
                    <div style={{ fontWeight: 700, color: 'var(--text)', fontSize: '0.95rem' }}>{form.name}</div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>{form.category} · {form.location}</div>
                    {form.price && form.stock && (
                      <div style={{ marginTop: 4 }}>
                        <span style={{ color: 'var(--primary)', fontWeight: 700, fontSize: '0.95rem' }}>₹{form.price}/{form.unit}</span>
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}> · {form.stock} units available</span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )}

            <div style={{ display: 'flex', gap: 10, paddingTop: 2 }}>
              <button className="btn-ghost" onClick={() => navigate('/supplier/products')} style={{ flex: 1 }}>Cancel</button>
              <button className="btn-primary" onClick={handleSubmit} disabled={saving} style={{ flex: 2, justifyContent: 'center' }}>
                {saving ? 'Adding…' : '+ Add to Marketplace'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
