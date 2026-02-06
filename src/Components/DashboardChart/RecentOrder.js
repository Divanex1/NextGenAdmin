import React from 'react'
import product1 from '../../assets/img/product-01.png'
import product2 from '../../assets/img/product-02.png'
import product3 from '../../assets/img/product-03.png'
import product4 from '../../assets/img/product-04.png'
import product5 from '../../assets/img/product-05.png'
import { Link } from 'react-router-dom'



function TopProduct() {
    return (
        <>
            <div className="card border-0 px-25 pb-15 h-100">
                <div className="card-header align-items-center">
                    <h6>Recent Order</h6>
                    <Link className='btn btn-primary'>View All</Link>
                </div>
                <div className="card-body">
                    <div className="selling-table-wrap selling-table-wrap__top-product">
                        <div className="table-responsive">
                            <table className="table table-borderless">
                                <thead>
                                    <tr>
                                        <th>Product Image</th>
                                        <th>Prducts Name</th>
                                        <th>Stocks</th>
                                        <th>Orders</th>
                                        <th>Amount</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product1} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-success  text-success rounded-pill">Stock</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$38,536</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product2} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-danger  text-danger rounded-pill">Cancel</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$20,573</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product3} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-warning  text-warning rounded-pill">Pending</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$17,457</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product4} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-success  text-success rounded-pill">Stock</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$15,354</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product5} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-success  text-success rounded-pill">Stock</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$12,354</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <div className='selling-product-img'>
                                                <img className="radius-xs img-fluid order-bg-opacity-primary" src={product1} alt="img" />
                                            </div>
                                        </td>
                                        <td>
                                            <div className="selling-product-img d-flex align-items-center">
                                                <span>Tyre Hugger</span>
                                            </div>
                                        </td>
                                        <td>
                                            <div className="orderDatatable-status">
                                                <span className="order-bg-opacity-success  text-success rounded-pill">Stock</span>
                                            </div>
                                        </td>
                                        <td>30</td>
                                        <td>$17,457</td>
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

export default TopProduct