import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getData, putData } from '../Services/api';
import JoditEditor from 'jodit-react';

const CmsEdit = () => {
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        status: false,
        content: "",
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    }

    const fetchCMSPages = async () => {
        try {
            const res = await getData(`/admin/cms/${slug}`)
            if (res.status) {
                setFormData(res.data)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("error fetch cms list", error)
        }
    }

    useEffect(() => {
        fetchCMSPages();
    }, [slug])

    // Update CMS Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await putData(`/admin/cms/${slug}`, formData);
            if (res.status) {
                toast.success(res.data.message);
                setFormData({ title: "", content: "" });
                navigate('/cmslist')
            } else {
                toast.error(res.data.message)
            }
        } catch (error) {
            console.error("Error saving CMS page:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    Add CMS
                                </h4>
                                <div className="breadcrumb-action justify-content-center flex-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">
                                                    <i className="uil uil-home" />
                                                    Dashboard
                                                </Link>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                add CMS
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
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>CMS Title</label>
                                            <input type='text' name='title' value={formData.title} onChange={handleChange} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" name='status' value={formData.status} onChange={handleChange}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                            <JoditEditor
                                                value={formData.content}
                                                onChange={(newContent) =>
                                                    setFormData((prev) => ({ ...prev, content: newContent }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button className='btn btn-primary' type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
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

export default CmsEdit