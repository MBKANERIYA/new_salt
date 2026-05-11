import API_BASE_URL from '../../Utils/apiConfig.js';
import React, { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { formatCurrency } from '../../Utils/formateCurrency';
import axios from 'axios';
import Loader from '../Loader';

const OrderSummary = () => {
    const [loading, setLoading] = useState(false);
    const cartItems = useSelector((state) => state.cart.cartItem);
    const [subtotal, setSubtotal] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [couponDiscount, setCouponDiscount] = useState(0); // New state for coupon discount in rupees
    const discountPercentage = useSelector(state => state.cart.discount); // Renamed for clarity
    const user = JSON.parse(localStorage.getItem('user'));
    const [totallPrice, setTotallPrice] = useState(0);
    const [product, setProduct] = useState([]); // Initialize as an array

    const calculateSubtotal = useCallback(() => {
        return (cartItems || []).reduce(
            (total, item) => total + Number(item.totalprice),
            0
        );
    }, [cartItems]);

    const updateAmounts = useCallback(() => {
        const newSubtotal = calculateSubtotal();

        // Calculate discount amount in rupees
        const calculatedDiscount = newSubtotal * (discountPercentage / 100);
        setCouponDiscount(calculatedDiscount);

        // Calculate total amount after discount
        const discountedAmount = newSubtotal - calculatedDiscount;
        setTotalAmount(discountedAmount);
    }, [calculateSubtotal, discountPercentage]);

    useEffect(() => {
        updateAmounts();
    }, [cartItems, discountPercentage, updateAmounts]);

    const fetchCart = async () => {
        try {
            setLoading(true); // Start loader

            // Check if this is a Buy Now flow
            const buyNowData = localStorage.getItem('buyNowProduct');
            if (buyNowData) {
                const buyNowItem = JSON.parse(buyNowData);
                setProduct([buyNowItem]);
                setTotallPrice(buyNowItem.itemPrice || 0);
                setLoading(false);
                return;
            }

            let userId = user?._id || localStorage.getItem('guestUserId');

            if (!userId) {
                setLoading(false);
                return;
            }

            const response = await axios.get(`${API_BASE_URL}/v1/cart/getCart/${userId}`);
            console.log(response.data); // Debug response structure

            const data = response.data;

            // Calculate Main Price (Multiplying total14KT with quantity)
            const productsWithPrices = data.cart.quantity.map((item) => {
                const itemPrice = (item.productId.total14KT || 0) * (item.quantity || 0); // Multiply total14KT price with quantity
                return {
                    ...item, // Spread other product properties
                    itemPrice, // Add calculated price for the product
                };
            });

            // Calculate the total main price
            const mainPrice = productsWithPrices.reduce((acc, item) => acc + item.itemPrice, 0);

            // Set state
            setProduct(productsWithPrices); // Updated products with itemPrice
            setTotallPrice(mainPrice); // Total price

        } catch (err) {
            console.error("Error fetching cart data:", err);
        } finally {
            setLoading(false); // Stop loader
        }
    };
    useEffect(() => {
        fetchCart();
    }, [user?._id]);

    // Recalculate coupon discount when discount percentage or totallPrice changes
    useEffect(() => {
        const discountAmount = totallPrice * (discountPercentage / 100);
        setCouponDiscount(discountAmount);
        setTotalAmount(totallPrice - discountAmount);
    }, [discountPercentage, totallPrice]);
    return (
        <>
            {loading && <Loader />}
            <div className='login_product px-3'>
                <h5 className='pb-3 fw-bold color'>Order Summary</h5>
                {
                    product.map((item) => (
                        <div className='row align-items-center d-flex py-1' key={item.productId.product_id}>
                            <div className='col-lg-3 col-md-4 col-sm-4 col-4'>
                                <Link to={`/productDetail/${item.id}`}>
                                    <img alt={item.productId.title} src={item.productId.image01} className='img-fluid cart_img' />
                                </Link>
                            </div>
                            <div className='col-lg-9 col-md-8 col-sm-8 col-8 pt-3 d-flex justify-content-between'>
                                <div>
                                    <p className='login_SKU m-0 pb-1'>SKU: {item.productId.id}</p>
                                    <h6 className='m-0 login_title pb-1'>{item.productId.title}</h6>
                                    <p className='login_price m-0'>{formatCurrency(item.itemPrice)}</p>

                                    <p className='login_quantity m-0'>Quantity: {item.quantity}</p>
                                    {/* <p className='login_delivery m-0 p-0'>Expected Delivery by - 30th Aug</p> */}
                                </div>
                            </div>
                        </div>
                    ))
                }
                <div className='login_total summary_border'>
                    <h6 className='login_subtotal'>
                        SUBTOTAL
                        <span>{formatCurrency(totallPrice)}</span>
                    </h6>
                    <h6 className='login_discount'>
                        COUPON DISCOUNT
                        <span className="fw-bold">- {formatCurrency(couponDiscount.toFixed())}</span>
                    </h6>
                    <h6 className='login_shipping'>
                        SHIPPING CHARGES
                        <span>FREE</span>
                    </h6>
                </div>
                <h6 className='login_cost fw-bold'>
                    TOTAL COST
                    <span>{formatCurrency(totalAmount.toFixed())}</span>
                </h6>
                <p className='text-center fw-bold' style={{ color: "#00362A", fontSize: "14px" }}>Need Help?</p>
                <p className='text-center login_SKU'>We’re available by phone +91 7984369890 (Toll Free) every day, 9 AM to 1 AM IST (Mon - Sun)</p>
                <div className='text-center pt-3 d-flex justify-content-center gap-3'>
                    <div
                        className="background text-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "45px", height: "45px" }}
                    >
                        <i className="ri-phone-line fs-4"></i>
                    </div>
                    <div
                        className="background text-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "45px", height: "45px" }}
                    >
                        <i className="ri-whatsapp-line fs-4"></i>
                    </div>
                    <div
                        className="background text-light rounded-circle d-flex align-items-center justify-content-center"
                        style={{ width: "45px", height: "45px" }}
                    >
                        <i className="ri-mail-line fs-4"></i>
                    </div>
                </div>

            </div>
        </>
    )
}

export default OrderSummary