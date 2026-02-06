import React from 'react'
import { Link } from 'react-router-dom'
import seller1 from '../../assets/img/team-1.png'

function SellerList() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">Seller List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Seller List</li>
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
                            <h5>Product List</h5>
                            <Link className="btn btn-primary" to="/addseller"><span className="uil uil-plus"></span>Add Seller</Link>
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
                                                        Seller Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Seller Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Seller Phone
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Joining Date
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
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        01
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked="" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
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
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" checked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
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
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked="" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        04
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked="" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        05
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked="" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        06
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" defaultChecked="" />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        07
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" checked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        08
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" checked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        09
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" checked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
                                                            </Link>
                                                        </li>
                                                    </ul>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        10
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        <img src={seller1} alt='' className='wh-30' />
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        Mary Cousar
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        7894561230
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="userDatatable-inline-title">
                                                        15/03/2025
                                                    </div>
                                                </td>
                                                <td>
                                                    <div className="form-check form-switch">
                                                        <input className="form-check-input" type="checkbox" role="switch" id="" checked />
                                                    </div>
                                                </td>
                                                <td>
                                                    <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                        <li>
                                                            <Link to="" className="edit">
                                                                <i className="uil uil-edit" />
                                                            </Link>
                                                        </li>
                                                        <li>
                                                            <Link className="remove">
                                                                <i className="uil uil-trash-alt" />
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
            </div >

        </div>
    )
}

export default SellerList