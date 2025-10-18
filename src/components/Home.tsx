import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/Product";
import { addItemToCart } from "../features/cart";
import { Link } from "react-router-dom";
import type { RootState, AppDispatch } from "../app/store";
import "./Home.css";

type Product = {
    id: number;
    name: string;
    price: number;
    img: string;
};

const Home = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { products, loading, error } = useSelector(
        (state: RootState) => state.products
    );
    const { totalQuantity } = useSelector((state: RootState) => state.cart);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    if (loading) {
        return (
            <div className="loading">
                <div className="spinner"></div>
                <p className="loading-text">Loading products...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="error">
                <h3>⚠️ Error Loading Products</h3>
                <p>{error}</p>
            </div>
        );
    }

    return (
        <div className="home-container">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <span className="logo-icon">🛒</span>
                            <span className="logo-text">FreshMart</span>
                        </div>
                        <nav className="nav">
                            <Link to="/" className="nav-link active">Home</Link>
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

            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <div className="hero-content">
                        <h1 className="hero-title">Fresh Groceries Delivered</h1>
                        <p className="hero-subtitle">
                            Get the freshest products delivered right to your doorstep
                        </p>
                    </div>
                </div>
            </section>

            {/* Products Section */}
            <section className="products-section">
                <div className="container">
                    <div className="section-header">
                        <h2>All Products</h2>
                        <p>{products.length} items available</p>
                    </div>

                    <div className="products-grid">
                        {products.map((product: Product, index: number) => (
                            <div key={product.id} className="product-card" style={{animationDelay: `${index * 0.1}s`}}>
                                <div className="product-image-wrapper">
                                    <img 
                                        src={product.img} 
                                        alt={product.name}
                                        className="product-image"
                                    />
                                    <div className="product-overlay">
                                        <button 
                                            className="quick-add-btn"
                                            onClick={() => {
                                                dispatch(addItemToCart(product));
                                            }}
                                        >
                                            Quick Add +
                                        </button>
                                    </div>
                                </div>
                                <div className="product-info">
                                    <h3 className="product-name">{product.name}</h3>
                                    <div className="product-footer">
                                        <p className="product-price">
                                            <span className="currency">PKR</span>
                                            <span className="amount">{product.price.toLocaleString()}</span>
                                        </p>
                                        <Link to={`/product/${product.id}`}>
                                            <button className="btn-view">
                                                View Details →
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="footer">
                <div className="container">
                    <p>© 2025 FreshMart. Made with ❤️</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;