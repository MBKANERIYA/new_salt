import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';

const EmptyState = () => {
    const [loading, setLoading] = useState(false); // Manage loader state
    const navigate = useNavigate();

    const handleStartShopping = () => {
        setLoading(true); // Show loader
        setTimeout(() => {
            setLoading(false);
            navigate('/'); // Redirect after 1 second
        }, 1000); // Adjust the delay as needed
    };

    return (
        <>
            {loading && <Loader />} {/* Show loader when loading is true */}
            {!loading && ( // Show content when not loading
                <div className="empty-state-container">
                    <div className="image-container">
                        {/* Placeholder for the illustration */}
                        <i className="ri-shopping-cart-fill" style={{ fontSize: "80px" }}></i>
                    </div>
                    <h1 className="title p-0 m-0">There is nothing here!</h1>
                    <p className="subtitle">Let's do some retail therapy.</p>
                    <div className='d-lg-block d-none'>
                        <button className="start-button" onClick={handleStartShopping}>
                            START SHOPPING
                        </button>
                    </div>

                    
                   <div className="footer container ">
                        <div className="row text-center">
                            <div className="col-4 footer-item">
                                <img src="/assets/img/certified_logo[1].png" alt="certified" className="img-fluid w-50 mb-2" />
                                <p className="mb-0 small">Certified By Recognised Lab</p>
                            </div>
                            <div className="col-4 footer-item">
                                <img src="/assets/img/VVS_GRADE_DIAMOND.png" alt="vvs_grade_diamond" className="img-fluid w-50 mb-2" />
                                {/* <p className="mb-0 small">VVS Grade Diamond</p> */}
                            </div>
                            <div className="col-4 footer-item">
                                <img src="/assets/img/pdp-delivery-tah-sprite (2).png" alt="delivery" className="img-fluid w-50 mb-2" />
                                <p className="mb-0 small">100% Certified by Salt</p>
                            </div>
                        </div>
                    </div>
                    <div className='d-lg-none d-block filter_midium_divice w-100 py-2'>
                        <button className="btn start_btn_md text-dark fw-bold" onClick={handleStartShopping}>
                            START SHOPPING
                        </button>
                    </div>
                </div>
            )}
        </>
    );
};

export default EmptyState;
