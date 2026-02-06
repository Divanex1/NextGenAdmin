import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData, imgUrl } from '../Services/api';
const BlogView = () => {
    const { id } = useParams();
    
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        image: null,
        status: false,
    })
    useEffect(() => {
        fetchBlogs();
    }, []);


    // Fetch Api
    const fetchBlogs = async () => {
        try {
            const res = await getData(`/admin/blogs/${id}`);
            console.log(res.data)
            setFormData(res.data)
        } catch (error) {
            console.log("error Fetch Users", error)
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
                                    Blog Details
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
                                                Blog Details
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
                                            <label>Blog Image</label>
                                            <div className="mt-2">
                                                <img src={`${imgUrl}/${formData.image}`} alt="Preview" className="img-thumbnail" width="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input type='text' disabled value={formData.title} className='form-control' />
                                        </div>
                                    </div>                                 
                                    <div className="col-lg-12 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" disabled value={formData.status}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Description</label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.description }} />
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

export default BlogView