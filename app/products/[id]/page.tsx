"use client";

import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

export default function ProductDetail() {
    const params = useParams();
    const id = params.id; // Get id from route parameter instead of search params
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;

        const fetchProduct = async () => {
            try {
                const response = await fetch(`/api/products?id=${id}`);
                const data = await response.json();
                setProduct(data);
                setError(null);
            } catch (error) {
                console.error('Error fetching product:', error);
                setError('An error occurred while fetching the product.');
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    if (!product) return null;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-xl font-semibold mt-4">${product.price}</p>
        </div>
    );
}
