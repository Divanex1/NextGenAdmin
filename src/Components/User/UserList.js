import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import user1 from '../../assets/img/team-1.png'
import { deleteData, getData, imgUrl, patchData, putData } from '../Services/api';
import { toast } from 'react-toastify';

function UserList() {
    const [userList, setUserList] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);


    // Fetch Api
    const fetchUsers = async () => {
        try {
            const res = await getData('/admin/user-list');
            console.log(res)
            setUserList(res.data.users)
        } catch (error) {
            console.log("error Fetch Users", error)
        }
    }

    // Toggle User Active/Inactive Status
    const toggleUserStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/vendor-active/${brandId}`);
            console.log(response)
            if (response.status) {
                toast.dismiss();
                toast.success(`User Status Changed Successfully`);
                fetchUsers();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating User status");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/user-delete/${id}`);
            if (response.status) {
                toast.success("User Deleted Successfully")
                fetchUsers();
            } else {
                toast.error("Error User Delete")
            }
        } catch (error) {
            console.log("delete api error", error)
        }
    }

    // Update Vendor Approval Status (Pending / Suspend / Approve)
    const handleStatusChange = async (vendorId, newStatus) => {
        try {
            const response = await putData(`/admin/vendor-status-change/${vendorId}`, { status: newStatus });
            console.log(response)
            if (response.status) {
                toast.success("user status updated successfully");
                fetchUsers();
            } else {
                toast.error(response.message || "Failed to update vendor status");
            }
        } catch (error) {
            toast.error("Error updating vendor status");
            console.error("Error:", error);
        }
    };

    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">User List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">User List</li>
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
                            <h5>Users List</h5>
                            <Link className="btn btn-primary" to="/adduser"><span className="uil uil-plus"></span>Add User</Link>
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
                                                        User Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        User Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        User Number
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        User Email
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        active/Inactive
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
                                                userList.map((user, index) => {
                                                    return (
                                                        <tr key={user._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={`${imgUrl}/${user.profile_img}`} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {user.first_name}{" "}{user.last_name}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {user.mobile_number}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {user.email}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${user._id}`}
                                                                            checked={user.isVendorActive}
                                                                            onChange={() => toggleUserStatus(user._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>

                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <select
                                                                        // className='form-select'
                                                                        value={user.status}
                                                                        onChange={(e) => handleStatusChange(user._id, e.target.value)}
                                                                    >
                                                                        <option value="pending">Pending</option>
                                                                        <option value="suspend">Suspend</option>
                                                                        <option value="approve">Approved</option>
                                                                    </select>

                                                                </div>
                                                            </td>

                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/userdetails/${user._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/useredit/${user._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(user._id)}>
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

export default UserList