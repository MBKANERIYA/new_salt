import React, { useState, useRef } from 'react';
import Uprofile from './Uprofile';

const Ucoupon = () => {
    const [copiedCode, setCopiedCode] = useState('');
    const [showPopover, setShowPopover] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState({ top: 0, left: 0 });
    const copyCodeRefs = useRef([]);

    const handleCopyCode = (code, index) => {
        navigator.clipboard.writeText(code)
            .then(() => {
                setCopiedCode(code);
                setShowPopover(true);
                const rect = copyCodeRefs.current[index].getBoundingClientRect();
                setPopoverPosition({
                    top: rect.top + window.scrollY,
                    left: rect.right + window.scrollX + 10 // Offset to the right of the text
                });
                setTimeout(() => setShowPopover(false), 1000); // Hide after 1 seconds
            })
            .catch(err => console.error('Failed to copy: ', err));
    };

    return (
        <>
            <div className=''>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-xl-3 col-lg-3 col-md-3 col-sm-12 col-12 m-0 p-0'>
                            <Uprofile />
                        </div>
                        <div className='col-xl-9 col-lg-9 col-md-9 col-sm-12 col-12 m-0 p-0'>
                            <h3 className='p-3 main_title_copoun_profile'>All Offers</h3>
                            <div className="coupon-cards-container">
                                {/* Coupon Cards */}
                                {[
                                    { discount: "20% OFF", details: "Flat 20% OFF on all jewellery above ₹10,000", code: "FLAT20" },
                                    { discount: "10% OFF", details: "Flat 10% OFF on all jewellery above ₹5,000", code: "FLAT10" }
                                ].map((coupon, index) => (
                                    <div className="coupon-card" key={index}>
                                        <div className=''>
                                            <div className="discount-circle">
                                                <h2>{coupon.discount}</h2>
                                            </div>
                                        </div>
                                        <div className="coupon-details">
                                            <p>{coupon.details}</p>
                                            <p>
                                                Code: <strong>{coupon.code}</strong>
                                                <span 
                                                    className="copy-code" 
                                                    onClick={() => handleCopyCode(coupon.code, index)}
                                                    ref={el => copyCodeRefs.current[index] = el}
                                                    style={{ cursor: 'pointer', marginLeft: '10px' }}
                                                >
                                                    Copy Code
                                                </span>
                                                {showPopover && copiedCode === coupon.code && (
                                                    <span 
                                                        className="popover" 
                                                        style={{
                                                            position: 'absolute',
                                                            top: popoverPosition.top,
                                                            left: popoverPosition.left,
                                                            backgroundColor: '#f0f0f0',
                                                            border: '1px solid #ccc',
                                                            borderRadius: '5px',
                                                            padding: '5px',
                                                            zIndex: 1
                                                        }}
                                                    >
                                                        Code Copied!
                                                    </span>
                                                )}
                                            </p>
                                            <div className="expiration">
                                                <p>Expires on November 04 2024</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Ucoupon;
