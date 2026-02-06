import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import brand from '../../assets/img/brand-img.png'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { toast } from 'react-toastify';
const BrandList = () => {
    const [brandList, setBrandList] = useState([]);

    useEffect(() => {
        fetchBrands();
    }, []);


    // Fetch Api
    const fetchBrands = async () => {
        try {
            const res = await getData('/admin/brands');
            console.log(res.data)
            setBrandList(res.data.brandListData)
        } catch (error) {
            console.log("error Fetch Brands", error)
        }
    }

    // Toggle Brand Active/Inactive Status
    const toggleBrandStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/brands/${brandId}`);
            console.log(response)
            if (response.status) {
                toast.dismiss();
                toast.success(`Brand Status Changed Successfully`);
                fetchBrands();
            } else {
                toast.error(response.message || "Failed to update status");
                // fetchVendors();
            }
        } catch (error) {
            toast.error("Error updating brand status");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/brands/${id}`);
            console.log(response)
            if (response.status) {
                toast.success("Brand Deleted Successfully")
                fetchBrands();
            } else {
                toast.error("Error Brand Delete")
            }
        } catch (error) {
            console.log("delete api error", error)
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">Brand List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Brand List</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <div className="card">
                        <div className="card-header">
                            <h5>Brand List</h5>
                            <Link className="btn btn-primary" to="/addbrand"><span className="uil uil-plus"></span>Add Brand</Link>
                        </div>
                        <div className="card-body">
                            <div className="userDatatable global-shadow border-light-0 p-30 bg-white radius-xl w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th><span className="userDatatable-title">S.No.</span></th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Brand Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Brand Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Brand Description
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Status
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                brandList.map((brand, index) => {
                                                    return (
                                                        <tr key={brand._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={brand.logo ? `${imgUrl}/${brand.logo}` : brand} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {brand.name}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {brand.description}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${brand._id}`}
                                                                            checked={brand.status}
                                                                            onChange={() => toggleBrandStatus(brand._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/branddetails/${brand._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/brandedit/${brand._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(brand._id)}>
                                                                            <i className="uil uil-trash-alt" />
                                                                        </a>
                                                                    </li>
                                                                </ul>
                                                            </td>
                                                        </tr>
                                                    )
                                                })
                                            }

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div >


        </>
    )
}

export default BrandList