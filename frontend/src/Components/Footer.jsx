import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const toggleFAQ = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };
  const location = useLocation();
  const isCollectionOrProductPage =
    location.pathname.includes('/products') || location.pathname.includes('/Productdetails');

  return (
    <>
      <section className='container-fluid footer_main d-lg-block d-md-block d-none  '>
        {/* <div className="app-download-container">
          <h2 className="app-title text-start">Download the Salt&Glitz App</h2>
          <p className="app-description text-start">
            Shop & Save more on app by redeeming xCLusive points
          </p>
          <div className="d-flex justify-content-center gap-3 mt-3">
            <a
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                alt="Download on the App Store"
                className=""
              />
            </a>
            <a
              href="https://play.google.com/store/games"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                alt="Get it on Google Play"
                className="store-badge"
              />
            </a>
          </div>
        </div> */}
        <div className='row ps-3'>
          <div className='col-lg-2 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Client Care</h6>
            <p><Link to="/contact">Contact Us</Link></p>
            <p><Link to="">Track Your Order</Link></p>
            <p><Link to="">Book an Appointment</Link></p>
            <p><Link to="">Frequently Asked Questions</Link></p>
            <p><Link to="">Shipping & Returns</Link></p>
            <p><Link to="">Product Care & Repair</Link></p>
            <p><Link to="">Gift Cards</Link></p>
          </div>

          <div className='col-lg-2 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Our Company</h6>
            <p><Link to="">World of Salt</Link></p>
            <p><Link to="">Sustainability</Link></p>
            <p><Link to="">Salt Careers</Link></p>
            <p><Link to="/return">Return Policies</Link></p>
            <p><Link to="/exchange">Exchange & Buy Back Policies</Link></p>
            <p><Link to="/warranty">Warranty Policies</Link></p>
          </div>

          <div className='col-lg-3 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Related Salt Sites</h6>
            <p><Link to="">Wedding & Gift Registry</Link></p>
            <p><Link to="">Business Accounts</Link></p>
            <p><Link to="">Salt for the Press</Link></p>
          </div>

          <div className='col-lg-5 col-md-6 col-sm-12 footer_sec pb-5'>
            <h6 className='fw-bolder pb-3'>Latest from Salt</h6>
            <p style={{ fontSize: "13px" }} className='footer_email_p'>
              Be the first to know about exciting new designs, special events, store openings, and much more.
            </p>
            <input
              type='email'
              placeholder='Email'
              className="form-control border-bottom border-0 rounded-0 border-dark border-1"
              required
            />
            <button className='btn bg-dark text-light mt-3 mb-3'>Sign Up</button>
            <div className='text-center'>
              <i className="ri-instagram-line fs-2 px-3"></i>
              <i className="ri-facebook-box-fill fs-2 px-3"></i>
              <i className="ri-pinterest-fill fs-2 px-3"></i>
              <i className="ri-twitter-x-line fs-3 px-3"></i>
              <i className="ri-youtube-fill fs-2 px-3"></i>
            </div>
            <div className="app-download-container mt-5">
              <h2 className="app-title">Download the Salt&Glitz App</h2>
              <p className="app-description">
                Shop & Save more on app by redeeming xCLusive points
              </p>
              <div className="d-flex justify-content-center gap-3 mt-3">
                <a
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                    alt="Download on the App Store"
                    className=""
                  />
                </a>
                <a
                  href="https://play.google.com/store/games"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                    alt="Get it on Google Play"
                    className="store-badge"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <h6 className='m-0 p-0 text-center pb-2'>© S&G 2025</h6>
      </section>
      <section className='container footer_main py-3 d-sm-block d-lg-none d-md-none'>
        <div className={`${isCollectionOrProductPage ? 'main-content ' : ''}`}>
          <div className="app-download-container">
            <h2 className="app-title">Download the Salt&Glitz App</h2>
            <p className="app-description">
              Shop & Save more on app by redeeming xCLusive points
            </p>
            <div className="d-flex justify-content-center gap-3 mt-3">
              <a
                href="https://www.apple.com/app-store/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className=""
                />
              </a>
              <a
                href="https://play.google.com/store/games"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/512px-Google_Play_Store_badge_EN.svg.png"
                  alt="Get it on Google Play"
                  className="store-badge"
                />
              </a>
            </div>
          </div>
          <div className='row'>
            <div className='faq-container'>
              {faqData.map((faq, index) => (
                <div key={index} className='faq'>
                  <div
                    className='faq-question'
                    onClick={() => toggleFAQ(index)}
                    style={{ cursor: 'pointer' }}
                  >
                    {faq.question}
                    <span className='toggle-icon'>
                      {activeIndex === index ? '-' : '+'}
                    </span>
                  </div>
                  <div
                    className={`faq-answer ${activeIndex === index ? 'open' : ''}`}
                    style={{ display: activeIndex === index ? 'block' : 'none' }}
                  >
                    {faq.answer}
                  </div>
                </div>
              ))}
            </div>
            <div className='text-center pt-3'>
              <i className="ri-instagram-line fs-2 px-3"></i>
              <i className="ri-facebook-box-fill fs-2 px-3"></i>
              <i className="ri-pinterest-fill fs-2 px-3"></i>
              <i className="ri-twitter-x-line fs-3 px-3"></i>
              <i className="ri-youtube-fill fs-2 px-3"></i>
              <h6 className='m-0 p-0 text-center pt-3'>© S&G 2025</h6>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
const faqData = [
  {
    question: "Client Care",
    answer: (
      <div>
        <p><Link to="/contact">Contact Us</Link></p>
        <p><Link to="">Track Your Order</Link></p>
        <p><Link to="">Book an Appointment</Link></p>
        <p><Link to="">Frequently Asked Questions</Link></p>
        <p><Link to="">Shipping & Returns</Link></p>
        <p><Link to="">Product Care & Repair</Link></p>
        <p><Link to="">Gift Cards</Link></p>
      </div>
    )
  },
  {
    question: "Our Company",
    answer: (
      <div>
        <p><Link to="">World of Salt</Link></p>
        <p><Link to="">Sustainability</Link></p>
        <p><Link to="">Salt Careers</Link></p>
        <p><Link to="/return">Return Policy</Link></p>
        <p><Link to="/exchange">Transparency in Coverage</Link></p>
        <p><Link to="/warranty">Warranty Policies</Link></p>
      </div>
    ),
  },
  {
    question: 'Related Salt Sites',
    answer: (
      <div>
        <p><Link to="">Wedding & Gift Registry</Link></p>
        <p><Link to="">Business Accounts</Link></p>
        <p><Link to="">Salt for the Press</Link></p>
      </div>
    ),
  },
  {
    question: 'Latest from Salt',
    answer: (
      <div>
        <p style={{ fontSize: "13px" }}>
          Be the first to know about exciting new designs, special events, store openings, and much more.
        </p>
        <input
          type='email'
          placeholder='Email'
          className="form-control border-bottom border-0 rounded-0 border-dark border-1"
          required
        />
        <button className='btn bg-dark text-light mt-3 mb-3'>Sign Up</button>

      </div>
    ),
  },
];
export default Footer;