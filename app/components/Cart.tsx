// File: components/Cart.tsx
import { useEffect, useState } from 'react';

interface CartItem {
    id: string;
    name: string;
    price: number;
    quantity: number;
}

export default function Cart() {
    const [cart, setCart] = useState<CartItem[]>([]);

    // Load cart from localStorage on component mount
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setCart(JSON.parse(savedCart));
        }
    }, []);

    // Save cart to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('cart', JSON.stringify(cart));
    }, [cart]);

    const removeFromCart = (id: string) => {
        setCart((prevCart) => prevCart.filter((c) => c.id !== id));
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl text-black font-semibold mb-4">Shopping Cart</h2>
            {cart.length === 0 ? (
                <p className="text-black">Your cart is empty.</p>
            ) : (
                <>
                    {cart.map((item) => (
                        <div key={item.id} className="border-b py-2">
                            <p className="font-semibold">{item.name}</p>
                            <p>
                                PKR {item.price} x {item.quantity}
                            </p>
                            <button
                                onClick={() => removeFromCart(item.id)}
                                className="text-red-500 hover:underline"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <button
                        onClick={clearCart}
                        className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                    >
                        Clear Cart
                    </button>
                </>
            )}
        </div>
    );
}
