import React, { useState } from 'react';
import { Container, Row, Col, Accordion, Dropdown, Form } from 'react-bootstrap';
import { 
  FaTh, FaThLarge, FaList, FaChevronDown, 
  FaMinus, FaPlus, FaBox, FaTruck, FaArrowLeft, 
  FaHeart, FaRegHeart, FaUndo, FaLeaf, FaFileAlt
} from 'react-icons/fa';

export const initialProducts = [
  {
    id: 1,
    title: "EMBROIDERED LAWN UF-532",
    sku: "ESUF532 • LAWN • 3 PIECE",
    price: "PKR 4,462.50",
    originalPrice: "PKR 5,950.00",
    discount: "-25%",
    numericPrice: 4462.5,
    type: "Unstitched",
    fabric: "Lawn",
    size: "DEFAULT",
    pieces: "3 PIECE",
    frontImage: '/images/p1-1.webp',
    backImage: '/images/p1-2.jpg',
    images: ['/images/p1-1.webp', '/images/p1-2.jpg'],
    description: "A stunning design exquisitely crafted with intricate embroidery and rich details, perfect for your festive wardrobe."
  },
  {
    id: 2,
    title: "EMBROIDERED LAWN UF-4411",
    sku: "ESUF4411 • LAWN • 3 PIECE",
    price: "PKR 5,970.00",
    originalPrice: "PKR 7,970.00",
    discount: "-25%",
    numericPrice: 5970,
    type: "Unstitched",
    fabric: "Lawn",
    size: "DEFAULT",
    pieces: "3 PIECE",
    frontImage: '/images/p2-1.jpg',
    backImage: '/images/p2-2.jpg',
    images: ['/images/p2-1.jpg', '/images/p2-2.jpg'],
    description: "Premium quality lawn fabric featuring stunning prints and embroidered motifs."
  },
  {
    id: 3,
    title: "EMBROIDERED CHIFFON UF-4483",
    sku: "ESUF4483 • CHIFFON • 3 PIECE",
    price: "PKR 12,500.00",
    originalPrice: "PKR 15,500.00",
    discount: "-20%",
    numericPrice: 12500,
    type: "Stitched",
    fabric: "Chiffon",
    size: "DEFAULT",
    pieces: "3 PIECE",
    frontImage: '/images/p3-1.jpg',
    backImage: '/images/p3-2.jpg',
    images: ['/images/p3-1.jpg', '/images/p3-2.jpg'],
    description: "Elegant chiffon outfit designed to make your formal occasions truly special."
  },
  {
    id: 4,
    title: "PRINTED LAWN UF-4484",
    sku: "ESUF4484 • PRINTED • 3 PIECE",
    price: "PKR 6,490.00",
    originalPrice: "PKR 8,490.00",
    discount: "-25%",
    numericPrice: 6490,
    type: "Unstitched",
    fabric: "Lawn",
    size: "DEFAULT",
    pieces: "3 PIECE",
    frontImage: '/images/p4-1.jpg',
    backImage: '/images/p4-2.jpg',
    images: ['/images/p4-1.jpg', '/images/p4-2.jpg'],
    description: "Daily wear printed lawn suit offering absolute comfort and grace."
  }
];

const CollectionPage = ({ 
  categoryName = 'UNSTITCHED', 
  wishlist = [], 
  onToggleWishlist, 
  onAddToCart 
}) => {
  const [gridCols, setGridCols] = useState(6);
  const [sortBy, setSortBy] = useState('Featured');
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [selectedFabric, setSelectedFabric] = useState([]);
  const [priceRange, setPriceRange] = useState(20000);
  const [currentCategory, setCurrentCategory] = useState(categoryName);
  const [activeFilterSubtype, setActiveFilterSubtype] = useState('FORMAL');

  const [activeProduct, setActiveProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [selectedProductType, setSelectedProductType] = useState('UNSTITCHED');

  const filteredProducts = initialProducts.filter((product) => {
    if (selectedFabric.length > 0 && !selectedFabric.includes(product.fabric)) return false;
    if (product.numericPrice > priceRange) return false;
    return true;
  });

  const handleOpenProduct = (product) => {
    setActiveProduct(product);
    setSelectedImage(product.frontImage);
    setQuantity(1);
    setSelectedProductType(product.type.toUpperCase());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-white min-vh-100 position-relative">
      <style>{`
        .accordion-button:not(.collapsed), 
        .accordion-button:focus, 
        .dropdown-item.active, 
        .dropdown-item:active {
          background-color: transparent !important;
          color: #000 !important;
          box-shadow: none !important;
        }
        .dropdown-item:hover {
          background-color: #f8f9fa !important;
          color: #000 !important;
        }
      `}</style>

      {activeProduct ? (
        <div className="bg-white min-vh-100 py-4">
          <Container className="px-3 px-md-4">
            <button 
              className="btn btn-link text-dark text-uppercase text-decoration-none p-0 mb-4 d-flex align-items-center gap-2 fw-semibold shadow-none" 
              style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
              onClick={() => setActiveProduct(null)}
            >
              <FaArrowLeft size={12} /> Back to Collection
            </button>

            <Row className="g-4 mb-5">
              <Col xs={12} md={7} lg={7}>
                <Row className="g-2">
                  <Col xs={3} sm={2} className="d-flex flex-column gap-2">
                    {activeProduct.images?.map((img, idx) => (
                      <div 
                        key={idx}
                        className={`border cursor-pointer overflow-hidden ${selectedImage === img ? 'border-dark border-2' : 'border-light'}`}
                        style={{ aspectRatio: '2/3', cursor: 'pointer' }}
                        onClick={() => setSelectedImage(img)}
                      >
                        <img src={img} alt="thumb" className="w-100 h-100 object-fit-cover" />
                      </div>
                    ))}
                  </Col>

                  <Col xs={9} sm={10}>
                    <div className="position-relative bg-light overflow-hidden" style={{ aspectRatio: '2/3' }}>
                      {activeProduct.discount && (
                        <span className="position-absolute top-0 start-0 m-3 badge bg-danger rounded-0 px-2 py-1" style={{ fontSize: '0.75rem', zIndex: 2 }}>
                          {activeProduct.discount}
                        </span>
                      )}
                      <img src={selectedImage} alt={activeProduct.title} className="w-100 h-100 object-fit-cover" />
                    </div>
                  </Col>
                </Row>
              </Col>

              <Col xs={12} md={5} lg={5}>
                <div className="ps-md-3">
                  <h2 className="fw-bold text-uppercase mb-2" style={{ fontSize: '1.25rem', letterSpacing: '1px' }}>
                    {activeProduct.title}
                  </h2>
                  
                  <div className="d-flex align-items-center gap-3 mb-2">
                    <span className="text-danger fw-bold fs-5">{activeProduct.price}</span>
                    {activeProduct.originalPrice && (
                      <span className="text-muted text-decoration-line-through fs-6">{activeProduct.originalPrice}</span>
                    )}
                  </div>

                  <p className="text-muted small mb-4" style={{ fontSize: '0.75rem', letterSpacing: '0.5px' }}>
                    {activeProduct.sku}
                  </p>

                  <div className="mb-4">
                    <label className="text-uppercase fw-bold mb-2 d-block" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                      TYPE: <span className="fw-normal text-muted">{selectedProductType}</span>
                    </label>
                    <div className="d-flex gap-2">
                      {['UNSTITCHED', 'STITCHED'].map((t) => (
                        <button
                          key={t}
                          className={`btn rounded-0 px-4 py-2 text-uppercase fw-semibold shadow-none ${selectedProductType === t ? 'btn-dark' : 'btn-outline-dark'}`}
                          style={{ fontSize: '0.7rem', letterSpacing: '1px' }}
                          onClick={() => setSelectedProductType(t)}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="d-flex align-items-stretch gap-3 mb-4">
                    <div className="border d-flex align-items-center justify-content-between px-3" style={{ width: '120px', height: '48px' }}>
                      <button className="btn btn-link p-0 text-dark text-decoration-none shadow-none" onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                        <FaMinus size={10} />
                      </button>
                      <span className="fw-bold" style={{ fontSize: '0.9rem' }}>{quantity}</span>
                      <button className="btn btn-link p-0 text-dark text-decoration-none shadow-none" onClick={() => setQuantity(quantity + 1)}>
                        <FaPlus size={10} />
                      </button>
                    </div>

                    <button 
                      className="btn flex-grow-1 rounded-0 text-uppercase fw-bold text-white py-3 border-0 shadow-none"
                      style={{ backgroundColor: '#1b4d3e', letterSpacing: '1.5px', fontSize: '0.75rem' }}
                      onClick={() => onAddToCart(activeProduct, quantity, selectedProductType)}
                    >
                      ADD TO CART
                    </button>
                  </div>

                  <Accordion defaultActiveKey={['0']} flush className="border-top">
                    <Accordion.Item eventKey="0" className="border-bottom py-1">
                      <Accordion.Header className="text-uppercase fw-semibold shadow-none" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-2"><FaBox className="text-secondary" /> PRODUCT DETAILS</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted small py-2" style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                        {activeProduct.description}<br/>• Premium stitched/unstitched fabric with meticulous detailing.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="1" className="border-bottom py-1">
                      <Accordion.Header className="text-uppercase fw-semibold shadow-none" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-2"><FaTruck className="text-secondary" /> DELIVERY</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted small py-2" style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                        • Standard delivery across Pakistan within 3-5 working days.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="2" className="border-bottom py-1">
                      <Accordion.Header className="text-uppercase fw-semibold shadow-none" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-2"><FaFileAlt className="text-secondary" /> DESCRIPTION</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted small py-2" style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                        • High-grade fabric with exquisite embroidery and durable finish.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="3" className="border-bottom py-1">
                      <Accordion.Header className="text-uppercase fw-semibold shadow-none" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-2"><FaUndo className="text-secondary" /> RETURNS AND EXCHANGE</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted small py-2" style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                        • Easy 7-day returns and exchanges applicable on unused items.
                      </Accordion.Body>
                    </Accordion.Item>
                    <Accordion.Item eventKey="4" className="border-bottom py-1">
                      <Accordion.Header className="text-uppercase fw-semibold shadow-none" style={{ fontSize: '0.75rem' }}>
                        <span className="d-flex align-items-center gap-2"><FaLeaf className="text-secondary" /> CARE INSTRUCTIONS</span>
                      </Accordion.Header>
                      <Accordion.Body className="text-muted small py-2" style={{ fontSize: '0.75rem', lineHeight: '1.6' }}>
                        • Dry clean recommended. Do not bleach. Iron at moderate temperature.
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      ) : (
        <>
          <div className="text-center py-4 mb-2">
            <h1 className="fw-bold text-uppercase mb-3" style={{ fontSize: '1.8rem', letterSpacing: '3px', color: '#111' }}>
              {currentCategory}
            </h1>
            <div className="d-flex justify-content-center align-items-center gap-4 text-uppercase" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
              {['FORMAL', 'SUMMER', 'WINTER'].map((sub) => (
                <span 
                  key={sub}
                  className={`cursor-pointer pb-1 ${activeFilterSubtype === sub ? 'fw-bold border-bottom border-dark text-dark' : 'text-muted'}`}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    setActiveFilterSubtype(sub);
                    setCurrentCategory(sub);
                  }}
                >
                  {sub}
                </span>
              ))}
            </div>
          </div>

          <div className="border-top border-bottom py-2 px-3 px-md-4 mb-3 bg-white sticky-top z-2" style={{ top: '65px' }}>
            <div className="d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center gap-3 border-end pe-3">
                <div className={`cursor-pointer ${gridCols === 6 ? 'text-dark fw-bold' : 'text-muted'}`} onClick={() => setGridCols(6)} style={{ cursor: 'pointer' }}>
                  <FaThLarge size={16} />
                </div>
                <div className={`cursor-pointer ${gridCols === 4 ? 'text-dark fw-bold' : 'text-muted'}`} onClick={() => setGridCols(4)} style={{ cursor: 'pointer' }}>
                  <FaTh size={16} />
                </div>
                <div className={`cursor-pointer ${gridCols === 12 ? 'text-dark fw-bold' : 'text-muted'}`} onClick={() => setGridCols(12)} style={{ cursor: 'pointer' }}>
                  <FaList size={16} />
                </div>
              </div>
              <div className="fw-bold text-uppercase text-dark" style={{ letterSpacing: '1.5px', fontSize: '0.75rem' }}>
                {filteredProducts.length} PRODUCTS
              </div>
              <div className="border-start ps-3">
                <Dropdown align="end">
                  <Dropdown.Toggle variant="white" id="dropdown-sort" className="border-0 bg-transparent text-uppercase fw-semibold p-0 shadow-none d-flex align-items-center gap-2" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
                    SORT BY : <span className="text-muted fw-normal">{sortBy}</span>
                    <FaChevronDown size={9} className="text-muted" />
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="rounded-0 border shadow-sm mt-2 py-1" style={{ minWidth: '180px' }}>
                    {['Featured', 'Most relevant', 'Best selling', 'Price, low to high', 'Price, high to low'].map((item) => (
                      <Dropdown.Item key={item} onClick={() => setSortBy(item)} className={`py-1 px-3 text-capitalize small shadow-none ${sortBy === item ? 'fw-bold text-dark' : 'text-secondary'}`} style={{ fontSize: '0.75rem' }}>
                        {item}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>

          <Container fluid className="px-2 px-md-3">
            <Row className="g-3">
              <Col xs={12} md={2} className="border-end pe-md-2">
                <div className="sticky-top" style={{ top: '125px', zIndex: 1 }}>
                  <Accordion defaultActiveKey={['0', '1', '2', '3']} alwaysOpen flush>
                    <Accordion.Item eventKey="0" className="border-bottom py-0">
                      <Accordion.Header className="text-uppercase fw-bold py-2 shadow-none" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>AVAILABILITY</Accordion.Header>
                      <Accordion.Body className="px-0 py-1">
                        <Form.Check type="checkbox" id="in-stock" label="In stock" className="small text-uppercase mb-1 text-muted shadow-none" style={{ fontSize: '0.68rem' }} defaultChecked />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="1" className="border-bottom py-0">
                      <Accordion.Header className="text-uppercase fw-bold py-2 shadow-none" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>PRICE</Accordion.Header>
                      <Accordion.Body className="px-0 py-1">
                        <Form.Label className="small text-muted d-flex justify-content-between m-0 mb-1" style={{ fontSize: '0.65rem' }}>
                          <span>Max:</span><strong className="text-dark">PKR {priceRange}</strong>
                        </Form.Label>
                        <Form.Range min={3000} max={20000} step={500} value={priceRange} onChange={(e) => setPriceRange(Number(e.target.value))} />
                      </Accordion.Body>
                    </Accordion.Item>

                    <Accordion.Item eventKey="2" className="border-bottom py-0">
                      <Accordion.Header className="text-uppercase fw-bold py-2 shadow-none" style={{ fontSize: '0.68rem', letterSpacing: '1px' }}>FABRIC</Accordion.Header>
                      <Accordion.Body className="px-0 py-1">
                        {['Lawn', 'Jacquard', 'Chiffon', 'Silk'].map((fab) => (
                          <Form.Check key={fab} type="checkbox" id={`fab-${fab}`} label={fab} className="small text-uppercase mb-1 text-muted shadow-none" style={{ fontSize: '0.68rem' }}
                            onChange={(e) => { e.target.checked ? setSelectedFabric([...selectedFabric, fab]) : setSelectedFabric(selectedFabric.filter(f => f !== fab)); }} />
                        ))}
                      </Accordion.Body>
                    </Accordion.Item>
                  </Accordion>
                </div>
              </Col>

              <Col xs={12} md={10}>
                <Row className="g-2">
                  {filteredProducts.map((product) => {
                    const isWishlisted = wishlist.some(item => item.id === product.id);
                    return (
                      <Col xs={12} sm={6} md={gridCols} key={product.id}>
                        <div 
                          className="card border-0 rounded-0 h-100 product-card bg-transparent position-relative"
                          onMouseEnter={() => setHoveredProduct(product.id)}
                          onMouseLeave={() => setHoveredProduct(null)}
                        >
                          <div 
                            className="position-relative overflow-hidden bg-light" 
                            style={{ width: '100%', aspectRatio: '2/3', cursor: 'pointer' }}
                            onClick={() => handleOpenProduct(product)}
                          >
                            {product.discount && (
                              <span className="position-absolute top-0 end-0 m-2 badge bg-danger rounded-0 px-2 py-1" style={{ fontSize: '0.7rem', zIndex: 2 }}>
                                {product.discount}
                              </span>
                            )}

                            <button
                              className="position-absolute top-0 start-0 m-2 btn btn-light rounded-circle p-2 shadow-sm d-flex align-items-center justify-content-center border-0"
                              style={{ zIndex: 3, width: '32px', height: '32px', backgroundColor: 'rgba(255,255,255,0.8)' }}
                              onClick={(e) => {
                                e.stopPropagation();
                                onToggleWishlist(product);
                              }}
                            >
                              {isWishlisted ? <FaHeart size={14} className="text-danger" /> : <FaRegHeart size={14} className="text-dark" />}
                            </button>

                            <img 
                              src={hoveredProduct === product.id ? product.backImage : product.frontImage} 
                              alt={product.title} 
                              className="w-100 h-100 d-block object-fit-cover"
                              style={{ transition: 'all 0.4s ease-in-out' }}
                            />

                            <div className="position-absolute bottom-0 start-0 w-100 p-2 text-center bg-dark bg-opacity-90" onClick={(e) => e.stopPropagation()}>
                              <button 
                                className="btn btn-dark w-100 rounded-0 text-uppercase fw-bold py-2 border-0 shadow-none" 
                                style={{ fontSize: '0.68rem', letterSpacing: '1px', backgroundColor: '#000' }} 
                                onClick={() => handleOpenProduct(product)}
                              >
                                QUICK VIEW
                              </button>
                            </div>
                          </div>

                          <div className="text-center pt-2 pb-2">
                            <h6 
                              className="fw-semibold text-uppercase m-0 mb-1 text-truncate" 
                              style={{ fontSize: '0.75rem', letterSpacing: '0.8px', cursor: 'pointer' }}
                              onClick={() => handleOpenProduct(product)}
                            >
                              {product.title}
                            </h6>
                            <div className="d-flex justify-content-center align-items-center gap-2">
                              <span className="fw-bold text-dark" style={{ fontSize: '0.8rem' }}>{product.price}</span>
                              {product.originalPrice && (
                                <span className="text-muted text-decoration-line-through small" style={{ fontSize: '0.70rem' }}>{product.originalPrice}</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    );
                  })}
                </Row>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  );
};

export default CollectionPage;