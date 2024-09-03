'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const ShowProduk = () => {
    const [produk, setProduk] = useState<any>(null);
    const params = useParams();

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/produks/${id}`)
                .then(response => setProduk(response.data.data))
                .catch(error => console.error('Error fetching produk:', error));
        }
    }, [params.id]);

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden p-6">
                <h1 className="text-3xl font-semibold text-gray-800 mb-6">Detail Produk</h1>
                {produk ? (
                    <div className="space-y-4">
                        <p className="text-gray-700 text-lg">
                            <span className="font-medium">Nama:</span> {produk.nama}
                        </p>
                        <p className="text-gray-700 text-lg">
                            <span className="font-medium">Quantity:</span> {produk.quantity}
                        </p>
                        <p className="text-gray-700 text-lg">
                            <span className="font-medium">Kategori:</span> {produk.kategori}
                        </p>
                        <div className="mt-6">
                            <Link href="/produk">
                                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Kembali ke Daftar Produk
                                </button>
                            </Link>
                        </div>
                    </div>
                ) : (
                    <p className="text-gray-700">Loading...</p>
                )}
            </div>
        </div>
    );
};

export default ShowProduk;
