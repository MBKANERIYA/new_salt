import API_BASE_URL from '../../Utils/apiConfig.js';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import OrderSummary from '../Process/OrderSummary';
import Loader from '../Loader';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const otpRefs = useRef([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');


  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleContinue = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email");
      return;
    }
    setStep(2);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(
        `${API_BASE_URL}/api/users/login`,
        { email, password }
      );
      const user = res.data.user;

      if (!user || !user.token) {
        throw new Error("Invalid user data received");
      }

      localStorage.setItem('token', user.token);
      localStorage.setItem('userId', user._id);
      localStorage.setItem('user', JSON.stringify(user));

      const guestCart = JSON.parse(localStorage.getItem('cartItems')) || [];
      const guestWishlist = (JSON.parse(localStorage.getItem('wishlist')) || []).map(item =>
        typeof item === "string" ? { productId: item } : item
      );

      console.log("Guest Cart Items Before Merge:", guestCart);

      if (guestCart.length > 0 || guestWishlist.length > 0) {
        const cartProducts = guestCart.map(item => ({
          productId: item?.productId || item?.id,  // Ensure correct productId
          size: item?.size ? String(item.size) : "6",  // Default size if missing
          caratBy: item?.caratBy ? String(item.caratBy) : "14KT",  // Default caratBy if missing
          colorBy: item?.colorBy ? String(item.colorBy) : "Yellow Gold",  // Default color if missing
        })).filter(item => item.productId); // Remove invalid entries

        console.log("Formatted Cart Data to Send:", cartProducts);

        const wishlistProducts = guestWishlist.map(item => ({
          productId: item.productId || item?.id,
          size: item?.size ? String(item.size) : "6",  // Default size if missing
          caratBy: item?.caratBy ? String(item.caratBy) : "14KT",  // Default caratBy if missing
          colorBy: item?.colorBy ? String(item.colorBy) : "Yellow Gold",  // Default color if missing
        })) || [];

        console.log("Wishlist Data to Send:", wishlistProducts);

        try {
          const mergeResponse = await axios.post(
            `${API_BASE_URL}/v1/merge/mergeCartAndWishlist`,
            { userId: user._id, cartProducts, wishlistProducts }
          );
          // console.log("Cart API Response:", JSON.stringify(mergeResponse.data, null, 2));
          console.log("Cart API Response:", mergeResponse.data)

        } catch (mergeError) {
          console.error("Merge API Error:", mergeError.response?.data || mergeError.message);
          toast.error("Failed to merge cart & wishlist");
        }
      }

      localStorage.removeItem('wishlist');
      localStorage.removeItem('guestUser');

      const userRes = await axios.get(`${API_BASE_URL}/api/users/profile`, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });

      localStorage.setItem('user', JSON.stringify(userRes.data));

      toast.success("Login Successful!");
      navigate("/")
      window.location.reload(); // Commented to prevent navigation
    } catch (err) {
      console.error("Login Error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpLogin = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/v1/otp/send-otp`, { email });
      toast.success("OTP sent to your email!");
      setStep(3); // Move to OTP input step
    } catch (err) {
      toast.error("Error sending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${API_BASE_URL}/v1/otp/get-otp`, { email, otp });
      localStorage.setItem('token', res.data.user.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success("OTP Verified! Login successful.");
      navigate('/');
      window.location.reload();
    } catch (err) {
      toast.error("Invalid OTP. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    setLoading(true);
    try {
      await axios.post(`${API_BASE_URL}/v1/otp/send-otp`, { email });
      toast.success("New OTP sent to your email!");
    } catch (err) {
      toast.error("Error resending OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = () => {
    setStep(4);
  };

  const handleSendForgotPasswordOtp = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId"); // 👈 Yaha se ID le rahe hain

      if (!userId) {
        toast.error("User ID not found. Please login again.");
        return setLoading(false);
      }

      await axios.post(`${API_BASE_URL}/api/users/forgotPassword/${userId}`, { email });
      toast.success("OTP sent to your email for password reset!");
      setStep(5);
    } catch (err) {
      toast.error("Error sending OTP for password reset");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const userId = localStorage.getItem("userId"); // 👈 Yaha se ID le rahe hain

      if (!userId) {
        toast.error("User ID not found. Please login again.");
        return setLoading(false);
      }
      await axios.post(`${API_BASE_URL}/api/users/verifyOtpAndResetPassword/${userId}`, { email, otp, newPassword });
      toast.success("Password reset successful. Please login with your new password.");
      setStep(2);
    } catch (err) {
      toast.error("Invalid OTP or error resetting password");
    } finally {
      setLoading(false);
    }
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, ""); // Only allow numbers
    if (value) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp.join(""));

      // Move to next input
      if (index < 3) otpRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (e, index) => {
    if (e.key === "Backspace" && index > 0) {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp.join(""));
      otpRefs.current[index - 1].focus();
    }
  };
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
      {loading && <Loader />}
      <section className={`cart_header ${isScrolled ? 'scrolled' : ''}`}>
        <div className="cart_header_left">
          <Link to="/cart" className="back-button">
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
          <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 pt-5 '>
            <section className='container mt-5 login_width'>
              <div className='text-center row'>
                <div className='signup_logo'>
                  <i className="ri-fingerprint-line fs-2"></i>
                  <h6>Login with Salt & Glitz</h6>
                  {/* <p className='p_width_loginn'>
                    Unlock Best prices and become an insider for our exclusive launches & offers.
                  </p> */}
                  {/* <div className='pt-4 mx-auto d-block'>
                    <img alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
                  </div> */}
                </div>
                <div className='mx-auto d-block pb-4 pt-4'>
                  <form onSubmit={step === 1 ? handleContinue : handleLogin}>

                    {/* Step 1: Email Input */}
                    {step === 1 && (
                      <>
                        <div className="form__div">
                          <input
                            type="email"
                            className="form__input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form__label">Email</label>
                        </div>
                        <button className='mt-4 btn w-100 place_order_btn' type='submit'>
                          CONTINUE
                        </button>
                      </>
                    )}
                    {/* Step 2: Password + OTP Login Options */}
                    {step === 2 && (
                      <>
                        <div className="form__div">
                          <input
                            type="password"
                            className="form__input"
                            placeholder=" "
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                          />
                          <label className="form__label">Password</label>
                        </div>
                        <button className='btn w-100 place_order_btn' type='submit' onClick={handleLogin}>
                          LOGIN
                        </button>

                        <p className='mt-2 forgot_password'>
                          <Link onClick={handleForgotPassword}>
                            Forgot Password ?
                          </Link>
                        </p>
                        <p className='m-0 p-0'>OR</p>
                        <button type="button" className='mt-4 w-100 btn get_otp_loginn' onClick={handleOtpLogin}>
                          Get OTP on your Email
                        </button>
                      </>
                    )}
                    {/* Step 3: Enter OTP */}
                    {step === 3 && (
                      <>
                        <p className="email-text pb-2">
                          OTP sent to <strong>{email}</strong>
                        </p>
                        <div className="otp-container">
                          {[...Array(4)].map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              className="otp-input"
                              maxLength="1"
                              value={otp[index] || ""}
                              onChange={(e) => handleOtpChange(e, index)}
                              onKeyDown={(e) => handleBackspace(e, index)}
                              ref={(el) => (otpRefs.current[index] = el)}
                            />
                          ))}
                        </div>
                        <button className='mt-3 btn w-100 place_order_btn' type='button' onClick={handleVerifyOtp} disabled={otp.length !== 4}>
                          LOGIN
                        </button>

                        {/* Resend OTP */}
                        <p className='mt-2 forgot_password'>
                          <Link onClick={handleResendOtp}>
                            RESEND OTP
                          </Link>
                        </p>
                      </>
                    )}
                    {step === 4 && (
                      <>
                        <p>Enter your email to reset your password.</p>
                        <div className="form__div">
                          <input
                            type="email"
                            className="form__input"
                            placeholder=" "
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                          />
                          <label className="form__label">Email</label>
                        </div>
                        <button className='btn w-100 place_order_btn mt-3' type='button' onClick={handleSendForgotPasswordOtp}>
                          SEND OTP
                        </button>
                      </>
                    )}
                    {step === 5 && (
                      <>
                        <p>Enter OTP and your new password.</p>
                        <div className="otp-container">
                          {[...Array(4)].map((_, index) => (
                            <input
                              key={index}
                              type="text"
                              className="otp-input"
                              maxLength="1"
                              value={otp[index] || ""}
                              onChange={(e) => handleOtpChange(e, index)}
                              onKeyDown={(e) => handleBackspace(e, index)}
                              ref={(el) => (otpRefs.current[index] = el)}
                            />
                          ))}
                        </div>
                        <div className="form__div mt-3">
                          <input
                            type="password"
                            className="form__input"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                          />
                        </div>
                        <button className='btn w-100 place_order_btn mt-3' type='button' onClick={handleResetPassword}>
                          CONFIRM
                        </button>
                      </>
                    )}
                  </form>
                </div>
                <p className='m-0 p-0 create_acc'>
                  New to Salt & Glitz? <Link to="/signup" className='text-decoration-none'><span>Create an Account</span></Link>
                </p>
                {/* <p className='create_acc'>Complete your profile and get Rs.250 worth of xCLusive Points.</p> */}
              </div>
            </section>
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

export default Login