import "../styles/Home.css";
import "../styles/utilities.css";
import arrow from "../assets/images/arrow-down.svg";
import img1 from "../assets/images/article-img-1.png";
import img2 from "../assets/images/article-img-2.png";
import img3 from "../assets/images/article-img-3.png";
import bannerimage from "../assets/images/banner-image.png";
import curve1 from "../assets/images/curve-shape-1.png";
import curve2 from "../assets/images/curve-shape-2.png";
import downloadimage from "../assets/images/download-image.png";
import elm1 from "../assets/images/element-img-1.png";
import elm2 from "../assets/images/element-img-2.png";
import elm3 from "../assets/images/element-img-3.png";
import elm4 from "../assets/images/element-img-4.png";
import elm5 from "../assets/images/element-img-5.png";
import healthimg from "../assets/images/health-care-img.png";
import personimg from "../assets/images/person-image.png";
import service1 from "../assets/images/service-icon-1.png";
import service2 from "../assets/images/service-icon-2.png";
import service3 from "../assets/images/service-icon-3.png";
import service4 from "../assets/images/service-icon-4.png";
import service5 from "../assets/images/service-icon-5.png";
import service6 from "../assets/images/service-icon-6.png";
function HomePage() {
  return (
    <div className="page-wrapper">
      {/* header */}
      <header className="header">
        <nav className="navbar">
          <div className="container">
            <div className="navbar-content d-flex justify-content-between align-items-center">
              <div className="brand-and-toggler d-flex align-items-center justify-content-between">
                <a href="#" className="navbar-brand d-flex align-items-center">
                  <span className="brand-shape d-inline-block text-white">
                    M
                  </span>
                  <span className="brand-text fw-7">MedCare</span>
                </a>
                <button type="button" className="d-none navbar-show-btn">
                  <i className="fas fa-bars" />
                </button>
              </div>
              <div className="navbar-box">
                <button type="button" className="navbar-hide-btn">
                  <i className="fas fa-times" />
                </button>
                <ul className="navbar-nav d-flex align-items-center">
                  <li className="nav-item">
                    <a
                      href="/home"
                      className="nav-link text-white nav-active text-nowrap"
                    >
                      Home
                    </a>
                  </li>
                  {/* <li className="nav-item">
                    <a href="#" className="nav-link text-white text-nowrap">
                      Find a doctor
                    </a>
                  </li> */}
                  {/* <li className="nav-item">
                  <a href="#" className="nav-link text-white text-nowrap">
                    About us
                  </a>
                </li> */}
                  {/* <li className="nav-item">
                    <a href="/" className="nav-link text-white text-nowrap">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a href="/" className="nav-link text-white text-nowrap">
                      Signup
                    </a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>
        </nav>
        {/* <div className="element-one">
        <img src={img1} alt="" />
      </div> */}
        <div className="banner">
          <div className="container">
            <div className="banner-content">
              <div className="banner-left">
                <div className="content-wrapper">
                  <h1 className="banner-title">
                    Best healthcare <br /> for you
                  </h1>
                  <p className="text text-white">
                    MedCare provides progressive, and affordable healthcare,
                    accessible on web and onnline for everyone
                  </p>
                  <a href="/" className="btn btn-secondary">
                    Consult
                  </a>
                </div>
              </div>
              <div className="banner-right d-flex align-items-center justify-content-end">
                <img src={bannerimage} alt="" />
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* end of header */}
      <main>
        <section className="sc-services">
          <div className="services-shape">
            <img src={curve1} alt="" />
          </div>
          <div className="container">
            <div className="services-content">
              <div className="title-box text-center">
                <div className="content-wrapper">
                  <h3 className="title-box-name">Our services</h3>
                  <div className="title-separator mx-auto" />
                  <p className="text title-box-text">
                    We provide you the best choices for you. Adjust it to your
                    health needs and make sure you undergo treatment with our
                    highly qualified doctors you can consult with us which type
                    of service is suitable for your health
                  </p>
                </div>
              </div>
              <div className="services-list">
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service1} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Search doctor</h5>
                  <p className="text">
                    Choose your doctor form thousands of specialist, general and
                    trusted hospitals.
                  </p>
                </div>
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service2} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Online pharmacy</h5>
                  <p className="text">
                    Buy your medicines with our mobile application with a simple
                    delivery system
                  </p>
                </div>
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service3} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Consultation</h5>
                  <p className="text">
                    Free consultation with our trusted doctors and get the best
                    recommendations.
                  </p>
                </div>
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service4} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Details info</h5>
                  <p className="text">
                    Free consultation with our trusted doctors and get the best
                    recommendations.
                  </p>
                </div>
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service5} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Emergency care</h5>
                  <p className="text">
                    You can get 24/7 urgent care for yourself or your children
                    and your lovely family.
                  </p>
                </div>
                <div className="services-item">
                  <div className="item-icon">
                    <img src={service6} alt="service icon" />
                  </div>
                  <h5 className="item-title fw-7">Tracking</h5>
                  <p className="text">
                    Track and save your mental history and health data
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-center justify-content-center services-main-btn">
                <button type="button" className="btn btn-primary-outline">
                  Learn more
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="sc-grid sc-grid-one">
          <div className="container">
            <div className="grid-content d-grid align-items-center">
              <div className="grid-img">
                <img src={healthimg} alt="" />
              </div>
              <div className="grid-text">
                <div className="content-wrapper text-start">
                  <div className="title-box">
                    <h3 className="title-box-name text-white">
                      Leading healthcare providers
                    </h3>
                    <div className="title-separator mx-auto" />
                  </div>
                  <p className="text title-box-text text-white">
                    MedCare provides progressive, and affordable healthcare,
                    accessible online for everyone. To us, it's not just work.
                    We take pride in the solutions we deliver
                  </p>
                  <button type="button" className="btn btn-white-outline">
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sc-grid sc-grid-two">
          <div className="container">
            <div className="grid-content d-grid align-items-center">
              <div className="grid-img">
                <img src={downloadimage} alt="" />
              </div>
              <div className="grid-text">
                <div className="content-wrapper text-start">
                  <div className="title-box">
                    <h3 className="title-box-name">Explore our Website</h3>
                    <div className="title-separator mx-auto" />
                  </div>
                  <p className="text title-box-text">
                    Our dedicated patient engagement web portal allow you to
                    access information instantaneously (no tedeous form, long
                    calls, or administrative hassle) and securely
                  </p>
                  <button type="button" className="btn btn-primary-outline">
                    Explore
                    <img src={arrow} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="sc-articles">
          <div className="articles-shape">
            <img src={curve2} alt="" />
          </div>
          <div className="container">
            <div className="articles-content">
              <div className="articles-element">
                <img src={elm2} alt="" />
              </div>
              <div className="title-box text-center">
                <div className="content-wrapper">
                  <h3 className="title-box-name">
                    Check out our latest article
                  </h3>
                  <div className="title-separator mx-auto" />
                </div>
              </div>
              <div className="articles-list d-flex flex-wrap justify-content-center">
                <article className="articles-item">
                  <div className="item-img">
                    <img src={img2} />
                  </div>
                  <div className="item-body">
                    <div className="item-title">
                      Disease detection, check up in the laboratory
                    </div>
                    <p className="text">
                      In this case, the role of the health laboratory is very
                      important to do a disease detection ...
                    </p>
                    <a
                      href="#"
                      className="item-link text-blue d-flex align-items-baseline"
                    >
                      <span className="item-link-text">Read more</span>
                      <span className="item-link-icon">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </a>
                  </div>
                </article>
                <article className="articles-item">
                  <div className="item-img">
                    <img src={img2} />
                  </div>
                  <div className="item-body">
                    <div className="item-title">
                      Herbal medicines that are safe for consumption
                    </div>
                    <p className="text">
                      Herbal medicine is very widely used at this time because
                      of its very good for your health ...
                    </p>
                    <a
                      href="#"
                      className="item-link text-blue d-flex align-items-baseline"
                    >
                      <span className="item-link-text">Read more</span>
                      <span className="item-link-icon">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </a>
                  </div>
                </article>
                <article className="articles-item">
                  <div className="item-img">
                    <img src={img3} />
                  </div>
                  <div className="item-body">
                    <div className="item-title">
                      Natural care for healthy facial skin
                    </div>
                    <p className="text">
                      A healthy lifestyle should start from now and also for
                      your skin health ...
                    </p>
                    <a
                      href="#"
                      className="item-link text-blue d-flex align-items-baseline"
                    >
                      <span className="item-link-text">Read more</span>
                      <span className="item-link-icon">
                        <i className="fas fa-arrow-right" />
                      </span>
                    </a>
                  </div>
                </article>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-list d-grid text-white">
              <div className="footer-item">
                <a href="#" className="navbar-brand d-flex align-items-center">
                  <span className="brand-shape d-inline-block text-white">
                    M
                  </span>
                  <span className="brand-text fw-7">MedCare</span>
                </a>
                <p className="text-white">
                  MedCare provides progressive, and affordable healthcare,
                  accessible on mobile and online for everyone
                </p>
                <p className="text-white copyright-text">
                  © MedCare PTY LTD 2023. All rights reserved.
                </p>
              </div>
              <div className="footer-item">
                <h3 className="footer-item-title">Company</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">About</a>
                  </li>
                  <li>
                    <a href="#">Find a doctor</a>
                  </li>
                  <li>
                    <a href="#">Apps</a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3 className="footer-item-title">Region</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Indonesia</a>
                  </li>
                  <li>
                    <a href="#">Singapore</a>
                  </li>
                  <li>
                    <a href="#">Hongkong</a>
                  </li>
                  <li>
                    <a href="#">Canada</a>
                  </li>
                </ul>
              </div>
              <div className="footer-item">
                <h3 className="footer-item-title">Help</h3>
                <ul className="footer-links">
                  <li>
                    <a href="#">Help center</a>
                  </li>
                  <li>
                    <a href="#">Contact support</a>
                  </li>
                  <li>
                    <a href="#">Instructions</a>
                  </li>
                  <li>
                    <a href="#">How it works</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-element-1">
          <img src={elm4} alt="" />
        </div>
        <div className="footer-element-2">
          <img src={elm5} alt="" />
        </div>
      </footer>
    </div>
  );
}

export default HomePage;
