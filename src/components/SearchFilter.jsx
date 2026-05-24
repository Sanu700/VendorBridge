import { Search, X } from 'lucide-react';

export default function SearchFilter({ query, onQueryChange, category, onCategoryChange, categories = [], location, onLocationChange, locations = [], placeholder = 'Search...' }) {
  return (
    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: '1', minWidth: 240 }}>
        <Search size={14} style={{ position: 'absolute', left: 11, top: '50%', transform: 'translateY(-50%)', color: '#b8b4ac', pointerEvents: 'none' }} />
        <input type="text" className="input-field" placeholder={placeholder} value={query} onChange={e => onQueryChange(e.target.value)} style={{ paddingLeft: 34, paddingRight: query ? 34 : 14 }} />
        {query && (
          <button onClick={() => onQueryChange('')} style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#b8b4ac', cursor: 'pointer', display: 'flex' }}>
            <X size={13} />
          </button>
        )}
      </div>
      {categories.length > 0 && (
        <select className="input-field" value={category} onChange={e => onCategoryChange(e.target.value)} style={{ width: 'auto', minWidth: 155 }}>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
      )}
      {locations.length > 0 && (
        <select className="input-field" value={location} onChange={e => onLocationChange(e.target.value)} style={{ width: 'auto', minWidth: 145 }}>
          {locations.map(l => <option key={l}>{l}</option>)}
        </select>
      )}
    </div>
  );
}
