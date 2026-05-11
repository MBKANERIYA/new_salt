import React, { useEffect } from 'react';

const Return = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="bg_return">
                <h2>Return Policy</h2>
            </section>
            <section className='container-fluid px-3 pt-5'>
                <div className="elementor-widget-container">
                    <p className='elementor-widget-title'>
                        At Salt & Glitz, we prioritize customer satisfaction and strive to offer a seamless return process. Our 30-Day Return Policy ensures that you have the flexibility to return eligible products under the following terms and conditions:
                    </p>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Return Period -</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Full Refund:
                    </p>
                    <li className='list_style'>Returns initiated within 7 days of delivery are eligible for a full refund to the original payment method.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Salt Cash Credit (Wallet Refund):
                    </p>
                    <li className='pb-3 list_style'>Returns initiated after 7 days but within 30 days of delivery will be refunded as Salt Cash, credited to your Salt Wallet.</li>
                    <li className='pb-2 list_style'>Salt Cash Terms:</li>
                    <div className='elementor-menu-container'>
                        <li className='list_style1'>Must be used within 180 days of issuance.</li>
                        <li className='list_style1'>Can be used only for purchases on the Salt & Glitz website or app.</li>
                    </div>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Return Eligibility -</p>
                </div>
                <div className=''>
                    <p className='elementor-menu-title'> To be eligible for a return, the following conditions must be met:</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Product Condition:
                    </p>
                    <li className='list_style'>The item must be in its original condition with no alterations or damages.</li>
                    <li className='list_style'>Items with broken tags, damaged boxes will not be accepted.</li>
                    {/* or missing accessories  */}
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Documentation and Packaging:
                    </p>
                    <li className='list_style'>The original box, invoice, and certificates of authenticity must be included with the return.</li>
                    <li className='list_style'>Missing certificates will result in the return being rejected.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>3.</b> Exclusions:
                    </p>
                    <li className='list_style'>Customized or personalized items are not eligible for return.</li>
                    <li className='list_style'>Products purchased via EMI plans or valued above ₹2,00,000 are not eligible for return.</li>
                    <li className='list_style'>Jewelry purchased outside the official Salt & Glitz website or app will not be accepted for returns.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>4.</b> Ineligible Items:
                    </p>
                    <li className='list_style'>Items containing loose, baguette, or tapered diamonds, Polki, pearls, or colored stones are not eligible for return.</li>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Refund Processing -</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-menu-title'>
                        <b>1.</b> Refunds will be processed within 3 working days excluding bank holiday from the date of return approval.
                    </p>
                    <p className='elementor-menu-title'>
                        <b>2.</b> For returns within 7 days, the refund will be credited to the original payment method.
                    </p>
                    <p className='elementor-menu-title'>
                        <b>3.</b> For returns after 7 days, the refund will be credited as Salt Cash.
                    </p>
                </div>
                {/*  */}

                <div className="elementor-widget-container">
                    <p className='elementor-menu-title'>We are committed to maintaining the highest quality standards in all our products. If you have any questions or need further assistance, please contact our support team.
                    </p>
                </div>
            </section>
        </>
    );
};

export default Return;
