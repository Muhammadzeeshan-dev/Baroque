import React, { useState, useEffect, useCallback } from 'react';
import { Table, Button, Spinner, Alert, Badge, Form, Pagination } from 'react-bootstrap';
import { FaEye, FaEdit, FaTrash, FaToggleOn, FaToggleOff } from 'react-icons/fa';
import api from '../api/axiosConfig';
import EditProductModal from './EditProductModal';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIds, setSelectedIds] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 10;

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/products');
      let data = Array.isArray(res.data) ? res.data : [];
      if (searchTerm.trim()) {
        const term = searchTerm.toLowerCase();
        data = data.filter(p =>
          p.name.toLowerCase().includes(term) ||
          (p.category && p.category.toLowerCase().includes(term))
        );
      }
      setTotalPages(Math.max(1, Math.ceil(data.length / itemsPerPage)));
      const start = (currentPage - 1) * itemsPerPage;
      const paginated = data.slice(start, start + itemsPerPage);
      setProducts(paginated);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch products');
    } finally {
      setLoading(false);
    }
  }, [searchTerm, currentPage]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this product?')) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      setSelectedIds(prev => prev.filter(i => i !== id));
    } catch (err) {
      alert('Delete failed: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleBulkDelete = async () => {
    if (selectedIds.length === 0) return;
    if (!window.confirm(`Delete ${selectedIds.length} selected products?`)) return;
    try {
      await Promise.all(selectedIds.map(id => api.delete(`/admin/products/${id}`)));
      setProducts(prev => prev.filter(p => !selectedIds.includes(p._id)));
      setSelectedIds([]);
    } catch (err) {
      alert('Bulk delete failed');
    }
  };

  const handleToggleVisibility = async (id, currentStatus) => {
    try {
      const newStatus = !currentStatus;
      await api.patch(`/admin/products/${id}/visibility`, { isVisible: newStatus });
      setProducts(prev =>
        prev.map(p => p._id === id ? { ...p, isVisible: newStatus } : p)
      );
    } catch (err) {
      alert('Toggle failed');
    }
  };

  const handleEdit = (product = null) => {
    setEditingProduct(product);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingProduct(null);
  };

  const handleProductSaved = (saved) => {
    if (editingProduct) {
      setProducts(prev => prev.map(p => p._id === saved._id ? saved : p));
    } else {
      setProducts(prev => [saved, ...prev]);
    }
    handleModalClose();
  };

  const formatPrice = (price) => {
    if (typeof price !== 'number' || isNaN(price)) return 'N/A';
    return price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
  };

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedIds(products.map(p => p._id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id) => {
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const goToPage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setCurrentPage(1);
  };

  if (loading) return <Spinner animation="border" />;
  if (error) return <Alert variant="danger">{error}</Alert>;

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
        <h3>Products</h3>
        <div className="d-flex gap-2">
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '250px' }}
          />
          <Button variant="outline-secondary" onClick={clearFilters}>Clear</Button>
          <Button variant="primary" onClick={() => handleEdit(null)}>+ Add</Button>
          {selectedIds.length > 0 && (
            <Button variant="danger" onClick={handleBulkDelete}>
              Delete Selected ({selectedIds.length})
            </Button>
          )}
        </div>
      </div>

      {products.length === 0 ? (
        <Alert variant="info">No products found. Try adjusting search.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th><Form.Check type="checkbox" onChange={handleSelectAll} /></th>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Discount</th>
                <th>Final</th>
                <th>Category</th>
                <th>Stock</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p, idx) => {
                const final = p.price - (p.price * (p.discount || 0) / 100);
                return (
                  <tr key={p._id}>
                    <td><Form.Check type="checkbox" checked={selectedIds.includes(p._id)} onChange={() => handleSelectOne(p._id)} /></td>
                    <td>{(currentPage - 1) * itemsPerPage + idx + 1}</td>
                    <td><img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover' }} /></td>
                    <td>{p.name}</td>
                    <td>{formatPrice(p.price)}</td>
                    <td>{p.discount ?? 0}%</td>
                    <td>{formatPrice(final)}</td>
                    <td>{p.category || 'N/A'}</td>
                    <td><Badge bg={p.stock > 0 ? 'success' : 'danger'}>{p.stock ?? 0}</Badge></td>
                    <td>
                      <Badge bg={p.isVisible ? 'success' : 'secondary'}>
                        {p.isVisible ? 'Visible' : 'Hidden'}
                      </Badge>
                    </td>
                    <td>
                      <Button variant="outline-info" size="sm" className="me-1" onClick={() => window.open(`/product/${p._id}`, '_blank')}>
                        <FaEye />
                      </Button>
                      <Button variant="outline-primary" size="sm" className="me-1" onClick={() => handleEdit(p)}>
                        <FaEdit />
                      </Button>
                      <Button variant="outline-warning" size="sm" className="me-1" onClick={() => handleToggleVisibility(p._id, p.isVisible)}>
                        {p.isVisible ? <FaToggleOn /> : <FaToggleOff />}
                      </Button>
                      <Button variant="outline-danger" size="sm" onClick={() => handleDelete(p._id)}>
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
          <Pagination>
            <Pagination.Prev onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1} />
            {[...Array(totalPages).keys()].map(page => (
              <Pagination.Item key={page + 1} active={page + 1 === currentPage} onClick={() => goToPage(page + 1)}>
                {page + 1}
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages} />
          </Pagination>
        </>
      )}

      <EditProductModal
        show={showModal}
        onHide={handleModalClose}
        product={editingProduct}
        onSave={handleProductSaved}
      />
    </>
  );
};

export default ProductList;