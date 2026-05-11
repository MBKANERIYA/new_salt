import React, { useState } from 'react'
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
            <section className="bg_purchase"></section>
            <section className='container py-5'>
                <div className='row'>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12 align-items-center d-flex'>
                        <div>
                            <div className='purchase_calculate'>
                                <h3>Calculate your PoP!</h3>
                                <p>Enter the amount (Min ₹1,000) you’d like to keep aside with us for 9 months and see the benefit.</p>
                            </div>
                            <div className='purchase_container'>
                                <div className='purchase_instalment'>
                                    <p>Monthly Instalment</p>
                                    <p>Multiples of ₹1,000 only</p>
                                </div>
                                <div className='purchase_amount'>
                                    <p>Amount</p>
                                    <p>{sliderValue}</p>
                                </div>
                            </div>
                            <div className="minimal-range-slider">
                                <input
                                    type="range"
                                    min="1000"
                                    max="200000"
                                    step="1000"
                                    value={sliderValue}
                                    onChange={(e) => setSliderValue(e.target.value)}
                                />
                            </div>
                            <div className='purchase_final_instalment mt-4'>
                                <h6>Redemption value after 9 months :</h6>
                                <h5 className='my-0'>{formatCurrency(instalment)}</h5>
                                <p>(Your 10th instalment is free!)</p>
                                <button className='btn mx-auto d-block w-100'>ENROL NOW</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-6 col-lg-6 col-md-6 col-sm-12 col-12'>
                        <img alt='' src='https://assets.cltstatic.com/images/responsive/pop/pop-calculation-chart.png?v2.0' className='img-fluid mx-auto d-block'></img>
                        <div className="final_instalments">
                            <div className="instalment">
                                <div className="instalment_icon"></div>
                                <p>Your Instalments</p>
                            </div>
                            <div className="instalment">
                                <div className="benefit_icon"></div>
                                <p>CaratLane Benefit</p>
                            </div>
                        </div>

                        <div className='purchase_final_instalment2'>
                            <p className='m-0 p-0'>Your Instalments (9 Months)<span>₹9,000</span></p>
                            <p className='m-0 p-0'>Saltand Glitz Benefit (10th Instalment)<span>{formatCurrency(sliderValue)}</span></p>
                            <p className='m-0 p-0'>Total Redeemable Amount<span>{formatCurrency(instalment)}</span></p>
                        </div>
                    </div>
                </div>
            </section>
            <section className="container-fluid bg_works">
                <h3 className="font_main text-center pb-4">How it works?</h3>
                <div className="row justify-content-center text-center">
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-4">
                        <div className="purchase_box d-flex flex-column align-items-center">
                            <div className="icon_wrapper">
                                <img
                                    src="assets/img/pop-sprite.png"
                                    alt="Save Monthly"
                                    className="icon_image"
                                />
                            </div>
                            <p>Save a fixed monthly amount with Saltand Glitz</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-4">
                        <div className="purchase_box d-flex flex-column align-items-center">
                            <div className="icon_wrapper">
                                <img
                                    src="assets/img/pop-sprite.png"
                                    alt="CaratLane Benefit"
                                    className="icon_image"
                                />
                            </div>
                            <p>As a Saltand Glitz Benefit, get the 10th instalment free!</p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12 py-4">
                        <div className="purchase_box d-flex flex-column align-items-center">
                            <div className="icon_wrapper">
                                <img
                                    src="assets/img/pop-sprite.png"
                                    alt="Shop Favorite Design"
                                    className="icon_image"
                                />
                            </div>
                            <p>After 10 months, shop your favourite design online or at the store!</p>
                        </div>
                    </div>
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