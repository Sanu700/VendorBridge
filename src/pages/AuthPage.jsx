import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowLeft, Globe } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export default function AuthPage() {
  const [loading, setLoading] = useState(false);
  const { signInWithGoogle, user, role } = useAuth();
  const navigate = useNavigate();

  if (user && role) { navigate(`/${role}`); return null; }

  const handleGoogleSignIn = async () => {
    setLoading(true);
    try {
      await signInWithGoogle();
      toast.success('Signed in! 🎉');
      navigate('/select-role');
    } catch {
      toast.error('Sign in failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24, position: 'relative' }}>
      <div className="dots-bg" style={{ position: 'absolute', inset: 0, opacity: 0.6 }} />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        className="card" style={{ maxWidth: 420, width: '100%', padding: '40px 36px', position: 'relative', zIndex: 1, boxShadow: '0 8px 40px rgba(0,0,0,0.07)' }}>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 5, color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.82rem', marginBottom: 28 }}>
          <ArrowLeft size={13} /> Back to home
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: 9, marginBottom: 28 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Zap size={18} color="#fff" fill="#fff" />
          </div>
          <div>
            <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.1rem', color: 'var(--text)' }}>Vendor<span style={{ color: '#e8622a' }}>Bridge</span></div>
            <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>B2B Marketplace</div>
          </div>
        </div>

        <h1 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: 6, color: 'var(--text)' }}>Welcome back</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: 28, lineHeight: 1.6 }}>
          Sign in to access your dashboard. New users will choose a role after signing in.
        </p>

        {/* Demo notice */}
        <div style={{ background: '#fdf5e0', border: '1px solid #ecd898', borderRadius: 10, padding: '11px 13px', marginBottom: 22, display: 'flex', gap: 8 }}>
          <span style={{ fontSize: '0.85rem', flexShrink: 0 }}>⚡</span>
          <div style={{ fontSize: '0.8rem', color: '#7a5a00', lineHeight: 1.5 }}>
            <strong>Demo Mode</strong> — Click sign in to explore with sample data. No Firebase setup needed.
          </div>
        </div>

        <button onClick={handleGoogleSignIn} disabled={loading}
          style={{ width: '100%', padding: '12px', borderRadius: 9, background: '#fff', border: '1.5px solid var(--border)', color: 'var(--text)', cursor: loading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, fontFamily: 'Inter', fontWeight: 600, fontSize: '0.9rem', transition: 'all 0.15s', opacity: loading ? 0.7 : 1, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}
          onMouseEnter={e => !loading && (e.currentTarget.style.borderColor = '#e8622a')}
          onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}>
          {loading
            ? <div style={{ width: 18, height: 18, border: '2px solid #e8622a33', borderTopColor: '#e8622a', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            : <Globe size={17} color="#e8622a" />}
          {loading ? 'Signing in…' : 'Continue with Google'}
        </button>

        <p style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 22, lineHeight: 1.6 }}>
          By continuing, you agree to our <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Terms</span> and <span style={{ color: 'var(--primary)', cursor: 'pointer' }}>Privacy Policy</span>.
        </p>
      </motion.div>
      <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
    </div>
  );
}
