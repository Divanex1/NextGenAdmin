import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../Services/api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';


function StaffAdd() {
    const [formData, setFormData] = useState({
        first_name: "",
        email: "",
        mobile_number: "",
        profile_img: null,
        password: "",
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profile_img: file
            }));
            setPreview(URL.createObjectURL(file))
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userData = new FormData();
            userData.append("first_name", formData.first_name);
            userData.append("mobile_number", formData.mobile_number);
            userData.append("email", formData.email);
            userData.append("password", formData.password);
            userData.append("profile_img", formData.profile_img);
            const res = await postData('/admin/staff-create', userData);
                navigate('/stafflist')
                toast.error(res.message)
        } catch (error) {
            console.log("error adding api", error)
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
                                <h4 className="text-capitalize breadcrumb-title">Add Staff</h4>
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
                                                Add Staff
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
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Staff Image</label>
                                                        <input type='file' className='form-control' required accept='images/*' onChange={handleFileChange} />
                                                        {preview && (
                                                            <div className="mt-2">
                                                                <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Name</label>
                                                        <input type="text" className="form-control" required placeholder='Enter title' name="first_name" value={formData.first_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Email</label>
                                                        <input type="text" className="form-control" required placeholder='Enter Link' name="email" value={formData.email} onChange={handleChange} />
                                                    </div>
                                                </div>

                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Mobile</label>
                                                        <input type="text" className="form-control" required placeholder='Enter Link' name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">password</label>
                                                        <input type="text" className="form-control" required placeholder='Enter Link' name="password" value={formData.password} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Submitting...' : 'Submit'}</button>
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

        </>
    )
}

export default StaffAdd