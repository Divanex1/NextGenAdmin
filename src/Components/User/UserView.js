import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getData, imgUrl } from '../Services/api';
const UserView = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        profile_img: null,
        email: "",
        showPassword: "",
        isVendorActive: false,
        gender: "",
    })
    useEffect(() => {
        fetchUsers();
    }, []);


    // Fetch Api
    const fetchUsers = async () => {
        try {
            const res = await getData(`/admin/user-view/${id}`);
            setFormData(res.data)
        } catch (error) {
            console.log("error Fetch Users", error)
        }
    }

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    User Details
                                </h4>
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
                                                User  Details
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
                            <div className="card-body add-product__body">
                                <form className='row'>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>User Image</label>
                                            <div className="mt-2">
                                                <img src={`${imgUrl}/${formData.profile_img}`} alt="Preview" className="img-thumbnail" width="100" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input type='text' disabled value={formData.first_name} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input type='text' disabled value={formData.last_name} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>User Email</label>
                                            <input type='text' disabled value={formData.email} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="">User Mobile</label>
                                            <input type="text" className="form-control" disabled value={formData.mobile_number} />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-4 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="">User Password</label>
                                            <input type="text" className="form-control" disabled value={formData.showPassword} />
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" disabled value={formData.gender}>
                                                <option value="">Select Gender</option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" disabled value={formData.isVendorActive}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UserView