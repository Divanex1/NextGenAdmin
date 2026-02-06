import './assets/style.css'
import Home from './Components/Home';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from './Components/Routes/ProtectedRoute'
import Layout from './Components/Layout';
import PageNotFound from './Components/PageNotFound';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Components/Login/Login';
import AddUser from './Components/User/AddUser';
import UserList from './Components/User/UserList';
import AddProduct from './Components/Product/AddProduct'
import ProductList from './Components/Product/ProductList';
import AddCategory from './Components/Category/AddCategory';
import CategoryList from './Components/Category/CategoryList';
import AddSeller from './Components/Seller/AddSeller';
import SellerList from './Components/Seller/SellerList';
import VendorList from './Components/Vendors/VendorList';
import AddBlog from './Components/Blog/AddBlog';
import BlogList from './Components/Blog/BlogList';
import BrandList from './Components/Brand/BrandList';
import AddBrand from './Components/Brand/AddBrand';
import AddCms from './Components/CMS/AddCms';
import CmsList from './Components/CMS/CmsList';
import Profile from './Components/Profile/Profile';
import FeedBackList from './Components/Pages/FeedBackList';
import InquiryList from './Components/Pages/InquiryList';
import OrderList from './Components/Order/OrderList';
import AddVendor from './Components/Vendors/AddVendor';
import VendorView from './Components/Vendors/VendorView';
import VendorEdit from './Components/Vendors/VendorEdit';
import BrandView from './Components/Brand/BrandView';
import BrandEdit from './Components/Brand/BrandEdit';
import CategoryEdit from './Components/Category/CategoryEdit';
import CategoryView from './Components/Category/CategoryView';
import UserView from './Components/User/UserView';
import UserEdit from './Components/User/UserEdit';
import BlogEdit from './Components/Blog/BlogEdit';
import BlogView from './Components/Blog/BlogView';
import BannerAdd from './Components/Banner/BannerAdd';
import BannerEdit from './Components/Banner/BannerEdit';
import BannerView from './Components/Banner/BannerView';
import BannerList from './Components/Banner/BannerList';
import BikeAdd from './Components/Bike/BikeAdd';
import BikeEdit from './Components/Bike/BikeEdit';
import BikeView from './Components/Bike/BikeView';
import BikeList from './Components/Bike/BikeList';
import ProductEdit from './Components/Product/ProductEdit';
import ProductView from './Components/Product/ProductView';
import CmsView from './Components/CMS/CmsView';
import CmsEdit from './Components/CMS/CmsEdit';
import ReviewAdd from './Components/Reviews/ReviewAdd';
import ReviewList from './Components/Reviews/ReviewList';
import ReviewDetails from './Components/Reviews/ReviewDetails';
import ReviewEdit from './Components/Reviews/ReviewEdit';
import FaqList from './Components/FAQ/FaqList';
import FAQView from './Components/FAQ/FAQView';
import FaqEdit from './Components/FAQ/FaqEdit';
import AddFaq from './Components/FAQ/AddFaq';
import VendorComplaint from './Components/Vendors/VendorComplaint';
import ComplaintView from './Components/Vendors/ComplaintView';
import UserComplaints from './Components/User/UserComplaints';
import AllComplaints from './Components/Complaints/AllComplaints';
import VendorApproval from './Components/Vendors/VendorApproval';
import CustomerApproval from './Components/User/CustomerApproval';
import StaffAdd from './Components/Staff/StaffAdd';
import StaffList from './Components/Staff/StaffList';
import StaffView from './Components/Staff/StaffView';
import StaffEdit from './Components/Staff/StaffEdit';
import AddNotificationToUserId from './Components/Notification/AddNotificationToUserId';
import AddNotificationToRole from './Components/Notification/AddNotificationToRole';
import ProjectSettings from './Components/Settings/ProjectSettings';
import CountryList from './Components/Country/List';
import CountryAdd from './Components/Country/AddCountry';
import EditCountry from './Components/Country/EditCountry';

import StateList from './Components/State/List';
import StateAdd from './Components/State/AddState';
import EditState from './Components/State/EditState';

import CityList from './Components/City/List';
import CityAdd from './Components/City/AddCity';
import EditCity from './Components/City/EditCity';


function App() {
  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/' element={<ProtectedRoute component={Layout} />}>
            <Route index element={<ProtectedRoute component={Home} />} />
            <Route path='/profile' element={<ProtectedRoute component={Profile} />} />
              <Route path='/country' element={<ProtectedRoute component={CountryList} />} />
            <Route path='/addcountry' element={<ProtectedRoute component={CountryAdd  } />} />
            <Route path='/countryedit/:id' element={<ProtectedRoute component={EditCountry} />} />

            <Route path='/state' element={<ProtectedRoute component={StateList} />} />
            <Route path='/stateedit/:id' element={<ProtectedRoute component={EditState} />} />

            <Route path='/addstate' element={<ProtectedRoute component={StateAdd  } />} />
            <Route path='/city' element={<ProtectedRoute component={CityList} />} />
            <Route path='/addcity' element={<ProtectedRoute component={CityAdd} />} />
             <Route path='/cityedit/:id' element={<ProtectedRoute component={EditCity} />} />
            {/* Notification Managment */}
            <Route path='/notification-to-user' element={<AddNotificationToUserId />} />
            <Route path='/notification-to-role' element={<AddNotificationToRole />} />

            {/* user management */}
            <Route path='/adduser' element={<ProtectedRoute component={AddUser} />} />
            <Route path='/userlist' element={<ProtectedRoute component={UserList} />} />
            <Route path='/userdetails/:id' element={<ProtectedRoute component={UserView} />} />
            <Route path='/useredit/:id' element={<ProtectedRoute component={UserEdit} />} />
            <Route path='/usercomplaints' element={<ProtectedRoute component={UserComplaints} />} />
            <Route path='/userrequest' element={<ProtectedRoute component={CustomerApproval} />} />

            {/* product management */}
            <Route path='/addproduct' element={<ProtectedRoute component={AddProduct} />} />
            <Route path='/productlist' element={<ProtectedRoute component={ProductList} />} />
            <Route path='/productdetails/:id' element={<ProtectedRoute component={ProductView} />} />
            <Route path='/productedit/:id' element={<ProtectedRoute component={ProductEdit} />} />

            {/* seller management */}
            <Route path='/addseller' element={<ProtectedRoute component={AddSeller} />} />
            <Route path='/sellerlist' element={<ProtectedRoute component={SellerList} />} />

            {/* vendor management */}
            <Route path='/addvendor' element={<ProtectedRoute component={AddVendor} />} />
            <Route path='/vendorlist' element={<ProtectedRoute component={VendorList} />} />
            <Route path='/vendordetails/:id' element={<ProtectedRoute component={VendorView} />} />
            <Route path='/vendoredit/:id' element={<ProtectedRoute component={VendorEdit} />} />
            <Route path='/vendorcomplaints' element={<ProtectedRoute component={VendorComplaint} />} />
            <Route path='/complaintdetails/:id' element={<ProtectedRoute component={ComplaintView} />} />
            <Route path='/vendorrequest' element={<ProtectedRoute component={VendorApproval} />} />


            <Route path='/allcomplaints' element={<ProtectedRoute component={AllComplaints} />} />


            {/* banner management */}
            <Route path='/addbanner' element={<BannerAdd />} />
            <Route path='/bannerlist' element={<BannerList />} />
            <Route path='/bannerdetails/:id' element={<BannerView />} />
            <Route path='/banneredit/:id' element={<BannerEdit />} />

            {/* blog management */}
            <Route path='/addblog' element={<AddBlog />} />
            <Route path='/bloglist' element={<BlogList />} />
            <Route path='/blogdetails/:id' element={<BlogView />} />
            <Route path='/blogedit/:id' element={<BlogEdit />} />

            {/* category management */}
            <Route path='/addcategory' element={<ProtectedRoute component={AddCategory} />} />
            <Route path='/categorylist' element={<ProtectedRoute component={CategoryList} />} />
            <Route path='/categorydetails/:id' element={<ProtectedRoute component={CategoryView} />} />
            <Route path='/categoryedit/:id' element={<ProtectedRoute component={CategoryEdit} />} />

            {/* brand management */}
            <Route path='/addbrand' element={<AddBrand />} />
            <Route path='/brandlist' element={<BrandList />} />
            <Route path='/branddetails/:id' element={<BrandView />} />
            <Route path='/brandedit/:id' element={<BrandEdit />} />

            {/* bike management */}
            <Route path='/addbike' element={<BikeAdd />} />
            <Route path='/bikelist' element={<BikeList />} />
            <Route path='/bikedetails/:id' element={<BikeView />} />
            <Route path='/bikeedit/:id' element={<BikeEdit />} />

            {/* cms management */}
            <Route path='/addcms' element={<AddCms />} />
            <Route path='/cmslist' element={<CmsList />} />
            <Route path='/cmsdetails/:slug' element={<CmsView />} />
            <Route path='/cmsedit/:slug' element={<CmsEdit />} />

            {/* review management */}
            <Route path='/addreview' element={<ReviewAdd />} />
            <Route path='/reviewlist' element={<ReviewList />} />
            <Route path='/reviewdetails/:id' element={<ReviewDetails />} />
            <Route path='/reviewedit/:id' element={<ReviewEdit />} />

            {/* review management */}
            <Route path='/addfaq' element={<AddFaq />} />
            <Route path='/faqlist' element={<FaqList />} />
            <Route path='/faqdetails/:id' element={<FAQView />} />
            <Route path='/faqedit/:id' element={<FaqEdit />} />

            {/* staff management */}
            <Route path='/addstaff' element={<StaffAdd />} />
            <Route path='/stafflist' element={<StaffList />} />
            <Route path='/staffdetails/:id' element={<StaffView />} />
            <Route path='/satffedit/:id' element={<StaffEdit />} />

            {/* order management */}
            <Route path='/orderlist' element={<OrderList />} />

            {/* others */}
            <Route path='/feedback' element={<FeedBackList />} />
            <Route path='/inquiry' element={<InquiryList />} />
            <Route path='/setting' element={<ProjectSettings />} />

          </Route>
          <Route path='*' element={< PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer autoClose={3000} />

    </>
  );
}

export default App;
