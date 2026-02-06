import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData } from '../Services/api';
import { toast } from 'react-toastify';
const FaqList = () => {
    const [FAQslist, setFAQsList] = useState([]);

    useEffect(() => {
        fetchAllFAQs();
    }, []);

    // Get All FAQs Api
    const fetchAllFAQs = async () => {
        try {
            const res = await getData('/admin/faq-list');
            setFAQsList(res.data)
        } catch (error) {
            console.log("error faq fetching", error)
        }
    }

    //FAQ Delete Api 
    const handleDeleteFaq = async (id) => {
        try {
            const res = await deleteData(`/admin/${id}`)
            if (res.status) {
                toast.success(res.message)
                fetchAllFAQs();
            }
        } catch (error) {
            console.log("error deleting faq", error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">FAQ List</h4>
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
                            <h5>FAQ List</h5>
                            <Link className="btn btn-primary" to="/addfaq"><span className="uil uil-plus"></span>Add FAQ</Link>
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
                                                        Question
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Answer
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
                                                FAQslist.map((blog, index) => {
                                                    return (
                                                        <tr key={blog._id}>
                                                            <td>
                                                                {index + 1}
                                                            </td>

                                                            <td>
                                                                {blog.question}
                                                            </td>
                                                            <td>
                                                                {blog.answer}
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/faqdetails/${blog._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/faqedit/${blog._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={()=>handleDeleteFaq(blog._id)}>
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

export default FaqList
