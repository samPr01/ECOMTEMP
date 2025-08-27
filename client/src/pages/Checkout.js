import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaLock, FaCreditCard, FaUser, FaMapMarkerAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, sessionId, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);
  
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States'
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'credit_card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  useEffect(() => {
    if (!items || items.length === 0) {
      navigate('/cart');
    }
  }, [items, navigate]);

  const handleCustomerInfoChange = (field, value) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const handlePaymentInfoChange = (field, value) => {
    setPaymentInfo(prev => ({ ...prev, [field]: value }));
  };

  const validateStep1 = () => {
    const required = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode'];
    return required.every(field => customerInfo[field].trim() !== '');
  };

  const validateStep2 = () => {
    if (paymentInfo.method === 'credit_card') {
      return paymentInfo.cardNumber && paymentInfo.expiryDate && paymentInfo.cvv && paymentInfo.cardName;
    }
    return true;
  };

  const handlePlaceOrder = async () => {
    if (!validateStep2()) {
      toast.error('Please fill in all payment information');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('/api/orders', {
        sessionId,
        customerInfo,
        paymentInfo
      });

      clearCart();
      toast.success('Order placed successfully!');
      navigate(`/order-confirmation/${response.data.order.id}`);
    } catch (error) {
      console.error('Error placing order:', error);
      toast.error('Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const subtotal = parseFloat(total);
  const shipping = subtotal >= 50 ? 0 : 5.99;
  const tax = subtotal * 0.08;
  const orderTotal = subtotal + shipping + tax;

  if (!items || items.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: '40px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px', textAlign: 'center' }}>
          Secure Checkout
        </h1>

        {/* Progress Steps */}
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          marginBottom: '40px',
          gap: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: step >= 1 ? '#2563eb' : '#6b7280'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 1 ? '#2563eb' : '#e5e7eb',
              color: step >= 1 ? 'white' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}>
              1
            </div>
            <span>Shipping Info</span>
          </div>
          <div style={{ color: '#e5e7eb', fontSize: '20px' }}>→</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: step >= 2 ? '#2563eb' : '#6b7280'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 2 ? '#2563eb' : '#e5e7eb',
              color: step >= 2 ? 'white' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}>
              2
            </div>
            <span>Payment</span>
          </div>
          <div style={{ color: '#e5e7eb', fontSize: '20px' }}>→</div>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px',
            color: step >= 3 ? '#2563eb' : '#6b7280'
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              background: step >= 3 ? '#2563eb' : '#e5e7eb',
              color: step >= 3 ? 'white' : '#6b7280',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '600'
            }}>
              3
            </div>
            <span>Review</span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '40px' }}>
          {/* Main Content */}
          <div>
            {step === 1 && (
              <div style={{ background: 'white', padding: '32px', borderRadius: '12px' }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FaUser style={{ color: '#2563eb' }} />
                  Shipping Information
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">First Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customerInfo.firstName}
                      onChange={(e) => handleCustomerInfoChange('firstName', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Last Name *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customerInfo.lastName}
                      onChange={(e) => handleCustomerInfoChange('lastName', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input
                    type="email"
                    className="form-input"
                    value={customerInfo.email}
                    onChange={(e) => handleCustomerInfoChange('email', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Phone Number *</label>
                  <input
                    type="tel"
                    className="form-input"
                    value={customerInfo.phone}
                    onChange={(e) => handleCustomerInfoChange('phone', e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Street Address *</label>
                  <input
                    type="text"
                    className="form-input"
                    value={customerInfo.address}
                    onChange={(e) => handleCustomerInfoChange('address', e.target.value)}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div className="form-group">
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customerInfo.city}
                      onChange={(e) => handleCustomerInfoChange('city', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customerInfo.state}
                      onChange={(e) => handleCustomerInfoChange('state', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">ZIP Code *</label>
                    <input
                      type="text"
                      className="form-input"
                      value={customerInfo.zipCode}
                      onChange={(e) => handleCustomerInfoChange('zipCode', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <button
                  onClick={() => {
                    if (validateStep1()) {
                      setStep(2);
                    } else {
                      toast.error('Please fill in all required fields');
                    }
                  }}
                  className="btn btn-primary"
                  style={{ marginTop: '24px' }}
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div style={{ background: 'white', padding: '32px', borderRadius: '12px' }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FaCreditCard style={{ color: '#2563eb' }} />
                  Payment Information
                </h2>

                <div style={{ marginBottom: '24px' }}>
                  <label className="form-label">Payment Method</label>
                  <div style={{ display: 'flex', gap: '16px' }}>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="credit_card"
                        checked={paymentInfo.method === 'credit_card'}
                        onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                      />
                      Credit Card
                    </label>
                    <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="paymentMethod"
                        value="paypal"
                        checked={paymentInfo.method === 'paypal'}
                        onChange={(e) => handlePaymentInfoChange('method', e.target.value)}
                      />
                      PayPal
                    </label>
                  </div>
                </div>

                {paymentInfo.method === 'credit_card' && (
                  <>
                    <div className="form-group">
                      <label className="form-label">Cardholder Name *</label>
                      <input
                        type="text"
                        className="form-input"
                        value={paymentInfo.cardName}
                        onChange={(e) => handlePaymentInfoChange('cardName', e.target.value)}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Card Number *</label>
                      <input
                        type="text"
                        className="form-input"
                        placeholder="1234 5678 9012 3456"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => handlePaymentInfoChange('cardNumber', e.target.value)}
                        required
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                      <div className="form-group">
                        <label className="form-label">Expiry Date *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="MM/YY"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => handlePaymentInfoChange('expiryDate', e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label className="form-label">CVV *</label>
                        <input
                          type="text"
                          className="form-input"
                          placeholder="123"
                          value={paymentInfo.cvv}
                          onChange={(e) => handlePaymentInfoChange('cvv', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </>
                )}

                {paymentInfo.method === 'paypal' && (
                  <div style={{ 
                    padding: '24px', 
                    background: '#f8fafc', 
                    borderRadius: '8px',
                    textAlign: 'center'
                  }}>
                    <p>You will be redirected to PayPal to complete your payment securely.</p>
                  </div>
                )}

                <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                  <button
                    onClick={() => setStep(1)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="btn btn-primary"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div style={{ background: 'white', padding: '32px', borderRadius: '12px' }}>
                <h2 style={{ 
                  fontSize: '24px', 
                  fontWeight: '700', 
                  marginBottom: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <FaLock style={{ color: '#2563eb' }} />
                  Review Your Order
                </h2>

                {/* Order Items */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Order Items</h3>
                  {items.map(item => (
                    <div key={item.id} style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      alignItems: 'center',
                      padding: '12px 0',
                      borderBottom: '1px solid #e5e7eb'
                    }}>
                      <div>
                        <span style={{ fontWeight: '500' }}>{item.product.title}</span>
                        {item.size && <span style={{ color: '#6b7280' }}> - Size: {item.size}</span>}
                        <span style={{ color: '#6b7280' }}> × {item.quantity}</span>
                      </div>
                      <span style={{ fontWeight: '600' }}>
                        ₹{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                <div style={{ marginBottom: '24px' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Shipping Address</h3>
                  <div style={{ color: '#6b7280' }}>
                    <p>{customerInfo.firstName} {customerInfo.lastName}</p>
                    <p>{customerInfo.address}</p>
                    <p>{customerInfo.city}, {customerInfo.state} {customerInfo.zipCode}</p>
                    <p>{customerInfo.phone}</p>
                    <p>{customerInfo.email}</p>
                  </div>
                </div>

                {/* Payment Method */}
                <div style={{ marginBottom: '32px' }}>
                  <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>Payment Method</h3>
                  <p style={{ color: '#6b7280' }}>
                    {paymentInfo.method === 'credit_card' 
                      ? `Credit Card ending in ${paymentInfo.cardNumber.slice(-4)}`
                      : 'PayPal'
                    }
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '16px' }}>
                  <button
                    onClick={() => setStep(2)}
                    className="btn btn-secondary"
                  >
                    Back
                  </button>
                  <button
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                  >
                    {loading ? 'Processing...' : `Place Order - $${orderTotal.toFixed(2)}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary Sidebar */}
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
            
            <div style={{ marginBottom: '20px' }}>
              {items.map(item => (
                <div key={item.id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: '14px'
                }}>
                  <span>{item.product.title} × {item.quantity}</span>
                  <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid #e5e7eb', paddingTop: '16px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                color: '#6b7280'
              }}>
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                color: '#6b7280'
              }}>
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '16px',
                color: '#6b7280'
              }}>
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                fontSize: '20px',
                fontWeight: '700',
                borderTop: '2px solid #e5e7eb',
                paddingTop: '16px'
              }}>
                <span>Total</span>
                <span>${orderTotal.toFixed(2)}</span>
              </div>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '8px' }}>
                🔒 Your payment information is secure
              </p>
              <p style={{ fontSize: '12px', color: '#6b7280' }}>
                SSL encrypted checkout
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
