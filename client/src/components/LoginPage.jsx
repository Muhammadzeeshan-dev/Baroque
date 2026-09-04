import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";

const LoginPage = ({ onLoginSuccess, onNavigateHome }) => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1: Enter Email, 2: Enter OTP
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // 1. Send OTP API Call (Port 5001 Pinned)
  const handleSendOtp = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5001/api/users/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to send OTP");
      }

      alert("OTP sent successfully! Check your backend terminal/email.");
      setStep(2); // Move to OTP verification screen
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  // 2. Verify OTP API Call (Port 5001 Pinned)
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    if (!otp) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("http://localhost:5001/api/users/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Invalid OTP code");
      }

      const userData = data.user || { email };
      onLoginSuccess(userData);
      alert("Login successful!");

      if (onNavigateHome) {
        onNavigateHome("home");
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-5" style={{ minHeight: "70vh" }}>
      <Row className="justify-content-center align-items-center">
        <Col md={6} lg={5}>
          <div className="border p-4 shadow-sm bg-white rounded-4">
            <h3 className="fw-bold text-uppercase text-center mb-4" style={{ letterSpacing: "2px" }}>
              Sign In / Register
            </h3>

            {errorMsg && (
              <div className="alert alert-danger py-2 small text-center rounded-3">
                {errorMsg}
              </div>
            )}

            {step === 1 ? (
              <Form onSubmit={handleSendOtp}>
                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Email Address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="rounded-3 py-2 bg-light border-0"
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100 rounded-3 text-uppercase py-2 fw-semibold"
                  style={{ letterSpacing: "1px" }}
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP to Email"}
                </Button>
              </Form>
            ) : (
              <Form onSubmit={handleVerifyOtp}>
                <p className="text-muted text-center small mb-3">
                  Verification code sent to <strong>{email}</strong>
                </p>

                <Form.Group className="mb-3">
                  <Form.Label className="fw-semibold">Enter OTP Code</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter OTP"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    required
                    className="rounded-3 text-center fs-4 bg-light border-0 py-2"
                    maxLength={6}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  variant="dark"
                  className="w-100 rounded-3 text-uppercase py-2 fw-semibold mb-2"
                  style={{ letterSpacing: "1px" }}
                  disabled={loading}
                >
                  {loading ? "Verifying..." : "Verify & Login"}
                </Button>

                <Button
                  type="button"
                  variant="link"
                  className="w-100 text-muted text-decoration-none small"
                  onClick={() => setStep(1)}
                >
                  Back to Email
                </Button>
              </Form>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;