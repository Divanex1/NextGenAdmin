import React, { useEffect, useState } from 'react'
import { deleteData, getData } from '../Services/api';
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
const UserComplaints = () => {
    const [compList, setCompList] = useState([]);

    useEffect(() => {
        fetchVendorComplaints();
    }, []);

  
    // Fetch Api
    const fetchVendorComplaints = async () => {
        try {
            const res = await getData('/complaint/user-complaint/list');
            setCompList(res.data)
        } catch (error) {
            console.log("error Fetch Vendor", error)
        }
    }

    const handleDelete = async(id) =>{
        try {
            const response =  await deleteData(`/complaint/${id}`);
            if (response.status) {
                toast.success("Complaint Deleted Successfully")
                fetchVendorComplaints();
            }else{
                toast.error("Error Vendor Delete")
            }
        } catch (error) {
          console.log("delete api error",error)  
        }
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="breadcrumb-main">
                            <h4 className="text-capitalize breadcrumb-title">User Complaint List</h4>
                            <div className="breadcrumb-action justify-content-center flex-wrap">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                                        <li className="breadcrumb-item active" aria-current="page">User Complaint List</li>
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
                        <div className="card-body">
                            <div className="userDatatable global-shadow border-light-0 p-30 bg-white radius-xl w-100 mb-30">
                                <div className="table-responsive">
                                    <table className="table mb-0 table-borderless">
                                        <thead>
                                            <tr className="userDatatable-header">
                                                <th><span className="userDatatable-title">S.No.</span></th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Vendor Image
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Title
                                                    </span>
                                                </th>
                                                <th>
                                                    <span className="checkbox-text userDatatable-title">
                                                        Dedcription
                                                    </span>
                                                </th>                                            
                                                <th>
                                                    <span className="userDatatable-title">
                                                        Email
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
                                                compList?.map((vendor, index) => {
                                                    return (
                                                        <tr key={vendor._id}>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {index + 1}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    <img src={vendor.image} alt='' className='wh-40' />
                                                                </div>
                                                            </td>
                                                          
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor.title}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor.description}
                                                                </div>
                                                            </td>
                                                            <td>
                                                                <div className="userDatatable-inline-title">
                                                                    {vendor?.user_id?.email}
                                                                </div>
                                                            </td>                                                          
                                                            <td>
                                                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                                                    <li>
                                                                        <Link className="view" to={`/complaintdetails/${vendor._id}`}>
                                                                            <i className="uil uil-eye" />
                                                                        </Link>
                                                                    </li>
                                                                    <li>
                                                                        <a className="remove" onClick={()=>handleDelete(vendor._id)}>
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

export default UserComplaints;