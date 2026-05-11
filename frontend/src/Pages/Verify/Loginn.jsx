import API_BASE_URL from '../../Utils/apiConfig.js';
// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../Loader';
// import { toast } from 'react-toastify';
// import Helmet from '../../Components/Helmet';

// const Loginn = () => {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             // Perform the login request
//             const res = await axios.post(`${API_BASE_URL}/api/users/login`, { email, password });

//             console.log("TOKEN",res.data.user.token);

//             // Store the token in local storage
//             localStorage.setItem('token', res.data.user.token);

//             // Fetch the user's profile data using the token
//             const userRes = await axios.get(`${API_BASE_URL}/api/users/profile`, {
//                 headers: {
//                     'Authorization': `Bearer ${res.data.user.token}`,  // Send the token for authentication
//                 }
//             });

//             // Store user data in local storage under 'user'
//             localStorage.setItem('user', JSON.stringify(userRes.data));

//             // Show success toast
//             toast.success("Login Successfully!");

//             // Redirect to user profile page
//             navigate('/');
//             window.location.reload();
//         } catch (err) {
//             console.error('Error during login:', err.response?.data);  // Log the full error response
//             // Show error toast
//             toast.error(err.response?.data?.message || "Login failed");
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <Helmet title="Login">
//             <>
//                 {loading && <Loader />}
//                 <section className='container mt-5 loginn_width'>
//                     <div className='text-center row'>
//                         <div className='signup_logo'>
//                             <i className="ri-fingerprint-line fs-2"></i>
//                             <h6>Login with Salt & Glitz</h6>
//                             <div>
//                                 <p className='p_width_loginn'>
//                                     Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.
//                                 </p>
//                             </div>
//                             <div className='pt-4 mx-auto d-block'>
//                                 <img alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
//                             </div>
//                         </div>
//                         <div className='mx-auto d-block pb-4'>
//                             <form onSubmit={handleSubmit}>

//                                 <div className="form__div">
//                                     <input
//                                         type="email"
//                                         className="form__input"
//                                         placeholder=" "
//                                         value={email}
//                                         onChange={(e) => setEmail(e.target.value)}
//                                         required
//                                     />
//                                     <label className="form__label">Email</label>
//                                 </div>

//                                 <div className="form__div">
//                                     <input
//                                         type="password"
//                                         className="form__input"
//                                         placeholder=" "
//                                         value={password}
//                                         onChange={(e) => setPassword(e.target.value)}
//                                         required
//                                     />
//                                     <label className="form__label">Password</label>
//                                 </div>

//                                 <button className='mt-4 btn w-100 place_order_btn text-light' type='submit' disabled={loading}>
//                                     {loading ? 'Logging in...' : 'CONTINUE TO LOGIN'}
//                                 </button>
//                             </form>

//                         </div>
//                         <p className='m-0 p-0 create_acc'>
//                             New to Tiffany & Co.? <Link to="/signup" className='text-decoration-none'><span>Create an Account</span></Link>
//                         </p>
//                         <p className='create_acc'>Complete your profile and get Rs.250 worth of xCLusive Points.</p>
//                     </div>
//                 </section>
//             </>
//         </Helmet>
//     );
// };

// export default Loginn;


import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader';
import { toast } from 'react-toastify';
import Helmet from '../../Components/Helmet';

const Loginn = () => {
    const otpRefs = useRef([]);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [step, setStep] = useState(1);
    const [password, setPassword] = useState('');
    const [newPassword , setNewPassword] = useState('');
    
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
            dispatch(setUserData(res.data.user)); // Redux mein data set karna

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
            const userId = localStorage.getItem("userId");
            
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

    return (
        <Helmet title="Login">
            <>
                {loading && <Loader />}
                <section className='container my-5 loginn_width'>
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
            </>
        </Helmet>
    );
};

export default Loginn;


// import React, { useState, useEffect, useRef } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Loader from '../Loader';
// import { toast } from 'react-toastify';
// import Helmet from '../../Components/Helmet';

// const Loginn = () => {
//     const otpRefs = useRef([]);
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [otp, setOtp] = useState('');
//     const [step, setStep] = useState(1); // 1: Email, 2: Password/OTP selection, 3: OTP entry, 4: Forgot Password
//     const [newPassword, setNewPassword] = useState('');
//     console.log({ email, otp, password });

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     }, []);

//     const handleContinue = (e) => {
//         e.preventDefault();
//         if (!email) {
//             toast.error("Please enter your email");
//             return;
//         }
//         setStep(2);
//     };

//     const handleForgotPassword = () => {
//         setStep(4);
//     };

//     const handleSendOtp = async () => {
//         setLoading(true);
//         try {
//             await axios.post(`${API_BASE_URL}/api/users/forgotPassword/67ac312d27bb09efdb440649`, { email });
//             toast.success("OTP sent to your email!");
//             setStep(5); // Move to OTP & new password step
//         } catch (err) {
//             toast.error("Error sending OTP");
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleResetPassword = async () => {
//         try {
//           const payload = {
//             email,
//             otp,
//             password,  // Backend me `password` ya `newPassword` ka format confirm karein
//           };
      
//           console.log("Sending Request:", payload); // 🛑 Debugging ke liye
      
//           const response = await axios.post(
//             `${API_BASE_URL}/api/users/verifyOtpAndResetPassword`,
//             { email, otp, password },
//             { headers: { "Content-Type": "application/json" } }
//           );
          
      
//           console.log("Success:", response.data);
//         } catch (error) {
//           console.error("Error Response:", error.response?.data);
//         }
//       };
      

//     return (
//         <Helmet title="Login">
//             {loading && <Loader />}
//             <section className='container mt-5 loginn_width'>
//                 <div className='text-center row'>
//                     <div className='signup_logo'>
//                         <h6>Login with Salt & Glitz</h6>
//                     </div>
//                     <div className='mx-auto d-block pb-4 pt-4'>
//                         {step === 1 && (
//                             <form onSubmit={handleContinue}>
//                                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                                 <button type='submit'>CONTINUE</button>
//                             </form>
//                         )}
//                         {step === 2 && (
//                             <>
//                                 <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
//                                 <button>LOGIN</button>
//                                 <p><Link onClick={handleForgotPassword}>Forgot Password?</Link></p>
//                             </>
//                         )}
//                         {step === 4 && (
//                             <>
//                                 <p>Enter your email to receive an OTP.</p>
//                                 <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
//                                 <button onClick={handleSendOtp}>Send OTP</button>
//                             </>
//                         )}
//                         {step === 5 && (
//                             <>
//                                 <p>Enter OTP and your new password.</p>
//                                 <input
//                                     type="text"
//                                     placeholder="Enter OTP"
//                                     value={otp}
//                                     onChange={(e) => setOtp(e.target.value)}
//                                 />
//                                 <input
//                                     type="password"
//                                     placeholder="Enter New Password"
//                                     value={password}
//                                     onChange={(e) => setPassword(e.target.value)}
//                                 />
//                                 <button onClick={handleResetPassword}>Reset Password</button>
//                             </>
//                         )}
//                     </div>
//                 </div>
//             </section>
//         </Helmet>
//     );
// };

// export default Loginn;
