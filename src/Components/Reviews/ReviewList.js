import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { deleteData, getData, imgUrl } from '../Services/api';
import { toast } from 'react-toastify';
const ReviewList = () => {
  const [reviewList, setReviewList] = useState([]);

  useEffect(() => {
    fetchReviews();
  }, []);


  // Fetch Api
  const fetchReviews = async () => {
    try {
      const res = await getData('/reviews');
      console.log(res.data)
      setReviewList(res.data)
    } catch (error) {
      console.log("error Fetch Reviews", error)
    }
  }


  const handleDelete = async (id) => {
    try {
      const response = await deleteData(`/reviews/${id}`);
      console.log(response)
      if (response.status) {
        toast.success("Review Deleted Successfully")
        fetchReviews();
      } else {
        toast.error("Error Review Delete")
      }
    } catch (error) {
      console.log("delete api error", error)
    }
  }
  return (
    <>
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-12">
            <div className="breadcrumb-main">
              <h4 className="text-capitalize breadcrumb-title">Review List</h4>
              <div className="breadcrumb-action justify-content-center flex-wrap">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link to="/"><i className="uil uil-estate"></i>Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Review List</li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <div className="userDatatable global-shadow border-light-0 p-30 bg-white radius-xl w-100 mb-30">
                <div className="table-responsive">
                  <table className="table mb-0 table-borderless">
                    <thead>
                      <tr className="userDatatable-header">
                        <th><span className="userDatatable-title">S.No.</span></th>
                        <th>
                          <span className="checkbox-text userDatatable-title">
                            Review Image
                          </span>
                        </th>
                        <th>
                          <span className="checkbox-text userDatatable-title">
                            Review Name
                          </span>
                        </th>
                        <th>
                          <span className="checkbox-text userDatatable-title">
                            Rating
                          </span>
                        </th>
                        <th>
                          <span className="userDatatable-title">
                            Comment
                          </span>
                        </th>
                        <th>
                          <span className="userDatatable-title">
                            Action
                          </span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        reviewList.map((review, index) => {
                          return (
                            <tr key={review._id}>
                              <td>
                                <div className="userDatatable-inline-title">
                                  {index + 1}
                                </div>
                              </td>
                              <td>
                                <div className="userDatatable-inline-title">
                                  <img src={review.avatar} alt='avatar' className='wh-40' />
                                </div>
                              </td>
                              <td>
                                <div className="userDatatable-inline-title">
                                  {review.name}
                                </div>
                              </td>
                              <td>
                                <div className="userDatatable-inline-title">
                                  {review.rating}
                                </div>
                              </td>
                              <td>
                                <div className="userDatatable-inline-title">
                                  {review.comment}
                                </div>
                              </td>
                              <td>
                                <ul className="orderDatatable_actions mb-0 d-flex flex-wrap">
                                  <li>
                                    <Link className="view" to={`/reviewdetails/${review._id}`}>
                                      <i className="uil uil-eye" />
                                    </Link>
                                  </li>
                                  <li>
                                    <Link className="edit" to={`/reviewedit/${review._id}`}>
                                      <i className="uil uil-edit" />
                                    </Link>
                                  </li>
                                  <li>
                                    <a className="remove" onClick={() => handleDelete(review._id)}>
                                      <i className="uil uil-trash-alt" />
                                    </a>
                                  </li>
                                </ul>
                              </td>
                            </tr>
                          )
                        })
                      }

                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div >


    </>
  )
}

export default ReviewList