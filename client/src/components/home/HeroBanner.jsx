import React from 'react';
import { Button } from 'react-bootstrap';

const HeroBanner = ({ onNavigateToCollection }) => {
  return (
    <div className="position-relative w-100 overflow-hidden" style={{ height: '85vh', backgroundColor: '#f8f9fa' }}>
      {/* Background Big Banner Image */}
      <img 
        src={(process.env.PUBLIC_URL || '') + '/images/big-img1.webp'} 
        alt="Hero Collection Banner" 
        className="w-100 h-100"
        style={{ objectFit: 'cover' }}
        onError={(e) => {
          e.target.src = (process.env.PUBLIC_URL || '') + '/images/big-img2.webp';
        }}
      />

      {/* Overlay Action Content */}
      <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-center text-white z-2 w-100 px-3">
        <h1 className="fw-bold text-uppercase mb-3 tracking-widest display-5 text-shadow" style={{ letterSpacing: '4px' }}>
          EID LAWN '26
        </h1>
        <p className="text-uppercase mb-4 fw-medium" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>
          UNSTITCHED LUXURY EMBROIDERED COLLECTION
        </p>

        {/* Buttons - All Connected to Second Page */}
        <div className="d-flex justify-content-center gap-3 flex-wrap">
          <Button 
            variant="light" 
            size="lg" 
            className="rounded-0 text-dark fw-bold text-uppercase px-4 py-2 border-0 shadow"
            style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
            onClick={() => onNavigateToCollection('EID LAWN')}
          >
            GO LIVE
          </Button>

          <Button 
            variant="outline-light" 
            size="lg" 
            className="rounded-0 text-white fw-bold text-uppercase px-4 py-2 shadow"
            style={{ fontSize: '0.8rem', letterSpacing: '2px', borderWidth: '2px' }}
            onClick={() => onNavigateToCollection('SHOP NOW')}
          >
            SHOP NOW
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;