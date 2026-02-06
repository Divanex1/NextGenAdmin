import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { getData } from '../Services/api';

const CmsView = () => {
    const { slug } = useParams();
    const [formData, setFormData] = useState({
        title: "",
        status: false,
        content: "",
    })


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

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    CMS Details
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
                                                CMS Details
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
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>CMS Title</label>
                                            <input type='text' name='title' value={formData.title} disabled className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" name='status' value={formData.status} disabled>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.content }} />
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

export default CmsView