import { useState } from 'react';
import ProductCard from '../../components/ProductCard';
import SearchFilter from '../../components/SearchFilter';
import { useProducts } from '../../context/ProductsContext';
import { useDebounce } from '../../hooks';
import { CATEGORIES, LOCATIONS } from '../../data/mockData';

export default function VendorProducts() {
  const { products } = useProducts();
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [location, setLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('name');
  const dQ = useDebounce(query);

  const filtered = products
    .filter(p => {
      const mQ = !dQ || p.name.toLowerCase().includes(dQ.toLowerCase()) || p.supplierName.toLowerCase().includes(dQ.toLowerCase()) || p.category.toLowerCase().includes(dQ.toLowerCase());
      return mQ && (category === 'All Categories' || p.category === category) && (location === 'All Locations' || p.location === location);
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'stock') return b.stock - a.stock;
      return a.name.localeCompare(b.name);
    });

  return (
    <div>
      <div style={{ marginBottom: 22 }}>
        <h1 style={{ fontWeight: 800, fontSize: '1.45rem', color: 'var(--text)', marginBottom: 3, letterSpacing: '-0.015em' }}>Products Marketplace</h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Browse all raw materials from verified suppliers.</p>
      </div>
      <div style={{ display: 'flex', gap: 10, marginBottom: 18, flexWrap: 'wrap', alignItems: 'center' }}>
        <SearchFilter query={query} onQueryChange={setQuery} category={category} onCategoryChange={setCategory} categories={CATEGORIES} location={location} onLocationChange={setLocation} locations={LOCATIONS} placeholder="Search products, suppliers..." />
        <select className="input-field" value={sortBy} onChange={e => setSortBy(e.target.value)} style={{ width: 'auto', minWidth: 150 }}>
          <option value="name">Sort: Name A–Z</option>
          <option value="price-asc">Price: Low → High</option>
          <option value="price-desc">Price: High → Low</option>
          <option value="stock">Most In Stock</option>
        </select>
      </div>
      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: 16 }}>{filtered.length} product{filtered.length !== 1 ? 's' : ''} found</p>
      {filtered.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '70px 0' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: 12 }}>📦</div>
          <h3 style={{ fontWeight: 700, color: 'var(--text)', marginBottom: 6 }}>No products found</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Try adjusting your filters.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))', gap: 16 }}>
          {filtered.map((p, i) => <ProductCard key={p.id} product={p} delay={i * 0.04} />)}
        </div>
      )}
    </div>
  );
}
