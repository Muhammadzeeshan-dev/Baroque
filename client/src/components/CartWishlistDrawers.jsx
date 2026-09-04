import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaShoppingBag, FaHeart, FaMinus, FaPlus, FaTrashAlt } from 'react-icons/fa';

export const CartDrawer = ({ 
  show, 
  onHide, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}) => {
  const subtotal = cartItems.reduce((acc, item) => acc + (item.numericPrice * item.quantity), 0);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="rounded-0">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="text-uppercase fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
          <FaShoppingBag className="me-2" /> CART ({cartItems.reduce((a, c) => a + c.quantity, 0)})
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="d-flex flex-column justify-content-between p-0">
        {cartItems.length === 0 ? (
          <div className="text-center my-auto p-4">
            <FaShoppingBag size={40} className="text-muted mb-3" />
            <p className="fw-semibold text-muted">YOUR CART IS CURRENTLY EMPTY.</p>
            <Button variant="dark" size="sm" onClick={onHide} className="rounded-0 text-uppercase px-4">
              CONTINUE SHOPPING
            </Button>
          </div>
        ) : (
          <>
            <div className="p-3 overflow-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>
              <p className="text-success small mb-3">You are eligible for free shipping.</p>
              {cartItems.map((item) => (
                <div key={`${item.id}-${item.selectedType}`} className="d-flex align-items-center mb-3 pb-3 border-bottom">
                  <img src={item.frontImage} alt={item.title} style={{ width: '65px', height: '85px', objectFit: 'cover' }} className="me-3" />
                  <div className="flex-grow-1">
                    <h6 className="text-uppercase fw-semibold m-0 text-truncate" style={{ fontSize: '0.75rem', maxWidth: '160px' }}>{item.title}</h6>
                    <small className="text-muted text-uppercase" style={{ fontSize: '0.65rem' }}>{item.selectedType} / {item.size || 'DEFAULT'}</small>
                    <div className="fw-bold mt-1" style={{ fontSize: '0.8rem' }}>{item.price}</div>
                    <div className="d-flex align-items-center border mt-2" style={{ width: '90px', height: '30px' }}>
                      <button className="btn btn-link p-0 w-50 text-dark text-decoration-none shadow-none" onClick={() => onUpdateQuantity(item.id, -1)}><FaMinus size={8} /></button>
                      <span className="small fw-bold">{item.quantity}</span>
                      <button className="btn btn-link p-0 w-50 text-dark text-decoration-none shadow-none" onClick={() => onUpdateQuantity(item.id, 1)}><FaPlus size={8} /></button>
                    </div>
                  </div>
                  <button className="btn btn-link text-danger p-0 ms-2 text-decoration-none" onClick={() => onRemoveItem(item.id)}>
                    <span className="small" style={{ fontSize: '0.7rem' }}>Remove</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="p-3 border-top bg-light">
              <p className="text-muted small mb-3">Taxes and shipping calculated at checkout</p>
              <button className="btn btn-dark w-100 rounded-0 py-3 text-uppercase fw-bold d-flex justify-content-between align-items-center px-4" style={{ backgroundColor: '#1b4d3e', fontSize: '0.75rem' }}>
                <span>CHECKOUT</span>
                <span>PKR {subtotal.toLocaleString()}.00</span>
              </button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const WishlistDrawer = ({ 
  show, 
  onHide, 
  wishlist, 
  onToggleWishlist, 
  onAddToCart 
}) => {
  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="rounded-0">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="text-uppercase fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
          <FaHeart className="me-2" /> My Wishlist ({wishlist.length})
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body className="p-3">
        {wishlist.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0 text-uppercase small">NO ITEMS IN YOUR WISHLIST.</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {wishlist.map((product) => (
              <div key={product.id} className="d-flex align-items-center justify-content-between border-bottom pb-3">
                <div className="d-flex align-items-center gap-3">
                  <img src={product.frontImage} alt={product.title} style={{ width: '65px', height: '85px', objectFit: 'cover' }} />
                  <div>
                    <h6 className="fw-semibold text-uppercase m-0 text-truncate" style={{ fontSize: '0.75rem', maxWidth: '140px' }}>{product.title}</h6>
                    <p className="fw-bold text-dark m-0 mt-1" style={{ fontSize: '0.8rem' }}>{product.price}</p>
                  </div>
                </div>
                <div className="d-flex align-items-center gap-2">
                  <Button variant="dark" size="sm" className="rounded-circle p-2 d-flex align-items-center justify-content-center" onClick={() => onAddToCart(product, 1, product.type)}>
                    <FaPlus size={12} />
                  </Button>
                  <Button variant="outline-danger" size="sm" className="rounded-circle p-2 d-flex align-items-center justify-content-center border-0" onClick={() => onToggleWishlist(product)}>
                    <FaTrashAlt size={12} />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};