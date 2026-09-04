import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Essentials = ({ onNavigateToCollection }) => {
  return (
    <Container fluid className="px-1 px-md-3 my-4">
      <div className="text-center mb-3">
        <h2 className="fw-bold text-uppercase" style={{ letterSpacing: '3px', fontSize: '1.5rem' }}>
          DUPATTAS & ENSEMBLES
        </h2>
        <p className="text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>
          COMPLETE YOUR LOOK WITH OUR EXCLUSIVE ACCESSORIES
        </p>
      </div>

      <Row className="g-2">
        {/* Dupattas Section */}
        <Col xs={12} md={6}>
          <div 
            className="position-relative overflow-hidden cursor-pointer bg-light"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigateToCollection('DUPATTAS')}
          >
            <img 
              src={(process.env.PUBLIC_URL || '') + '/images/p5-1.jpg'} 
              alt="Dupattas" 
              className="w-100 d-block"
              style={{ objectFit: 'contain', maxHeight: '650px', width: '100%' }}
              onError={(e) => { e.target.src = (process.env.PUBLIC_URL || '') + '/images/p1-1.webp'; }}
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white bg-dark bg-opacity-75">
              <h5 className="fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>SPECIAL DUPATTAS</h5>
              <Button variant="light" size="sm" className="rounded-0 text-dark fw-bold text-uppercase px-3 py-1" style={{ fontSize: '0.7rem' }}>
                EXPLORE DUPATTAS
              </Button>
            </div>
          </div>
        </Col>

        {/* Ensembles Section */}
        <Col xs={12} md={6}>
          <div 
            className="position-relative overflow-hidden cursor-pointer bg-light"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigateToCollection('ENSEMBLES')}
          >
            <img 
              src={(process.env.PUBLIC_URL || '') + '/images/p6-1.jpg'} 
              alt="Ensembles" 
              className="w-100 d-block"
              style={{ objectFit: 'contain', maxHeight: '650px', width: '100%' }}
              onError={(e) => { e.target.src = (process.env.PUBLIC_URL || '') + '/images/p2-1.jpg'; }}
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white bg-dark bg-opacity-75">
              <h5 className="fw-bold text-uppercase mb-2" style={{ letterSpacing: '2px' }}>BOTTOMS & ENSEMBLES</h5>
              <Button variant="light" size="sm" className="rounded-0 text-dark fw-bold text-uppercase px-3 py-1" style={{ fontSize: '0.7rem' }}>
                EXPLORE ENSEMBLES
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Essentials;