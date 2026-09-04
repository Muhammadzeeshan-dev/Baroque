import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPinterestP, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black text-white pt-5 pb-4 mt-auto border-top border-secondary">
      <Container fluid className="px-4 px-md-5">
        <Row className="gy-4">
          {/* Column 1: Newsletter Signup */}
          <Col xs={12} lg={4} className="mb-3">
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
              SIGN UP FOR UPDATES
            </h6>
            <p className="text-white-50 small mb-3" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
              BY SIGNING UP, YOU AGREE TO RECEIVE BAROQUE OFFERS AND PROMOTIONS.
            </p>
            <Form className="d-flex position-relative me-md-4">
              <Form.Control 
                type="email" 
                placeholder="ENTER YOUR E-MAIL" 
                className="bg-transparent text-white rounded-0 border-top-0 border-start-0 border-end-0 border-bottom border-light shadow-none ps-0 pe-5 py-2"
                style={{ fontSize: '0.8rem', letterSpacing: '1px' }}
              />
              <Button 
                variant="link" 
                className="position-absolute end-0 top-50 translate-middle-y text-white p-0 shadow-none"
              >
                <FaArrowRight size={14} />
              </Button>
            </Form>
          </Col>

          {/* Column 2: Customer Care */}
          <Col xs={6} md={3} lg={2}>
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem' }}>CUSTOMER CARE</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2" style={{ fontSize: '0.75rem' }}>
              <li><a href="#contact" className="text-white-50 text-decoration-none footer-link">CONTACT US</a></li>
              <li><a href="#dispatch" className="text-white-50 text-decoration-none footer-link">DISPATCH TIMELINE</a></li>
              <li><a href="#faq" className="text-white-50 text-decoration-none footer-link">FAQS & HELP</a></li>
              <li><a href="#exchange" className="text-white-50 text-decoration-none footer-link">EXCHANGE & RETURN</a></li>
            </ul>
          </Col>

          {/* Column 3: Policies */}
          <Col xs={6} md={3} lg={2}>
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem' }}>POLICIES</h6>
            <ul className="list-unstyled small d-flex flex-column gap-2" style={{ fontSize: '0.75rem' }}>
              <li><a href="#privacy" className="text-white-50 text-decoration-none footer-link">PRIVACY POLICY</a></li>
              <li><a href="#refund" className="text-white-50 text-decoration-none footer-link">REFUND POLICY</a></li>
              <li><a href="#shipping" className="text-white-50 text-decoration-none footer-link">SHIPPING POLICY</a></li>
              <li><a href="#terms" className="text-white-50 text-decoration-none footer-link">TERMS OF SERVICE</a></li>
            </ul>
          </Col>

          {/* Column 4: About & Contact */}
          <Col xs={12} md={6} lg={4}>
            <h6 className="text-uppercase fw-bold mb-3" style={{ letterSpacing: '1.5px', fontSize: '0.8rem' }}>GET IN TOUCH</h6>
            <div className="text-white-50 small d-flex flex-column gap-2 mb-3" style={{ fontSize: '0.75rem' }}>
              <div>UAN: +92 111 387 387</div>
              <div>EMAIL: INFO@BAROQUE.PK</div>
              <div>MON - SAT: 09:00 AM TO 06:00 PM (PKT)</div>
            </div>

            {/* Social Icons */}
            <div className="d-flex gap-3 text-white fs-5 mt-3">
              <a href="#fb" className="text-white footer-icon"><FaFacebookF /></a>
              <a href="#insta" className="text-white footer-icon"><FaInstagram /></a>
              <a href="#yt" className="text-white footer-icon"><FaYoutube /></a>
              <a href="#tt" className="text-white footer-icon"><FaTiktok /></a>
              <a href="#pin" className="text-white footer-icon"><FaPinterestP /></a>
            </div>
          </Col>
        </Row>

        {/* Bottom Rights & Payment Icons */}
        <div className="border-top border-secondary mt-5 pt-3 d-flex flex-column flex-md-row justify-content-between align-items-center text-white-50 small gap-2" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
          <div>© 2026 BAROQUE. ALL RIGHTS RESERVED.</div>
          <div className="d-flex gap-3">
            <span>VISA</span>
            <span>MASTERCARD</span>
            <span>PAYPAK</span>
            <span>CASH ON DELIVERY</span>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;