import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import avtar2 from '../../assets/img/authorimg.jpg'
import { toast } from 'react-toastify';
import { useProfile } from '../../Context/UserContext';
import { imgUrl, putData } from '../Services/api';

const Profile = () => {
    const [profileFile, setProfileFile] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { profile, setProfile, fetchProfile } = useProfile();
    const [passwordData, setPasswordData] = useState({
  old_password: "",
  new_password: "",
  confirm_password: ""
});
const handlePasswordChange = (e) => {
  const { name, value } = e.target;
  setPasswordData({ ...passwordData, [name]: value });
};
const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  if (passwordData.new_password !== passwordData.confirm_password) {
    return toast.error("New password & confirm password do not match");
  }

  try {
    const res = await putData("/auth/change-password", passwordData);

    if (res.state) {
      toast.success(res.message);
      setPasswordData({
        old_password: "",
        new_password: "",
        confirm_password: ""
      });
    } else {
      toast.error(res.message);
    }
  } catch (error) {
    console.log("change password error", error);
    toast.error("Something went wrong");
  }
};


    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };
    // Handle profile image upload
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (!file) return;
        setProfileFile(file);
    };


    // Profile Update Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true)
        const formDataToSend = new FormData();
        formDataToSend.append("first_name", profile.first_name)
        formDataToSend.append("last_name", profile.last_name)
        formDataToSend.append("email", profile.email)
        formDataToSend.append("mobile_number", profile.mobile_number)
        formDataToSend.append("gender", profile.gender)
        formDataToSend.append("city", profile.city)
        formDataToSend.append("state", profile.state)
        formDataToSend.append("pinCode", profile.pinCode)
        if (profileFile) {
            formDataToSend.append("profile_img", profileFile);
        }
        try {
            const res = await putData('/auth/vendor-profile-update', formDataToSend);
            console.log(res.message)
            if (res.state) {
                toast.success(res.message)
                fetchProfile()
            }
        } catch (error) {
            console.log("profile updatoing error", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [])
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6">
                    <h3 className="dash-title">Profile</h3>
                    <div className="custom-bredcump">
                        <ol className="breadcrumb">
                            <li className="breadcrumb-item">
                                <Link to="/">Dashboard</Link>
                            </li>
                            <li className="breadcrumb-item active" aria-current="page">
                                Profile
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="vendor-profile-verified">
                        <div>
                            <h6>Mobile Number </h6>
                            <h6 className="text-success">+91-{profile.mobile_number}</h6>
                        </div>
                    </div>
                    <div className="cards mt-3">
                        <form onSubmit={handleSubmit}>
                            <div className="cards-body">
                                <div className='row'>
                                    <div className="profile-upload-img col-md-6">
                                        <img width={100} height={100} src={profileFile ? URL.createObjectURL(profileFile) : profile.profile_img ? `${imgUrl}/${profile.profile_img}` : avtar2} alt="avtar2" />
                                        <input type="file" id="profile"
                                            accept="image/jpeg, image/png, image/jpg"
                                            onChange={handleImageUpload}
                                        />
                                        {/* <label htmlFor="profile">
                                            <i className="fas fa-pencil" />
                                        </label> */}
                                    </div>
                                    <div className="custom-frm-bx col-md-6 mt-2">
                                        <label htmlFor="" className='form-label'>First Name</label>
                                        <input type="text" name='first_name' value={profile.first_name} onChange={handleChange} className="form-control" />
                                    </div>
                                    <div className="custom-frm-bx col-md-6 mt-2">
                                        <label htmlFor="" className='form-label'>Last Name</label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            name='last_name' value={profile.last_name} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="custom-frm-bx col-md-6 mt-2">
                                        <label className='form-label'>Mobile Number</label>
                                        <input
                                            type="text"
                                            name="mobile_number"
                                            value={profile.mobile_number || ""}
                                            onChange={handleChange}
                                            className="form-control"
                                            maxLength={10}
                                            placeholder="Enter mobile number"
                                        />
                                    </div>
                                    <div className="custom-frm-bx col-md-6 mt-2">
                                        <label htmlFor="" className='form-label'>Enter Address</label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            name='email' value={profile.email} onChange={handleChange}
                                        />
                                    </div>
                                    <div className="custom-frm-bx col-md-6">
                                        <label htmlFor="" className='form-label'>Gender</label>
                                        <select name='gender' value={profile.gender} onChange={handleChange} className="form-select">
                                            <option value="">Select Gender</option>
                                            <option value="Male">Male</option>
                                            <option value="Female">Female</option>
                                            <option value="Other">Other</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="custom-frm-bx text-end my-2 d-flex justify-content-end">
                                    <button className="btn btn-primary" disabled={isSubmitting} type="submit">
                                        {isSubmitting ? 'Updating...' : 'Update'}
                                    </button>
                                </div>
                            </div>
                        </form>


                        <div className="cards mt-4">
                            <h5 className="mb-3">Change Password</h5>

                            <form onSubmit={handlePasswordSubmit}>
                                <div className="row">
                                <div className="col-md-6 mt-2">
                                    <label className="form-label">Old Password</label>
                                    <input
                                    type="password"
                                    name="old_password"
                                    value={passwordData.old_password}
                                    onChange={handlePasswordChange}
                                    className="form-control"
                                    required
                                    />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label className="form-label">New Password</label>
                                    <input
                                    type="password"
                                    name="new_password"
                                    value={passwordData.new_password}
                                    onChange={handlePasswordChange}
                                    className="form-control"
                                    required
                                    />
                                </div>

                                <div className="col-md-6 mt-2">
                                    <label className="form-label">Confirm Password</label>
                                    <input
                                    type="password"
                                    name="confirm_password"
                                    value={passwordData.confirm_password}
                                    onChange={handlePasswordChange}
                                    className="form-control"
                                    required
                                    />
                                </div>
                                </div>

                                <div className="text-end mt-3">
                                <button type="submit" className="btn btn-warning">
                                    Change Password
                                </button>
                                </div>
                            </form>
                            </div>


                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile