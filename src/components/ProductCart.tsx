import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, Link } from 'react-router-dom'
import type { AppDispatch, RootState } from '../app/store';
import { addItemToCart } from '../features/cart';
import './ProductCart.css';

const ProductCart = () => {
    const { id } = useParams();
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const product = useSelector((state: RootState) =>
        state.products.products.find((item) => item.id === Number(id))
    );
    const { totalQuantity } = useSelector((state: RootState) => state.cart);

    if (!product) {
        return (
            <div className="product-not-found">
                <div className="container">
                    <div className="not-found-content">
                        <span className="not-found-icon">😕</span>
                        <h2>Product Not Found</h2>
                        <p>Sorry, we couldn't find the product you're looking for.</p>
                        <Link to="/">
                            <button className="btn-primary">Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const handleAddToCart = () => {
        dispatch(addItemToCart(product));
        navigate("/cart");
    };

    return (
        <div className="product-detail-container">
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <span className="logo-icon">🛒</span>
                            <span className="logo-text">FreshMart</span>
                        </div>
                        <nav className="nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/cart" className="cart-btn">
                                <span className="cart-icon">🛍️</span>
                                Cart
                                {totalQuantity > 0 && (
                                    <span className="cart-badge">{totalQuantity}</span>
                                )}
                            </Link>
                        </nav>
                    </div>
                </div>
            </header>

            <div className="breadcrumb">
                <div className="container">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Product Details</span>
                </div>
            </div>

            <section className="product-detail-section">
                <div className="container">
                    <div className="product-detail-grid">
                        <div className="product-image-section">
                            <div className="main-image-wrapper">
                                <img 
                                    src={product.img} 
                                    alt={product.name}
                                    className="main-product-image"
                                />
                                <div className="image-badge">Fresh</div>
                            </div>
                        </div>

                        <div className="product-info-section">
                            <h1 className="product-detail-name">{product.name}</h1>
                            
                            <div className="product-rating">
                                <div className="stars">
                                    ⭐⭐⭐⭐⭐
                                </div>
                                <span className="rating-text">(4.8 / 5.0)</span>
                            </div>

                            <div className="price-section">
                                <span className="current-price">
                                    PKR {product.price.toLocaleString()}
                                </span>
                                <span className="original-price">
                                    PKR {(product.price * 1.2).toLocaleString()}
                                </span>
                                <span className="discount-badge">20% OFF</span>
                            </div>

                            <div className="product-features">
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>100% Fresh & Organic</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Fast Delivery</span>
                                </div>
                                <div className="feature-item">
                                    <span className="feature-icon">✓</span>
                                    <span>Easy Returns</span>
                                </div>
                            </div>

                            <div className="product-description">
                                <h3>Product Description</h3>
                                <p>
                                    Experience premium quality with our fresh {product.name}. 
                                    Carefully sourced and delivered fresh to your doorstep. 
                                    Perfect for your daily needs with guaranteed freshness.
                                </p>
                            </div>

                            <div className="action-buttons">
                                <button 
                                    className="btn-add-to-cart"
                                    onClick={handleAddToCart}
                                >
                                    <span className="btn-icon">🛒</span>
                                    Add to Cart
                                </button>
                                <button 
                                    className="btn-buy-now"
                                    onClick={handleAddToCart}
                                >
                                    Buy Now →
                                </button>
                            </div>

                            <div className="additional-info">
                                <div className="info-item">
                                    <span className="info-label">📦 Delivery:</span>
                                    <span>Within 2-3 hours</span>
                                </div>
                                <div className="info-item">
                                    <span className="info-label">💳 Payment:</span>
                                    <span>Cash on Delivery Available</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container" >
                    <p> © 2025 FreshMart. Made with ❤️</p>
                </div>
            </footer>
        </div>
    );
}

export default ProductCart;