import React, { useState, useContext } from 'react';
import { Offcanvas, Accordion, Modal, Row, Col } from 'react-bootstrap';
import { 
  FaBars, FaTimes, FaSearch, FaUser, FaHeart, FaShoppingBag, 
  FaChevronDown, FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaPinterestP, FaRegHeart 
} from 'react-icons/fa';
import { CurrencyContext } from '../../context/CurrencyContext';

const Navbar = ({ 
  setCurrentPage, 
  onNavigateCategory, 
  cart = [], 
  wishlist = [], 
  onOpenCart, 
  onOpenWishlist,
  allProducts = [], 
  onProductClick,
  onToggleWishlist,
  onAddToCart
}) => {
  const [showMenu, setShowMenu] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCountryModal, setShowCountryModal] = useState(false);

  const { currency, setCurrency, convertPrice } = useContext(CurrencyContext);

  const handleNav = (cat) => {
    onNavigateCategory(cat);
    setShowMenu(false);
  };

  const suggestions = searchQuery.trim() === '' ? [] : allProducts
    .filter(item => item.title?.toLowerCase().includes(searchQuery.toLowerCase()))
    .map(item => item.title)
    .slice(0, 5);

  const filteredProducts = searchQuery.trim() === '' ? [] : allProducts.filter(item => 
    item.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.fabric?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="sticky-top z-3 bg-white shadow-sm">
      <div className="bg-dark text-white py-1 overflow-hidden position-relative">
        <div className="d-inline-block text-nowrap animate-marquee" style={{ fontSize: '0.72rem', letterSpacing: '2px' }}>
          <span className="mx-4">FOR INTERNATIONAL ORDERS VISIT WWW.BAROQUE.PK</span>
          <span className="mx-4">CALL US AT: UAN 111-387-387</span>
          <span className="mx-4">FREE SHIPPING NATIONWIDE ON ORDERS ABOVE PKR 3000</span>
          <span className="mx-4">SPECIAL EID COLLECTION LIVE NOW</span>
        </div>
      </div>

      <div className="d-flex align-items-center justify-content-between px-3 px-md-4 py-3 border-bottom bg-white position-relative">
        <div className="p-1" onClick={() => setShowMenu(true)} style={{ cursor: 'pointer' }}>
          <FaBars size={22} className="text-dark" />
        </div>

        <div 
          onClick={() => setCurrentPage('home')} 
          className="position-absolute start-50 translate-middle-x text-center" 
          style={{ cursor: 'pointer' }}
        >
          <img 
            src="/images/logo.png" 
            alt="Logo" 
            style={{ height: '35px', objectFit: 'contain' }} 
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>

        <div className="d-flex align-items-center gap-3">
          <div 
            className="d-none d-md-flex align-items-center gap-1 fw-semibold text-uppercase" 
            style={{ fontSize: '0.75rem', cursor: 'pointer', letterSpacing: '1px' }}
            onClick={() => setShowCountryModal(true)}
          >
            <span>{currency.flag} {currency.name} ({currency.code})</span>
            <FaChevronDown size={10} />
          </div>

          <div style={{ cursor: 'pointer' }} onClick={() => alert("Click on HeartIcon To Create Baroque Account")}>
            <FaUser size={18} />
          </div>

          <div style={{ cursor: 'pointer' }} onClick={() => setShowSearch(!showSearch)}>
            <FaSearch size={18} />
          </div>

          <div className="position-relative" style={{ cursor: 'pointer' }} onClick={onOpenWishlist}>
            <FaHeart size={18} />
            {wishlist.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-danger" style={{ fontSize: '0.55rem' }}>
                {wishlist.length}
              </span>
            )}
          </div>

          <div className="position-relative" style={{ cursor: 'pointer' }} onClick={onOpenCart}>
            <FaShoppingBag size={18} />
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-circle bg-dark" style={{ fontSize: '0.55rem' }}>
                {cart.reduce((total, item) => total + (item.quantity || 1), 0)}
              </span>
            )}
          </div>
        </div>
      </div>

      {showSearch && (
        <div className="w-100 bg-white border-bottom p-4 position-absolute top-100 start-0 shadow-lg z-3">
          <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-4">
            <div className="d-flex align-items-center gap-3 flex-grow-1 me-3">
              <FaSearch size={20} className="text-dark" />
              <input 
                type="text" 
                className="form-control border-0 rounded-0 shadow-none p-0 fs-5 text-uppercase fw-semibold" 
                placeholder="SEARCH..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus 
                style={{ letterSpacing: '1px' }}
              />
            </div>
            <FaTimes size={22} style={{ cursor: 'pointer' }} onClick={() => { setShowSearch(false); setSearchQuery(''); }} />
          </div>

          {searchQuery.trim() !== '' && (
            <Row>
              <Col md={3} className="border-end pe-4 mb-3 mb-md-0">
                <h6 className="text-uppercase fw-bold text-muted mb-3" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                  SUGGESTIONS
                </h6>
                {suggestions.length === 0 ? (
                  <p className="text-muted small text-uppercase mb-0">No suggestions</p>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {suggestions.map((sugTitle, index) => (
                      <li 
                        key={index} 
                        className="py-2 text-uppercase small text-dark fw-semibold border-bottom"
                        style={{ cursor: 'pointer', fontSize: '0.75rem' }}
                        onClick={() => setSearchQuery(sugTitle)}
                      >
                        {sugTitle}
                      </li>
                    ))}
                  </ul>
                )}
              </Col>

              <Col md={9} className="ps-md-4">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h6 className="text-uppercase fw-bold text-muted m-0" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>
                    PRODUCTS ({filteredProducts.length})
                  </h6>
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="text-center py-4">
                    <p className="text-muted small text-uppercase mb-0">No products found matching "{searchQuery}"</p>
                  </div>
                ) : (
                  <Row>
                    {filteredProducts.slice(0, 4).map((product) => {
                      const isWishlisted = wishlist.some((item) => item.id === product.id);

                      return (
                        <Col xs={6} md={3} key={product.id} className="mb-3">
                          <div className="border bg-white p-2 h-100 d-flex flex-column position-relative">
                            {product.discount && (
                              <span className="position-absolute top-0 start-0 m-2 badge bg-danger rounded-0" style={{ fontSize: '0.5rem', zIndex: 2 }}>
                                {product.discount}
                              </span>
                            )}

                            <div 
                              className="position-relative overflow-hidden bg-light mb-2" 
                              style={{ cursor: 'pointer', aspectRatio: '3/4' }}
                              onClick={() => {
                                onProductClick(product);
                                setShowSearch(false);
                                setSearchQuery('');
                              }}
                            >
                              <img 
                                src={product.frontImage || product.image} 
                                alt={product.title} 
                                className="w-100 h-100 object-fit-cover"
                              />
                            </div>

                            <div className="text-center mb-2 px-1">
                              <h6 
                                className="text-uppercase fw-semibold text-truncate mb-1" 
                                style={{ fontSize: '0.7rem', cursor: 'pointer' }}
                                onClick={() => {
                                  onProductClick(product);
                                  setShowSearch(false);
                                  setSearchQuery('');
                                }}
                              >
                                {product.title}
                              </h6>
                              <span className="fw-bold text-dark" style={{ fontSize: '0.7rem' }}>
                                {currency.symbol} {convertPrice(product.numericPrice)}
                              </span>
                            </div>

                            <div className="mt-auto d-flex gap-1">
                              <button 
                                className="btn btn-dark w-100 py-1 text-uppercase fw-bold rounded-0 border-0" 
                                style={{ fontSize: '0.55rem', letterSpacing: '0.5px', backgroundColor: '#1b4d3e' }}
                                onClick={() => onAddToCart && onAddToCart(product)}
                              >
                                ADD
                              </button>
                              <button 
                                className="btn btn-light border py-1 px-2 rounded-0 d-flex align-items-center justify-content-center" 
                                style={{ fontSize: '0.6rem' }}
                                onClick={() => onToggleWishlist && onToggleWishlist(product)}
                                title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                              >
                                {isWishlisted ? <FaHeart size={11} className="text-danger" /> : <FaRegHeart size={11} className="text-dark" />}
                              </button>
                            </div>
                          </div>
                        </Col>
                      );
                    })}
                  </Row>
                )}
              </Col>
            </Row>
          )}
        </div>
      )}

      <Offcanvas show={showMenu} onHide={() => setShowMenu(false)} placement="start" style={{ width: '340px' }}>
        <Offcanvas.Header className="border-bottom px-4 py-3">
          <Offcanvas.Title className="fw-bold text-uppercase m-0" style={{ letterSpacing: '2px', fontSize: '0.9rem' }}>
            NAVIGATION
          </Offcanvas.Title>
          <FaTimes size={18} style={{ cursor: 'pointer' }} onClick={() => setShowMenu(false)} />
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-content-between p-0">
          <div className="menu-list">
            <Accordion flush defaultActiveKey="0" className="custom-accordion">
              <Accordion.Item eventKey="0" className="border-bottom">
                <Accordion.Header className="fw-bold text-uppercase py-1" style={{ fontSize: '0.85rem', letterSpacing: '1px' }}>
                  UNSTITCHED
                </Accordion.Header>
                <Accordion.Body className="p-0 bg-light">
                  <div className="py-2 px-4 border-bottom text-uppercase small" style={{ cursor: 'pointer' }} onClick={() => handleNav('EID LAWN')}>EID LAWN '26</div>
                  <div className="py-2 px-4 border-bottom text-uppercase small" style={{ cursor: 'pointer' }} onClick={() => handleNav('SWISS VOILE')}>SWISS VOILE</div>
                  <div className="py-2 px-4 text-uppercase small" style={{ cursor: 'pointer' }} onClick={() => handleNav('CHANTELLE')}>CHANTELLE</div>
                </Accordion.Body>
              </Accordion.Item>

              <div className="p-3 border-bottom fw-bold text-uppercase d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer' }} onClick={() => handleNav('READY TO WEAR')}>
                <span>READY TO WEAR</span>
              </div>

              <div className="p-3 border-bottom fw-bold text-uppercase d-flex justify-content-between align-items-center" style={{ fontSize: '0.85rem', letterSpacing: '1px', cursor: 'pointer' }} onClick={() => handleNav('SPECIAL PRICES')}>
                <span>SPECIAL PRICES</span>
              </div>
            </Accordion>
          </div>

          <div className="p-4 border-top bg-light mt-auto">
            <div className="d-flex justify-content-center gap-3 mb-3 text-dark fs-6">
              <FaFacebookF style={{ cursor: 'pointer' }} />
              <FaInstagram style={{ cursor: 'pointer' }} />
              <FaYoutube style={{ cursor: 'pointer' }} />
              <FaTiktok style={{ cursor: 'pointer' }} />
              <FaPinterestP style={{ cursor: 'pointer' }} />
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      <Modal show={showCountryModal} onHide={() => setShowCountryModal(false)} centered size="sm">
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="fw-bold fs-6 text-uppercase">Select Country</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-2">
          <div 
            className="p-2 border-bottom fw-semibold text-uppercase" 
            style={{ cursor: 'pointer', fontSize: '0.8rem' }} 
            onClick={() => { 
              setCurrency({ name: 'PAKISTAN', code: 'PKR', symbol: 'Rs', rate: 1, flag: '🇵🇰' }); 
              setShowCountryModal(false); 
            }}
          >
            🇵🇰 PAKISTAN (PKR)
          </div>
          <div 
            className="p-2 border-bottom fw-semibold text-uppercase" 
            style={{ cursor: 'pointer', fontSize: '0.8rem' }} 
            onClick={() => { 
              setCurrency({ name: 'UNITED STATES', code: 'USD', symbol: '$', rate: 0.0036, flag: '🇺🇸' }); 
              setShowCountryModal(false); 
            }}
          >
            🇺🇸 UNITED STATES (USD)
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Navbar;