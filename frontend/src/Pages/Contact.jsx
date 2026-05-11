import React from 'react'
import { SlLocationPin } from "react-icons/sl";
import { IoCallOutline } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";

const Contact = () => {
    return (
        <>
            <section className="bg_contact">
                <div className='contact_text'>
                    <h4>At Your Service</h4>
                    <p>From finding the perfect present to product personalization, master the art of holiday gifting with assistance from Tiffany & Co. client advisors. </p>
                </div>
            </section>
            <section className='container py-3'>
                <div className='contact_text_md'>
                    <h4>At Your Service</h4>
                    <p>From finding the perfect present to product personalization, master the art of holiday gifting with assistance from Tiffany & Co. client advisors. </p>
                </div>
            </section>
            <section className='container contact_details'>
                <h2 className='text-center font_main'>Contact Us</h2>
                <div className='row text-center py-5'>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <AiOutlineMail className='fs-4 mb-2' />
                        <p className='p_main'>support@saltandglitz.com<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <IoCallOutline className='fs-4 mb-2' />
                        <p className='p_main'>Call us at +91 7984369890<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                    <div className='col-lg-4 col-md-4 col-sm-12 col-12'>
                        <SlLocationPin className='fs-4 mb-2' />
                        <p className='p_main'>Shop No. 216, 2nd Floor
                            Central Business Hub, Parle Point
                            Opposite Himson Bungalow
                            Surat, Gujarat – 395007<i class="ri-arrow-drop-right-line fs-4 align-middle"></i></p>
                    </div>
                </div>
            </section>
        </>
    )
}

export default Contact