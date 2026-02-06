import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getData, putData } from "../Services/api";
import { toast } from "react-toastify";

const VendorEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

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
    },
  });

  const [loading, setLoading] = useState(false);

  // Fetch vendor, countries on mount
  useEffect(() => {
    fetchVendorDetails();
    fetchCountries();
  }, [id]);

  // Fetch countries
  const fetchCountries = async () => {
    try {
      const res = await getData("/admin/countries");
      setCountries(res);
    } catch (err) {
      console.error("Error fetching countries", err);
    }
  };

  // Fetch states by country
  const fetchStates = async (countryId) => {
    try {
      const res = await getData(`/admin/states?countryId=${countryId}`);
      setStates(res);
    } catch (err) {
      console.error("Error fetching states", err);
    }
  };

  // Fetch cities by state
  const fetchCities = async (stateId) => {
    try {
      const res = await getData(`/admin/cities?stateId=${stateId}`);
      setCities(res);
    } catch (err) {
      console.error("Error fetching cities", err);
    }
  };

  // Fetch vendor details
  const fetchVendorDetails = async () => {
  const response = await getData(`/admin/vendor-view/${id}`);
  const data = response.data;

  setFormData({
    business_email: data.vender_details?.business_email || "",
    business_mobile_number: data.vender_details?.business_mobile_number || "",
    business_name: data.vender_details?.business_name || "",
    address: data.vender_details?.address || "",
    GST_number: data.vender_details?.GST_number || "",
    brand: data.vender_details?.brand || "",
    dealer_code: data.vender_details?.dealer_code || "",
    country: data.vender_details?.country || "",
    state: data.vender_details?.state || "",
    city: data.vender_details?.city || "",
    isVendorActive: data.isVendorActive || false,
    personal_details: {
      first_name: data.first_name || "",
      last_name: data.last_name || "",
      email: data.email || "",
      gender: data.gender || "",
      country_code: data.country_code || "",
      mobile_number: data.mobile_number || "",
      pinCode: data.pinCode || "",
      address: data.address || "",
    },
  });

  // 🔥 map name → id
  const countryObj = countries.find(c => c.name === data.vender_details?.country);
  if (countryObj) {
    await fetchStates(countryObj._id);

    const stateObj = states.find(s => s.name === data.vender_details?.state);
    if (stateObj) {
      fetchCities(stateObj._id);
    }
  }
};


  // Handle form changes
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

  setFormData(prev => ({
    ...prev,
    [name]: value,
    ...(name === "country" && { state: "", city: "" }),
    ...(name === "state" && { city: "" })
  }));

  // 🔥 API calls with ID
  if (name === "country") {
    fetchStates(selectedId);
    setCities([]);
  }

  if (name === "state") {
    fetchCities(selectedId);
  }
};


  // Submit updated vendor
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await putData(`/admin/vendor-update/${id}`, formData);
      if (res.state) {
        toast.success("Vendor updated successfully");
        // navigate("/vendorlist");
      } else {
        toast.error(res.message || "Update failed");
      }
    } catch (error) {
      console.error("Error updating vendor", error);
      toast.error("Error updating vendor");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="container-fluid">
        <div className="breadcrumb-main">
          <h4 className="breadcrumb-title">Edit Vendor</h4>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item"><Link to="/">Home</Link></li>
              <li className="breadcrumb-item active" aria-current="page">Vendor Edit</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="container-fluid">
        <form onSubmit={handleSubmit}>
          <div className="row">

            {/* BUSINESS DETAILS */}
            <div className="col-lg-4 mb-3">
              <label>Business Email</label>
              <input type="email" className="form-control" name="business_email" value={formData.business_email} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Business Mobile</label>
              <input type="text" className="form-control" name="business_mobile_number" value={formData.business_mobile_number} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Business Name</label>
              <input type="text" className="form-control" name="business_name" value={formData.business_name} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Brand</label>
              <input type="text" className="form-control" name="brand" value={formData.brand} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Dealer Code</label>
              <input type="text" className="form-control" name="dealer_code" value={formData.dealer_code} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>GST Number</label>
              <input type="text" className="form-control" name="GST_number" value={formData.GST_number} onChange={handleChange} />
            </div>

            {/* PERSONAL DETAILS */}
            <div className="col-lg-4 mb-3">
              <label>First Name</label>
              <input type="text" className="form-control" name="personal_details.first_name" value={formData.personal_details.first_name} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Last Name</label>
              <input type="text" className="form-control" name="personal_details.last_name" value={formData.personal_details.last_name} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Email</label>
              <input type="email" className="form-control" name="personal_details.email" value={formData.personal_details.email} onChange={handleChange} />
            </div>


            <div className="col-lg-4 mb-3">
            <label>Country Code</label>
            <input type="text" className="form-control" placeholder="Country Code" name="personal_details.country_code" value={formData.personal_details.country_code} onChange={handleChange} required />
          </div>
          

            <div className="col-lg-4 mb-3">
              <label>Mobile</label>
              <input type="text" className="form-control" name="personal_details.mobile_number" value={formData.personal_details.mobile_number} onChange={handleChange} />
            </div>

            <div className="col-lg-4 mb-3">
              <label>Gender</label>
              <select className="form-select" name="personal_details.gender" value={formData.personal_details.gender} onChange={handleChange}>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label>Pin Code</label>
              <input type="text" className="form-control" name="personal_details.pinCode" value={formData.personal_details.pinCode} onChange={handleChange} />
            </div>

            <div className="col-lg-6 mb-3">
              <label>Address</label>
              <input type="text" className="form-control" name="personal_details.address" value={formData.personal_details.address} onChange={handleChange} />
            </div>

            {/* COUNTRY STATE CITY */}
            <div className="col-lg-4 mb-3">
              <label>Country</label>
              <select className="form-select" name="country" value={formData.country} onChange={handleChange}>
                <option value="">Select Country</option>
                {countries.map((c) => (
                  <option key={c._id} value={c.name} data-id={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label>State</label>
              <select className="form-select" name="state" value={formData.state} onChange={handleChange}>
                <option value="">Select State</option>
                {states.map((s) => (
                  <option key={s._id} value={s.name} data-id={s._id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div className="col-lg-4 mb-3">
              <label>City</label>
              <select className="form-select" name="city" value={formData.city} onChange={handleChange}>
                <option value="">Select City</option>
                {cities.map((c) => (
                  <option key={c._id} value={c.name} data-id={c._id}>{c.name}</option>
                ))}
              </select>
            </div>

            {/* STATUS */}
            <div className="col-lg-4 mb-3">
              <label>Status</label>
              <select className="form-select" name="isVendorActive" value={formData.isVendorActive} onChange={handleChange}>
                <option value="">Select Status</option>
                <option value={true}>Active</option>
                <option value={false}>Inactive</option>
              </select>
            </div>

            <div className="col-lg-12">
              <button type="submit" disabled={loading} className="btn btn-primary">
                {loading ? "Updating..." : "Update Vendor"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default VendorEdit;
