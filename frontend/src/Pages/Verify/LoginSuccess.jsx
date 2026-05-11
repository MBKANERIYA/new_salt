import React, { useCallback, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import OrderSummary from '../Process/OrderSummary';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../../Components/firebase';
import { cartAction } from '../../Store/Slice/CartSlice';

const LoginSuccess = () => {

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

    const navigate = useNavigate(); // To redirect after logout
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser)); // Safely parse user data
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
            dispatch(cartAction.clearCartAndWishlist());

            // Clear user data
            localStorage.removeItem('user');

            setUser(null);
            toast.success('You have successfully logged out');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during log-out.');
        }
    };
    return (
        <>
            <section className={`cart_header ${isScrolled ? 'scrolled' : ''}`}>
                <div className="cart_header_left">
                    <Link to="/cart" className="back-button">
                        <i className="ri-arrow-left-line"></i>
                    </Link>
                    <Link to="/" className="text-decoration-none text-dark">
                        <img
                            alt=''
                            src='/assets/img/logo_website.png'
                            className='img-fluid mx-auto d-block cart-logo-fixed'
                        />
                    </Link>
                </div>
                <div className="cart_header_right">
                    <Link to="https://wa.me/+917984369890" target="_blank" rel="noopener noreferrer" className="assistance-link text-decoration-none">
                        <span className='d-lg-block d-md-block d-sm-block d-none'>
                            Need Assistance?
                        </span>
                        <i className="ri-whatsapp-line whatsapp-icon"></i>
                    </Link>
                </div>
            </section>
            <section className='container-fluid' style={{ marginBottom: "100px" }}>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pt-5'>
                        <div className="text-center">
                            <p style={{ fontSize: "13px" }}>
                                Logged in as <strong>{user ? user.email : 'Guest'}</strong>
                            </p>
                            <Link to="/shipping" className="text-decoration-none"><button className="btn mx-auto d-block place_order_btn">Continue Checkout</button></Link>
                            <p style={{ fontSize: "12px", cursor: "pointer" }} className="pt-3">
                                Use a different account. <span className="text-danger" onClick={handleLogout}>Log Out</span>
                            </p>
                            <p className="text-muted" style={{ fontSize: "12px" }}>
                                Please note that when you log out you will lose all the items<br /> in your cart and will be redirected to the Home page.
                            </p>
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
                        <strong>Contact Us:</strong>&nbsp; +91-44-66075200 (Helpline) | contactus@caratlane.com
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

export default LoginSuccess