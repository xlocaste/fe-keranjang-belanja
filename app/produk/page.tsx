'use client';
import Link from "next/link";
import React, { useState, useEffect } from "react";
import axios from "axios";

const ProdukPage: React.FC = () => {
    const [produks, setProduks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true); // Tambahkan loading state
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProduks = async () => {
            try {
                const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/produks`);
                setProduks(response.data.data.data || []); // Set data jika tersedia, atau set array kosong jika tidak
                console.log('response', response);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchProduks();
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Menampilkan pesan loading sementara data belum tersedia
    }

    if (error) {
        return <div>Error: {error}</div>; // Menampilkan pesan error jika terjadi kesalahan
    }

    return(
        <div>
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 shadow-sm rounded-3">
                            <div className="card-body">
                                <Link href="/produk/create">
                                    <button className="btn btn-primary border-0 shadow-sm mb-3">TAMBAH</button>
                                </Link>
                                <table className="table table-bordered mb-0">
                                    <thead>
                                        <tr>
                                            <th scope="col">NAMA</th>
                                            <th scope="col">QUANTITY</th>
                                            <th scope="col">KATEGORI</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    { produks.map((produks: any) => (
                                        <tr key={ produks.id }>
                                            <td>{ produks.nama }</td>
                                            <td>{ produks.quantity }</td>
                                            <td>{ produks.kategori }</td>
                                            <td className="text-center">
                                                <button className="btn btn-sm btn-primary border-0 shadow-sm mb-3 me-3">EDIT</button>
                                                <button className="btn btn-sm btn-danger border-0 shadow-sm mb-3">DELETE</button>
                                            </td>
                                        </tr>
                                    )) }
                                    </tbody>
                                </table>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProdukPage