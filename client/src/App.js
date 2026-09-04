import React, { useState } from "react";
import { CurrencyProvider } from "./context/CurrencyContext";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import CollectionPage from "./components/CollectionPage";
import HeroBanner from "./components/home/HeroBanner";
import EidLawn from "./components/home/EidLawn";
import ReadyToWear from "./components/home/ReadyToWear";
import ChantelleCollection from "./components/home/ChantelleCollection";
import Essentials from "./components/home/Essentials";
import ProductDetailPage from "./components/ProductDetailPage";
import CheckoutPage from "./components/CheckoutPage";
import LoginPage from "./components/LoginPage";
import { CartDrawer, WishlistDrawer } from "./components/CartDrawer";
import "./App.css";

function App() {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedCategory, setSelectedCategory] = useState("UNSTITCHED");
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const [showCartDrawer, setShowCartDrawer] = useState(false);
  const [showWishlistDrawer, setShowWishlistDrawer] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ========== STATIC PRODUCT DATA ==========
  const allProductsPool = [
    {
      id: 1,
      title: "EMBROIDERED LAWN UF-532",
      category: "SUMMER",
      fabric: "Lawn",
      numericPrice: 4462.5,
      oldNumericPrice: 5950.0,
      discount: "-25%",
      inStock: true,
      frontImage: "/images/p1-1.webp",
      backImage: "/images/p1-2.jpg",
      type: "Unstitched",
      pieces: "3 PIECE",
      description:
        "A stunning design exquisitely crafted with intricate embroidery.",
      images: ["/images/p1-1.webp", "/images/p1-2.jpg"],
    },
    {
      id: 2,
      title: "EMBROIDERED LAWN UF-4411",
      category: "SUMMER",
      fabric: "Lawn",
      numericPrice: 5970.0,
      oldNumericPrice: 7970.0,
      discount: "-25%",
      inStock: true,
      frontImage: "/images/p2-1.jpg",
      backImage: "/images/p2-2.jpg",
      type: "Unstitched",
      pieces: "3 PIECE",
      description: "Premium quality lawn fabric featuring stunning prints.",
      images: ["/images/p2-1.jpg", "/images/p2-2.jpg"],
    },
    {
      id: 3,
      title: "EMBROIDERED CHIFFON UF-4483",
      category: "FORMAL",
      fabric: "Chiffon",
      numericPrice: 12500.0,
      oldNumericPrice: 15500.0,
      discount: "-20%",
      inStock: true,
      frontImage: "/images/p3-1.jpg",
      backImage: "/images/p3-2.jpg",
      type: "Stitched",
      pieces: "3 PIECE",
      description: "Elegant chiffon outfit designed for formal occasions.",
      images: ["/images/p3-1.jpg", "/images/p3-2.jpg"],
    },
    {
      id: 4,
      title: "PRINTED LAWN UF-4484",
      category: "SUMMER",
      fabric: "Lawn",
      numericPrice: 6490.0,
      oldNumericPrice: 8490.0,
      discount: "-25%",
      inStock: true,
      frontImage: "/images/p4-1.jpg",
      backImage: "/images/p4-2.jpg",
      type: "Unstitched",
      pieces: "3 PIECE",
      description: "Daily wear printed lawn suit offering absolute comfort.",
      images: ["/images/p4-1.jpg", "/images/p4-2.jpg"],
    },
  ];

  // ========== HANDLERS ==========
  const handleNavigateCategory = (catName) => {
    setSelectedCategory(catName || "UNSTITCHED");
    setCurrentPage("collection");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setCurrentPage("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleAddToCart = (product, quantity = 1, type = "UNSTITCHED") => {
    setCart((prev) => {
      const exists = prev.find(
        (item) => item.id === product.id && item.type === type,
      );
      if (exists) {
        return prev.map((item) =>
          item.id === product.id && item.type === type
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [
        ...prev,
        { ...product, quantity: quantity || 1, type: type || "UNSTITCHED" },
      ];
    });
    setShowCartDrawer(true);
  };

  const handleUpdateCartQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = (item.quantity || 1) + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean),
    );
  };

  const handleRemoveCartItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleToggleWishlist = (product) => {
    if (!currentUser) {
      alert("Please sign in first to add items to your wishlist.");
      setCurrentPage("login");
      return;
    }
    setWishlist((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) return prev.filter((item) => item.id !== product.id);
      return [...prev, product];
    });
  };

  const handleRemoveFromWishlist = (id) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const handleViewDetails = (product) => handleProductClick(product);

  return (
    <CurrencyProvider>
      <div className="bg-white text-dark min-vh-100 d-flex flex-column">
        <Navbar
          setCurrentPage={setCurrentPage}
          onNavigateCategory={handleNavigateCategory}
          cart={cart}
          wishlist={wishlist}
          allProducts={allProductsPool}
          onRemoveFromWishlist={handleRemoveFromWishlist}
          onAddToCart={handleAddToCart}
          onViewDetails={handleViewDetails}
          onProductClick={handleProductClick}
          onToggleWishlist={handleToggleWishlist}
          onOpenCart={() => setShowCartDrawer(true)}
          onOpenWishlist={() => {
            if (!currentUser) {
              alert("Please sign in first to view your wishlist.");
              setCurrentPage("login");
            } else {
              setShowWishlistDrawer(true);
            }
          }}
          currentUser={currentUser}
        />

        <main className="flex-grow-1">
          {currentPage === "home" && (
            <div>
              <HeroBanner onNavigateToCollection={handleNavigateCategory} />

              <EidLawn
                onNavigateToCollection={() =>
                  handleNavigateCategory("EID LAWN")
                }
                onProductClick={handleProductClick}
              />

              <ReadyToWear
                onNavigateToCollection={() =>
                  handleNavigateCategory("READY TO WEAR")
                }
                onProductClick={handleProductClick}
                products={allProductsPool.filter(
                  (p) => p.category === "READY TO WEAR",
                )}
              />

              <ChantelleCollection
                onNavigateToCollection={() =>
                  handleNavigateCategory("CHANTELLE")
                }
                onProductClick={handleProductClick}
                products={allProductsPool.filter(
                  (p) => p.category === "CHANTELLE",
                )}
              />

              <Essentials
                onNavigateToCollection={() =>
                  handleNavigateCategory("ESSENTIALS")
                }
                onProductClick={handleProductClick}
                products={allProductsPool.filter(
                  (p) =>
                    p.category === "ESSENTIALS" ||
                    p.category === "DUPATTAS" ||
                    p.category === "ENSEMBLES",
                )}
              />
            </div>
          )}

          {currentPage === "collection" && (
            <CollectionPage
              categoryName={selectedCategory}
              onAddToCart={handleAddToCart}
              onToggleWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onProductClick={handleProductClick}
              products={allProductsPool}
            />
          )}

          {currentPage === "detail" && (
            <ProductDetailPage
              product={selectedProduct}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleToggleWishlist}
              wishlist={wishlist}
              onProductClick={handleProductClick}
            />
          )}

          {currentPage === "checkout" && (
            <CheckoutPage
              cart={cart}
              currentUser={currentUser}
              onUpdateQuantity={handleUpdateCartQuantity}
              onRemoveItem={handleRemoveCartItem}
              onNavigateCategory={handleNavigateCategory}
              onCompleteOrder={() => setCart([])}
            />
          )}

          {currentPage === "login" && (
            <LoginPage
              onLoginSuccess={(user) => setCurrentUser(user)}
              onNavigateHome={setCurrentPage}
            />
          )}
        </main>

        <CartDrawer
          show={showCartDrawer}
          onHide={() => setShowCartDrawer(false)}
          cartItems={cart}
          onUpdateQuantity={handleUpdateCartQuantity}
          onRemoveItem={handleRemoveCartItem}
          onProceedToCheckout={() => {
            setShowCartDrawer(false);
            setCurrentPage("checkout");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />

        <WishlistDrawer
          show={showWishlistDrawer}
          onHide={() => setShowWishlistDrawer(false)}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
          onAddToCart={handleAddToCart}
        />

        <Footer />
      </div>
    </CurrencyProvider>
  );
}

export default App;
