import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postData } from "../Services/api";
import { toast } from "react-toastify";

const AddCountry = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    sortname: ""
  });

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.sortname) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      const response = await postData("/admin/countries", formData);
      if (response) {
        toast.success("Country added successfully");
        navigate("/country");
      } else {
        toast.error(response.message || "Failed to add country");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error adding country");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Add Country</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Country Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Sort Name</label>
          <input type="text" className="form-control" name="sortname" value={formData.sortname} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Add Country</button>
      </form>
    </div>
  );
};

export default AddCountry;
