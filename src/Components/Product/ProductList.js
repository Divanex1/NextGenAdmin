import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData, imgUrl, patchData } from '../Services/api'
import { toast } from 'react-toastify'

function ProductList() {
    const [productList, setProductList] = useState();

    useEffect(() => {
        fetchProducts();
    }, [])

    // Get Products Api
    const fetchProducts = async () => {
        try {
            const res = await getData('/admin/products')
            setProductList(res.data.productListData)
        } catch (error) {
            console.log("error fetch products", error)
        }
    }

    // Toggle Product Active/Inactive Status
    const toggleProductStatus = async (productId) => {
        try {
            const response = await patchData(`/admin/products/${productId}`);
            if (response.status) {
                toast.dismiss();
                toast.success(`Product Status Changed Successfully`);
                fetchProducts();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating Product status");
            console.error("Error:", error);
        }
    };


    // Product Delete Api
    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/products/${id}`);
            if (response.status) {
                toast.success("Product Deleted Successfully")
                fetchProducts();
            } else {
                toast.error("Error Product Delete")
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
                            <h4 className="text-capitalize breadcrumb-title">Product List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-home"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Product List</li>
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
                            <h5>Product List</h5>
                            <Link className="btn btn-primary" to="/addproduct"><span className="uil uil-plus"></span>Add Product</Link>
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
                                                        Product Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Product Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Price
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Quantity
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
                                                productList?.map((product, index) => {
                                                    return (
                                                        <tr key={product._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={`${imgUrl}/${product.product_image[0]}`} alt='product1' className='wh-40' />
                                                                    {/* <img src={product1} alt='product1' className='wh-40' /> */}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {product.name}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    Price : {product.price} INR
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    Qty : {product.quanity}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${product._id}`}
                                                                            checked={product.status}
                                                                            onChange={() => toggleProductStatus(product._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/productdetails/${product._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/productedit/${product._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(product._id)}>
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

export default ProductList