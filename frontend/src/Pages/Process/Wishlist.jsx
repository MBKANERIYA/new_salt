import API_BASE_URL from '../../Utils/apiConfig.js';
import React, { useState, useEffect, useCallback } from 'react';
import EmptyState from '../EmptyState';
import { formatCurrency } from '../../Utils/formateCurrency';
import Aos from 'aos';
import "aos/dist/aos.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import Helmet from '../../Components/Helmet';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { useDispatch } from 'react-redux';
import { cartAction } from '../../Store/Slice/CartSlice';
import { HiShoppingCart } from "react-icons/hi2";
import Header from '../../Components/Header';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = JSON.parse(localStorage.getItem('user'));
  // Fetch wishlist items from the backend
  const fetchWishlist = useCallback(async () => {
    let userId = user?._id || localStorage.getItem("guestUserId");
    console.log(userId);

    try {
      const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${userId}`);
      console.log("Wishlist", response);
      console.log(response.data.wishlist.products);


      if (response.status === 200) {
        setWishlistItems(response.data.wishlist.products);
      }
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    Aos.init();
    fetchWishlist();
  }, [fetchWishlist]);  // No need to add fetchWishlist inside dependency array now

  // Remove item from wishlist
  const handleRemove = async (id) => {
    let userId = user?._id || localStorage.getItem("guestUserId");
    try {
      const res = await axios.delete(`${API_BASE_URL}/v1/wishlist/remove_wishlist/${userId}/${id}`);
      // console.log("Remove Wishlist Response:", res);
      if (res.status === 200) {
        setWishlistItems((prev) =>
          prev.filter((item) => item.productId.product_id !== id)
        );
        toast.success("Item removed from wishlist", {
          position: "bottom-center",
          autoClose: 1000,
        });
        // Update Redux so Header badge updates
        dispatch(cartAction.removeFromWishlist(id));
      } else {
        throw new Error("Failed to remove item from wishlist");
      }
    } catch (error) {
      console.error("Error removing item from wishlist:", error.response?.data || error.message);
      toast.error("Error removing item from wishlist", {
        position: "bottom-center",
        autoClose: 1000,
      });
    }
  };

  // Move item from wishlist to cart
  const handleMoveToCart = async (item, id) => {
    let userId = user?._id || localStorage.getItem("guestUserId");
    setLoading(true)
    const cartItem = {
      product: item.productId.product_id,
      user: userId,
      caratBy: item.caratBy || "14KT",
      colorBy: item.colorBy || "Yellow Gold",
      size: item.size || "6"
    };
    console.log("cartItem", cartItem);


    try {
      // Add item to cart
      const addCartResponse = await axios.post(
        `${API_BASE_URL}/v1/cart/addCart`,
        cartItem
      );
      console.log("Cart API Response:", addCartResponse);

      if (addCartResponse.status === 201 || addCartResponse.status === 200) {
        // Remove item from wishlist
        const removeWishlistResponse = await axios.delete(
          `${API_BASE_URL}/v1/wishlist/remove_wishlist/${userId}/${id}`
        );
        // console.log("Remove Wishlist Response:", removeWishlistResponse);

        if (removeWishlistResponse.status === 200) {
          // Update state and Redux store
          setWishlistItems((prev) =>
            prev.filter((wishlistItem) => wishlistItem.productId.product_id !== id)
          );
          const updatedCart = addCartResponse.data.updatedCart || addCartResponse.data.newCart;
          dispatch(cartAction.addItem(updatedCart));
          // Update Redux so Header badge updates
          dispatch(cartAction.removeFromWishlist(id));

          toast.success("Item moved to cart successfully!", {
            position: "bottom-center",
            autoClose: 1000,
          });
          navigate('/cart');
        } else {
          throw new Error("Failed to remove item from wishlist");
        }
      } else {
        throw new Error("Failed to add item to cart");
      }
    } catch (error) {
      console.error("Error Details:", error.response?.data || error.message);
      toast.error("Error processing your request", {
        position: "bottom-center",
        autoClose: 1000,
      });
    } finally {
      setLoading(false)
    }
  };

  return (
    <Helmet title="Wishlist">
      {loading && <Loader />}
      <section className='container py-5'>
        {
          wishlistItems.length > 0 ? (
            <section className='wishlist-items'>
              <div className='row'>
                {
                  wishlistItems.map((item) => (
                    <div key={item.productId.product_id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6'>
                      <div className='card border-0'>
                        <Link to={`/Productdetails/${item.productId.product_id}`}>
                          <img alt={item.productId.title} src={item.productId.image01} className='position-relative img-fluid'
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.style.display = "none";
                              e.target.parentElement.innerHTML = `
                                <div class='no-image-placeholder-home d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                                    <span class='exlimation_mark'>!</span>
                                </div>`;
                            }}></img>
                        </Link>
                        <div className='card-body d-flex justify-content-between align-items-center px-1'>
                          <div>
                            <p className='m-0'>{formatCurrency(item.productId.total14KT)}</p>
                            <h6 className='d-inline-block'>{item.productId.title}</h6>
                          </div>
                          <HiShoppingCart
                            className="wishlist_cart"
                            onClick={() => {
                              if (item?.productId?.product_id) {
                                handleMoveToCart(item, item.productId.product_id);
                              } else {
                                console.error("Invalid productId");
                              }
                            }}
                          />
                          <i
                            className="ri-close-line wishlist_close_icon"
                            onClick={() => handleRemove(item.productId.product_id)}
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))
                }
              </div>
            </section>
          ) : (
            <EmptyState />
          )
        }
      </section>
    </Helmet>
  );
};

export default Wishlist;

// import React, { useState, useEffect, useCallback } from 'react';
// import EmptyState from '../EmptyState';
// import { formatCurrency } from '../../Utils/formateCurrency';
// import Aos from 'aos';
// import "aos/dist/aos.css";
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import Helmet from '../../Components/Helmet';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { cartAction } from '../../Store/Slice/CartSlice';
// import { HiShoppingCart } from "react-icons/hi2";
// import Skeleton from 'react-loading-skeleton'; // Import Skeleton component

// const Wishlist = () => {
//   const [wishlistItems, setWishlistItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const user = JSON.parse(localStorage.getItem('user'));

//   // Fetch wishlist items from the backend
//   const fetchWishlist = useCallback(async () => {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/v1/wishlist/get_wishlist/${user._id}`);
//       if (response.status === 200) {
//         setWishlistItems(response.data.wishlist.products);
//       }
//     } catch (error) {
//       // Handle error
//     } finally {
//       setLoading(false);
//     }
//   }, [user._id]);

//   useEffect(() => {
//     Aos.init();
//     fetchWishlist();
//   }, [fetchWishlist]);

//   // Remove item from wishlist
//   const handleRemove = async (id) => {
//     try {
//       const res = await axios.delete(`${API_BASE_URL}/v1/wishlist/remove_wishlist/${user._id}/${id}`);
//       if (res.status === 200) {
//         setWishlistItems((prev) =>
//           prev.filter((item) => item.productId.product_id !== id)
//         );
//         toast.success("Item removed from wishlist", {
//           position: "bottom-center",
//           autoClose: 1000,
//         });
//       } else {
//         throw new Error("Failed to remove item from wishlist");
//       }
//     } catch (error) {
//       console.error("Error removing item from wishlist:", error.response?.data || error.message);
//       toast.error("Error removing item from wishlist", {
//         position: "bottom-center",
//         autoClose: 1000,
//       });
//     }
//   };

//   // Move item from wishlist to cart
//   const handleMoveToCart = async (item, id) => {
//     setLoading(true);
//     const cartItem = {
//       product: item.productId.product_id,
//       user: user._id,
//     };

//     try {
//       // Add item to cart
//       const addCartResponse = await axios.post(
//         `${API_BASE_URL}/v1/cart/addCart`,
//         cartItem
//       );

//       if (addCartResponse.status === 201 || addCartResponse.status === 200) {
//         // Remove item from wishlist
//         const removeWishlistResponse = await axios.delete(
//           `${API_BASE_URL}/v1/wishlist/remove_wishlist/${user._id}/${id}`
//         );

//         if (removeWishlistResponse.status === 200) {
//           // Update state and Redux store
//           setWishlistItems((prev) =>
//             prev.filter((wishlistItem) => wishlistItem.productId.product_id !== id)
//           );
//           const updatedCart = addCartResponse.data.updatedCart || addCartResponse.data.newCart;
//           dispatch(cartAction.addItem(updatedCart));

//           toast.success("Item moved to cart successfully!", {
//             position: "bottom-center",
//             autoClose: 1000,
//           });
//           navigate('/cart');
//         } else {
//           throw new Error("Failed to remove item from wishlist");
//         }
//       } else {
//         throw new Error("Failed to add item to cart");
//       }
//     } catch (error) {
//       console.error("Error Details:", error.response?.data || error.message);
//       toast.error("Error processing your request", {
//         position: "bottom-center",
//         autoClose: 1000,
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <Helmet title="Wishlist">
//       <section className='container py-5'>
//         {wishlistItems.length === 0 && !loading ? (
//           <EmptyState />
//         ) : (
//           <section className='wishlist-items'>
//             <div className='row'>
//               {/* Show skeleton loaders until the data is loaded */}
//               {loading
//                 ? [...Array(4)].map((_, index) => (
//                     <div key={index} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
//                       <div className='card border-0'>
//                         <Skeleton height={200} />
//                         <div className='card-body d-flex justify-content-between align-items-center'>
//                           <div>
//                             <Skeleton width={80} />
//                             <Skeleton width={150} />
//                           </div>
//                           <Skeleton width={50} height={40} />
//                         </div>
//                       </div>
//                     </div>
//                   ))
//                 : wishlistItems.map((item) => (
//                     <div key={item.productId.product_id} className='col-xl-3 col-lg-3 col-md-4 col-sm-6 col-6' data-aos="zoom-in-up" data-aos-duration="2000">
//                       <div className='card border-0'>
//                         <Link to={`/Productdetails/${item.productId.product_id}`}>
//                           <img alt={item.productId.title} src={item.productId.image01} className='position-relative img-fluid'></img>
//                         </Link>
//                         <div className='card-body d-flex justify-content-between align-items-center'>
//                           <div>
//                             <p className='m-0'>{formatCurrency(item.productId.total14KT)}</p>
//                             <h6 className='d-inline-block'>{item.productId.title}</h6>
//                           </div>
//                           <HiShoppingCart
//                             className="wishlist_cart"
//                             onClick={() => {
//                               if (item?.productId?.product_id) {
//                                 handleMoveToCart(item, item.productId.product_id);
//                               } else {
//                                 console.error("Invalid productId");
//                               }
//                             }}
//                           />
//                           <i
//                             className="ri-close-line wishlist_close_icon"
//                             onClick={() => handleRemove(item.productId.product_id)}
//                           ></i>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//             </div>
//           </section>
//         )}
//       </section>
//     </Helmet>
//   );
// };

// export default Wishlist;