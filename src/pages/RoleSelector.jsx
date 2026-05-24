import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, Truck, ArrowRight, Check } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const ROLES = [
  { id: 'vendor', label: 'I am a Vendor', sublabel: 'Street food stall, small restaurant, or food cart', icon: ShoppingBag, color: '#e8622a', perks: ['Live raw material price feed', 'Discover & compare verified suppliers', 'Get low-stock & price alerts', 'Market intelligence dashboard'] },
  { id: 'supplier', label: 'I am a Supplier', sublabel: 'Wholesaler, distributor, or mandi trader', icon: Truck, color: '#3060c8', perks: ['List and manage your products', 'Reach thousands of vendors', 'Real-time inventory management', 'Supplier analytics dashboard'] },
];

export default function RoleSelector() {
  const [selected, setSelected] = useState(null);
  const [saving, setSaving] = useState(false);
  const { saveRole } = useAuth();
  const navigate = useNavigate();

  const handleContinue = async () => {
    if (!selected) return;
    setSaving(true);
    try {
      await saveRole(selected);
      toast.success(`Dashboard ready! Welcome, ${selected}. 🎉`);
      navigate(`/${selected}`);
    } catch { toast.error('Something went wrong.'); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <div className="dots-bg" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ maxWidth: 740, width: '100%', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: 40 }}>
          <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 800, marginBottom: 10, color: 'var(--text)', letterSpacing: '-0.02em' }}>
            Who are you on <span className="gradient-text">VendorBridge?</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>Choose your role to get your personalized dashboard.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16, marginBottom: 28 }}>
          {ROLES.map(role => (
            <motion.div key={role.id} whileHover={{ scale: 1.015 }} whileTap={{ scale: 0.985 }} onClick={() => setSelected(role.id)}
              className="card"
              style={{ padding: '28px', cursor: 'pointer', border: `2px solid ${selected === role.id ? role.color : 'var(--border)'}`, background: selected === role.id ? (role.color === '#e8622a' ? '#fdf2ed' : '#eef3fd') : '#fff', transition: 'all 0.15s', position: 'relative' }}>
              {selected === role.id && (
                <div style={{ position: 'absolute', top: 14, right: 14, width: 22, height: 22, borderRadius: '50%', background: role.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Check size={12} color="#fff" />
                </div>
              )}
              <div style={{ width: 48, height: 48, borderRadius: 12, background: role.color + '15', border: `1px solid ${role.color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                <role.icon size={22} color={role.color} />
              </div>
              <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: 5, color: 'var(--text)' }}>{role.label}</h3>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: 18, lineHeight: 1.5 }}>{role.sublabel}</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {role.perks.map((p, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 7 }}>
                    <Check size={13} color={role.color} style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <button onClick={handleContinue} disabled={!selected || saving} className="btn-primary"
            style={{ padding: '12px 36px', fontSize: '0.95rem', opacity: selected ? 1 : 0.45 }}>
            {saving ? 'Setting up…' : 'Continue to Dashboard'} <ArrowRight size={15} />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
