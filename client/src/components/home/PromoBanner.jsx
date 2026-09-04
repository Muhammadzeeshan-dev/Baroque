import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const PromoBanner = () => {
  return (
    <section className="py-5 bg-white">
      <Container fluid className="px-md-5">
        <Row className="g-4">
          <Col xs={12} md={6}>
            <div className="promo-box position-relative overflow-hidden text-center text-white d-flex align-items-center justify-content-center"
                 style={{
                   height: '520px',
                   backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop")`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              <div className="p-4">
                <span className="letter-spacing-3 small text-uppercase mb-2 d-block">CUSTOM STITCHING</span>
                <h3 className="display-6 fw-light letter-spacing-4 text-uppercase mb-3">MADE TO MEASURE</h3>
                <a href="#custom" className="hero-btn d-inline-block mt-2">DISCOVER STITCHING</a>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6}>
            <div className="promo-box position-relative overflow-hidden text-center text-white d-flex align-items-center justify-content-center"
                 style={{
                   height: '520px',
                   backgroundImage: `linear-gradient(rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1200&auto=format&fit=crop")`,
                   backgroundSize: 'cover',
                   backgroundPosition: 'center'
                 }}>
              <div className="p-4">
                <span className="letter-spacing-3 small text-uppercase mb-2 d-block">SPECIAL EDITION</span>
                <h3 className="display-6 fw-light letter-spacing-4 text-uppercase mb-3">VELVET & SILK</h3>
                <a href="#special" className="hero-btn d-inline-block mt-2">SHOP SPECIAL EDITION</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default PromoBanner;