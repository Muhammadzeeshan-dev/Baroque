import React from 'react';
import { Button } from 'react-bootstrap';

const ReadyToWear = ({ 
  onNavigateToCollection, 
  onProductClick,
  products = [] // 👈 Products passed from App.js
}) => {
  return (
    <div
      className="position-relative w-100 overflow-hidden my-4 cursor-pointer bg-light p-0 m-0"
      style={{ cursor: 'pointer' }}
      onClick={() => onNavigateToCollection('READY TO WEAR')}
    >
      <img
        src={(process.env.PUBLIC_URL || '') + '/images/big-img2.webp'}
        alt="Ready To Wear"
        className="w-100 d-block"
        style={{ objectFit: 'cover', maxHeight: '85vh', width: '100%' }}
      />

      <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4 text-center text-white w-100 px-3 bg-dark bg-opacity-50">
        <h2 className="fw-bold text-uppercase mb-1 display-6" style={{ letterSpacing: '3px' }}>
          READY TO WEAR
        </h2>
        <p className="text-uppercase mb-3 fw-medium" style={{ letterSpacing: '1px', fontSize: '0.8rem' }}>
          {products.length} PRODUCTS AVAILABLE
        </p>
        <Button
          variant="light"
          size="sm"
          className="rounded-0 text-dark fw-bold text-uppercase px-4 py-2 border-0 shadow"
          style={{ fontSize: '0.75rem', letterSpacing: '2px' }}
          onClick={() => onNavigateToCollection('READY TO WEAR')}
        >
          EXPLORE READY TO WEAR
        </Button>
      </div>
    </div>
  );
};

export default ReadyToWear;