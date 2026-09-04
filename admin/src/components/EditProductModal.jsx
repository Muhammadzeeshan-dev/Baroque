import React, { useState, useEffect } from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';
import api from '../api/axiosConfig';

const EditProductModal = ({ show, onHide, product, onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    discount: '',
    category: '',
    stock: '',
    description: '',
    isVisible: true,
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const isEditing = !!product;

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name || '',
        price: product.price ?? '',
        discount: product.discount ?? '',
        category: product.category || '',
        stock: product.stock ?? '',
        description: product.description || '',
        isVisible: product.isVisible !== undefined ? product.isVisible : true,
        image: null,
      });
      setImagePreview(product.image || null);
    } else {
      setFormData({
        name: '',
        price: '',
        discount: '',
        category: '',
        stock: '',
        description: '',
        isVisible: true,
        image: null,
      });
      setImagePreview(null);
    }
    setError(null);
  }, [product]);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;
    if (name === 'image') {
      const file = files?.[0] || null;
      setFormData(prev => ({ ...prev, image: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setImagePreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setImagePreview(product?.image || null);
      }
    } else if (type === 'checkbox') {
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('price', formData.price);
      data.append('discount', formData.discount);
      data.append('category', formData.category);
      data.append('stock', formData.stock);
      data.append('description', formData.description);
      data.append('isVisible', formData.isVisible);
      if (formData.image) data.append('image', formData.image);

      const url = isEditing ? `/admin/products/${product._id}` : '/admin/products';
      const method = isEditing ? 'put' : 'post';
      const res = await api[method](url, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onSave(res.data.product || res.data.updatedProduct);
    } catch (err) {
      setError(err.response?.data?.message || 'Save failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{isEditing ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control type="text" name="name" value={formData.name} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control type="number" step="0.01" name="price" value={formData.price} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Discount (%)</Form.Label>
            <Form.Control type="number" step="0.1" name="discount" value={formData.discount} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Category</Form.Label>
            <Form.Control type="text" name="category" value={formData.category} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Stock</Form.Label>
            <Form.Control type="number" name="stock" value={formData.stock} onChange={handleChange} required />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control as="textarea" rows={3} name="description" value={formData.description} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Visible on Frontend"
              name="isVisible"
              checked={formData.isVisible}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" name="image" accept="image/*" onChange={handleChange} />
            {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2" style={{ maxHeight: '150px' }} />}
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onHide} disabled={loading}>Cancel</Button>
          <Button variant="primary" type="submit" disabled={loading}>
            {loading ? <Spinner size="sm" animation="border" /> : 'Save'}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default EditProductModal;