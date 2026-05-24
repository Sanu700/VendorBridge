import { useState, useEffect, useCallback, useRef } from 'react';

// Debounced search hook
export function useDebounce(value, delay = 300) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debouncedValue;
}

// Search & filter hook
export function useSearch(items = [], searchFields = ['name']) {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query);

  const filtered = items.filter(item => {
    if (!debouncedQuery) return true;
    return searchFields.some(field =>
      String(item[field] || '').toLowerCase().includes(debouncedQuery.toLowerCase())
    );
  });

  return { query, setQuery, filtered };
}

// Theme hook
export function useTheme() {
  const [isDark, setIsDark] = useState(true);
  const toggle = () => setIsDark(d => !d);
  return { isDark, toggle };
}

// Counter animation hook
export function useCountUp(target, duration = 1000) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [target, duration]);
  return count;
}

// Local storage hook
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch { return initialValue; }
  });

  const setStoredValue = useCallback((val) => {
    setValue(val);
    localStorage.setItem(key, JSON.stringify(val));
  }, [key]);

  return [value, setStoredValue];
}
