'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';

interface KeranjangItem {
    produk_id: number;
    nama_produk: string;
    quantity: number;
    kategori: string;
}

const KeranjangPage = () => {
    const [keranjang, setKeranjang] = useState<KeranjangItem[]>([]);
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        axios.get(`http://localhost:8000/api/keranjang/${id}`)
            .then(response => {
                setKeranjang(response.data.data);
            })
            .catch(error => console.error('Error fetching cart items:', error));
    }, [params.id]);

    const removeFromCart = async (produkId: number) => {
        try {
            await axios.post(`http://localhost:8000/api/keranjang/delete/${produkId}`, { user_id: params.id });
            setKeranjang(keranjang.filter(item => item.produk_id !== produkId));
            alert('Produk berhasil dihapus dari keranjang!');
        } catch (error) {
            console.error('Error removing from cart:', error);
            alert('Gagal menghapus produk dari keranjang.');
        }
    };

    const reduceFromCart = async (produkId: number) => {
        try {
            await axios.post(`http://localhost:8000/api/keranjang/kurang/${produkId}`, { user_id: params.id });
            setKeranjang(keranjang.map(item => {
                if (item.produk_id === produkId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                } else if (item.produk_id === produkId && item.quantity === 1) {
                    return null;
                } else {
                    return item;
                }
            }).filter(item => item !== null) as KeranjangItem[]);
            alert('Quantity produk berhasil dikurangkan!');
        } catch (error) {
            console.error('Error reducing item from cart:', error);
            alert('Gagal mengurangi quantity produk.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Keranjang Belanja</h1>
                    {keranjang.length > 0 ? (
                        <ul>
                            {keranjang.map(item => (
                                <li key={item.produk_id} className="bg-gray-50 p-4 mb-4 rounded-lg shadow-sm flex items-center justify-between">
                                    <div className="flex flex-col">
                                        <h2 className="text-lg font-medium text-gray-900">{item.nama_produk}</h2>
                                        <p className="text-gray-600">Quantity: {item.quantity}</p>
                                        <p className="text-gray-600">Kategori: {item.kategori}</p>
                                    </div>
                                    <div className="flex space-x-2">
                                        <button
                                            onClick={() => reduceFromCart(item.produk_id)}
                                            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
                                        >
                                            Kurangi Quantity
                                        </button>
                                        <button
                                            onClick={() => removeFromCart(item.produk_id)}
                                            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                        >
                                            Hapus dari Keranjang
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">Keranjang Anda kosong.</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default KeranjangPage;
