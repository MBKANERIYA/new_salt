import React, { useEffect } from 'react';
import { FiCheck } from "react-icons/fi";
import { Link } from 'react-router-dom';
import './Privillage.css';

const Privillage = () => {
    useEffect(() => {
        window.scroll(0, 0)
    })
    return (
        <>
            {/* ......................  benner sections  ........................... */}
            {/* <div className='Privill_section'>
                <div className='banner_image'>
                    <img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/loyalty-desktop.jpg" alt="" className="desktop_banner" />
                    <img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/loyalty-mobile.jpg" alt="" className="mobile_banner" />
                </div>
                <div className='banner_text slide-in'>
                    <div className='container'>
                        <h1 className='banner_titel'><b>SALT & GLITZ</b> privilege</h1>
                        <p className='texts'>Join Salt & Glitz Privilege today to access exclusive rewards, gifts, and experiences.</p>
                        <div className='banner_button'>JOIN NOW</div>
                    </div>
                </div>
            </div> */}
            <section className="container-fluid">
                <img src='/assets/img/p1.png'
                    alt="Web Banner"
                    className="img-fluid d-none d-md-block banner_class"
                    style={{ borderRadius: "10px", objectFit: "cover", width: "100%" }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = `
                            <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                                <span class='exlimation_mark'>!</span>
                            </div>`;
                        }
                    }}>
                </img>
                <img src='/assets/img/p2.png'
                    alt="Mobile Banner"
                    className="img-fluid d-md-none banner_class"
                    style={{ borderRadius: "10px", objectFit: "cover", width: "100%" }}
                    onError={(e) => {
                        e.target.onerror = null;
                        e.target.style.display = "none";
                        if (e.target.parentElement) {
                            e.target.parentElement.innerHTML = `
                            <div class='no-image-placeholder-category d-flex justify-content-center align-items-center border border-1 rounded-3' style="height: 200px;">
                                <span class='exlimation_mark'>!</span>
                            </div>`;
                        }
                    }}>

                </img>
            </section>

            {/* ......................  Let’s get started ........................... */}
            <div className='py-5'>
                <div className='container'>
                    <div className='get_header'>
                        <h2 className="font_main pb-1 m-0 p-0">Let’s get started</h2>
                        <p className='p_main'>Earn stars and get rewarded in a few easy steps.</p> {/* Changed "Stars" to lowercase */}
                    </div>
                    <div className='allboxes'>
                        <div className="row">
                            <div className="col-md-4 col-12 ">
                                <div className="started_box">
                                    <div className="number">
                                        <span>1</span>
                                    </div>
                                    <div className="box_text">
                                        <h3 className="box_title">Create an Account</h3> {/* Fixed 'titel' to 'title' */}
                                        <p className='p_main'>Join Salt & Glitz Privilege and enjoy your exclusive member benefits straight away. Share your birthday with us to receive a surprise on your special day.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="started_box">
                                    <div className="number">
                                        <span>2</span>
                                    </div>
                                    <div className="box_text">
                                        <h3 className="box_title">Add Family Members</h3> {/* Fixed 'titel' to 'title' */}
                                        <p className='p_main'>Every online or in-store purchase you make will help you rise through the tiers. Add your family members and make their purchases count too.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12">
                                <div className="started_box">
                                    <div className="number">
                                        <span>3</span>
                                    </div>
                                    <div className="box_text">
                                        <h3 className="box_title">Shop & Enjoy</h3> {/* Fixed 'titel' to 'title' */}
                                        <p className='p_main'>Each membership tier offers new benefits and rewards. Use your benefits to unlock an exclusive experience at Salt & Glitz, where your loyalty is honoured.</p> {/* Added a comma for clarity */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ......................  Member Privileges ........................... */}
            <div className='member_privileges py-5'>
                <div className='container'>
                    <div className='member_header'>
                        <div className="member_titel">
                            <h3 className="font_main pb-1 m-0 p-0">Member Privileges</h3>
                            <p className="p_main">Make shopping at Salt & Glitz even more special with our member-only benefits.</p>
                        </div>
                        <div className='member_allboxes'>
                            <div className="row">
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon1.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Birthday Offers</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon2.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Anniversary Offers</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="http://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon3.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Family Benefits & Rewards</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon4.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Rewards every Purchase</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon5.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Exclusive Experiences</div>
                                    </div>
                                </div>
                                <div className="col-lg-2 col-md-4 col-6">
                                    <div className="member_box">
                                        <div className="icon_box">
                                            <span><img src="https://jewelbox.co.in/wp-content/themes/jewelbox_v2/images/member-privileges-icon6.png" alt="" /></span>
                                        </div>
                                        <div className="icon_text">Jewellery Care</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ......................  Membership Tiers  ........................... */}
            <div className='py-5'>
                <div className='container'>
                    <div className='membership_header'>
                        <h2 className='font_main text-center pb-3'>Membership Tiers</h2>
                    </div>
                    <div className=''>
                        <div className="row">
                            <div className="col-md-4 col-12  mb-3">
                                <div className="innerbox">
                                    <div className="innerbox_titel">
                                        PEARL
                                    </div>
                                    <div className="innerbox_text">Upon Registration</div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <div className="innerbox">
                                    <div className="innerbox_titel">
                                        AURA
                                    </div>
                                    <div className="innerbox_text">Minimum Purchase of 2 lakhs</div>
                                </div>
                            </div>
                            <div className="col-md-4 col-12 mb-3">
                                <div className="innerbox">
                                    <div className="innerbox_titel">
                                        NOVA
                                    </div>
                                    <div className="innerbox_text">Minimum Purchase of 5 lakhs</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ......................  Jewelbox Privilege Benefits ........................... */}
            <div className='jewelbox_privilege py-5'>
                <div className='container'>
                    <div className="text-center">
                        <div className="font_main">Salt & Glitz Privilege Benefits</div>
                        <div className="p_main">Benefits that grow according to your status as a member.</div>
                    </div>

                    <div className="benefits_table">
                        <table className='table benefits-table'>
                            <thead>
                                <tr>
                                    <th>Rewards</th>
                                    <th>PEARL</th>
                                    <th>AURA</th>
                                    <th>NOVA</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Discount on Diamonds</td>
                                    <td>12%</td>
                                    <td>14%</td>
                                    <td>15%</td>
                                </tr>
                                <tr>
                                    <td>Discount on 1 Carat+ Solitaires</td>
                                    <td>20%</td>
                                    <td>25%</td>
                                    <td>28%</td>
                                </tr>
                                <tr>
                                    <td>Discount on Making</td>
                                    <td>20%</td>
                                    <td>30%</td>
                                    <td>35%</td>
                                </tr>
                                <tr>
                                    <td>Gifts</td>
                                    <td>-</td>
                                    <td>50 Cent Solitaire</td>
                                    <td>1 Carat Solitaire</td>
                                </tr>
                                <tr>
                                    <td>Exclusive In-Store Previews</td>
                                    <td>-</td>
                                    <td>Yes</td>
                                    <td>Yes</td>
                                </tr>
                                <tr>
                                    <td>Additional Benefits</td>
                                    <td>-</td>
                                    <td>-</td>
                                    <td>Special discounts</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>


                    <div className='membership_mobileversion'>
                        <div className="mobile_box">
                            <h2 className='mobile_title'>PEARL</h2>
                            <ul>
                                <li><FiCheck className='check_icon' /><span>12% Discount on Diamonds</span></li>
                                <li><FiCheck className='check_icon' /><span>20% Discount on 1 Carat+ Solitaires</span></li>
                                <li><FiCheck className='check_icon' /><span>20% Discount on Making</span></li>
                            </ul>
                        </div>
                        <div className="mobile_box">
                            <h2 className='mobile_title'>AURA</h2>
                            <ul>
                                <li><FiCheck className='check_icon' /><span>14% Discount on Diamonds</span></li>
                                <li><FiCheck className='check_icon' /><span>25% Discount on 1 Carat+ Solitaires</span></li>
                                <li><FiCheck className='check_icon' /><span>30% Discount on Making</span></li>
                                <li><FiCheck className='check_icon' /><span>Free Gift - 50 Cent Solitaire</span></li>
                                <li><FiCheck className='check_icon' /><span>Exclusive In-Store Previews</span></li>
                            </ul>
                        </div>
                        <div className="mobile_box">
                            <h2 className='mobile_title'>NOVA</h2>
                            <ul>
                                <li><FiCheck className='check_icon' /><span>15% Discount on Diamonds</span></li>
                                <li><FiCheck className='check_icon' /><span>28% Discount on 1 Carat+ Solitaires</span></li>
                                <li><FiCheck className='check_icon' /><span>35% Discount on Making</span></li>
                                <li><FiCheck className='check_icon' /><span>Free Gift - 1 Carat Solitaire</span></li>
                                <li><FiCheck className='check_icon' /><span>Exclusive In-Store Previews</span></li>
                                <li><FiCheck className='check_icon' /><span>Additional Benefits - Special discounts</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* ......................  TERMS AND CONDITIONS:	  ........................... */}
            <div className='pt-5 pb-2'>
                <div className='container'>
                    <div className="text-center">
                        <h2 className='font_main pb-3'>Terms And Conditions</h2>
                    </div>
                    <div className='conditins'>
                        <ul>
                            <li>To become a Pearl Member, you must sign up and complete your first purchase. Membership will activate only after the 30-day exchange period of your first purchase ends.</li>
                            <li>Membership discounts will be applied automatically at the time of purchase — no promo code needed.</li>
                            <li>All purchases under the loyalty program are subject to Salt & Glitz’s standard return and shipping policies.</li>
                            <li>Salt & Glitz reserves the right to cancel your membership at any time if misuse or fraudulent activity is detected.</li>
                            <li>If a product is returned or exchanged, the refunded amount will be deducted from your loyalty points. This may impact your membership status.</li>
                            <li>Gift cards can only be redeemed through the Salt & Glitz website or physical store. They are valid for purchases of ₹30,000 or more.</li>
                            <li>Only purchases made within the last 2 years will be counted toward your loyalty status.</li>
                            <li>Loyalty discounts cannot be combined with other ongoing website offers or promotional discounts.</li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* ......................  faqs  ........................... */}
            <div className='pb-5'>
                <div className='container'>
                    <div className="faqs_header">
                        <h2 className='font_main'>FAQs</h2>
                    </div>
                    <div className="accordion p-0" id="accordionExample">
                        {[
                            {
                                id: 'collapseOne',
                                q: '1. How can I become a Pearl Member?',
                                a: 'To become a Pearl Member, simply sign up and make your first purchase. Your membership will begin after the 30-day exchange period for that purchase ends.',
                            },
                            {
                                id: 'collapseTwo',
                                q: '2. How do I redeem my membership discount?',
                                a: 'No additional steps are needed — your discount will be automatically applied at checkout on eligible purchases.',
                            },
                            {
                                id: 'collapseThree',
                                q: '3. Can purchases made by family members be counted toward my membership?',
                                a: 'Yes, purchases made by up to four family members can be included. These purchases must be made within the 2-year eligibility period.',
                            },
                            {
                                id: 'collapseFour',
                                q: '4. How can I upgrade my membership tier?',
                                a: 'Your membership tier is automatically upgraded based on your total purchase value over the past 2 years. The more you shop, the higher your tier.',
                            },
                            {
                                id: 'collapseFive',
                                q: '5. Can loyalty discounts be combined with other offers?',
                                a: 'No, loyalty program discounts cannot be combined with any ongoing promotional offers on the website.',
                            },
                            {
                                id: 'collapseSix',
                                q: '6. Which purchases are eligible for loyalty points?',
                                a: 'All purchases made through the Salt & Glitz website or in-store are eligible for loyalty points.',
                            },
                            {
                                id: 'collapseSeven',
                                q: '7. How do I track my membership tier and rewards?',
                                a: 'Log in to your Salt & Glitz account. Under the Loyalty Section, you’ll find your current tier, available rewards, and loyalty point balance.',
                            },
                        ].map((item, index) => (
                            <div className="accordion-item p-0" key={item.id}>
                                <h2 className="accordion-header">
                                    <button
                                        className={`accordion-button faq_accordian d-flex justify-content-between align-items-center ${index !== 0 ? 'collapsed' : ''}`}
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target={`#${item.id}`}
                                        aria-expanded={index === 0 ? 'true' : 'false'}
                                        aria-controls={item.id}
                                    >
                                        {item.q}
                                        <span className="faq-toggle-icon ms-2"></span>
                                    </button>
                                </h2>
                                <div
                                    id={item.id}
                                    className={`accordion-collapse collapse ${index === 0 ? 'show' : ''}`}
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body faq_accordian_body">
                                        {item.a}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='btn_section py-4'>
                <Link to="/privilege_account"><div className='banner_button'>JOIN NOW</div></Link>
            </div>

        </>
    )
}

export default Privillage;
