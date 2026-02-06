import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData, imgUrl } from '../Services/api';

const BikeView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        make: "",
        vehicaleType: "",
        model: [],
        status: false,
    })
    useEffect(() => {
        fetchBikes();
    }, []);


    // Fetch Api
    const fetchBikes = async () => {
        try {
            const res = await getData(`/admin/bikes/${id}`);
            console.log(res)
            setFormData(res.data)
        } catch (error) {
            console.log("error Fetch Bikes", error)
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
                                    Bike  Details
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
                                                Bike  Details
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
                                            <label>Bike make</label>
                                            <input type='text' disabled value={formData.make} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Vehicale Type</label>
                                            <input type='text' disabled value={formData.vehicaleType} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>models</label>
                                            {formData?.model?.map((model, index) => {
                                                return (
                                                    <p key={index}>{model}</p>
                                                )
                                            })}
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

export default BikeView