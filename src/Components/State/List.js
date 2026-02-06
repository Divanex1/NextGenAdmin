import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../Services/api";
import { toast } from "react-toastify";

const StateList = () => {
  const [states, setStates] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filters
  const [filters, setFilters] = useState({
    stateName: "",
    countryName: "",
  });

  useEffect(() => {
    fetchStates(page);
  }, [page, filters]);

  const fetchStates = async (pageNumber = 1) => {
    try {
      const query = new URLSearchParams({
        page: pageNumber,
        limit,
        ...filters,
      }).toString();

      const res = await getData(`/admin/states/filter-with-pagination?${query}`);
      setStates(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error("Error fetching states:", error);
      toast.error("Failed to fetch states");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`/admin/states/${id}`);
      if (response) {
        toast.success("State deleted successfully");
        fetchStates(page);
      } else {
        toast.error("Failed to delete state");
      }
    } catch (error) {
      console.error("Delete API error:", error);
      toast.error("Error deleting state");
    }
  };

  // Pagination helpers
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // Handle filter change
  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
    setPage(1); // Reset to first page when filters change
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-main">
        <h4 className="text-capitalize breadcrumb-title">State List</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">State List</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>State List</h5>
          <Link className="btn btn-primary" to="/addstate">Add State</Link>
        </div>

        {/* Filters */}
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="stateName"
                className="form-control"
                placeholder="Search State Name"
                value={filters.stateName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="countryName"
                className="form-control"
                placeholder="Search Country Name"
                value={filters.countryName}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table mb-0 table-borderless">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>State Name</th>
                  <th>Country Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {states.length ? (
                  states.map((state, index) => (
                    <tr key={state._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{state.name}</td>
                      <td>{state.country_name || "-"}</td>
                      <td>
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                          {/* <li>
                            <Link to={`/statedetails/${state._id}`} className="view">
                              <i className="uil uil-eye" />
                            </Link>
                          </li> */}
                          <li>
                            <Link to={`/stateedit/${state._id}`} className="edit">
                              <i className="uil uil-edit" />
                            </Link>
                          </li>
                          <li>
                            <button className="remove btn p-0" onClick={() => handleDelete(state._id)}>
                              <i className="uil uil-trash-alt" />
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No states found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center mt-3">
              <button className="btn btn-secondary" onClick={handlePrev} disabled={page === 1}>
                Prev
              </button>
              <span>Page {page} of {totalPages}</span>
              <button className="btn btn-secondary" onClick={handleNext} disabled={page === totalPages}>
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StateList;
