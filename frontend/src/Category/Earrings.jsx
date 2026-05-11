import API_BASE_URL from '../Utils/apiConfig.js';
import React, { useEffect, useState } from 'react';
import Loader from '../Pages/Loader';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ProductCard from '../Pages/Product/productCard';
import Filter from '../Filter/Filter';
import Mdfilter from '../Filter/Mdfilter';
import Helmet from '../Components/Helmet';
import Sort from '../Filter/Sort';

const Earrings = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({});

    // API Call to get all products (only when no filters applied)
    const getUploadData = async () => {
        if (Object.keys(filters).length > 0) return; // Filters active hone par ye call na ho
        setLoading(true);
        setError(null);
        try {
            let response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`);
            // console.log(response);

            const categoryProducts = response.data.filter(item => item.category === "Earring");

            setProducts(categoryProducts);
        } catch (err) {
            setError("Failed to load products.");
        }
        setLoading(false);
    };

    useEffect(() => {
        getUploadData();
    }, []);

    // Function to update products based on filters
    const applyFilters = async (appliedFilters) => {
        console.log("Filters Applied:", appliedFilters);
        setLoading(true);
        setFilters(appliedFilters);
        try {
            const response = await axios.post(`${API_BASE_URL}/v1/upload/filterProduct`, appliedFilters);

            console.log("Filtered Response:", response.data.updatedProducts);

            const filteredProducts = response.data.updatedProducts.filter(item => item.category === "Earring");

            if (filteredProducts.length === 0) {
                setError("Oops! There are no products available under your current selection.");
                setProducts([]);
            } else {
                setError(null);
                setProducts(filteredProducts);
            }
        } catch (err) {
            setError(err.response?.data?.message || "Something went wrong.");
            setProducts([]);
        }
        setLoading(false);
    };
    return (
        <Helmet title="Earrings">

            <>
                <section className="bg_product_page mb-2 mb-lg-5">
                    <div className="container">
                        <div className=" flex-column text-start min-vh-25 py-3">
                            <div>
                                <h6 className="mb-1">
                                    Earrings Designs &nbsp;
                                    <span>{products.length} Designs</span>
                                </h6>
                                <p>Home &gt; Jewellery</p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='container-fluid mt-2 mb-4'>
                    <div className='row'>
                        <div className="col-xl-3 col-lg-3 d-lg-block d-none">
                            <Filter onFilterApply={applyFilters} />
                        </div>
                        <Mdfilter onFilterApply={applyFilters} />
                        <div className="col-lg-9">
                            <Sort onFilterApply={applyFilters} />
                            <div className="row">
                                {loading ? (
                                    <Loader />
                                ) : error ? (
                                    <div className="text-center w-100 py-5">
                                        <h4>{error}</h4>
                                        <p>Oops! There are no products available under your current selection.</p>
                                    </div>
                                ) : products.length > 0 ? (
                                    products.map((item) => (
                                        <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1" key={item.id}>
                                            <Link>
                                                <ProductCard Productsitem={item} />
                                            </Link>
                                        </div>
                                    ))
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Earrings;
// import React, { useCallback, useEffect, useState } from "react";
// import ProductCard from "../Pages/Product/productCard";
// import Helmet from "../Components/Helmet";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";
// import Loader from "../Pages/Loader";
// import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";

// const Earrings = () => {
//     const [filters, setFilters] = useState({
//         title: "",
//         priceLimit: "",
//         sortBy: "",
//         priceOrder: "",
//         discountLimit: "",
//         typeBy: "",
//         shopFor: "",
//         occasionBy: ""
//     });
//     const [products, setProducts] = useState([]);
//     const [showMorePrices, setShowMorePrices] = useState(false);
//     const [showMoreCategories, setShowMoreCategories] = useState(false);
//     const [showMoreOccasion, setShowMoreOccasion] = useState(false)
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);

//     const handleSelectFilterChange = (combinedValue) => {
//         const [sortBy, priceOrder] = combinedValue.split('_');  // Split combined value
//         setFilters({
//             ...filters,
//             sortBy,    // Set the sortBy value
//             priceOrder // Set the priceOrder value
//         });
//     };
//     const handleFilterChange = (type, value) => {
//         setFilters({ ...filters, [type]: value });
//     };

//     // const occasionDisplayMapping = {
//     //     engagementring: "Engagement Ring",
//     //     solitire: "Solitire",
//     //     ring: "Ring",
//     //     wedding: "Wedding",
//     //     evening: "Evening"
//     // };

//     // const formatOccasion = (key) => {
//     //     // Convert key to lower case to match mapping
//     //     return occasionDisplayMapping[key.toLowerCase()] || key;
//     // };

//     const clearFilters = () => {
//         setFilters({});
//         window.location.reload(); // Refresh the page
//     };

//     const fetchFilteredProducts = useCallback(async () => {
//         setLoading(true);
//         setError(null);

//         // Check if any filter is applied
//         const isFilterApplied = Object.values(filters).some(val => val !== "" && val !== undefined);

//         if (!isFilterApplied) {
//             setLoading(false);
//             return; // Agar koi filter nahi hai to API call na kare
//         }

//         try {
//             const response = await axios.post(`${API_BASE_URL}/v1/upload/filterProduct`, {
//                 ...filters,
//             });

//             if (response.data.updatedProducts.length === 0) {
//                 setError("Oops! There are no products available under your current selection.");
//                 setProducts([]); // Ensure products array is empty
//             } else {
//                 setError(null);
//                 setProducts(response.data.updatedProducts);
//             }
//         } catch (err) {
//             setError(err.response?.data?.message || "Something went wrong");
//             setProducts([]); // Ensure products array is empty in case of error
//         }
//         setLoading(false);
//     }, [filters]);


//     useEffect(() => {
//         fetchFilteredProducts();
//     }, [fetchFilteredProducts]); // useEffect me include kar diya

//     const categories = ["Earring", "Ring", "Ladies Bracelet"];
//     const priceRanges = [
//         { id: "below20k", label: "Below ₹20,000" },
//         { id: "20kTo30k", label: "₹20,000 - ₹30,000" },
//         { id: "30kTo50k", label: "₹30,000 - ₹50,000" },
//         { id: "50kTo100k", label: "₹50,000 - ₹1,00,000" },
//         { id: "100kTo200k", label: "₹1,00,000 - ₹2,00,000" },
//         { id: "200kTo300k", label: "₹2,00,000 - ₹3,00,000" },
//         { id: "300kTo500k", label: "₹3,00,000 - ₹5,00,000" },
//         { id: "above500k", label: "Above ₹5,00,000" }
//     ];
//     const occasion = ["Solitaire Rings", "Engagement Rings", "Cocktail Rings", "Wedding Rings", "Couple Rings", "Dailywear Rings", "Platinum Rings", "Bands Rings", "Infinity Rings", "Promise Rings"];

//     // Initial product images
//     // const images = ["assets/img/product_img1.jpg", "assets/img/product_img.jpg"];

//     // Scroll to the top when the component mounts
//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);


//     const getUploadData = async () => {

//         let response = await axios.get(`${API_BASE_URL}/v1/upload/get_upload`)
//         // const ringProducts = response.data.filter(item => item.category === "Ring"); // Filter rings only
//         // console.log("Get Data", response.data);
//         setProducts(response.data);
//     };

//     useEffect(() => {
//         getUploadData();
//     }, []);

//     // const discountOptions = [
//     //     ...new Set(products.map((product) => `${product.discount}%`)),
//     // ];

//     // console.log(products);

//     // // Fetch products data on component mount
//     // useEffect(() => {
//     //     setProducts(productsData);
//     //     window.scrollTo(0, 0);
//     // }, []);

//     // const [showMoreDiscount, setShowMoreDiscount] = useState(false);

//     const navigate = useNavigate(); // Initialize useNavigate

//     const handleProductClick = (id) => {
//         // navigate(`/product/${id}`); // Navigate to ProductDetails page with the product ID
//         navigate(`/Productdetails/${id}`); // Navigate to ProductDetails page with the product ID
//         // console.log(id);
//     };

//     return (
//         <Helmet title="Engagement">
//             <>
//                 {loading && <Loader />}
//                 <section className="bg_product_page mb-2 mb-lg-5">
//                     <div className="container">
//                         <div className=" flex-column text-start min-vh-25 py-3">
//                             <div>
//                                 <h6 className="mb-1">
//                                     Jewellery Designs &nbsp;
//                                     <span>7992 Designs</span>
//                                 </h6>
//                                 <p>Home &gt; Jewellery</p>
//                             </div>
//                         </div>
//                     </div>
//                 </section>
//                 <section className="container-fluid mt-2 mb-4">
//                     <div className="row">
//                         <div className="col-xl-3 col-lg-3 d-lg-block d-none">
//                             <div className="sticky-header px-5">
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2 d-flex justify-content-between align-items-center">
//                                     <h6 className="filter_main_title">FILTERS</h6>
//                                     <button className="btn btn-link p-0 clear_btn_Filter" onClick={clearFilters}>
//                                         Clear All
//                                     </button>
//                                 </div>
//                                 {/* Price Filter */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="mt-3 filter_title">Price</h2>
//                                     {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
//                                         <div className="form-check my-2" key={index}>
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 id={price.id}
//                                                 name="priceLimit"
//                                                 checked={filters.priceLimit === price.id}
//                                                 onChange={() => handleFilterChange("priceLimit", price.id)}
//                                             />
//                                             <label className="form-check-label" htmlFor={price.id}>
//                                                 {price.label}
//                                             </label>
//                                         </div>
//                                     ))}
//                                     {priceRanges.length > 4 && (
//                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMorePrices(!showMorePrices)}>
//                                             {showMorePrices ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                             {showMorePrices ? "Show Less" : "More"}
//                                         </button>
//                                     )}
//                                 </div>

//                                 {/* Product Type */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Product Type</h2>
//                                     {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
//                                         <div className="form-check my-2" key={index}>
//                                             <input
//                                                 className="form-check-input"
//                                                 type="checkbox"
//                                                 value={category}
//                                                 id={`category${index}`}
//                                                 checked={filters.title?.includes(category) || false}
//                                                 onChange={() => handleFilterChange("title", category)}
//                                             />
//                                             <label className="form-check-label" htmlFor={`category${index}`}>
//                                                 {category}
//                                             </label>
//                                         </div>
//                                     ))}
//                                     {categories.length > 4 && (
//                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMoreCategories(!showMoreCategories)}>
//                                             {showMoreCategories ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                             {showMoreCategories ? "Show Less" : "More"}
//                                         </button>
//                                     )}
//                                 </div>

//                                 {/* Material */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Material</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (4).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Solitaire
//                                             {/* <span>(12)</span> */}
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (1).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Gold
//                                             {/* <span>(10)</span> */}
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <i className="ri-checkbox-blank-fill me-2 fs-5" style={{ color: "#EBEBEB" }}></i>
//                                             </span>
//                                             Platinum
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             <span>
//                                                 <img
//                                                     alt=""
//                                                     src="assets/img/lp-sprite (3).png"
//                                                     className="img-fluid me-2"
//                                                     style={{ width: "25px" }}
//                                                 ></img>
//                                             </span>
//                                             Gemstone
//                                             {/* <span>(58)</span> */}
//                                         </label>
//                                     </div>
//                                 </div>

//                                 {/* Shop For */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Shop For</h2>

//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="shopForWomen"
//                                             checked={filters.typeBy === "female"}
//                                             onChange={() => handleFilterChange("typeBy", "female")}
//                                         />
//                                         <label className="form-check-label" htmlFor="shopForWomen">
//                                             Women
//                                         </label>
//                                     </div>

//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="shopForMen"
//                                             checked={filters.typeBy === "male"}
//                                             onChange={() => handleFilterChange("typeBy", "male")}
//                                         />
//                                         <label className="form-check-label" htmlFor="shopForMen">
//                                             Men
//                                         </label>
//                                     </div>
//                                 </div>

//                                 {/* Occasion */}
//                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Occasion</h2>
//                                     {occasion.slice(0, showMoreOccasion ? occasion.length : 4).map(
//                                         (subCategory, index) => (
//                                             <div className="form-check my-2" key={index}>
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     value={subCategory}
//                                                     id={`subCategory${index}`}
//                                                     checked={filters.occasionBy?.includes(subCategory) || false}
//                                                     onChange={() =>
//                                                         handleFilterChange("occasionBy", subCategory)
//                                                     }
//                                                 />
//                                                 <label
//                                                     className="form-check-label"
//                                                     htmlFor={`subCategory${index}`}
//                                                 >
//                                                     {subCategory}
//                                                 </label>
//                                             </div>
//                                         )
//                                     )}
//                                     {occasion.length > 4 && (
//                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMoreOccasion(!showMoreOccasion)}>
//                                             {showMoreOccasion ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                             {showMoreOccasion ? "Show Less" : "More"}
//                                         </button>
//                                     )}
//                                 </div>

//                                 {/* Ring Size */}
//                                 {/* <div className='border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2'>
//                                     <h2 className='fw-bold fs-5 mt-3'>Ring Size</h2>
//                                     {
//                                         ringSizes.map((size, index) => (
//                                             <div className="form-check my-2" key={index}>
//                                                 <input className="form-check-input" type="checkbox" id={`ringSize${index}`}
//                                                     checked={selectedRingSizes.includes(size)}
//                                                     onChange={() => handleFilterChange('ringSize', size)} />
//                                                 <label className="form-check-label" htmlFor={`ringSize${index}`}>{size}</label>
//                                             </div>
//                                         ))
//                                     }
//                                     <button onClick={() => setShowMoreRingSizes(!showMoreRingSizes)} className="btn btn-link p-0 show_btn">
//                                         {showMoreRingSizes ? (
//                                             <>
//                                                 <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show Less
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <i className="ri-arrow-down-s-line fs-4 pe-1"></i>2 More
//                                             </>
//                                         )
//                                         }
//                                     </button>
//                                 </div> */}

//                                 {/* Discount */}
//                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Discount</h2>
//                                     {discountOptions
//                                         .slice(0, showMoreDiscount ? discountOptions.length : 4)
//                                         .map((item, index) => (
//                                             <div className="form-check my-2" key={index}>
//                                                 <input
//                                                     className="form-check-input"
//                                                     type="checkbox"
//                                                     id={`discount${index}`}
//                                                     checked={selectedDiscounts.includes(item)}
//                                                     onChange={() => handleFilterChange("discount", item)}
//                                                 />
//                                                 <label
//                                                     className="form-check-label"
//                                                     htmlFor={`discount${index}`}
//                                                 >
//                                                     {item}
//                                                 </label>
//                                             </div>
//                                         ))}
//                                     <button
//                                         onClick={() => setShowMoreDiscount(!showMoreDiscount)}
//                                         className="btn btn-link p-0 show_btn"
//                                     >
//                                         {showMoreDiscount ? (
//                                             <>
//                                                 <i className="ri-arrow-up-s-line fs-4 pe-1"></i>Show
//                                                 Less
//                                             </>
//                                         ) : (
//                                             <>
//                                                 <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
//                                                 {discountOptions.length - 4} More
//                                             </>
//                                         )}
//                                     </button>
//                                 </div> */}

//                                 {/* Discount Range */}
//                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Discount Ranges</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="discountRange1"
//                                             checked={selectedDiscountRanges.includes("15 - 20")}
//                                             onChange={() =>
//                                                 handleFilterChange("discountRange", "15 - 20")
//                                             }
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="discountRange1"
//                                         >
//                                             15 - 20 <span>(271)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="discountRange2"
//                                             checked={selectedDiscountRanges.includes("Below 10")}
//                                             onChange={() =>
//                                                 handleFilterChange("discountRange", "Below 10")
//                                             }
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="discountRange2"
//                                         >
//                                             Below 10 <span>(47)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             id="discountRange3"
//                                             checked={selectedDiscountRanges.includes("10 - 15")}
//                                             onChange={() =>
//                                                 handleFilterChange("discountRange", "10 - 15")
//                                             }
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="discountRange3"
//                                         >
//                                             10 - 15 <span>(26)</span>
//                                         </label>
//                                     </div>
//                                 </div> */}

//                                 {/* Weight Ranges */}
//                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Weight Ranges</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             0 - 2 g<span>(19)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             2 - 5 g<span>(360)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             5 - 10 g<span>(55)</span>
//                                         </label>
//                                     </div>
//                                 </div> */}

//                                 {/* Metal */}
//                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                     <h2 className="filter_title mt-3">Metal</h2>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             18 KT Yellow
//                                             <span>(112)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             14 KT White
//                                             <span>(111)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             18 KT Rose
//                                             <span>(30)</span>
//                                         </label>
//                                     </div>
//                                     <div className="form-check my-2">
//                                         <input
//                                             className="form-check-input"
//                                             type="checkbox"
//                                             value=""
//                                             id="flexCheckDefault"
//                                         />
//                                         <label
//                                             className="form-check-label"
//                                             htmlFor="flexCheckDefault"
//                                         >
//                                             18 KT Two Tone
//                                             <span>(25)</span>
//                                         </label>
//                                     </div>
//                                 </div> */}
//                             </div>
//                         </div>

//                         {/* Small Device Filter*/}
//                         <div className="container-fluid filter_midium_divice d-lg-none d-xl-none d-block">
//                             <div className="row text-center pt-3">
//                                 {/* <div className="col-md-4 col-sm-4 col-4">
//                                     <p className="">CATEGORIES</p>
//                                 </div> */}
//                                 <div className="col-md-6 col-sm-6 col-6">
//                                     <p
//                                         className=""
//                                         data-bs-toggle="offcanvas"
//                                         data-bs-target="#offcanvasBottomSort"
//                                         aria-controls="offcanvasBottom"
//                                     >
//                                         SORT
//                                     </p>
//                                     <div
//                                         className="offcanvas offcanvas-bottom offcanvas_sort"
//                                         tabIndex="-1"
//                                         id="offcanvasBottomSort"
//                                         aria-labelledby="offcanvasBottomLabel"
//                                     >
//                                         <div className="offcanvas-header">
//                                             <h5
//                                                 className="offcanvas-title fw-bold"
//                                                 id="offcanvasBottomLabel"
//                                             >
//                                                 Sort Design By
//                                             </h5>
//                                             <button
//                                                 type="button"
//                                                 className="btn-close text-reset"
//                                                 data-bs-dismiss="offcanvas"
//                                                 aria-label="Close"
//                                             ></button>
//                                         </div>
//                                         <div className="offcanvas-body small m-0 p-0">
//                                             <div className="mb-2 text-left">
//                                                 <p onClick={() => handleSelectFilterChange("featured")} className="filter-option">Featured</p>
//                                                 <p onClick={() => handleSelectFilterChange("newestFirst")} className="filter-option">Latest</p>
//                                                 <p onClick={() => handleSelectFilterChange("newestFirst_highToLow")} className="filter-option">High to Low</p>
//                                                 <p onClick={() => handleSelectFilterChange("newestFirst_lowToHigh")} className="filter-option">Low to High</p>
//                                             </div>
//                                             <div className="container-fluid filter_offcanvas py-3">
//                                                 <div className="row">
//                                                     <div className="col-md-6 col-sm-6 col-6">
//                                                         <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
//                                                             Clear All
//                                                         </button>
//                                                     </div>
//                                                     <div className="col-md-6 col-sm-6 col-6">
//                                                         <button className="btn w-100 text-light filter_md_btn1"
//                                                             data-bs-dismiss="offcanvas"
//                                                             aria-label="Close">
//                                                             APPLY FILTERS
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                                 <div className="col-md-6 col-sm-6 col-6">
//                                     <p
//                                         className=""
//                                         data-bs-toggle="offcanvas"
//                                         data-bs-target="#offcanvasBottom"
//                                         aria-controls="offcanvasBottom"
//                                     >
//                                         FILTER
//                                     </p>
//                                     <div
//                                         className="offcanvas offcanvas-bottom"
//                                         tabIndex="-1"
//                                         id="offcanvasBottom"
//                                         aria-labelledby="offcanvasBottomLabel"
//                                     >
//                                         <div className="offcanvas-header">
//                                             <h5
//                                                 className="offcanvas-title fw-bold "
//                                                 id="offcanvasBottomLabel"
//                                             >
//                                                 Filters
//                                             </h5>
//                                             <button
//                                                 type="button"
//                                                 className="btn-close text-reset"
//                                                 data-bs-dismiss="offcanvas"
//                                                 aria-label="Close"
//                                             ></button>
//                                         </div>
//                                         <div className="offcanvas-body small m-0 p-0">
//                                             <div className="sticky-header px-5">
//                                                 {/* Price */}
//                                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="mt-3 filter_title">Price</h2>
//                                                     {priceRanges.slice(0, showMorePrices ? priceRanges.length : 4).map((price, index) => (
//                                                         <div className="form-check my-2" key={index}>
//                                                             <input
//                                                                 className="form-check-input"
//                                                                 type="checkbox"
//                                                                 id={price.id}
//                                                                 name="priceLimit"
//                                                                 checked={filters.priceLimit === price.id}
//                                                                 onChange={() => handleFilterChange("priceLimit", price.id)}
//                                                             />
//                                                             <label className="form-check-label" htmlFor={price.id}>
//                                                                 {price.label}
//                                                             </label>
//                                                         </div>
//                                                     ))}
//                                                     {priceRanges.length > 4 && (
//                                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMorePrices(!showMorePrices)}>
//                                                             {showMorePrices ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                                             {showMorePrices ? "Show Less" : "More"}
//                                                         </button>
//                                                     )}
//                                                 </div>

//                                                 {/* Discount */}
//                                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Discount</h2>
//                                                     {discountOptions
//                                                         .slice(
//                                                             0,
//                                                             showMoreDiscount ? discountOptions.length : 4
//                                                         )
//                                                         .map((item, index) => (
//                                                             <div className="form-check my-2" key={index}>
//                                                                 <input
//                                                                     className="form-check-input"
//                                                                     type="checkbox"
//                                                                     id={`discount${index}`}
//                                                                     checked={selectedDiscounts.includes(item)}
//                                                                     onChange={() =>
//                                                                         handleFilterChange("discount", item)
//                                                                     }
//                                                                 />
//                                                                 <label
//                                                                     className="form-check-label"
//                                                                     htmlFor={`discount${index}`}
//                                                                 >
//                                                                     {item}
//                                                                 </label>
//                                                             </div>
//                                                         ))}
//                                                     <button
//                                                         onClick={() =>
//                                                             setShowMoreDiscount(!showMoreDiscount)
//                                                         }
//                                                         className="btn btn-link p-0 show_btn"
//                                                     >
//                                                         {showMoreDiscount ? (
//                                                             <>
//                                                                 <i className="ri-arrow-up-s-line fs-4 pe-1"></i>
//                                                                 Show Less
//                                                             </>
//                                                         ) : (
//                                                             <>
//                                                                 <i className="ri-arrow-down-s-line fs-4 pe-1"></i>
//                                                                 {discountOptions.length - 4} More
//                                                             </>
//                                                         )}
//                                                     </button>
//                                                 </div> */}

//                                                 {/* Discount Range */}
//                                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Discount_Ranges</h2>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id="discountRange1"
//                                                             checked={selectedDiscountRanges.includes(
//                                                                 "15 - 20"
//                                                             )}
//                                                             onChange={() =>
//                                                                 handleFilterChange("discountRange", "15 - 20")
//                                                             }
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="discountRange1"
//                                                         >
//                                                             15 - 20 <span>(271)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id="discountRange2"
//                                                             checked={selectedDiscountRanges.includes(
//                                                                 "Below 10"
//                                                             )}
//                                                             onChange={() =>
//                                                                 handleFilterChange("discountRange", "Below 10")
//                                                             }
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="discountRange2"
//                                                         >
//                                                             Below 10 <span>(47)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id="discountRange3"
//                                                             checked={selectedDiscountRanges.includes(
//                                                                 "10 - 15"
//                                                             )}
//                                                             onChange={() =>
//                                                                 handleFilterChange("discountRange", "10 - 15")
//                                                             }
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="discountRange3"
//                                                         >
//                                                             10 - 15 <span>(26)</span>
//                                                         </label>
//                                                     </div>
//                                                 </div> */}

//                                                 {/* Product Type */}
//                                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Product Type</h2>
//                                                     {categories.slice(0, showMoreCategories ? categories.length : 4).map((category, index) => (
//                                                         <div className="form-check my-2" key={index}>
//                                                             <input
//                                                                 className="form-check-input"
//                                                                 type="checkbox"
//                                                                 value={category}
//                                                                 id={`category${index}`}
//                                                                 checked={filters.title?.includes(category) || false}
//                                                                 onChange={() => handleFilterChange("title", category)}
//                                                             />
//                                                             <label className="form-check-label" htmlFor={`category${index}`}>
//                                                                 {category}
//                                                             </label>
//                                                         </div>
//                                                     ))}
//                                                     {categories.length > 4 && (
//                                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMoreCategories(!showMoreCategories)}>
//                                                             {showMoreCategories ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                                             {showMoreCategories ? "Show Less" : "More"}
//                                                         </button>
//                                                     )}
//                                                 </div>

//                                                 {/* Weight Ranges */}
//                                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Weight Ranges</h2>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             0 - 2 g<span>(19)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             2 - 5 g<span>(360)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             5 - 10 g<span>(55)</span>
//                                                         </label>
//                                                     </div>
//                                                 </div> */}

//                                                 {/* Material */}
//                                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Material</h2>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             <span>
//                                                                 <img
//                                                                     alt=""
//                                                                     src="assets/img/lp-sprite (4).png"
//                                                                     className="img-fluid me-2"
//                                                                     style={{ width: "25px" }}
//                                                                 ></img>
//                                                             </span>
//                                                             Solitaire
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             <span>
//                                                                 <img
//                                                                     alt=""
//                                                                     src="assets/img/lp-sprite (1).png"
//                                                                     className="img-fluid me-2"
//                                                                     style={{ width: "25px" }}
//                                                                 ></img>
//                                                             </span>
//                                                             Gold
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             <span>
//                                                                 <i className="ri-checkbox-blank-fill me-2 fs-5" style={{ color: "#EBEBEB" }}></i>
//                                                             </span>
//                                                             Platinum
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             <span>
//                                                                 <img
//                                                                     alt=""
//                                                                     src="assets/img/lp-sprite (3).png"
//                                                                     className="img-fluid me-2"
//                                                                     style={{ width: "25px" }}
//                                                                 ></img>
//                                                             </span>
//                                                             Gemstone
//                                                         </label>
//                                                     </div>
//                                                 </div>

//                                                 {/* Metal */}
//                                                 {/* <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Metal</h2>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             18 KT Yellow
//                                                             <span>(112)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             14 KT White
//                                                             <span>(111)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             18 KT Rose
//                                                             <span>(30)</span>
//                                                         </label>
//                                                     </div>
//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             value=""
//                                                             id="flexCheckDefault"
//                                                         />
//                                                         <label
//                                                             className="form-check-label"
//                                                             htmlFor="flexCheckDefault"
//                                                         >
//                                                             18 KT Two Tone
//                                                             <span>(25)</span>
//                                                         </label>
//                                                     </div>
//                                                 </div> */}

//                                                 {/* Shop For */}
//                                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Shop For</h2>

//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id="shopForWomen"
//                                                             checked={filters.typeBy === "female"}
//                                                             onChange={() => handleFilterChange("typeBy", "female")}
//                                                         />
//                                                         <label className="form-check-label" htmlFor="shopForWomen">
//                                                             Women
//                                                         </label>
//                                                     </div>

//                                                     <div className="form-check my-2">
//                                                         <input
//                                                             className="form-check-input"
//                                                             type="checkbox"
//                                                             id="shopForMen"
//                                                             checked={filters.typeBy === "male"}
//                                                             onChange={() => handleFilterChange("typeBy", "male")}
//                                                         />
//                                                         <label className="form-check-label" htmlFor="shopForMen">
//                                                             Men
//                                                         </label>
//                                                     </div>
//                                                 </div>

//                                                 {/* Occasion */}
//                                                 <div className="border border-bottom-3 border-top-0 border-start-0 border-end-0 pb-2">
//                                                     <h2 className="filter_title mt-3">Occasion</h2>
//                                                     {occasion.slice(0, showMoreOccasion ? occasion.length : 4).map(
//                                                         (subCategory, index) => (
//                                                             <div className="form-check my-2" key={index}>
//                                                                 <input
//                                                                     className="form-check-input"
//                                                                     type="checkbox"
//                                                                     value={subCategory}
//                                                                     id={`subCategory${index}`}
//                                                                     checked={filters.occasionBy?.includes(subCategory) || false}
//                                                                     onChange={() =>
//                                                                         handleFilterChange("occasionBy", subCategory)
//                                                                     }
//                                                                 />
//                                                                 <label
//                                                                     className="form-check-label"
//                                                                     htmlFor={`subCategory${index}`}
//                                                                 >
//                                                                     {subCategory}
//                                                                 </label>
//                                                             </div>
//                                                         )
//                                                     )}
//                                                     {occasion.length > 4 && (
//                                                         <button className="btn p-0 show_more_btn" onClick={() => setShowMoreOccasion(!showMoreOccasion)}>
//                                                             {showMoreOccasion ? <MdKeyboardArrowUp className="fs-5 me-2" /> : <MdKeyboardArrowDown className="fs-5 me-2" />}
//                                                             {showMoreOccasion ? "Show Less" : "More"}
//                                                         </button>
//                                                     )}
//                                                 </div>
//                                             </div>
//                                             <div className="container-fluid filter_offcanvas py-3">
//                                                 <div className="row">
//                                                     <div className="col-md-6 col-sm-6 col-6">
//                                                         <button className="btn w-100 filter_md_btn" onClick={clearFilters}>
//                                                             Clear All
//                                                         </button>
//                                                     </div>
//                                                     <div className="col-md-6 col-sm-6 col-6">
//                                                         <button
//                                                             className="btn w-100 text-light filter_md_btn1"
//                                                             data-bs-dismiss="offcanvas"
//                                                             aria-label="Close"
//                                                         >
//                                                             APPLY FILTERS
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>

//                         <div className="col-lg-9">
//                             <div className="row">
//                                 <div className="col d-lg-flex d-none justify-content-end" style={{ fontSize: "10px" }}>
//                                     <select
//                                         className="form-select custom-select w-auto"
//                                         value={`${filters.sortBy}_${filters.priceOrder}`}  // Combine the values of sortBy and priceOrder
//                                         onChange={(e) => handleSelectFilterChange(e.target.value)}  // Pass combined value
//                                     >
//                                         <option value="featured">Featured</option>
//                                         <option value="newestFirst">Latest</option>
//                                         <option value="newestFirst_lowToHigh">Low to High</option>
//                                         <option value="newestFirst_highToLow">High to Low</option>
//                                     </select >
//                                 </div>
//                             </div>
//                             <div className="row">
//                                 {loading ? (
//                                     <Loader></Loader>
//                                 ) : error && Object.values(filters).some(val => val !== "" && val !== undefined) ? (
//                                     // Show message only if a filter is applied
//                                     <div className="text-center w-100 py-5">
//                                         <h4>{error}</h4>
//                                         <p>Oops! There are no products available under your current selection.</p>
//                                     </div>
//                                 ) : products.length > 0 ? (
//                                     products.map((item) => (
//                                         <React.Fragment key={item.id} onClick={() => handleProductClick(item.id)}>
//                                             <div className="col-xl-3 col-lg-4 col-md-4 col-sm-6 col-6 card_shadow p-0 px-1">
//                                                 <Link>
//                                                     <ProductCard Productsitem={item} />
//                                                 </Link>
//                                             </div>
//                                         </React.Fragment>
//                                     ))
//                                 ) : (
//                                     <></> // Agar koi filter apply nahi kiya toh koi message na dikhaye
//                                 )}
//                             </div>

//                             {/* <div className="pagination">
//                                 <ul>{renderPagination()}</ul>
//                             </div> */}
//                         </div>
//                     </div>
//                 </section>
//             </>
//         </Helmet >
//     );
// };

// export default Earrings;