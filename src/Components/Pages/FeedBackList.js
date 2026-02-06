import React from 'react'
import { Link } from 'react-router-dom'
const FeedBackList = () => {
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
                                                        User Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Message
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
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        01
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Leslie Alexander
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <p className="wrap-code1">
                                                            “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch d-flex justify-content-center">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        02
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Leslie Alexander
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <p className="wrap-code1">
                                                            “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch d-flex justify-content-center">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link></li>
                                                        <li> <Link className="view"> <i className="uil uil-eye" /> </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        03
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Leslie Alexander
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <p className="wrap-code1">
                                                            “Amazing design, easy to customize and a design quality superlative account on its cloud platform for the optimized performance. And we didn’t on our original designs.”
                                                        </p>
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch d-flex justify-content-center">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li> <Link className="remove"> <i className="uil uil-trash-alt" /> </Link> </li>
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

export default FeedBackList