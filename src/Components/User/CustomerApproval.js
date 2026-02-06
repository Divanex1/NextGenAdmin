import React, { useEffect, useState } from 'react'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { Link } from 'react-router-dom'
import user1 from '../../assets/img/team-1.png'
import { toast } from 'react-toastify';
const CustomerApproval = () => {
    const [vendorList, setVendorList] = useState([]);

    useEffect(() => {
        fetchVendors();
    }, []);


    // Fetch Api
    const fetchVendors = async () => {
        try {
            const res = await getData('/admin/status-pending-vendor-list');
            console.log(res)
            setVendorList(res.data.vendor)
        } catch (error) {
            console.log("error Fetch Vendor", error)
        }
    }

    // Toggle Vendor Active/Inactive Status
    const toggleVendorStatus = async (vendorId) => {
        try {
            const response = await patchData(`/admin/vendor-active/${vendorId}`);
            console.log(response)
            if (response.status) {
                toast.dismiss();
                toast.success(`Vendor Status Changed Successfully`);
                fetchVendors();
            } else {
                toast.error(response.message || "Failed to update status");
                // fetchVendors();
            }
        } catch (error) {
            toast.error("Error updating vendor status");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/vendor-delete/${id}`);
            console.log(response)
            if (response.status) {
                toast.success("Vendor Deleted Successfully")
                fetchVendors();
            } else {
                toast.error("Error Vendor Delete")
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
                            <h4 className="text-capitalize breadcrumb-title">Customer Request List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Customer Request List</li>
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
                            <h5>Customer Request List</h5>
                            {/* <Link className="btn btn-primary" to="/addvendor"><span className="uil uil-plus"></span>Add Vendor</Link> */}
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
                                                         Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                         Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                         Number
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                         Email
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Country
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        State
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        City
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Pin Code
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
                                                vendorList.map((vendor, index) => {
                                                    return (
                                                        <tr key={vendor._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={vendor.profile_img ? `${imgUrl}/${vendor.profile_img}` : user1} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor.first_name} {vendor.last_name}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor.mobile_number}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor.email}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                   {vendor?.vender_details?.country}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                   {vendor?.vender_details?.state}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                 {vendor?.vender_details?.city}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor?.vender_details?.pinCode || '123456'}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                {vendor.status}
                                                                {/* <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${vendor._id}`}
                                                                            checked={vendor.isVendorActive}
                                                                            onChange={() => toggleVendorStatus(vendor._id,)}
                                                                        />
                                                                    </div>
                                                                </div> */}
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/vendordetails/${vendor._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/vendoredit/${vendor._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(vendor._id)}>
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

export default CustomerApproval;