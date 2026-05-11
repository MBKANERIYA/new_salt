import React, { useEffect } from 'react'

const Warranty = () => {

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <>
            <section className="bg_return">
                <h2>Warranty Policy</h2>
            </section>
            <section className='container-fluid px-3 pt-5'>
                <div className="elementor-widget-container">
                    <p className='elementor-widget-title'>
                        At Salt & Glitz, we are committed to ensuring your jewelry retains its brilliance and charm for a lifetime. Our warranty policy reflects our dedication to exceptional service and transparency.
                    </p>
                </div>

                <div className="elementor-widget-container">
                    <p className='elementor-heading-title'>Lifetime Warranty Services -</p>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>1.</b> Free Lifetime Services:
                    </p>
                    <li className='list_style'>We offer lifetime free services for cleaning, polishing, and minor repairs. However, any replacement parts or additional materials required during repairs will be charged to the customer.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>2.</b> Shipping Costs:
                    </p>
                    <li className='list_style'>All shipping costs related to warranty services, both to and from Salt & Glitz, will be borne by the customer.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>3.</b> Repair Feasibility:
                    </p>
                    <li className='list_style'>If a repair is deemed not possible, we will return the product to the customer without making any alterations.</li>
                </div>
                <div className="elementor-menu-container">
                    <p className='elementor-heading-title'>
                        <b>4.</b> Resizing Costs:
                    </p>
                    <li className='list_style'>If resizing requires additional gold, the cost of the extra material will be charged to the customer based on the prevailing market rate.</li>
                </div>


                <div className="elementor-widget-container">
                    <p className='elementor-menu-title'>We ensure that all warranty-related services are handled with utmost care and precision. For inquiries or to avail of warranty services, please contact our support team.
                    </p>
                </div>
            </section>
        </>
    )
}

export default Warranty