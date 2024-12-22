// File: pages/index.tsx
"use client";

import { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
}

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch('/api/products');
      const data = await response.json();
      console.log("data",data);
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
