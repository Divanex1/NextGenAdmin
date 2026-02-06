import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { toast } from 'react-toastify';

function StaffList() {
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        fetchBanners();
    }, []);


    // Fetch Api
    const fetchBanners = async () => {
        try {
            const res = await getData('/admin/staff-list');
            console.log(res.data)
            setBannerList(res.data.vendor)
        } catch (error) {
            console.log("error Fetch Banner", error)
        }
    }

    // // Toggle Banner Active/Inactive Status
    // const toggleBannerStatus = async (brandId) => {
    //     try {
    //         const response = await patchData(`/admin/banners/${brandId}`);
    //         if (response.status) {
    //             toast.dismiss();
    //             toast.success(`Banner Status Changed Successfully`);
    //             fetchBanners();
    //         } else {
    //             toast.error(response.message || "Failed to update status");
    //         }
    //     } catch (error) {
    //         toast.error("Error updating Banner status");
    //         console.error("Error:", error);
    //     }
    // };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/banners/${id}`);
            if (response.status) {
                toast.success("Banner Deleted Successfully")
                fetchBanners();
            } else {
                toast.error("Error Banner Delete")
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
                            <h4 className="text-capitalize breadcrumb-title">Staff List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Staff List</li>
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
                            <h5>Staff List</h5>
                            <Link className="btn btn-primary" to="/addstaff"><span className="uil uil-plus"></span>Add Staff</Link>
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
                                                        staff Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Name
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Mobile
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="userDatatable-title float-end">
                                                        Email
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
                                                bannerList.map((banner, index) => {
                                                    return (
                                                        <tr key={banner._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={`${imgUrl}/${banner.profile_img}`} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {banner.first_name}
                                                                </div>
                                                            </td>
                                                           
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {banner.mobile_number}
                                                                </div>
                                                            </td>
                                                             <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {banner.email}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    {/* <li>
                                                                        <Link className="view" to={`/bannerdetails/${banner._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/banneredit/${banner._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li> */}
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(banner._id)}>
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

export default StaffList