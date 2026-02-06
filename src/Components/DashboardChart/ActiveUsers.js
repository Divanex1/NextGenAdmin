import React from 'react'
import robert4 from '../../assets/img/author/robert-4.png'
import robert2 from '../../assets/img/author/robert-2.png'
import robert1 from '../../assets/img/author/robert-1.png'
import robert3 from '../../assets/img/author/robert-3.png'
import robert5 from '../../assets/img/author/robert-5.png'

function ActiveUsers() {
    return (
        <>
            <div className="card pb-10 h-100">
                <div className="card-header">
                    <h6>Best Vendor</h6>
                </div>
                <div className="card-body">
                    <div className="selling-table-wrap selling-table-wrap--source">
                        <div className="table-responsive">
                            <table className="table table--default table-borderless">
                                <thead>
                                    <tr>
                                        <th>Seller name</th>
                                        <th>Company</th>
                                        <th>Product</th>
                                        <th>Revenue</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <div className="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
                                                    <img
                                                        className=" img-fluid"
                                                        src={robert1}
                                                        alt="img"
                                                    />
                                                </div>
                                                <span>Robert Clinton</span>
                                            </div>
                                        </td>
                                        <td>YAMAHA</td>
                                        <td>Tyre Hugger</td>
                                        <td>$38,536</td>
                                        <td>Done</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <div className="selling-product-img-wrapper order-bg-opacity-primary align-items-end">
                                                    <img
                                                        className=" img-fluid"
                                                        src={robert2}
                                                        alt="img"
                                                    />
                                                </div>
                                                <span>Michael Johnson </span>
                                            </div>
                                        </td>
                                        <td>YAMAHA</td>
                                        <td>Tyre Hugger</td>
                                        <td>$20,573</td>
                                        <td>Done</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <div className="selling-product-img-wrapper order-bg-opacity-secondary align-items-end">
                                                    <img
                                                        className=" img-fluid"
                                                        src={robert3}
                                                        alt="img"
                                                    />
                                                </div>
                                                <span>Daniel White</span>
                                            </div>
                                        </td>
                                        <td>YAMAHA</td>
                                        <td>Tyre Hugger</td>
                                        <td>$17,457</td>
                                        <td>Pending</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <div className="selling-product-img-wrapper order-bg-opacity-success align-items-end">
                                                    <img
                                                        className=" img-fluid"
                                                        src={robert4}
                                                        alt="img"
                                                    />
                                                </div>
                                                <span>Chris Barin </span>
                                            </div>
                                        </td>
                                        <td>YAMAHA</td>
                                        <td>Tyre Hugger</td>
                                        <td>$15,354</td>
                                        <td>Done</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <div className="selling-product-img-wrapper order-bg-opacity-info align-items-end">
                                                    <img
                                                        className=" img-fluid"
                                                        src={robert5}
                                                        alt="img"
                                                    />
                                                </div>
                                                <span>Daniel Pink</span>
                                            </div>
                                        </td>
                                        <td>YAMAHA</td>
                                        <td>Tyre Hugger</td>
                                        <td>$12,354</td>
                                        <td>Done</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ActiveUsers