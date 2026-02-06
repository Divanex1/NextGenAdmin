import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import product1 from '../../assets/img/blog-img.png'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { toast } from 'react-toastify';
const BlogList = () => {
    const [blogList, setBlogList] = useState([]);

    useEffect(() => {
        fetchBlogs();
    }, []);


    // Fetch Api
    const fetchBlogs = async () => {
        try {
            const res = await getData('/admin/blogs');
            setBlogList(res.data.blogListData)
        } catch (error) {
            console.log("error Fetch Blogs", error)
        }
    }

    // Toggle Blog Active/Inactive Status
    const toggleBlogStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/blogs/${brandId}`);
            if (response.status) {
                toast.dismiss();
                toast.success(`Blog Status Changed Successfully`);
                fetchBlogs();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating blog status");
            console.error("Error:", error);
        }
    };

    // Delete Blog Api
    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/blogs/${id}`);
            if (response.status) {
                toast.success("Blog Deleted Successfully")
                fetchBlogs();
            } else {
                toast.error("Error Blog Delete")
            }
        } catch (error) {
            console.log("delete api error", error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">Blog List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-home"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Blog List</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Blog List</h5>
                            <Link className="btn btn-primary" to="/addblog"><span className="uil uil-plus"></span>Add Blog</Link>
                        </div>
                        <div className="card-body">
                            <div className="userDatatable global-shadow border-light-0 p-30 bg-white radius-xl w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th><span className="userDatatable-title">S.No.</span></th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Blog Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Blog Title
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Blog Author
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Date
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Status
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                blogList.map((blog, index) => {
                                                    return (
                                                        <tr key={blog._id}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                <img src={`${imgUrl}/${blog.image}`} alt='blog' className='wh-40' />
                                                            </td>
                                                            <td>
                                                                {blog.title}
                                                            </td>
                                                            <td>
                                                                Admin
                                                            </td>
                                                            <td>
                                                                {new Date(blog.createdAt).toLocaleDateString()}
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${blog._id}`}
                                                                            checked={blog.status}
                                                                            onChange={() => toggleBlogStatus(blog._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/blogdetails/${blog._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/blogedit/${blog._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(blog._id)}>
                                                                            <i className="uil uil-trash-alt" />
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>
    )
}

export default BlogList