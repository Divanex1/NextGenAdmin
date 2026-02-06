import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData, patchData } from "../Services/api";
import { toast } from "react-toastify";

const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    name: "",
    sortname: "",
  });

  useEffect(() => {
    fetchCountries(page);
  }, [page, filters]);

  const fetchCountries = async (pageNumber = 1) => {
    try {
      const query = new URLSearchParams({
        page: pageNumber,
        limit,
        ...filters,
      }).toString();

      const res = await getData(`/admin/countries/filter-with-pagination?${query}`);
      setCountries(res.data || []);
      setTotal(res.total || 0);
    } catch (error) {
      console.error("Error fetching countries:", error);
      toast.error("Failed to fetch countries");
    }
  };

  // Toggle Country Active/Inactive
  const toggleCountryStatus = async (countryId) => {
    try {
      const response = await patchData(`/admin/countries/${countryId}`);
      if (response.status) {
        toast.success("Country status updated");
        fetchCountries(page);
      } else {
        toast.error(response.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating country status:", error);
      toast.error("Error updating country status");
    }
  };

  // Delete Country
  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`/admin/countries/${id}`);
      if (response) {
        toast.success("Country deleted successfully");
        fetchCountries(page);
      } else {
        toast.error("Failed to delete country");
      }
    } catch (error) {
      console.error("Delete API error:", error);
      toast.error("Error deleting country");
    }
  };

  // Pagination helpers
  const totalPages = Math.ceil(total / limit);
  const handlePrev = () => setPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setPage((prev) => Math.min(prev + 1, totalPages));

  // Handle filter input change
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
        <h4 className="text-capitalize breadcrumb-title">Country List</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Country List</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>Country List</h5>
          <Link className="btn btn-primary" to="/addcountry">Add Country</Link>
        </div>

        {/* Filters */}
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-6">
              <input
                type="text"
                name="name"
                className="form-control"
                placeholder="Search Country Name"
                value={filters.name}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                name="sortname"
                className="form-control"
                placeholder="Search Sort Name"
                value={filters.sortname}
                onChange={handleFilterChange}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table mb-0 table-borderless">
              <thead>
                <tr>
                  <th>S.No.</th>
                  <th>Country Name</th>
                  <th>Sort Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {countries.length ? (
                  countries.map((country, index) => (
                    <tr key={country._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{country.name}</td>
                      <td>{country.sortname}</td>
                      <td>
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                          {/* <li>
                            <Link to={`/countrydetails/${country._id}`} className="view">
                              <i className="uil uil-eye" />
                            </Link>
                          </li> */}
                          <li>
                            <Link to={`/countryedit/${country._id}`} className="edit">
                              <i className="uil uil-edit" />
                            </Link>
                          </li>
                          <li>
                            <button className="remove btn p-0" onClick={() => handleDelete(country._id)}>
                              <i className="uil uil-trash-alt" />
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center">No countries found</td>
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

export default CountryList;
