import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData, imgUrl, patchData } from '../Services/api';
import { toast } from 'react-toastify';

function BikeList() {
    const [bikeList, setBikeList] = useState([]);

    useEffect(() => {
        fetchBikes();
    }, []);


    // Fetch Api
    const fetchBikes = async () => {
        try {
            const res = await getData('/admin/bikes');
            console.log(res.data)
            setBikeList(res.data.bikeListData)
        } catch (error) {
            console.log("error Fetch Banner", error)
        }
    }

    // Toggle Bike Active/Inactive Status
    const toggleBikeStatus = async (brandId) => {
        try {
            const response = await patchData(`/admin/bikes/${brandId}`);
            if (response.status) {
                toast.dismiss();
                toast.success(`Bike Status Changed Successfully`);
                fetchBikes();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Error updating Bike status");
            console.error("Error:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            const response = await deleteData(`/admin/bikes/${id}`);
            if (response.status) {
                toast.success("Bike Deleted Successfully")
                fetchBikes();
            } else {
                toast.error("Error Bike Delete")
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
                            <h4 className="text-capitalize breadcrumb-title">Bike List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">Bike List</li>
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
                            <Link className="btn btn-primary" to="/addbike"><span className="uil uil-plus"></span>Add Bike</Link>
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
                                                        Make
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Models
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Vehicale Type
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
                                                bikeList.map((bike, index) => {
                                                    return (
                                                        <tr key={bike._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {bike.make}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {bike?.model?.map((model, index) => {
                                                                        return (
                                                                            <p key={index}>{model}</p>
                                                                        )
                                                                    })}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {bike.vehicaleType}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="orderDatatable-status">
                                                                    <div className="form-check form-switch">
                                                                        <input className="form-check-input"
                                                                            type="checkbox"
                                                                            id={`status-${bike._id}`}
                                                                            checked={bike.status}
                                                                            onChange={() => toggleBikeStatus(bike._id)}
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/bikedetails/${bike._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <Link className="edit" to={`/bikeedit/${bike._id}`}>
                                                                            <i className="uil uil-edit" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={() => handleDelete(bike._id)}>
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

export default BikeList