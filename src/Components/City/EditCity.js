import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../Services/api";
import { toast } from "react-toastify";

const EditCity = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country_id: "",
    state_id: ""
  });

  useEffect(() => {
    fetchCountries();
    fetchCity();
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
      const res = await getData(`/admin/states?countryId=${countryId}`);
      setStates(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCity = async () => {
    try {
      const res = await getData(`/admin/cities/${id}`);
      setFormData({
        name: res.name,
        country_id: res.country_id,
        state_id: res.state_id
      });
      if (res.country_id) fetchStates(res.country_id);
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch city");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
      ...(name === "country_id" ? { state_id: "" } : {}) // reset state if country changes
    }));
    if (name === "country_id") {
      fetchStates(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await putData(`/admin/cities/${id}`, formData);
      if (res) {
        toast.success("City updated successfully");
        navigate("/city");
      } else {
        toast.error(res.message || "Failed to update city");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating city");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Edit City</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>City Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Country</label>
          <select className="form-control" name="country_id" value={formData.country_id} onChange={handleChange}>
            <option value="">Select Country</option>
            {countries.map(c => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>State</label>
          <select className="form-control" name="state_id" value={formData.state_id} onChange={handleChange} disabled={!formData.country_id}>
            <option value="">Select State</option>
            {states.map(s => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-primary">Update City</button>
      </form>
    </div>
  );
};

export default EditCity;
