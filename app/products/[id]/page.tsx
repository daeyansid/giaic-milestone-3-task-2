"use client";

import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import CartModal from '@/app/components/CartModal';

interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
}

export default function ProductDetail() {
    const params = useParams();
    const router = useRouter();
    const id = params.id; // Get id from route parameter instead of search params
    const [product, setProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = () => {
        if (!product) return;

        // Get existing cart from localStorage
        const savedCart = localStorage.getItem('cart');
        const cart = savedCart ? JSON.parse(savedCart) : [];

        // Check if product already exists in cart
        const existingItem = cart.find((item: Product) => item.id === product.id);

        if (existingItem) {
            // If exists, update quantity
            const updatedCart = cart.map((item: Product & { quantity?: number }) =>
                item.id === product.id
                    ? { ...item, quantity: (item.quantity || 1) + 1 }
                    : item
            );
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        } else {
            // If new item, add to cart with quantity 1
            const updatedCart = [...cart, { ...product, quantity: 1 }];
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }

        alert(`${product.name} added to cart!`);
    };

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

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Breadcrumb */}
            <nav className="py-4 px-6 border-b bg-white">
                <div className="max-w-7xl mx-auto flex gap-2 text-sm">
                    <button onClick={() => router.push('/')} className="text-gray-500 hover:text-gray-700">
                        Home
                    </button>
                    <span className="text-gray-500">/</span>
                    <span className="text-gray-900">{product?.name}</span>
                </div>
            </nav>

            {loading ? (
                <div className="flex justify-center items-center h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : error ? (
                <div className="text-red-500 text-center p-6">{error}</div>
            ) : product ? (
                <div className="max-w-7xl mx-auto p-6">
                    <div className="grid md:grid-cols-2 gap-8">
                        {/* Product Image */}
                        <div className="bg-white p-6 rounded-lg shadow-sm">
                            <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                                <svg
                                    className="w-1/3 h-1/3 text-gray-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Product Details */}
                        <div className="space-y-6">
                            <div>
                                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                                <p className="text-2xl font-semibold text-blue-600 mt-2">
                                    PKR {product.price.toFixed(2)}
                                </p>
                            </div>

                            <div className="border-t border-b py-4"></div>
                            <h2 className="text-lg text-black font-semibold mb-2">Description</h2>
                            <p className="text-gray-600 leading-relaxed">
                                {product.description}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <div className="flex gap-4">
                            <button
                                onClick={addToCart}
                                className="flex-1 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                    />
                                </svg>
                                Add to Cart
                            </button>
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg
                                    className="w-5 h-5"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                    />
                                </svg>
                                View Cart
                            </button>
                        </div>
                    </div>

                    {/* Additional Product Information */}
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-black mb-2">Product Features:</h3>
                        <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>High quality product</li>
                            <li>Fast shipping</li>
                            <li>30-day return policy</li>
                        </ul>
                    </div>
                </div>
            ) : null}

            <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </div>
    );
}
