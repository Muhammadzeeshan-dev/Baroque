import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProductDetailModal = ({ show, onHide, product, onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const [images, setImages] = useState([]);
  const [selectedType, setSelectedType] = useState('UNSTITCHED');
  const [quantity, setQuantity] = useState(1);

  // جب بھی نیا پروڈکٹ سلیکٹ ہو، اس کی تصاویر سیٹ ہو جائیں
  useEffect(() => {
    if (product) {
      const initialImages = [
        product.frontImage,
        product.backImage,
        product.modelImage1,
        product.modelImage2,
        product.detailImage
      ].filter(Boolean);
      
      setImages(initialImages.length > 0 ? initialImages : [product.frontImage || 'https://via.placeholder.com/400x600']);
      setQuantity(1);
      setSelectedType('UNSTITCHED');
    }
  }, [product]);

  if (!product) return null;

  // جب بائیں طرف کسی تھمب نیل پر کلک ہو تو وہ تصویر سب سے اوپر آجائے
  const handleThumbnailClick = (index) => {
    const clickedImage = images[index];
    const updatedImages = [
      clickedImage,
      ...images.filter((_, i) => i !== index)
    ];
    setImages(updatedImages);
  };

  const isWishlisted = wishlist.some((item) => item.id === product.id);

  return (
    <Modal show={show} onHide={onHide} centered size="xl" className="product-detail-modal">
      <Modal.Header closeButton className="border-0 pb-0" />
      <Modal.Body className="px-4 pb-5">
        <div className="row">
          
          {/* Left Side: Thumbnail Column + Main Large Image */}
          <div className="col-lg-7">
            <div className="row g-2">
              <div className="col-3 d-flex flex-column gap-2" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                {images.map((img, index) => (
                  <div 
                    key={index} 
                    onClick={() => handleThumbnailClick(index)}
                    style={{ 
                      cursor: 'pointer', 
                      border: index === 0 ? '2px solid #000' : '1px solid #ddd',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <img src={img} alt={`Thumbnail ${index}`} className="img-fluid w-100" style={{ height: '90px', objectFit: 'cover' }} />
                  </div>
                ))}
              </div>

              <div className="col-9">
                <div className="position-relative">
                  <img 
                    src={images[0]} 
                    alt={product.title} 
                    className="img-fluid w-100" 
                    style={{ maxHeight: '600px', objectFit: 'cover' }} 
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Product Info & Functional Controls */}
          <div className="col-lg-5 d-flex flex-column ps-lg-4 mt-4 mt-lg-0">
            <h3 className="fw-bold text-uppercase fs-5 mb-2" style={{ letterSpacing: '1px' }}>
              {product.title}
            </h3>

            <div className="d-flex align-items-center gap-3 mb-3">
              <span className="text-danger fw-bold fs-5">{product.price}</span>
              {product.originalPrice && (
                <span className="text-muted text-decoration-line-through fs-6">{product.originalPrice}</span>
              )}
            </div>

            <p className="text-muted small mb-4">
              {product.sku || "SKU: BAR-EID-26"} | PRINTED & EMBROIDERED
            </p>

            {/* Type Selection */}
            <div className="mb-4">
              <label className="fw-bold text-uppercase small mb-2" style={{ letterSpacing: '1px' }}>
                Type: <span className="text-muted fw-normal">{selectedType}</span>
              </label>
              <div className="d-flex gap-2">
                <button 
                  className={`btn rounded-0 px-4 py-2 text-uppercase fw-semibold fs-7 ${selectedType === 'UNSTITCHED' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setSelectedType('UNSTITCHED')}
                  style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
                >
                  Unstitched
                </button>
                <button 
                  className={`btn rounded-0 px-4 py-2 text-uppercase fw-semibold fs-7 ${selectedType === 'STITCHED' ? 'btn-dark' : 'btn-outline-dark'}`}
                  onClick={() => setSelectedType('STITCHED')}
                  style={{ fontSize: '0.75rem', letterSpacing: '1.5px' }}
                >
                  Stitched
                </button>
              </div>
            </div>

            {/* Quantity and Add to Cart Row */}
            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="d-flex align-items-center border border-dark">
                <button 
                  className="btn rounded-0 px-3 py-2 border-0 bg-transparent"
                  onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                >
                  -
                </button>
                <span className="px-3 fw-semibold">{quantity}</span>
                <button 
                  className="btn rounded-0 px-3 py-2 border-0 bg-transparent"
                  onClick={() => setQuantity(prev => prev + 1)}
                >
                  +
                </button>
              </div>

              <Button 
                variant="dark" 
                className="flex-grow-1 rounded-0 py-3 text-uppercase fw-bold" 
                style={{ fontSize: '0.8rem', letterSpacing: '1.5px' }}
                onClick={() => {
                  onAddToCart({ ...product, type: selectedType, quantity, frontImage: images[0] });
                  onHide();
                }}
              >
                Add To Cart
              </Button>

              <button 
                className="btn btn-outline-dark rounded-0 p-3 d-flex align-items-center justify-content-center"
                onClick={() => onAddToWishlist(product)}
                title="Wishlist"
              >
                {isWishlisted ? <FaHeart className="text-danger" size={18} /> : <FaRegHeart size={18} />}
              </button>
            </div>

            <div className="mt-auto border-top pt-3">
              <span className="fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>Product Details</span>
              <p className="text-muted small mt-2 mb-0">
                {product.description || "A stunning design exquisitely crafted with intricate embroidery and rich details, perfect for your festive wardrobe."}
              </p>
            </div>

          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ProductDetailModal;