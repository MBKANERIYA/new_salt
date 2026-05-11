import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Uprofile from './Uprofile';
import Helmet from '../Components/Helmet';

const Userprofile = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        // Fetch user profile from local storage
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    const getInitials = () => {
        const first = user?.firstName?.charAt(0)?.toUpperCase() || '';
        const last = user?.lastName?.charAt(0)?.toUpperCase() || '';
        return first + last || 'U';
    };

    const profileFields = [
        { icon: 'ri-user-line', label: 'Full Name', value: `${user?.firstName || '-'} ${user?.lastName || ''}`.trim() },
        { icon: 'ri-mail-line', label: 'Email Address', value: user?.email || '-' },
        { icon: 'ri-phone-line', label: 'Mobile Number', value: user?.mobileNumber || '-' },
        { icon: 'ri-map-pin-line', label: 'Pincode', value: user?.pincode || '-' },
        { icon: 'ri-cake-2-line', label: 'Birthday', value: user?.birthday || '-' },
        { icon: 'ri-heart-2-line', label: 'Anniversary', value: user?.anniversary || '-' },
        { icon: 'ri-briefcase-line', label: 'Occupation', value: user?.occupation || '-' },
        { icon: 'ri-gift-line', label: 'Spouse Birthday', value: user?.spouseBirthday || '-' },
    ];

    return (
        <Helmet title="Profile">
            <div className=''>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                            <Uprofile />
                        </div>
                        <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0 bg_up'>
                            <div className='profile-details-card'>
                                {/* Profile Header */}
                                <div className='profile-hero'>
                                    <div className='profile-avatar'>
                                        <span className='avatar-initials'>{getInitials()}</span>
                                    </div>
                                    <div className='profile-hero-info'>
                                        <h2 className='profile-hero-name'>
                                            {user?.firstName || 'Guest'} {user?.lastName || ''}
                                        </h2>
                                        <p className='profile-hero-email'>
                                            <i className='ri-mail-line me-1'></i>
                                            {user?.email || 'Not available'}
                                        </p>
                                        <p className='profile-hero-member'>
                                            <i className='ri-vip-diamond-line me-1'></i>
                                            Member since {new Date(user?.createdAt || Date.now()).getFullYear()}
                                        </p>
                                    </div>
                                    <Link to="/edit-profile" className='profile-edit-btn'>
                                        <i className='ri-edit-line me-1'></i>
                                        Edit Profile
                                    </Link>
                                </div>

                                {/* Profile Details Grid */}
                                <div className='profile-section-title'>
                                    <i className='ri-information-line me-2'></i>
                                    Personal Information
                                </div>
                                <div className='profile-grid'>
                                    {profileFields.map((field, index) => (
                                        <div className='profile-field' key={index}>
                                            <div className='profile-field-icon'>
                                                <i className={field.icon}></i>
                                            </div>
                                            <div className='profile-field-content'>
                                                <span className='profile-field-label'>{field.label}</span>
                                                <span className='profile-field-value'>{field.value}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions */}
                                <div className='profile-section-title mt-4'>
                                    <i className='ri-flashlight-line me-2'></i>
                                    Quick Actions
                                </div>
                                <div className='profile-actions'>
                                    <Link to="/U-order" className='profile-action-card'>
                                        <div className='action-icon-wrapper'>
                                            <i className='ri-shopping-bag-line'></i>
                                        </div>
                                        <span>My Orders</span>
                                    </Link>
                                    <Link to="/Uwishlist" className='profile-action-card'>
                                        <div className='action-icon-wrapper'>
                                            <i className='ri-heart-line'></i>
                                        </div>
                                        <span>Wishlist</span>
                                    </Link>
                                    <Link to="/Ucoupon" className='profile-action-card'>
                                        <div className='action-icon-wrapper'>
                                            <i className='ri-coupon-line'></i>
                                        </div>
                                        <span>Coupons</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Helmet>
    );
};

export default Userprofile;
