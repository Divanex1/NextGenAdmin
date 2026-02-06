import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom";
import { getData, imgUrl } from '../Services/api';
import moment from 'moment';
import { DatePicker, Space } from 'antd';
const { RangePicker } = DatePicker;


function ProductView() {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        category: '',
        brand: '',
        price: '',
        discount_price: '',
        part_number: '',
        quanity: '',
        status: false,
        short_description: '',
        description: '',
        features: '',
        additional_details: '',
        product_image: [],
        compatibility: [{ make: '', model: '', year: null, chassis_number: '' }],
        topSelling:false,
        recommended:false,
    });

    const [imagePreviews, setImagePreviews] = useState([]);
    const [brandList, setBrandList] = useState([]);
    const [catList, setCatList] = useState([]);
    const [bikeList, setBikeList] = useState([]);


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

    // product Details Api
    const fetchProductDetails = async () => {
        try {
            const res = await getData(`/admin/products/${id}`);
            // Process compatibility data to handle date format
            console.log(res)
        const processedData = {
            ...res.data,
            compatibility: res.data.compatibility.map(comp => {
                // Check if year is a string in the format "YYYY-MM-DD to YYYY-MM-DD"
                if (comp.year && typeof comp.year === 'string' && comp.year.includes('to')) {
                    const [startDate, endDate] = comp.year.split(' to ');
                    return {
                        ...comp,
                        year: [moment(startDate), moment(endDate)]
                    };
                } 
                // Handle case where year might be an object with startYear/endYear
                else if (comp.year && comp.year.startYear && comp.year.endYear) {
                    return {
                        ...comp,
                        year: [moment(comp.year.startYear), moment(comp.year.endYear)]
                    };
                }
                // If no valid year data
                return {
                    ...comp,
                    year: null
                };
            })
        };

            setFormData(processedData)
            setImagePreviews(res.data.product_image)
        } catch (error) {
            console.log("error fetch Products details", error)
        }
    }

    useEffect(() => {
        fetchProductDetails();
    }, [id])

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="shop-breadcrumb">
                            <div className="breadcrumb-main">
                                <h4 className="text-capitalize breadcrumb-title">
                                    Product Details
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
                                                 Product Details
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
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Product Name</label>
                                            <input type='text' name='name' value={formData.name} disabled className='form-control' />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select className="form-select" name='category' value={formData.category?._id || formData.category} disabled>
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
                                            <select className="form-select" name='brand' value={formData.brand?._id || formData.brand} disabled>
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
                                            <select className="form-select" name='status' value={formData.status} disabled>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Top Selling </label>
                                            <select className="form-select" name='topSelling' value={formData.topSelling}>
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Recommanded </label>
                                            <select className="form-select" name='recommended' value={formData.recommended} >
                                                <option value="">Select Status</option>
                                                <option value={true}>Active</option>
                                                <option value={false}>Inactive</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Quantity</label>
                                            <input type='number' className='form-control' name='quanity' value={formData.quanity} disabled />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Part Number</label>
                                            <input type='number' className='form-control' name='part_number' value={formData.part_number} disabled />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Price (₹)</label>
                                            <input type='number' className='form-control' name='price' value={formData.price} disabled />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Discount Price (₹)</label>
                                            <input type='number' className='form-control' name='discount_price' value={formData.discount_price} disabled />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Short Description <span className="text-danger">*</span></label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.short_description }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.description }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Features <span className="text-danger">*</span></label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.features }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12 col-md-12 mb-3">
                                        <div className="form-group">
                                            <label htmlFor="name2">Additional Details <span className="text-danger">*</span></label>
                                            <div dangerouslySetInnerHTML={{ __html: formData.additional_details }} />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <hr />
                                        <h4 className="f-20 f-w-600">Image Product</h4>
                                        <p>
                                            <span className="text-primary">Note</span> : Format photos
                                            SVG, PNG, or JPG (Max size 4mb)
                                        </p>                                    
                                        <div className="row mb-3">
                                            {imagePreviews.map((preview, index) => (
                                                <div className="col-md-3 mb-2" key={index}>
                                                    <div className="position-relative">
                                                        <img
                                                            src={`${imgUrl}/${preview}`}
                                                            alt={`Preview ${index + 1}`}
                                                            className="img-fluid"
                                                            style={{ height: '150px', width: '100%', objectFit: 'cover', borderRadius: '8px' }}
                                                        />
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
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {formData.compatibility.map((comp, index) => (
                                                                <tr >
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            <select className="form-select w-100" name="make"
                                                                                value={comp.make} disabled
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
                                                                                value={comp.model} disabled
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
                                                                                value={comp.chassis_number} disabled
                                                                            />
                                                                        </div>
                                                                    </td>
                                                                    <td>
                                                                        <div className="custom-frm-bx">
                                                                            {comp.year ? (
                                                                                <RangePicker
                                                                                    value={comp.year}
                                                                                    disabled
                                                                                />
                                                                            ) : (
                                                                                <RangePicker disabled />
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
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>

    )
}

export default ProductView