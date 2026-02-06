import React from 'react'
import { Link } from 'react-router-dom'

function AddSeller() {
    return (
        <div>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">Add Seller</h4>
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
                                                Add Seller
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
                            <div className="card-body p-0">
                                <div className="add-product__body px-sm-40 px-20">
                                    <form >
                                        <div className="form-basic">

                                            <div className="row">
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Seller Image</label>
                                                        <input type="file" className="form-control" id="" name="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Seller Name </label>
                                                        <input type="text" className="form-control" placeholder='Enter Name' id="" name="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Seller Phone</label>
                                                        <input type="text" className="form-control" placeholder='Enter Phone' id="" name="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Joining Date</label>
                                                        <input type="date" className="form-control" placeholder='' id="" name="" />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">Status</label>
                                                            <select className="form-control" name="status">
                                                                <option value="">Select Status</option>
                                                                <option value="active">Active</option>
                                                                <option value="inactive">Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" className="btn btn-primary" >
                                                        Submit
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default AddSeller