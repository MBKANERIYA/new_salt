import API_BASE_URL from '../../Utils/apiConfig.js';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Loader from '../Loader';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import auth from '../../Components/firebase';
import { toast } from 'react-toastify';
import axios from 'axios';
import Helmet from '../../Components/Helmet';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

const Signup = () => {
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState(null);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
        mobileNumber: '',
    });
    const navigate = useNavigate();
    const provider = new GoogleAuthProvider();

    // Handle sign-in with Google
    const handleSignIn = async () => {
        if (user) {
            toast.warn('You are already signed in.');
            return;
        }

        try {
            setLoading(true);
            provider.setCustomParameters({ prompt: 'select_account' });
            const result = await signInWithPopup(auth, provider);
            const { displayName, email, mobileNumber } = result.user;

            const userData = {
                firstName: displayName || '',
                lastName: displayName || '',
                email: email || '',
                mobileNumber: mobileNumber || '',
                gender: '' // Ensure gender is being selected or passed
            };

            // Store user data locally only if name and email are available
            if (displayName && email) {
                localStorage.setItem('user', JSON.stringify(userData));
                setUser(result.user);
                toast.success('Sign-up successful!');
                navigate('/Userprofile');
            } else {
                toast.error('Failed to sign in. Name or email is missing.');
            }
        } catch (error) {
            console.error('Error signing in with Google:', error);
            toast.error('Something went wrong during sign-in.');
        } finally {
            setLoading(false);
        }
    };

    // const handleSignIn = async () => {
    //     if (user) {
    //         toast.warn('You are already signed in.');
    //         return;
    //     }

    //     try {
    //         setLoading(true);
    //         provider.setCustomParameters({ prompt: 'select_account' });
    //         const result = await signInWithPopup(auth, provider);
    //         const { displayName, email, accessToken } = result.user;

    //         const userData = {
    //             name: displayName || '',
    //             email: email || '',
    //             gender: '' // Ensure gender is being selected or passed
    //         };

    //         // Send the Google token to the backend
    //         const response = await axios.post(`${API_BASE_URL}/api/users/google-login`, {
    //             token: accessToken, // Send the Firebase token
    //         });

    //         // Handle response from the backend
    //         localStorage.setItem('user', JSON.stringify(response.data.user));
    //         setUser(result.user);
    //         toast.success('Sign-up successful!');
    //         navigate('/Userprofile');
    //     } catch (error) {
    //         console.error('Error signing in with Google:', error);
    //         toast.error('Something went wrong during sign-in.');
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // Load user from local storage on mount
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                if (parsedUser && user) {
                    setUser(parsedUser);
                    setFormData({
                        firstName: '',
                        lastName: '',
                        email: '',
                        password: '',
                        gender: '',
                        mobileNumber: '',
                    });
                }
            } catch (error) {
                console.error('Error parsing stored user data:', error);
                localStorage.removeItem('user');
            }
        }

        // Clear form data if user is logged out
        return () => {
            if (!user) {
                setFormData({ firstName: '', lastName: '', email: '', password: '', gender: '', mobileNumber: '', }); // Clear form data on unmount
            }
        };
    }, [user]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/users/register`, formData);
            toast.success('Sign-up successful!');

            // Save the user data from the response (includes _id from DB)
            const registeredUser = response.data.user;
            localStorage.setItem('user', JSON.stringify(registeredUser));
            if (registeredUser?._id) localStorage.setItem('userId', registeredUser._id);
            if (registeredUser?.token) localStorage.setItem('token', registeredUser.token);

            // Clear form data after successful signup
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                gender: '',
                mobileNumber: '',
            });

            // Redirect to the user profile page
            navigate('/Userprofile');

        } catch (error) {
            console.error('Error during signup:', error);
            toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Helmet title="Signup">
            <>
                {loading && <Loader />}
                <section className='container mt-5'>
                    <div className='text-center row'>
                        <div className='signup_logo'>
                            <i className="ri-fingerprint-line fs-2"></i>
                            <h6>Signup with Salt & Glitz</h6>
                            {/* <div>
                                <p>Unlock Best prices and become an insider for our exclusive launches & offers. Complete your profile and get ₹250 worth of xCLusive Points.</p>
                            </div> */}
                        </div>
                        <div className='pt-4 mx-auto d-block'>
                            <img onClick={handleSignIn} alt='' src='assets/img/google.png' className='img-fluid google_facebook_logo' />
                            {/* <img alt='' src='assets/img/facebook.png' className='img-fluid google_facebook_logo' /> */}
                        </div>
                        <div className='title_Shadow'>
                            <p>Or Continue With</p>
                        </div>
                        <div className='col-xl-6 mx-auto d-block'>
                            <form onSubmit={handleSubmit}>
                                <div className='row'>
                                    {/* First Name Field */}
                                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                        <div className='input-container'>
                                            <input
                                                type='text'
                                                placeholder=' '
                                                className='input-field'
                                                name='firstName'
                                                value={formData.firstName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className='input-label'>First Name</label>
                                        </div>
                                    </div>
                                    {/* Last Name Field */}
                                    <div className='col-xl-6 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                        <div className='input-container'>
                                            <input
                                                type='text'
                                                placeholder=' '
                                                className='input-field'
                                                name='lastName'
                                                value={formData.lastName}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className='input-label'>Last Name</label>
                                        </div>
                                    </div>
                                    {/* Email Field */}
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                        <div className='input-container'>
                                            <input
                                                type='email'
                                                placeholder=' '
                                                className='input-field'
                                                name='email'
                                                value={formData.email}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className='input-label'>Email</label>
                                        </div>
                                    </div>
                                    {/* Mobile Number Field */}
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                        <div className='input-container'>
                                            <PhoneInput
                                                country={'in'} // Default country (India)
                                                value={formData.mobileNumber}
                                                onChange={(value, countryData) => {
                                                    // Ensure the number starts with '+'
                                                    const formattedNumber = `+${value}`;
                                                    setFormData({ ...formData, mobileNumber: formattedNumber });
                                                }}
                                                inputStyle={{ width: '100%' }} // Adjust width
                                                required
                                            />
                                        </div>
                                    </div>
                                    {/* Password Field */}
                                    <div className='col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 my-2'>
                                        <div className='input-container'>
                                            <input
                                                type='password'
                                                placeholder=' '
                                                className='input-field'
                                                name='password'
                                                value={formData.password}
                                                onChange={handleChange}
                                                required
                                            />
                                            <label className='input-label'>Password</label>
                                        </div>
                                    </div>
                                    {/* Gender Radio Buttons */}
                                    {['Male', 'Female', 'Other'].map((genderOption, index) => (
                                        <div className="col-xl-2 col-lg-2 col-md-2 col-sm-2 col-2 form-check m-0 me-5 text-center" key={index}>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                id={`radioOptionSignup${index + 1}`}
                                                value={genderOption}
                                                onChange={handleChange}
                                            />
                                            <label className="form-check-label" htmlFor={`radioOptionSignup${index + 1}`}>
                                                {genderOption}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                                <button className='mt-4 btn w-50 place_order_btn' type='submit'>Sign Up</button>
                            </form>
                        </div>
                        <p className='create_acc pt-2'>Already have an account?
                            <Link to="/loginn" className='text-decoration-none'><span> LOG IN</span></Link>
                        </p>
                    </div>
                </section>
            </>
        </Helmet>
    );
};

export default Signup;
