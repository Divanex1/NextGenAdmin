import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, putData } from '../Services/api';
import { toast } from 'react-toastify';
const CategoryEdit = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        image: null,
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
            const res = await getData(`/admin/categories/${id}`);
            const brand = res.data;
            setFormData(brand)
            setPreview(`${imgUrl}/${brand.image}`);
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
                image: file,
            }));
            setPreview(URL.createObjectURL(file)); // Create a preview URL
        }
    };
    // Category Add Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.name || !formData.description || !formData.image || !formData.status) {
            toast.error("All fields are required!");
            setLoading(false)
            return;
        }
        setLoading(true)
        try {
            const brandData = new FormData();
            brandData.append("name", formData.name);
            brandData.append("description", formData.description);
            brandData.append("image", formData.image);
            brandData.append("status", formData.status);
            const res = await putData(`/admin/categories/${id}`, brandData);
            if (res.status) {
                toast.success(res.message)
                navigate('/categorylist')
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
                                    Edit Category
                                </h4>
                                <div className="breadcrumb-action justify-content-center flex-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">
                                                    <i className="uil uil-home" />
                                                    Home
                                                </Link>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                Edit Category
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
                                            <label>Category Image</label>
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
                                            <label>Category Title</label>
                                            <input type='text' name='name' onChange={handleChange} value={formData.name} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Category Description</label>
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

export default CategoryEdit