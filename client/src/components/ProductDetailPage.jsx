import React, { useState } from 'react';
import { Button } from 'react-bootstrap';

const ProductDetailPage = ({ product, onAddToCart, onAddToWishlist, wishlist = [] }) => {
  const currentProduct = product || {
    id: 1,
    title: "EMBROIDERED LAWN UF-416",
    price: "PKR 9,950.00",
    originalPrice: "PKR 11,500.00",
    images: [
      "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=600",
      "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=600",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=600",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=600"
    ],
    description: "A stunning design exquisitely crafted with intricate embroidery and rich details, perfect for your festive wardrobe."
  };

  const [images, setImages] = useState(currentProduct.images || [currentProduct.frontImage, currentProduct.backImage].filter(Boolean));
  const [selectedType, setSelectedType] = useState('UNSTITCHED');
  const [quantity, setQuantity] = useState(1);

  // جب بائیں طرف کی کسی تصویر پر کلک ہو تو وہ اوپر مین امیج بن جائے گی
  const handleThumbnailClick = (index) => {
    const clickedImage = images[index];
    const updatedImages = [
      clickedImage,
      ...images.filter((_, i) => i !== index)
    ];
    setImages(updatedImages);
  };

  const isWishlisted = wishlist.some((item) => item.id === currentProduct.id);

  return (
    <div className="container py-5">
      <div className="row">
        
        {/* Left Side: Thumbnails + Main Large Image */}
        <div className="col-lg-7">
          <div className="row g-2">
            
            {/* Vertical Thumbnails Column */}
            <div className="col-3 d-flex flex-column gap-2" style={{ maxHeight: '650px', overflowY: 'auto' }}>
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
                  <img 
                    src={img} 
                    alt={`Thumbnail ${index}`} 
                    className="img-fluid w-100" 
                    style={{ height: '95px', objectFit: 'cover' }} 
                  />
                </div>
              ))}
            </div>

            {/* Main Featured Image Column */}
            <div className="col-9">
              <div className="position-relative">
                <img 
                  src={images[0]} 
                  alt={currentProduct.title} 
                  className="img-fluid w-100 shadow-sm" 
                  style={{ maxHeight: '650px', objectFit: 'cover' }} 
                />
              </div>
            </div>

          </div>
        </div>

        {/* Right Side: Product Info & Fully Functional Controls */}
        <div className="col-lg-5 d-flex flex-column ps-lg-5 mt-4 mt-lg-0">
          <h2 className="fw-bold text-uppercase fs-4 mb-2" style={{ letterSpacing: '1px' }}>
            {currentProduct.title}
          </h2>

          <div className="d-flex align-items-center gap-3 mb-3">
            <span className="text-danger fw-bold fs-4">{currentProduct.price}</span>
            {currentProduct.originalPrice && (
              <span className="text-muted text-decoration-line-through fs-6">{currentProduct.originalPrice}</span>
            )}
          </div>

          <p className="text-muted small mb-4">
            SKU: BAR-EID-26 | PRINTED & EMBROIDERED LAWN
          </p>

          {/* Type Selection (UNSTITCHED / STITCHED) */}
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
                style={{ fontSize: '0.75rem', letterSpacing: '1px' }}
              >
                Stitched
              </button>
            </div>
          </div>

          {/* Quantity Counter & Add to Cart Row */}
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
                onAddToCart({ ...currentProduct, type: selectedType, quantity, frontImage: images[0] });
              }}
            >
              Add To Cart
            </Button>

            <button 
              className="btn btn-outline-dark rounded-0 p-3 d-flex align-items-center justify-content-center"
              onClick={() => onAddToWishlist(currentProduct)}
              title="Wishlist"
            >
              {isWishlisted ? (
                <span className="text-danger fw-bold fs-5">♥</span>
              ) : (
                <span className="fs-5">♡</span>
              )}
            </button>
          </div>

          <div className="mt-4 border-top pt-3">
            <span className="fw-bold text-uppercase small" style={{ letterSpacing: '1px' }}>Product Details</span>
            <p className="text-muted small mt-2">
              {currentProduct.description}
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProductDetailPage;