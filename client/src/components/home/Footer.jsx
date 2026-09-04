import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp } from 'react-icons/fa';

const Footer = ({ selectedCountry = 'Pakistan', setSelectedCountry }) => {
  const handleCountryChange = (e) => {
    if (typeof setSelectedCountry === 'function') {
      setSelectedCountry(e.target.value);
    }
  };

  return (
    <footer className="footer-dark bg-black text-white pt-5 pb-3">
      <Container fluid className="px-md-5">
        <Row className="g-4 justify-content-between">
          {/* ABOUT */}
          <Col xs={12} md={4}>
            <h6 className="footer-col-title mb-3">ABOUT</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#who">Who We Are</a></li>
              <li><a href="#responsibility">Our Responsibility</a></li>
              <li><a href="#buying">Buying With Confidence</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#press">Press / Release</a></li>
            </ul>
          </Col>

          {/* CUSTOMER SERVICE */}
          <Col xs={12} md={4}>
            <h6 className="footer-col-title mb-3">CUSTOMER SERVICE</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#contact">Contact Us</a></li>
              <li><a href="#tracking">Payment Tracking</a></li>
              <li><a href="#exchange">Exchange & Returns</a></li>
              <li><a href="#email">Email: info@baroque.com.pk</a></li>
              <li><a href="#uan">UAN: 111-303-303</a></li>
              <li><a href="#whatsapp">WhatsApp: +92 321 7777771</a></li>
            </ul>
          </Col>

          {/* POLICIES */}
          <Col xs={12} md={4}>
            <h6 className="footer-col-title mb-3">POLICIES</h6>
            <ul className="list-unstyled footer-links">
              <li><a href="#privacy">Privacy Policy</a></li>
              <li><a href="#terms">Terms of Use</a></li>
              <li><a href="#shipping">Shipping Policy</a></li>
              <li><a href="#returns">Returns & Refunds</a></li>
              <li><a href="#legal">Legal</a></li>
            </ul>
          </Col>
        </Row>

        {/* Social Icons & Bottom Row */}
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mt-5 pt-4 border-top border-secondary">
          <div className="d-flex gap-3 mb-3 mb-md-0">
            <a href="#fb" className="footer-social-icon"><FaFacebookF size={16} /></a>
            <a href="#insta" className="footer-social-icon"><FaInstagram size={16} /></a>
            <a href="#yt" className="footer-social-icon"><FaYoutube size={16} /></a>
            <a href="#tiktok" className="footer-social-icon"><FaTiktok size={16} /></a>
            <a href="#wa" className="footer-social-icon"><FaWhatsapp size={16} /></a>
          </div>

          {/* Country Switcher */}
          <div className="my-2 my-md-0">
            <select 
              value={selectedCountry} 
              onChange={handleCountryChange}
              className="bg-transparent text-white border-0 text-uppercase letter-spacing-2 style-country-select"
              style={{ cursor: 'pointer', outline: 'none', fontSize: '12px' }}
            >
              <option value="Pakistan" className="bg-dark text-white">PAKISTAN</option>
              <option value="International" className="bg-dark text-white">INTERNATIONAL</option>
              <option value="USA" className="bg-dark text-white">UNITED STATES</option>
              <option value="UK" className="bg-dark text-white">UNITED KINGDOM</option>
            </select>
          </div>

          <div className="d-flex gap-2 align-items-center mt-3 mt-md-0">
            <span className="badge bg-light text-dark px-2 py-1 fw-bold" style={{ fontSize: '10px' }}>mastercard</span>
            <span className="badge bg-light text-dark px-2 py-1 fw-bold" style={{ fontSize: '10px' }}>VISA</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;