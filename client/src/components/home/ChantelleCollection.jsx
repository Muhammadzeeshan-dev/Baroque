import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const ChantelleCollection = ({ 
  onNavigateToCollection, 
  onProductClick,
  products = [] // 👈 Products passed from App.js
}) => {
  return (
    <Container fluid className="px-1 px-md-3 my-4">
      <div className="text-center mb-3">
        <h2 className="fw-bold text-uppercase" style={{ letterSpacing: '3px', fontSize: '1.5rem' }}>
          CHANTELLE COLLECTION
        </h2>
        <p className="text-muted small text-uppercase" style={{ letterSpacing: '1px' }}>
          LUXURY CHIFFON & EMBROIDERED FORMALS
        </p>
      </div>

      {products.length > 0 && (
        <Row className="g-3 mb-4">
          {products.slice(0, 4).map((product) => (
            <Col key={product.id} xs={6} md={3}>
              <div 
                className="product-card h-100 bg-white p-2 border-0 cursor-pointer"
                onClick={() => onProductClick && onProductClick(product)}
              >
                <div className="product-img-wrapper position-relative overflow-hidden">
                  <img
                    src={product.frontImage || product.image}
                    alt={product.title || product.name}
                    className="img-fluid w-100"
                    style={{ height: '250px', objectFit: 'cover' }}
                  />
                  {product.discount && (
                    <span className="badge bg-danger text-white position-absolute top-0 start-0 m-2 rounded-0">
                      {product.discount}
                    </span>
                  )}
                </div>
                <div className="product-info pt-2 text-center">
                  <h5 className="fs-6 fw-normal">{product.title || product.name}</h5>
                  <p className="fw-semibold small">{product.price}</p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      )}

      <Row className="g-2">
        <Col xs={12} md={6}>
          <div
            className="position-relative overflow-hidden cursor-pointer bg-light"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigateToCollection('CHANTELLE CHIFFON')}
          >
            <img
              src={(process.env.PUBLIC_URL || '') + '/images/card-img3.jpg'}
              alt="Chantelle Chiffon"
              className="w-100 d-block"
              style={{ objectFit: 'contain', maxHeight: '650px', width: '100%' }}
              onError={(e) => { e.target.src = (process.env.PUBLIC_URL || '') + '/images/p3-1.jpg'; }}
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white bg-dark bg-opacity-75">
              <h5 className="fw-bold text-uppercase mb-2">CHANTELLE CHIFFON</h5>
              <Button variant="outline-light" size="sm" className="rounded-0 text-uppercase px-3 py-1">
                SHOP NOW
              </Button>
            </div>
          </div>
        </Col>
        <Col xs={12} md={6}>
          <div
            className="position-relative overflow-hidden cursor-pointer bg-light"
            style={{ cursor: 'pointer' }}
            onClick={() => onNavigateToCollection('CHANTELLE LAWN')}
          >
            <img
              src={(process.env.PUBLIC_URL || '') + '/images/card-img4.jpg'}
              alt="Chantelle Lawn"
              className="w-100 d-block"
              style={{ objectFit: 'contain', maxHeight: '650px', width: '100%' }}
              onError={(e) => { e.target.src = (process.env.PUBLIC_URL || '') + '/images/p4-1.jpg'; }}
            />
            <div className="position-absolute bottom-0 start-0 w-100 p-3 text-center text-white bg-dark bg-opacity-75">
              <h5 className="fw-bold text-uppercase mb-2">CHANTELLE LAWN</h5>
              <Button variant="outline-light" size="sm" className="rounded-0 text-uppercase px-3 py-1">
                SHOP NOW
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChantelleCollection;