import React, { useContext } from "react";
import { Offcanvas, Button } from "react-bootstrap";
import { FaTrash, FaPlus, FaMinus, FaShoppingBag, FaHeart } from "react-icons/fa";
import { CurrencyContext } from "../context/CurrencyContext";

export const CartDrawer = ({ 
  show, 
  onHide, 
  cartItems = [], 
  onUpdateQuantity, 
  onRemoveItem, 
  onProceedToCheckout 
}) => {
  const { currency, convertPrice } = useContext(CurrencyContext);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.numericPrice * (item.quantity || 1)), 0);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="rounded-0" style={{ width: "400px" }}>
      <Offcanvas.Header closeButton className="border-bottom py-3">
        <Offcanvas.Title className="fw-bold text-uppercase" style={{ fontSize: "0.95rem", letterSpacing: "1px" }}>
          Shopping Bag ({cartItems.reduce((acc, item) => acc + (item.quantity || 1), 0)})
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column p-0">
        {cartItems.length === 0 ? (
          <div className="text-center py-5 my-auto">
            <FaShoppingBag size={45} className="text-muted mb-3 opacity-50" />
            <p className="text-muted fw-semibold text-uppercase small">Your shopping bag is empty</p>
            <Button 
              variant="dark" 
              size="sm" 
              className="rounded-0 text-uppercase mt-2 px-4 py-2 border-0" 
              style={{ backgroundColor: "#1b4d3e", letterSpacing: "1px", fontSize: "0.75rem" }}
              onClick={onHide}
            >
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="flex-grow-1 overflow-auto p-3">
              {cartItems.map((item, index) => (
                <div key={index} className="d-flex gap-3 mb-3 pb-3 border-bottom align-items-center">
                  <img 
                    src={item.frontImage || item.image} 
                    alt={item.title} 
                    style={{ width: "70px", height: "90px", objectFit: "cover" }} 
                    className="border"
                  />
                  <div className="flex-grow-1">
                    <h6 className="text-uppercase fw-semibold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                      {item.title}
                    </h6>
                    <p className="text-muted small mb-2" style={{ fontSize: "0.7rem" }}>
                      {item.fabric || "Unstitched"}
                    </p>
                    
                    <div className="d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center border">
                        <button 
                          className="btn btn-sm rounded-0 border-0 px-2 py-0"
                          onClick={() => onUpdateQuantity(item.id, -1)}
                        >
                          <FaMinus size={8} />
                        </button>
                        <span className="px-2 small fw-semibold" style={{ fontSize: "0.75rem" }}>
                          {item.quantity || 1}
                        </span>
                        <button 
                          className="btn btn-sm rounded-0 border-0 px-2 py-0"
                          onClick={() => onUpdateQuantity(item.id, 1)}
                        >
                          <FaPlus size={8} />
                        </button>
                      </div>

                      <span className="fw-bold" style={{ fontSize: "0.8rem" }}>
                        {currency.symbol} {convertPrice(item.numericPrice * (item.quantity || 1))}
                      </span>
                    </div>
                  </div>

                  <button 
                    className="btn btn-link text-danger p-0 shadow-none"
                    onClick={() => onRemoveItem(item.id)}
                  >
                    <FaTrash size={13} />
                  </button>
                </div>
              ))}
            </div>

            <div className="p-3 border-top bg-light">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-uppercase small fw-semibold">Subtotal</span>
                <span className="fw-bold">{currency.symbol} {convertPrice(subtotal)}</span>
              </div>
              <p className="text-muted small mb-3" style={{ fontSize: "0.7rem" }}>
                Taxes and shipping calculated at checkout
              </p>

              <Button 
                variant="dark" 
                className="w-100 rounded-0 text-uppercase py-2 fw-bold border-0 shadow-none mb-2"
                style={{ backgroundColor: "#1b4d3e", letterSpacing: "1px", fontSize: "0.8rem" }}
                onClick={onProceedToCheckout}
              >
                Checkout
              </Button>
            </div>
          </>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export const WishlistDrawer = ({ show, onHide, wishlist = [], onToggleWishlist, onAddToCart }) => {
  const { currency, convertPrice } = useContext(CurrencyContext);

  return (
    <Offcanvas show={show} onHide={onHide} placement="end" className="rounded-0" style={{ width: "400px" }}>
      <Offcanvas.Header closeButton className="border-bottom py-3">
        <Offcanvas.Title className="fw-bold text-uppercase" style={{ fontSize: "0.95rem", letterSpacing: "1px" }}>
          Wishlist ({wishlist.length})
        </Offcanvas.Title>
      </Offcanvas.Header>

      <Offcanvas.Body className="d-flex flex-column p-0">
        {wishlist.length === 0 ? (
          <div className="text-center py-5 my-auto">
            <FaHeart size={45} className="text-muted mb-3 opacity-50" />
            <p className="text-muted fw-semibold text-uppercase small">Your wishlist is empty</p>
            <Button 
              variant="dark" 
              size="sm" 
              className="rounded-0 text-uppercase mt-2 px-4 py-2 border-0" 
              style={{ backgroundColor: "#1b4d3e", letterSpacing: "1px", fontSize: "0.75rem" }}
              onClick={onHide}
            >
              Explore Products
            </Button>
          </div>
        ) : (
          <div className="flex-grow-1 overflow-auto p-3">
            {wishlist.map((item, index) => (
              <div key={index} className="d-flex gap-3 mb-3 pb-3 border-bottom align-items-center">
                <img 
                  src={item.frontImage || item.image} 
                  alt={item.title} 
                  style={{ width: "70px", height: "90px", objectFit: "cover" }} 
                  className="border"
                />
                <div className="flex-grow-1">
                  <h6 className="text-uppercase fw-semibold mb-1" style={{ fontSize: "0.75rem", letterSpacing: "0.5px" }}>
                    {item.title}
                  </h6>
                  <span className="fw-bold d-block mb-2" style={{ fontSize: "0.8rem" }}>
                    {currency.symbol} {convertPrice(item.numericPrice)}
                  </span>
                  <Button 
                    variant="dark" 
                    size="sm" 
                    className="rounded-0 text-uppercase py-1 px-3 border-0"
                    style={{ fontSize: "0.65rem", backgroundColor: "#1b4d3e" }}
                    onClick={() => {
                      onAddToCart(item);
                      onToggleWishlist(item);
                    }}
                  >
                    Move to Bag
                  </Button>
                </div>
                <button 
                  className="btn btn-link text-danger p-0 shadow-none"
                  onClick={() => onToggleWishlist(item)}
                >
                  <FaTrash size={13} />
                </button>
              </div>
            ))}
          </div>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};