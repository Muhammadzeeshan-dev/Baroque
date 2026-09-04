import React from 'react';
import { Nav, Badge } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaTachometerAlt, FaShoppingCart, FaUsers, FaSignOutAlt } from 'react-icons/fa';

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="bg-dark text-white vh-100 p-3" style={{ width: '220px', position: 'fixed', top: 0, left: 0, zIndex: 1000 }}>
      <h4 className="mb-4 text-uppercase fw-bold" style={{ letterSpacing: '2px', fontSize: '1rem' }}>Admin Panel</h4>
      <Nav className="flex-column">
        <Nav.Link as={NavLink} to="/" className="text-white py-2 px-3 rounded-1 mb-1" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
          <FaTachometerAlt className="me-2" /> Dashboard
        </Nav.Link>
        {/* Products link removed */}
        <Nav.Link as={NavLink} to="/orders" className="text-white py-2 px-3 rounded-1 mb-1">
          <FaShoppingCart className="me-2" /> Orders
          <Badge bg="primary" className="ms-2">3</Badge>
        </Nav.Link>
        <Nav.Link as={NavLink} to="/users" className="text-white py-2 px-3 rounded-1 mb-1">
          <FaUsers className="me-2" /> Users
        </Nav.Link>
        <hr className="my-3 border-secondary" />
        <Nav.Link onClick={handleLogout} className="text-white py-2 px-3 rounded-1" style={{ cursor: 'pointer' }}>
          <FaSignOutAlt className="me-2" /> Logout
        </Nav.Link>
      </Nav>
    </div>
  );
};

export default Sidebar;