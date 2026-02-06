import React, { useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

const Siderbar = ({ isVisible, userPermissions }) => {
    const [openMenus, setOpenMenus] = useState({
        products: false,
        users: false,
        vendor: false,
        cms: false,
        banner: false,
        blog: false,
        brand: false,
        genral: false,
        order: false,
        category: false,
        bike: false,
        review: false,
        faq: false,
        comp: false,
        staff: false,
        country:false,
        state:false,
        city:false
    });

    // Toggle specific menu section

    const toggleMenu = (menuName) => {
        setOpenMenus(prev => ({
            ...prev,
            [menuName]: !prev[menuName]
        }));
    };
    const hasPermission = (permission) => {
        return userPermissions.includes(permission);
    };
    const location = useLocation();

    return (
        <>
            <div className="sidebar-wrapper">
                <div className={`sidebar sidebar-collapse ${isVisible ? 'collapsed' : ''}`} id="sidebar">
                    <div className="sidebar__menu-group">
                        <ul className="sidebar_nav">
                            <li className='has-child open'>
                                <Link to="/" className="active text-decoration-none">
                                    <span className="nav-icon uil uil-create-dashboard" />
                                    <span className="menu-text">Dashboard</span>
                                </Link>
                            </li>


                            <li className={`has-child ${openMenus.country ? 'open' : ''}`}>
                                                            <a className="active text-decoration-none" onClick={() => toggleMenu('country')}>
                                                                <span className="nav-icon uil uil-users-alt"></span>
                                                                <span className="menu-text">Country</span>
                                                                <span className="toggle-icon"></span>
                                                            </a>
                            
                                                            <ul className={openMenus.country ? 'd-block' : 'd-none'}>
                                                                <li className={location.pathname === '/country' ? 'active' : ''}>
                                                                    <Link to="/country" className='text-decoration-none'>Country List</Link>
                                                                </li>
                                                                <li className={location.pathname === '/state' ? 'active' : ''}>
                                                                    <Link to="/state" className='text-decoration-none'>State List</Link>
                                                                </li>
                                                                <li className={location.pathname === '/city' ? 'active' : ''}>
                                                                    <Link to="/city" className='text-decoration-none'>City List</Link>
                                                                </li>
                                                            </ul>
                                                        </li>
                                                        
                            <li className={`has-child ${openMenus.users ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('users')}>
                                    <span className="nav-icon uil uil-users-alt"></span>
                                    <span className="menu-text">Customers</span>
                                    <span className="toggle-icon"></span>
                                </a>

                                <ul className={openMenus.users ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/userlist' ? 'active' : ''}>
                                        <Link to="/userlist" className='text-decoration-none'>Customer List</Link>
                                    </li>

                                    <li className={location.pathname === '/adduser' ? 'active' : ''}>
                                        <Link to="/adduser" className='text-decoration-none'>Add Customer</Link>
                                    </li>
                                    <li className={location.pathname === '/usercomplaints' ? 'active' : ''}>
                                        <Link to="/usercomplaints" className='text-decoration-none'>Customer Complaints</Link>
                                    </li>
                                    {/* <li className={location.pathname === '/userrequest' ? 'active' : ''}>
                                        <Link to="/userrequest" className='text-decoration-none'>Customer Approval</Link>
                                    </li> */}
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.banner ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('banner')}>
                                    <span className="nav-icon uil uil-images"></span>
                                    <span className="menu-text">Banners</span>
                                    <span className="toggle-icon"></span>
                                </a>

                                <ul className={openMenus.banner ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/bannerlist' ? 'active' : ''}>
                                        <Link to="/bannerlist" className='text-decoration-none'>Banner List</Link>
                                    </li>

                                    <li className={location.pathname === '/addbanner' ? 'active' : ''}>
                                        <Link to="/addbanner" className='text-decoration-none'>Add Banner</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.bike ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('bike')}>
                                    <span className="nav-icon fa fa-bicycle"></span>
                                    <span className="menu-text">Bike</span>
                                    <span className="toggle-icon"></span>
                                </a>

                                <ul className={openMenus.bike ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/bikelist' ? 'active' : ''}>
                                        <Link to="/bikelist" className='text-decoration-none'>Bike List</Link>
                                    </li>

                                    <li className={location.pathname === '/addbike' ? 'active' : ''}>
                                        <Link to="/addbike" className='text-decoration-none'>Add Bike</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.products ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('products')}>
                                    <span className="nav-icon uil uil-shopping-bag"></span>
                                    <span className="menu-text">Product</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.products ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addproduct' ? 'active' : ''}>
                                        <Link to="/addproduct" className='text-decoration-none'>Add Product</Link>
                                    </li>
                                    <li className={location.pathname === '/productlist' ? 'active' : ''}>
                                        <Link to="/productlist" className='text-decoration-none'>Product List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.category ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('category')}>
                                    <span className="nav-icon uil uil-apps"></span>
                                    <span className="menu-text">Category</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.category ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addcategory' ? 'active' : ''}>
                                        <Link to="/addcategory" className='text-decoration-none'>Add Category</Link>
                                    </li>
                                    <li className={location.pathname === '/categorylist' ? 'active' : ''}>
                                        <Link to="/categorylist" className='text-decoration-none'>Category List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.vendor ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('vendor')}>
                                    <span className="nav-icon uil uil-book-reader"></span>
                                    <span className="menu-text">Vendor</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.vendor ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addvendor' ? 'active' : ''}>
                                        <Link to="/addvendor" className='text-decoration-none'>Add Vendor</Link>
                                    </li>
                                    <li className={location.pathname === '/vendorlist' ? 'active' : ''}>
                                        <Link to="/vendorlist" className='text-decoration-none'>Vendor List</Link>
                                    </li>
                                    <li className={location.pathname === '/vendorcomplaints' ? 'active' : ''}>
                                        <Link to="/vendorcomplaints" className='text-decoration-none'>Vendor Complaints</Link>
                                    </li>
                                    <li className={location.pathname === '/vendorrequest' ? 'active' : ''}>
                                        <Link to="/vendorrequest" className='text-decoration-none'>Vendor Approvals</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.staff ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('staff')}>
                                    <span className="nav-icon uil uil-book-reader"></span>
                                    <span className="menu-text">Staff</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.staff ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addstaff' ? 'active' : ''}>
                                        <Link to="/addstaff" className='text-decoration-none'>Add Staff</Link>
                                    </li>
                                    <li className={location.pathname === '/stafflist' ? 'active' : ''}>
                                        <Link to="/stafflist" className='text-decoration-none'>Staff List</Link>
                                    </li>                              
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.blog ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('blog')}>
                                    <span className="nav-icon uil-list-ui-alt"></span>
                                    <span className="menu-text">Blog</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.blog ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addblog' ? 'active' : ''}>
                                        <Link to="/addblog" className='text-decoration-none'>Add Blog</Link>
                                    </li>
                                    <li className={location.pathname === '/bloglist' ? 'active' : ''}>
                                        <Link to="/bloglist" className='text-decoration-none'>Blog List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.brand ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('brand')}>
                                    <span className="nav-icon uil-award-alt"></span>
                                    <span className="menu-text">Brand</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.brand ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addbrand' ? 'active' : ''}>
                                        <Link to="/addbrand" className='text-decoration-none'>Add Brand</Link>
                                    </li>
                                    <li className={location.pathname === '/brandlist' ? 'active' : ''}>
                                        <Link to="/brandlist" className='text-decoration-none'>Brand List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.order ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('order')}>
                                    <span className="nav-icon uil-shopping-cart-alt"></span>
                                    <span className="menu-text">Order Managment</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.order ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/orderlist' ? 'active' : ''}>
                                        <Link to="/orderlist" className='text-decoration-none'>Order List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.review ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('review')}>
                                    <span className="nav-icon uil uil-star"></span>
                                    <span className="menu-text">Review Management</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.review ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/reviewlist' ? 'active' : ''}>
                                        <Link to="/reviewlist" className='text-decoration-none'>Review List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.comp ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('comp')}>
                                    <span className="nav-icon fa fa-file-edit"></span>
                                    <span className="menu-text">Complaints</span>
                                    <span className="toggle-icon"></span>
                                </a>

                                <ul className={openMenus.comp ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/allcomplaints' ? 'active' : ''}>
                                        <Link to="/allcomplaints" className='text-decoration-none'>All Complaints</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.faq ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('faq')}>
                                    <span className="nav-icon uil uil-star"></span>
                                    <span className="menu-text">FAQ Management</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.faq ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addfaq' ? 'active' : ''}>
                                        <Link to="/addfaq" className='text-decoration-none'>FAQ Add</Link>
                                    </li>
                                    <li className={location.pathname === '/faqlist' ? 'active' : ''}>
                                        <Link to="/faqlist" className='text-decoration-none'>FAQ List</Link>
                                    </li>
                                </ul>
                            </li>
                            
                            {/* <li className={`has-child ${openMenus.cms ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('cms')}>
                                    <span className="nav-icon uil-file-alt"></span>
                                    <span className="menu-text">Notification</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.cms ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/notification-to-user' ? 'active' : ''}>
                                        <Link to="/notification-to-user" className='text-decoration-none'>Single User</Link>
                                    </li>
                                    <li className={location.pathname === '/notification-to-role' ? 'active' : ''}>
                                        <Link to="/notification-to-role" className='text-decoration-none'>Select Role</Link>
                                    </li>
                                </ul>
                            </li> */}

                            <li className={`has-child ${openMenus.cms ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('cms')}>
                                    <span className="nav-icon uil-file-alt"></span>
                                    <span className="menu-text">CMS</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.cms ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/addcms' ? 'active' : ''}>
                                        <Link to="/addcms" className='text-decoration-none'>Add CMS</Link>
                                    </li>
                                    <li className={location.pathname === '/cmslist' ? 'active' : ''}>
                                        <Link to="/cmslist" className='text-decoration-none'>CMS List</Link>
                                    </li>
                                </ul>
                            </li>
                            <li className={`has-child ${openMenus.genral ? 'open' : ''}`}>
                                <a className="active text-decoration-none" onClick={() => toggleMenu('genral')}>
                                    <span className="nav-icon uil-cog"></span>
                                    <span className="menu-text">Genaral</span>
                                    <span className="toggle-icon"></span>
                                </a>
                                <ul className={openMenus.genral ? 'd-block' : 'd-none'}>
                                    <li className={location.pathname === '/feedback' ? 'active' : ''}>
                                        <Link to="/feedback" className='text-decoration-none'>Feedback</Link>
                                    </li>
                                    <li className={location.pathname === '/inquiry' ? 'active' : ''}>
                                        <Link to="/inquiry" className='text-decoration-none'>Inquiry</Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Siderbar;
