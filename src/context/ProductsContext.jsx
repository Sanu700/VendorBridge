import { createContext, useContext, useState, useEffect } from 'react';
import { MOCK_PRODUCTS, MOCK_SUPPLIERS } from '../data/mockData';

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(MOCK_PRODUCTS);
  const [suppliers] = useState(MOCK_SUPPLIERS);
  const [loading, setLoading] = useState(false);

  const addProduct = (product) => {
    const newProduct = {
      ...product,
      id: 'p' + Date.now(),
      updatedAt: new Date().toISOString(),
      priceHistory: [product.price],
    };
    setProducts(prev => [newProduct, ...prev]);
    return newProduct;
  };

  const updateProduct = (id, updates) => {
    setProducts(prev => prev.map(p =>
      p.id === id
        ? { ...p, ...updates, updatedAt: new Date().toISOString(),
            priceHistory: [...(p.priceHistory || []), updates.price || p.price] }
        : p
    ));
  };

  const deleteProduct = (id) => {
    setProducts(prev => prev.filter(p => p.id !== id));
  };

  const getSupplierProducts = (supplierId) =>
    products.filter(p => p.supplierId === supplierId);

  return (
    <ProductsContext.Provider value={{
      products, suppliers, loading,
      addProduct, updateProduct, deleteProduct, getSupplierProducts
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export const useProducts = () => useContext(ProductsContext);
