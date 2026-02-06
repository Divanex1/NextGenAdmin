import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../Services/api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';

const AddFaq = () => {
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
    })
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    // FAQ Add Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.question || !formData.answer) {
            toast.error("All fields are required!");
            setLoading(false)
            return;
        }
        setLoading(true)
        try {
            const res = await postData('/admin/faq-add', formData);
            if (res.status) {
                toast.success(res.message)
                navigate('/faqlist')
            }
        } catch (error) {
            console.log("faq post error", error)
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
                                <h4 className="text-capitalize breadcrumb-title">
                                    Add FAQ
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
                                               Add FAQ
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
                                <form className='row' onSubmit={handleSubmit}>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Question</label>
                                            <input type='text' className='form-control' name='question' value={formData.question} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Answer</label>
                                            <input type='text' className='form-control' name='answer' value={formData.answer} onChange={handleChange} />
                                        </div>
                                    </div>
                            
                                    <div className="col-lg-12 text-end">
                                        <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Submitting...' : 'Submit'}</button>
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

export default AddFaq