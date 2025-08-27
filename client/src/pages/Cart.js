import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaShoppingBag } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, total, loading, updateCartItem, removeFromCart, loadCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    loadCart();
  }, []);

  const handleQuantityChange = async (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      await updateCartItem(itemId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
    }
  };

  const handleRemoveItem = async (itemId) => {
    try {
      await removeFromCart(itemId);
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  if (!items || items.length === 0) {
    return (
      <div style={{ padding: '60px 0' }}>
        <div className="container text-center">
          <FaShoppingBag style={{ fontSize: '64px', color: '#d1d5db', marginBottom: '24px' }} />
          <h2 style={{ marginBottom: '16px' }}>Your cart is empty</h2>
          <p style={{ color: '#6b7280', marginBottom: '32px' }}>
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0' }}>
      <div className="container">
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
          Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Cart Items */}
          <div>
            {items.map(item => (
              <div 
                key={item.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '120px 1fr auto',
                  gap: '20px',
                  padding: '24px',
                  background: 'white',
                  borderRadius: '12px',
                  marginBottom: '16px',
                  alignItems: 'center'
                }}
              >
                {/* Product Image */}
                <div style={{
                  width: '120px',
                  height: '120px',
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '48px',
                  color: '#6b7280'
                }}>
                  📷
                </div>

                {/* Product Info */}
                <div>
                  <Link 
                    to={`/product/${item.product.id}`}
                    style={{ 
                      textDecoration: 'none',
                      color: '#1f2937',
                      fontSize: '18px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      display: 'block'
                    }}
                  >
                    {item.product.title}
                  </Link>
                  <p style={{ color: '#6b7280', marginBottom: '8px' }}>
                    Brand: {item.product.brand}
                  </p>
                  {item.size && (
                    <p style={{ color: '#6b7280', marginBottom: '8px' }}>
                      Size: {item.size}
                    </p>
                  )}
                  <p style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#2563eb',
                    marginBottom: '16px'
                  }}>
                    ₹{item.product.price}
                  </p>

                  {/* Quantity Controls */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '2px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaMinus size={12} />
                    </button>
                    <span style={{ 
                      minWidth: '40px', 
                      textAlign: 'center', 
                      fontWeight: '600',
                      fontSize: '16px'
                    }}>
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                      style={{
                        width: '36px',
                        height: '36px',
                        border: '2px solid #e5e7eb',
                        background: 'white',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      <FaPlus size={12} />
                    </button>
                  </div>
                </div>

                {/* Item Total and Remove */}
                <div style={{ textAlign: 'right' }}>
                  <p style={{ 
                    fontSize: '20px', 
                    fontWeight: '700', 
                    color: '#1f2937',
                    marginBottom: '16px'
                  }}>
                    ₹{(item.product.price * item.quantity).toFixed(2)}
                  </p>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '8px',
                      borderRadius: '6px',
                      fontSize: '16px'
                    }}
                    title="Remove item"
                  >
                    <FaTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{
            background: 'white',
            padding: '32px',
            borderRadius: '12px',
            height: 'fit-content',
            position: 'sticky',
            top: '100px'
          }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
              Order Summary
            </h3>
            
            <div style={{ marginBottom: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                color: '#6b7280'
              }}>
                <span>Subtotal</span>
                <span>₹{total}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                color: '#6b7280'
              }}>
                <span>Shipping</span>
                <span>{parseFloat(total) >= 500 ? 'Free' : '₹59'}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                color: '#6b7280'
              }}>
                <span>Tax</span>
                <span>₹{(parseFloat(total) * 0.08).toFixed(2)}</span>
              </div>
            </div>

            <div style={{ 
              borderTop: '2px solid #e5e7eb', 
              paddingTop: '16px',
              marginBottom: '24px'
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: '700'
              }}>
                <span>Total</span>
                <span>
                  ₹{(
                    parseFloat(total) + 
                    (parseFloat(total) >= 500 ? 0 : 59) + 
                    (parseFloat(total) * 0.08)
                  ).toFixed(2)}
                </span>
              </div>
            </div>

            {parseFloat(total) < 500 && (
              <div style={{
                background: '#fef3c7',
                border: '1px solid #f59e0b',
                borderRadius: '8px',
                padding: '12px',
                marginBottom: '24px',
                fontSize: '14px',
                color: '#92400e'
              }}>
                Add ₹{(500 - parseFloat(total)).toFixed(2)} more for free shipping!
              </div>
            )}

            <button
              onClick={() => navigate('/checkout')}
              className="btn btn-primary w-full"
              style={{ marginBottom: '16px' }}
            >
              Proceed to Checkout
            </button>

            <Link 
              to="/products" 
              className="btn btn-outline w-full"
              style={{ textAlign: 'center', display: 'block' }}
            >
              Continue Shopping
            </Link>

            {/* Security Badges */}
            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                🔒 Secure Checkout
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                💳 All major credit cards accepted
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
