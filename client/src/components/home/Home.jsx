import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = ({ onCategoryClick }) => {
  // کیٹیگریز کی لسٹ
  const categories = [
    { id: 1, title: "UNSTITCHED", image: "https://via.placeholder.com/600x800/f0f0f0/333333?text=UNSTITCHED" },
    { id: 2, title: "READY TO WEAR", image: "https://via.placeholder.com/600x800/e5e5e5/333333?text=READY+TO+WEAR" },
    { id: 3, title: "CHANTELLE", image: "https://via.placeholder.com/600x800/d5d5d5/333333?text=CHANTELLE" },
    { id: 4, title: "SHAWLS", image: "https://via.placeholder.com/600x800/cccccc/333333?text=SHAWLS" }
  ];

  return (
    <div className="home-page">
      
      {/* 1. HERO MAIN BANNER (Clickable) */}
      <div 
        className="hero-banner position-relative overflow-hidden cursor-pointer mb-5"
        style={{ height: '80vh', backgroundColor: '#f8f9fa', cursor: 'pointer' }}
        onClick={onCategoryClick}
      >
        <img 
          src="https://via.placeholder.com/1920x1080/e0e0e0/333333?text=BAROQUE+SUMMER+COLLECTION" 
          alt="Main Banner" 
          className="w-100 h-100"
          style={{ objectFit: 'cover' }}
        />
        <div className="position-absolute bottom-0 start-50 translate-middle-x mb-5 text-center text-white">
          <h1 className="fw-bold tracking-widest text-uppercase mb-3" style={{ letterSpacing: '4px' }}>
            UNSTITCHED '26
          </h1>
          <button 
            className="btn btn-light rounded-0 text-uppercase fw-semibold px-4 py-2"
            style={{ fontSize: '0.8rem', letterSpacing: '2px' }}
            onClick={(e) => {
              e.stopPropagation();
              onCategoryClick();
            }}
          >
            SHOP NOW
          </button>
        </div>
      </div>

      {/* 2. CATEGORIES GRID (All Images & Buttons Clickable) */}
      <Container fluid className="px-4 mb-5">
        <div className="text-center mb-4">
          <h4 className="fw-bold tracking-widest text-uppercase" style={{ letterSpacing: '2px' }}>
            EXPLORE CATEGORIES
          </h4>
        </div>

        <Row className="g-4">
          {categories.map((cat) => (
            <Col key={cat.id} xs={12} sm={6} lg={3}>
              <div 
                className="category-card text-center position-relative overflow-hidden group"
                style={{ cursor: 'pointer' }}
                onClick={onCategoryClick} // تصویر یا کارڈ پر کلک کرنے سے سیکنڈ پیج کھلے گا
              >
                <div className="overflow-hidden mb-3">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="img-fluid w-100 category-img"
                    style={{ height: '450px', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                  />
                </div>
                <h6 className="fw-bold text-uppercase tracking-wider mb-2" style={{ fontSize: '0.85rem', letterSpacing: '1.5px' }}>
                  {cat.title}
                </h6>
                <button 
                  className="btn btn-link text-dark text-decoration-underline p-0 text-uppercase fw-semibold"
                  style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    onCategoryClick();
                  }}
                >
                  SHOP NOW
                </button>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

    </div>
  );
};

export default Home;