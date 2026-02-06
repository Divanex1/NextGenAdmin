import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { getData, postData } from '../Services/api';
import { toast } from 'react-toastify';

const FAQView = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
  })

  // Get All FAQs Api
  const fetchFAQs = async () => {
    try {
      const res = await getData(`/admin/faq-details/${id}`);
      setFormData(res.data)
    } catch (error) {
      console.log("error faq fetching", error)
    }
  }

  useEffect(() => {
    fetchFAQs();
  }, [])

  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="shop-breadcrumb">
              <div className="breadcrumb-main">
                <h4 className="text-capitalize breadcrumb-title">
                  FAQ Details
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
                        FAQ Details
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
                <form className='row'>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Question</label>
                      <input type='text' className='form-control' name='question' value={formData.question} disabled />
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Answer</label>
                      <input type='text' className='form-control' name='answer' value={formData.answer} disabled/>
                    </div>
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

export default FAQView