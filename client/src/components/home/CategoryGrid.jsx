import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const categories = [
  {
    title: "EID LAWN '26",
    subtitle: "UNSTITCHED COLLECTION",
    image: "https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800&auto=format&fit=crop",
    link: "#eid-lawn"
  },
  {
    title: "UNSTITCHED",
    subtitle: "EMBROIDERED LUXURY",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop",
    link: "#unstitched"
  },
  {
    title: "READY TO WEAR",
    subtitle: "PRET COLLECTION",
    image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800&auto=format&fit=crop",
    link: "#ready-to-wear"
  },
  {
    title: "CHANTELLE",
    subtitle: "EXCLUSIVE CHIFFON",
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=800&auto=format&fit=crop",
    link: "#chantelle"
  }
];

const CategoryGrid = () => {
  return (
    <section className="py-5 bg-white">
      <Container fluid className="px-md-5">
        <div className="text-center mb-5">
          <p className="text-uppercase text-muted small letter-spacing-3 mb-1">DISCOVER</p>
          <h2 className="fw-light letter-spacing-4 text-uppercase">SHOP BY CATEGORY</h2>
        </div>

        <Row className="g-4">
          {categories.map((cat, idx) => (
            <Col key={idx} xs={12} sm={6} lg={3}>
              <a href={cat.link} className="category-card-wrapper d-block text-decoration-none">
                <div className="category-img-box position-relative overflow-hidden">
                  <img 
                    src={cat.image} 
                    alt={cat.title} 
                    className="img-fluid w-100 category-img" 
                  />
                  <div className="category-overlay d-flex flex-column justify-content-end p-4">
                    <span className="small text-white-50 letter-spacing-2 text-uppercase mb-1">{cat.subtitle}</span>
                    <h3 className="h5 text-white letter-spacing-3 fw-normal mb-3">{cat.title}</h3>
                    <span className="shop-btn-underline text-white small letter-spacing-2">SHOP NOW</span>
                  </div>
                </div>
              </a>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default CategoryGrid;