import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../Services/api';

const ComplaintView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        email: "",
    })
    useEffect(() => {
        fetchReviews();
    }, [id]);


    // Fetch Api
    const fetchReviews = async () => {
        try {
            const res = await getData(`/complaint/${id}`);
            setFormData(res.data)
        } catch (error) {
            console.log("error Fetch complaint", error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    Complaint  Details
                                </h4>
                                <div className="breadcrumb-action justify-content-center flex-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">
                                                    <i className="uil uil-estate" />
                                                    Home
                                                </Link>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Complaint Details
                                            </li>
                                        </ol>
                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="card">
                            <div className="card-body add-product__body">
                                <form className='row'>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Image</label>
                                            <div className="mt-2">
                                                <img src={formData.image} alt="Preview" className="img-thumbnail" width="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label> Title</label>
                                            <input type='text' disabled value={formData.title} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <input type='text' disabled value={formData.description} className='form-control' />
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ComplaintView