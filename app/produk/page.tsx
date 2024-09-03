'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

interface Produk {
    id: number;
    nama: string;
    quantity: number;
    kategori: string;
}

const ProdukIndex = () => {
    const [produks, setProduks] = useState<Produk[]>([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/produks')
            .then(response => setProduks(response.data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const deleteProduk = (id: number) => {
        axios.delete(`http://localhost:8000/api/produks/${id}`)
            .then(() => setProduks(produks.filter(produk => produk.id !== id)))
            .catch(error => console.error('Error deleting produk:', error));
    };

    const addToCart = async (produkId: number) => {
        const userId = 1; // ID pengguna yang sedang login, sesuaikan dengan implementasi login Anda

        try {
            await axios.post(`http://localhost:8000/api/keranjang/add/${produkId}`, { user_id: userId });
            alert('Produk berhasil ditambahkan ke keranjang!');
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Gagal menambahkan produk ke keranjang.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">List Produk</h1>
                    <div className="mb-6">
                        <Link href="/produk/create">
                            <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Tambah Produk</button>
                        </Link>
                        <Link href="/keranjang/2"> {/* Ganti 1 dengan ID pengguna saat ini */}
                            <button className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Keranjang</button>
                        </Link>
                    </div>
                    <ul>
                        {produks.map(produk => (
                            <li key={produk.id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                <div className="flex flex-col">
                                    <h2 className="text-lg font-medium text-gray-900">{produk.nama}</h2>
                                    <p className="text-gray-600">Quantity: {produk.quantity}</p>
                                    <p className="text-gray-600">Kategori: {produk.kategori}</p>
                                </div>
                                <div className="flex space-x-2">
                                    <Link href={`/produk/${produk.id}`}>
                                        <button className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600">Detail</button>
                                    </Link>
                                    <Link href={`/produk/${produk.id}/edit`}>
                                        <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Edit</button>
                                    </Link>
                                    <button
                                        onClick={() => deleteProduk(produk.id)}
                                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                    >
                                        Hapus
                                    </button>
                                    <button
                                        onClick={() => addToCart(produk.id)}
                                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                                    >
                                        Tambah Ke Keranjang
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ProdukIndex;
