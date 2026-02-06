import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import { getData, postData } from '../Services/api';
import { DatePicker, Space } from 'antd';
import { toast } from 'react-toastify';
import JoditEditor from "jodit-react";
const { RangePicker } = DatePicker;

function AddProduct() {
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        discount_price: '',
        part_number: '',
        quanity: '',
        low_inventory :"",
        status: false,
        short_description: '',
        description: '',
        features: '',
        additional_details: '',
        product_image: [],
        compatibility: [{ make: '', model: '', year: null, chassis_number: '' }],
        topSelling: false,
        recommended: false,
    });

    const [loading, setLoading] = useState(false);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [catList, setCatList] = useState([]);
    const [bikeList, setBikeList] = useState([]);
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // handle image change
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setFormData((prevData) => ({
            ...prevData,
            product_image: [...prevData.product_image, ...files],
        }));
        // Create preview URLs for the selected images
        const newPreviews = files.map(file => URL.createObjectURL(file));
        setImagePreviews(prev => [...prev, ...newPreviews]);
    };

    // image delete
    const handleRemoveImage = (index) => {
        // Remove from form data
        setFormData(prevData => {
            const updatedImages = [...prevData.product_image];
            updatedImages.splice(index, 1);
            return { ...prevData, product_image: updatedImages };
        });

        // Remove from previews and revoke the URL to prevent memory leaks
        URL.revokeObjectURL(imagePreviews[index]);
        setImagePreviews(prev => prev.filter((_, i) => i !== index));
    };

    const handleAddCompatibility = () => {
        setFormData((prevData) => ({
            ...prevData,
            compatibility: [...prevData.compatibility, { make: '', model: '', year: '', chassis_number: '' }],
        }));
    };

    // remove compatibility
    const handleRemoveCompatibility = (index) => {
        setFormData((prevData) => {
            const updatedCompatibility = prevData.compatibility.filter((_, i) => i !== index);
            return { ...prevData, compatibility: updatedCompatibility };
        });
    };

    // compatibility change
    const handleCompatibilityChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCompatibility = [...formData.compatibility];
        updatedCompatibility[index][name] = value;
        setFormData((prevData) => ({ ...prevData, compatibility: updatedCompatibility }));
    };
    // Create a separate handler for date range changes
    const handleDateRangeChange = (index, dates, dateStrings) => {
        const updatedCompatibility = [...formData.compatibility];
        updatedCompatibility[index].year = dates; // Store the actual date objects
        setFormData((prevData) => ({ ...prevData, compatibility: updatedCompatibility }));
    };

    useEffect(() => {
        fetchBrands();
        fetchCategories();
        fetchBikes();
    }, []);

    // Fetch Brands Api
    const fetchBrands = async () => {
        try {
            const res = await getData('/admin/brands');
            setBrandList(res.data.brandListData)
        } catch (error) {
            console.log("error Fetch Brands", error)
        }
    }

    // Fetch Category Api
    const fetchCategories = async () => {
        try {
            const res = await getData('/admin/categories');
            setCatList(res.data.categoryListData)
        } catch (error) {
            console.log("error Fetch Category", error)
        }
    }

    // Fetch Bike Api
    const fetchBikes = async () => {
        try {
            const res = await getData('/admin/bikes');
            setBikeList(res.data.bikeListData)
        } catch (error) {
            console.log("error Fetch Banner", error)
        }
    }

    // add product api
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const productData = new FormData();
            productData.append('name', formData.name);
            productData.append('category', formData.category);
            productData.append('brand', formData.brand);
            productData.append('price', formData.price);
            productData.append('discount_price', formData.discount_price);
            productData.append('part_number', formData.part_number);
            productData.append('quanity', formData.quanity);
            productData.append('low_inventory ', formData.low_inventory );
            productData.append('status', formData.status);
            productData.append('short_description', formData.short_description);
            productData.append('description', formData.description);
            productData.append('features', formData.features);
            productData.append('additional_details', formData.additional_details);
            productData.append('topSelling', formData.topSelling);
            productData.append('recommended', formData.recommended);
            // Properly append multiple files
            formData.product_image.forEach((file, index) => {
                productData.append(`product_image`, file);
            });
            // Convert compatibility array to JSON string
            productData.append('compatibility', JSON.stringify(
                formData.compatibility.map(comp => ({
                    ...comp,
                    // Convert the year range into a string format (e.g., "YYYY-MM-DD to YYYY-MM-DD")
                    year: comp.year
                        ? `${comp.year[0]?.format('YYYY-MM-DD')} to ${comp.year[1]?.format('YYYY-MM-DD')}`
                        : null
                }))
            ));
            const res = await postData('/admin/products', productData);
            console.log(res)
            if (res.status) {
                toast.success("product Added Successfully")
                navigate('/productlist')
            } else {
                toast.error(res.message)
            }
        } catch (error) {
            console.log("error add product", error)
        } finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        return () => {
            imagePreviews.forEach(url => URL.revokeObjectURL(url));
        };
    }, [imagePreviews]);

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    add product
                                </h4>
                                <div className="breadcrumb-action justify-content-center flex-wrap">
                                    <nav aria-label="breadcrumb">
                                        <ol className="breadcrumb">
                                            <li className="breadcrumb-item">
                                                <Link to="/">
                                                    <i className="uil uil-home" />
                                                    Home
                                                </Link>
                                            </li>
                                            <li
                                                className="breadcrumb-item active"
                                                aria-current="page"
                                            >
                                                add product
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
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input type='text' name='name' required value={formData.name} onChange={handleChange} className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select className="form-select" name='category' required value={formData.category} onChange={handleChange}>
                                                <option value="">Select Category</option>
                                                {
                                                    catList.map((cat, index) => {
                                                        return (
                                                            <option key={cat._id} value={cat._id}>{cat.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Brand</label>
                                            <select className="form-select" name='brand' required value={formData.brand} onChange={handleChange}>
                                                <option value="">Select Brand</option>
                                                {
                                                    brandList.map((brand, index) => {
                                                        return (
                                                            <option key={brand._id} value={brand._id}>{brand.name}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Status </label>
                                            <select className="form-select" name='status' required value={formData.status} onChange={handleChange}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Top Selling </label>
                                            <select className="form-select" name='topSelling' required value={formData.topSelling} onChange={handleChange}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Recommanded </label>
                                            <select className="form-select" name='recommended' required value={formData.recommended} onChange={handleChange}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type='number' className='form-control' required name='quanity' value={formData.quanity} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Low Inventory</label>
                                            <input type='number' className='form-control' required name='low_inventory ' value={formData.low_inventory } onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Part Number</label>
                                            <input type='number' className='form-control' required name='part_number' value={formData.part_number} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Price (₹)</label>
                                            <input type='number' className='form-control' required name='price' value={formData.price} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Discount Price (₹)</label>
                                            <input type='number' className='form-control' required name='discount_price' value={formData.discount_price} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Short Description <span className="text-danger">*</span></label>
                                            <JoditEditor
                                                value={formData.short_description}
                                                onChange={(newContent) =>
                                                    setFormData((prev) => ({ ...prev, short_description: newContent }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                            <JoditEditor
                                                value={formData.description}
                                                onChange={(newContent) =>
                                                    setFormData((prev) => ({ ...prev, description: newContent }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Features <span className="text-danger">*</span></label>
                                            <JoditEditor
                                                value={formData.features}
                                                onChange={(newContent) =>
                                                    setFormData((prev) => ({ ...prev, features: newContent }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Additional Details <span className="text-danger">*</span></label>
                                            <JoditEditor
                                                value={formData.additional_details}
                                                onChange={(newContent) =>
                                                    setFormData((prev) => ({ ...prev, additional_details: newContent }))
                                                }
                                            />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <hr />
                                        <h4 className="f-20 f-w-600">Image Product</h4>
                                        <p>
                                            <span className="text-primary">Note</span> : Format photos
                                            SVG, PNG, or JPG (Max size 4mb)
                                        </p>
                                        <div className="upload-img-box">
                                            <div className="upload-img-box-innr">
                                                <input type="file" id="img-01" multiple required
                                                    onChange={handleImageChange}
                                                />
                                                <label htmlFor="img-01">
                                                    {" "}
                                                    <span className="far fa-image" />
                                                    Photo 1{" "}
                                                </label>
                                            </div>
                                        </div>
                                        <div className="row mb-3">
                                            {imagePreviews.map((preview, index) => (
                                                <div className="col-md-3 mb-2" key={index}>
                                                    <div className="position-relative">
                                                        <img
                                                            src={preview}
                                                            alt={`Preview ${index + 1}`}
                                                            className="img-fluid"
                                                            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                        />
                                                        <button
                                                            type="button"
                                                            className="btn btn-danger btn-sm position-absolute"
                                                            style={{ top: '5px', right: '5px', borderRadius: '50%', padding: '0.25rem 0.5rem' }}
                                                            onClick={() => handleRemoveImage(index)}
                                                        >
                                                            <i className="far fa-trash-alt"></i>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                        <hr />
                                        <div className="row">
                                            <div className="col-lg-12">
                                                <h4 className="f-20 f-w-600">Compatibility Details</h4>
                                                <div className="table-responsive compatibility-table">
                                                    <table className="table table-borderless">
                                                        <thead>
                                                            <tr>
                                                                <th>Make</th>
                                                                <th>Model</th>
                                                                <th>Chassis Number</th>
                                                                <th>Start Year to End Year</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {formData.compatibility.map((comp, index) => (
                                                                <tr >
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            <select className="form-select w-100" name="make"
                                                                                value={comp.make} required onChange={(e) => handleCompatibilityChange(index, e)}
                                                                            >
                                                                                <option value="">Select bike</option>
                                                                                {
                                                                                    bikeList.map((bike, index) => {
                                                                                        return (
                                                                                            <option key={bike._id} value={bike._id}>{bike.make}</option>
                                                                                        )
                                                                                    })
                                                                                }
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            <select className="form-select w-100" name="model"
                                                                                value={comp.model} required onChange={(e) => handleCompatibilityChange(index, e)}
                                                                            >
                                                                                <option value="">Select model</option>
                                                                                <option value="model">model</option>
                                                                                {/* {
                                                                                    bikeList.map((bike,index) => {
                                                                                        return (
                                                                                            <option key={bike._id} value={bike._id}>{bike.make}</option>
                                                                                        )
                                                                                    })
                                                                                } */}
                                                                            </select>
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            <input type="number" className="form-control" name='chassis_number'
                                                                                value={comp.chassis_number} required onChange={(e) => handleCompatibilityChange(index, e)}
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            <RangePicker
                                                                                value={comp.year}
                                                                                onChange={(dates, dateStrings) => handleDateRangeChange(index, dates, dateStrings)}
                                                                            />
                                                                        </div>
                                                                    </td>

                                                                    <td>
                                                                        <div className='d-flex'>
                                                                            <a className="btn btn-success me-2"
                                                                                onClick={handleAddCompatibility}
                                                                            >
                                                                                <i className="fas fa-plus" />
                                                                            </a>
                                                                            {index > 0 && (
                                                                                <a className="action-btn btn btn-danger" onClick={() => handleRemoveCompatibility(index)}><i className="fas fa-trash-alt" /></a>
                                                                            )}
                                                                        </div>
                                                                    </td>
                                                                </tr>
                                                            ))}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                    <div className="col-lg-12 d-flex justify-content-end p-3">
                                        <button className='btn btn-primary' type='submit' disabled={loading}>{loading ? 'Submitting...' : 'Submit'}</button>
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

export default AddProduct