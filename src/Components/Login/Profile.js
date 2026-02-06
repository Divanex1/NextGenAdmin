import React, { useEffect, useState ,useContext} from "react";
import upload from "../../assets/img/svg/upload.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import baseUrl, { imgUrl } from "../Helper/BaseUrl";
import { UserContext } from '../../Context/UserContext';

const Profile = () => {
  // const [values, setValues] = useState({
  //   full_name: "",
  //   email: "",
  //   phone_code_mobile: "",
  //   phone: "",
  //   city: "",
  //   state: "",
  //   role: "",
  //   status: "",
  //   pin_code: "",
  //   address: "",
  //   gst_number: "",
  //   phone_code_alt_mobile: "",
  //   alternate_mobile_number: "",
  // });
  // const [imgFile, setImgFile] = useState(null);
  // const navigate = useNavigate();
  // const [currentImage, setCurrentImage] = useState("");
  // const { user, setUser } = useContext(UserContext);
  // const fetchProfile = async () => {

  //   try {
  //     const res = await axios.get(`${baseUrl}/api/auth/profile`, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     // console.log("pro", res.data.data)
  //     setValues(res.data.data);
  //     setCurrentImage(res.data.data.profile_picture);
  //     setUser(res.data.data)
  //   } catch (error) {
  //     console.log("fetch profile error", error);
  //   } finally {
  //     // setLoading(false)
  //   }
  // };
  // // console.log(imgFile)
  // const customId = "custom-id-yes";
  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   if (name === "mobile") {
  //     if (/^\d*$/.test(value)) {
  //       const numericValue = value.replace(/[^0-9]/g, "");
  //       if (numericValue.length > 10) {
  //         toast.error("Phone number must be exactly 10 digits", {
  //           toastId: customId,
  //         });
  //         return;
  //       }
  //       setValues((prevValues) => ({
  //         ...prevValues,
  //         [name]: numericValue,
  //       }));
  //     } else {
  //       toast.error("Only digits are allowed.", { toastId: customId });
  //     }
  //   } else {
  //     setValues((prevValues) => ({
  //       ...prevValues,
  //       [name]: value,
  //     }));
  //   }
  // };

  // useEffect(() => {
  //   fetchProfile();
  // }, []);
  // const handleSubmit = async (e) => {
 
  //     e.preventDefault();
  //     console.log(values);
  //     console.log(imgFile);
      
  //   const formData = new FormData();
  //   formData.append("full_name", values.full_name);
  //   formData.append("phone", values.phone);
  //   formData.append("phone_code_mobile", values.phone_code_mobile);
  //   formData.append("email", values.email);
  //   formData.append("role", values.role);
  //   formData.append("status", values.status);
  //   formData.append("pin_code", values.pin_code);
  //   formData.append("address", values.address);
  //   formData.append("gst_number", values.gst_number);
  //   formData.append("phone_code_alt_mobile", values.phone_code_alt_mobile);
  //   formData.append("alternate_mobile_number", values.alternate_mobile_number);
     
  //   formData.append("state", values.state);
  //   formData.append("city", values.city);
     
  //   if (imgFile) {
  //     formData.append("profile_picture", imgFile);
  //   }else{
  //       formData.append("profile_picture", values.profile_picture.split("/").pop());
  //   }
  //   try {
  //     const response = await axios.post(`${baseUrl}/api/auth/profile-update`, formData, {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     // console.log('update', response)
  //     if (response.data.status) {
  //       toast.success(response.data.message);
  //       fetchProfile()
  //       // setValues((prevValues) => ({
  //       //   ...prevValues,
  //       //   profile_image: response.data.data.profile_image,
  //       // }));
  //       // setLoading(false)
  //     } else {
  //       // setLoading(false)
  //       toast.error(response.data.message);
  //     }
  //   } catch (error) {
  //     // setLoading(false)
  //     console.log("profile update error ", error);
  //   }
  // };
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Update Profile
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
                        Profile
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
                <div className="card-header">
                  <h6 className="fw-500">Update Profile</h6>
                </div>
                <div className="add-product__body px-sm-40 px-20">
                  <form onSubmit={handleSubmit}>
                    <div className="form-basic">
                      <div className="row">
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name1">Name</label>
                            <input
                              type="text"
                              name="full_name"
                              value={values.full_name}
                              onChange={handleChange}
                              className="form-control"
                              id="name1"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              id="name2"
                              name="email"
                              value={values.email}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Phone</label>
                            <input
                              type="text"
                              name="phone"
                              value={values.phone}
                              onChange={handleChange}
                              className="form-control"
                              id="name2"
                              placeholder="1231231231"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">
                              Alternate Mobile Number
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              id="name2"
                              name="alternate_mobile_number"
                              value={values.alternate_mobile_number}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>

                        {/* <div className='col-lg-4 col-md-4 mb-3'>
                                                    <div className="form-group">
                                                        <div className="countryOption">
                                                            <label htmlFor="countryOption">gender</label>
                                                            <select
                                                                name='gender'
                                                                value={values.gender}
                                                                onChange={handleChange}
                                                                className="form-control"
                                                                id="genderOption"
                                                            >
                                                                <option value="">select gender</option>
                                                                <option value="male">Male</option>
                                                                <option value="female">Female</option>
                                                                <option value="other">Other</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                </div> */}

                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Address</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name2"
                              name="address"
                              value={values.address}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">State</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name2"
                              name="state"
                              value={values.state}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">City</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name2"
                              name="city"
                              value={values.city}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Pin Code</label>
                            <input
                              type="number"
                              className="form-control"
                              id="name2"
                              name="pin_code"
                              value={values.pin_code}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Gst Number</label>
                            <input
                              type="number"
                              className="form-control"
                              id="name2"
                              name="gst_number"
                              value={values.gst_number}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>
                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <label htmlFor="name2">Company Name</label>
                            <input
                              type="text"
                              className="form-control"
                              id="name2"
                              name="company_name"
                              value={values.company_name}
                              onChange={handleChange}
                              placeholder="admin@gmail.com"
                            />
                          </div>
                        </div>

                        <div className="col-lg-4 col-md-4 mb-3">
                          <div className="form-group">
                            <div className="countryOption">
                              <label htmlFor="countryOption">Status</label>
                              <select
                                name="status"
                                value={values.status}
                                onChange={handleChange}
                                className="form-control"
                                id="countryOption"
                              >
                                <option value="">Select Status</option>
                                <option value="active">active</option>
                                <option value="inactive">inactive</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-12 col-md-4 mb-3">
                          <h6 className="fw-500">Product image</h6>
                          <label
                            htmlFor="upload"
                            className="file-upload__label"
                          >
                            <span className="upload-product-img px-10 d-block">
                              <span className="file-upload">
                                <img className="svg" src={upload} alt="" />
                                <input
                                  id="upload"
                                  className="file-upload__input"
                                  type="file"
                                  name="file-upload"
                                  onChange={(e) =>
                                    setImgFile(e.target.files[0])
                                  }
                                />
                              </span>
                            </span>
                          </label>
                          <div className="upload-part">
                            {imgFile ? (
                              <div className="upload-part-innr">
                                <img
                                  src={URL.createObjectURL(imgFile)}
                                  alt="img"
                                />
                              </div>
                            ) : (
                              currentImage && (
                                <div className="upload-part-innr">
                                  <img
                                    src={`${currentImage}`}
                                    alt="Current Category"
                                    className="img-fluid"
                                  />
                                </div>
                              )
                            )}
                          </div>
                        </div>
                        <div className="button-group add-product-btn d-flex justify-content-sm-end justify-content-center mt-40">
                          <button
                            type="submit"
                            className="btn btn-primary btn-default btn-squared text-capitalize"
                          >
                            Update Profile
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
    </>
  );
};

export default Profile;
