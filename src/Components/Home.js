import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ActiveUsers from './DashboardChart/ActiveUsers'
import BestSeller from './DashboardChart/BestSeller'
import TopProduct from './DashboardChart/RecentOrder'


const Home = () => {


  return (
    <>
      <div className="container-fluid">
        <div className="row ">
          <div className="col-lg-12">
            <div className="breadcrumb-main">
              <h4 className="text-capitalize breadcrumb-title">Dashboard</h4>
              <div className="breadcrumb-action justify-content-center flex-wrap">
                <nav aria-label="breadcrumb">
                  <ol className="breadcrumb">
                    <li className="breadcrumb-item">
                      <Link to="/">
                        <i className="uil uil-estate" />
                        Dashboard
                      </Link>
                    </li>
                  </ol>
                </nav>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-xxl-3 col-sm-6 mb-5">
            <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
              <div className="overview-content w-100">
                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                  <div className="ap-po-details__titlebar">
                    <h1>100+</h1>
                    <p>Total Products</p>
                  </div>
                  <div className="ap-po-details__icon-area">
                    <div className="svg-icon order-bg-opacity-primary color-primary">
                      <i className="uil uil-briefcase-alt" />
                    </div>
                  </div>
                </div>
                <div className="ap-po-details-time">
                  <span className="color-success">
                    <i className="las la-arrow-up" />
                    <strong>25.36%</strong>
                  </span>
                  <small>Since last month</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6 mb-5">
            <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
              <div className="overview-content w-100">
                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                  <div className="ap-po-details__titlebar">
                    <h1>30,825</h1>
                    <p>Total Orders</p>
                  </div>
                  <div className="ap-po-details__icon-area">
                    <div className="svg-icon order-bg-opacity-info color-info">
                      <i className="uil uil-shopping-cart-alt" />
                    </div>
                  </div>
                </div>
                <div className="ap-po-details-time">
                  <span className="color-success">
                    <i className="las la-arrow-up" />
                    <strong>25.36%</strong>
                  </span>
                  <small>Since last month</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6 mb-5">
            <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
              <div className="overview-content w-100">
                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                  <div className="ap-po-details__titlebar">
                    <h1>$30,825</h1>
                    <p>Total Sales</p>
                  </div>
                  <div className="ap-po-details__icon-area">
                    <div className="svg-icon order-bg-opacity-secondary color-secondary">
                      <i className="uil uil-usd-circle" />
                    </div>
                  </div>
                </div>
                <div className="ap-po-details-time">
                  <span className="color-danger">
                    <i className="las la-arrow-down" />
                    <strong>25.36%</strong>
                  </span>
                  <small>Since last month</small>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xxl-3 col-sm-6 mb-5">
            <div className="ap-po-details ap-po-details--2 p-25 radius-xl d-flex justify-content-between">
              <div className="overview-content w-100">
                <div className=" ap-po-details-content d-flex flex-wrap justify-content-between">
                  <div className="ap-po-details__titlebar">
                    <h1>30,825</h1>
                    <p>New Customers</p>
                  </div>
                  <div className="ap-po-details__icon-area">
                    <div className="svg-icon order-bg-opacity-warning color-warning">
                      <i className="uil uil-users-alt" />
                    </div>
                  </div>
                </div>
                <div className="ap-po-details-time">
                  <span className="color-success">
                    <i className="las la-arrow-up" />
                    <strong>25.36%</strong>
                  </span>
                  <small>Since last month</small>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-6 mb-5">
            <BestSeller />
          </div>
          <div className="col-lg-6 mb-5">
            <TopProduct />
          </div>
          <div className="col-lg-12 mb-5">
            <ActiveUsers />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home