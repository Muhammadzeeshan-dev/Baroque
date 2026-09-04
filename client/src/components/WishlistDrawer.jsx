import React from 'react';
import { Offcanvas, Button } from 'react-bootstrap';
import { FaTrashAlt, FaPlus, FaEye } from 'react-icons/fa';

const WishlistDrawer = ({ show, handleClose, wishlist = [], onRemoveFromWishlist, onAddToCart, onViewDetails }) => {
  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" className="rounded-0">
      <Offcanvas.Header closeButton className="border-bottom">
        <Offcanvas.Title className="text-uppercase fw-bold" style={{ fontSize: '0.9rem', letterSpacing: '1px' }}>
          My Wishlist ({wishlist.length})
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="p-3">
        {wishlist.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <p className="mb-0">آپ کی وش لسٹ خالی ہے۔</p>
          </div>
        ) : (
          <div className="d-flex flex-column gap-3">
            {wishlist.map((product) => (
              <div key={product.id} className="d-flex align-items-center justify-content-between border-bottom pb-3">
                {/* Product Image & Info */}
                <div className="d-flex align-items-center gap-3" style={{ cursor: 'pointer' }} onClick={() => onViewDetails(product)}>
                  <img 
                    src={product.frontImage} 
                    alt={product.title} 
                    style={{ width: '65px', height: '85px', objectFit: 'cover' }} 
                  />
                  <div>
                    <h6 className="fw-semibold text-uppercase m-0 text-truncate" style={{ fontSize: '0.75rem', maxWidth: '140px' }}>
                      {product.title}
                    </h6>
                    <p className="fw-bold text-dark m-0 mt-1" style={{ fontSize: '0.8rem' }}>
                      {product.price}
                    </p>
                  </div>
                </div>

                {/* Actions: View Details, Add to Cart (+), Remove Trash */}
                <div className="d-flex align-items-center gap-2">
                  {/* View Details Button */}
                  <Button 
                    variant="outline-secondary" 
                    size="sm" 
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    title="View Details"
                    onClick={() => onViewDetails(product)}
                  >
                    <FaEye size={12} />
                  </Button>

                  {/* Plus Icon: Direct Add to Cart */}
                  <Button 
                    variant="dark" 
                    size="sm" 
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center"
                    title="Add to Cart"
                    onClick={() => onAddToCart(product)}
                  >
                    <FaPlus size={12} />
                  </Button>

                  {/* Remove Icon */}
                  <Button 
                    variant="outline-danger" 
                    size="sm" 
                    className="rounded-circle p-2 d-flex align-items-center justify-content-center border-0"
                    title="Remove from Wishlist"
                    onClick={() => onRemoveFromWishlist(product.id)}
                  >
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

export default WishlistDrawer;