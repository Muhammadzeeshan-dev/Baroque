import React, { useState } from 'react';
import { Navbar, Container, Offcanvas } from 'react-bootstrap';
import { 
  FaSearch, FaUser, FaShoppingBag, FaBars, 
  FaFacebookF, FaInstagram, FaYoutube, FaTiktok, FaWhatsapp, FaPinterestP, 
  FaChevronRight, FaChevronDown 
} from 'react-icons/fa';

const menuCategories = {
  "UNSTITCHED": ["SHOP ALL", "SUMMER", "FORMALS", "WINTER", "VELVET"],
  "EID LAWN 2026": ["SHOP ALL", "UNSTITCHED", "STITCHED", "LAWN '26"],
  "STITCHED": ["SHOP ALL", "FORMALS", "CASUAL", "PARTY WEAR"],
  "READY TO WEAR": ["SHOP ALL", "SUMMER", "FORMALS", "WINTER", "VELVET"],
  "ESSENTIALS": ["ENSEMBLES", "DUPATTAS", "BOTTOMS", "TROUSERS"]
};

const HeaderNavbar = ({ onLogoClick, cartCount = 0, onOpenCart }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [activeCategory, setActiveCategory] = useState("UNSTITCHED");

  const handleClose = () => setShowMenu(false);
  const handleShow = () => setShowMenu(true);

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="announcement-bar text-center py-2">
        <span>FREE SHIPPING NATIONWIDE ON ORDERS ABOVE PKR 3000</span>
      </div>

      {/* 2. Solid White & Sticky Navbar */}
      <Navbar expand="lg" className="custom-sticky-navbar py-3">
        <Container fluid className="px-md-5 d-flex justify-content-between align-items-center">
          
          {/* Left: Hamburger Button */}
          <button className="navbar-toggler-btn" onClick={handleShow}>
            <FaBars size={18} />
          </button>

          {/* Center: Brand Logo */}
          <Navbar.Brand href="#home" onClick={(e) => { e.preventDefault(); onLogoClick(); }} className="m-0 p-0">
            <img 
              src="https://baroque.com.pk/cdn/shop/files/LOGO_PNG_V01_2.png?v=1697476592&width=280" 
              alt="BAROQUE" 
              className="brand-logo-img"
            />
          </Navbar.Brand>

          {/* Right: Search, User Profile, Cart */}
          <div className="d-flex align-items-center gap-2 gap-sm-3">
            <button className="nav-icon-btn"><FaSearch size={17} /></button>
            <button className="nav-icon-btn d-none d-sm-inline"><FaUser size={17} /></button>
            <button className="nav-icon-btn position-relative" onClick={onOpenCart}>
              <FaShoppingBag size={17} />
              <span className="cart-badge">{cartCount}</span>
            </button>
          </div>

        </Container>
      </Navbar>

      {/* 3. Offcanvas Mobile/Desktop Drawer */}
      <Offcanvas show={showMenu} onHide={handleClose} placement="start" className="baroque-mega-drawer">
        <div className="d-flex h-100">
          <div className="baroque-drawer-left d-flex flex-column justify-content-between">
            <div>
              <div className="d-flex justify-content-end p-3 pb-2">
                <button type="button" className="drawer-close-btn" onClick={handleClose}>✕</button>
              </div>

              <div className="drawer-menu-list">
                {Object.keys(menuCategories).map((catName) => (
                  <div 
                    key={catName} 
                    className={`drawer-menu-item ${activeCategory === catName ? 'active' : ''}`}
                    onClick={() => setActiveCategory(catName)}
                  >
                    <span>{catName}</span>
                    <FaChevronRight size={10} className="menu-arrow" />
                  </div>
                ))}
              </div>
            </div>

            <div className="drawer-bottom-section">
              <div className="drawer-social-icons">
                <a href="#fb"><FaFacebookF size={13} /></a>
                <a href="#insta"><FaInstagram size={13} /></a>
                <a href="#yt"><FaYoutube size={13} /></a>
                <a href="#tiktok"><FaTiktok size={13} /></a>
                <a href="#wa"><FaWhatsapp size={13} /></a>
                <a href="#pinterest"><FaPinterestP size={13} /></a>
              </div>

              <div className="drawer-country-selector">
                <span>PAKISTAN</span>
                <FaChevronDown size={10} />
              </div>
            </div>
          </div>

          <div className="baroque-drawer-right">
            <div className="drawer-submenu-list pt-5">
              {menuCategories[activeCategory]?.map((subItem, index) => (
                <a key={index} href={`#${subItem.toLowerCase().replace(/\s+/g, '-')}`} className="drawer-submenu-item" onClick={handleClose}>
                  {subItem}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Offcanvas>
    </>
  );
};

export default HeaderNavbar;