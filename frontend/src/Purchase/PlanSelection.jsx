import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const PlanSelection = () => {
    const [selectedPlan, setSelectedPlan] = useState('edge');
    const navigate = useNavigate();

    return (
        <div style={{ backgroundColor: "#fafafa", minHeight: "100vh", fontFamily: "sans-serif" }}>
            {/* Header / Stepper */}
            <div className="bg-white py-3 border-bottom shadow-sm">
                <div className="container d-flex align-items-center justify-content-between px-4">
                    <div className="d-flex align-items-center gap-3">
                        <button className="btn btn-light rounded-circle" onClick={() => navigate(-1)}>
                            <i className="ri-close-line fs-5"></i>
                        </button>
                        <h5 className="mb-0 fw-bold d-none d-md-block" style={{ color: "#4F3267" }}>Treasure Chest</h5>
                    </div>
                    {/* Stepper */}
                    <div className="d-flex align-items-center justify-content-between" style={{ fontSize: "12px", fontWeight: "600", width: "60%", maxWidth: "500px" }}>
                        <div className="d-flex align-items-center gap-2" style={{ color: "#4F3267" }}>
                            <span className="d-none d-sm-inline">Choose Your Plan</span>
                            <span className="d-inline d-sm-none">Plan</span>
                            <div style={{ width: "30px", height: "2px", backgroundColor: "#e0e0e0" }} className="d-none d-md-block"></div>
                        </div>
                        <div className="text-muted d-flex align-items-center gap-2">
                            <span className="d-none d-sm-inline">Enter Account Details</span>
                            <span className="d-inline d-sm-none">Account</span>
                            <div style={{ width: "30px", height: "2px", backgroundColor: "#e0e0e0" }} className="d-none d-md-block"></div>
                        </div>
                        <div className="text-muted">
                            <span className="d-none d-sm-inline">Select Payment</span>
                            <span className="d-inline d-sm-none">Payment</span>
                        </div>
                    </div>
                    <div style={{ width: "40px" }}></div>
                </div>
            </div>

            <div className="container mx-auto py-5" style={{ maxWidth: "600px" }}>
                {/* Yellow Banner */}
                <div className="text-center p-3 rounded mb-5" style={{ backgroundColor: "#FFF8E1", color: "#84631B", fontSize: "14px", fontWeight: "600" }}>
                    <i className="ri-group-fill me-2"></i> 4,50,000+ people have planned smartly, now it's your turn!
                </div>

                <h6 className="fw-bold mb-3 ms-2" style={{ color: "#4F3267", fontSize: "16px" }}>Select Plan</h6>

                {/* EDGE Plan Card */}
                <div 
                    className="p-4 mb-4 rounded-4 position-relative"
                    style={{ 
                        border: selectedPlan === 'edge' ? "2px solid #8B5CF6" : "1px solid #f3e8ff",
                        backgroundColor: selectedPlan === 'edge' ? "#faf5ff" : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                    onClick={() => setSelectedPlan('edge')}
                >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ color: "#4F3267", fontSize: "17px" }}>
                            Treasure Chest Edge <span className="badge text-white rounded-pill px-2" style={{ backgroundColor: "#ef4444", fontSize: "10px" }}>NEW</span>
                        </h6>
                        <div 
                            className="rounded-circle d-flex align-items-center justify-content-center" 
                            style={{ 
                                width: "22px", height: "22px", 
                                border: selectedPlan === 'edge' ? "6px solid #4F3267" : "2px solid #ccc",
                                backgroundColor: "white"
                            }}
                        ></div>
                    </div>
                    <p className="text-muted mb-4" style={{ maxWidth: "85%", fontSize: "15px" }}>
                        Lock-in today's gold rate with 9 easy instalments — the 10th is on us!
                    </p>
                    <span className="badge rounded-pill fw-normal px-3 py-2" style={{ backgroundColor: "#f3e8ff", color: "#8B5CF6", border: "1px solid #e9d5ff", fontSize: "11px" }}>
                        <i className="ri-lock-fill me-1"></i> Locked Gold Value
                    </span>
                </div>

                {/* ICON Plan Card */}
                <div 
                    className="p-4 mb-5 rounded-4 position-relative"
                    style={{ 
                        border: selectedPlan === 'icon' ? "2px solid #8B5CF6" : "1px solid #f3e8ff",
                        backgroundColor: selectedPlan === 'icon' ? "#faf5ff" : "#fff",
                        cursor: "pointer",
                        transition: "all 0.2s"
                    }}
                    onClick={() => setSelectedPlan('icon')}
                >
                    <div className="d-flex justify-content-between align-items-start mb-2">
                        <h6 className="fw-bold m-0 d-flex align-items-center gap-2" style={{ color: "#4F3267", fontSize: "17px" }}>
                            Treasure Chest Icon
                        </h6>
                        <div 
                            className="rounded-circle d-flex align-items-center justify-content-center" 
                            style={{ 
                                width: "22px", height: "22px", 
                                border: selectedPlan === 'icon' ? "6px solid #4F3267" : "2px solid #ccc",
                                backgroundColor: "white"
                            }}
                        ></div>
                    </div>
                    <p className="text-muted mb-4" style={{ maxWidth: "85%", fontSize: "15px" }}>
                        Pay for 9 months, we'll add the 10th instalment for free!
                    </p>
                    <span className="badge rounded-pill fw-normal px-3 py-2" style={{ backgroundColor: "#f3e8ff", color: "#8B5CF6", border: "1px solid #e9d5ff", fontSize: "11px" }}>
                        <i className="ri-shield-check-fill me-1"></i> Assured Returns
                    </span>
                </div>

                <div className="text-center mb-4">
                    <span className="small text-muted fw-bold">What's included in these plans? <Link to="" style={{ color: "#d946ef", textDecoration: "none" }}>Know More</Link></span>
                </div>

                <button
                    type="button"
                    className="btn w-100 text-white fw-bold py-3 rounded-pill shadow"
                    style={{ background: "linear-gradient(to right, #a855f7, #8b5cf6)", fontSize: "15px" }}
                    onClick={() => navigate('/plan-enrollment', { state: { plan: selectedPlan } })}
                >
                    PROCEED WITH {selectedPlan === 'edge' ? 'EDGE' : 'ICON'}
                </button>
            </div>
        </div>
    );
};

export default PlanSelection;
