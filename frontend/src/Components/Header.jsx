import API_BASE_URL from '../Utils/apiConfig.js';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { Link, useNavigate } from 'react-router-dom';
// import Slider from 'react-slick';
// import { formatCurrency } from '../Utils/formateCurrency';
// import products from '../fakedata/Product';
// import { toast } from 'react-toastify';
// import { cartAction } from '../Store/Slice/CartSlice';
// import { signOut } from 'firebase/auth';
// import auth from './firebase';
// import axios from 'axios';
// import { CiHeart, CiShoppingCart, CiLogout } from "react-icons/ci";
// import { GrContactInfo } from "react-icons/gr";
// import { RiUserLine } from "react-icons/ri";
// import { MdAccountCircle } from "react-icons/md";
// import { IoIosSearch } from "react-icons/io";
// import { HiOutlineMenuAlt1 } from "react-icons/hi";

// const Header = () => {
//     const search = React.useRef(null);
//     const searchmd = React.useRef(null);

//     // const totalQuantity = useSelector(state => state.cart.totalQuantity);
//     // const wishlistItem = useSelector(state => state.cart.wishlistItem);
//     const userFetch = JSON.parse(localStorage.getItem('user'));
//     const [tQuantity, setTQuantity] = useState([])
//     const [wishlistItems, setWishlistItems] = useState([])
//     const [wishlistLength, setWishlistLength] = useState([])
//     const [currentIndex, setCurrentIndex] = useState(0);

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const fetchWishlist = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${userFetch._id}`);
//             // console.log(response);

//             const length = response.data.wishlist.products
//             // console.log(wishlistLength);

//             setWishlistLength(length)

//             if (response.status === 200) {
//                 setWishlistItems(response.data.wishlist.products); // Update the local state with fetched data
//             }
//         } catch (error) {
//             // console.error('Error fetching wishlist items:', error);
//             // toast.error("Failed to load wishlist", {
//             //     position: "top-center",
//             //     autoClose: 1000,
//             // });
//         }
//     };

//     const getCart = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/v1/cart/getCart/${userFetch._id}`);
//             // console.log(response.data.totalQuantity);

//             const quantity = response.data;
//             // console.log(tQuantity);

//             setTQuantity(quantity)

//         } catch (err) {
//             console.error("Error fetching product details:", err.response || err);
//             // Handle error (e.g., show a message or set error state)
//         }
//     };

//     useEffect(() => {
//         getCart();
//         fetchWishlist();
//     }, []);

//     var upBannerSlider = {
//         dots: false,
//         infinite: true,
//         speed: 1000,
//         autoplay: true,
//         autoplaySpeed: 3000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//     };

//     const slider_search = {
//         slidesToShow: 5, // Default: Show 5 slides
//         slidesToScroll: 1, // Scroll one at a time
//         infinite: false, // Disable infinite scrolling
//         afterChange: (index) => setCurrentIndex(index), // Track index after change
//         responsive: [
//             {
//                 breakpoint: 1200, // For devices with width <= 1200px
//                 settings: {
//                     slidesToShow: 4,
//                 },
//             },
//             {
//                 breakpoint: 992, // For devices with width <= 992px
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             }
//         ],
//     };

//     const slider_search_md = {
//         slidesToShow: 3, // Default: Show 5 slides
//         slidesToScroll: 1, // Scroll one at a time
//         infinite: false, // Disable infinite scrolling
//         afterChange: (index) => setCurrentIndex(index), // Track index after change
//         responsive: [
//             {
//                 breakpoint: 1200, // For devices with width <= 1200px
//                 settings: {
//                     slidesToShow: 4,
//                 },
//             },
//             {
//                 breakpoint: 992, // For devices with width <= 992px
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 768, // For devices with width <= 768px
//                 settings: {
//                     slidesToShow: 3,
//                 },
//             },
//             {
//                 breakpoint: 576, // For devices with width <= 576px
//                 settings: {
//                     slidesToShow: 2,
//                 },
//             },
//         ],
//     };
//     const [searchTerm, setSearchTerm] = useState('');
//     // const search = useRef();

//     // Filtered products based on search term
//     const filteredProducts = products.filter((product) =>
//         product.title.toLowerCase().includes(searchTerm.toLowerCase())
//     );

//     const handleSearchChange = (e) => {
//         setSearchTerm(e.target.value);
//     };
//     const [isLoggedIn, setIsLoggedIn] = useState(false);
//     const [user, setUser] = useState(null);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         const storedUser = localStorage.getItem('user');
//         if (storedUser) {
//             try {
//                 setUser(JSON.parse(storedUser)); // Safely parse user data
//                 setIsLoggedIn(true); // Set logged in state if user exists
//             } catch (error) {
//                 console.error('Error parsing user data:', error);
//                 toast.error('Error loading user data. Please log in again.');
//                 localStorage.removeItem('user'); // Clear invalid data
//                 navigate('/'); // Redirect to signup or login page
//             }
//         }
//     }, [navigate]); // Include navigate as a dependency

//     const handleLogout = async () => {
//         if (!user) {
//             toast.warn('You are not signed in.');
//             return;
//         }

//         try {
//             await signOut(auth);

//             // Clear Redux cart and wishlist
//             dispatch(cartAction.clearCartAndWishlist());

//             // Clear user data
//             localStorage.removeItem('user');
//             setUser(null);
//             setIsLoggedIn(false); // Update the login state to false

//             toast.success('You have successfully logged out');
//             navigate('/'); // Redirect to homepage after logout
//             window.location.reload();
//         } catch (error) {
//             console.error('Error signing out:', error);
//             toast.error('Something went wrong during log-out.');
//         }
//     };

//     // recently viewd
//     const recentlyViewed = useSelector(state => state.cart.recentlyViewed);

//     return (
//         <div className=" m-0 p-0 header_shadow">
//             <section className='container-fluid text-center header_color py-1'>
//                 <Slider {...upBannerSlider}>
//                     <div>
//                         <h6>This Holiday, enjoy complimentary shipping & extended returns with our Tiffany Blue® packaging.</h6>
//                     </div>
//                     <div>
//                         <h6>Our gift to you: A Bird on a Rock charm to adorn your Tiffany Blue® bag, complimentary with every online delivery order.</h6>
//                     </div>
//                     <div>
//                         <h6>New for the holidays: limited-edition Return to Tiffany® designs. </h6>
//                     </div>
//                 </Slider>
//             </section>

//             {/* Large device */}
//             <section className='container-fluid pt-2 d-lg-block d-md-none d-none'>
//                 <div className='row'>
//                     <div className='col-lg-3 col-md-3 col-sm-12 header_logo text-center'>
//                         {/* <i className="ri-search-line"></i> */}
//                         {/* searchbar */}
//                         <form action="" className='ps-4'>
//                             <div className="p-1 bg-light rounded rounded-pill shadow-sm">
//                                 <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas" aria-controls="searchOffcanvas">
//                                     <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
//                                     <div className="input-group-append">
//                                         <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><IoIosSearch /></button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                         {/* <i className="ri-map-pin-line"></i>
//                         <i className="ri-contacts-line"></i> */}
//                         {/* <form className='serach-box'>
//                             <input type="text" className='serach' />
//                             <div className="after"></div>
//                             <input type="submit" className='serach'  />
//                         </form>
//                         <h4 className='serach-set'>&nbsp;</h4> */}

//                     </div>
//                     <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
//                         <div>
//                             <Link to="/" className="text-decoration-none fs-5 text-dark">
//                                 {/* <img
//                                     alt=''
//                                     src='/assets/img/tiffco-logo-2.svg'
//                                     className='img-fluid w-50 mx-auto d-block'
//                                 /> */}
//                                 SALT & GLITZ
//                             </Link>
//                         </div>
//                     </div>
//                     <div className='col-lg-3 col-md-3 col-sm-12 header_logo d-flex justify-content-end align-items-center'>
//                         <div className="d-flex align-items-center gap-3">
//                             <Link className='text-decoration-none text-dark' to="/contact">
//                                 <GrContactInfo className='fs-5' />
//                                 <span className='align-middle' style={{ fontSize: "14px", fontWeight: "500" }}>&nbsp; Contact us</span>
//                             </Link>

//                             <div className="dropdown drp_main">
//                                 <Link className="text-decoration-none text-dark dropdown-toggle" id="dropdownUserLink" role="button">
//                                     <RiUserLine className='text-center fs-5' />
//                                 </Link>
//                                 <ul className="dropdown-menu drp_icon" aria-labelledby="dropdownUserLink">
//                                     {isLoggedIn ? (
//                                         <div className='p-2'>
//                                             <p className="user-email px-3">{user ? user.email : 'Guest'}</p>
//                                             <div className="underline mb-3 ms-3"></div>
//                                             <ul className="profile-menu">
//                                                 <li className="mb-2">
//                                                     <Link to="/Userprofile" className="profile-menu-item ms-2">
//                                                         <MdAccountCircle className='me-2 fs-5' /> My Account
//                                                     </Link>
//                                                     {/* <Link to="/Userprofile" className="profile-menu-item">
//                                                         <i className="ri-user-3-fill"></i> My Account
//                                                     </Link> */}
//                                                 </li>
//                                                 <li>
//                                                     <Link to="" className="profile-menu-item logout ms-2" onClick={handleLogout}>
//                                                         <CiLogout className='me-2 fs-5' /> Logout
//                                                     </Link>
//                                                 </li>
//                                             </ul>
//                                         </div>
//                                     ) : (
//                                         <div className='p-2 header_login'>
//                                             <h5>Your Account</h5>
//                                             <p className='m-0 pt-2'>Access account & manage your orders.</p>
//                                             <li className="dropdown-item pt-3">
//                                                 <Link to="/loginn" className="pe-2">
//                                                     <button className='btn'>Login</button>
//                                                 </Link>
//                                                 <Link to="/signup">
//                                                     <button className='btn'>Signup</button>
//                                                 </Link>
//                                             </li>
//                                         </div>
//                                     )}
//                                 </ul>
//                             </div>

//                             <Link className="text-decoration-none text-dark position-relative" to="/wishlist">
//                                 <CiHeart className="fs-4 position-relative" />
//                                 {wishlistLength.length > 0 && (
//                                     <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
//                                         {wishlistLength.length}
//                                     </span>
//                                 )}
//                             </Link>

//                             <Link className="text-decoration-none text-dark position-relative" to="/cart">
//                                 <CiShoppingCart className="fs-4 position-relative" />
//                                 {tQuantity.totalQuantity > 0 && (
//                                     <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
//                                         {tQuantity.totalQuantity}
//                                     </span>
//                                 )}
//                             </Link>
//                         </div>
//                     </div>

//                 </div>
//             </section>

//             {/* Small device */}
//             <section className='container-fluid pt-2 d-md-block d-sm-block d-lg-none'>
//                 <div className='row'>
//                     <div className='col-sm-2 col-2'>
//                         <HiOutlineMenuAlt1 className="fs-2" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" />
//                         <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
//                             <div className="offcanvas-header mb-0">
//                                 <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                                 {/* <h5 id="offcanvasExampleLabel" className='text-light'>.</h5> */}
//                             </div>
//                             <div className="offcanvas-body">
//                                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="ringsmd">
//                                             <i className="ri-subtract-line"></i>Rings
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="ringsmd">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/08-AUG/others/PostCard/RightSideBanner/RightSideBanner_Postcard.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="earringsmd">
//                                             <i className="ri-subtract-line"></i>Earrings
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="earringsmd">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Stud.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="braceletmd">
//                                             <i className="ri-subtract-line"></i>Bracelets & Bangles
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="braceletmd">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Bracelets.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="solitairesmd">
//                                             <i className="ri-subtract-line"></i>Solitaires
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="solitairesmd">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Solitaires.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="moreJewellerymd">
//                                             <i className="ri-subtract-line"></i>More Jewellery
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="moreJewellerymd">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center"
//                                                                         data-bs-dismiss="offcanvas" aria-label="Close">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center"
//                                                             data-bs-dismiss="offcanvas" aria-label="Close">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Mangalsutras.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="giftsmd">
//                                             <i className="ri-subtract-line"></i>Gifts
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="giftsmd">
//                                             <div className='row'>
//                                                 <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/PostCard/PostCard_DropDown.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Mark-Your-Anniversary_DropDown2X.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Gifts-Under-20K_DropDown2X.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-xl-3 col-lg-3 col-md-6 col-sm-6 col-6 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/DropDown/GiftingPeak_DropDown.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="navbarDropdown">
//                                             <i className="ri-subtract-line"></i>Know Your Diamond
//                                         </Link>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" id="navbarDropdown" data-bs-dismiss="offcanvas" aria-label="Close">
//                                             <i className="ri-subtract-line"></i><Link to="/aboutUs" style={{ textDecoration: "none" }}>About Us</Link>
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                             {/* <div className='btn_md'>
//                                 <Link to="/loginn" data-bs-dismiss="offcanvas"><button className='btn'><span>Log In</span></button></Link>
//                                 <Link to="/signup" data-bs-dismiss="offcanvas"><button className='btn mt-2'><span>Sign Up</span></button></Link>
//                             </div> */}
//                         </div>
//                     </div>
//                     <div className='col-sm-8 col-7 d-flex justify-content-center align-items-center'>
//                         <div>
//                             {/* <Link to="/">
//                                 <img
//                                     alt=''
//                                     src='/assets/img/tiffco-logo-2.svg'
//                                     className='mx-auto d-block main_logo'
//                                 />
//                             </Link> */}
//                             <Link to="/" className="text-decoration-none fs-5 text-dark">
//                                 {/* <img
//                                     alt=''
//                                     src='/assets/img/tiffco-logo-2.svg'
//                                     className='img-fluid w-50 mx-auto d-block'
//                                 /> */}
//                                 SALT & GLITZ
//                             </Link>
//                         </div>
//                     </div>
//                     <div className='col-sm-2 col-3 d-flex justify-content-center align-items-center justify-content-sm-between'>

//                         {/* <Link className='text-decoration-none text-dark pe-3' to="/wishlist">
//                             <i className="ri-heart-line pe-0 position-relative">
//                                 {wishlistLength.length > 0 && (
//                                     <span className="badge badge-icon">{wishlistLength.length}</span>
//                                 )}
//                             </i>
//                         </Link> */}
//                         <Link className="text-decoration-none text-dark position-relative me-2 me-sm-0" to="/wishlist">
//                             <CiHeart className="fs-5 position-relative" />
//                             {wishlistLength.length > 0 && (
//                                 <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
//                                     {wishlistLength.length}
//                                 </span>
//                             )}
//                         </Link>
//                         <Link className="text-decoration-none text-dark position-relative me-2 me-sm-0" to="/cart">
//                             <CiShoppingCart className="fs-5 pe-0 position-relative" />
//                             {tQuantity.totalQuantity > 0 && (
//                                 <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
//                                     {tQuantity.totalQuantity}
//                                 </span>
//                             )}
//                         </Link>
//                         {/* <Link className='text-decoration-none text-dark pe-3' to="/cart">
//                             <i className="ri-shopping-cart-line pe-0 position-relative">
//                                 {tQuantity.totalQuantity > 0 && (
//                                     <span className="badge badge-icon">{tQuantity.totalQuantity}</span>
//                                 )}
//                             </i>
//                         </Link> */}
//                         <Link
//                             className="text-decoration-none text-dark"
//                             to={isLoggedIn ? "/Uprofile" : "/loginn"}
//                         >
//                             <RiUserLine className="pe-0 position-relative" />
//                             {/* <i className="ri-user-line "></i> */}
//                         </Link>
//                     </div>
//                     <form action="" className='pt-3'>
//                         <div className="p-1 bg-light rounded rounded-pill shadow-sm">
//                             <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#mdsearchOffcanvas" aria-controls="mdsearchOffcanvas">
//                                 <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
//                                 <div className="input-group-append">
//                                     <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><IoIosSearch className='fs-5' /></button>
//                                 </div>
//                             </div>
//                         </div>
//                     </form>
//                 </div>
//             </section>

//             {/* Dropdown */}
//             <section className='container-fluid'>
//                 <div className='row'>
//                     <div>
//                         <nav className="navbar navbar-expand-lg navbar-light pt-0 pb-1">
//                             <div className="collapse navbar-collapse" id="navbarSupportedContent">
//                                 <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="rings">
//                                             Rings
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="rings">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/08-AUG/others/PostCard/RightSideBanner/RightSideBanner_Postcard.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="earrings">
//                                             Earrings
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="earrings">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Stud.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="bracelet">
//                                             Bracelets & Bangles
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="bracelet">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Bracelets.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="solitaires">
//                                             Solitaires
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="solitaires">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Pendents
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         Necklace
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         men's solitaires
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         earrings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bridal set
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             round
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pear
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             heart
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             princess
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             oval
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             cushion
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             emerald
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div>
//                                                 <div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Solitaires.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="moreJewellery">
//                                             More Jewellery
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="moreJewellery">
//                                             <div className='row'>
//                                                 <div className='col-lg-4 category_jwellery'>
//                                                     <h6 className='border-dropdown'>Shop By Style
//                                                         <div className="underline mb-3"></div>
//                                                     </h6>
//                                                     <div className='row'>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings1.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         ENGAGEMENT
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings2.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         DAILY WEAR
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings3.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COUPLE RINGS
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings4.jpg'
//                                                                             className=' me-2'
//                                                                         />
//                                                                         COCKTAIL
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings5.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         INFINITY
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                         <div className='col-lg-6'>
//                                                             <ul className='ps-0'>
//                                                                 <li>
//                                                                     <Link to="/earrings" className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings6.jpg'
//                                                                             className=' me-2' // Added margin to the right
//                                                                         />
//                                                                         Solitaire
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings7.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         platinum
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings8.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         bands
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings9.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         promise rings
//                                                                     </Link>
//                                                                 </li>
//                                                                 <li>
//                                                                     <Link className="d-flex align-items-center">
//                                                                         <img
//                                                                             alt='Jewelry Style'
//                                                                             src='/assets/img/rings10.jpg'
//                                                                             className='me-2'
//                                                                         />
//                                                                         adjustable rings
//                                                                     </Link>
//                                                                 </li>
//                                                             </ul>
//                                                         </div>
//                                                     </div>
//                                                 </div>
//                                                 <div className='col-lg-2 category_metal'>
//                                                     <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
//                                                     <div className="underline mb-3"></div>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal1.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal2.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             diamond
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal3.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             Gemstone
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal4.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             navratna
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal5.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             pearl
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal6.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             yellow gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal7.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             rose gold
//                                                         </Link>
//                                                     </li>
//                                                     <li>
//                                                         <Link to="/earrings" className="d-flex align-items-center">
//                                                             <img
//                                                                 alt='Jewelry Style'
//                                                                 src='/assets/img/metal8.png'
//                                                                 className='img-fluid me-2'
//                                                             />
//                                                             white gold
//                                                         </Link>
//                                                     </li>
//                                                 </div>
//                                                 <div className='col-lg-2 shop_by'>
//                                                     <h6 to="" className='border-dropdown'>Shop By</h6>
//                                                     <div className="underline mb-3"></div>

//                                                     <li><Link>Under ₹ 10k</Link></li>
//                                                     <li><Link>₹10k to ₹20k</Link></li>
//                                                     <li><Link>₹20k to ₹30k</Link></li>
//                                                     <li><Link>₹30k to ₹50k</Link></li>
//                                                     <li><Link>₹50k to ₹75k</Link></li>
//                                                     <li><Link>Above ₹ 75k</Link></li>
//                                                     <li><Link>FOR MEN</Link></li>
//                                                 </div><div className='col-lg-4 pe-5'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Mangalsutras.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="gifts">
//                                             Gifts
//                                         </Link>
//                                         <ul className="dropdown-menu dropdown-content" aria-labelledby="gifts">
//                                             <div className='row px-4'>
//                                                 <div className='col-lg-3 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/PostCard/PostCard_DropDown.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-lg-3 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Mark-Your-Anniversary_DropDown2X.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-lg-3 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2023/CL/11_NOV/HPBanner/Gift/01/Gifts-Under-20K_DropDown2X.jpg' className='img-fluid'></img>
//                                                 </div>
//                                                 <div className='col-lg-3 p-0 m-0'>
//                                                     <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/07_JULY/others/DropDown/GiftingPeak_DropDown.jpg' className='img-fluid'></img>
//                                                 </div>
//                                             </div>
//                                         </ul>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="" id="navbarDropdown">
//                                             Know Your Diamond
//                                         </Link>
//                                     </li>
//                                     <li className="nav-item dropdown">
//                                         <Link className="nav-link active" to="/aboutUs" id="navbarDropdown">
//                                             About Us
//                                         </Link>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </nav>
//                     </div>
//                 </div>
//             </section>

//             {/*LARGE OFFCANVAS */}
//             <div className="offcanvas offcanvas-start offcanvas_start_search" tabIndex="-1" id="searchOffcanvas" aria-labelledby="offcanvasSearchLabel">
//                 <div className="offcanvas-header offcanvas_header_search">
//                     <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
//                         <form action="" className='pt-3' onSubmit={(e) => e.preventDefault()}>
//                             <div className="p-1 bg-light rounded rounded-pill shadow-sm">
//                                 <div className="input-group">
//                                     <input
//                                         type="search"
//                                         placeholder="What're you searching for?"
//                                         className="form-control border-0 bg-light"
//                                         value={searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                     <div className="input-group-append">
//                                         <button type="submit" className="btn btn-link search_btn_header">
//                                             {/* <i className="fa fa-search"></i> */}
//                                             <IoIosSearch className='fs-5' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </h5>
//                     <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <h5 className='trending_title'>Search Results</h5>
//                     <div className='row offcanvas_search'>
//                         {filteredProducts.length > 0 ? (
//                             filteredProducts.map((item) => (
//                                 <div className='col-lg-6 px-4' key={item.id}>
//                                     <div className="search-item">
//                                         <Link to={`/productDetail/${item.id}`} className="text-decoration-none text-dark" >
//                                             <div className="left">
//                                                 <img src={item.image01} alt={item.title} className='img-fluid search_offcanvas_arrow' />
//                                                 <span>{item.title}</span>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No products found.</p>
//                         )}
//                     </div>

//                     <h5 className="trending_title pt-4">Recently Viewed</h5>
//                     <div className="row position-relative">
//                         {recentlyViewed.length > 0 ? (
//                             <>
//                                 {/* Prev Button */}
//                                 {currentIndex > 0 && (
//                                     <div>
//                                         <button
//                                             onClick={() => search?.current?.slickPrev()}
//                                             className="pre-btn-set"
//                                         >
//                                             <i className="ri-arrow-left-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}

//                                 <Slider ref={search} {...slider_search}>
//                                     {recentlyViewed.map((item) => (
//                                         <div
//                                             className="card border-0 w-100 mx-auto d-block"
//                                             key={item.id}
//                                         >
//                                             <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.id}`}>
//                                                 <img
//                                                     alt={item.title}
//                                                     src={item.goldImages[0]}
//                                                     className="img-fluid px-2 position-relative"
//                                                 />
//                                             </Link>
//                                             <div className="card-body cartlane">
//                                                 <h6>
//                                                     {formatCurrency(item.total14KT)}{" "}
//                                                     {/* <span>
//                                                         <del>{formatCurrency(item.delprice)}</del>
//                                                     </span> */}
//                                                 </h6>
//                                                 <p>{item.title}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </Slider>

//                                 {/* Next Button */}
//                                 {currentIndex < recentlyViewed.length - slider_search.slidesToShow && (
//                                     <div>
//                                         <button
//                                             onClick={() => search?.current?.slickNext()}
//                                             className="next-btn-set float-end"
//                                         >
//                                             <i className="ri-arrow-right-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="text-center w-100 pt-5">
//                                 <p>You haven't viewed any products yet. Start exploring now!</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>

//             {/*MD OFFCANVAS */}
//             <div className="offcanvas offcanvas-bottom rounded-0" tabIndex="-1" id="mdsearchOffcanvas" aria-labelledby="mdoffcanvasSearchLabel">
//                 <div className="offcanvas-header offcanvas_header_search">
//                     <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
//                         <form action="" className='pt-3' onSubmit={(e) => e.preventDefault()}>
//                             <div className="p-1 bg-light rounded rounded-pill shadow-sm">
//                                 <div className="input-group">
//                                     <input
//                                         type="search"
//                                         placeholder="What're you searching for?"
//                                         className="form-control border-0 bg-light"
//                                         value={searchTerm}
//                                         onChange={handleSearchChange}
//                                     />
//                                     <div className="input-group-append">
//                                         <button type="submit" className="btn btn-link search_btn_header">
//                                             {/* <i className="fa fa-search"></i> */}
//                                             <IoIosSearch className='fs-5' />
//                                         </button>
//                                     </div>
//                                 </div>
//                             </div>
//                         </form>
//                     </h5>
//                     <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
//                 </div>
//                 <div className="offcanvas-body">
//                     <h5 className='trending_title'>Search Results</h5>
//                     <div className='row offcanvas_search'>
//                         {filteredProducts.length > 0 ? (
//                             filteredProducts.map((item) => (
//                                 <div className='col-lg-6 px-4' key={item.id}>
//                                     <div className="search-item">
//                                         <Link to={`/productDetail/${item.id}`} className="text-decoration-none text-dark">
//                                             <div className="left">
//                                                 <img src={item.image01} alt={item.title} className='img-fluid search_offcanvas_arrow' />
//                                                 <span>{item.title}</span>
//                                             </div>
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))
//                         ) : (
//                             <p>No products found.</p>
//                         )}
//                     </div>

//                     <h5 className="trending_title pt-4">Recently Viewed</h5>
//                     <div className="row position-relative">
//                         {recentlyViewed.length > 0 ? (
//                             <>
//                                 {/* Prev Button */}
//                                 {currentIndex > 0 && (
//                                     <div>
//                                         <button
//                                             onClick={() => searchmd?.current?.slickPrev()}
//                                             className="pre-btn-set"
//                                         >
//                                             <i className="ri-arrow-left-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}

//                                 <Slider ref={searchmd} {...slider_search_md}>
//                                     {recentlyViewed.map((item) => (
//                                         <div
//                                             className="card border-0 w-100 mx-auto d-block"
//                                             key={item.id}
//                                         >
//                                             <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.id}`}>
//                                                 <img
//                                                     alt={item.title}
//                                                     src={item.goldImages[0]}
//                                                     className="img-fluid px-2 position-relative"
//                                                 />
//                                             </Link>
//                                             <div className="card-body cartlane">
//                                                 <h6>
//                                                     {formatCurrency(item.total14KT)}{" "}
//                                                     {/* <span>
//                                                         <del>{formatCurrency(item.delprice)}</del>
//                                                     </span> */}
//                                                 </h6>
//                                                 <p>{item.title}</p>
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </Slider>

//                                 {/* Next Button */}
//                                 {currentIndex < recentlyViewed.length - slider_search_md.slidesToShow && (
//                                     <div>
//                                         <button
//                                             onClick={() => searchmd?.current?.slickNext()}
//                                             className="next-btn-set float-end"
//                                         >
//                                             <i className="ri-arrow-right-wide-line"></i>
//                                         </button>
//                                     </div>
//                                 )}
//                             </>
//                         ) : (
//                             <div className="text-center w-100 pt-5">
//                                 <p>You haven't viewed any products yet. Start exploring now!</p>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Header;


import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Slider from 'react-slick';
import { formatCurrency } from '../Utils/formateCurrency';
import { toast } from 'react-toastify';
import { cartAction } from '../Store/Slice/CartSlice';
import { signOut } from 'firebase/auth';
import auth from './firebase';
import axios from 'axios';
import { CiMenuFries, CiUser, CiHeart, CiShoppingCart, CiLogout } from "react-icons/ci";
import { GrContactInfo } from "react-icons/gr";
import { MdAccountCircle } from "react-icons/md";
import { IoIosSearch } from "react-icons/io";
import Loader from '../Pages/Loader';
import Shimmer from '../ShimmerEffect/shimmer';

// const userFetch = JSON.parse(localStorage.getItem('user'));
const userFetch = JSON.parse(localStorage.getItem('user'))
const Header = () => {
    const search = React.useRef(null);
    const searchmd = React.useRef(null);

    // const totalQuantity = useSelector(state => state.cart.totalQuantity);
    // const wishlistItem = useSelector(state => state.cart.wishlistItem);
    let userId = userFetch?._id || localStorage.getItem('guestUserId');
    const reduxWishlist = useSelector(state => state.cart.wishlist || []);
    const reduxTotalQuantity = useSelector(state => state.cart.totalQuantity || 0);
    const [tQuantity, setTQuantity] = useState([])
    const [wishlistItems, setWishlistItems] = useState([])
    const [wishlistLength, setWishlistLength] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [products, setProducts] = useState([]);
    const [defaultProducts, setDefaultProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    // const totalQuantity = useSelector((state) => state.cart.totalQuantity);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    const fetchWishlistHeader = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${userId}`);
            // console.log(response);

            const length = response.data.wishlist.products
            // console.log(wishlistLength);

            setWishlistLength(length)

            if (response.status === 200) {
                setWishlistItems(response.data.wishlist.products); // Update the local state with fetched data
            }
        } catch (error) {
            // Wishlist might be empty or deleted — reset counts
            setWishlistLength([]);
            setWishlistItems([]);
        }
    };

    // fetchWishlist()

    const getCart = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/cart/getCart/${userId}`);
            console.log(response.data);

            const quantity = response.data;
            // console.log(tQuantity);

            setTQuantity(quantity)

        } catch (err) {
            setTQuantity({ totalQuantity: 0 });
            // Backend returns 404 when cart is empty — sync Redux store
            if (err.response && err.response.status === 404) {
                dispatch(cartAction.clearCart());
            }
        }
    };

    useEffect(() => {
        getCart();
        fetchWishlistHeader();
    }, [reduxWishlist.length, reduxTotalQuantity]);

    var upBannerSlider = {
        dots: false,
        infinite: true,
        speed: 1000,
        autoplay: true,
        autoplaySpeed: 3000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    const slider_search = {
        slidesToShow: 5, // Default: Show 5 slides
        slidesToScroll: 1, // Scroll one at a time
        infinite: false, // Disable infinite scrolling
        afterChange: (index) => setCurrentIndex(index), // Track index after change
        responsive: [
            {
                breakpoint: 1200, // For devices with width <= 1200px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // For devices with width <= 992px
                settings: {
                    slidesToShow: 3,
                },
            }
        ],
    };

    const slider_search_md = {
        slidesToShow: 3, // Default: Show 5 slides
        slidesToScroll: 1, // Scroll one at a time
        infinite: false, // Disable infinite scrolling
        afterChange: (index) => setCurrentIndex(index), // Track index after change
        responsive: [
            {
                breakpoint: 1200, // For devices with width <= 1200px
                settings: {
                    slidesToShow: 4,
                },
            },
            {
                breakpoint: 992, // For devices with width <= 992px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 768, // For devices with width <= 768px
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 576, // For devices with width <= 576px
                settings: {
                    slidesToShow: 2,
                },
            },
        ],
    };
    // const search = useRef();

    // Filtered products based on search term
    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    // console.log(filteredProducts);


    // const handleSearchChange = (e) => {
    //     setSearchTerm(e.target.value);
    // };
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Safely parse user data
                setIsLoggedIn(true); // Set logged in state if user exists
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data. Please log in again.');
                localStorage.removeItem('user'); // Clear invalid data
                navigate('/'); // Redirect to signup or login page  
            }
        }
    }, [navigate]); // Include navigate as a dependency

    const handleLogout = async () => {
        if (!user) {
            toast.warn('You are not signed in.');
            return;
        }

        try {
            await signOut(auth);

            // Clear Redux cart and wishlist
            dispatch(cartAction.resetState());

            // Clear user data
            // localStorage.removeItem('user');
            // localStorage.removeItem('guestUserId');

            console.log("After removal, guestUserId:", localStorage.getItem('guestUserId')); // Debugging

            setUser(null);
            setIsLoggedIn(false);

            localStorage.clear()

            toast.success('You have successfully logged out');

            setTimeout(() => {
                navigate('/');
                window.location.reload();
            }, 500); // Delay to ensure localStorage is cleared
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during log-out.');
        }
    };

    // recently viewd
    const recentlyViewed = useSelector(state => state.cart.recentlyViewed);
    // console.log(recentlyViewed);

    useEffect(() => {
        const fetchLatestProducts = async () => {
            setLoading(true);
            try {
                // Default products API call
                const response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`);

                let productList = response.data;
                if (!Array.isArray(productList)) {
                    productList = response.data.data || [];
                }

                let latestProducts = productList.slice(-5);

                latestProducts = latestProducts.map(product => ({
                    ...product,
                    image01: product.image01 || "placeholder.jpg"
                }));

                setProducts(latestProducts);
                setDefaultProducts(latestProducts);
            } catch (error) {
                console.error("Error fetching latest products:", error);
            }
            setLoading(false);
        };

        fetchLatestProducts();
    }, []);

    // Search API Call
    const handleSearchChange = async (e) => {
        const query = e.target.value;
        setSearchTerm(query);

        if (query.trim() === "") {
            // Agar search empty ho to default products dikhao
            setProducts(defaultProducts);
            return;
        }

        try {
            const response = await axios.post(`${API_BASE_URL}/v1/search/searchProduct`, { query });
            console.log("search", response);

            let searchResults = response.data;
            if (!Array.isArray(searchResults)) {
                searchResults = response.data.data || [];
            }

            setProducts(searchResults);
        } catch (error) {
            console.error("Error searching products:", error);
        }
    };
    // const fetchFilteredProducts = async (category) => {
    //     try {
    //         setLoading(true);
    //         const response = await axios.post(`${API_BASE_URL}/v1/products/filter`, {
    //             title: category,  // Filtering by category "Ring"
    //         });

    //         if (response.status === 200) {
    //             setProducts(response.data.products); // Update products state
    //         }
    //     } catch (error) {
    //         console.error("Error fetching filtered products:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };
    const [openDropdown, setOpenDropdown] = useState(null);
    const [hideDropdowns, setHideDropdowns] = useState(false);
    const location = useLocation();

    const toggleDropdown = (item) => {
        setOpenDropdown(openDropdown === item ? null : item);
    };

    // Close desktop dropdowns when route changes
    useEffect(() => {
        setHideDropdowns(true);
        setOpenDropdown(null);
        // Re-enable hover after a brief delay (user has moved to new page)
        const timer = setTimeout(() => setHideDropdowns(false), 300);
        return () => clearTimeout(timer);
    }, [location.pathname]);

    return (
        <div className=" m-0 p-0 header_shadow">
            <section className='container-fluid text-center header_color py-1'>
                <Slider {...upBannerSlider}>
                    <div>
                        <h6>Exquisite Lab Grown diamond jewellery</h6>
                    </div>
                    <div>
                        <h6>Flat 10% off on diamond above 1 carat | Use Code: Nature10</h6>
                    </div>
                    <div>
                        <h6>Flat 20% off on making charges | Use Code: craft20</h6>
                    </div>
                    <div>
                        <h6>Tag SALT&GLITZ and Get Flat 4% off</h6>
                    </div>
                </Slider>
            </section>

            {/* Large device */}
            <section className='container-fluid pt-2 d-lg-block d-md-none d-none'>
                <div className='row'>
                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo text-center'>
                        {/* <i className="ri-search-line"></i> */}
                        {/* searchbar */}
                        <form action="" className='ps-4'>
                            <div className="bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#searchOffcanvas" aria-controls="searchOffcanvas">
                                    <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                                    <div className="input-group-append">
                                        <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><IoIosSearch /></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                        {/* <i className="ri-map-pin-line"></i>
                        <i className="ri-contacts-line"></i>
                        <form className='serach-box'>
                            <input type="text" className='serach' />
                            <div className="after"></div>
                            <input type="submit" className='serach'  />
                        </form>
                        <h4 className='serach-set'>&nbsp;</h4> */}

                    </div>
                    <div className='col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center align-items-center'>
                        <div>
                            <Link to="/" className="text-decoration-none fs-5 text-dark">
                                <img
                                    alt=''
                                    src='/assets/img/logo_website.png'
                                    className='img-fluid mx-auto d-block logo-fixed'
                                />

                                {/* SALT & GLITZ */}
                            </Link>
                        </div>
                    </div>
                    <div className='col-lg-3 col-md-3 col-sm-12 header_logo d-flex justify-content-end align-items-center'>
                        <div className="d-flex align-items-center gap-3">
                            <Link className='text-decoration-none text-dark' to="/contact">
                                <GrContactInfo className='fs-5' />
                                <span className='align-middle' style={{ fontSize: "14px", fontWeight: "500" }}>&nbsp; Contact us</span>
                            </Link>

                            <div className="dropdown drp_main">
                                <Link className="text-decoration-none text-dark dropdown-toggle" id="dropdownUserLink" role="button">
                                    <CiUser className='text-center fs-5' />
                                </Link>
                                <ul className="dropdown-menu drp_icon" aria-labelledby="dropdownUserLink">
                                    {isLoggedIn ? (
                                        <div className='p-2'>
                                            <p className="user-email px-3">{user ? user.email : 'Guest'}</p>
                                            <div className="underline mb-3 ms-3"></div>
                                            <ul className="profile-menu">
                                                <li className="mb-2">
                                                    <Link to="/Userprofile" className="profile-menu-item ms-2">
                                                        <MdAccountCircle className='me-2 fs-5' /> MY ACCOUNT
                                                    </Link>
                                                    {/* <Link to="/Userprofile" className="profile-menu-item">
                                                        <i className="ri-user-3-fill"></i> My Account
                                                    </Link> */}
                                                </li>
                                                <li>
                                                    <Link to="" className="profile-menu-item logout ms-2" onClick={handleLogout}>
                                                        <CiLogout className='me-2 fs-5' /> LOG OUT
                                                    </Link>
                                                </li>
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className='p-2 header_login'>
                                            <h5>Your Account</h5>
                                            <p className='m-0 pt-2'>Access account & manage your orders.</p>
                                            <li className="dropdown-item pt-3">
                                                <Link to="/loginn" className="pe-2">
                                                    <button className='btn'>Login</button>
                                                </Link>
                                                <Link to="/signup">
                                                    <button className='btn'>Signup</button>
                                                </Link>
                                            </li>
                                        </div>
                                    )}
                                </ul>
                            </div>

                            <Link className="text-decoration-none text-dark position-relative" to="/wishlist">
                                <CiHeart className="fs-4 position-relative" />
                                {(reduxWishlist.length > 0 || (wishlistLength && wishlistLength.length > 0)) && (
                                    <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
                                        {Math.max(reduxWishlist.length, wishlistLength?.length || 0)}
                                    </span>
                                )}
                            </Link>

                            <Link className="text-decoration-none text-dark position-relative" to="/cart">
                                <CiShoppingCart className="fs-4 position-relative" />
                                {(reduxTotalQuantity > 0 || tQuantity.totalQuantity > 0) && (
                                    <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
                                        {Math.max(reduxTotalQuantity, tQuantity.totalQuantity || 0)}
                                    </span>
                                )}
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* Small device */}
            <section className='container-fluid pt-2 d-md-block d-sm-block d-lg-none'>
                <div className='row align-items-center p-0 m-0'>
                    <div className='col-2 p-0 d-flex justify-content-start align-items-center gap-2'>
                        <CiMenuFries className="fs-3" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" />
                        <Link
                            className="text-decoration-none text-dark"
                            to={isLoggedIn ? "/Userprofile" : "/loginn"}
                        >
                            <CiUser className="pe-0 position-relative fs-5" />
                            {/* <i className="ri-user-line "></i> */}
                        </Link>

                        <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasTop" aria-labelledby="offcanvasTopLabel">
                            <div className="offcanvas-header mb-0">
                                <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                                {/* <h5 id="offcanvasExampleLabel" className='text-light'>.</h5> */}
                            </div>
                            <div className="offcanvas-body">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("rings")}
                                        >
                                            {/* <span className="nav-link">Rings</span> */}
                                            <Link className="nav-link active" to="/products/Ring" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Rings
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "rings" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "rings" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Ring/${"Engagement Rings".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className='me-2' // Added margin to the right
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>

                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"
                                                                        to={`/products/Ring/${"Dailywear Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"
                                                                        to={`/products/Ring/${"Office Wear Rings".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        office wear
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"
                                                                        to={`/products/Ring/${"Couple Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"
                                                                        to={`/products/Ring/${"Bands Rings".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close"
                                                                        to={`/products/Ring/${"Promise Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Ring/${"Solitaire Rings".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Party Wear Rings".replace(/ /g, "-")}`}
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Party Wear
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Ring?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Ring?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                                {/* <div className='col-lg-3 mb-2'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_MB.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_PC.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div> */}
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("earrings")}
                                        >
                                            <Link className="nav-link active" to="/products/Earring" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Earrings
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "earrings" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "earrings" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Earring/${"Studs Earring".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Studs
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Earring/${"Jhumkas Earring".replace(/ /g, "-")}`}
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Jhumkas
                                                                    </Link>
                                                                </li>

                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Hoops Earring".replace(/ /g, "-")}`} data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Hoops
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Sui Dhaga Earring".replace(/ /g, "-")}`}
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Sui Dhaga
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Earring/${"Drops Earring".replace(/ /g, "-")}`}
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Drops
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Mens Studs Earring".replace(/ /g, "-")}`}
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Men's Studs
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Earring?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Earring?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                                {/* <div className='col-lg-3 mb-2'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_Switch.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_DH.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div> */}
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("bracelet")}
                                        >
                                            <Link className="nav-link active" to="/products/Bracelet" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Bracelets & Bangles
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "bracelet" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "bracelet" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Bracelets</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link
                                                                        to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Chain Bracelet".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center"
                                                                        data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Chain Bracelet
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Tennis Bracelet".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Tennis Bracelet
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Bangles</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Light Weight Bangle".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Light Weight Bangle
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Bracelet?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Bracelet?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                                {/* <div className='col-lg-3 mb-2'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_SB.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_WC.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div> */}
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("mangalsutra")}
                                        >
                                            <Link className="nav-link active" to="/products/Mangalsutra" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Mangalsutras
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "mangalsutra" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "mangalsutra" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Bracelet Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Mangalsutra Bracelets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Hand Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Hand Mangalsutra
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Fancy Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Fancy
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Traditional Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Traditional
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Modern Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Modern
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                                {/* <div className='col-lg-3 mb-2'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_ME.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_TN.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div> */}
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("pendant")}
                                        >
                                            <Link className="nav-link active" to="/products/Pendant" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Necklaces & Pendants
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "pendant" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "pendant" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Necklaces</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Necklace/${"Lightweight Necklace".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Lightweight
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Necklace/${"Evil Eye Necklace".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Evil Eye
                                                                    </Link>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Pendents</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Pendent Set".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Pendent Set
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Heart Pendent".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Heart Pendent
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Alphabet Pendent".replace(/ /g, "-")}`} className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Alphabet Pendent
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Pendant?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Pendant?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("gifts")}
                                        >
                                            <Link className="nav-link active" to="" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Gifts
                                            </Link>
                                            <span className="me-2 dropdown_accordian_icon">{openDropdown === "gifts" ? "-" : "+"}</span>
                                        </div>
                                        <ul className={`dropdown-menu dropdown-content dropdown_accordian ${openDropdown === "gifts" ? "show" : ""}`}>
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Gifting
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            {/* <p className='pt-0 border-dropdown'>All Necklaces</p> */}
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        wife
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        daughter
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        mother
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        husband
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>

                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        son
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" data-bs-dismiss="offcanvas" aria-label="Close">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        father
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products?priceLimit=below10k" data-bs-dismiss="offcanvas" aria-label="Close">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products?priceLimit=10kTo20k" data-bs-dismiss="offcanvas" aria-label="Close">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products?priceLimit=20kTo30k" data-bs-dismiss="offcanvas" aria-label="Close">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products?priceLimit=30kTo50k" data-bs-dismiss="offcanvas" aria-label="Close">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products?priceLimit=50kTo75k" data-bs-dismiss="offcanvas" aria-label="Close">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products?priceLimit=above75k" data-bs-dismiss="offcanvas" aria-label="Close">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products?typeBy=male" data-bs-dismiss="offcanvas" aria-label="Close">FOR MEN</Link></li>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        {/* <Link className="nav-link active" to="" id="navbarDropdown" data-bs-dismiss="offcanvas" aria-label="Close">
                                            <i className="ri-subtract-line"></i>Trending
                                        </Link> */}
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("trending")}
                                        >
                                            <Link className="nav-link active" to="" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                Trending
                                            </Link>
                                            {/* <span className="me-2">{openDropdown === "trending" ? "-" : "+"}</span> */}
                                        </div>
                                    </li>
                                    <li className="nav-item dropdown dropdown_sm">
                                        {/* <Link className="nav-link active" to="/aboutUs" id="navbarDropdown" data-bs-dismiss="offcanvas" aria-label="Close">
                                            <i className="ri-subtract-line"></i>About Us
                                        </Link> */}
                                        <div
                                            className="d-flex justify-content-between align-items-center"
                                            style={{ cursor: "pointer" }}
                                            onClick={() => toggleDropdown("aboutus")}
                                        >
                                            <Link className="nav-link active" to="/aboutUs" data-bs-dismiss="offcanvas" aria-label="Close" >
                                                About Us
                                            </Link>
                                            {/* <span className="me-2">{openDropdown === "aboutus" ? "-" : "+"}</span> */}
                                        </div>
                                    </li>
                                </ul>
                            </div>
                            {/* <div className='btn_md'>
                                <Link to="/loginn" data-bs-dismiss="offcanvas"><button className='btn'><span>Log In</span></button></Link>
                                <Link to="/signup" data-bs-dismiss="offcanvas"><button className='btn mt-2'><span>Sign Up</span></button></Link>
                            </div> */}
                        </div>
                    </div>
                    <div className='col-8 d-flex justify-content-center align-items-center'>
                        <div>
                            <Link to="/" className="text-decoration-none fs-5 text-dark">
                                <img
                                    alt=''
                                    src='/assets/img/logo_website.png'
                                    className='img-fluid mx-auto d-block logo-fixed'
                                />
                            </Link>
                        </div>
                    </div>
                    {/* Right Side - Wishlist and Cart */}
                    <div className="col-2 p-0 d-flex justify-content-end align-items-center gap-2">
                        <Link className="text-decoration-none text-dark position-relative" to="/wishlist">
                            <CiHeart className="fs-3" />
                            {(reduxWishlist.length > 0 || (wishlistLength && wishlistLength.length > 0)) && (
                                <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
                                    {Math.max(reduxWishlist.length, wishlistLength?.length || 0)}
                                </span>
                            )}
                        </Link>

                        <Link className="text-decoration-none text-dark position-relative" to="/cart">
                            <CiShoppingCart className="fs-3" />
                            {(reduxTotalQuantity > 0 || tQuantity.totalQuantity > 0) && (
                                <span className="badge badge-icon badge_icon_w position-absolute start-100 translate-middle">
                                    {Math.max(reduxTotalQuantity, tQuantity.totalQuantity || 0)}
                                </span>
                            )}
                        </Link>
                    </div>
                    <form action="" className='py-3'>
                        <div className="bg-light rounded rounded-pill shadow-sm">
                            <div className="input-group" data-bs-toggle="offcanvas" data-bs-target="#mdsearchOffcanvas" aria-controls="mdsearchOffcanvas">
                                <input type="search" placeholder="What're you searching for?" aria-describedby="button-addon1" className="form-control border-0 bg-light" />
                                <div className="input-group-append">
                                    <button id="button-addon1" type="submit" className="btn btn-link search_btn_header"><IoIosSearch className='fs-5' /></button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </section>

            {/* Dropdown */}
            <section className='container-fluid d-lg-block d-md-none d-none'>
                <div className='row'>
                    <div>
                        <nav className={`navbar navbar-expand-lg navbar-light pt-0 pb-1${hideDropdowns ? ' hide-dropdowns' : ''}`}>
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item dropdown">
                                        <Link
                                            className="nav-link active"
                                            to="/products/Ring"
                                            id="rings"
                                        >
                                            Rings
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="rings">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Ring/${"Engagement Rings".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className='me-2' // Added margin to the right
                                                                        />
                                                                        ENGAGEMENT
                                                                    </Link>

                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Dailywear Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        DAILY WEAR
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Office Wear Rings".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        office wear
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Couple Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        COUPLE RINGS
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Bands Rings".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        bands
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Promise Rings".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        promise rings
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Ring/${"Solitaire Rings".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Solitaire
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Ring/${"Party Wear Rings".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Party Wear
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div> */}
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Ring?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Ring?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Ring?typeBy=male">FOR MEN</Link></li>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_MB.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_PC.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/products/Earring" id="earrings">
                                            Earrings
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="earrings">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Earring/${"Studs Earring".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Studs
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Earring/${"Jhumkas Earring".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Jhumkas
                                                                    </Link>
                                                                </li>

                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Hoops Earring".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Hoops
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Sui Dhaga Earring".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings8.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Sui Dhaga
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link className="d-flex align-items-center"
                                                                        to={`/products/Earring/${"Drops Earring".replace(/ /g, "-")}`}
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Drops
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center" to={`/products/Earring/${"Mens Studs Earring".replace(/ /g, "-")}`}>
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings9.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Men's Studs
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div> */}
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Earring?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Earring?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Earring?typeBy=male">FOR MEN</Link></li>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_Switch.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_DH.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active"
                                            to="/products/Bracelet"
                                            id="bracelet">
                                            Bracelets & Bangles
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="bracelet">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Bracelets</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link
                                                                        to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Chain Bracelet".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center"
                                                                    >
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Chain Bracelet
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Tennis Bracelet".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Tennis Bracelet
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Bangles</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/${"Bracelet".replace(/ /g, "-")}/${"Light Weight Bangle".replace(/ /g, "-")}`}
                                                                        className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Light Weight Bangle
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div> */}
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Bracelet?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Bracelet?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Bracelet?typeBy=male">FOR MEN</Link></li>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_SB.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_WC.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/products/Mangalsutra" id="solitaires">
                                            Mangalsutras
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="solitaires">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Bracelet Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Mangalsutra Bracelets
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Hand Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Hand Mangalsutra
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Fancy Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Fancy
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Traditional Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings4.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Traditional
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Mangalsutra/${"Modern Mangalsutra".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Modern
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            round
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pear
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            heart
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            princess
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            oval
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            cushion
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            emerald
                                                        </Link>
                                                    </li>
                                                </div> */}
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Mangalsutra?typeBy=male">FOR MEN</Link></li>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_ME.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_TN.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/products/Pendant" id="moreJewellery">
                                            Necklaces & Pendants
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="moreJewellery">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Shop By Style
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Necklaces</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Necklace/${"Lightweight Necklace".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Lightweight
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Necklace/${"Evil Eye Necklace".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        Evil Eye
                                                                    </Link>
                                                                </li>

                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <p className='pt-0 border-dropdown'>All Pendents</p>
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Pendent Set".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings1.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        Pendent Set
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Heart Pendent".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings2.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Heart Pendent
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link to={`/products/Pendant/${"Alphabet Pendent".replace(/ /g, "-")}`} className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings3.jpg'
                                                                            className=' me-2'
                                                                        />
                                                                        Alphabet Pendent
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                {/* <div className='col-lg-2 category_metal'>
                                                    <h6 to="" className='border-dropdown'>SHOP BY METAL & STONE</h6>
                                                    <div className="underline mb-3"></div>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal1.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal2.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            diamond
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal3.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            Gemstone
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal4.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            navratna
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal5.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            pearl
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal6.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            yellow gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal7.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            rose gold
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link to="/earrings" className="d-flex align-items-center">
                                                            <img
                                                                alt='Jewelry Style'
                                                                src='/assets/img/metal8.png'
                                                                className='img-fluid me-2'
                                                            />
                                                            white gold
                                                        </Link>
                                                    </li>
                                                </div> */}
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products/Pendant?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products/Pendant?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products/Pendant?typeBy=male">FOR MEN</Link></li>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_LN.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_IN.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="gifts">
                                            Gifts
                                        </Link>
                                        <ul className="dropdown-menu dropdown-content" aria-labelledby="gifts">
                                            <div className='row'>
                                                <div className='col-lg-4 category_jwellery'>
                                                    <h6 className='border-dropdown'>Gifting
                                                        <div className="underline mb-3"></div>
                                                    </h6>
                                                    <div className='row'>
                                                        <div className='col-lg-6'>
                                                            {/* <p className='pt-0 border-dropdown'>All Necklaces</p> */}
                                                            <ul className='ps-0'>
                                                                <li>
                                                                    <Link to="/earrings" className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings6.jpg'
                                                                            className=' me-2' // Added margin to the right
                                                                        />
                                                                        wife
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        daughter
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        mother
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        husband
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                        <div className='col-lg-6'>
                                                            <ul className='ps-0'>

                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        son
                                                                    </Link>
                                                                </li>
                                                                <li>
                                                                    <Link className="d-flex align-items-center">
                                                                        <img
                                                                            alt='Jewelry Style'
                                                                            src='/assets/img/rings7.jpg'
                                                                            className='me-2'
                                                                        />
                                                                        father
                                                                    </Link>
                                                                </li>
                                                            </ul>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className='col-lg-2 shop_by'>
                                                    <h6 to="" className='border-dropdown'>Shop By</h6>
                                                    <div className="underline mb-3"></div>

                                                    <li><Link to="/products?priceLimit=below10k">Under ₹ 10k</Link></li>
                                                    <li><Link to="/products?priceLimit=10kTo20k">₹10k to ₹20k</Link></li>
                                                    <li><Link to="/products?priceLimit=20kTo30k">₹20k to ₹30k</Link></li>
                                                    <li><Link to="/products?priceLimit=30kTo50k">₹30k to ₹50k</Link></li>
                                                    <li><Link to="/products?priceLimit=50kTo75k">₹50k to ₹75k</Link></li>
                                                    <li><Link to="/products?priceLimit=above75k">Above ₹ 75k</Link></li>
                                                    <li><Link to="/products?typeBy=male">FOR MEN</Link></li>
                                                </div><div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/03_MAR/Banner/hamburger/03/egold_d.png' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                                <div className='col-lg-3'>
                                                    <img alt='' src='https://cdn.caratlane.com/media/static/images/V4/2025/CL/02-FEB/Banner/New_Website/MenuBar/Desktop_01/MenuBar_Desktop_Ww.jpg' className='img-fluid' style={{ borderRadius: "10px" }}></img>
                                                </div>
                                            </div>
                                        </ul>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="" id="navbarDropdown">
                                            Trending
                                        </Link>
                                    </li>
                                    <li className="nav-item dropdown">
                                        <Link className="nav-link active" to="/aboutUs" id="navbarDropdown">
                                            About Us
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>

            {/*LARGE OFFCANVAS */}
            <div className="offcanvas offcanvas-start offcanvas_start_search" tabIndex="-1" id="searchOffcanvas" aria-labelledby="offcanvasSearchLabel">
                <div className="offcanvas-header offcanvas_header_search">
                    <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
                        <form action="" className="pt-3" onSubmit={(e) => e.preventDefault()}>
                            <div className="bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="What're you searching for?"
                                        className="form-control border-0 bg-light"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-link search_btn_header">
                                            <IoIosSearch className="fs-5" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </h5>
                    <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h5 className='trending_title'>Search Results</h5>
                    {loading ? (
                        <Shimmer />
                    ) : (
                        <div className="row offcanvas_search">
                            {searchTerm.trim() === "" ? (
                                // Jab tak search nahi kiya, tab tak default products dikhaye
                                defaultProducts.map((item) => (
                                    <div className="col-lg-6 px-4 " key={item.product_id}>
                                        <div className="search-item ">
                                            <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className="text-decoration-none text-dark" data-bs-dismiss="offcanvas" aria-label="Close">
                                                <div className="left">
                                                    <img
                                                        src={item.goldImages?.[0] || item.image01}
                                                        alt={item.title}
                                                        className="img-fluid search_offcanvas_arrow"
                                                        onError={(e) => {
                                                            e.target.onerror = null;
                                                            e.target.style.display = "none";
                                                            e.target.parentElement.innerHTML = `
                                                            <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 95px; width: 100px;">
                                                                <span class='exlimation_mark'>!</span>
                                                            </div>`;
                                                        }}
                                                    />
                                                    <span>{item.title}</span>
                                                </div>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                // Search hone ke baad search results dikhaye
                                filteredProducts.length > 0 ? (
                                    filteredProducts.map((item) => (
                                        <div className="col-lg-6 px-4" key={item._id}>
                                            <div className="search-item">
                                                <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item._id}`} className="text-decoration-none text-dark" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <div className="left">
                                                        <img
                                                            src={item.image01}
                                                            alt={item.title}
                                                            className="img-fluid search_offcanvas_arrow"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.style.display = "none";
                                                                e.target.parentElement.innerHTML = `
                                                    <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 95px; width: 100px;">
                                                        <span class='exlimation_mark'>!</span>
                                                    </div>`;
                                                            }}
                                                        />
                                                        <span>{item.title}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p>No products found.</p>
                                )
                            )}
                        </div>
                    )}
                    <h5 className="trending_title pt-4 pb-5">Recently Viewed</h5>
                    <div className="row position-relative">
                        {recentlyViewed.length > 0 ? (
                            <>
                                {/* Prev Button */}
                                {currentIndex > 0 && (
                                    <div>
                                        <button
                                            onClick={() => search?.current?.slickPrev()}
                                            className="pre-btn-set"
                                        >
                                            <i className="ri-arrow-left-wide-line"></i>
                                        </button>
                                    </div>
                                )}

                                <Slider ref={search} {...slider_search}>
                                    {recentlyViewed.map((item) => (
                                        <div
                                            className="card border-0 w-100 mx-auto d-block px-1"
                                            key={item.id}
                                        >
                                            <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.id}`} data-bs-dismiss="offcanvas" aria-label="Close">
                                                <img
                                                    alt={item.title}
                                                    src={item.images?.[0]}
                                                    className="img-fluid position-relative"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = "none";
                                                        e.target.parentElement.innerHTML = `
                                                        <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 190px;">
                                                            <span class='exlimation_mark'>!</span>
                                                        </div>`;
                                                    }}
                                                />
                                            </Link>
                                            <div className="card-body cartlane px-1">
                                                <h6>
                                                    {formatCurrency(item.total14KT)}{" "}
                                                    {/* <span>
                                                        <del>{formatCurrency(item.delprice)}</del>
                                                    </span> */}
                                                </h6>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                                {/* Next Button */}
                                {currentIndex < recentlyViewed.length - slider_search.slidesToShow && (
                                    <div>
                                        <button
                                            onClick={() => search?.current?.slickNext()}
                                            className="next-btn-set float-end"
                                        >
                                            <i className="ri-arrow-right-wide-line"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center w-100 pt-5">
                                <p>You haven't viewed any products yet. Start exploring now!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/*MD OFFCANVAS */}
            <div className="offcanvas offcanvas-bottom rounded-0" tabIndex="-1" id="mdsearchOffcanvas" aria-labelledby="mdoffcanvasSearchLabel">
                <div className="offcanvas-header offcanvas_header_search">
                    <h5 className="offcanvas-title w-100 pe-3" id="offcanvasSearchLabel">
                        <form action="" className='pt-3' onSubmit={(e) => e.preventDefault()}>
                            <div className=" bg-light rounded rounded-pill shadow-sm">
                                <div className="input-group">
                                    <input
                                        type="search"
                                        placeholder="What're you searching for?"
                                        className="form-control border-0 bg-light"
                                        value={searchTerm}
                                        onChange={handleSearchChange}
                                    />
                                    <div className="input-group-append">
                                        <button type="submit" className="btn btn-link search_btn_header">
                                            {/* <i className="fa fa-search"></i> */}
                                            <IoIosSearch className='fs-5' />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </h5>
                    <button type="button" className="btn-close btn_close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div className="offcanvas-body">
                    <h5 className='trending_title'>Search Results</h5>
                    <div className='row offcanvas_search'>
                        {loading ? (
                            <Shimmer />
                        ) : (
                            <div className="row offcanvas_search">
                                {searchTerm.trim() === "" ? (
                                    // Jab tak search nahi kiya, tab tak default products dikhaye
                                    defaultProducts.map((item) => (
                                        <div className="col-lg-6 px-4" key={item.product_id}>
                                            <div className="search-item">
                                                <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className="text-decoration-none text-dark" data-bs-dismiss="offcanvas" aria-label="Close">
                                                    <div className="left">
                                                        <img
                                                            src={item.goldImages?.[0] || item.image01}
                                                            alt={item.title}
                                                            className="img-fluid search_offcanvas_arrow"
                                                            onError={(e) => {
                                                                e.target.onerror = null;
                                                                e.target.style.display = "none";
                                                                e.target.parentElement.innerHTML = `
                                                            <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 95px; width: 100px;">
                                                                <span class='exlimation_mark'>!</span>
                                                            </div>`;
                                                            }}
                                                        />
                                                        <span>{item.title}</span>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // Search hone ke baad search results dikhaye
                                    filteredProducts.length > 0 ? (
                                        filteredProducts.map((item) => (
                                            <div className="col-lg-6 px-4" key={item._id}>
                                                <div className="search-item">
                                                    <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item._id}`} className="text-decoration-none text-dark" data-bs-dismiss="offcanvas" aria-label="Close">
                                                        <div className="left">
                                                            <img
                                                                src={item.image01}
                                                                alt={item.title}
                                                                className="img-fluid search_offcanvas_arrow"
                                                                onError={(e) => {
                                                                    e.target.onerror = null;
                                                                    e.target.style.display = "none";
                                                                    e.target.parentElement.innerHTML = `
                                                    <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 95px; width: 100px;">
                                                        <span class='exlimation_mark'>!</span>
                                                    </div>`;
                                                                }}
                                                            />
                                                            <span>{item.title}</span>
                                                        </div>
                                                    </Link>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p>No products found.</p>
                                    )
                                )}
                            </div>
                        )}
                    </div>
                    <h5 className="trending_title pt-4">Recently Viewed</h5>
                    <div className="row position-relative">
                        {recentlyViewed.length > 0 ? (
                            <>
                                {/* Prev Button */}
                                {currentIndex > 0 && (
                                    <div>
                                        <button
                                            onClick={() => searchmd?.current?.slickPrev()}
                                            className="pre-btn-set"
                                        >
                                            <i className="ri-arrow-left-wide-line"></i>
                                        </button>
                                    </div>
                                )}

                                <Slider ref={searchmd} {...slider_search_md}>
                                    {recentlyViewed.map((item) => (
                                        <div
                                            className="card border-0 w-100 mx-auto d-block"
                                            key={item.id}
                                        >
                                            <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.id}`} data-bs-dismiss="offcanvas" aria-label="Close">
                                                <img
                                                    alt={item.title}
                                                    src={item.images?.[0]}
                                                    className="img-fluid px-2 position-relative"
                                                    onError={(e) => {
                                                        e.target.onerror = null;
                                                        e.target.style.display = "none";
                                                        e.target.parentElement.innerHTML = `
                                                        <div class='no-image-placeholder-cart d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 190px;">
                                                            <span class='exlimation_mark'>!</span>
                                                        </div>`;
                                                    }}
                                                />
                                            </Link>
                                            <div className="card-body cartlane">
                                                <h6>
                                                    {formatCurrency(item.total14KT)}{" "}
                                                    {/* <span>
                                                        <del>{formatCurrency(item.delprice)}</del>
                                                    </span> */}
                                                </h6>
                                                <p>{item.title}</p>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>

                                {/* Next Button */}
                                {currentIndex < recentlyViewed.length - slider_search_md.slidesToShow && (
                                    <div>
                                        <button
                                            onClick={() => searchmd?.current?.slickNext()}
                                            className="next-btn-set float-end"
                                        >
                                            <i className="ri-arrow-right-wide-line"></i>
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <div className="text-center w-100 pt-5">
                                <p>You haven't viewed any products yet. Start exploring now!</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;