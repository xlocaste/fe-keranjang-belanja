"use client";

//import hook useState
import { useState } from 'react';

//import router
import Router from 'next/router';

//import axios
import axios from "axios";

function ProdukCreate() {

    //state
    const [nama, Nama] = useState('');
    const [quantity, Quantity] = useState('');
    const [kategori, Kategori] = useState('');

    //state validation
    const [validation, setValidation] = useState({});

    //method "storePost"
    const storeProduk = async (e) => {
        e.preventDefault();

        //define formData
        const formData = new FormData();

        //append data to "formData"
        formData.append('nama', nama);
        formData.append('quantity', quantity);
        formData.append('kategori', kategori);
        
        //send data to server
        await axios.post(`${process.env.NEXT_PUBLIC_API_BACKEND}/api/produks`, formData)
        .then(() => {

            //redirect
            Router.push('/produk')

        })
        .catch((error) => {

            //assign validation on state
            setValidation(error.response.data);
        })
        
    };

    return (
            <div className="container" style={{ marginTop: '80px' }}>
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow-sm">
                            <div className="card-body">
                                <form onSubmit={ storeProduk }>

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">NAMA</label>
                                        <input className="form-control" type="text" value={nama} onChange={(e) => Nama(e.target.value)} placeholder="Masukkan Nama" />
                                    </div>
                                    {
                                        validation.nama &&
                                            <div className="alert alert-danger">
                                                {validation.nama}
                                            </div>
                                    }

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">QUANTITY</label>
                                        <textarea className="form-control" rows={3} value={quantity} onChange={(e) => Quantity(e.target.value)} placeholder="Masukkan Quantity" />
                                    </div>
                                    {
                                        validation.quantity &&
                                            <div className="alert alert-danger">
                                                {validation.quantity}
                                            </div>
                                    }

                                    <div className="form-group mb-3">
                                        <label className="form-label fw-bold">KATEGORI</label>
                                        <textarea className="form-control" rows={3} value={kategori} onChange={(e) => Kategori(e.target.value)} placeholder="Masukkan Kategori" />
                                    </div>
                                    {
                                        validation.kategori &&
                                            <div className="alert alert-danger">
                                                {validation.kategori}
                                            </div>
                                    }

                                    <button className="btn btn-primary border-0 shadow-sm" type="submit">
                                        SIMPAN
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    );

}

export default ProdukCreate