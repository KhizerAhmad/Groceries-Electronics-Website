import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import type { AppDispatch, RootState } from '../app/store'
import { clearCart } from '../features/cart'
import './Checkout.css'

const Checkout = () => {
    const { items, totalQuantity } = useSelector((state: RootState) => state.cart)
    const dispatch = useDispatch<AppDispatch>()
    const navigate = useNavigate()
    const totalAmount = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    const discount = Math.round(totalAmount * 0.1)
    const finalTotal = totalAmount - discount

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        postalCode: '',
        paymentMethod: 'cod'
    })

    const [errors, setErrors] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData({
            ...formData,
            [name]: value
        })
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors({
                ...errors,
                [name]: ''
            })
        }
    }

    const validateForm = () => {
        const newErrors = {
            fullName: '',
            email: '',
            phone: '',
            address: '',
            city: ''
        }
        let isValid = true

        // Full Name validation
        if (!formData.fullName.trim()) {
            newErrors.fullName = 'Full name is required'
            isValid = false
        } else if (formData.fullName.trim().length < 3) {
            newErrors.fullName = 'Name must be at least 3 characters'
            isValid = false
        }

        // Email validation
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required'
            isValid = false
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
            isValid = false
        }

        // Phone validation
        if (!formData.phone.trim()) {
            newErrors.phone = 'Phone number is required'
            isValid = false
        } else if (!/^[\d\s+()-]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
            isValid = false
        }

        // Address validation
        if (!formData.address.trim()) {
            newErrors.address = 'Address is required'
            isValid = false
        } else if (formData.address.trim().length < 10) {
            newErrors.address = 'Please enter a complete address'
            isValid = false
        }

        // City validation
        if (!formData.city.trim()) {
            newErrors.city = 'City is required'
            isValid = false
        }

        setErrors(newErrors)
        return isValid
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) {
            alert('⚠️ Please fill in all required fields correctly!')
            return
        }

        // Clear the cart after successful order
        dispatch(clearCart())
        
        alert(`🎉 Order placed successfully!\n\nThank you ${formData.fullName}!\nYour order will be delivered to ${formData.city} soon.`)
        navigate('/')
    }

    if (totalQuantity === 0) {
        return (
            <div className="checkout-container">
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

                <div className="empty-checkout">
                    <div className="container">
                        <div className="empty-checkout-content">
                            <span className="empty-icon">🛒</span>
                            <h2>No Items to Checkout</h2>
                            <p>Your cart is empty. Add some items before checking out.</p>
                            <Link to="/">
                                <button className="btn-primary">Start Shopping</button>
                            </Link>
                        </div>
                    </div>
                </div>

                <footer className="footer">
                    <div className="container">
                        <p>© 2025 FreshMart. Made with ❤️</p>
                    </div>
                </footer>
            </div>
        )
    }

    return (
        <div className="checkout-container">
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
                    <Link to="/cart" className="breadcrumb-link">Cart</Link>
                    <span className="breadcrumb-separator">/</span>
                    <span className="breadcrumb-current">Checkout</span>
                </div>
            </div>

            {/* Checkout Section */}
            <section className="checkout-section">
                <div className="container">
                    <h1 className="checkout-title">Checkout</h1>

                    <div className="checkout-grid">
                        {/* Checkout Form */}
                        <div className="checkout-form-wrapper">
                            <form onSubmit={handleSubmit} className="checkout-form">
                                {/* Contact Information */}
                                <div className="form-section">
                                    <h2 className="form-section-title">
                                        <span className="section-number">1</span>
                                        Contact Information
                                    </h2>
                                    <div className="form-grid">
                                        <div className="form-group">
                                            <label htmlFor="fullName">Full Name *</label>
                                            <input
                                                type="text"
                                                id="fullName"
                                                name="fullName"
                                                value={formData.fullName}
                                                onChange={handleInputChange}
                                                placeholder="Enter your full name"
                                                className={errors.fullName ? 'input-error' : ''}
                                            />
                                            {errors.fullName && <span className="error-message">{errors.fullName}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="email">Email Address *</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                placeholder="your.email@example.com"
                                                className={errors.email ? 'input-error' : ''}
                                            />
                                            {errors.email && <span className="error-message">{errors.email}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="phone">Phone Number *</label>
                                            <input
                                                type="tel"
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                placeholder="+92 300 1234567"
                                                className={errors.phone ? 'input-error' : ''}
                                            />
                                            {errors.phone && <span className="error-message">{errors.phone}</span>}
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Address */}
                                <div className="form-section">
                                    <h2 className="form-section-title">
                                        <span className="section-number">2</span>
                                        Delivery Address
                                    </h2>
                                    <div className="form-grid">
                                        <div className="form-group full-width">
                                            <label htmlFor="address">Street Address *</label>
                                            <textarea
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                rows={3}
                                                placeholder="Enter your complete address"
                                                className={errors.address ? 'input-error' : ''}
                                            />
                                            {errors.address && <span className="error-message">{errors.address}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="city">City *</label>
                                            <input
                                                type="text"
                                                id="city"
                                                name="city"
                                                value={formData.city}
                                                onChange={handleInputChange}
                                                placeholder="e.g. Lahore"
                                                className={errors.city ? 'input-error' : ''}
                                            />
                                            {errors.city && <span className="error-message">{errors.city}</span>}
                                        </div>
                                        <div className="form-group">
                                            <label htmlFor="postalCode">Postal Code</label>
                                            <input
                                                type="text"
                                                id="postalCode"
                                                name="postalCode"
                                                value={formData.postalCode}
                                                onChange={handleInputChange}
                                                placeholder="54000"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Method */}
                                <div className="form-section">
                                    <h2 className="form-section-title">
                                        <span className="section-number">3</span>
                                        Payment Method
                                    </h2>
                                    <div className="payment-methods">
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="cod"
                                                checked={formData.paymentMethod === 'cod'}
                                                onChange={handleInputChange}
                                            />
                                            <div className="payment-option-content">
                                                <span className="payment-icon">💵</span>
                                                <div>
                                                    <strong>Cash on Delivery</strong>
                                                    <p>Pay when you receive your order</p>
                                                </div>
                                            </div>
                                        </label>
                                        <label className="payment-option">
                                            <input
                                                type="radio"
                                                name="paymentMethod"
                                                value="card"
                                                checked={formData.paymentMethod === 'card'}
                                                onChange={handleInputChange}
                                            />
                                            <div className="payment-option-content">
                                                <span className="payment-icon">💳</span>
                                                <div>
                                                    <strong>Credit/Debit Card</strong>
                                                    <p>Pay securely with your card</p>
                                                </div>
                                            </div>
                                        </label>
                                    </div>
                                </div>
                            </form>
                        </div>

                        {/* Order Summary */}
                        <div className="order-summary-wrapper">
                            <div className="order-summary-card">
                                <h2 className="summary-title">Order Summary</h2>

                                {/* Order Items */}
                                <div className="order-items">
                                    {items.map((item) => (
                                        <div key={item.id} className="order-item">
                                            <img src={item.img} alt={item.name} className="order-item-img" />
                                            <div className="order-item-details">
                                                <h4>{item.name}</h4>
                                                <p>Qty: {item.quantity}</p>
                                            </div>
                                            <div className="order-item-price">
                                                PKR {(item.price * item.quantity).toLocaleString()}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="summary-divider"></div>

                                {/* Price Breakdown */}
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
                                        <span>Discount (10%)</span>
                                        <span className="text-green">- PKR {discount.toLocaleString()}</span>
                                    </div>
                                </div>

                                <div className="summary-divider"></div>

                                <div className="summary-total">
                                    <span>Total Amount</span>
                                    <span className="total-amount">
                                        PKR {finalTotal.toLocaleString()}
                                    </span>
                                </div>

                                <button type="submit" className="btn-place-order" onClick={handleSubmit}>
                                    Place Order
                                </button>

                                <div className="secure-checkout">
                                    <span>🔒</span>
                                    <p>Secure Checkout</p>
                                </div>
                            </div>
                        </div>
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
    )
}

export default Checkout