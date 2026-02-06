import React, { useEffect, useState } from "react";
import { deleteData, getData, imgUrl, patchData, putData } from "../Services/api";
import { Link } from "react-router-dom";
import user1 from "../../assets/img/team-1.png";
import { toast } from "react-toastify";

const VendorList = () => {
  const [vendorList, setVendorList] = useState([]);
  const [filters, setFilters] = useState({ name: "", country: "", state: "", city: "", status: "" });
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchVendors();
  }, [page, filters]);

  // Fetch API with pagination & filters
  const fetchVendors = async () => {
    try {
      let query = `?page=${page}`;
      Object.keys(filters).forEach(key => {
        if (filters[key]) query += `&${key}=${filters[key]}`;
      });

      const res = await getData(`/admin/vendor-list${query}`);
      setVendorList(res.data.vendor);
      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.error("error Fetch Vendor", error);
    }
  };

  // Handle filter change
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
    setPage(1); // Reset to first page on filter change
  };

  // Toggle Vendor Active/Inactive
  const toggleVendorStatus = async (vendorId) => {
    try {
      const response = await patchData(`/admin/vendor-active/${vendorId}`);
      if (response.status) {
        toast.dismiss();
        toast.success("Vendor Status Changed Successfully");
        fetchVendors();
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      toast.error("Error updating vendor status");
    }
  };

  // Delete Vendor
  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`/admin/vendor-delete/${id}`);
      if (response.status) {
        toast.success("Vendor Deleted Successfully");
        fetchVendors();
      } else {
        toast.error("Error Vendor Delete");
      }
    } catch (error) {
      console.error("delete api error", error);
    }
  };

  // Update Vendor Approval Status
  const handleStatusChange = async (vendorId, newStatus) => {
    try {
      const response = await putData(`/admin/vendor-status-change/${vendorId}`, { status: newStatus });
      if (response.status) {
        toast.success("Vendor status updated successfully");
        fetchVendors();
      } else {
        toast.error(response.message || "Failed to update vendor status");
      }
    } catch (error) {
      toast.error("Error updating vendor status");
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="breadcrumb-main">
          <h4 className="text-capitalize breadcrumb-title">Vendor List</h4>
          <div className="breadcrumb-action justify-content-center flex-wrap">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                <li className="breadcrumb-item active" aria-current="page">Vendor List</li>
              </ol>
            </nav>
          </div>
        </div>

        {/* Filters */}
        <div className="row mb-3">
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Vendor Name" name="name" value={filters.name} onChange={handleFilterChange} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="Country" name="country" value={filters.country} onChange={handleFilterChange} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="State" name="state" value={filters.state} onChange={handleFilterChange} />
          </div>
          <div className="col-md-2">
            <input type="text" className="form-control" placeholder="City" name="city" value={filters.city} onChange={handleFilterChange} />
          </div>
          <div className="col-md-2">
            <select className="form-control" name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="suspend">Suspend</option>
              <option value="approve">Approved</option>
            </select>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-header d-flex justify-content-between align-items-center">
                <h5>Vendor List</h5>
                <Link className="btn btn-primary" to="/addvendor"><span className="uil uil-plus"></span>Add Vendor</Link>
              </div>
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table mb-0 table-borderless">
                    <thead>
                      <tr>
                        <th>S.No.</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Number</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>State</th>
                        <th>City</th>
                        <th>Pin Code</th>
                        <th>Active/Inactive</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vendorList?.map((vendor, index) => (
                        <tr key={vendor._id}>
                          <td>{index + 1}</td>
                          <td><img src={vendor.profile_img ? `${imgUrl}/${vendor.profile_img}` : user1} alt='' className='wh-40' /></td>
                          <td>{vendor.first_name} {vendor.last_name}</td>
                          <td>{vendor.mobile_number}</td>
                          <td>{vendor.email}</td>
                          <td>{vendor?.vender_details?.country}</td>
                          <td>{vendor?.vender_details?.state}</td>
                          <td>{vendor?.vender_details?.city}</td>
                          <td>{vendor?.vender_details?.pinCode || '123456'}</td>
                          <td>
                            <div className="form-check form-switch">
                              <input className="form-check-input" type="checkbox" checked={vendor.isVendorActive} onChange={() => toggleVendorStatus(vendor._id)} />
                            </div>
                          </td>
                          <td>
                            <select value={vendor.status} onChange={(e) => handleStatusChange(vendor._id, e.target.value)}>
                              <option value="pending">Pending</option>
                              <option value="suspend">Suspend</option>
                              <option value="approve">Approved</option>
                            </select>
                          </td>
                          <td>
                            <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                              <li><Link className="view" to={`/vendordetails/${vendor._id}`}><i className="uil uil-eye" /></Link></li>
                              <li><Link className="edit" to={`/vendoredit/${vendor._id}`}><i className="uil uil-edit" /></Link></li>
                              <li><a className="remove" onClick={() => handleDelete(vendor._id)}><i className="uil uil-trash-alt" /></a></li>
                            </ul>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Pagination */}
                  <div className="d-flex justify-content-between mt-3">
                    <button className="btn btn-secondary" disabled={page <= 1} onClick={() => setPage(prev => prev - 1)}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button className="btn btn-secondary" disabled={page >= totalPages} onClick={() => setPage(prev => prev + 1)}>Next</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default VendorList;
