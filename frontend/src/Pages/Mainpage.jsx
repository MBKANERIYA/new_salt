import API_BASE_URL from '../Utils/apiConfig.js';
// import React, { useEffect, useState } from 'react'
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick'
// import products from '../fakedata/Product';
// import { formatCurrency } from '../Utils/formateCurrency';

// const Mainpage = () => {
//   const getSlidesToShow = () => {
//     const width = window.innerWidth;
//     if (width >= 1200) {
//       return 4;
//     } else if (width >= 992) {
//       return 3;
//     } else if (width >= 576) {
//       return 2;
//     } else {
//       return 1;
//     }
//   };

//   const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());

//   useEffect(() => {
//     const handleResize = () => {
//       setSlidesToShow(getSlidesToShow());
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     window.scrollTo(0, 0);
//   }, []);

//   const solitaire = React.useRef(null);
//   const arrvial = React.useRef(null);

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//   };
//   const settings1 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     arrows: true,
//   };

//   const settings2 = {
//     dots: false,
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 6000,
//     slidesToShow: slidesToShow,
//     slidesToScroll: 1,
//     arrows: true,
//   };
//   return (
//     <>
//       {/* <h1>Scheduled Task at 3:00 AM IST</h1>
//       <ScheduledTask /> */}
//       <section className='container-fluid d-lg-none d-md-none d-block'>
//         <div className='row'>
//           <div className='div_img'>
//             <div className='img_carousel'>
//               <img alt='Latest' src='assets/img/carousel1.webp' className='img-fluid item3' />
//               <h5>Latest</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Best Sellers' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_bestseller.png' className='img-fluid item3' />
//               <h5>Best Sellers</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Rings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/App/mobile_rings_1.png' className='img-fluid item3' />
//               <h5>Rings</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_earrings.png' className='img-fluid item3' />
//               <h5>Earrings</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_mangalsutra.png' className='img-fluid item3' />
//               <h5>Mangalsutras</h5>
//             </div>
//             <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_necklace.png' className='img-fluid item3' />
//               <h5>Necklaces</h5>
//             </div> <div className='img_carousel'>
//               <img alt='Earrings' src='https://cdn.caratlane.com/media/static/images/V4/2024/CL/11_NOV/Topmenu/mobile/mobile_gifts.png' className='img-fluid item3' />
//               <h5>Wedding Gifs</h5>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className='container-fluid m-0 p-0 mb-5'>
//         <Slider {...settings}>
//           <div>
//             <img alt='' src='assets/img/banner1.jpg' className='img-fluid  banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='https://www.tanishq.co.in/dw/image/v2/BKCK_PRD/on/demandware.static/-/Library-Sites-TanishqSharedLibrary/default/dw00ae15cf/homepage/HeroBanner/fod-plp-desktop.jpg' className='img-fluid banner_class'></img>
//           </div>
//           <div>
//             <img alt='' src='assets/img/banner2.jpg' className='img-fluid  banner_class'></img>
//           </div>
//         </Slider>
//       </section>
//       <section className='container pb-5 pt-3'>
//         <div>
//           <h3 className='font_main text-center pb-3'>Solitaire</h3>
//           <div className='row position-relative'>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => solitaire?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
//             </div>
//             <div className=''>
//               <Slider ref={solitaire} {...settings1}>
//                 {products.map((item) => (
//                   <div className='card border-0' key={item.id}>
//                     <Link to={`/productDetail/${item.id}`}>
//                       <img alt={item.title} src={item.image01} className='img-fluid px-2' />
//                     </Link>
//                     <div className='card-body'>
//                       <h6>{item.title}</h6>
//                       <p>
//                         {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               <Link to="/earrings" className='text-decoration-none'>
//                 <button className='btn mx-auto d-block viewall_btn'>
//                   <span>View All</span>
//                 </button>
//               </Link>

//             </div>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => solitaire?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container pb-5 shop_category'>
//         <div>
//           <div className='text-center'>
//             <h3 className='font_main pb-1 m-0 p-0'>Shop by Category</h3>
//             <p className='p_main pb-3'>Brilliant design and unparalleled craftsmanship.</p>
//           </div>
//           <div className='row'>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_22?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Necklaces & Pendants</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_3?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Earrings</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_23?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Bracelets</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_34?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Rings</h5>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_25?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Eangagement Rings</h5>
//                   {/* <p>Shop Now &gt;</p> */}
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-2 col-md-4 col-sm-6 col-6 p-0 px-2'>
//               <div className='card border-0'>
//                 <img alt='' src='https://media.tiffany.com/is/image/tiffanydm/2024_HOLIDAY_BG_2X2_PROD_20?$tile$&&fmt=webp' className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Home</h5>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       {/* Product Section */}
//       <section className='container'>
//         <div>
//           <h3 className='font_main text-center pb-4'>New Arrivals</h3>
//           <div className='row position-relative'>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => arrvial?.current?.slickPrev()} className='prev_btn absoluteSlider' ><i className="ri-arrow-left-wide-line"></i></button>
//             </div>
//             <div className=''>
//               <Slider ref={arrvial} {...settings2}>
//                 {products.map((item) => (
//                   <div className='card border-0' key={item.id}>
//                     <Link to={`/productDetail/${item.id}`}>
//                       <img alt={item.title} src={item.image01} className='img-fluid px-2' />
//                     </Link>
//                     <div className='card-body'>
//                       <h6 className=''>{item.title}</h6>
//                       <p>
//                         {formatCurrency(item.price)} <span><del>{formatCurrency(item.delprice)}</del></span>
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </Slider>
//               <Link to="/earrings" className='text-decoration-none'>
//                 <button className='btn mx-auto d-block viewall_btn'>
//                   <span>View All</span>
//                 </button>
//               </Link>
//             </div>
//             <div className='d-lg-block d-md-block d-sm-block d-none'>
//               <button onClick={() => arrvial?.current?.slickNext()} className="next_btn absolute1"><i className="ri-arrow-right-wide-line"></i></button>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container-fluid my-5'>
//         <div>
//           <div className='row p-0 m-0'>
//             <div className='col-lg-6 col-md-6 col-sm-6 col-12 pe-0 m-0'>
//               <img alt='' src='assets/img/Responsive_1.webp' className='img-fluid h-100 festival_img1'></img>
//             </div>
//             <div className='col-lg-6 col-md-6 col-sm-6 col-12 ps-0 m-0'>
//               <img alt='' src='assets/img/Responsive_2.webp' className='img-fluid pb-1 festival_img2'></img>
//               <img alt='' src='assets/img/Responsive_3.webp' className='img-fluid  pt-3 festival_img3'></img>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container my-5 pt-5 gift_sec_main'>
//         <div>
//           <div className='row'>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//             <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
//               <div className='card border-0'>
//                 <img alt='' src="assets/img/gift_img.webp" className='img-fluid'></img>
//                 <div className='card-body text-center'>
//                   <h5>Gifts for the Graduate</h5>
//                   <p className='line_hover'>Shop Now &nbsp; &gt;</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container my-5 service_main'>
//         <div>
//           <div className='row service_p'>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-truck-line fs-2"></i>
//               <h6 className=''>Complementary Shiping & Returns</h6>
//               <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
//               <span className='line_hover'>Learn More &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-window-line fs-2"></i>
//               <h6 className=''>Tiffany At Your Service</h6>
//               <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
//               <span className='line_hover'>Contact Us &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-calendar-line fs-2"></i>
//               <h6 className=''>Book An Appointment</h6>
//               <p className='m-0 pb-1'>We’re happy to help with in-store or virtual appointments.</p>
//               <span className='line_hover'>Book Now &nbsp; &gt;</span>
//             </div>
//             <div className='col-lg-3 col-md-6 col-sm-12 col-12 text-center'>
//               <i className="ri-mail-send-line fs-2"></i>
//               <h6 className=''>The Iconic Blue Box</h6>
//               <p className='m-0 pb-1'>Your Tiffany purchase comes wrapped in our Blue Box packaging.</p>
//               <span className='line_hover'>Explore All Gifts &nbsp; &gt;</span>
//             </div>
//           </div>
//         </div>
//       </section>
//       <section className='container-fluid p-0 m-0'>
//         <div>
//           <img alt='' src='assets/img/gift_banner.webp' className='img-fluid'></img>
//         </div>
//       </section>
//       {/* <section className='container-fluid p-0 m-0'>
//         <div>
//           <img alt='' src='assets/img/diamond_banner.webp' className='img-fluid'></img>
//         </div>
//       </section> */}
//     </>
//   )
// }

// export default Mainpage

import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Slider from 'react-slick'
import { formatCurrency } from '../Utils/formateCurrency';
import axios from 'axios';
import { CiDeliveryTruck, CiCalendar, CiGift } from "react-icons/ci";
import { LuConciergeBell } from "react-icons/lu";
import Shimmer from '../ShimmerEffect/shimmer';
import Helmet from '../Components/Helmet';
import { FaExchangeAlt } from "react-icons/fa";
import { MdCalendarToday } from "react-icons/md";
import { AiOutlineSafetyCertificate } from "react-icons/ai";
import { TbArrowsExchange } from "react-icons/tb";
// import ScheduledTask from '../ScheduledTask';

const Mainpage = () => {
  const getSlidesToShow = () => {
    const width = window.innerWidth;
    if (width >= 1200) {
      return 4;
    } else if (width >= 992) {
      return 3;
    } else if (width >= 576) {
      return 2;
    } else {
      return 1;
    }
  };

  const solitaire = React.useRef(null);
  const arrvial = React.useRef(null);
  const [slidesToShow, setSlidesToShow] = useState(getSlidesToShow());
  const [products, setProducts] = useState([]);
  const [solitaires, setSolitaires] = useState([]);
  const [banners, setBanners] = useState([]);
  const [bottomBanners, setBottomBanners] = useState([]);
  const [gifts, setGifts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filterCategory, setFilterCategory] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  // const [solitaire, setSolitaires] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);
  const navigate = useNavigate(); // Initialize useNavigate

  // Window refresh
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Local fallback banners when database images are broken/empty
  const LOCAL_BANNERS = [
    {
      bannerImage: '/assets/img/hero_banner_1.png',
      mobileBannerImage: '/assets/img/hero_banner_1.png',
      banner_id: 'local_1'
    },
    {
      bannerImage: '/assets/img/hero_banner_2.png',
      mobileBannerImage: '/assets/img/hero_banner_2.png',
      banner_id: 'local_2'
    },
    {
      bannerImage: '/assets/img/hero_banner_3.png',
      mobileBannerImage: '/assets/img/hero_banner_3.png',
      banner_id: 'local_3'
    },
    {
      bannerImage: '/assets/img/hero_banner_4.png',
      mobileBannerImage: '/assets/img/hero_banner_4.png',
      banner_id: 'local_4'
    },
  ];

  const LOCAL_BOTTOM_BANNERS = [
    { bannerImage: '/assets/img/b1.mp4' },  // 0 — Top grid left
    { bannerImage: '/assets/img/b2.png' },  // 1 — Top grid right-top
    { bannerImage: '/assets/img/b3.png' },  // 2 — Top grid right-bottom
    { bannerImage: '/assets/img/c1.mp4' },  // 3 — Bottom grid left
    { bannerImage: '/assets/img/c2.png' },  // 4 — Bottom grid right-top
    { bannerImage: '/assets/img/c3.png' },  // 5 — Bottom grid right-bottom
    { bannerImage: '/assets/img/di1.png' }, // 6 (Web promo)
    { bannerImage: '/assets/img/di2.png' }, // 7 (Mobile promo)
    { bannerImage: '/assets/img/p1.png' }, // 8 (Web promo)
    { bannerImage: '/assets/img/p2.png' }, // 9 (Mobile promo)
  ];

  const LOCAL_CATEGORIES = [
    { categoryName: 'Necklaces & Pendants', categoryImage: '/assets/img/cat_necklaces.png' },
    { categoryName: 'Earrings', categoryImage: '/assets/img/cat_earrings.png' },
    { categoryName: 'Bracelets', categoryImage: '/assets/img/cat_bracelets.png' },
    { categoryName: 'Rings', categoryImage: '/assets/img/cat_rings.png' },
    { categoryName: 'Engagement Rings', categoryImage: '/assets/img/cat_engagement.png' },
    { categoryName: 'Home', categoryImage: '/assets/img/cat_home.png' }
  ];

  const LOCAL_FILTER_CATEGORIES = [
    { filterCategoryName: 'Gifts for Her', filterCategoryImage: '/assets/img/filter_gifts_her.png', filterLink: '/products?typeBy=female' },
    { filterCategoryName: 'Gifts for Him', filterCategoryImage: '/assets/img/filter_gifts_him.png', filterLink: '/products?typeBy=male' },
    { filterCategoryName: 'Anniversary', filterCategoryImage: '/assets/img/filter_anniversary.png', filterLink: '/products/Ring?occasionBy=COUPLE' },
    { filterCategoryName: 'Wedding', filterCategoryImage: '/assets/img/filter_wedding.png', filterLink: '/products/Ring?occasionBy=ENGAGEMENT' },
    { filterCategoryName: 'Birthday', filterCategoryImage: '/assets/img/filter_birthday.png', filterLink: '/products?sortBy=newestFirst' },
    { filterCategoryName: 'Under ₹50,000', filterCategoryImage: '/assets/img/filter_under500.png', filterLink: '/products?priceLimit=below50k' }
  ];

  const LOCAL_GIFTS = [
    { gift_id: 'g1', giftName: 'Gifts for the Graduate', giftImage: '/assets/img/gift_wrap_1.png' },
    { gift_id: 'g2', giftName: 'Gifts for the Graduate', giftImage: '/assets/img/gift_wrap_2.png' },
    { gift_id: 'g3', giftName: 'Gifts for the Graduate', giftImage: '/assets/img/gift_wrap_3.png' }
  ];

  const fetchHome = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/v1/homePage/home`);
      console.log("API Response:", response.data); // Debugging

      // Use local arrays (DB image URLs are broken)
      setBanners(LOCAL_BANNERS);
      setBottomBanners(LOCAL_BOTTOM_BANNERS);
      setGifts(LOCAL_GIFTS);
      setCategories(LOCAL_CATEGORIES);
      setFilterCategory(LOCAL_FILTER_CATEGORIES);
      setNewArrivals(response.data.newArrivals || []);
      setSolitaires(response.data.solitire || []);
    } catch (err) {
      console.error("Error fetching banners:", err.message);
      // On API failure, use local arrays so homepage isn't empty
      setBanners(LOCAL_BANNERS);
      setBottomBanners(LOCAL_BOTTOM_BANNERS);
      setGifts(LOCAL_GIFTS);
      setCategories(LOCAL_CATEGORIES);
      setFilterCategory(LOCAL_FILTER_CATEGORIES);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchHome();
  }, [])

  // Note: Banners are already fetched by fetchHome() above via /v1/homePage/home

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`);
        // console.log(response.data);
        setProducts(response.data); // Set products in state
      } catch (err) {
        console.error("Error fetching products:", err);
        // setError("Failed to load products.");
      } finally {
        setLoading(false); // Stop loader
      }
    };

    fetchProducts();
  }, []);

  // ------------------------------------------Category wise product fetch------------------------------
  // useEffect(() => {
  //   const fetchSolitaire = async () => {
  //     try {
  //       const response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`);
  //       // console.log(response);

  //       const ringProducts = response.data.filter(item => item.subCategory === "Solitaire Rings"); // Filter rings only
  //       // console.log(ringProducts);
  //       setSolitaires(ringProducts);
  //     } catch (err) {
  //       console.error("Error fetching products:", err);
  //       // setError("Failed to load products.");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchSolitaire();
  // }, []);

  // Slider
  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getSlidesToShow());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const mobileBanners = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 7000,
  };

  var webBanners = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 7000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const graduate = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1.1,
    slidesToScroll: 1,
    arrows: false,
  };

  const solitaireSlider = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 2000, // For small screens
        settings: {
          slidesToShow: 5, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1198, // For small screens
        settings: {
          slidesToShow: 4.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991, // For small screens
        settings: {
          slidesToShow: 3.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 601, // For small screens
        settings: {
          slidesToShow: 2.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For small screens
        settings: {
          slidesToShow: 2.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375, // For small screens
        settings: {
          slidesToShow: 1.5, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
    ],
  };

  const newarrivals = {
    dots: false,
    infinite: false,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 2000, // For small screens
        settings: {
          slidesToShow: 5, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 1198, // For small screens
        settings: {
          slidesToShow: 4.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 991, // For small screens
        settings: {
          slidesToShow: 3.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 601, // For small screens
        settings: {
          slidesToShow: 2.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480, // For small screens
        settings: {
          slidesToShow: 2.2, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 375, // For small screens
        settings: {
          slidesToShow: 1.5, // Show 2 full slides and part of the 3rd
          slidesToScroll: 1,
        },
      },
    ],
  };

  // Product Click and open productdetails page
  const handleProductClick = (id, title) => {
    const slug = title ? title.replace(/[\s/]+/g, '-').toLowerCase() : id;
    navigate(`/Productdetails/${slug}`);
  };
  return (
    <Helmet title="Home">
      <>
        {/* <h1>Scheduled Task at 3:00 AM IST</h1>
        <ScheduledTask /> */}

        {/* Mobile Category */}
        <section className='container-fluid d-lg-none d-md-none d-block'>
          <div className='row'>
            <div className='div_img'>
              {categories.map((item, index) => (
                <Link
                  to={`/products/${item.categoryName.replace(/ /g, "-")}`}
                  key={index}
                  className='img_carousel text-decoration-none'
                >
                  <img
                    alt={item.categoryName}
                    src={item.categoryImage}
                    className='img-fluid item3'
                    style={{ borderRadius: "10px", objectFit: "cover" }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.style.display = "none";

                      if (e.target.parentElement) {
                        e.target.parentElement.innerHTML = `
                  <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                    <span class='exlimation_mark'>!</span>
                  </div>`;
                      }
                    }}
                  />
                  <h5 className="text-center text-dark">{item.categoryName}</h5>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Web Banners */}
        <section className="container-fluid mb-5 d-lg-block d-md-block d-none">
          <Slider {...webBanners}>
            {['/assets/img/d1.png', '/assets/img/d2.mp4', '/assets/img/d3.png'].map((src, index) => (
              <div key={index}>
                <Link to="products">
                  {src.endsWith('.mp4') ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="img-fluid banner_class"
                      style={{ borderRadius: "10px", objectFit: "contain", width: "100%" }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      alt={`Banner ${index + 1}`}
                      src={src}
                      className="img-fluid banner_class"
                      style={{ borderRadius: "10px", objectFit: "contain", width: "100%" }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </Slider>
        </section>


        {/* Mobile Banners */}
        <section className="container-fluid d-lg-none d-md-none d-block mb-5">
          <Slider {...mobileBanners}>
            {['/assets/img/m1.png', '/assets/img/m2.mp4', '/assets/img/m3.png'].map((src, index) => (
              <div key={index}>
                <Link to="products">
                  {src.endsWith('.mp4') ? (
                    <video
                      autoPlay
                      muted
                      loop
                      playsInline
                      className="img-fluid banner_class"
                      style={{ borderRadius: "10px", objectFit: "contain", width: "100%" }}
                    >
                      <source src={src} type="video/mp4" />
                    </video>
                  ) : (
                    <img
                      alt={`Banner ${index + 1}`}
                      src={src}
                      className="img-fluid banner_class"
                      style={{ borderRadius: "10px", objectFit: "contain", width: "100%" }}
                    />
                  )}
                </Link>
              </div>
            ))}
          </Slider>
        </section>

        {/* topBanner */}
        <section className="container-fluid my-3">
          <div className="row g-3 align-items-stretch">
            {/* Left Side Banner (Single Image/Video) */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex banner-grid-left">
              {bottomBanners.length > 0 && (
                <div className="w-100">
                  {bottomBanners[0] && (
                    bottomBanners[0].bannerImage.endsWith(".mp4") ||
                      bottomBanners[0].bannerImage.endsWith(".mkv") ||
                      bottomBanners[0].bannerImage.endsWith(".avi") ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="img-fluid w-100 h-100"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      >
                        <source src={bottomBanners[0].bannerImage} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        alt="Bottom Banner 1"
                        src={bottomBanners[0].bannerImage}
                        className="img-fluid w-100 h-100"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* Right Side Banners (Two Images, Equal Spacing) */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column gap-3 banner-grid-right">
              {bottomBanners.length > 1 && (
                <img
                  alt="Bottom Banner 2"
                  src={bottomBanners[1]?.bannerImage}
                  className="img-fluid w-100"
                  style={{ flex: 1, objectFit: "cover", borderRadius: "10px" }}
                />
              )}
              {bottomBanners.length > 2 && (
                <img
                  alt="Bottom Banner 3"
                  src={bottomBanners[2]?.bannerImage}
                  className="img-fluid w-100"
                  style={{ flex: 1, objectFit: "cover", borderRadius: "10px" }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Solitaire */}
        {/* <section className='container pb-5 pt-3'>
          <div>
            <h3 className='font_main text-center pb-3'>Solitaire</h3>
            <div className='row position-relative'>
              <div className='d-lg-none d-block'>
                <button
                  onClick={() => solitaire?.current?.slickPrev()}
                  className="pre-btn-set "
                >
                  <i className="ri-arrow-left-wide-line"></i>
                </button>
              </div>
              <div className=''>
                {solitaires.length > 0 ? (
                  <Slider ref={solitaire} {...solitaireSlider}>
                    {solitaires.slice(9,13).map((item) => (
                      <div className='card border-0 px-1' key={item.product_id} onClick={() => handleProductClick(item.product_id, item.title)}>
                        <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className='text-decoration-none'>
                          <img
                            alt={item.title}
                            src={item.image01}
                            className="w-100 height_Set"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3'>
                                    <span class='exlimation_mark'>!</span>
                                </div>`;
                            }}
                          />
                        </Link>
                        <div className="card-body px-1">
                          <h6>{item.title}</h6>
                          <p>{formatCurrency(item.total14KT)}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3">
                    <span className="exlimation_mark">!</span>
                  </div>
                )}
                <Link to="/solitaire" className='text-decoration-none'>
                  <button className='btn mx-auto d-block viewall_btn'>
                    <span>View All</span>
                  </button>
                </Link>
              </div>
              <div className='d-lg-none d-block'>
                <button
                  onClick={() => solitaire?.current?.slickNext()}
                  className="next-btn-set float-end"
                >
                  <i className="ri-arrow-right-wide-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Salt Promise */}
        <section className='container-fluid my-5'>
          <div className="text-center">
            <h3 className="font_main pb-4 m-0 p-0">The Salt Promise</h3>
          </div>
          <div className='row m-0'>
            <div className="features-container py-4">
              <div className="feature-item text-center">
                <div className="p-0 icon-wrapper bg-blue mx-auto d-block">
                  <img alt='' src='/assets/img/cl-advantage-sprite (1).png' className='img-fluid mx-auto d-block'></img>
                </div>
                <span className="feature-text">30 Days Easy Returns</span>
              </div>

              <div className="feature-item text-center">
                <div className="p-0 icon-wrapper bg-red mx-auto d-block">
                  <img alt='' src='/assets/img/cl-advantage-sprite (4).png' className='img-fluid mx-auto d-block'></img>
                </div>
                <span className="feature-text">One Year Warranty</span>
              </div>

              <div className="feature-item text-center">
                <div className="p-0 icon-wrapper bg-green mx-auto d-block">
                  <img alt='' src='/assets/img/cl-advantage-sprite (2).png' className='img-fluid mx-auto d-block'></img>
                </div>
                <span className="feature-text">100% Certified</span>
              </div>

              <div className="feature-item text-center">
                <div className="p-0 icon-wrapper bg-yellow mx-auto d-block">
                  <img alt='' src='/assets/img/cl-advantage-sprite (3).png' className='img-fluid mx-auto d-block'></img>
                </div>
                <span className="feature-text">Lifetime Exchange & Buyback</span>
              </div>
            </div>
          </div>
        </section>

        {/* Exclusive Prodcut mobile */}
        <section className='container-fluid mb-5 d-lg-none d-md-none d-block'>
          <div className='py-4 exclusive_product'>
            <div className='container'>
              <div className="text-center">
                {/* <h3 className="font_main m-0 p-0"></h3> */}
                <p className=" m-0 p_main">Exclusive deals</p>
                <h3 className="font_main pb-4 m-0 p-0">Curated only for you</h3>
              </div>
              <div className='row m-0'>
                {products.length > 0 ? (
                  <Slider ref={solitaire} {...solitaireSlider}>
                    {products.slice(37, 42).map((item) => (
                      <div className='card border-0 px-1 bg-transparent' key={item.product_id} onClick={() => handleProductClick(item.product_id, item.title)}>
                        <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className='text-decoration-none'>
                          <img
                            alt={item.title}
                            src={item.goldImages?.[0] || item.image01}
                            className="w-100 img-fluid"
                            style={{ borderRadius: "10px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3'>
                                    <span class='exlimation_mark'>!</span>
                                </div>`;
                            }}
                          />
                        </Link>
                        <div className="card-body px-1">
                          <h6>{item.title}</h6>
                          <p>{formatCurrency(item.total14KT)}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3">
                    <span className="exlimation_mark">!</span>
                  </div>
                )}
                <Link to="/products" className="text-decoration-none">
                  <button className="btn mx-auto d-block viewall_btn">
                    <span>View All</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {/* <section className="container pb-5 pt-3">
          <div>
            <h3 className="font_main text-center pb-4">New Arrivals</h3>
            <div className="row position-relative">
              <div className="d-lg-none d-block">
                <button onClick={() => arrvial?.current?.slickPrev()} className="pre-btn-set">
                  <i className="ri-arrow-left-wide-line"></i>
                </button>
              </div>
              <div>
                {newArrivals.length > 0 ? (
                  <Slider ref={arrvial} {...newarrivals}>
                    {newArrivals.slice(0, 4).map((item) => (
                      <div className="card border-0 px-1" key={item.product_id}>
                        <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className="text-decoration-none">
                          <img
                            alt={item.title}
                            src={item.image01}
                            className="w-100 height_Set"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                              <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3'>
                                  <span class='exlimation_mark'>!</span>
                              </div>`;
                            }}
                          />
                        </Link>
                        <div className="card-body px-1">
                          <h6>{item.title}</h6>
                          <p>{formatCurrency(item.total14KT)}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3">
                    <span className="exlimation_mark">!</span>
                  </div>
                )}
                <Link to="/products" className="text-decoration-none">
                  <button className="btn mx-auto d-block viewall_btn">
                    <span>View All</span>
                  </button>
                </Link>

              </div>
              <div className="d-lg-none d-block">
                <button onClick={() => arrvial?.current?.slickNext()} className="next-btn-set">
                  <i className="ri-arrow-right-wide-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Category */}
        <section className="container-fluid shop_category pb-4 d-lg-block d-md-block d-none">
          <div>
            <div className="text-center">
              <h3 className="font_main pb-1 m-0 p-0">Shop by Category</h3>
              <p className="p_main pb-3">Brilliant design and unparalleled craftsmanship.</p>
            </div>
            <div className="row p-1">
              {categories.map((item, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-sm-4 col-4 p-0 px-2 px-md-2">
                  <div className="card border-0">
                    <Link
                      to={`/products/${item.categoryName.replace(/ /g, "-")}`}
                      key={index}
                      className='text-decoration-none'
                    >
                      <img
                        alt={item.filterCategoryName}
                        src={item.categoryImage}
                        className="img-fluid"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.style.display = "none";

                          // Ensure parentElement exists before modifying innerHTML
                          if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = `
                          <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3'  style="height: 200px;">
                            <span class='exlimation_mark'>!</span>
                          </div>`;
                          }
                        }}
                      />
                    </Link>
                    <div className="card-body text-center">
                      <h5>{item.categoryName}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* New Arrivals */}
        {/* <section className="container">
          <div>
            <h3 className="font_main text-center pb-4">New Arrivals</h3>
            <div className="row position-relative">
              <div className="d-lg-none d-block">
                <button onClick={() => arrvial?.current?.slickPrev()} className="pre-btn-set">
                  <i className="ri-arrow-left-wide-line"></i>
                </button>
              </div>
              <div>
                {newArrivals.length > 0 ? (
                  <Slider ref={arrvial} {...newarrivals}>
                    {newArrivals.slice(0, 4).map((item) => (
                      <div className="card border-0 px-1" key={item.product_id}>
                        <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className="text-decoration-none">
                          <img
                            alt={item.title}
                            src={item.image01}
                            className="w-100 height_Set"
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                              <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3'>
                                  <span class='exlimation_mark'>!</span>
                              </div>`;
                            }}
                          />
                        </Link>
                        <div className="card-body px-1">
                          <h6>{item.title}</h6>
                          <p>{formatCurrency(item.total14KT)}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3">
                    <span className="exlimation_mark">!</span>
                  </div>
                )}
                <Link to="/arrival" className="text-decoration-none">
                  <button className="btn mx-auto d-block viewall_btn">
                    <span>View All</span>
                  </button>
                </Link>
              </div>
              <div className="d-lg-none d-block">
                <button onClick={() => arrvial?.current?.slickNext()} className="next-btn-set">
                  <i className="ri-arrow-right-wide-line"></i>
                </button>
              </div>
            </div>
          </div>
        </section> */}

        {/* Bottom Banner */}
        <section className="container-fluid mb-5">
          <div className="row g-3 align-items-stretch">
            {/* Left Side Banner (Single Image/Video) */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex banner-grid-left">
              {bottomBanners.length > 0 && (
                <div className="w-100">
                  {bottomBanners[3] && (
                    bottomBanners[3].bannerImage.endsWith(".mp4") ||
                      bottomBanners[3].bannerImage.endsWith(".mkv") ||
                      bottomBanners[3].bannerImage.endsWith(".avi") ? (
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="img-fluid w-100 h-100"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      >
                        <source src={bottomBanners[3].bannerImage} type="video/mp4" />
                      </video>
                    ) : (
                      <img
                        alt="Bottom Banner 1"
                        src={bottomBanners[3].bannerImage}
                        className="img-fluid w-100 h-100"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            {/* Right Side Banners (Two Images, Equal Spacing) */}
            <div className="col-lg-6 col-md-6 col-sm-12 d-flex flex-column gap-3 banner-grid-right">
              {bottomBanners.length > 1 && (
                <img
                  alt="Bottom Banner 2"
                  src={bottomBanners[4]?.bannerImage}
                  className="img-fluid w-100"
                  style={{ flex: 1, objectFit: "cover", borderRadius: "10px" }}
                />
              )}
              {bottomBanners.length > 2 && (
                <img
                  alt="Bottom Banner 3"
                  src={bottomBanners[5]?.bannerImage}
                  className="img-fluid w-100"
                  style={{ flex: 1, objectFit: "cover", borderRadius: "10px" }}
                />
              )}
            </div>
          </div>
        </section>

        {/* Wrapped with love! */}
        <section className="container-fluid pb-4 shop_category">
          <div>
            <div className="text-center">
              <h3 className="font_main pb-1 m-0 p-0">Wrapped with love!</h3>
              <p className="p_main pb-3">Brilliant design and unparalleled craftsmanship.</p>
            </div>
            <div className="row p-1">
              {filterCategory.map((item, index) => (
                <div key={index} className="col-lg-2 col-md-4 col-sm-4 col-4 p-0 px-2 px-md-2">
                  <div className="card border-0">
                    <Link
                      to={item.filterLink || '#'}
                      key={index}
                      className='text-decoration-none'
                    >
                      <img
                        alt={item.filterCategoryName}
                        src={item.filterCategoryImage}
                        className="img-fluid"
                        style={{ borderRadius: "10px", objectFit: "cover" }}
                        onError={(e) => {
                          e.target.onerror = null; // Prevent infinite loop
                          e.target.style.display = "none";

                          // Ensure parentElement exists before modifying innerHTML
                          if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = `
                          <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3'  style="height: 200px;">
                            <span class='exlimation_mark'>!</span>
                          </div>`;
                          }
                        }}
                      />
                    </Link>
                    <div className="card-body text-center">
                      <h5>{item.filterCategoryName}</h5>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Latest design */}
        <section className="container-fluid pb-5">
          {bottomBanners?.length >= 8 && (
            <>
              {/* Web Banner (7th Banner - Index 6) */}
              <img
                alt="Web Banner"
                src={bottomBanners[6]?.bannerImage}
                className="img-fluid d-none d-md-block promo-banner"
                style={{ borderRadius: "10px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `
              <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                <span class='exlimation_mark'>!</span>
              </div>`;
                  }
                }}
              />

              {/* Mobile Banner (8th Banner - Index 7) */}
              <img
                alt="Mobile Banner"
                src={bottomBanners[7]?.bannerImage}
                className="img-fluid d-md-none promo-banner"
                style={{ borderRadius: "10px", objectFit: "cover" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `
              <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                <span class='exlimation_mark'>!</span>
              </div>`;
                  }
                }}
              />
            </>
          )}
        </section>

        {/* Exclusive Product web */}
        <section className='container-fluid mb-5 d-lg-block d-md-block d-none'>
          <div style={{ background: "rgb(224 242 232)", borderRadius: "10px" }} className='py-4'>
            <div className='container'>
              <div className="text-center">
                {/* <h3 className="font_main m-0 p-0"></h3> */}
                <p className=" m-0 p_main">Exclusive deals</p>
                <h3 className="font_main pb-4 m-0 p-0">Curated only for you</h3>
              </div>
              <div className='row m-0'>
                {products.length > 0 ? (
                  <Slider ref={solitaire} {...solitaireSlider}>
                    {products.slice(37, 42).map((item) => (
                      <div className='card border-0 px-1 bg-transparent' key={item.product_id} onClick={() => handleProductClick(item.product_id, item.title)}>
                        <Link to={`/Productdetails/${item.title ? item.title.replace(/[\s/]+/g, '-').toLowerCase() : item.product_id}`} className='text-decoration-none'>
                          <img
                            alt={item.title}
                            src={item.goldImages?.[0] || item.image01}
                            className="w-100 img-fluid"
                            style={{ borderRadius: "10px", objectFit: "cover" }}
                            onError={(e) => {
                              e.target.onerror = null; // Prevent infinite loop
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3'>
                                    <span class='exlimation_mark'>!</span>
                                </div>`;
                            }}
                          />
                        </Link>
                        <div className="card-body px-1">
                          <h6>{item.title}</h6>
                          <p>{formatCurrency(item.total14KT)}</p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                ) : (
                  <div className="no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3">
                    <span className="exlimation_mark">!</span>
                  </div>
                )}
                <Link to="/products" className="text-decoration-none">
                  <button className="btn mx-auto d-block viewall_btn">
                    <span>View All</span>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Gift */}
        <section className="container-fluid px-1 gift_sec_main">
          {/* Grid layout for large devices */}
          <div className="d-none d-lg-block d-md-block">
            <div className="row m-0">
              {gifts.map((gift) => (
                <div key={gift.gift_id} className="col-lg-4 col-md-4 col-sm-12 col-12 p-0">
                  <div className="card border-0 p-2">
                    {
                      gift.giftImage && gift.giftImage.endsWith(".mp4") ||
                        gift.giftImage && gift.giftImage.endsWith(".mkv") ||
                        gift.giftImage && gift.giftImage.endsWith(".avi") ? (
                        <video
                          src={gift.giftImage}
                          className="img-fluid"
                          style={{ borderRadius: "10px", objectFit: "cover" }}
                          autoPlay
                          playsInline
                          muted
                          loop
                        />
                      ) : (
                        <img
                          alt={gift.giftName}
                          src={gift.giftImage}
                          className="img-fluid"
                          style={{ borderRadius: "10px", objectFit: "cover" }}
                        />
                      )}
                    <div className="card-body text-center">
                      <h5>{gift.giftName}</h5>
                      <p className="line_hover">Shop Now &nbsp; &gt;</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Carousel for mobile devices */}
          <div className="d-lg-none d-md-none d-block">
            <Slider {...graduate}>
              {gifts.map((gift) => (
                <div key={gift.gift_id} className="p-2">
                  <div className="card border-0">
                    {
                      gift.giftImage && gift.giftImage.endsWith(".mp4") ||
                        gift.giftImage && gift.giftImage.endsWith(".mkv") ||
                        gift.giftImage && gift.giftImage.endsWith(".avi") ? (
                        <video
                          src={gift.giftImage}
                          className="img-fluid"
                          style={{ borderRadius: "10px", objectFit: "cover" }}
                          autoPlay
                          playsInline
                          muted
                          loop
                        />
                      ) : (
                        <img
                          alt={gift.giftName}
                          src={gift.giftImage}
                          className="img-fluid"
                          style={{ borderRadius: "10px", objectFit: "cover" }}
                        />
                      )}
                    <div className="card-body text-center">
                      <h5>{gift.giftName}</h5>
                      <p className="line_hover">Shop Now &nbsp; &gt;</p>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>

        {/* Service */}
        {/* <section className='service_main'>
          <div className='container py-5'>
            <div>
              <div className='row service_p'>
                <h3 className='font_main pb-5 m-0 p-0 text-center'>The Salt & Glitz Experience</h3>
                <div className='col-lg-3 col-md-6 col-sm-6 col-6 py-4 text-center'>
                  <CiDeliveryTruck className='fs-2 mb-2' />
                  <h6 className=''>Complementary Shiping & Returns</h6>
                  <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
                  <span className='line_hover'>Learn More &nbsp; &gt;</span>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6 col-6 py-4 text-center'>
                  <LuConciergeBell className='fs-2 mb-2' />
                  <h6 className=''>Tiffany At Your Service</h6>
                  <p className='m-0 pb-1'>We offer complimentary shipping and returns on all Tiffany orders.</p>
                  <Link className='text-decoration-none' to="/contact"><span className='line_hover'>Contact Us &nbsp; &gt;</span></Link>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6 col-6 py-4 text-center'>
                  <CiCalendar className='fs-2 mb-2' />
                  <h6 className=''>Book An Appointment</h6>
                  <p className='m-0 pb-1'>We’re happy to help with in-store or virtual appointments.</p>
                  <span className='line_hover'>Book Now &nbsp; &gt;</span>
                </div>
                <div className='col-lg-3 col-md-6 col-sm-6 col-6 py-4 text-center'>
                  <CiGift className='fs-2 mb-2' />
                  <h6 className=''>The Iconic Blue Box</h6>
                  <p className='m-0 pb-1'>Your Tiffany purchase comes wrapped in our Blue Box packaging.</p>
                  <span className='line_hover'>Explore All Gifts &nbsp; &gt;</span>
                </div>
              </div>
            </div>
          </div>
        </section> */}

        {/* Privilage Banner */}
        <section className="container-fluid pb-4">
          {bottomBanners?.length >= 8 && (
            <Link to="/privilege" className="text-decoration-none">
              {/* Web Banner (7th Banner - Index 6) */}
              <img
                alt="Web Banner"
                src={bottomBanners[8]?.bannerImage}
                className="img-fluid d-none d-md-block promo-banner"
                style={{ borderRadius: "10px", objectFit: "cover", width: "100%" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `
              <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                <span class='exlimation_mark'>!</span>
              </div>`;
                  }
                }}
              />

              {/* Mobile Banner (8th Banner - Index 7) */}
              <img
                alt="Mobile Banner"
                src={bottomBanners[9]?.bannerImage}
                className="img-fluid d-md-none promo-banner"
                style={{ borderRadius: "10px", objectFit: "cover", width: "100%" }}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.style.display = "none";
                  if (e.target.parentElement) {
                    e.target.parentElement.innerHTML = `
              <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                <span class='exlimation_mark'>!</span>
              </div>`;
                  }
                }}
              />
            </Link>
          )}
        </section>

        {/* Whatsapp Icon */}
        <Link to="https://wa.me/+917984369890" target="_blank" rel="noopener noreferrer" className="whatsapp-logo text-decoration-none">
          {/* <i class="ri-whatsapp-fill fs-1"></i> */}
          <i className="fa-brands fa-whatsapp"></i>
        </Link>
      </>
    </Helmet>
  )
}

export default Mainpage