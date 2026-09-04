import React from 'react';
import { Offcanvas } from 'react-bootstrap';
import { X, ChevronRight, User, Globe, ChevronDown } from 'lucide-react';

// Custom SVG Brand Icons
const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const YoutubeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
);

const MenuDrawer = ({ 
  show, 
  handleClose, 
  onNavigate, 
  selectedCurrency = "PKR Rs.", 
  onCurrencyChange 
}) => {
  const categories = [
    { name: "UNSTITCHED", page: "collection" },
    { name: "READY TO WEAR", page: "collection" },
    { name: "EID LAWN '26", page: "collection", isNew: true },
    { name: "CHANTELLE", page: "collection" },
    { name: "SPECIAL OFFERS", page: "collection" },
    { name: "BOTTOMS", page: "collection" },
    { name: "DUPATTAS", page: "collection" },
  ];

  const handleCurrencySelect = (e) => {
    if (onCurrencyChange) {
      onCurrencyChange(e.target.value);
    }
  };

  return (
    <Offcanvas 
      show={show} 
      onHide={handleClose} 
      placement="start" 
      className="menu-drawer-container"
      style={{ width: '350px', maxWidth: '85vw' }}
    >
      {/* Header */}
      <Offcanvas.Header className="d-flex justify-content-between align-items-center border-bottom px-4 py-3">
        <h6 className="m-0 text-uppercase fw-bold tracking-widest" style={{ letterSpacing: '2px', fontSize: '0.85rem' }}>
          MENU
        </h6>
        <button 
          className="btn p-0 border-0" 
          onClick={handleClose}
          aria-label="Close Menu"
        >
          <X size={22} />
        </button>
      </Offcanvas.Header>

      {/* Body / Categories List */}
      <Offcanvas.Body className="p-0 d-flex flex-column justify-content-between">
        <div className="menu-items-list py-2">
          {categories.map((cat, index) => (
            <div
              key={index}
              className="menu-item-row px-4 py-3 border-bottom d-flex align-items-center justify-content-between"
              onClick={() => {
                if (onNavigate) onNavigate(cat.page);
                handleClose();
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="d-flex align-items-center gap-2">
                <span className="fw-semibold text-uppercase" style={{ letterSpacing: '1.5px', fontSize: '0.85rem' }}>
                  {cat.name}
                </span>
                {cat.isNew && (
                  <span className="badge bg-black text-white rounded-0 px-2 py-1" style={{ fontSize: '0.6rem', letterSpacing: '1px' }}>
                    NEW
                  </span>
                )}
              </div>
              <ChevronRight size={16} className="text-secondary" />
            </div>
          ))}
        </div>

        {/* Footer Actions & Social Icons inside Menu */}
        <div className="menu-footer border-top p-4 bg-light">
          <div className="d-flex flex-column gap-3 mb-4">
            
            {/* Account Link */}
            <div className="d-flex align-items-center gap-3 cursor-pointer">
              <User size={18} />
              <span className="text-uppercase fw-medium" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                MY ACCOUNT
              </span>
            </div>

            {/* Country / Currency Selector (Synced) */}
            <div className="d-flex align-items-center gap-3 cursor-pointer position-relative">
              <Globe size={18} />
              <span className="text-uppercase fw-medium" style={{ fontSize: '0.8rem', letterSpacing: '1px' }}>
                {selectedCurrency}
              </span>
              <ChevronDown size={14} className="ms-auto text-secondary" />
              <select 
                className="country-dropdown-select"
                value={selectedCurrency}
                onChange={handleCurrencySelect}
              >
                <option value="PKR Rs.">PKR Rs.</option>
                <option value="USD $">USD $</option>
                <option value="GBP £">GBP £</option>
                <option value="AED AED">AED AED</option>
              </select>
            </div>
          </div>

          {/* Social Icons (SVG Based) */}
          <div className="pt-3 border-top">
            <p className="text-muted text-uppercase mb-2" style={{ fontSize: '0.7rem', letterSpacing: '1px' }}>
              FOLLOW US
            </p>
            <div className="d-flex align-items-center gap-3">
              <a href="#facebook" className="text-dark"><FacebookIcon /></a>
              <a href="#instagram" className="text-dark"><InstagramIcon /></a>
              <a href="#youtube" className="text-dark"><YoutubeIcon /></a>
            </div>
          </div>

        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MenuDrawer;