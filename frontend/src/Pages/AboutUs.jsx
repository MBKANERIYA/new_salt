import Aos from 'aos';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Helmet from '../Components/Helmet';

const AboutUs = () => {
  const [currentData, setCurrentData] = useState({
    title: 'The Beginning',
    year: '2008',
    content: 'Salt was founded by Mithun Sacheti and Srinivasa Gopalan with a refreshing and courageous objective – to make beautiful jewellery accessible, affordable and forever wearable.',
    img: 'https://cdn.caratlane.com/media/static/images/V4/2020/caratlane/sample-01.png'
  });

  const [selectedYear, setSelectedYear] = useState('2008'); // State to track selected year

  // Data for each year
  const data = {
    2008: {
      title: 'The Beginning',
      content: 'Salt was founded by Mithun Sacheti and Srinivasa Gopalan with a refreshing and courageous objective – to make beautiful jewellery accessible, affordable and forever wearable.',
      img: 'https://cdn.caratlane.com/media/static/images/V4/2020/caratlane/sample-01.png',
    },
    2012: {
      title: 'Launch of our first retail store',
      content: 'Taking the vision of creating a first-ever omni-channel jewellery brand, we opened doors to customers in Delhi in the bustling market of Greater Kailash.',
      img: 'https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Second.png',
    },
    2015: {
      title: 'Strategic Investment by Titan',
      content: 'We joined forces with Tanishq, India’s most desired and largest jewellery brand through a strategic investment by the Titan Company.',
      img: 'https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Third.png',
    },
    2016: {
      title: 'Introduced Same-Day Shipping',
      content: 'Taking the next evolutionary step in logistics, we introduced same-day shipping for our online customers; a first for a jewellery e-tailer.',
      img: 'https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Fourth.png',
    },
    2020: {
      title: 'Its 2020',
      content: 'With Titan standing strong behind us, we have expanded our omnichannel jewellery brand further. We now stand at a fast-growing rate of 90+ stores all over India. We also have introduced Try@Home in over 9 cities.',
      img: 'https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Fifth.png',
    }
  };

  // Function to handle click and update content
  const handleYearClick = (year) => {
    setCurrentData(data[year]);
    setSelectedYear(year); // Update selected year
  };

  // Style for the clicked year
  const getYearStyle = (year) => {
    return {
      cursor: 'pointer',
      color: selectedYear === year ? '#00362A' : 'black', // Apply color conditionally
      fontWeight: selectedYear === year ? 'bold' : 'normal' // Optional: Bold for selected year
    };
  };

  useEffect(() => {
    Aos.init();
  }, []);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const customSliderSettings = {
    dots: true, // Enable dots for all screen sizes
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Show 5 slides on large devices
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024, // For large devices
        settings: {
          slidesToShow: 3, // Show 3 slides on large devices
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 768, // For medium devices
        settings: {
          slidesToShow: 3, // Show 2 slides on medium devices
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480, // For small devices
        settings: {
          slidesToShow: 2, // Show 1 slide on small devices
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <Helmet title="About Us">
      <>
        {/* Banner */}
        <section className='container-fluid m-0 p-0'>
          <div className=''>
            <img alt='aboutUs_img' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/header.png' className='img-fluid mx-auto d-block'></img>
          </div>
        </section>

        {/* who are we */}
        <section className='container py-5'>
          <div className='text-center aboutus_who_are_we'>
            <h3 className='font_main'>Who Are We</h3>
            <div className="underline mb-3 mx-auto d-block"></div>
            <p>Conversations with hundreds of women across the country revealed a common problem: buying expensive jewellery for momentous events & settling for mediocre designs that failed to keep up with their dynamic lifestyles.</p>
            <p>Salt was founded in 2008 to bridge the gap between exquisite jewellery meant for special occasions and everyday wear, making diamond jewellery accessible, affordable, and a timeless part of your life that you could wear effortlessly every day.</p>
            <p>
              <strong>Today, Salt stands as India's largest omni-channel jeweller, with a robust presence in more than 100 Indian cities through an extensive network of over 250 retail stores.</strong>
            </p>
          </div>
        </section>

        {/* Featured In */}
        <section className='text-center py-5'>
          <h3 className='pb-3 font_main'>Featured In</h3>
          <div className='container-fluid aboutus_featured py-5'>
            <div className='text-center'>
              <Slider {...customSliderSettings}>
                <div className="mx-auto d-block">
                  <img alt='Verve' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Verve.png' className='featured-img img-fluid' />
                </div>
                <div className="mx-auto d-block">
                  <img alt='Forbes' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Forbes.png' className='featured-img img-fluid' />
                </div>
                <div className="mx-auto d-block">
                  <img alt='Femina' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Femina.png' className='featured-img img-fluid' />
                </div>
                <div className="mx-auto d-block">
                  <img alt='Vogue' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/Vogue.png' className='featured-img img-fluid' />
                </div>
                <div className="mx-auto d-block">
                  <img alt='GQ' src='https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/GQ.png' className='featured-img img-fluid' />
                </div>
              </Slider>
            </div>
          </div>
        </section>

        {/* Mission & promise  */}
        <section className='container-fluid'>
          <div className='aboutus_mission py-3'>
            <div className='row'>
              <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                <div>
                  <h5>Our Mission</h5>
                  <div className="underline mb-3"></div>
                  <p className='m-0 pb-2'>Our mission is to make beautiful jewellery accessible. Jewellery that not only makes a woman look beautiful but also make her feel beautiful and loved.</p>
                </div>
              </div>
              <div className='col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12'>
                <div>
                  <h5>Our Promise</h5>
                  <div className="underline mb-3"></div>
                  <p className='m-0 pb-2'>We started our company on three simple premises:</p>
                  <p className="promise-text "><i className="ri-subtract-line"></i> Our style is relentlessly modern, yet intensely respectful of traditions.</p>
                  <p className="promise-text "><i className="ri-subtract-line"></i> We always look for better and newer ways to do things; from the designs that we make to the experiences that we deliver.</p>
                  <p className="promise-text "><i className="ri-subtract-line"></i> We are open in our interactions with our customers. Our prices and policies are always transparent.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantages */}
        <section className='container-fluid advantages_bg my-5'>
          <div className='container'>
            <div className='aboutus_advantages'>
              <div className='row'>
                <div className='col-6 advantages_div' data-aos="zoom-in" data-aos-duration="1000">
                  <div className='d-flex align-items-center'>
                    <img alt='' src='assets/img/advantages1.png' className='me-3'></img>
                    <div className='text-light'>
                      <h3>100% Certified & Free Shipping</h3>
                      <p>Our jewellery always comes with a certificate of authentication.</p>
                    </div>
                  </div>
                </div>
                <div className='col-6 advantages_div' data-aos="zoom-in" data-aos-duration="1000">
                  <div className='d-flex align-items-center'>
                    <img alt='' src='assets/img/advantages3.png' className='me-3'></img>
                    <div className='text-light'>
                      <h3>15 Day Money-Back</h3>
                      <p>Get 100% refund if you don't like your jewellery.</p>
                    </div>
                  </div>
                </div>
                <div className='col-6 advantages_div padding_left' data-aos="zoom-in" data-aos-duration="1000">
                  <div className='d-flex align-items-center'>
                    <img alt='' src='assets/img/advantages2.png' className='me-3'></img>
                    <div className='text-light'>
                      <h3>Lifetime Exchange</h3>
                      <p>Exchange your old designs anytime you want an upgrade.</p>
                    </div>
                  </div>
                </div>
                <div className='col-6 advantages_div padding_left' data-aos="zoom-in" data-aos-duration="1000">
                  <div className='d-flex align-items-center'>
                    <img alt='' src='assets/img/advantages4.png' className='me-3'></img>
                    <div className='text-light'>
                      <h3>One Year Warranty*</h3>
                      <p>If your jewellery has a defect, we will fix it.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Beginning */}
        <section className='container-fluid m-0 p-0 border_bottom_beginning'>
          <div className='container py-5'>
            <div className='aboutus_beginning'>
              <div className='row'>
                <div className='col-xl-6 col-lg-6 col-12 m-0 p-0'>
                  <img alt='' src={currentData.img} className='img-fluid w-75' />
                </div>
                <div className='col-xl-6 col-lg-6 col-12 align-items-center d-flex pt-4'>
                  <div className=''>
                    <h3>{currentData.title}</h3>
                    <p>
                      <span onClick={() => handleYearClick('2008')} style={getYearStyle('2008')}>2008</span> <i className="ri-subtract-line px-1 fw-bold"></i>
                      <span onClick={() => handleYearClick('2012')} style={getYearStyle('2012')}>2012</span> <i className="ri-subtract-line px-1 fw-bold"></i>
                      <span onClick={() => handleYearClick('2015')} style={getYearStyle('2015')}>2015</span> <i className="ri-subtract-line px-1 fw-bold"></i>
                      <span onClick={() => handleYearClick('2016')} style={getYearStyle('2016')}>2016</span> <i className="ri-subtract-line px-1 fw-bold"></i>
                      <span onClick={() => handleYearClick('2020')} style={getYearStyle('2020')}>2020</span>
                    </p>
                    <p>{currentData.content}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team */}
        <section className='container'>
          <div className="py-5 mt-3">
            <div className="text-center pb-5">
              <h3 className='font_main'>Our Team</h3>
              <div className="underline mb-3 mx-auto d-block"></div>
              <p className="team_p">Our roots are digital, our passion is contagious and most importantly, our people are creative, inspiring, and dedicated!</p>
            </div>
            <div className='aboutus_team'>
              <div className='row'>
                <div className='col-xl-3 col-lg-3 col-6'>
                  <img alt="" src="https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/mithun.png" className="img-fluid custom-img-size"></img>
                  <div className="text-center">
                    <h4>Mithun Sacheti</h4>
                    <p>Founder and MD</p>
                  </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-6'>
                  <img alt="" src="https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/guru.png" className="img-fluid custom-img-size"></img>
                  <div className="text-center">
                    <h4>Gurukeerthi</h4>
                    <p>Co-Founder and SVP Technology</p>
                  </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-6'>
                  <img alt="" src="https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/avnish.png" className="img-fluid custom-img-size"></img>
                  <div className="text-center">
                    <h4>Avnish Anand</h4>
                    <p>Chief Operating Officer</p>
                  </div>
                </div>
                <div className='col-xl-3 col-lg-3 col-6'>
                  <img alt="" src="https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/atul.png" className="img-fluid custom-img-size"></img>
                  <div className="text-center">
                    <h4>Atul Sinha</h4>
                    <p>SVP Retail</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Advantage-Two */}
        <section className="container-fluid advantage_two_bg">
          <div className="">
            <h3 className='font_main'>Salt Advantage</h3>
            <div className="underline mb-3 mx-auto d-block"></div>
            <p>When you shop at Salt, you can always be assured of the highest quality standards. Every piece of jewellery is meticulously crafted with the utmost care. It goes through a thorough quality check and is then taken through certification.</p>
          </div>
        </section>

        {/* Testimonial */}
        <section className="container-fluid aboutus_testimonial_bg ">
          <div className="text-center">
            <Slider {...settings}>
              <div>
                <img alt="" src="assets/img/Instagram.png" className="img-fluid mx-auto d-block"></img>
                <h2> “I received this Mangalsutra bracelet as my first Karva Chauth gift! It's simple and sweet, just like my husband. 🥰”</h2>
                <p>- Akanksha Joshi via Instagram</p>
              </div>
              <div>
                <img alt="" src="assets/img/Instagram.png" className="img-fluid mx-auto d-block"></img>
                <h2>“I wanted to buy a cute and trendy Nazaria for my newborn that is rash-free & has no sharp edges. That's when I came across Salt & found the cutest Nazaria for my boy!”</h2>
                <p>- Dipali Nimavat via Instagram</p>
              </div>
              <div>
                <img alt="" src="assets/img/Instagram.png" className="img-fluid mx-auto d-block"></img>
                <h2>“My brother surprised me with this necklace last Raksha Bandhan. It was just an aww moment for me. 🥰 Engraving my name on it is the best part!”</h2>
                <p>- Diksha Saxena via Instagram</p>
              </div>

            </Slider>
            <Link to="/"><button className="mt-5 aboutus_testimonial_bg_button">Read More</button></Link>
          </div>
        </section>

        {/* Process */}
        <section className="container-fluid aboutus_process_bg p-0">
          <div className="">
            <div className="row m-0">
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 m-0 p-0">
                <img alt="" src="https://cdn1.caratlane.com/static/images/V4/2018/AboutusPages/our_Story/new_site/drawing.png" className="img-fluid w-100"></img>
              </div>
              <div className="col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12 process_bg align-items-center d-flex">
                <div>
                  <h4>Making Process</h4>
                  <p>Our designs always come with a unique Salt touch through innovative designs or techniques, or both. Uncover our jewellery-making process, from the inspiration to the final outcome.</p>
                </div>
              </div>
              <Link to="/" className="text-decoration-none"><button>Continue Shopping</button></Link>
            </div>
          </div>
        </section>

        {/* layout */}
        <section className="container-fluid overflow-hidden pt-5 px-lg-2 px-0">
          <h4 className="ps-lg-3 ps-0 pb-2 text-center text-lg-start font_main">Shop Our Instagram</h4>
          <div className="row m-0 p-0">
            <div className="col-lg-5 col-md-12 col-sm-12 col-12 m-0 p-0">
              <img
                src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/1.jpg"
                alt="Gold bracelet with evil eye design"
                className="instagram-main-img"
              />
            </div>
            <div className="col-lg-7 col-md-12 col-sm-12 col-12 m-0 p-0">
              <div className="row m-0 p-0">
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/2.jpg"
                    alt="Diamond ring with a circular shape"
                    className="instagram-secondary-img"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/4.jpg"
                    alt="Elegant gold bracelet"
                    className="instagram-secondary-img"
                  />
                </div>
                <div className="col-lg-4  col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/5.jpg"
                    alt="Diamond ring with a circular shape"
                    className="instagram-secondary-img"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/6.jpg"
                    alt="Elegant gold bracelet"
                    className="instagram-secondary-img"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/3.jpg"
                    alt="Gold necklace with intricate design"
                    className="instagram-secondary-img"
                  />
                </div>
                <div className="col-lg-4 col-md-6 col-sm-6 col-6 p-0 overflow">
                  <img
                    src="https://cdn.caratlane.com/media/static/images/V4/2023/CL/05-MAY/Others/Insta/12/7.jpg"
                    alt="Diamond ring with a circular shape"
                    className="instagram-secondary-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </>
    </Helmet>
  )
}

export default AboutUs