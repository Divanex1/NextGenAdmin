import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, putData } from '../Services/api';
import { toast } from 'react-toastify';

const ReviewEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    rating: "",
    comment: "",
    avatar: null,
  })

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [preview, setPreview] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevValues => ({
      ...prevValues,
      [name]: value
    }));
  }
  useEffect(() => {
    fetchReviews();
  }, []);


  // Fetch Api
  const fetchReviews = async () => {
    try {
      const res = await getData(`/reviews/${id}`);
      setFormData(res.data)
    } catch (error) {
      console.log("error Fetch Reviews", error)
    }
  }


  // Handle file upload & preview
  const handleFileChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setFormData((prevValues) => ({
        ...prevValues,
        avatar: file,
      }));
      setPreview(URL.createObjectURL(file)); // Create a preview URL
    }
  };
  // Review Edit Api
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const brandData = new FormData();
      brandData.append("name", formData.name);
      brandData.append("rating", formData.rating);
      brandData.append("comment", formData.comment);
      brandData.append("avatar", formData.avatar);
      const res = await putData(`/reviews/${id}`, brandData);
      if (res.status) {
        toast.success(res.message)
        navigate('/reviewlist')
      }
    } catch (error) {
      console.log("review edit error", error)
    } finally {
      setLoading(false)
    }

  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  Review  Details
                </h4>
                <div className="breadcrumb-action justify-content-center flex-wrap">
                  <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                      <li className="breadcrumb-item">
                        <Link to="/">
                          <i className="uil uil-estate" />
                          Home
                        </Link>
                      </li>
                      <li
                        className="breadcrumb-item active"
                        aria-current="page"
                      >
                        Review Details
                      </li>
                    </ol>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body add-product__body">
                <form className='row' onSubmit={handleSubmit}>
                  <div className="col-lg-4 mb-3">
                    <div className="form-group">
                      <label>Review Image</label>
                      <input type='file' className='form-control' accept='images/*' onChange={handleFileChange} />
                      {preview && (
                        <div className="mt-2">
                          <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="form-group">
                      <label>Review Title</label>
                      <input type='text' disabled name="name" value={formData.name} onChange={handleChange} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="form-group">
                      <label>Rating</label>
                      <input type='text' disabled name="rating" value={formData.rating} onChange={handleChange} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-4 mb-3">
                    <div className="form-group">
                      <label>Comment</label>
                      <input type='text' disabled name="comment" value={formData.comment} onChange={handleChange} className='form-control' />
                    </div>
                  </div>
                  <div className="col-lg-12 text-end">
                    <button className='btn btn-primary' disabled={loading} type='submit'>{loading ? 'Submitting...' : 'Submit'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ReviewEdit


