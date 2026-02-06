import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { deleteData, getData } from "../Services/api";
import { toast } from "react-toastify";

const CityList = () => {
  const [cities, setCities] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);

  // Filter states
  const [filters, setFilters] = useState({
    cityName: "",
    stateName: "",
    countryName: "",
  });

  useEffect(() => {
    fetchCities(page);
  }, [page, filters]);

  const fetchCities = async (pageNumber = 1) => {
    try {
      const query = new URLSearchParams({
        page: pageNumber,
        limit,
        ...filters,
      }).toString();

      const res = await getData(`/admin/cities/filter-with-pagination?${query}`);
      setCities(res.data);
      setTotal(res.total);
    } catch (error) {
      console.error("Error fetching cities:", error);
      toast.error("Failed to fetch cities");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`/admin/cities/${id}`);
      if (response) {
        toast.success("City deleted successfully");
        fetchCities(page);
      } else {
        toast.error("Failed to delete city");
      }
    } catch (error) {
      console.error("Delete API error:", error);
      toast.error("Error deleting city");
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
        <h4 className="text-capitalize breadcrumb-title">City List</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Dashboard</Link></li>
            <li className="breadcrumb-item active" aria-current="page">City List</li>
          </ol>
        </nav>
      </div>

      <div className="card">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h5>City List</h5>
          <Link className="btn btn-primary" to="/addcity">Add City</Link>
        </div>

        {/* Filters */}
        <div className="card-body">
          <div className="row mb-3">
            <div className="col-md-4">
              <input
                type="text"
                name="cityName"
                className="form-control"
                placeholder="Search City"
                value={filters.cityName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="stateName"
                className="form-control"
                placeholder="Search State"
                value={filters.stateName}
                onChange={handleFilterChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                name="countryName"
                className="form-control"
                placeholder="Search Country"
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
                  <th>City Name</th>
                  <th>State Name</th>
                  <th>Country Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cities.length ? (
                  cities.map((city, index) => (
                    <tr key={city._id}>
                      <td>{(page - 1) * limit + index + 1}</td>
                      <td>{city.name}</td>
                      <td>{city.state_name || "-"}</td>
                      <td>{city.country_name || "-"}</td>
                      <td>
                        <ul className="d-flex gap-2 list-unstyled mb-0">
                        
                          <li>
                            <Link to={`/cityedit/${city._id}`} className="edit">
                              <i className="uil uil-edit" />
                            </Link>
                          </li>
                          <li>
                            <button className="remove btn p-0" onClick={() => handleDelete(city._id)}>
                              <i className="uil uil-trash-alt" />
                            </button>
                          </li>
                        </ul>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center">No cities found</td>
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

export default CityList;
