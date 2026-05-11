import React, { useEffect } from 'react'

const Exchange = () => {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="bg_return">
                <h2>Lifetime Buyback &<br /> Exchange Policy</h2>
            </section>
            <section className='container-fluid px-3 pt-5'>
                <div className="elementor-widget-container">
                    <p className='elementor-widget-title'>
                        At Salt & Glitz, we aim to provide a fair and transparent process for exchanging or returning your jewelry. Please review the following terms and conditions to understand our Exchange and Buyback Policy.
                    </p>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>General Terms -</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Eligibility:
                    </p>
                    <li className='list_style'>Customized or personalized items are not eligible for exchange or buyback.</li>
                    <li className='list_style'>Only jewelry purchased from the official Salt & Glitz website or app is eligible for exchange or buyback.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Documentation:
                    </p>
                    <li className='list_style'>The original certificate must be provided. If unavailable, a fee of ₹2,000 or ₹800 per carat (whichever is higher) will be charged.</li>
                    <li className='list_style'>If the invoice is not provided, a 10% charge will apply for both exchange and buyback.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>3.</b> Non-Eligible Items:
                    </p>
                    <li className='list_style'>Items containing loose, baguette, or tapered diamonds, Polki, pearls, or colored stones are not eligible for exchange or buyback.</li>
                    <li className='list_style'>Jewelry that has undergone alteration is not eligible for exchange or buyback.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>4.</b> EMI Purchases:
                    </p>
                    <li className='list_style'>For jewelry purchased under an EMI plan, any unpaid installments will be deducted during the exchange or buyback process.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>5.</b> Value Limit:
                    </p>
                    <li className='list_style'>Only jewelry valued at or below ₹2,00,000 is eligible for exchange or buyback.</li>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Exchange Policy -</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Exchange Value:
                    </p>
                    <li className='list_style'>The exchange value will be based on the current market rate, as determined after a quality check of the item.</li>
                    <li className='list_style'>We will provide a clear justification for the value assessed.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Fees and Deductions:
                    </p>
                    <li className='list_style'>Making charges, taxes, a ₹1,000 processing fee, and adjustments for discounts or loyalty points will be deducted from the final exchange value.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>3.</b> Wallet Credit:
                    </p>
                    <li className='list_style'>The exchange amount will be credited to your Salt Wallet and can only be used for purchasing another product of equal or greater value.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>4.</b> Wallet Expiry:
                    </p>
                    <li className='list_style'>If wallet cash is not used within 180 days, the amount will be transferred to your bank account, subject to a deduction of 10% of the invoice value.</li>
                </div>
                {/*  */}
                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Buyback Policy –</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Buyback Value:
                    </p>
                    <li className='list_style'>The buyback value will also be determined based on the current market rate after a quality check. Justifications for the valuation will be provided.</li>
                </div>
                <div className="table-container">
                    <table className="styled-table">
                        <thead>
                            <tr>
                                <th>Category</th>
                                <th>Exchange Value</th>
                                <th>Buyback Value</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Diamond Jewellery</td>
                                <td rowspan="2">
                                    100% of gold value at current market value.<br></br>
                                    100% of diamond value at current market value.
                                </td>
                                <td rowspan="2">
                                    100% of gold value at current market value.<br></br>
                                    80% of diamond value at current market value.
                                </td>
                            </tr>
                            <tr>
                                <td>Loose Solitaires</td>
                            </tr>
                            <tr>
                                <td>Plain Gold Jewellery</td>
                                <td>100% of gold value at current market value.</td>
                                <td>100% of gold value at current market value.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Fees and Deductions:
                    </p>
                    <li className='list_style'>Making charges, taxes, a ₹1,000 processing fee, and adjustments for discounts or loyalty points will be deducted.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>3.</b> Refund Process:
                    </p>
                    <li className='list_style'>The buyback amount will be credited directly to your bank account within 15 working days.</li>
                </div>

                <div className="elementor-widget-container mt-4">
                    <p className='elementor-menu-title'>
                        We are committed to ensuring fairness and transparency throughout the exchange and buyback process. For any queries or assistance, please reach out to our support team.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Exchange