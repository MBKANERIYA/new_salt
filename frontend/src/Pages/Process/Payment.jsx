import React, { useCallback, useEffect, useState } from 'react';
import OrderSummary from './OrderSummary';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
import { cartAction } from '../../Store/Slice/CartSlice';
import axios from 'axios';
import API_BASE_URL from '../../Utils/apiConfig.js';

const Payment = () => {
    const [selectedOption, setSelectedOption] = useState('');
    const dispatch = useDispatch();
    const discount = useSelector(state => state.cart.discount);

    const handleSelection = (option) => {
        setSelectedOption(option);
    };

    const navigate = useNavigate();

    const handlePayNow = async () => {
        if (!selectedOption) {
            toast.error('Please select a payment method.');
            return;
        }

        if (selectedOption === 'COD-card') {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                const userId = user?._id || localStorage.getItem('guestUserId');
                const orderData = JSON.parse(localStorage.getItem('orderData') || '{}');
                const shippingData = orderData.shippingAddress || {};

                if (!userId) {
                    toast.error('User not found. Please login again.');
                    return;
                }

                const response = await axios.post(`${API_BASE_URL}/v1/order/createOrder/${userId}`, {
                    paymentMethod: 'COD',
                    shippingAddress: shippingData,
                    billingAddress: shippingData,
                    discount: discount || 0,
                });

                if (response.data.status) {
                    // Clear cart from Redux
                    dispatch(cartAction.clearCart());
                    // Clear localStorage order data
                    localStorage.removeItem('orderData');
                    localStorage.removeItem('shippingAddress');

                    toast.success(`Order placed! Order ID: ${response.data.order.orderId}`);
                    navigate('/U-order');
                }
            } catch (error) {
                console.error('Error placing order:', error);
                toast.error(error.response?.data?.message || 'Failed to place order. Please try again.');
            }
        } else {
            toast.info('Payment gateway integration coming soon. Please use COD for now.');
        }
    };

    useEffect(() => {
        // Clean up any leftover Bootstrap modal artifacts from previous pages
        const cleanupModal = () => {
            document.body.classList.remove('modal-open');
            document.body.style.overflow = '';
            document.body.style.paddingRight = '';
            document.body.removeAttribute('style');
            const backdrops = document.querySelectorAll('.modal-backdrop');
            backdrops.forEach(b => b.remove());
        };

        cleanupModal();
        // Retry multiple times to catch any late-applied modal artifacts
        const t1 = setTimeout(cleanupModal, 100);
        const t2 = setTimeout(cleanupModal, 300);
        const t3 = setTimeout(cleanupModal, 500);

        window.scrollTo(0, 0);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
    }, []);

    // header scroll
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = useCallback(() => {
        console.log(window.scrollY);
        setIsScrolled(window.scrollY > 50);
        console.log(isScrolled);
    }, [isScrolled]);

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <>
            <section className={`cart_header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="cart_header_left">
                    <Link to="/gift" className="back-button">
                        <i className="ri-arrow-left-line"></i>
                    </Link>
                    {/* <div className="cart_logo">
                        <i className="ri-shopping-cart-fill cart_logo_icon d-lg-block d-md-block d-sm-block d-none"></i>
                        <img alt='' src='assets/img/tiffco-logo-2.svg' className='cart_logo_icon'></img>
                    </div> */}
                    <Link to="/" className="text-decoration-none text-dark">
                        <img
                            alt=''
                            src='/assets/img/logo_website.png'
                            className='img-fluid mx-auto d-block cart-logo-fixed'
                        />
                    </Link>
                </div>

                {/* <div className="cart_header_center">
                    <div className="toggle-buttons">
                        <button className="toggle-button ">Shopping Cart ({totalQuantity})</button>
                        <button className="toggle-button active d-lg-block d-none">Trial Cart (0)</button>
                    </div>
                </div> */}

                <div className="cart_header_right">
                    <Link to="https://wa.me/+917984369890" target="_blank" rel="noopener noreferrer" className="assistance-link text-decoration-none">
                        <span className='d-lg-block d-md-block d-sm-block d-none'>
                            Need Assistance?
                        </span>
                        <i className="ri-whatsapp-line whatsapp-icon"></i>
                    </Link>
                </div>
            </section>
            <section className='container-fluid mb_medium'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pt-5 pb-3 m-0 p-0 px-4'>
                        <div className='payment_sec mx-auto d-block'>
                            <h6 className='fw-bold pb-2'>Preferred Payment Options</h6>
                            <div className={`payment-option my-2 ${selectedOption === 'credit-card' ? 'selected' : ''}`} onClick={() => handleSelection('credit-card')}>
                                <div className="icon-wrapper">
                                    <img src="assets/img/card.png" alt="Credit Card Icon" className="icon" />
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">Credit Card</h4>
                                    <p className="description">Save & pay via credit cards</p>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="credit-card" name="payment-method" checked={selectedOption === 'credit-card'} onChange={() => handleSelection('credit-card')} />
                                </div>
                            </div>
                            <div className={`payment-option my-2 ${selectedOption === 'debit-card' ? 'selected' : ''}`} onClick={() => handleSelection('debit-card')}>
                                <div className="icon-wrapper">
                                    <img src="assets/img/card.png" alt="Debit Card Icon" className="icon" />
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">Debit Card</h4>
                                    <p className="description">Save & pay via debit cards</p>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="debit-card" name="payment-method" checked={selectedOption === 'debit-card'} onChange={() => handleSelection('debit-card')} />
                                </div>
                            </div>

                            <div
                                className={`payment-option my-2 ${selectedOption === 'upi-card' ? 'selected' : ''}`}
                                onClick={() => handleSelection('upi-card')}>
                                <div className="icon-wrapper">
                                    <img src="assets/img/upi.png" alt="UPI Icon" className="icon" />
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">UPI</h4>
                                    <p className="description">Paytm, Phonepe, Google Pay, & more</p>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="upi-card" name="payment-method" checked={selectedOption === 'upi-card'} onChange={() => handleSelection('upi-card')} />
                                </div>
                            </div>
                            <div
                                className={`payment-option my-2 ${selectedOption === 'banking-card' ? 'selected' : ''}`}
                                onClick={() => handleSelection('banking-card')}>
                                <div className="icon-wrapper">
                                    <img src="assets/img/net_banking.png" alt="Net Banking Icon" className="icon" />
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">Net Banking</h4>
                                    <p className="description">Select from a list of banks</p>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="banking-card" name="payment-method" checked={selectedOption === 'banking-card'} onChange={() => handleSelection('banking-card')} />
                                </div>
                            </div>
                            <div
                                className={`payment-option my-2 ${selectedOption === 'COD-card' ? 'selected' : ''}`}
                                onClick={() => handleSelection('COD-card')}>
                                <div className="icon-wrapper">
                                    {/* <img src="assets/img/net_banking.png" alt="Net Banking Icon" className="icon" /> */}
                                    <i className="fa-solid fa-indian-rupee-sign icon fs-4 text-center pt-2 "></i>
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">COD: Cash On Delivery</h4>
                                </div>
                                <div className="radio-wrapper">
                                    <input type="radio" id="COD-card" name="payment-method" checked={selectedOption === 'COD-card'} onChange={() => handleSelection('COD-card')} />
                                </div>
                            </div>
                            <h6 className='fw-bold py-3'>Gift Card</h6>
                            <div className='payment-option gift_card'>
                                <div className="icon-wrapper">
                                    <img src="assets/img/gift.png" alt="Net Banking Icon" className="icon" />
                                </div>
                                <div className="text-wrapper">
                                    <h4 className="payment_title">Have a gift card?</h4>
                                    <p className="description">Avail additional discounts with gift cards</p>
                                </div>
                                <div className="gift_add_wrapper">
                                    Add
                                </div>
                            </div>
                            <button
                                className='btn w-100 mx-auto d-block pay_btn my-3'
                                onClick={handlePayNow}
                                disabled={!selectedOption}
                                style={{ opacity: selectedOption ? 1 : 0.6, cursor: selectedOption ? 'pointer' : 'not-allowed' }}
                            >PAY NOW</button>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 bg_login sticky-header'>
                        <OrderSummary />
                    </div>
                </div>
            </section>
            <section className="cart_footer">
                <div className="cart_footer_left pt-3">
                    <p>
                        <strong>Contact Us:</strong>&nbsp; +91 7984369890 (Helpline) |
                        contact support@saltandglitz.com
                    </p>
                </div>
                <div className="cart_footer_right">
                    <img src="assets/img/cart_footer_logo.png" alt="payment-icon" className="payment-icon" />
                    <img src="assets/img/cart_footer_logo1.png" alt="MasterCard" className="payment-icon" />
                    <img src="assets/img/cart_footer_logo2.png" alt="PayPal" className="payment-icon" />
                    <img src="assets/img/cart_footer_logo3.png" alt="American Express" className="payment-icon" />
                </div>
            </section>
        </>
    )
}

export default Payment;
