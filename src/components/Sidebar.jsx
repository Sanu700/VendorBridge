import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Search, Package, BarChart3, LogOut, Zap, PlusCircle, ChevronRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const VENDOR_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/vendor' },
  { icon: Search, label: 'Discover Suppliers', path: '/vendor/suppliers' },
  { icon: Package, label: 'Products', path: '/vendor/products' },
  { icon: BarChart3, label: 'Analytics', path: '/vendor/analytics' },
];
const SUPPLIER_NAV = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/supplier' },
  { icon: Package, label: 'My Products', path: '/supplier/products' },
  { icon: PlusCircle, label: 'Add Product', path: '/supplier/add' },
  { icon: BarChart3, label: 'Analytics', path: '/supplier/analytics' },
];

export default function Sidebar({ collapsed }) {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const navItems = role === 'supplier' ? SUPPLIER_NAV : VENDOR_NAV;

  const handleLogout = async () => {
    await logout();
    toast.success('See you soon!');
    navigate('/');
  };

  return (
    <aside style={{
      width: collapsed ? 64 : 224,
      minHeight: '100vh',
      background: '#1e1c19',
      display: 'flex', flexDirection: 'column',
      flexShrink: 0,
      transition: 'width 0.25s ease',
    }}>
      {/* Logo */}
      <div style={{ padding: collapsed ? '18px 14px' : '18px 16px', borderBottom: '1px solid rgba(255,255,255,0.07)', display: 'flex', alignItems: 'center', gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          <Zap size={16} color="#fff" fill="#fff" />
        </div>
        {!collapsed && <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1rem', color: '#fff', letterSpacing: '-0.01em', whiteSpace: 'nowrap' }}>Vendor<span style={{ color: '#f5885a' }}>Bridge</span></span>}
      </div>

      {/* User pill */}
      {!collapsed && (
        <div style={{ padding: '14px 12px', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: '10px 12px', display: 'flex', alignItems: 'center', gap: 9 }}>
            <div style={{ width: 30, height: 30, borderRadius: 7, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '0.8rem', fontWeight: 700, flexShrink: 0 }}>
              {user?.displayName?.[0] || 'U'}
            </div>
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#e8e4dc', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user?.displayName || 'Demo User'}</div>
              <span className="badge badge-orange" style={{ fontSize: '0.68rem', padding: '1px 7px', marginTop: 2 }}>{role}</span>
            </div>
          </div>
        </div>
      )}

      {/* Nav */}
      <nav style={{ flex: 1, padding: '10px 8px', display: 'flex', flexDirection: 'column', gap: 2 }}>
        {navItems.map(({ icon: Icon, label, path }) => {
          const active = location.pathname === path;
          return (
            <Link key={path} to={path} className={`sidebar-item ${active ? 'active' : ''}`} title={collapsed ? label : ''}>
              <Icon size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span>{label}</span>}
              {active && !collapsed && <ChevronRight size={13} style={{ marginLeft: 'auto', opacity: 0.5 }} />}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div style={{ padding: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
        <button onClick={handleLogout} className="sidebar-item" style={{ width: '100%', border: 'none', background: 'none', cursor: 'pointer' }} title={collapsed ? 'Sign Out' : ''}>
          <LogOut size={16} />
          {!collapsed && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
}
