import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';

const parseJSON = (key) => {
    try {
        return JSON.parse(localStorage.getItem(key)) || null;
    } catch (error) {
        console.error(`Error parsing JSON from ${key}:`, error);
        return null;
    }
};

const cartItems = parseJSON("cartItems") || [];
const wishlistItems = parseJSON("wishlist") || [];
const discount = parseJSON("discount") || 0;

// Recalculate from actual cartItems to prevent stale localStorage values
const totalQuantity = cartItems.reduce((total, item) => total + (item.quantity || 0), 0);
const subtotal = cartItems.reduce((total, item) => total + (Number(item.price) * Number(item.quantity || 0)), 0);

const setItem = (items, totalQuantity, subtotal, discount) => {
    localStorage.setItem("cartItems", JSON.stringify(items));
    localStorage.setItem("totalQuantity", JSON.stringify(totalQuantity));
    localStorage.setItem("subtotal", JSON.stringify(subtotal));
    localStorage.setItem("discount", JSON.stringify(discount));
};

const setWishlist = (wishlist) => {
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
};

const setRecentlyViewed = (recentlyViewed) => {
    localStorage.setItem("recentlyViewed", JSON.stringify(recentlyViewed));
};
// const getCartFromLocalStorage = () => {
//     const storedCart = localStorage.getItem("cartItems");
//     return storedCart ? JSON.parse(storedCart) : [];
// };

const initialState = {
    cartItems,
    wishlist: wishlistItems,
    recentlyViewed: parseJSON("recentlyViewed") || [],
    totalQuantity,
    subtotal,
    totalAmount: subtotal - (subtotal * (discount / 100)), // Apply discount calculation
    discount,
    error: null

};
// const setCartToLocalStorage = (cartItem) => {
//     localStorage.setItem("cartItems", JSON.stringify(cartItem)); // LocalStorage update ho raha hai
// };
export const getItemQuantity = (state, productId) => {
    const item = state.cart.cartItems.find(item => item.id === productId);
    return item ? item.quantity : 0;
};
const cartSlice = createSlice({
    name: "Cart",
    initialState,
    reducers: {
        addItem(state, action) {
            const newItem = action.payload;
            const existingItem = state.cartItems.find(item => String(item.id) === String(newItem.id));

            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    title: newItem.title,
                    image: newItem.image,
                    price: newItem.price,
                    caratBy: newItem.caratBy,
                    colorBy: newItem.colorBy,
                    size: newItem.size,
                    quantity: 1,
                    totalPrice: newItem.price
                });
            } else {
                existingItem.quantity++;
                existingItem.totalPrice += newItem.price;
            }

            // Update total quantities and subtotal
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.subtotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
        },

        removeItem(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => String(item.id) !== String(id));

            // Update total quantities and subtotal
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.subtotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
        },

        incrementItem(state, action) {
            const id = action.payload;
            const updatedCartItems = state.cartItems.map(item =>
                String(item.id) === String(id)
                    ? { ...item, quantity: item.quantity + 1, totalPrice: (item.quantity + 1) * item.price }
                    : item
            );

            state.cartItems = updatedCartItems;

            state.totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
            state.subtotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
        },


        decrementItem(state, action) {
            const id = action.payload;
            const updatedCartItems = state.cartItems.map(item =>
                String(item.id) === String(id)
                    ? { ...item, quantity: item.quantity - 1, totalPrice: (item.quantity - 1) * item.price }
                    : item
            ).filter(item => item.quantity > 0);

            state.cartItems = updatedCartItems;

            state.totalQuantity = updatedCartItems.reduce((total, item) => total + item.quantity, 0);
            state.subtotal = updatedCartItems.reduce((total, item) => total + item.totalPrice, 0);
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
        }
        ,

        // deleteItem(state, action) {
        //     const newItem = action.payload;
        //     const existingItem = state.cartItems.find(item => item.id === newItem.id);

        //     if (!existingItem) return;

        //     state.cartItem = state.cartItems.filter(item => item.id !== newItem.id);
        //     state.totalQuantity -= existingItem.quantity;

        //     state.subtotal = state.cartItems.reduce((total, item) =>
        //         total + Number(item.price) * Number(item.quantity), 0);

        //     if (state.cartItems.length === 0) {
        //         state.discount = 0;
        //     }

        //     state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));8

        //     setItem(state.cartItem, state.totalQuantity, state.subtotal, state.discount);
        // },

        deleteItem(state, action) {
            const id = action.payload;
            state.cartItems = state.cartItems.filter(item => String(item.id) !== String(id));

            state.subtotal = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));
            state.totalQuantity = state.cartItems.reduce((total, item) => total + item.quantity, 0);
            state.subtotal = state.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount); // LocalStorage se remove ho raha hai
        },

        addRecentlyViewed(state, action) {
            const newItem = action.payload;
            // console.log("New Recently Viewed Item:", newItem);

            const existingItem = state.recentlyViewed.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.recentlyViewed.unshift(newItem);
                if (state.recentlyViewed.length > 8) {
                    state.recentlyViewed.pop();
                }
                console.log("Updated Recently Viewed List:", state.recentlyViewed);
            }

            setRecentlyViewed(state.recentlyViewed); // Save to localStorage
        },

        applyCoupon(state, action) {
            const discountCode = action.payload?.toUpperCase()?.trim();
            let discountPercent = 0;
            let errorMessage = null;

            const couponMap = {
                'FLAT20': 20,
                'FLAT10': 10,
            };

            if (couponMap[discountCode]) {
                discountPercent = couponMap[discountCode];
            } else {
                errorMessage = "Invalid coupon code";
                discountPercent = 0;
            }

            state.discount = discountPercent;

            state.subtotal = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);

            state.totalAmount = state.subtotal - (state.subtotal * (discountPercent / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);

            if (errorMessage) {
                toast.error(errorMessage);
            } else {
                toast.success(`Discount of ${discountPercent}% applied!`);
            }
        },

        removeCoupon(state) {
            state.discount = 0;
            state.subtotal = state.cartItems.reduce((total, item) =>
                total + Number(item.price) * Number(item.quantity), 0);
            state.totalAmount = state.subtotal;
            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
            toast.info("Coupon removed");
        },

        addToWishlist(state, action) {
            const newItem = action.payload;
        
            // Ensure wishlist is initialized
            if (!state.wishlist) {
                state.wishlist = [];
            }
        
            // Validate newItem properties before using
            if (!newItem || !newItem.id) {
                console.error("Invalid item received for wishlist:", newItem);
                return;
            }
        
            const existingItem = state.wishlist.find(item => 
                item.id === newItem.id &&
                item.caratBy === newItem.caratBy &&
                item.colorBy === newItem.colorBy &&
                item.size === newItem.size
            );
        
            if (!existingItem) {
                state.wishlist.push({
                    id: newItem.id,
                    // title: newItem.title || "Unknown Product",
                    // image01: newItem.image01 || "",
                    // total14KT: newItem.total14KT || 0,
                    caratBy: newItem.caratBy,
                    colorBy: newItem.colorBy,
                    size: newItem.size,
                });
            }
        
            setWishlist(state.wishlist);
        },
        
        removeFromWishlist(state, action) {
            const itemId = action.payload;
            state.wishlist = state.wishlist.filter(item => item.id !== itemId);

            setWishlist(state.wishlist);
        },

        moveToWishlist(state, action) {
            const newItem = action.payload; // Ensure this has all necessary properties

            const existingItem = state.wishlist.find(item => item.id === newItem.id);

            if (!existingItem) {
                state.wishlist.push({
                    id: newItem.id,
                    // title: newItem.title,
                    // image01: newItem.image01,
                    // price: newItem.price,
                    caratBy: newItem.caratBy,
                    colorBy: newItem.colorBy,
                    size: newItem.size,
                });
            }

            setWishlist(state.wishlist);
        },

        clearCartAndWishlist(state) {
            state.cartItems = [];
            state.wishlist = [];
            state.totalQuantity = 0;
            state.subtotal = 0;
            state.totalAmount = 0;
            state.discount = 0;

            localStorage.removeItem('cartItems');
            localStorage.removeItem('wishlist');
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('subtotal');
            localStorage.removeItem('discount');
            localStorage.removeItem('recentlyViewed');
        },
        setUserData: (state, action) => {
            state.user = action.payload;
        },
        resetState: () => initialState, // Reset the entire state

        updateCart(state, action) {
            return action.payload; // Poora cart state replace karega
        },
        setCartFromBackend(state, action) {
            const { cartItems, totalQuantity, subtotal, discount } = action.payload;
            state.cartItems = cartItems;
            state.totalQuantity = totalQuantity;
            state.subtotal = subtotal;
            state.discount = discount;
            state.totalAmount = state.subtotal - (state.subtotal * (state.discount / 100));

            setItem(state.cartItems, state.totalQuantity, state.subtotal, state.discount);
        },
        clearCart(state) {
            state.cartItems = [];
            state.totalQuantity = 0;
            state.subtotal = 0;
            state.totalAmount = 0;
            state.discount = 0;
            localStorage.removeItem('cartItems');
            localStorage.removeItem('totalQuantity');
            localStorage.removeItem('subtotal');
            localStorage.removeItem('discount');
        }
    }
});

export const cartAction = cartSlice.actions;
export default cartSlice;
