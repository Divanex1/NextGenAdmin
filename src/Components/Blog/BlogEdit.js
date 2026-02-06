import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, imgUrl, postData, putData } from '../Services/api';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
const BlogEdit = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    image: null,
    status: false,
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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file
      }));
      setPreview(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, [id]);


  // Fetch Api
  const fetchBlogs = async () => {
    try {
      const res = await getData(`/admin/blogs/${id}`);
      console.log(res.data)
      const blogData = res.data;
      setFormData(blogData)
      setPreview(`${imgUrl}/${blogData.image}`)
    } catch (error) {
      console.log("error Fetch blogs", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true)
    try {
      const userData = new FormData();
      userData.append("title", formData.title);
      userData.append("description", formData.description);
      userData.append("image", formData.image);
      const res = await putData(`/admin/blogs/${id}`, userData);

      if (res.status) {
        toast.success("Blog Updated Successfully")
        navigate('/bloglist')
      } else {
        toast.error(res.message)
      }
    } catch (error) {
      console.log("error updating api", error)
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
                  Edit Blog
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
                        Edit Blog
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
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Blog Image</label>
                      <input type='file' className='form-control' required accept='images/*' onChange={handleFileChange} />
                      {preview && (
                        <div className="mt-2">
                          <img src={preview} alt="Preview" className="img-thumbnail" width="100" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <div className="form-group">
                      <label>Blog Title</label>
                      <input type='text' className='form-control' name='title' value={formData.title} onChange={handleChange} />
                    </div>
                  </div>
                  {/* <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Blog Author</label>
                                            <input type='text' className='form-control' />
                                        </div>
                                    </div> 
                                    <div className="col-lg-4">
                                        <div className="form-group">
                                            <label>Date</label>
                                            <input type='date' className='form-control' />
                                        </div>
                                    </div>*/}

                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Status </label>
                      <select className="form-select" name='status' value={formData.status} onChange={handleChange}>
                        <option value="">Select Status</option>
                        <option value={true}>Active</option>
                        <option value={false}>Inactive</option>
                      </select>
                    </div>
                  </div>
                  <div className="col-lg-12 col-md-12 mb-3">
                    <div className="form-group">
                      <label htmlFor="name2">Description <span className="text-danger">*</span></label>
                      <JoditEditor
                        value={formData.description}
                        onChange={(newContent) =>
                          setFormData((prev) => ({ ...prev, description: newContent }))
                        }
                      />
                    </div>
                  </div>
                  <div className="col-lg-12 text-end">
                    <button type="submit" disabled={loading} className="btn btn-primary">{loading ? 'Submitting...' : 'Submit'}</button>
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

export default BlogEdit