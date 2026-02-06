import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { toast } from 'react-toastify';

function BannerList() {
    const [bannerList, setBannerList] = useState([]);

    useEffect(() => {
        fetchBanners();
    }, []);


    // Fetch Api
    const fetchBanners = async () => {
        try {
            const res = await getData('/admin/banners');
            console.log(res.data)
            setBannerList(res.data)
        } catch (error) {
            console.log("error Fetch Banner", error)
        }
    }

    // Toggle Banner Active/Inactive Status
    const toggleBannerStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/banners/${brandId}`);
            if (response.status) {
                toast.dismiss();
                toast.success(`Banner Status Changed Successfully`);
                fetchBanners();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating Banner status");
            console.error("Error:", error);
        }
    };

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
                            <h4 className="text-capitalize breadcrumb-title">Banner List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Banner List</li>
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
                            <h5>Banner List</h5>
                            <Link className="btn btn-primary" to="/addbanner"><span className="uil uil-plus"></span>Add Banner</Link>
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
                                                        Banner Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Title
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Link
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
                                                                    <img src={`${imgUrl}/${banner.image}`} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {banner.title}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {banner.link}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${banner._id}`}
                                                                            checked={banner.status}
                                                                            onChange={() => toggleBannerStatus(banner._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/bannerdetails/${banner._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/banneredit/${banner._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
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

export default BannerList