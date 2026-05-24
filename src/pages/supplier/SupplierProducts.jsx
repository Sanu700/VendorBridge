import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Edit2, Trash2, X, ChevronUp, ChevronDown } from 'lucide-react';
import { useProducts } from '../../context/ProductsContext';
import { useDebounce } from '../../hooks';
import toast from 'react-hot-toast';

const DEMO_SUPPLIER_ID = 's1';
const DEMO_SUPPLIER_NAME = 'Ram Agro Traders';
const STATUS_OPTIONS = ['In Stock', 'Low Stock', 'Out of Stock'];
const CATEGORY_OPTIONS = ['Vegetables', 'Grains', 'Pulses', 'Spices', 'Oils', 'Dairy', 'Flour', 'Condiments'];
const UNIT_OPTIONS = ['kg', 'litre', 'piece', 'dozen', 'quintal'];
const EMOJI_OPTIONS = ['🌾', '🥔', '🧅', '🌶️', '🫙', '🥛', '🧀', '🫘', '🌿', '🟡', '🍚', '🥣'];
const DEFAULT_FORM = { name: '', category: 'Vegetables', price: '', unit: 'kg', stock: '', location: 'Delhi', image: '🌾', status: 'In Stock' };

const Label = ({ children }) => <label style={{ fontSize: '0.78rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'block', marginBottom: 5, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{children}</label>;

export default function SupplierProducts() {
  const { products, addProduct, updateProduct, deleteProduct } = useProducts();
  const [query, setQuery] = useState('');
  const [sortField, setSortField] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(DEFAULT_FORM);
  const [showModal, setShowModal] = useState(false);
  const dQ = useDebounce(query);

  const myProducts = products.filter(p => p.supplierId === DEMO_SUPPLIER_ID);
  const filtered = myProducts
    .filter(p => !dQ || p.name.toLowerCase().includes(dQ.toLowerCase()) || p.category.toLowerCase().includes(dQ.toLowerCase()))
    .sort((a, b) => {
      let va = a[sortField], vb = b[sortField];
      if (typeof va === 'string') { va = va.toLowerCase(); vb = vb.toLowerCase(); }
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });

  const handleSort = f => { if (sortField === f) setSortDir(d => d === 'asc' ? 'desc' : 'asc'); else { setSortField(f); setSortDir('asc'); } };
  const openEdit = p => { setEditingId(p.id); setForm({ name: p.name, category: p.category, price: p.price, unit: p.unit, stock: p.stock, location: p.location, image: p.image, status: p.status }); setShowModal(true); };
  const openAdd = () => { setEditingId(null); setForm(DEFAULT_FORM); setShowModal(true); };

  const handleSubmit = () => {
    if (!form.name || !form.price || !form.stock) { toast.error('Fill all required fields.'); return; }
    const data = { ...form, price: Number(form.price), stock: Number(form.stock), supplierId: DEMO_SUPPLIER_ID, supplierName: DEMO_SUPPLIER_NAME };
    if (editingId) { updateProduct(editingId, data); toast.success('Product updated ✅'); }
    else { addProduct(data); toast.success('Product added! 🎉'); }
    setShowModal(false);
  };

  const handleDelete = (id, name) => { if (confirm(`Delete "${name}"?`)) { deleteProduct(id); toast.success('Product removed.'); } };

  const SortIcon = ({ f }) => sortField !== f ? <span style={{ color: '#d0ccc4', marginLeft: 3 }}>↕</span> : sortDir === 'asc' ? <ChevronUp size={11} style={{ marginLeft: 3 }} /> : <ChevronDown size={11} style={{ marginLeft: 3 }} />;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 22, flexWrap: 'wrap', gap: 14 }}>
        <div>
          <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>My Products</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Manage your listings — changes sync live to vendor dashboards.</p>
        </div>
        <button className="btn-primary" onClick={openAdd}>+ Add Product</button>
      </div>

      <div style={{ position: 'relative', maxWidth: 360, marginBottom: 18 }}>
        <Search size={13} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#b8b4ac' }} />
        <input className="input-field" placeholder="Search your products..." value={query} onChange={e => setQuery(e.target.value)} style={{ paddingLeft: 32 }} />
      </div>

      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="card" style={{ overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ minWidth: 680 }}>
            <thead>
              <tr>
                {[['name','Product'],['category','Category'],['price','Price'],['stock','Stock'],['status','Status'],['location','Location']].map(([f, l]) => (
                  <th key={f} onClick={() => handleSort(f)} style={{ cursor: 'pointer', userSelect: 'none' }}>
                    <span style={{ display: 'inline-flex', alignItems: 'center' }}>{l}<SortIcon f={f} /></span>
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr><td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                  {query ? 'No products match your search.' : 'No products yet — click "Add Product" to get started.'}
                </td></tr>
              ) : filtered.map(p => (
                <tr key={p.id}>
                  <td><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: '1.1rem' }}>{p.image}</span><span style={{ color: 'var(--text)', fontWeight: 500 }}>{p.name}</span></div></td>
                  <td><span className="badge badge-blue">{p.category}</span></td>
                  <td style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{p.price}/{p.unit}</td>
                  <td style={{ color: p.stock <= 20 ? '#c47d0e' : 'var(--text-secondary)', fontWeight: 500 }}>{p.stock}</td>
                  <td><span className={`badge ${p.status==='In Stock'?'badge-green':p.status==='Low Stock'?'badge-amber':'badge-red'}`}>{p.status}</span></td>
                  <td style={{ fontSize: '0.82rem' }}>{p.location}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 7 }}>
                      <button onClick={() => openEdit(p)} style={{ background: '#eef3fd', border: '1px solid #c5d5f0', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', color: '#3060c8', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 600, fontFamily: 'Inter' }}>
                        <Edit2 size={11} /> Edit
                      </button>
                      <button onClick={() => handleDelete(p.id, p.name)} style={{ background: '#fdecea', border: '1px solid #f0c8c5', borderRadius: 6, padding: '6px 10px', cursor: 'pointer', color: '#c0392b', display: 'flex', alignItems: 'center', gap: 4, fontSize: '0.78rem', fontWeight: 600, fontFamily: 'Inter' }}>
                        <Trash2 size={11} /> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowModal(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(3px)', zIndex: 1000 }} />
            <motion.div initial={{ opacity: 0, scale: 0.94, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.94 }}
              style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', background: '#fff', border: '1px solid var(--border)', borderRadius: 18, padding: '30px', width: '90%', maxWidth: 500, zIndex: 1001, maxHeight: '90vh', overflowY: 'auto', boxShadow: '0 20px 60px rgba(0,0,0,0.14)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 22 }}>
                <h2 style={{ fontWeight: 700, fontSize: '1.15rem', color: 'var(--text)' }}>{editingId ? 'Edit Product' : 'Add New Product'}</h2>
                <button onClick={() => setShowModal(false)} style={{ background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 7, padding: 6, cursor: 'pointer', color: 'var(--text-muted)', display: 'flex' }}><X size={16} /></button>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {/* Emoji */}
                <div>
                  <Label>Product Icon</Label>
                  <div style={{ display: 'flex', gap: 7, flexWrap: 'wrap' }}>
                    {EMOJI_OPTIONS.map(e => (
                      <button key={e} onClick={() => setForm(f => ({ ...f, image: e }))}
                        style={{ width: 36, height: 36, borderRadius: 8, border: `2px solid ${form.image === e ? 'var(--primary)' : 'var(--border)'}`, background: form.image === e ? 'var(--primary-pale)' : '#fff', cursor: 'pointer', fontSize: '1.1rem', transition: 'all 0.12s' }}>
                        {e}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Product Name *</Label>
                  <input className="input-field" placeholder="e.g., Basmati Rice" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><Label>Category</Label>
                    <select className="input-field" value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))}>
                      {CATEGORY_OPTIONS.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                  <div><Label>Unit</Label>
                    <select className="input-field" value={form.unit} onChange={e => setForm(f => ({ ...f, unit: e.target.value }))}>
                      {UNIT_OPTIONS.map(u => <option key={u}>{u}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><Label>Price (₹) *</Label><input className="input-field" type="number" placeholder="68" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} /></div>
                  <div><Label>Stock Qty *</Label><input className="input-field" type="number" placeholder="500" value={form.stock} onChange={e => setForm(f => ({ ...f, stock: e.target.value }))} /></div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div><Label>Location</Label><input className="input-field" placeholder="e.g., Delhi" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} /></div>
                  <div><Label>Status</Label>
                    <select className="input-field" value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value }))}>
                      {STATUS_OPTIONS.map(s => <option key={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 10, paddingTop: 4 }}>
                  <button className="btn-ghost" onClick={() => setShowModal(false)} style={{ flex: 1 }}>Cancel</button>
                  <button className="btn-primary" onClick={handleSubmit} style={{ flex: 1, justifyContent: 'center' }}>{editingId ? 'Update Product' : 'Add to Marketplace'}</button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
