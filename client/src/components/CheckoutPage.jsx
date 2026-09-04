import React, { useState, useContext, useEffect } from "react";
import { Container, Row, Col, Form, Button, Spinner, Alert } from "react-bootstrap";
import { FaLock, FaCheckCircle, FaPlus, FaMinus, FaTrash, FaShoppingBag, FaUserCircle } from "react-icons/fa";
import { CurrencyContext } from "../context/CurrencyContext";

const CheckoutPage = ({ cart = [], currentUser, onUpdateQuantity, onRemoveItem, onNavigateCategory, onCompleteOrder }) => {
  const { currency, convertPrice } = useContext(CurrencyContext);

  const [formData, setFormData] = useState({
    email: currentUser?.email || "",
    saveInfo: false,
    country: "Pakistan",
    firstName: currentUser?.name ? currentUser.name.split(" ")[0] : "",
    lastName: currentUser?.name && currentUser.name.split(" ").length > 1 ? currentUser.name.split(" ").slice(1).join(" ") : "",
    address: "",
    apartment: "",
    city: "",
    postalCode: "",
    phone: "",
    shippingMethod: "Local Delivery",
    paymentMethod: "cod",
  });

  const [orderPlaced, setOrderPlaced] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (currentUser) {
      setFormData(prev => ({
        ...prev,
        email: currentUser.email || prev.email,
        firstName: currentUser.name ? currentUser.name.split(" ")[0] : prev.firstName,
      }));
    }
  }, [currentUser]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const subtotalPKR = cart.reduce((acc, item) => acc + (item.numericPrice * (item.quantity || 1)), 0);
  const shippingPKR = 0;
  const totalPKR = subtotalPKR + shippingPKR;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    
    setIsProcessing(true);
    setErrorMessage("");
    
    try {
      // Backend Payload Preparation
      const orderPayload = {
        userEmail: formData.email,
        shippingAddress: {
          fullName: `${formData.firstName} ${formData.lastName}`.trim(),
          address: formData.address,
          city: formData.city,
          phone: formData.phone,
        },
        orderItems: cart.map(item => ({
          name: item.title,
          price: item.numericPrice,
          quantity: item.quantity || 1,
        })),
        totalAmount: totalPKR,
      };

      // Sending real request to backend server running on port 5001
      const response = await fetch("http://localhost:5001/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsProcessing(false);
        setOrderPlaced(true);
        // Inform parent component if needed
        if (typeof onCompleteOrder === 'function') {
          onCompleteOrder(formData);
        }
      } else {
        setIsProcessing(false);
        setErrorMessage(data.message || "Failed to place order. Please try again.");
      }
    } catch (err) {
      console.error("Checkout Network Error:", err);
      setIsProcessing(false);
      setErrorMessage("Network error: Could not connect to the server.");
    }
  };

  if (orderPlaced) {
    return (
      <Container className="py-5 text-center" style={{ minHeight: "70vh" }}>
        <div className="mx-auto p-5 border bg-light shadow-sm" style={{ maxWidth: "600px" }}>
          <FaCheckCircle size={60} className="text-success mb-3" />
          <h2 className="fw-bold text-uppercase mb-3" style={{ letterSpacing: "1px" }}>Thank you for your order!</h2>
          <p className="text-muted small text-uppercase mb-4">
            Your order has been successfully placed. We have sent a confirmation email to <strong>{formData.email || "your email"}</strong>.
          </p>
          <div className="border-top pt-3 text-start mb-4 small">
            <p className="mb-1"><strong>Shipping Address:</strong> {formData.firstName} {formData.lastName}, {formData.address}, {formData.city}</p>
            <p className="mb-1"><strong>Total Paid:</strong> {currency.symbol} {convertPrice(totalPKR)} ({currency.code})</p>
          </div>
          <Button 
            variant="dark" 
            className="rounded-0 text-uppercase px-4 py-2" 
            style={{ backgroundColor: "#1b4d3e", letterSpacing: "1px", borderColor: "#1b4d3e" }}
            onClick={() => {
              if (onNavigateCategory) onNavigateCategory("UNSTITCHED");
            }}
          >
            Continue Shopping
          </Button>
        </div>
      </Container>
    );
  }

  return (
    <div className="bg-white text-dark py-4">
      <Container style={{ maxWidth: "1150px" }}>
        <div className="text-center mb-4">
          <h2 className="fw-bold text-uppercase m-0" style={{ letterSpacing: "4px", fontSize: "1.8rem" }}>
            BAROQUE
          </h2>
        </div>

        {/* Error Notification Alert */}
        {errorMessage && (
          <Alert variant="danger" className="rounded-0 small text-center mb-4">
            {errorMessage}
          </Alert>
        )}

        {/* User Profile Display Banner */}
        {currentUser && (
          <div className="mb-4 p-3 border bg-light d-flex align-items-center justify-content-between">
            <div className="d-flex align-items-center gap-3">
              <FaUserCircle size={32} className="text-secondary" />
              <div>
                <span className="d-block small text-muted text-uppercase" style={{ fontSize: "0.65rem" }}>Logged in as</span>
                <span className="fw-bold text-uppercase" style={{ fontSize: "0.85rem" }}>{currentUser.name || "Valued Customer"} ({currentUser.email})</span>
              </div>
            </div>
            <span className="badge bg-success text-uppercase rounded-0" style={{ fontSize: "0.65rem", letterSpacing: "1px" }}>Verified Profile</span>
          </div>
        )}

        <Row className="gx-lg-5">
          {/* Left Column: Form */}
          <Col lg={7} className="mb-5 mb-lg-0">
            <Form onSubmit={handleSubmit}>
              <div className="mb-4">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="fw-bold text-uppercase m-0" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Contact</h6>
                  {!currentUser && (
                    <span className="small text-muted" style={{ cursor: "pointer" }} onClick={() => {
                      if (onNavigateCategory) onNavigateCategory("login");
                    }}>Log in</span>
                  )}
                </div>
                <Form.Control 
                  type="email" 
                  name="email"
                  placeholder="Email or mobile phone number" 
                  className="rounded-0 shadow-none py-2"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.85rem" }}
                />
              </div>

              <div className="mb-4">
                <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Delivery</h6>
                <Form.Group className="mb-3">
                  <Form.Select 
                    name="country"
                    className="rounded-0 shadow-none py-2"
                    value={formData.country}
                    onChange={handleChange}
                    style={{ fontSize: "0.85rem" }}
                  >
                    <option value="Pakistan">Pakistan</option>
                    <option value="United States">United States</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Canada">Canada</option>
                  </Form.Select>
                </Form.Group>

                <Row className="g-2 mb-3">
                  <Col sm={6}>
                    <Form.Control 
                      type="text" 
                      name="firstName"
                      placeholder="First name" 
                      className="rounded-0 shadow-none py-2"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "0.85rem" }}
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Control 
                      type="text" 
                      name="lastName"
                      placeholder="Last name" 
                      className="rounded-0 shadow-none py-2"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "0.85rem" }}
                    />
                  </Col>
                </Row>

                <Form.Control 
                  type="text" 
                  name="address"
                  placeholder="Address" 
                  className="rounded-0 shadow-none py-2 mb-3"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  style={{ fontSize: "0.85rem" }}
                />

                <Row className="g-2 mb-3">
                  <Col sm={4}>
                    <Form.Control 
                      type="text" 
                      name="city"
                      placeholder="City" 
                      className="rounded-0 shadow-none py-2"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "0.85rem" }}
                    />
                  </Col>
                  <Col sm={4}>
                    <Form.Control 
                      type="text" 
                      name="postalCode"
                      placeholder="Postal code (optional)" 
                      className="rounded-0 shadow-none py-2"
                      value={formData.postalCode}
                      onChange={handleChange}
                      style={{ fontSize: "0.85rem" }}
                    />
                  </Col>
                  <Col sm={4}>
                    <Form.Control 
                      type="text" 
                      name="phone"
                      placeholder="Phone" 
                      className="rounded-0 shadow-none py-2"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      style={{ fontSize: "0.85rem" }}
                    />
                  </Col>
                </Row>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold text-uppercase mb-3" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Shipping method</h6>
                <div className="border p-3 d-flex justify-content-between align-items-center bg-light">
                  <span className="small text-uppercase fw-semibold">Local Delivery</span>
                  <span className="small fw-bold">FREE</span>
                </div>
              </div>

              <div className="mb-4">
                <h6 className="fw-bold text-uppercase mb-1" style={{ fontSize: "0.9rem", letterSpacing: "1px" }}>Payment</h6>
                <p className="text-muted small mb-3">All transactions are secure and encrypted.</p>

                <div className="border mb-2">
                  <div 
                    className={`p-3 d-flex align-items-center justify-content-between ${formData.paymentMethod === 'cod' ? 'bg-light border-bottom' : ''}`}
                    style={{ cursor: "pointer" }}
                    onClick={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                  >
                    <div className="form-check m-0">
                      <input 
                        type="radio" 
                        name="paymentMethod" 
                        id="cod" 
                        checked={formData.paymentMethod === 'cod'} 
                        onChange={() => setFormData(prev => ({ ...prev, paymentMethod: 'cod' }))}
                        className="form-check-input shadow-none"
                      />
                      <label htmlFor="cod" className="form-check-label fw-semibold small text-uppercase ms-2" style={{ cursor: "pointer" }}>
                        Cash on Delivery (COD)
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isProcessing || cart.length === 0}
                className="w-100 rounded-0 text-uppercase py-3 fw-bold border-0 text-white shadow-none mt-3 d-flex justify-content-center align-items-center"
                style={{ backgroundColor: "#1b4d3e", letterSpacing: "1px", fontSize: "0.9rem" }}
              >
                {isProcessing ? (
                  <>
                    <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" className="me-2" />
                    Processing Order...
                  </>
                ) : (
                  <>
                    <FaLock className="me-2" size={13} /> Pay now
                  </>
                )}
              </Button>
            </Form>
          </Col>

          {/* Right Column: Order Summary */}
          <Col lg={5}>
            <div className="p-4 bg-light border sticky-top" style={{ top: "90px" }}>
              <h6 className="fw-bold text-uppercase mb-3 pb-2 border-bottom" style={{ fontSize: "0.85rem", letterSpacing: "1px" }}>
                Order Summary ({cart.reduce((t, i) => t + (i.quantity || 1), 0)} items)
              </h6>

              {cart.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted small text-uppercase mb-3">Your cart is empty.</p>
                </div>
              ) : (
                <div className="mb-3 px-1 pt-2" style={{ maxHeight: "280px", overflowY: "auto", overflowX: "visible" }}>
                  {cart.map((item, index) => (
                    <div key={index} className="d-flex align-items-center justify-content-between mb-3 pb-3 border-bottom">
                      <div className="d-flex align-items-center gap-3">
                        <div className="position-relative" style={{ overflow: "visible", minWidth: "50px" }}>
                          <img 
                            src={item.frontImage || item.image} 
                            alt={item.title} 
                            style={{ width: "50px", height: "65px", objectFit: "cover" }} 
                            className="border"
                          />
                          <span 
                            className="position-absolute badge rounded-circle bg-dark text-white d-flex align-items-center justify-content-center shadow-sm" 
                            style={{ 
                              top: "-6px", 
                              right: "-8px", 
                              width: "20px", 
                              height: "20px", 
                              fontSize: "0.65rem",
                              zIndex: 5 
                            }}
                          >
                            {item.quantity || 1}
                          </span>
                        </div>
                        <div>
                          <h6 className="text-uppercase fw-semibold mb-1 text-truncate" style={{ fontSize: "0.75rem", maxWidth: "130px" }}>
                            {item.title}
                          </h6>
                          <span className="text-muted d-block mb-2" style={{ fontSize: "0.7rem" }}>{item.fabric || "Unstitched"}</span>
                          
                          <div className="d-flex align-items-center border bg-white" style={{ width: "fit-content" }}>
                            <button 
                              type="button"
                              className="btn btn-sm rounded-0 border-0 px-2 py-0 shadow-none"
                              onClick={() => typeof onUpdateQuantity === 'function' && onUpdateQuantity(item.id, -1)}
                            >
                              <FaMinus size={8} />
                            </button>
                            <span className="px-2 small fw-semibold" style={{ fontSize: "0.7rem" }}>
                              {item.quantity || 1}
                            </span>
                            <button 
                              type="button"
                              className="btn btn-sm rounded-0 border-0 px-2 py-0 shadow-none"
                              onClick={() => typeof onUpdateQuantity === 'function' && onUpdateQuantity(item.id, 1)}
                            >
                              <FaPlus size={8} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="text-end">
                        <span className="fw-bold d-block mb-2" style={{ fontSize: "0.8rem" }}>
                          {currency.symbol} {convertPrice(item.numericPrice * (item.quantity || 1))}
                        </span>
                        <button 
                          type="button"
                          className="btn btn-link text-danger p-0 shadow-none"
                          onClick={() => typeof onRemoveItem === 'function' && onRemoveItem(item.id)}
                          title="Remove item"
                        >
                          <FaTrash size={12} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mb-3">
                <Button 
                  variant="outline-dark" 
                  className="w-100 rounded-0 text-uppercase py-2 fw-bold shadow-none d-flex align-items-center justify-content-center gap-2"
                  style={{ fontSize: "0.75rem", letterSpacing: "1px" }}
                  onClick={() => {
                    if (onNavigateCategory) onNavigateCategory("UNSTITCHED");
                  }}
                >
                  <FaShoppingBag size={12} /> Add More Products
                </Button>
              </div>

              <div className="d-flex justify-content-between mb-2 small">
                <span className="text-uppercase">Subtotal</span>
                <span className="fw-bold">{currency.symbol} {convertPrice(subtotalPKR)}</span>
              </div>
              <div className="d-flex justify-content-between mb-3 pb-3 border-bottom small">
                <span className="text-uppercase">Shipping</span>
                <span className="fw-bold text-uppercase">FREE</span>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="fw-bold text-uppercase" style={{ fontSize: "0.9rem" }}>Total</span>
                <div className="text-end">
                  <span className="text-muted small me-2" style={{ fontSize: "0.7rem" }}>{currency.code}</span>
                  <span className="fw-bold fs-5 text-dark">{currency.symbol} {convertPrice(totalPKR)}</span>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CheckoutPage;