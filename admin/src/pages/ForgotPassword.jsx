import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Spinner, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft } from 'react-icons/fa';
import api from '../api/axiosConfig';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/forgot-password', { email });
      setSuccess('OTP sent to your email!');
      setStep(2);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/auth/reset-password', { email, otp, newPassword });
      setSuccess('Password reset successfully! Redirecting...');
      setTimeout(() => window.location.href = '/login', 2000);
    } catch (err) {
      setError(err.response?.data?.message || 'Reset failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <Card className="shadow-lg border-0" style={{ borderRadius: '20px' }}>
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <h2 className="fw-bold">{step === 1 ? 'Forgot Password' : 'Reset Password'}</h2>
                  <p className="text-muted">{step === 1 ? 'Enter your email to receive an OTP' : 'Enter OTP and new password'}</p>
                </div>
                {error && <Alert variant="danger">{error}</Alert>}
                {success && <Alert variant="success">{success}</Alert>}

                {step === 1 ? (
                  <Form onSubmit={handleSendOtp}>
                    <Form.Group className="mb-4">
                      <Form.Label>Email</Form.Label>
                      <div className="position-relative">
                        <FaEnvelope className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
                        <Form.Control
                          type="email"
                          placeholder="Enter your email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          className="ps-5 py-3"
                          required
                        />
                      </div>
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100 py-3" disabled={loading}>
                      {loading ? <Spinner size="sm" animation="border" /> : 'Send OTP'}
                    </Button>
                    <div className="text-center mt-3">
                      <Link to="/login" className="text-decoration-none"><FaArrowLeft className="me-1" /> Back to Login</Link>
                    </div>
                  </Form>
                ) : (
                  <Form onSubmit={handleReset}>
                    <Form.Group className="mb-3">
                      <Form.Label>OTP Code</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter 6-digit OTP"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        maxLength={6}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-3">
                      <Form.Label>New Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New password (min 6 chars)"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Form.Group className="mb-4">
                      <Form.Label>Confirm Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Confirm new password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                      />
                    </Form.Group>
                    <Button type="submit" variant="primary" className="w-100 py-3" disabled={loading}>
                      {loading ? <Spinner size="sm" animation="border" /> : 'Reset Password'}
                    </Button>
                    <div className="text-center mt-3">
                      <Button variant="link" className="text-decoration-none p-0" onClick={() => { setStep(1); setError(''); setSuccess(''); }}>
                        <FaArrowLeft className="me-1" /> Resend OTP
                      </Button>
                    </div>
                  </Form>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;