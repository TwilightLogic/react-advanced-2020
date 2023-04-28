import { useState, useEffect } from 'react';

// Custom hook
export const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  };

  // Call the `useEffect` when to `url` changed
  useEffect(() => {
    getProducts();
  }, [url]);

  return { loading, products };
};
