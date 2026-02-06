import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, putData } from '../Services/api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

function BannerEdit() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        link: "",
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
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                image: file
            }));
            setPreview(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    // Fetch Api
    const fetchUsers = async () => {
        try {
            const res = await getData(`/admin/banners/${id}`);
            const userData = res.data;
            setFormData(userData)
            setPreview(`${imgUrl}/${userData.image}`)
        } catch (error) {
            console.log("error Fetch Banners", error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userData = new FormData();
            userData.append("title", formData.title);
            userData.append("link", formData.link);
            userData.append("description", formData.description);
            userData.append("status", formData.status);
            userData.append("image", formData.image);
            const res = await putData(`/admin/banners/${id}`, userData);
            if (res.status) {
                toast.success("Banner Updated Successfully")
                navigate('/bannerlist')
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log("error updating api", error)
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
                                <h4 className="text-capitalize breadcrumb-title">Banner Edit</h4>
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
                                                Banner Edit
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
                                                        <label htmlFor="">Banner Image</label>
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
                                                        <label htmlFor="">Title</label>
                                                        <input type="text" className="form-control" placeholder='Enter title' name="title" value={formData.title} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Link</label>
                                                        <input type="text" className="form-control" placeholder='Enter link' name="link" value={formData.link} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">Status</label>
                                                            <select className="form-control" name="status" value={formData.status} onChange={handleChange} >
                                                                <option value="">Select Status</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-12 col-md-12 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                                        <JoditEditor
                                                            value={formData.description}
                                                            onChange={(newContent) =>
                                                                setFormData((prev) => ({ ...prev, description: newContent }))
                                                            }
                                                        />
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

export default BannerEdit