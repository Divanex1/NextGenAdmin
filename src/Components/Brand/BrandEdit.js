import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, postData, putData } from '../Services/api';
import { toast } from 'react-toastify';
const BrandEdit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        logo: null,
        status: false,
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    useEffect(() => {
        fetchBrands();
    }, []);

    // Fetch Api
    const fetchBrands = async () => {
        try {
            const res = await getData(`/admin/brands/${id}`);
            const brand = res.data;
            setFormData(brand)
            setPreview(`${imgUrl}/${brand.logo}`);
        } catch (error) {
            console.log("error Fetch Brands", error)
        }
    }
    // Handle file upload & preview
    const handleFileChange = (e) => {
        const file = e.target.files[0];

        if (file) {
            setFormData((prevValues) => ({
                ...prevValues,
                logo: file,
            }));
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };
    // Category Add Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const brandData = new FormData();
            brandData.append("name", formData.name);
            brandData.append("description", formData.description);
            brandData.append("logo", formData.logo);
            brandData.append("status", formData.status);
            const res = await putData(`/admin/brands/${id}`, brandData);
            if (res.status) {
                toast.success(res.message)
                navigate('/brandlist')
            }
        } catch (error) {
            console.log("brand post error", error)
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
                                    Edit Brand
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
                                                Edit Brand
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
                                            <label>Brand Image</label>
                                            <input type='file' className='form-control' accept='images/*' onChange={handleFileChange} />
                                            {preview && (
                                                <div className="mt-2">
                                                    <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Brand Title</label>
                                            <input type='text' name='name' onChange={handleChange} value={formData.name} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Brand Description</label>
                                            <input type='text' name='description' onChange={handleChange} value={formData.description} className='form-control' />
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

export default BrandEdit