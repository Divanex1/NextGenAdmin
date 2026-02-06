import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData, imgUrl } from '../Services/api';

const BrandView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo: null,
        status: false,
    })
    useEffect(() => {
        fetchBrands();
    }, []);


    // Fetch Api
    const fetchBrands = async () => {
        try {
            const res = await getData(`/admin/brands/${id}`);
            setFormData(res.data)
        } catch (error) {
            console.log("error Fetch Brands", error)
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
                                    Brand  Details
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
                                                Brand  Details
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
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Brand Image</label>
                                            <div className="mt-2">
                                                <img src={`${imgUrl}/${formData.logo}`} alt="Preview" className="img-thumbnail" width="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Brand Title</label>
                                            <input type='text' disabled value={formData.name} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Brand Description</label>
                                            <input type='text' disabled value={formData.description} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" disabled value={formData.status}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
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

export default BrandView