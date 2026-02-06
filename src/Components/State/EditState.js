import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../Services/api";
import { toast } from "react-toastify";

const EditState = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country_id: ""
  });

  useEffect(() => {
    fetchCountries();
    fetchState();
  }, []);

  const fetchCountries = async () => {
    try {
      const res = await getData("/admin/countries");
      setCountries(res);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchState = async () => {
    try {
      const res = await getData(`/admin/states/${id}`);
      setFormData({
        name: res.name,
        country_id: res.country_id
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch state");
    }
  };

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.country_id) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const res = await putData(`/admin/states/${id}`, formData);
      if (res) {
        toast.success("State updated successfully");
        navigate("/state");
      } else {
        toast.error(res.message || "Failed to update state");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating state");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Edit State</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>State Name</label>
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
        <button type="submit" className="btn btn-primary">Update State</button>
      </form>
    </div>
  );
};

export default EditState;
