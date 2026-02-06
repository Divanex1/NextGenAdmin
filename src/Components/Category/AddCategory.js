import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { postData } from '../Services/api';

function AddCategory() {
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
            const res = await postData('/admin/categories', brandData);
            if (res.status) {
                toast.success(res.message)
                navigate('/categorylist')
            }
        } catch (error) {
            console.log("category post error", error)
        } finally {
            setLoading(false)
        }

    }
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">Add Category</h4>
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
                                                Add Category
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
                            <div className="card-body p-0">
                                <div className="add-product__body px-sm-40 px-20">
                                    <form onSubmit={handleSubmit}>
                                        <div className="form-basic">

                                            <div className="row">
                                                <div className="col-lg-6 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Category Image</label>
                                                        <input type='file' className='form-control' accept='images/*' onChange={handleFileChange} />
                                                        {preview && (
                                                            <div className="mt-2">
                                                                <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Category Name </label>
                                                        <input type="text" className="form-control" required name='name' onChange={handleChange} value={formData.name} placeholder='Enter Name' />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label>Status </label>
                                                        <select className="form-select" name='status' required onChange={handleChange} value={formData.status}>
                                                            <option value="">Select Status</option>
                                                            <option value={true}>Active</option>
                                                            <option value={false}>Inactive</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                                        <input type='text' name='description' required onChange={handleChange} value={formData.description} className='form-control' />
                                                    </div>
                                                </div>


                                                <div>
                                                    <button className='btn btn-primary' disabled={loading} type='submit'>{loading ? 'Submitting...' : 'Submit'}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCategory