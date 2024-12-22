// File: components/ProductCard.tsx
import Link from 'next/link';

interface Product {
    id: string;
    name: string;
    price: number;
}

export default function ProductCard({ product }: { product: Product }) {
    return (
        <div className="border p-4 rounded shadow hover:shadow-lg">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-500">${product.price}</p>
            <Link href={`/products/${product.id}`}>
                <p className="text-blue-500 hover:underline mt-2 inline-block">View Details</p>
            </Link>
        </div>
    );
}
