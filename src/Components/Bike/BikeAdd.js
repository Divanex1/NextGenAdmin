import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { postData } from '../Services/api';
import { toast } from 'react-toastify';
const BikeAdd = () => {
    const [formData, setFormData] = useState({
        make: "",
        vehicaleType: "",
        model: [],
        status: false,
    })
    const [loading, setLoading] = useState(false);
    const [modelInput, setModelInput] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevValues => ({
            ...prevValues,
            [name]: value
        }));
    }

    // Handle adding a model to the array
    const handleAddModel = () => {
        if (modelInput.trim() !== "" && !formData.model.includes(modelInput)) {
            setFormData((prevValues) => ({
                ...prevValues,
                model: [...prevValues.model, modelInput], // Add new model to array
            }));
            setModelInput(""); // Clear input after adding
        }
    };

    // Handle removing a model from the array
    const handleRemoveModel = (index) => {
        setFormData((prevValues) => ({
            ...prevValues,
            model: prevValues.model.filter((_, i) => i !== index),
        }));
    };
    
    // Bike Add Api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const res = await postData('/admin/bikes', formData);
            console.log(res)
            if (res.status) {
                toast.success(res.message)
                navigate('/bikelist')
            }
        } catch (error) {
            console.log("bike post error", error)
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
                                    add Bike
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
                                                add Bike
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
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Bike Make</label>
                                            <input type='text' name='make' required onChange={handleChange} value={formData.make} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Vehicale Type</label>
                                            <input type='text' name='vehicaleType' required onChange={handleChange} value={formData.vehicaleType} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Models</label>
                                            <div className="d-flex">
                                                <input
                                                    type="text"
                                                    name="modelInput"
                                                    value={modelInput}
                                                    onChange={(e) => setModelInput(e.target.value)}
                                                    className="form-control me-2"
                                                    placeholder="Enter Model"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={handleAddModel}
                                                    className="btn btn-success"
                                                >
                                                    Add
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Display Added Models */}
                                    {/* <div className="col-lg-12 mb-3">
                                        {formData.model.length > 0 && (
                                            <div className="form-group">
                                                <label>Added Models</label>
                                                <ul className="list-group">
                                                    {formData.model.map((mod, index) => (
                                                        <li
                                                            key={index}
                                                            className="list-group-item d-flex justify-content-between align-items-center"
                                                        >
                                                            {mod}
                                                            <button
                                                                type="button"
                                                                className="btn btn-danger btn-sm"
                                                                onClick={() => handleRemoveModel(index)}
                                                            >
                                                                Remove
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </div> */}

                                    <div className="col-lg-6 mb-3">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" name='status' required onChange={handleChange} value={formData.status}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-12 text-end">
                                        <button className='btn btn-primary' disabled={loading} type='submit'>{loading ? 'Submitting...' : 'Submit'}</button>
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

export default BikeAdd