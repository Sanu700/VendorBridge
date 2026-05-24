import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, ArrowRight, TrendingUp, Search, Package, BarChart3, Shield, Clock, Star, Check, ShoppingCart, MapPin, Brain, Smartphone } from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import Navbar from '../components/Navbar';

const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { delay, duration: 0.45 } });

const STATS = [
  { value: '12,000+', label: 'Street Vendors' },
  { value: '800+', label: 'Verified Suppliers' },
  { value: '₹2.4Cr', label: 'Monthly GMV' },
  { value: '34%', label: 'Avg Cost Saving' },
];

const FEATURES = [
  { icon: TrendingUp, title: 'Real-time Price Tracking', desc: 'Monitor raw material prices across suppliers instantly. Set alerts and never overpay again.', color: '#e8622a' },
  { icon: Search, title: 'Supplier Discovery', desc: 'Find verified suppliers by category, location, or product. Filter by rating and stock.', color: '#3060c8' },
  { icon: Package, title: 'Inventory Visibility', desc: 'See live stock levels before placing bulk orders — no surprises, no wasted trips.', color: '#2d8a5e' },
  { icon: BarChart3, title: 'Market Intelligence', desc: 'Weekly price trends, demand insights, and forecasts for smarter purchasing decisions.', color: '#7c3aed' },
  { icon: Shield, title: 'Verified Suppliers', desc: 'All suppliers are vetted before listing. Trade with complete confidence.', color: '#c47d0e' },
  { icon: Clock, title: 'Live Sync', desc: 'Price and stock changes update in real-time across all vendor and supplier dashboards.', color: '#d63384' },
];

const STEPS = [
  { num: '01', title: 'Create Your Account', desc: 'Sign up as a Vendor or Supplier in under 60 seconds via Google.', emoji: '🚀' },
  { num: '02', title: 'Discover the Market', desc: 'Browse verified suppliers, live prices, and real-time inventory.', emoji: '🔍' },
  { num: '03', title: 'Compare & Connect', desc: 'Filter by price, location, and category to find your best match.', emoji: '🤝' },
  { num: '04', title: 'Track & Save', desc: 'Monitor price trends and grow your business with data.', emoji: '📈' },
];

const ROADMAP = [
  { icon: ShoppingCart, title: 'Order Booking System', desc: 'Place and manage orders directly on the platform', status: 'Q3 2025' },
  { icon: MapPin, title: 'Map-Based Locator', desc: 'Find suppliers near you with geo-based search', status: 'Q4 2025' },
  { icon: Brain, title: 'Analytics Engine', desc: 'AI-driven purchase recommendations and demand forecasts', status: 'Q1 2026' },
  { icon: Smartphone, title: 'Mobile-First App', desc: 'Native Android/iOS app built for smartphone-first vendors', status: 'Q2 2026' },
];

const PROBLEMS = ['No transparency in raw material pricing', 'Unorganized, offline supplier discovery', 'Zero inventory visibility before ordering', 'No market data for smart purchasing decisions', 'Exploitative middlemen in supply chains'];
const SOLUTIONS = ['Live price feed from 800+ verified suppliers', 'Searchable supplier marketplace with smart filters', 'Real-time stock levels before you order', 'Weekly price trends & market intelligence reports', 'Direct vendor–supplier connections, zero middlemen'];

export default function LandingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)' }}>
      <Navbar />

      {/* Hero */}
      <section style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', paddingTop: 60, background: 'linear-gradient(160deg, #fff8f5 0%, #fdf7f0 55%, var(--bg) 100%)', position: 'relative', overflow: 'hidden' }}>
        <div className="dots-bg" style={{ position: 'absolute', inset: 0, opacity: 0.45 }} />
        {/* Soft blob */}
        <div style={{ position: 'absolute', width: 520, height: 520, borderRadius: '50%', background: 'radial-gradient(circle, rgba(232,98,42,0.08) 0%, transparent 70%)', top: '40%', left: '55%', transform: 'translate(-50%,-50%)', pointerEvents: 'none' }} />

        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '80px 24px', textAlign: 'center', position: 'relative' }}>
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#fdf2ed', border: '1px solid #f0d0c0', borderRadius: 20, padding: '5px 14px', fontSize: '0.78rem', color: '#e8622a', fontWeight: 600, marginBottom: 28 }}>
              <Zap size={12} fill="#e8622a" /> Built for India's Informal Food Economy
            </span>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08, duration: 0.55 }}
            style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: 'clamp(2.2rem, 5.5vw, 3.8rem)', lineHeight: 1.1, marginBottom: 22, color: 'var(--text)', letterSpacing: '-0.025em' }}>
            Connecting Street Food Vendors<br />
            <span className="gradient-text">With Raw Material Suppliers.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.16 }}
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: 'var(--text-secondary)', maxWidth: 580, margin: '0 auto 36px', lineHeight: 1.7 }}>
            Bringing pricing transparency and supply chain structure to India's informal food economy.
            <strong style={{ color: 'var(--text)' }}> Save up to 34%</strong> on raw material costs.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.24 }}
            style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/auth"><button className="btn-primary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>Get Started Free <ArrowRight size={15} /></button></Link>
            <Link to="/auth"><button className="btn-secondary" style={{ padding: '12px 28px', fontSize: '0.95rem' }}>Explore Marketplace</button></Link>
          </motion.div>

          {/* Stats strip */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: 64, background: '#fff', border: '1px solid var(--border)', borderRadius: 16, overflow: 'hidden', maxWidth: 660, margin: '64px auto 0', flexWrap: 'wrap', boxShadow: '0 2px 12px rgba(0,0,0,0.05)' }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ flex: 1, padding: '20px 18px', textAlign: 'center', minWidth: 130, borderRight: i < STATS.length - 1 ? '1px solid var(--border-light)' : 'none' }}>
                <div style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>{s.value}</div>
                <div style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginTop: 3, fontWeight: 500 }}>{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem / Solution */}
      <section id="problem" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              The Problem We're <span className="gradient-text">Solving</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 480, margin: '0 auto' }}>India's 5 crore+ street food vendors operate without any supply chain infrastructure.</p>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 20 }}>
            <motion.div {...fadeUp(0.05)} style={{ background: '#fdecea', border: '1px solid #f0c8c5', borderRadius: 16, padding: '28px 30px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#c0392b', marginBottom: 18 }}>❌ Without VendorBridge</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {PROBLEMS.map((p, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <span style={{ color: '#c0392b', fontWeight: 700, flexShrink: 0 }}>✕</span>
                    <span style={{ color: '#5a2020', fontSize: '0.875rem', lineHeight: 1.55 }}>{p}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div {...fadeUp(0.1)} style={{ background: '#e8f5ee', border: '1px solid #c0ddd0', borderRadius: 16, padding: '28px 30px' }}>
              <h3 style={{ fontWeight: 700, fontSize: '1rem', color: '#2d8a5e', marginBottom: 18 }}>✅ With VendorBridge</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {SOLUTIONS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                    <Check size={15} color="#2d8a5e" style={{ flexShrink: 0, marginTop: 2 }} />
                    <span style={{ color: '#1a4a35', fontSize: '0.875rem', lineHeight: 1.55 }}>{s}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" style={{ padding: '90px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Trade <span className="gradient-text">Smarter</span> with Every Feature
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', maxWidth: 460, margin: '0 auto' }}>One platform. Two dashboards. End-to-end supply chain visibility.</p>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(290px, 1fr))', gap: 16 }}>
            {FEATURES.map((f, i) => (
              <motion.div key={i} {...fadeUp(i * 0.06)} className="card card-hover" style={{ padding: '24px' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: f.color + '12', border: `1px solid ${f.color}25`, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 14 }}>
                  <f.icon size={20} color={f.color} />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 7, color: 'var(--text)' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.855rem', lineHeight: 1.65 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Up & Running in <span className="gradient-text">4 Simple Steps</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16 }}>
            {STEPS.map((s, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card" style={{ padding: '26px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: 12, right: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '2.2rem', color: '#f0ece6', lineHeight: 1 }}>{s.num}</div>
                <div style={{ fontSize: '1.8rem', marginBottom: 14 }}>{s.emoji}</div>
                <h3 style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: 7, color: 'var(--text)' }}>{s.title}</h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.855rem', lineHeight: 1.65 }}>{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '90px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Loved by Vendors & <span className="gradient-text">Suppliers Alike</span>
            </h2>
          </motion.div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card card-hover" style={{ padding: '24px' }}>
                <div style={{ display: 'flex', marginBottom: 12 }}>
                  {[...Array(t.stars)].map((_, j) => <Star key={j} size={13} fill="#f5a623" color="#f5a623" />)}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.7, marginBottom: 18, fontStyle: 'italic' }}>"{t.text}"</p>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--primary-pale)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.875rem', color: 'var(--text)' }}>{t.name}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{t.role}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" style={{ padding: '90px 24px', background: '#fff' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <motion.div {...fadeUp()} style={{ textAlign: 'center', marginBottom: 52 }}>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.7rem, 3.5vw, 2.5rem)', marginBottom: 12, letterSpacing: '-0.02em' }}>
              Product <span className="gradient-text">Roadmap</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>What's coming next for VendorBridge</p>
          </motion.div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {ROADMAP.map((item, i) => (
              <motion.div key={i} {...fadeUp(i * 0.08)} className="card" style={{ display: 'flex', alignItems: 'center', gap: 18, padding: '18px 22px' }}>
                <div style={{ width: 42, height: 42, borderRadius: 10, background: 'var(--primary-pale)', border: '1px solid #f0d0c0', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <item.icon size={20} color="var(--primary)" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text)', marginBottom: 2 }}>{item.title}</div>
                  <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>{item.desc}</div>
                </div>
                <span className="badge badge-orange" style={{ flexShrink: 0 }}>{item.status}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '90px 24px', background: 'var(--bg)' }}>
        <div style={{ maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
          <motion.div {...fadeUp()} style={{ background: 'linear-gradient(135deg, #fdf2ed, #fff8f0)', border: '1px solid #f0d0c0', borderRadius: 22, padding: '56px 36px' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: 18 }}>🚀</div>
            <h2 style={{ fontWeight: 800, fontSize: 'clamp(1.6rem, 3.5vw, 2.3rem)', marginBottom: 14, letterSpacing: '-0.02em' }}>
              Ready to <span className="gradient-text">Transform</span> Your Supply Chain?
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: 30, lineHeight: 1.7 }}>
              Join thousands of vendors and suppliers already saving time and money with VendorBridge.
            </p>
            <Link to="/auth">
              <button className="btn-primary" style={{ padding: '13px 34px', fontSize: '0.95rem' }}>
                Start for Free <ArrowRight size={15} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#fff', borderTop: '1px solid var(--border)', padding: '36px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <div style={{ width: 28, height: 28, borderRadius: 7, background: 'linear-gradient(135deg, #e8622a, #f5a623)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Zap size={14} color="#fff" fill="#fff" /></div>
            <span style={{ fontFamily: 'Plus Jakarta Sans', fontWeight: 800, fontSize: '1rem', color: 'var(--text)' }}>Vendor<span style={{ color: '#e8622a' }}>Bridge</span></span>
          </div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>Built with ☕ by Coffee & Code — Tutedude Hackathon 2025</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>MIT License · © 2025 VendorBridge</div>
        </div>
      </footer>
    </div>
  );
}
