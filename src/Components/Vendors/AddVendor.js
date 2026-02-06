import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getData, postData } from '../Services/api';
import { toast } from 'react-toastify';

const AddVendor = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    business_email: "",
    business_mobile_number: "",
    business_name: "",
    address: "",
    GST_number: "",
    brand: "",
    dealer_code: "",
    country: "",
    state: "",
    city: "",
    isVendorActive: false,
    personal_details: {
      first_name: "",
      last_name: "",
      email: "",
      gender: "",
      country_code: "",
      mobile_number: "",
      pinCode: "",
      address: "",
    }
  });

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch all countries
  const fetchCountries = async () => {
    try {
      const res = await getData('/admin/countries'); 
      setCountries(res);
    } catch (error) {
      console.error("Error fetching countries", error);
    }
  };

  // Fetch states based on selected country
  const fetchStates = async (countryId) => {
    if (!countryId) return setStates([]);
    try {
      const res = await getData(`/admin/states?countryId=${countryId}`);
      setStates(res);
    } catch (error) {
      console.error("Error fetching states", error);
    }
  };

  // Fetch cities based on selected state
  const fetchCities = async (stateId) => {
    if (!stateId) return setCities([]);
    try {
      const res = await getData(`/admin/cities?stateId=${stateId}`);
      setCities(res);
    } catch (error) {
      console.error("Error fetching cities", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
  const { name, value } = e.target;
  const selectedOption = e.target.selectedOptions?.[0];
  const selectedId = selectedOption?.dataset?.id;

  if (name.includes("personal_details.")) {
    const key = name.split(".")[1];
    setFormData(prev => ({
      ...prev,
      personal_details: { ...prev.personal_details, [key]: value }
    }));
    return;
  }

  // Store name in formData
  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === "country" && { state: "", city: "" }),
    ...(name === "state" && { city: "" })
  }));

  // 🔥 Use ID for API calls
  if (name === "country") {
    fetchStates(selectedId);   // ✅ countryId
    setCities([]);
  }

  if (name === "state") {
    fetchCities(selectedId);   // ✅ stateId
  }
};


  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await postData('/admin/vendor-store', formData);
      if (response.state) {
        toast.success("Vendor added successfully");
        navigate('/vendorlist');
      } else {
        toast.error(response.message || "Failed to add vendor");
      }
    } catch (error) {
      console.error("Error adding vendor", error);
      toast.error("Error adding vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div className="breadcrumb-main">
        <h4 className="breadcrumb-title">Add Vendor</h4>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Add Vendor</li>
          </ol>
        </nav>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row">

          {/* Business Info */}
          <div className="col-lg-4 mb-3">
            <label>Business Email</label>
            <input type="email" className="form-control" placeholder="Enter Business Email" name="business_email" value={formData.business_email} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Business Mobile Number</label>
            <input type="text" className="form-control" placeholder="Enter Mobile Number" name="business_mobile_number" value={formData.business_mobile_number} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Business Name</label>
            <input type="text" className="form-control" placeholder="Enter Business Name" name="business_name" value={formData.business_name} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Enter Address" name="address" value={formData.address} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Brand</label>
            <input type="text" className="form-control" placeholder="Enter Brand" name="brand" value={formData.brand} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Dealer Code</label>
            <input type="text" className="form-control" placeholder="Enter Dealer Code" name="dealer_code" value={formData.dealer_code} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>GST Number</label>
            <input type="text" className="form-control" placeholder="Enter GST Number" name="GST_number" value={formData.GST_number} onChange={handleChange} required />
          </div>

          {/* Personal Info */}
          <div className="col-lg-4 mb-3">
            <label>First Name</label>
            <input type="text" className="form-control" placeholder="First Name" name="personal_details.first_name" value={formData.personal_details.first_name} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Last Name</label>
            <input type="text" className="form-control" placeholder="Last Name" name="personal_details.last_name" value={formData.personal_details.last_name} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Email</label>
            <input type="email" className="form-control" placeholder="Email" name="personal_details.email" value={formData.personal_details.email} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Country Code</label>
            <input type="text" className="form-control" placeholder="Country Code" name="personal_details.country_code" value={formData.personal_details.country_code} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Mobile Number</label>
            <input type="text" className="form-control" placeholder="Mobile Number" name="personal_details.mobile_number" value={formData.personal_details.mobile_number} onChange={handleChange} required />
          </div>
          <div className="col-lg-4 mb-3">
            <label>Gender</label>
            <select className="form-select" name="personal_details.gender" value={formData.personal_details.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-lg-4 mb-3">
            <label>Pin Code</label>
            <input type="text" className="form-control" placeholder="Enter Pin Code" name="personal_details.pinCode" value={formData.personal_details.pinCode} onChange={handleChange} required />
          </div>
          <div className="col-lg-6 mb-3">
            <label>Address</label>
            <input type="text" className="form-control" placeholder="Enter Address" name="personal_details.address" value={formData.personal_details.address} onChange={handleChange} required />
          </div>

          {/* Location Dropdowns */}
          <div className="col-lg-4 mb-3">
            <label>Country</label>
            <select className="form-select" name="country" value={formData.country} onChange={handleChange} required>
              <option value="">Select Country</option>
              {countries.map(c => <option key={c._id} value={c.name} data-id={c._id} >{c.name}</option>)}
            </select>
          </div>
          <div className="col-lg-4 mb-3">
            <label>State</label>
            <select className="form-select" name="state" value={formData.state} onChange={handleChange} required>
              <option value="">Select State</option>
              {states.map(s => <option key={s._id} value={s.name} data-id={s._id} >{s.name}</option>)}
            </select>
          </div>
          <div className="col-lg-4 mb-3">
            <label>City</label>
            <select className="form-select" name="city" value={formData.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map(c => <option key={c._id} value={c.name} data-id={c._id} >{c.name}</option>)}
            </select>
          </div>

          <div className="col-lg-4 mb-3">
            <label>Status</label>
            <select className="form-select" name="isVendorActive" value={formData.isVendorActive} onChange={handleChange} required>
              <option value="">Select Status</option>
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div>

          <div className="col-lg-12">
            <button type="submit" disabled={loading} className="btn btn-primary">{loading ? "Submitting..." : "Submit"}</button>
          </div>

        </div>
      </form>
    </div>
  );
};

export default AddVendor;
