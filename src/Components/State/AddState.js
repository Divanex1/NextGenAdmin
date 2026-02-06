import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getData, postData } from "../Services/api";
import { toast } from "react-toastify";

const AddState = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    country_id: ""
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
      const response = await postData("/admin/states", formData);
      if (response) {
        toast.success("State added successfully");
        navigate("/state");
      } else {
        toast.error(response.message || "Failed to add state");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding state");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Add State</h4>
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
        <button type="submit" className="btn btn-primary">Add State</button>
      </form>
    </div>
  );
};

export default AddState;
