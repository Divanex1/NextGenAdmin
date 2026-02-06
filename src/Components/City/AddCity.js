import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../Services/api";
import { toast } from "react-toastify";

const AddCity = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country_id: "",
    state_id: ""
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await getData("/admin/countries");
      setCountries(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchStates = async (countryId) => {
    try {
      if (!countryId) {
        setStates([]);
        return;
      }
      const res = await getData(`/admin/states?countryId=${countryId}&limit=1000`);
      // If your API supports filtering by countryId, it will return states for that country
      setStates(res || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Update form data
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "country_id" ? { state_id: "" } : {}) // reset state if country changes
    }));

    // Fetch states if country changed
    if (name === "country_id") {
      fetchStates(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.country_id || !formData.state_id) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await postData("/admin/cities", formData);
      if (response) {
        toast.success("City added successfully");
        navigate("/city");
      } else {
        toast.error(response.message || "Failed to add city");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding city");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Add City</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>City Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label>Country</label>
          <select
            className="form-control"
            name="country_id"
            value={formData.country_id}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>State</label>
          <select
            className="form-control"
            name="state_id"
            value={formData.state_id}
            onChange={handleChange}
            disabled={!formData.country_id} // Disable until a country is selected
          >
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Add City</button>
      </form>
    </div>
  );
};

export default AddCity;
