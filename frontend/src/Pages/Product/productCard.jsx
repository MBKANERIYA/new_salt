import API_BASE_URL from '../../Utils/apiConfig.js';
import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { v4 as uuidv4 } from "uuid";
import axios from 'axios';
import { formatCurrency } from '../../Utils/formateCurrency'; // Utility for formatting currency
import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/Slice/CartSlice';

const renderStar = (rating) => {
    const adjustedPercentage = ((rating / 5) * 100); // Adjust fill percentage
    return (
        <span
            style={{
                display: "inline-block",
                position: "relative",
                fontSize: "17px",
                verticalAlign: "middle",
                color: "#ccc", // Default gray star
            }}
        >
            ★{/* Empty gray star */}
            <span
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: `${adjustedPercentage}%`, // Adjusted fill percentage
                    overflow: "hidden",
                    color: "#FABF46", // Filled star color
                    // textShadow: "0 0 3px rgba(0, 0, 0, 0.5)", // Improve visibility
                }}
            >
                ★
            </span>
        </span>
    );
};

const ProductCard = ({ Productsitem }) => {
    const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user's data from localStorage
    const { product_id, title, total14KT, goldImages, media, image01, image02, image03 } = Productsitem; // Destructure product details
    const slider = useRef(null); // Ref for the slider
    const [isWishlist, setIsWishlist] = useState(false);
    const [rating, setRating] = useState(0);
    const dispatch = useDispatch();
    let displayImages = [];

    if (goldImages && goldImages.length > 0) {
        displayImages = goldImages;
    } else if (media && media.length > 0) {
        displayImages = media.filter(item => item.type === 'goldImage').map(item => item.productAsset)
    } else {
        // Fallback: build from image01, image02, image03 fields
        [image01, image02, image03].forEach(img => {
            if (img) displayImages.push(img);
        });
    }
    const fetchRating = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/v1/rating/getRating/${product_id}`);
            console.log("Fetched Rating Data:", response.data);
            const averageRating = response.data.averageRating

            const { approvedRating } = response.data;

            if (approvedRating && approvedRating.length > 0) {
                // Calculate Average Rating
                const totalRatings = approvedRating.length;
                const avgRating = approvedRating.reduce((sum, item) => sum + item.userRating, 0) / totalRatings;

                setRating(averageRating); // Rounded to 1 decimal
            } else {
                setRating(0);
            }
        } catch (error) {
            console.warn("Product rating not found, setting rating to 0");
            // if (error.response) {
                
            //     // setProductRating(0);
            // } else {
            //     // console.error("Error fetching rating:", error);
            //     // setProductRating(0);
            // }
        }
    };
    useEffect(() => {
        fetchRating();
    }, [product_id]);

    useEffect(() => {
        const fetchWishlist = async () => {
            try {
                let userId = user?._id || localStorage.getItem("guestUserId");

                // console.log(userId, "ninjlnmod");

                if (!userId) return; // Agar dono null hain, toh call na karein

                const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${userId}`);
                // console.log(response);
                
                const wishlistData = response.data.wishlist || {};
                const wishlistProductIds = (wishlistData.products || []).map(item => item.productId.product_id);

                localStorage.setItem('wishlist', JSON.stringify(wishlistProductIds));
                setIsWishlist(wishlistProductIds.includes(product_id));
            } catch (error) {
                console.error("Wishlist fetch error:", error);
            }
        };

        fetchWishlist();
    }, [product_id, user?._id]);

    const handleWishlistToggle = async (event) => {
        event.preventDefault(); // Page reload hone se roke

        let userId = user?._id; // Logged-in user ka ID check kare

        if (!userId) {
            // Guest user ke liye userId generate karo
            let guestUserId = localStorage.getItem("guestUserId");
            if (!guestUserId) {
                guestUserId = uuidv4();
                localStorage.setItem("guestUserId", guestUserId);
            }
            userId = guestUserId; // Guest ID ko userId ke jaisa treat karenge
        }

        const newWishlistStatus = !isWishlist; // UI ko pehle update karenge
        setIsWishlist(newWishlistStatus); // Optimistic UI Update

        try {
            if (newWishlistStatus) {
                // Add to Wishlist API
                await axios.post(`${API_BASE_URL}/v1/wishlist/create_wishlist`, {
                    userId,
                    productId: product_id,
                });
                // Dispatch to Redux so Header badge updates
                dispatch(cartAction.addToWishlist({ id: product_id }));
                // toast.success("Added to Wishlist!");
            } else {
                // Remove from Wishlist API
                await axios.delete(`${API_BASE_URL}/v1/wishlist/remove_wishlist/${userId}/${product_id}`);
                // Dispatch to Redux so Header badge updates
                dispatch(cartAction.removeFromWishlist(product_id));
                // toast.info("Removed from Wishlist!");
            }
        } catch (error) {
            console.error("Wishlist error:", error);
            setIsWishlist(!newWishlistStatus); // Agar error aaye to state reset karo
            toast.error("Something went wrong!");
        }
    };

    // Settings for the image and video slider
    const imageVideo = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    return (
        <div className="card-container position-relative">
            <div>
                <Link to={`/Productdetails/${title ? title.replace(/[\s/]+/g, '-').toLowerCase() : product_id}`}>
                    {/* Slider for product images */}
                    {displayImages?.length > 0 ? (
                        displayImages.length === 1 ? (
                            <img
                                alt="product-image"
                                src={displayImages[0]}
                                className="img-fluid border border-1 zoom-img"
                                onError={(e) => {
                                    e.target.onerror = null; // Prevent infinite loop
                                    e.target.style.display = "none";
                                    e.target.parentElement.innerHTML = `
                                    <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1' style='height: 200px;'>
                                        <span class='exlimation_mark'>!</span>
                                    </div>`;
                                }}
                            />
                        ) : (
                            <Slider ref={slider} {...imageVideo} className="border border-1">
                                {displayImages.map((img, index) => (
                                    <img
                                        key={index}
                                        alt={`product-image-${index}`}
                                        src={img}
                                        className="img-fluid zoom-img"
                                        onError={(e) => {
                                            e.target.onerror = null; // Prevent infinite loop
                                            e.target.style.display = "none";
                                            e.target.parentElement.innerHTML = `
                                            <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1' style='height: 200px;'>
                                                <span class='exlimation_mark'>!</span>
                                            </div>`;
                                        }}
                                    />
                                ))}
                            </Slider>
                        )
                    ) : (
                        <div className="no-image-placeholder d-flex justify-content-center align-items-center border border-1">
                            <span className="exlimation_mark">!</span>
                        </div>
                    )}


                </Link>

                {/* Hover Content for large screens */}
                <div className="card-body p-0 d-lg-block d-none px-1">
                    <div className="hover-details position-absolute w-100">
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons */}
                    <div>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-block d-none">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-block d-none">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>
                    </div>

                    {/* Wishlist Heart Icon */}
                    {/* <div className="wishlist-icons position-absolute top-0 end-0 p-2">
                        <i
                            className={`fs-5 heart-icon ${isWishlist ? 'fa-solid fa-heart text-dark' : 'fa-regular fa-heart'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div> */}
                    <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
                        {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty
                            className="fs-5 heart_icon"
                            data-bs-toggle="tooltip"
                            data-bs-placement="bottom"
                            title="Add to Wishlist"
                        />}
                    </div>

                    <div className="review_card position-absolute bottom-0 left-0 my-2 d-flex align-items-center">
                        <p className="m-0 pe-1">{rating}</p>
                        {renderStar(rating)}
                    </div>

                </div>

                {/* Mobile view content */}
                <div className="card-body p-0 d-lg-none d-md-block">
                    <div className='text-center pt-1'>
                        <p className="m-0">{formatCurrency(total14KT)}</p>
                        <h6>{title}</h6>
                    </div>

                    {/* Slider navigation buttons for mobile */}
                    <div>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-none d-block">
                            <i className="ri-arrow-left-wide-line"></i>
                        </button>
                        <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-none d-block">
                            <i className="ri-arrow-right-wide-line"></i>
                        </button>   
                    </div>

                    {/* Wishlist Heart Icon for mobile */}
                    {/* <div className="d-flex align-items-center color_md">
                        <i
                            className={`fs-4 absolute_heart heart-icon ${isWishlist ? 'ri-heart-fill text-dark' : 'ri-heart-line'}`}
                            style={{ cursor: 'pointer' }}
                            onClick={handleWishlistToggle}
                        ></i>
                    </div> */}
                    <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
                        {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty className="fs-5 heart_icon" />}
                    </div>
                    <div className="review_card review_card_md position-absolute left-0 my-2 d-flex align-items-center">
                        <p className="m-0 pe-1">{rating}</p>
                        {renderStar(rating)}
                    </div>
                </div>
            </div>
        </div >
    );
};

export default ProductCard;


// import React, { useRef, useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import Slider from 'react-slick';
// import { v4 as uuidv4 } from "uuid";
// import axios from 'axios';
// import { formatCurrency } from '../../Utils/formateCurrency'; // Utility for formatting currency
// import { IoHeart } from "react-icons/io5";
// import { IoMdHeartEmpty } from "react-icons/io";
// import { toast } from 'react-toastify';
// import Shimmer from '../../ShimmerEffect/shimmer'; // Shimmer component import

// const renderStar = (rating) => {
//     const adjustedPercentage = ((rating / 5) * 100); // Adjust fill percentage
//     return (
//         <span
//             style={{
//                 display: "inline-block",
//                 position: "relative",
//                 fontSize: "17px",
//                 verticalAlign: "middle",
//                 color: "#ccc", // Default gray star
//             }}
//         >
//             ★{/* Empty gray star */}
//             <span
//                 style={{
//                     position: "absolute",
//                     top: 0,
//                     left: 0,
//                     width: `${adjustedPercentage}%`, // Adjusted fill percentage
//                     overflow: "hidden",
//                     color: "#FABF46", // Filled star color
//                 }}
//             >
//                 ★
//             </span>
//         </span>
//     );
// };

// const ProductCard = ({ Productsitem }) => {
//     const user = JSON.parse(localStorage.getItem('user')); // Get the logged-in user's data from localStorage
//     const { product_id, title, total14KT, goldImages, media } = Productsitem; // Destructure product details
//     const slider = useRef(null); // Ref for the slider
//     const [isWishlist, setIsWishlist] = useState(false);
//     const [rating, setRating] = useState(0);
//     const [loading, setLoading] = useState(true); // Initial loading state is true

//     let displayImages = [];

//     if (goldImages && goldImages.length > 0) {
//         displayImages = goldImages;
//     } else if (media && media.length > 0) {
//         displayImages = media.filter(item => item.type === 'goldImage').map(item => item.productAsset);
//     }

//     const fetchRating = async () => {
//         try {
//             const response = await axios.get(`${API_BASE_URL}/v1/rating/getRating/${product_id}`);
//             const averageRating = response.data.averageRating;

//             const { approvedRating } = response.data;

//             if (approvedRating && approvedRating.length > 0) {
//                 // Calculate Average Rating
//                 const totalRatings = approvedRating.length;
//                 const avgRating = approvedRating.reduce((sum, item) => sum + item.userRating, 0) / totalRatings;

//                 setRating(avgRating); // Set the calculated average rating
//             } else {
//                 setRating(0);
//             }
//         } catch (error) {
//             console.warn("Product rating not found, setting rating to 0");
//         }
//     };

//     useEffect(() => {
//         fetchRating();
//     }, [product_id]);

//     useEffect(() => {
//         const fetchWishlist = async () => {
//             try {
//                 let userId = user?._id || localStorage.getItem("guestUserId");

//                 if (!userId) return; // If userId is null, return without fetching

//                 const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${userId}`);

//                 const wishlistData = response.data.wishlist || {};
//                 const wishlistProductIds = (wishlistData.products || []).map(item => item.productId.product_id);

//                 localStorage.setItem('wishlist', JSON.stringify(wishlistProductIds));
//                 setIsWishlist(wishlistProductIds.includes(product_id));
//                 setLoading(false); // Set loading to false once wishlist is fetched
//             } catch (error) {
//                 console.error("Wishlist fetch error:", error);
//                 setLoading(false); // Set loading to false if there's an error in fetching wishlist
//             }
//         };

//         fetchWishlist();
//     }, [product_id, user?._id]);

//     const handleWishlistToggle = async (event) => {
//         event.preventDefault(); // Prevent page reload on heart click

//         let userId = user?._id; // Logged-in user ID

//         if (!userId) {
//             // Generate a guest user ID if not logged in
//             let guestUserId = localStorage.getItem("guestUserId");
//             if (!guestUserId) {
//                 guestUserId = uuidv4();
//                 localStorage.setItem("guestUserId", guestUserId);
//             }
//             userId = guestUserId; // Use guest user ID if no logged-in user
//         }

//         const newWishlistStatus = !isWishlist; // Toggle wishlist status
//         setIsWishlist(newWishlistStatus); // Optimistic UI Update

//         try {
//             if (newWishlistStatus) {
//                 // Add to Wishlist API
//                 await axios.post(`${API_BASE_URL}/v1/wishlist/create_wishlist`, {
//                     userId,
//                     productId: product_id,
//                 });
//             } else {
//                 // Remove from Wishlist API
//                 await axios.delete(`${API_BASE_URL}/v1/wishlist/remove_wishlist/${userId}/${product_id}`);
//             }
//         } catch (error) {
//             console.error("Wishlist error:", error);
//             setIsWishlist(!newWishlistStatus); // Revert wishlist state if error occurs
//             toast.error("Something went wrong!");
//         }
//     };

//     const imageVideo = {
//         dots: false,
//         infinite: true,
//         speed: 500,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//     };

//     return (
//         <div className="card-container position-relative">
//             {loading ? (
//                 <Shimmer /> // Show shimmer effect when loading is true
//             ) : (
//                 <div>
//                     <Link to={`/Productdetails/${title ? title.replace(/[\s/]+/g, '-').toLowerCase() : product_id}`}>
//                         {displayImages?.length > 0 ? (
//                             displayImages.length === 1 ? (
//                                 <img
//                                     alt="product-image"
//                                     src={displayImages[0]}
//                                     className="img-fluid border border-1"
//                                     onError={(e) => {
//                                         e.target.onerror = null; // Prevent infinite loop
//                                         e.target.style.display = "none";
//                                         e.target.parentElement.innerHTML = `
//                                             <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1' style='height: 200px;'>
//                                                 <span class='exlimation_mark'>!</span>
//                                             </div>`;
//                                     }}
//                                 />
//                             ) : (
//                                 <Slider ref={slider} {...imageVideo} className="border border-1">
//                                     {displayImages.map((img, index) => (
//                                         <img
//                                             key={index}
//                                             alt={`product-image-${index}`}
//                                             src={img}
//                                             className="img-fluid"
//                                             onError={(e) => {
//                                                 e.target.onerror = null; // Prevent infinite loop
//                                                 e.target.style.display = "none";
//                                                 e.target.parentElement.innerHTML = `
//                                                     <div class='no-image-placeholder d-flex justify-content-center align-items-center border border-1' style='height: 200px;'>
//                                                         <span class='exlimation_mark'>!</span>
//                                                     </div>`;
//                                             }}
//                                         />
//                                     ))}
//                                 </Slider>
//                             )
//                         ) : (
//                             <div className="no-image-placeholder d-flex justify-content-center align-items-center border border-1">
//                                 <span className="exlimation_mark">!</span>
//                             </div>
//                         )}
//                     </Link>

//                     {/* Product details (hidden during loading) */}
//                     <div className="card-body p-0 d-lg-block d-none px-1">
//                         <div className="hover-details position-absolute w-100">
//                             <p className="m-0">{formatCurrency(total14KT)}</p>
//                             <h6>{title}</h6>
//                         </div>
//                         <div>
//                             <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-block d-none">
//                                 <i className="ri-arrow-left-wide-line"></i>
//                             </button>
//                             <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-block d-none">
//                                 <i className="ri-arrow-right-wide-line"></i>
//                             </button>
//                         </div>
//                         <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
//                             {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty className="fs-5 heart_icon" />}
//                         </div>

//                         <div className="review_card position-absolute bottom-0 left-0 my-3 d-flex align-items-center">
//                             <p className="m-0 pe-1">{rating}</p>
//                             {renderStar(rating)}
//                         </div>
//                     </div>

//                     {/* Mobile view content */}
//                     <div className="card-body p-0 d-lg-none d-md-block">
//                         <div className='text-center pt-1'>
//                             <p className="m-0">{formatCurrency(total14KT)}</p>
//                             <h6>{title}</h6>
//                         </div>
//                         <div>
//                             <button onClick={(e) => { e.preventDefault(); slider?.current?.slickPrev(); }} className="absolute_prev_btn d-lg-none d-block">
//                                 <i className="ri-arrow-left-wide-line"></i>
//                             </button>
//                             <button onClick={(e) => { e.preventDefault(); slider?.current?.slickNext(); }} className="absolute_next_btn d-lg-none d-block">
//                                 <i className="ri-arrow-right-wide-line"></i>
//                             </button>
//                         </div>
//                         <div className="wishlist-icons position-absolute top-0 end-0 p-2" style={{ cursor: 'pointer' }} onClick={handleWishlistToggle}>
//                             {isWishlist ? <IoHeart className="fs-5 heart_icon" /> : <IoMdHeartEmpty className="fs-5 heart_icon" />}
//                         </div>
//                         <div className="review_card review_card_md position-absolute left-0 my-3 d-flex align-items-center">
//                             <p className="m-0 pe-1">{rating}</p>
//                             {renderStar(rating)}
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default ProductCard;