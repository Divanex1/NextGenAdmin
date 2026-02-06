import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, putData } from '../Services/api';
import { toast } from 'react-toastify';

function UserEdit() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        country_code: "",
        mobile_number: "",
        profile_img: null,
        email: "",
        password: "",
        isVendorActive: false,
        gender: "",
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [preview, setPreview] = useState(null);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setFormData((prev) => ({
                ...prev,
                profile_img: file
            }));
            setPreview(URL.createObjectURL(file))
        }
    }

    useEffect(() => {
        fetchUsers();
    }, []);
    // Fetch Api
    const fetchUsers = async () => {
        try {
            const res = await getData(`/admin/user-view/${id}`);
            console.log(res.data)
            const userData = res.data;
            setFormData(userData)
            setPreview(`${imgUrl}/${userData.profile_img}`)
        } catch (error) {
            console.log("error Fetch Users", error)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const userData = new FormData();
            userData.append("first_name", formData.first_name);
            userData.append("last_name", formData.last_name);
            userData.append("country_code", formData.country_code);
            userData.append("mobile_number", formData.mobile_number); 
            userData.append("email", formData.email);
            userData.append("password", formData.password);
            userData.append("gender", formData.gender);
            userData.append("isVendorActive", formData.isVendorActive);
            userData.append("profile_img", formData.profile_img);
            const res = await putData(`/admin/user-update/${id}`, userData);
            if (res.state) {
                toast.success("User Updated Successfully")
                navigate('/userlist')
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log("error updating api", error)
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
                                <h4 className="text-capitalize breadcrumb-title">User Edit</h4>
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
                                                User Edit
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
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">User Image</label>
                                                        <input type='file' className='form-control' accept='images/*' onChange={handleFileChange} />
                                                        {preview && (
                                                            <div className="mt-2">
                                                                <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">First Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter Name' name="first_name" value={formData.first_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Last Name</label>
                                                        <input type="text" className="form-control" placeholder='Enter Name' name="last_name" value={formData.last_name} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Country Code</label>
                                                        <input type="text" className="form-control" placeholder='Country Code' name="country_code" value={formData.country_code} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">Mobile Number</label>
                                                        <input type="text" className="form-control" placeholder='Mobile Number' name="mobile_number" value={formData.mobile_number} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">User Email</label>
                                                        <input type="text" className="form-control" placeholder='Enter Email' name="email" value={formData.email} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <label htmlFor="">User Password</label>
                                                        <input type="text" className="form-control" placeholder='Enter password' name="password" value={formData.password} onChange={handleChange} />
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">Status</label>
                                                            <select className="form-control" name="isVendorActive" value={formData.isVendorActive} onChange={handleChange} >
                                                                <option value="">Select Status</option>
                                                                <option value={true}>Active</option>
                                                                <option value={false}>Inactive</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-4 col-md-4 mb-3">
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">Gender</label>
                                                            <select className="form-control" name="gender" value={formData.gender} onChange={handleChange} >
                                                                <option value="">Select Gender</option>
                                                                <option value="Male">Male</option>
                                                                <option value="Female">Female</option>
                                                                <option value="Other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Submitting...' : 'Submit'}</button>
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

export default UserEdit