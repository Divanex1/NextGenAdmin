import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../Services/api';
import { toast } from 'react-toastify';
const AddVendor = () => {
  const [formData, setFormData] = useState({
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
    isVendorActive: false,
    personal_details: {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      mobile_number: "",
      pinCode: "",
      address: "",
    }
  })
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("personal_details.")) {
      const key = name.split(".")[1]
      setFormData((prev) => ({
        ...prev,
        personal_details: { ...prev.personal_details, [key]: value },
      }))
    } else {
      setFormData({ ...formData, [name]: value })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const response = await postData('/admin/vendor-store', formData)
      if (response.state) {
        toast.success(response.message)
        navigate('/vendorlist')
      } else {
        toast.error(response.message)
      }
    } catch (error) {
      console.log("error add vendor", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">Add Vendor</h4>
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
                        Add Vendor
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
                  <form onSubmit={handleSubmit}>
                    <div className="form-basic">

                      <div className="row">
                        {/* <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor Image</label>
                            <input type="file" className="form-control" id="" name="" />
                          </div>
                        </div> */}
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor Bussiness Email</label>
                            <input type="email" className="form-control" placeholder='Enter business email' required name="business_email" onChange={handleChange} value={formData.business_email} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Business Mobile Number</label>
                            <input type="text" className="form-control" placeholder='Enter Name' required name="business_mobile_number" onChange={handleChange} value={formData.business_mobile_number} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Bussiness Name</label>
                            <input type="text" className="form-control" placeholder='Enter Bussiness Name' required name="business_name" onChange={handleChange} value={formData.business_name} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input type="text" className="form-control" placeholder='Enter Address Name' required name="address" onChange={handleChange} value={formData.address} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Brand</label>
                            <input type="text" className="form-control" placeholder='Enter Brand Name' required name="brand" onChange={handleChange} value={formData.brand} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Dealer Code</label>
                            <input type="text" className="form-control" placeholder='Enter Dealer Code' required name="dealer_code" onChange={handleChange} value={formData.dealer_code} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor Number</label>
                            <input type="number" className="form-control" placeholder='Enter Number' required name="personal_details.mobile_number" onChange={handleChange} value={formData.personal_details.mobile_number} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor Email</label>
                            <input type="email" className="form-control" placeholder='Enter Email' required name="personal_details.email" onChange={handleChange} value={formData.personal_details.email} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor First Name</label>
                            <input type="text" className="form-control" placeholder='Enter First Name' required name="personal_details.first_name" onChange={handleChange} value={formData.personal_details.first_name} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Vendor Last Name</label>
                            <input type="text" className="form-control" placeholder='Enter Last Name' required name="personal_details.last_name" onChange={handleChange} value={formData.personal_details.last_name} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Gender</label>
                            <select className='form-select' name="personal_details.gender" onChange={handleChange} required value={formData.personal_details.gender}>
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
                            <select className='form-select' name="country" onChange={handleChange} required value={formData.country}>
                              <option value="">Select Country</option>
                              <option value="India">India</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">State</label>
                            <select className='form-select' name="state" required onChange={handleChange} value={formData.state}>
                              <option value="">Select State</option>
                              <option value="Rajasthan">Rajasthan</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">City</label>
                            <select className='form-select' name="city" required onChange={handleChange} value={formData.city}>
                              <option value="">Select City</option>
                              <option value="Jaipur">Jaipur</option>
                            </select>
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Pin Code</label>
                            <input type="number" className="form-control" required placeholder='Enter Pincode' name="personal_details.pinCode" onChange={handleChange} value={formData.personal_details.pinCode} />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <div className="countryOption">
                              <label htmlFor="countryOption">Status</label>
                              <select className="form-select" name="isVendorActive" required onChange={handleChange} value={formData.isVendorActive}>
                                <option value="">Select Status</option>
                                <option value={true}>Active</option>
                                <option value={false}>Inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="">Address</label>
                            <input type="text" className="form-control" required placeholder='Enter vendor Address' name="personal_details.address" onChange={handleChange} value={formData.personal_details.address} />
                          </div>
                        </div>
                        <div className="col-lg-6 mb-3">
                          <div className="form-group">
                            <label htmlFor="">GST Number</label>
                            <input type="text" className="form-control" required placeholder='Enter GST Number' name="GST_number" onChange={handleChange} value={formData.GST_number} />
                          </div>
                        </div>

                        <div>
                          <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Submitting..." : "Submit"}</button>
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

export default AddVendor