import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';
import auth from '../Components/firebase';
import { useDispatch } from 'react-redux';
import { cartAction } from '../Store/Slice/CartSlice';
import Helmet from '../Components/Helmet';

const Uprofile = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                console.error('Error parsing user data:', error);
                toast.error('Error loading user data. Please log in again.');
                localStorage.removeItem('user');
                navigate('/');
            }
        }
    }, [navigate]);

    const handleLogout = async () => {
        if (!user) {
            toast.warn('You are not signed in.');
            return;
        }

        try {
            await signOut(auth);
            dispatch(cartAction.clearCartAndWishlist());
            localStorage.removeItem('user');
            localStorage.removeItem('guestUserId')
            setUser(null);
            toast.success('You have successfully logged out');
            navigate('/');
        } catch (error) {
            console.error('Error signing out:', error);
            toast.error('Something went wrong during log-out.');
        }
    };

    const getInitials = () => {
        const first = user?.firstName?.charAt(0)?.toUpperCase() || '';
        const last = user?.lastName?.charAt(0)?.toUpperCase() || '';
        return first + last || 'U';
    };

    const isActive = (path) => location.pathname === path;

    const menuSections = [
        {
            title: 'Orders',
            icon: 'ri-shopping-bag-line',
            items: [
                { label: 'Orders & Returns', path: '/U-order', icon: 'ri-file-list-3-line' },
                { label: 'Payment', path: '', icon: 'ri-bank-card-line' },
                { label: 'Manage Refunds', path: '', icon: 'ri-refund-2-line' },
            ]
        },
        {
            title: 'Offers',
            icon: 'ri-gift-line',
            items: [
                { label: 'Coupons', path: '/Ucoupon', icon: 'ri-coupon-3-line' },
            ]
        },
        {
            title: 'Account',
            icon: 'ri-user-settings-line',
            items: [
                { label: 'Profile', path: '/Userprofile', icon: 'ri-user-line' },
                { label: 'Wishlist', path: '/Uwishlist', icon: 'ri-heart-line' },
            ]
        },
    ];

    return (
        <Helmet title="Profile">
            <div className='sidebar-wrapper'>
                <div className="sidebar-modern">
                    {/* User Card */}
                    <div className='sidebar-user-card'>
                        <div className='sidebar-avatar'>
                            <span>{getInitials()}</span>
                        </div>
                        <div className='sidebar-user-info'>
                            <p className='sidebar-user-name'>
                                {user?.firstName || 'Guest'} {user?.lastName || ''}
                            </p>
                            <p className='sidebar-user-email'>{user?.email || 'guest@user.com'}</p>
                        </div>
                        <Link to="/edit-profile" className="sidebar-edit-link">
                            <i className='ri-pencil-line'></i>
                        </Link>
                    </div>

                    {/* Menu Sections */}
                    <nav className='sidebar-nav'>
                        {menuSections.map((section, idx) => (
                            <div key={idx} className='sidebar-section'>
                                <div className='sidebar-section-title'>
                                    <i className={section.icon}></i>
                                    <span>{section.title}</span>
                                </div>
                                <ul className='sidebar-menu-list'>
                                    {section.items.map((item, i) => (
                                        <li key={i}>
                                            <Link
                                                to={item.path}
                                                className={`sidebar-menu-item ${isActive(item.path) ? 'active' : ''}`}
                                            >
                                                <i className={item.icon}></i>
                                                <span>{item.label}</span>
                                                <i className='ri-arrow-right-s-line sidebar-arrow'></i>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}

                        {/* Logout */}
                        <div className='sidebar-section'>
                            <button className='sidebar-logout-btn' onClick={handleLogout}>
                                <i className='ri-logout-box-r-line'></i>
                                <span>Log Out</span>
                            </button>
                        </div>
                    </nav>
                </div>
            </div>
        </Helmet>
    );
};

export default Uprofile;
