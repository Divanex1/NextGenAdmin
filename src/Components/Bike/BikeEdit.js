import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, postData, putData } from '../Services/api';
import { toast } from 'react-toastify';
const BikeEdit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        make: "",
        vehicaleType: "",
        model: [],
        status: false,
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    useEffect(() => {
        fetchBikes();
    }, []);

    // Fetch Api
    const fetchBikes = async () => {
        try {
            const res = await getData(`/admin/bikes/${id}`);
            const brand = res.data;
            setFormData(brand)
        } catch (error) {
            console.log("error Fetch bikes", error)
        }
    }

    // Category Add Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await putData(`/admin/bikes/${id}`, formData);
            if (res.status) {
                toast.success(res.message)
                navigate('/bikelist')
            }
        } catch (error) {
            console.log("bike update error", error)
        } finally {
            setLoading(false)
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
                                    Edit Bike
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
                                                Edit Bike
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
                                <form className='row' onSubmit={handleSubmit}>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Bike Make</label>
                                            <input type='text' name='make' onChange={handleChange} value={formData.make} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Vehicale Type</label>
                                            <input type='text' name='vehicaleType' onChange={handleChange} value={formData.vehicaleType} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" name='status' onChange={handleChange} value={formData.status}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>models</label>
                                            <input type='text' name='model' onChange={handleChange} value={formData.model} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button className='btn btn-primary' disabled={loading} type='submit'>{loading ? 'Submitting...' : 'Submit'}</button>
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

export default BikeEdit