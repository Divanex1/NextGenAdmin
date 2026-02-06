import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import { deleteData, getData, imgUrl, patchData } from '../Services/api';

function CategoryList() {
    const [catList, setCatList] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);


    // Fetch Api
    const fetchCategories = async () => {
        try {
            const res = await getData('/admin/categories');
            setCatList(res.data.categoryListData)
        } catch (error) {
            console.log("error Fetch Category", error)
        }
    }

    // Toggle Category Active/Inactive Status
    const toggleCategoryStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/categories/${brandId}`);
            console.log(response)
            if (response.status) {
                toast.dismiss();
                toast.success(`Category Status Changed Successfully`);
                fetchCategories();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating Category status");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/categories/${id}`);
            if (response.status) {
                toast.success("Category Deleted Successfully")
                fetchCategories();
            } else {
                toast.error("Error Category Delete")
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
                            <h4 className="text-capitalize breadcrumb-title">Category List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Category List</li>
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
                            <h5>Category List</h5>
                            <Link className="btn btn-primary" to="/addcategory"><span className="uil uil-plus"></span>Add Category</Link>
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
                                                        Category Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Category Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Category Description
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        Status
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        Action
                                                    </span>
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                catList?.map((brand, index) => {
                                                    return (
                                                        <tr key={brand._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={brand.image ? `${imgUrl}/${brand.image}` : brand} alt='' className='wh-40' />
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
                                                                            onChange={() => toggleCategoryStatus(brand._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/categorydetails/${brand._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/categoryedit/${brand._id}`}>
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

export default CategoryList