import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, LogOut, User, Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function Navbar() {
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, role, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Signed out successfully');
    navigate('/');
  };

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      background: 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(16px)',
      borderBottom: '1px solid #e8e4dc',
    }}>
      <div style={{ maxWidth: 1160, margin: '0 auto', padding: '0 24px', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
          <div style={{ width: 30, height: 30, borderRadius: 8, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={15} color="#fff" fill="#fff" />
          </div>
          <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.05rem', color: '#1a1814', letterSpacing: '-0.01em' }}>
            Vendor<span style={{ color: '#e8622a' }}>Bridge</span>
          </span>
        </Link>

        {/* Center nav */}
        <div style={{ display: 'flex', gap: 28, alignItems: 'center' }} className="nav-links">
          {['Features', 'How It Works', 'Roadmap'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(/\s+/g, '-')}`}
              style={{ color: '#6b6560', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.15s' }}
              onMouseEnter={e => e.target.style.color = '#1a1814'}
              onMouseLeave={e => e.target.style.color = '#6b6560'}>
              {item}
            </a>
          ))}
        </div>

        {/* Right */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {user ? (
            <div style={{ position: 'relative' }}>
              <button onClick={() => setUserMenuOpen(o => !o)}
                style={{ display: 'flex', alignItems: 'center', gap: 7, background: 'var(--bg)', border: '1.5px solid var(--border)', borderRadius: 9, padding: '7px 12px', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 500, color: 'var(--text)', fontFamily: 'Inter' }}>
                <div style={{ width: 22, height: 22, borderRadius: '50%', background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.7rem', fontWeight: 700 }}>
                  {user?.displayName?.[0] || 'U'}
                </div>
                {user?.displayName?.split(' ')[0] || 'User'}
                <ChevronDown size={13} color="#9c9691" />
              </button>
              <AnimatePresence>
                {userMenuOpen && (
                  <motion.div initial={{ opacity: 0, y: -6, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }}
                    style={{ position: 'absolute', top: 44, right: 0, minWidth: 200, background: '#fff', border: '1px solid var(--border)', borderRadius: 12, overflow: 'hidden', zIndex: 200, boxShadow: '0 8px 24px rgba(0,0,0,0.1)' }}>
                    <div style={{ padding: '12px 14px', borderBottom: '1px solid var(--border-light)' }}>
                      <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: 2 }}>Signed in as</div>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text)' }}>{user.email}</div>
                      {role && <span className="badge badge-orange" style={{ marginTop: 5 }}>{role}</span>}
                    </div>
                    {role && (
                      <button onClick={() => { navigate(`/${role}`); setUserMenuOpen(false); }}
                        style={{ width: '100%', padding: '11px 14px', background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', textAlign: 'left', fontSize: '0.875rem', fontFamily: 'Inter' }}
                        onMouseEnter={e => e.currentTarget.style.background = 'var(--bg)'}
                        onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                        Dashboard
                      </button>
                    )}
                    <button onClick={handleLogout}
                      style={{ width: '100%', padding: '11px 14px', background: 'none', border: 'none', color: 'var(--danger)', cursor: 'pointer', textAlign: 'left', fontSize: '0.875rem', fontFamily: 'Inter', display: 'flex', alignItems: 'center', gap: 7 }}
                      onMouseEnter={e => e.currentTarget.style.background = '#fdecea'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}>
                      <LogOut size={13} /> Sign Out
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ) : (
            <>
              <Link to="/auth" style={{ textDecoration: 'none' }}>
                <button className="btn-ghost" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Sign In</button>
              </Link>
              <Link to="/auth" style={{ textDecoration: 'none' }}>
                <button className="btn-primary" style={{ padding: '8px 18px', fontSize: '0.875rem' }}>Get Started</button>
              </Link>
            </>
          )}
        </div>
      </div>
      <style>{`@media(max-width:700px){.nav-links{display:none!important}}`}</style>
    </nav>
  );
}
