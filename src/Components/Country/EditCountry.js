import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../Services/api";
import { toast } from "react-toastify";

const EditCountry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    sortname: ""
  });

  useEffect(() => {
    fetchCountry();
  }, []);

  const fetchCountry = async () => {
    try {
      const res = await getData(`/admin/countries/${id}`);
      setFormData({
        name: res.name,
        sortname: res.sortname
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to fetch country");
    }
  };

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
      const res = await putData(`/admin/countries/${id}`, formData);
      if (res) {
        toast.success("Country updated successfully");
        navigate("/country");
      } else {
        toast.error(res.message || "Failed to update country");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error updating country");
    }
  };

  return (
    <div className="container-fluid">
      <h4>Edit Country</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Country Name</label>
          <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
        </div>
        <div className="mb-3">
          <label>Sort Name</label>
          <input type="text" className="form-control" name="sortname" value={formData.sortname} onChange={handleChange} />
        </div>
        <button type="submit" className="btn btn-primary">Update Country</button>
      </form>
    </div>
  );
};

export default EditCountry;
