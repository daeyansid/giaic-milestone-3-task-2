// File: components/Cart.tsx
import { useState } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart((prevCart) => {
            const existing = prevCart.find((c) => c.id === item.id);
            if (existing) {
                return prevCart.map((c) =>
                    c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
                );
            }
            return [...prevCart, { ...item, quantity: 1 }];
        });
    };

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((c) => c.id !== id));
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>
            {cart.map((item) => (
                <div key={item.id} className="border-b py-2">
                    <p>{item.name}</p>
                    <p>${item.price} x {item.quantity}</p>
                    <button
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500 hover:underline"
                    >
                        Remove
                    </button>
                </div>
            ))}
        </div>
    );
}
