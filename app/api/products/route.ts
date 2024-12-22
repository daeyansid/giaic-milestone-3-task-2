import { NextResponse } from 'next/server';

const products = [
    { id: '1', name: 'Laptop', price: 1200, description: 'High-performance laptop' },
    { id: '2', name: 'Phone', price: 800, description: 'Smartphone with excellent features' },
    { id: '3', name: 'Headphones', price: 150, description: 'Noise-cancelling headphones' },
];

// Handle GET requests
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
        const product = products.find((p) => p.id === id);
        if (product) {
            return NextResponse.json(product);
        } else {
            return NextResponse.json({ error: 'Product not found' }, { status: 404 });
        }
    }

    // If no id is provided, return all products
    return NextResponse.json(products);
}

// Handle unsupported HTTP methods
export async function OPTIONS() {
    return new Response(null, {
        status: 204,
        headers: {
            Allow: 'GET',
        },
    });
}
