import React from 'react'
import { Link } from 'react-router-dom'
import product1 from '../../assets/img/product-01.png'
const OrderList = () => {
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">Order List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">
                                                <i className="uil uil-estate"></i>Dashboard</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Order List</li>
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
                            <h5>Order List</h5>
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
                                                        Order ID
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Product Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Product Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Price
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Offer Price
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Order Date
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Status
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title ">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>
                                                    01
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-success btn-xs">Delivered</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    02
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-danger btn-xs">Cancelled</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    03
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-primary btn-xs">Shipped</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    04
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-info btn-xs">Picked</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    05
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-success btn-xs">Confirm</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    06
                                                </td>
                                                <td>
                                                    <span className='text-primary'> #04060445</span>
                                                </td>
                                                <td>
                                                    <img src={product1} className='wh-50' alt='' />
                                                </td>
                                                <td>
                                                    ENDURANCE Rear Shock <br />
                                                    Absorber for Bajaj Aven...
                                                </td>
                                                <td>₹1,552.00</td>
                                                <td>1252.00</td>
                                                <td>04/17/23  at 8:25 PM</td>
                                                <td>
                                                    <span className="btn btn-warning btn-xs">Pending</span>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="view">
                                                                <i className="uil uil-eye" />
                                                            </Link>
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
            </div>
        </>
    )
}

export default OrderList