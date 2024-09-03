'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter, useParams } from 'next/navigation';

const EditProduk = () => {
    const [nama, setNama] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [kategori, setKategori] = useState('');
    const params = useParams();
    const router = useRouter();

    useEffect(() => {
        const id = params.id;
        if (id) {
            axios.get(`http://localhost:8000/api/produks/${id}`)
                .then(response => {
                    const produk = response.data.data;
                    setNama(produk.nama);
                    setQuantity(produk.quantity);
                    setKategori(produk.kategori);
                })
                .catch(error => console.error('Error fetching produk:', error));
        }
    }, [params.id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const id = params.id;
        if (id) {
            try {
                await axios.put(`http://localhost:8000/api/produks/${id}`, { nama, quantity, kategori });
                router.push('/produk');
            } catch (error) {
                console.error('Error updating produk:', error);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 py-8 px-4">
            <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Edit Produk</h1>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="nama">Nama Produk</label>
                            <input
                                id="nama"
                                type="text"
                                value={nama}
                                onChange={e => setNama(e.target.value)}
                                placeholder="Nama Produk"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="quantity">Quantity</label>
                            <input
                                id="quantity"
                                type="number"
                                value={quantity}
                                onChange={e => setQuantity(Number(e.target.value))}
                                placeholder="Quantity"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-medium mb-1" htmlFor="kategori">Kategori</label>
                            <input
                                id="kategori"
                                type="text"
                                value={kategori}
                                onChange={e => setKategori(e.target.value)}
                                placeholder="Kategori"
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default EditProduk;
