import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { formatCurrency } from '../Utils/formateCurrency';

const Plan = () => {
    const [sliderValue, setSliderValue] = useState(5000);

    const instalment = sliderValue * 10

    const [activeIndex, setActiveIndex] = useState(null);
    const [activeTab, setActiveTab] = useState("FAQs");

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    const genericfaqs = [
        "What is the minimum amount that I need to set aside every month?",
        "What is the maximum amount limit of PoP!?",
        "Can I club two or more PoP! accounts with my PoP! account?",
        "Can I pay in cash every month?",
    ];
    const enrollmentfaq = [
        "What is enrolment process & benefit of PoP scheme?",
        "Is it possible to change the monthly amount in between the instalments?",
        "Where can I check my active PoP! plan?",
        "Do you have any auto debit facilities for monthly instalments?",
        "What are the auto debit limitations?",
        "Can I open PoP! account for my minor daughter?",
        "Can I convert my profile balance to a PoP! plan?",
        "Can I open a PoP account with borrowed money?",
        "Can NRI’s enrol for PoP!?",
        "Can I enrol for PoP! without a bank account?",
        "Do I have to disclose my bank details to enrol?",
        "Can I make a digital payment at the store?",
        "Do I need a PAN card to enrol for PoP?",
    ]
    const redemptionfaqs = [
        "What is the redemption window for my PoP! Balance?",
        "Can I withdraw my paid instalment after 2 months?",
        "Can I redeem the amount before 9 months?",
        "When will I become eligible for the discount/benefit from CaratLane?",
        "Can I club xCLusive points or coupon codes while redeeming my CaratLane PoP! account balance?",
        "How can I avail the benefits of PoP during redemption?",
        "Will late payment affect my CaratLane PoP! account balance?",
        "Can I redeem only part of the PoP amount?",
        "Can a nominee be eligible to redeem on behalf of the enrollment person?",
        "Do I have to come to a store to redeem the PoP! Value?",
        "Can I place an order for customised/ personalised design with PoP account value?",
        "How can I pay my balance amount if I purchase more than my PoP! account balance?",
        "Can I club extra discounts from CaratLane with my PoP! balance?",
        "Can I utilise my special occasions coupons while redeeming PoP?",
    ]
    const refundfaqs = [
        "Can I cancel my PoP plan at any time?"
    ]
    return (
        <>
            {/* Section 1: Hero */}
            <section className="position-relative pt-5 pb-5 px-3" style={{ background: "linear-gradient(to bottom right, #f3e8ff, #fffbeb)" }}>
                <div className="container text-center">
                    {/* Header/Logo Area */}
                    <div className="d-flex justify-content-between align-items-center mb-5">
                        <img src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/12_DEC/HP%20banner/Down_1/Mangalsutras.jpg" alt="Salt & Glitz Logo" style={{ height: "48px", objectFit: "contain", borderRadius: "8px" }} />
                        <div className="d-flex gap-3">
                            <button className="btn" style={{ borderColor: "#4F3267", color: "#4F3267", fontWeight: "600", backgroundColor: "transparent" }}>CALL US</button>
                            <Link to="/plan-selection" className="btn text-white" style={{ backgroundColor: "#4F3267", fontWeight: "600" }}>START PLAN</Link>
                        </div>
                    </div>

                    {/* Main Text */}
                    <h1 className="display-5 fw-bold mb-4" style={{ color: "#4F3267" }}>
                        Pay 9 Instalments <br /> Get the 10th Month Free!
                    </h1>

                    {/* USP Icons */}
                    <div className="d-flex justify-content-center gap-3 mb-5 flex-wrap">
                        <div className="bg-white px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm" style={{ opacity: 0.9 }}>
                            <span style={{ color: "#4F3267" }}>✔</span> Trust of TATA
                        </div>
                        <div className="bg-white px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm" style={{ opacity: 0.9 }}>
                            <span style={{ color: "#4F3267" }}>👥</span> Assured Bonus
                        </div>
                        <div className="bg-white px-3 py-2 rounded-pill d-flex align-items-center gap-2 shadow-sm" style={{ opacity: 0.9 }}>
                            <span style={{ color: "#4F3267" }}>🏠</span> Redeem Online/Store
                        </div>
                    </div>

                    {/* Plan Cards */}
                    <div className="row justify-content-center mx-auto" style={{ maxWidth: "900px" }}>
                        {/* EDGE Card */}
                        <div className="col-md-6 mb-4">
                            <div className="p-4 shadow-lg position-relative text-start h-100 d-flex flex-column" style={{ backgroundColor: "#F8F1D9", border: "1px solid #fde68a", borderRadius: "16px" }}>
                                <span className="position-absolute top-0 end-0 text-white px-3 py-1 fw-bold" style={{ backgroundColor: "#4F3267", borderBottomLeftRadius: "8px", borderTopRightRadius: "16px", fontSize: "12px" }}>MOST POPULAR</span>
                                <h3 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#84631B", fontSize: "1.5rem" }}>👑 EDGE</h3>
                                <div>
                                    <div className="text-white py-1 px-3 rounded d-inline-block mb-4 small" style={{ backgroundColor: "#D4AF37" }}>10th Month Free + Gold Value</div>
                                </div>
                                <ul className="small text-muted list-unstyled mb-4 flex-grow-1" style={{ lineHeight: "2" }}>
                                    <li>✔ Pay 9 instalments & get the 10th free</li>
                                    <li>✔ Instalment value converted as per gold rate</li>
                                    <li>✔ Buy jewellery after 10th month</li>
                                </ul>
                                <Link to="/plan-selection" className="btn w-100 fw-bold shadow-sm mt-auto" style={{ backgroundColor: "white", color: "#4F3267", border: "1px solid #f3f4f6" }}>START PLAN &gt;</Link>
                            </div>
                        </div>

                        {/* ICON Card */}
                        <div className="col-md-6 mb-4">
                            <div className="p-4 shadow-lg text-start h-100 d-flex flex-column" style={{ backgroundColor: "#F3E8FF", border: "1px solid #e9d5ff", borderRadius: "16px" }}>
                                <h3 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: "#4F3267", fontSize: "1.5rem" }}>🏷 ICON</h3>
                                <div>
                                    <div className="text-white py-1 px-3 rounded d-inline-block mb-4 small" style={{ backgroundColor: "#8B5CF6" }}>10th Month Free</div>
                                </div>
                                <ul className="small text-muted list-unstyled mb-4 flex-grow-1" style={{ lineHeight: "2" }}>
                                    <li>✔ Pay 9 instalments & get the 10th free</li>
                                    <li>✔ Buy jewellery after 10th month</li>
                                </ul>
                                <Link to="/plan-selection" className="btn w-100 fw-bold shadow-sm mt-auto" style={{ backgroundColor: "white", color: "#4F3267", border: "1px solid #f3f4f6" }}>START PLAN &gt;</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Wave Divider */}
                <div className="position-absolute bottom-0 start-0 w-100 overflow-hidden" style={{ lineHeight: 0 }}>
                    <svg viewBox="0 0 1200 120" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: "60px", fill: "white" }}>
                        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C58.47,100.22,122.3,103.11,188,95.08,243,88.45,283.06,63.55,321.39,56.44Z"></path>
                    </svg>
                </div>
            </section>

            {/* Section 2: Calculator */}
            <section className="py-5 bg-white px-3">
                <div className="container" style={{ maxWidth: "900px" }}>
                    <h2 className="fw-bold text-center mb-4" style={{ color: "#4F3267", fontSize: "2rem" }}>Calculate & Compare Plans</h2>

                    <div className="d-flex flex-column align-items-center mb-5">
                        <div className="d-flex justify-content-between align-items-center px-4 py-2" style={{ border: "1px solid #e9d5ff", borderRadius: "12px", width: "100%", maxWidth: "400px", backgroundColor: "#fff" }}>
                            <div className="text-start">
                                <div className="text-muted" style={{ fontSize: "12px" }}>Your Monthly Instalment</div>
                                <div className="d-flex align-items-center">
                                    <span className="fw-bold fs-5" style={{ color: "#4F3267" }}>₹</span>
                                    <input
                                        type="number"
                                        className="fw-bold fs-5 border-0 bg-transparent p-0 m-0"
                                        style={{ color: "#4F3267", width: "120px", outline: "none", appearance: "textfield" }}
                                        value={sliderValue}
                                        onChange={(e) => {
                                            const val = e.target.value;
                                            if (val === '') {
                                                setSliderValue('');
                                            } else {
                                                let num = Number(val);
                                                if (num > 200000) num = 200000;
                                                setSliderValue(num);
                                            }
                                        }}
                                        onBlur={(e) => {
                                            let val = Number(e.target.value);
                                            if (val < 1000) val = 1000;
                                            setSliderValue(val);
                                        }}
                                    />
                                </div>
                            </div>
                            <div className="d-flex gap-2">
                                <button 
                                    className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center fs-5 pb-2" 
                                    style={{ width: "32px", height: "32px", border: "1px solid #e9d5ff", color: "#8B5CF6", backgroundColor: "#faf5ff" }}
                                    onClick={() => setSliderValue(prev => Math.max(Number(prev) - 1000, 1000))}
                                >
                                    -
                                </button>
                                <button 
                                    className="btn btn-sm rounded-circle d-flex align-items-center justify-content-center fs-5 pb-2" 
                                    style={{ width: "32px", height: "32px", border: "1px solid #e9d5ff", color: "#8B5CF6", backgroundColor: "#faf5ff" }}
                                    onClick={() => setSliderValue(prev => Math.min(Number(prev) + 1000, 200000))}
                                >
                                    +
                                </button>
                            </div>
                        </div>
                        <div className="mt-3 text-muted fw-medium" style={{ fontSize: "14px" }}>
                            <span style={{ color: "#ef4444" }}>●</span> Current 24KT Gold Rate: ₹15781
                        </div>
                    </div>

                    <div className="table-responsive rounded border shadow-sm">
                        <table className="table mb-0 align-middle">
                            <thead style={{ backgroundColor: "#f3f4f6" }}>
                                <tr>
                                    <th className="p-3 border-bottom-0" style={{ color: "#4F3267" }}>Benefits</th>
                                    <th className="p-3 text-center border-bottom-0" style={{ color: "#4F3267" }}>EDGE</th>
                                    <th className="p-3 text-center border-bottom-0" style={{ color: "#4F3267" }}>ICON</th>
                                </tr>
                            </thead>
                            <tbody className="small">
                                <tr>
                                    <td className="p-3 fw-medium">You Pay 9 Instalments</td>
                                    <td className="p-3 text-center fw-bold">₹{formatCurrency(sliderValue * 9).replace("₹", "")}</td>
                                    <td className="p-3 text-center fw-bold">₹{formatCurrency(sliderValue * 9).replace("₹", "")}</td>
                                </tr>
                                <tr style={{ backgroundColor: "rgba(254, 243, 199, 0.3)" }}>
                                    <td className="p-3 fw-medium">
                                        Gold Value Returns*
                                        <p className="text-muted mb-2" style={{ fontSize: "10px" }}>(Adjust slider for approx returns)</p>
                                        <input
                                            type="range"
                                            className="form-range"
                                            min="1000"
                                            max="200000"
                                            step="1000"
                                            value={sliderValue}
                                            onChange={(e) => setSliderValue(Number(e.target.value))}
                                        />
                                    </td>
                                    <td className="p-3 text-center fw-bold text-success">₹{formatCurrency(sliderValue * 0.05).replace("₹", "")}*</td>
                                    <td className="p-3 text-center text-muted">Not Available</td>
                                </tr>
                                <tr>
                                    <td className="p-3 fw-medium">Salt & Glitz Discount (10th Month)</td>
                                    <td className="p-3 text-center fw-bold">₹{formatCurrency(sliderValue).replace("₹", "")}</td>
                                    <td className="p-3 text-center fw-bold">₹{formatCurrency(sliderValue).replace("₹", "")}</td>
                                </tr>
                                <tr className="text-white fw-bold" style={{ backgroundColor: "#4F3267" }}>
                                    <td className="p-3">Buy Jewellery Worth</td>
                                    <td className="p-3 text-center fs-5">₹{formatCurrency((sliderValue * 10) + (sliderValue * 0.05)).replace("₹", "")}*</td>
                                    <td className="p-3 text-center fs-5">₹{formatCurrency(sliderValue * 10).replace("₹", "")}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="mt-3 text-center fst-italic text-muted" style={{ fontSize: "10px" }}>
                        *Disclaimer: Gold price fluctuations apply. In case of a drop in rates, differences are borne by the customer.
                    </p>
                </div>
            </section>
            <section className="container py-5 cta-section">
                <div className="row cta-container">
                    {/* <!-- Left Section --> */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 cta-left align-items-center d-flex justify-content-center">
                        <div>
                            <h2>1,92,700+</h2>
                            <p>people have already enrolled in PoP! and enjoyed benefits!</p>
                        </div>
                    </div>

                    {/* <!-- Right Section --> */}
                    <div className="col-lg-6 col-md-6 col-sm-12 col-12 cta-right align-items-center d-flex justify-content-center">
                        <div>
                            <p>Still need help? Connect with our experts.</p>
                            <form>
                                <input
                                    type="text"
                                    placeholder="Mobile Number*"
                                    className="cta-input"
                                    required
                                />
                                <button type="submit" className="cta-button">REQUEST A CALL BACK</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
            <section className='container-fluid bg-faq'>
                <div className='faq-container'>
                    <div className="tabs">
                        <button
                            className={`tab ${activeTab === "FAQs" ? "active" : ""}`}
                            onClick={() => setActiveTab("FAQs")}
                        >
                            FAQs
                        </button>
                        <button
                            className={`tab ${activeTab === "Terms" ? "active" : ""}`}
                            onClick={() => setActiveTab("Terms")}
                        >
                            Terms & Conditions
                        </button>
                    </div>


                    {activeTab === "FAQs" && (
                        <div>
                            <div className="accordion">
                                <h3 className="accordion-title">Generic</h3>
                                {genericfaqs.map((faq, index) => (
                                    <div
                                        className={`accordion-item ${activeIndex === index ? "active" : ""
                                            }`}
                                        key={index}
                                    >
                                        <div
                                            className="accordion-question"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            {faq}
                                            <span className="accordion-icon">
                                                {activeIndex === index ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i>}
                                            </span>
                                        </div>
                                        {activeIndex === index && (
                                            <div className="accordion-answer">
                                                <p>This is the answer to the question.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="accordion my-4">
                                <h3 className="accordion-title">Enrolment</h3>
                                {enrollmentfaq.map((faq, index) => (
                                    <div
                                        className={`accordion-item ${activeIndex === index ? "active" : ""
                                            }`}
                                        key={index}
                                    >
                                        <div
                                            className="accordion-question"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            {faq}
                                            <span className="accordion-icon">
                                                {activeIndex === index ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i>}
                                            </span>
                                        </div>
                                        {activeIndex === index && (
                                            <div className="accordion-answer">
                                                <p>This is the answer to the question.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="accordion my-4">
                                <h3 className="accordion-title">Redemption</h3>
                                {redemptionfaqs.map((faq, index) => (
                                    <div
                                        className={`accordion-item ${activeIndex === index ? "active" : ""
                                            }`}
                                        key={index}
                                    >
                                        <div
                                            className="accordion-question"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            {faq}
                                            <span className="accordion-icon">
                                                {activeIndex === index ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i>}
                                            </span>
                                        </div>
                                        {activeIndex === index && (
                                            <div className="accordion-answer">
                                                <p>This is the answer to the question.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="accordion my-4">
                                <h3 className="accordion-title">Cancellation / Refunds</h3>
                                {refundfaqs.map((faq, index) => (
                                    <div
                                        className={`accordion-item ${activeIndex === index ? "active" : ""
                                            }`}
                                        key={index}
                                    >
                                        <div
                                            className="accordion-question"
                                            onClick={() => toggleAccordion(index)}
                                        >
                                            {faq}
                                            <span className="accordion-icon">
                                                {activeIndex === index ? <i class="ri-arrow-up-s-line"></i> : <i class="ri-arrow-down-s-line"></i>}
                                            </span>
                                        </div>
                                        {activeIndex === index && (
                                            <div className="accordion-answer">
                                                <p>This is the answer to the question.</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {activeTab === "Terms" && (
                        <div className="terms">
                            <h3 className="terms-title">Definition:</h3>
                            <ol class="list-group list-group-numbered">
                                <li class="list-group-item">Enrolment Date means the date of payment of the first instalment.</li>
                                <li class="list-group-item">Company or CaratLane means CaratLane Trading Private Limited.</li>
                                <li class="list-group-item">Scheme means CaratLane PoP Scheme or PoP Scheme.
                                </li>
                            </ol>
                        </div>
                    )}
                </div>
            </section>
        </>
    )
}

export default Plan