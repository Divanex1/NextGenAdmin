import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData } from '../Services/api'

const VendorView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        gender: "",
        mobile_number: "",
        pinCode: "",
        address: "",
        isVendorActive: false,
    })

    const [vendorDetails, setVendorDetails] = useState({
        business_email: "",
        business_mobile_number: "",
        business_name: "",
        address: "",
        GST_number: "",
        brand: "",
        dealer_code: "",
        country: "",
        state: "",
        city: "",

    })

    useEffect(() => {
        fetchVendors();
    }, [id])
    
    const fetchVendors = async () => {
        try {
            const response = await getData(`/admin/vendor-view/${id}`);
            console.log(response.data)
            setFormData(response.data)
            setVendorDetails(response.data.vender_details)
        } catch (error) {
            console.log("error fetching vendor ", error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">Vendor Details</h4>
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
                                                Vendor Details
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
                                                        <label htmlFor="">Vendor Bussiness Email</label>
                                                        <input type="email" className="form-control" placeholder='Enter business email' disabled value={vendorDetails.business_email} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Business Mobile Number</label>
                                                        <input type="text" className="form-control" placeholder='Enter Name' disabled value={vendorDetails.business_mobile_number} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Bussiness Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter Bussiness Name' disabled value={vendorDetails.business_name} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Address</label>
                                                        <input type="text" className="form-control" placeholder='Enter Address Name' disabled value={vendorDetails.address} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Brand</label>
                                                        <input type="text" className="form-control" placeholder='Enter Brand Name' disabled name="brand" value={vendorDetails.brand} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Dealer Code</label>
                                                        <input type="text" className="form-control" placeholder='Enter Dealer Code' disabled name="dealer_code" value={vendorDetails.dealer_code} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Vendor Number</label>
                                                        <input type="number" className="form-control" placeholder='Enter Number' disabled name="mobile_number" value={formData.mobile_number} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Vendor Email</label>
                                                        <input type="email" className="form-control" placeholder='Enter Email' disabled name="email" value={formData.email} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Vendor First Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter First Name' disabled value={formData.first_name} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Vendor Last Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter Last Name' disabled value={formData.last_name} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Gender</label>
                                                        <select className='form-select' name="gender" disabled value={formData.gender}>
                                                            <option value="">Select Gender</option>
                                                            <option value="Male">Male</option>
                                                            <option value="Female">Female</option>
                                                            <option value="Other">Other</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Country</label>
                                                        <select className='form-select' disabled value={vendorDetails.country}>
                                                            <option value="">Select Country</option>
                                                            <option value="India">India</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">State</label>
                                                        <select className='form-select' name="state" disabled value={vendorDetails.state}>
                                                            <option value="">Select State</option>
                                                            <option value="Rajasthan">Rajasthan</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">City</label>
                                                        <select className='form-select' name="city" disabled value={vendorDetails.city}>
                                                            <option value="">Select City</option>
                                                            <option value="Jaipur">Jaipur</option>
                                                        </select>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Pin Code</label>
                                                        <input type="number" className="form-control" disabled placeholder='Enter Pincode' value={formData.pinCode} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">Status</label>
                                                            <select className="form-select" name="status" disabled value={formData.isVendorActive}>
                                                                <option value="">Select Status</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-6 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">GST Number</label>
                                                        <input type="text" className="form-control" disabled placeholder='Enter GST Number' name="GST_number" value={vendorDetails.GST_number} />
                                                    </div>
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
        </>
    )
}

export default VendorView