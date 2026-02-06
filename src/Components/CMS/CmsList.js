import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getData } from '../Services/api'
const CmsList = () => {
    const [cmsList, setCmsList] = useState([])

    const fetchCMSPages = async () => {
        try {
            const res = await getData(`/admin/cms`)
            console.log(res)
            if (res.status) {
                setCmsList(res.data)
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log("error fetch cms list", error)
        }
    }

    useEffect(() => {
        fetchCMSPages();
    }, [])
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">CMS List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-home"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">CMS List</li>
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
                            <h5>CMS List</h5>
                            <Link className="btn btn-primary" to="/addcms"><span className="uil uil-plus"></span>Add CMS</Link>
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
                                                        CMS Title
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        Status
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                cmsList.map((page, index) => {
                                                    return (
                                                        <tr key={page._id}>
                                                            <td>
                                                                {index + 1}
                                                            </td>
                                                            <td>
                                                                {page.title}
                                                            </td>
                                                            <td>
                                                                <div className="form-check form-switch d-flex justify-content-center">
                                                                    <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/cmsdetails/${page.slug}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link to={`/cmsedit/${page.slug}`} className="edit" >
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    {/* <li>
                                                                        <Link className="remove">
                                                                            <i className="uil uil-trash-alt" />
                                                                        </Link>
                                                                    </li> */}
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

export default CmsList