import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Mainpage from '../Pages/Mainpage';
import Cart from '../Pages/Process/Cart';
import Signup from '../Pages/Verify/Signup';
import Login from '../Pages/Process/Login';
import Loginn from '../Pages/Verify/Loginn';
import Shipping from '../Pages/Process/Shipping';
import OrderSummary from '../Pages/Process/OrderSummary';
import Gift from '../Pages/Process/Gift';
import Payment from '../Pages/Process/Payment';
import '../styles/Admin.css';
import Admin from '../Admindashboard/Admin';
import Dashboard from '../Admindashboard/Dashboard';
import Wishlist from '../Pages/Process/Wishlist';
import Adashbord from '../Admindashboard/Adashbord';
import Uprofile from '../UserProfile/Uprofile';
import Userprofile from '../UserProfile/Userprofile';
import Uwishlist from '../UserProfile/Uwishlist';
import Uorder from '../UserProfile/Uorder';
import EditProfile from '../UserProfile/EditProfile';
import Ucoupon from '../UserProfile/Ucoupon';
import AboutUs from '../Pages/AboutUs';
import LoginSuccess from '../Pages/Verify/LoginSuccess';
import Return from '../Policies/Return';
import Exchange from '../Policies/Exchange';
import Warranty from '../Policies/Warranty';
import Contact from '../Pages/Contact';
import Productdetails from '../Pages/Product/Productdetails';
import Plan from '../Purchase/Plan';
import OtpComponent from '../otpComponent';
import Shimmer from '../ShimmerEffect/shimmer';
import Test from '../test/Test';
import Solitaire from '../category/solitaire';
import Earrings from '../category/Earrings';
import Rings from '../Category/Rings';
import Bracelet from '../Category/Bracelet';
import Jewellery from '../Category/Jewellery';
import Newarrival from '../Category/Newarrival';
import Engagement from '../Category/Ring/Engagement';
import Dailywear from '../Category/Ring/Dailywear';
import Couple from '../Category/Ring/Couple';
import Cocktail from '../Category/Ring/Cocktail';
import Infinity from '../Category/Ring/Infinity';
import Platinum from '../Category/Ring/Platinum';
import Bands from '../Category/Ring/Bands';
import Promise from '../Category/Ring/Promise';
import Studs from '../Category/Earring/Studs';
import Drops from '../Category/Earring/Drops';
import Jhumkas from '../Category/Earring/Jhumkas';
import Chain from '../Category/Bracelet/Chain';
import Oval from '../Category/Bracelet/Oval';
import CollectionPage from '../Category/Collection';

const Router = () => {
  return (
    <div>
      <Routes>
      <Route path="/products" element={<CollectionPage />} />  {/* All Products */}
      <Route path="/products/:category/:subCategory?" element={<CollectionPage />} />

        {/* Pages */}
        <Route path='/' element={<Mainpage />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/otp' element={<OtpComponent />} />

        {/* Category */}
        <Route path='/solitaire' element={<Solitaire />} />
        <Route path='/earrings' element={<Earrings />} />
        <Route path='/ring' element={<Rings />} />
        <Route path='/bracelet' element={<Bracelet />} />
        <Route path='/jewellery' element={<Jewellery />} />
        <Route path='/arrival' element={<Newarrival />} />

        {/* SubCategory */}
        <Route path='/engagementring' element={<Engagement />} />
        <Route path='/dailywearring' element={<Dailywear />} />
        <Route path='/couplering' element={<Couple />} />
        <Route path='/cocktailring' element={<Cocktail />} />
        <Route path='/infinityring' element={<Infinity />} />
        <Route path='/platinumring' element={<Platinum />} />
        <Route path='/bandsring' element={<Bands />} />
        <Route path='/promisering' element={<Promise />} />
        <Route path='/studsearring' element={<Studs />} />
        <Route path='/dropsearring' element={<Drops />} />
        <Route path='/jhumkasearring' element={<Jhumkas />} />
        <Route path='/chainbracelet' element={<Chain />} />
        <Route path='/ovalbracelet' element={<Oval />} />

        {/* Process */}
        <Route path='/cart' element={<Cart />} />
        <Route path='/login' element={<Login />} />
        <Route path='/shipping' element={<Shipping />} />
        <Route path='/summary' element={<OrderSummary />} />
        <Route path='/gift' element={<Gift />} />
        <Route path='/wishlist' element={<Wishlist />} />
        <Route path='/payment' element={<Payment />} />

        {/* product */}
        <Route path='/Productdetails/:id' element={<Productdetails />} />

        {/* verify */}
        <Route path='/signup' element={<Signup />} />
        <Route path='/loginn' element={<Loginn />} />
        <Route path='/login-success' element={<LoginSuccess />} />

        {/* admin-dashboard */}
        <Route path='/112/admin' element={<Admin />} />
        <Route path='/112/admin/dashboard ' element={<Dashboard />} />
        <Route path='/adashbord' element={<Adashbord />} />

        {/* User-profile */}
        <Route path='/Uprofile' element={<Uprofile />} />
        <Route path='/Userprofile' element={<Userprofile />} />
        <Route path='/Uwishlist' element={<Uwishlist />} />
        <Route path='/Ucoupon' element={<Ucoupon />} />
        <Route path='/U-order' element={<Uorder />} />
        <Route path="/edit-profile" element={<EditProfile />} />

        {/* Policies */}
        <Route path='/return' element={<Return />} />
        <Route path='/exchange' element={<Exchange />} />
        <Route path='/warranty' element={<Warranty />} />

        {/* Purchaes */}
        <Route path='/plan-of-purchaes' element={<Plan />} />

        {/* Shimmer */}
        <Route path='/shimmer' element={<Shimmer />} />

        {/* Test */}
        <Route path='/test' element={<Test />} />
      </Routes>
    </div>
  );
};

export default Router;
