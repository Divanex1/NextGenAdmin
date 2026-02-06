import React from 'react'
import { Link } from 'react-router-dom'
const InquiryList = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">Feedback List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Feedback List</li>
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
                            <h5>Feedback List</h5>
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
                                                        First Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Last Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Email
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Number
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
                                            <tr>
                                                <td> 01 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 02 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 03 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 04 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 05 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 06 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td> 07 </td>
                                                <td> Leslie </td>
                                                <td> Alexander </td>
                                                <td> lesliealexander@gmail.com </td>
                                                <td> 7894561230 </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
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

export default InquiryList