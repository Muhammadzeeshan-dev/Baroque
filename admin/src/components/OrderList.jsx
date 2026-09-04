import React, { useState, useEffect, useCallback } from 'react';
import { Table, Badge, Spinner, Alert, Button, Form } from 'react-bootstrap';
import api from '../api/axiosConfig';

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState('All');

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/orders');
      let data = Array.isArray(res.data) ? res.data : [];
      if (filterStatus !== 'All') {
        data = data.filter(order => order.orderStatus === filterStatus);
      }
      setOrders(data);
    } catch (err) {
      setError('Failed to load orders');
    } finally {
      setLoading(false);
    }
  }, [filterStatus]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateStatus = async (id, status) => {
    try {
      await api.patch(`/orders/${id}/status`, { status });
      setOrders(prev => prev.map(o => o._id === id ? { ...o, orderStatus: status } : o));
    } catch (err) {
      alert('Status update failed: ' + (err.response?.data?.message || err.message));
    }
  };

  // 🔥 Clear All Orders
  const clearAllOrders = async () => {
    if (!window.confirm('⚠️ Are you sure you want to DELETE ALL orders? This action cannot be undone.')) return;
    try {
      await api.delete('/orders/all'); // we'll add this backend endpoint
      setOrders([]);
      alert('All orders cleared successfully.');
    } catch (err) {
      alert('Failed to clear orders: ' + (err.response?.data?.message || err.message));
    }
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h3>Orders</h3>
        <div className="d-flex gap-2">
          <Form.Select
            style={{ width: '200px' }}
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Orders</option>
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Form.Select>
          {orders.length > 0 && (
            <Button variant="danger" onClick={clearAllOrders}>
              Clear All Orders
            </Button>
          )}
        </div>
      </div>

      {orders.length === 0 ? (
        <Alert variant="info">No orders found.</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order._id}>
                <td><code>#{order._id.slice(-6)}</code></td>
                <td>{order.userEmail || 'Guest'}</td>
                <td>{order.orderItems?.length || 0}</td>
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
                <td>
                  {order.orderStatus === 'Pending' && (
                    <>
                      <Button size="sm" variant="outline-success" onClick={() => updateStatus(order._id, 'Confirmed')}>
                        Confirm
                      </Button>
                      <Button size="sm" variant="outline-danger" className="ms-1" onClick={() => updateStatus(order._id, 'Cancelled')}>
                        Cancel
                      </Button>
                    </>
                  )}
                  {order.orderStatus === 'Confirmed' && (
                    <Button size="sm" variant="outline-success" onClick={() => updateStatus(order._id, 'Delivered')}>
                      Deliver
                    </Button>
                  )}
                  {order.orderStatus === 'Delivered' && (
                    <Badge bg="secondary">Completed</Badge>
                  )}
                  {order.orderStatus === 'Cancelled' && (
                    <Badge bg="secondary">Cancelled</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderList;