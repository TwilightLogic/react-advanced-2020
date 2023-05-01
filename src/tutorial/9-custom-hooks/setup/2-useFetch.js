import { useState, useEffect, useCallback } from 'react';

// Custom hook
export const useFetch = url => {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const getProducts = useCallback(async () => {
    const response = await fetch(url);
    const products = await response.json();
    setProducts(products);
    setLoading(false);
  }, [url]);

  // Call the `useEffect` when the `url` and `getProducts` changed
  useEffect(() => {
    getProducts();
  }, [getProducts]);

  return { loading, products };
};
