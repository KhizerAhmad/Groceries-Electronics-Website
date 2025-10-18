import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import type { AppDispatch, RootState } from "../app/store";
import { removeItemFromCart, clearCart,decreaseQuantity,increaseQuantity} from "../features/cart";
import "./ItemCart.css";

const ItemCart = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart);
    const dispatch = useDispatch<AppDispatch>();
    const navigate=useNavigate();
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    if (totalQuantity === 0) {
        return (
            <div className="cart-container">
                {/* Header */}
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
                                </Link>
                            </nav>
                        </div>
                    </div>
                </header>

                {/* Empty Cart */}
                <div className="empty-cart">
                    <div className="container">
                        <div className="empty-cart-content">
                            <span className="empty-cart-icon">🛒</span>
                            <h2>Your Cart is Empty</h2>
                            <p>Looks like you haven't added anything to your cart yet.</p>
                            <Link to="/">
                                <button className="btn-primary">Start Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="footer">
                    <div className="container">
                        <p>© 2025 FreshMart. Made with ❤️</p>
                    </div>
                </footer>
            </div>
        );
    }

    return (
        <div className="cart-container">
            {/* Header */}
            <header className="header">
                <div className="container">
                    <div className="header-content">
                        <div className="logo">
                            <span className="logo-icon">🛒</span>
                            <span className="logo-text">FreshMart</span>
                        </div>
                        <nav className="nav">
                            <Link to="/" className="nav-link">Home</Link>
                            <Link to="/cart" className="cart-btn active">
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

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <div className="container">
                    <Link to="/" className="breadcrumb-link">Home</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Shopping Cart</span>
                </div>
            </div>

            {/* Cart Content */}
            <section className="cart-section">
                <div className="container">
                    <div className="cart-header-row">
                        <h1 className="cart-title">Shopping Cart ({totalQuantity} items)</h1>
                        <button
                            className="btn-clear-cart"
                            onClick={() => dispatch(clearCart())}
                        >
                            Clear Cart
                        </button>
                    </div>

                    <div className="cart-grid">
                        <div className="cart-items">
                            {items.map((item, index) => (
                                <div
                                    key={item.id}
                                    className="cart-item"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="cart-item-image">
                                        <img src={item.img} alt={item.name} />
                                    </div>

                                    <div className="cart-item-details">
                                        <h3 className="cart-item-name">{item.name}</h3>
                                        <div>
                                            <button onClick={() => dispatch(decreaseQuantity(item.id))}>➖</button>
                                            <span style={{ margin: "0 10px" }}>{item.quantity}</span>
                                            <button onClick={() => dispatch(increaseQuantity(item.id))}>➕</button>
                                        </div>
                                        <p className="cart-item-meta">
                                            <span className="item-quantity-badge">
                                                Qty: {item.quantity}
                                            </span>
                                        </p>
                                    </div>

                                    <div className="cart-item-price">
                                        <span className="item-unit-price">
                                            PKR {item.price.toLocaleString()}
                                        </span>
                                        {item.quantity > 1 && (
                                            <span className="item-total-price">
                                                Total: PKR {(item.price * item.quantity).toLocaleString()}
                                            </span>
                                        )}
                                    </div>

                                    <button
                                        className="btn-remove-item"
                                        onClick={() => dispatch(removeItemFromCart(item.id))}
                                        aria-label="Remove item"
                                    >
                                        ✕
                                    </button>
                                </div>
                            ))}
                        </div>

                        <div className="order-summary">
                            <div className="summary-card">
                                <h2 className="summary-title">Order Summary</h2>

                                <div className="summary-details">
                                    <div className="summary-row">
                                        <span>Subtotal</span>
                                        <span>PKR {totalAmount.toLocaleString()}</span>
                                    </div>
                                    <div className="summary-row">
                                        <span>Delivery Fee</span>
                                        <span className="text-green">FREE</span>
                                    </div>
                                    <div className="summary-row discount-row">
                                        <span>Discount</span>
                                        <span className="text-green">- PKR {Math.round(totalAmount * 0.1).toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-total">
                                    <span>Total Amount</span>
                                    <span className="total-amount">
                                        PKR {Math.round(totalAmount * 0.9).toLocaleString()}
                                    </span>
                                </div>

                                <button className="btn-checkout" onClick={()=>navigate("/checkout")}>
                                    Proceed to Checkout
                                </button>

                                <Link to="/" className="continue-shopping">
                                    ← Continue Shopping
                                </Link>
                            </div>

                            <div className="promo-card">
                                <span className="promo-icon">🎉</span>
                                <div className="promo-content">
                                    <h3>Free Delivery!</h3>
                                    <p>On all orders above PKR 500</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="container">
                    <p>© 2025 FreshMart. Made with ❤️</p>
                </div>
            </footer>
        </div>
    );
};

export default ItemCart;