import React, { useEffect, useState } from 'react'
import ekologo from '../../assets/img/logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { postData } from '../Services/api';
const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            navigate("/"); 
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Validation
    const validateForm = () => {
        const { email, password } = formData;
        if (!email || !password) {
            toast.dismiss();
            toast.error("All fields are required.");
            return false;
        }
        return true;
    };

    // Login Api
    const handleLogin = async (e) => {
        e.preventDefault()
        setLoading(true);
        if (!validateForm()) {
            setLoading(false);
            return
        }
        try {
            const response = await postData('/auth/admin-login', formData);
            if (response.state) {
                navigate('/');
                localStorage.setItem('adminToken', response.data.token);
                toast.success(response.message);
            } else {
                toast.error(response.message || "Login failed"); // Show error message
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };
    return (
        <>
            <main className="main-content login-sec">
                <div className="admin">
                    <div className="container-fluid">
                        <div className="row justify-content-center">
                            <div className="col-xxl-4 col-xl-4 col-md-6 col-sm-8">
                                <div className="edit-profile">
                                    <div className="edit-profile__logos">
                                        <img className="dark" src={ekologo} alt="logodark" />
                                        <img className="light" src={ekologo} alt="logolight" />
                                    </div>
                                    <div className="card border-0">
                                        <div className="card-header">
                                            <div className="edit-profile__title">
                                                <h6>Sign In Next Gen</h6>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <form onSubmit={handleLogin}>
                                                <div className="edit-profile__body">
                                                    <div className="form-group">
                                                        <label htmlFor="username">
                                                            Email Address
                                                        </label>
                                                        <input
                                                            type="email"
                                                            className="form-control"
                                                            id="username"
                                                            name='email'
                                                            value={formData.email}
                                                            onChange={handleChange}
                                                            placeholder="Enter your email address"
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-group">
                                                        <label htmlFor="password-field">password</label>
                                                        <div className="position-relative">
                                                            <input
                                                                id="password-field"
                                                                type={showPassword ? 'text' : "password"}
                                                                className="form-control"
                                                                name="password"
                                                                value={formData.password}
                                                                onChange={handleChange}
                                                                placeholder="Enter your password"
                                                                required
                                                            />
                                                            <div onClick={() => setShowPassword(!showPassword)} className={`text-lighten fs-15 field-icon toggle-password2 ${showPassword ? 'uil uil-eye' : 'uil uil-eye-slash'}`}></div>
                                                        </div>
                                                    </div>
                                                    {/* <div className="admin-condition justify-content-end">
                                                        <Link to="/forgot-password">forget password?</Link>
                                                    </div> */}
                                                    <div className="admin__button-group button-group d-flex pt-1 justify-content-md-start justify-content-center mt-4">
                                                        <button type='submit' disabled={loading} className="btn btn-primary btn-default w-100 signIn-createBtn ">
                                                            {loading ? (
                                                                <span className="spinner-border spinner-border-sm"></span>
                                                            ) : (
                                                                "sign in"
                                                            )}
                                                        </button>
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
            </main>
        </>

    )
}

export default Login