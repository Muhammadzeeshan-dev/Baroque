import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';
import ProductList from './ProductList';
import CategoryGrid from './CategoryGrid';

const HomePage = ({ onNavigateToCollection }) => {
  const [testProducts, setTestProducts] = useState([]);
  const [testLoading, setTestLoading] = useState(true);
  const [testError, setTestError] = useState(null);

  useEffect(() => {
    const testFetch = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/products`);
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        console.log('✅ Products fetched:', data);
        setTestProducts(data);
      } catch (err) {
        console.error('❌ Error:', err);
        setTestError(err.message);
      } finally {
        setTestLoading(false);
      }
    };
    testFetch();
  }, []);

  return (
    <div className="home-page text-center">
      {/* 🔥 DEBUG BOX – remove after testing */}
      <div className="bg-light p-3 mb-3 border">
        <h5>🔍 Debug: Products from API</h5>
        {testLoading && <Spinner animation="border" size="sm" />}
        {testError && <div className="text-danger">Error: {testError}</div>}
        {!testLoading && !testError && (
          <div>
            <span className="badge bg-success">{testProducts.length} products found</span>
            <pre className="text-start small mt-2" style={{ maxHeight: '200px', overflow: 'auto' }}>
              {JSON.stringify(testProducts.slice(0, 2), null, 2)}
            </pre>
          </div>
        )}
      </div>

      {/* 1. Top Announcement Bar */}
      <div className="text-white py-1 px-3 d-flex justify-content-between align-items-center fw-semibold" style={{ backgroundColor: '#134e35', fontSize: '0.72rem' }}>
        <span>FOR INTERNATIONAL WEBSITE VISIT WWW.BAROQUE.PK</span>
        <span>CALL US AT: UAN 111-387-387</span>
        <span>SALE UPTO 50% OFF IS LIVE NOW</span>
      </div>

      {/* 2. Hero Banner */}
      <div className="hero-banner position-relative text-white d-flex flex-column align-items-center justify-content-center mb-5" style={{
        minHeight: '480px',
        backgroundImage: `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${(process.env.PUBLIC_URL || "") + "/images/big-img1.webp"})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}>
        <p className="text-uppercase mb-1" style={{ letterSpacing: '3px', fontSize: '0.85rem' }}>SEASON END</p>
        <h1 className="fw-bold display-3 text-uppercase mb-3">SALE <span className="fw-light fs-2">UP TO</span> 50<small className="fs-4">% OFF</small></h1>
        <Button variant="outline-light" className="rounded-0 text-uppercase px-4 py-2 mt-2" onClick={onNavigateToCollection}>LIVE NOW</Button>
      </div>

      {/* 3. Featured / Trending Products */}
      <ProductList title="TRENDING NOW" subtitle="NEW ARRIVALS" limit={8} />

      {/* 4. EID LAWN */}
      <ProductList category="UNSTITCHED" title="EID LAWN '26" subtitle="UNSTITCHED & STITCHED ESSENTIALS" limit={4} />

      {/* 5. CHANTELLE */}
      <ProductList category="CHANTELLE" title="CHANTELLE COLLECTION" subtitle="LUXURY CHIFFON & EMBROIDERED FORMALS" limit={4} />

      {/* 6. Ready To Wear Banner */}
      <Container fluid className="px-3 px-md-5 my-4">
        <div className="position-relative overflow-hidden" style={{ height: '400px' }}>
          <img src={(process.env.PUBLIC_URL || "") + "/images/big-img2.webp"} alt="Ready To Wear" className="w-100 h-100" style={{ objectFit: 'cover' }} />
          <div className="position-absolute bottom-0 start-50 translate-middle-x pb-4 text-center text-white w-100 px-3 bg-dark bg-opacity-50">
            <h2 className="fw-bold text-uppercase mb-1">READY TO WEAR</h2>
            <Button variant="light" className="rounded-0 text-dark fw-bold text-uppercase px-4 py-2">EXPLORE READY TO WEAR</Button>
          </div>
        </div>
      </Container>

      {/* 7. Essentials */}
      <ProductList category="ESSENTIALS" title="DUPATTAS & ENSEMBLES" subtitle="COMPLETE YOUR LOOK" limit={4} />

      {/* 8. Category Grid */}
      <CategoryGrid />
    </div>
  );
};

export default HomePage;