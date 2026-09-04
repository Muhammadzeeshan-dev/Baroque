import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Spinner } from 'react-bootstrap';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.REACT_APP_API_URL || 'http://localhost:5001/api'}/products`
        );
        if (!res.ok) throw new Error('Failed to fetch');
        const data = await res.json();
        // Show all visible products (no category filter)
        const visible = data.filter(p => p.isVisible !== false);
        setProducts(visible);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-5">
        <Spinner animation="border" variant="dark" />
        <p className="mt-2">Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <div className="text-center py-5 text-danger">Error: {error}</div>;
  }

  if (products.length === 0) {
    return <div className="text-center py-5">No products available.</div>;
  }

  // Take first 8 for "Trending Now"
  const trending = products.slice(0, 8);

  return (
    <section className="py-5 bg-light">
      <Container fluid className="px-md-5">
        <div className="d-flex justify-content-between align-items-end mb-4 px-2">
          <div>
            <p className="text-uppercase text-muted small letter-spacing-3 mb-1">NEW ARRIVALS</p>
            <h2 className="fw-light letter-spacing-3 text-uppercase h3 mb-0">TRENDING NOW</h2>
          </div>
          <a href="#all-products" className="text-dark small text-decoration-none letter-spacing-2 border-bottom border-dark pb-1">
            VIEW ALL
          </a>
        </div>

        <Row className="g-4">
          {trending.map((product) => (
            <Col key={product._id} xs={6} md={3}>
              <div className="product-card h-100 bg-white p-2 border-0">
                <div className="product-img-wrapper position-relative overflow-hidden">
                  {product.discount > 0 && (
                    <span className="badge bg-danger text-white position-absolute top-0 start-0 m-2 rounded-0 fs-11 letter-spacing-1">
                      {product.discount}% OFF
                    </span>
                  )}
                  <img
                    src={product.image}
                    alt={product.name}
                    className="product-main-img img-fluid w-100"
                    style={{ height: '300px', objectFit: 'cover' }}
                  />
                  <button className="quick-add-btn w-100 py-2 border-0 bg-dark text-white small letter-spacing-2">
                    ADD TO CART
                  </button>
                </div>
                <div className="product-info pt-3 text-center">
                  <span className="text-muted extra-small letter-spacing-2 text-uppercase d-block mb-1">
                    {product.category || 'General'}
                  </span>
                  <h4 className="product-title fs-6 fw-normal letter-spacing-1 text-dark mb-1">
                    {product.name}
                  </h4>
                  <p className="product-price fw-semibold text-dark small mb-0">
                    PKR {product.price.toLocaleString()}
                    {product.discount > 0 && (
                      <span className="text-muted text-decoration-line-through ms-2">
                        PKR {(product.price / (1 - product.discount / 100)).toLocaleString()}
                      </span>
                    )}
                  </p>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default FeaturedProducts;