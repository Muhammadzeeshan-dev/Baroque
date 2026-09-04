import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { FaShoppingBag, FaShoppingCart, FaUsers, FaDollarSign, FaArrowUp, FaBoxOpen } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import api from '../api/axiosConfig';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    products: 0,
    orders: 0,
    users: 0,
    revenue: 0,
    recentOrders: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, ordersRes, usersRes] = await Promise.all([
          api.get('/products'),
          api.get('/orders'),
          api.get('/users'),
        ]);

        const products = productsRes.data || [];
        const orders = ordersRes.data || [];
        const users = usersRes.data || [];

        const totalRevenue = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
        const recentOrders = orders.slice(0, 5);

        setStats({
          products: products.length,
          orders: orders.length,
          users: users.length,
          revenue: totalRevenue,
          recentOrders,
        });
      } catch (err) {
        setError('Failed to load dashboard data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '50vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <div>
      {/* Stats Cards */}
      <Row className="g-4 mb-4">
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => navigate('/products')}>
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(102, 126, 234, 0.15)' }}>
                <FaShoppingBag size={28} color="#667eea" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Products</h6>
                <h3 className="mb-0 fw-bold">{stats.products}</h3>
                <small className="text-success"><FaArrowUp /> Active</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(118, 75, 162, 0.15)' }}>
                <FaShoppingCart size={28} color="#764ba2" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Orders</h6>
                <h3 className="mb-0 fw-bold">{stats.orders}</h3>
                <small className="text-success"><FaArrowUp /> Total</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => navigate('/users')}>
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(240, 147, 251, 0.15)' }}>
                <FaUsers size={28} color="#f093fb" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Users</h6>
                <h3 className="mb-0 fw-bold">{stats.users}</h3>
                <small className="text-success"><FaArrowUp /> Active</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="border-0 shadow-sm h-100 cursor-pointer" style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle p-3 me-3" style={{ background: 'rgba(46, 213, 115, 0.15)' }}>
                <FaDollarSign size={28} color="#2ed573" />
              </div>
              <div>
                <h6 className="text-muted mb-1">Revenue</h6>
                <h3 className="mb-0 fw-bold">PKR {stats.revenue.toLocaleString()}</h3>
                <small className="text-success"><FaArrowUp /> Total</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Orders & Quick Actions */}
      <Row className="g-4">
        <Col lg={8}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h6 className="fw-bold mb-0">Recent Orders</h6>
                <Button variant="link" className="text-decoration-none" onClick={() => navigate('/orders')}>View All</Button>
              </div>
              {stats.recentOrders.length === 0 ? (
                <p className="text-muted text-center py-3">No recent orders</p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover mb-0">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Amount</th>
                        <th>Status</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stats.recentOrders.map(order => (
                        <tr key={order._id} style={{ cursor: 'pointer' }} onClick={() => navigate('/orders')}>
                          <td><code>#{order._id.slice(-6)}</code></td>
                          <td>{order.userEmail || 'Guest'}</td>
                          <td>PKR {order.totalAmount?.toLocaleString() || '0'}</td>
                          <td>
                            <Badge bg={
                              order.orderStatus === 'Delivered' ? 'success' :
                              order.orderStatus === 'Cancelled' ? 'danger' :
                              order.orderStatus === 'Confirmed' ? 'primary' :
                              'warning'
                            }>
                              {order.orderStatus || 'Pending'}
                            </Badge>
                          </td>
                          <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col lg={4}>
          <Card className="border-0 shadow-sm">
            <Card.Body>
              <h6 className="fw-bold mb-3">Quick Actions</h6>
              <div className="d-grid gap-2">
                <Button variant="outline-primary" onClick={() => navigate('/products')}>
                  <FaBoxOpen className="me-2" /> Add Product
                </Button>
                <Button variant="outline-success" onClick={() => navigate('/orders')}>
                  <FaShoppingCart className="me-2" /> View Orders
                </Button>
                <Button variant="outline-info" onClick={() => navigate('/users')}>
                  <FaUsers className="me-2" /> Manage Users
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;