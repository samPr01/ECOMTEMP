import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FaCheckCircle, FaDownload, FaPrint } from 'react-icons/fa';
import axios from 'axios';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, [orderId]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(`/api/orders/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error('Error fetching order:', error);
    } finally {
      setLoading(false);
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

  if (!order) {
    return (
      <div style={{ padding: '60px 0' }}>
        <div className="container text-center">
          <h2>Order not found</h2>
          <Link to="/" className="btn btn-primary">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '40px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          {/* Success Header */}
          <div style={{ 
            background: 'white', 
            padding: '48px', 
            borderRadius: '12px', 
            textAlign: 'center',
            marginBottom: '32px'
          }}>
            <FaCheckCircle style={{ 
              fontSize: '64px', 
              color: '#10b981', 
              marginBottom: '24px' 
            }} />
            <h1 style={{ 
              fontSize: '32px', 
              fontWeight: '700', 
              marginBottom: '16px',
              color: '#1f2937'
            }}>
              Order Confirmed!
            </h1>
            <p style={{ 
              fontSize: '18px', 
              color: '#6b7280', 
              marginBottom: '24px' 
            }}>
              Thank you for your purchase. Your order has been successfully placed.
            </p>
            <div style={{ 
              background: '#f0fdf4', 
              border: '1px solid #bbf7d0',
              borderRadius: '8px',
              padding: '16px',
              display: 'inline-block'
            }}>
              <p style={{ margin: 0, fontWeight: '600', color: '#166534' }}>
                Order Number: {order.orderNumber}
              </p>
            </div>
          </div>

          {/* Order Details */}
          <div style={{ 
            background: 'white', 
            padding: '32px', 
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h2 style={{ 
              fontSize: '24px', 
              fontWeight: '700', 
              marginBottom: '24px' 
            }}>
              Order Details
            </h2>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '1fr 1fr', 
              gap: '32px',
              marginBottom: '32px'
            }}>
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>
                  Shipping Address
                </h3>
                <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  <p>{order.customerInfo.firstName} {order.customerInfo.lastName}</p>
                  <p>{order.customerInfo.address}</p>
                  <p>{order.customerInfo.city}, {order.customerInfo.state} {order.customerInfo.zipCode}</p>
                  <p>{order.customerInfo.phone}</p>
                  <p>{order.customerInfo.email}</p>
                </div>
              </div>
              
              <div>
                <h3 style={{ fontWeight: '600', marginBottom: '12px' }}>
                  Order Information
                </h3>
                <div style={{ color: '#6b7280', lineHeight: '1.6' }}>
                  <p><strong>Order Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                  <p><strong>Payment Method:</strong> {order.paymentInfo.method === 'credit_card' ? `Credit Card ending in ${order.paymentInfo.last4}` : 'PayPal'}</p>
                  <p><strong>Status:</strong> <span style={{ color: '#10b981', fontWeight: '600' }}>Confirmed</span></p>
                  <p><strong>Estimated Delivery:</strong> {new Date(order.estimatedDelivery).toLocaleDateString()}</p>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <h3 style={{ fontWeight: '600', marginBottom: '16px' }}>
              Items Ordered
            </h3>
            <div style={{ border: '1px solid #e5e7eb', borderRadius: '8px', overflow: 'hidden' }}>
              {order.items.map((item, index) => (
                <div 
                  key={item.id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '80px 1fr auto auto',
                    gap: '16px',
                    padding: '16px',
                    alignItems: 'center',
                    borderBottom: index < order.items.length - 1 ? '1px solid #e5e7eb' : 'none'
                  }}
                >
                  <div style={{
                    width: '80px',
                    height: '80px',
                    background: '#f3f4f6',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: '#6b7280'
                  }}>
                    📷
                  </div>
                  <div>
                    <h4 style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {item.product.title}
                    </h4>
                    <p style={{ color: '#6b7280', fontSize: '14px', margin: 0 }}>
                      {item.size && `Size: ${item.size} • `}Brand: {item.product.brand}
                    </p>
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ margin: 0, fontWeight: '500' }}>Qty: {item.quantity}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ margin: 0, fontWeight: '600', fontSize: '16px' }}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Total */}
            <div style={{ 
              marginTop: '24px', 
              borderTop: '2px solid #e5e7eb', 
              paddingTop: '16px' 
            }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'flex-end' 
              }}>
                <div style={{ minWidth: '200px' }}>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px',
                    color: '#6b7280'
                  }}>
                    <span>Subtotal:</span>
                    <span>₹{(parseFloat(order.total) - 59 - (parseFloat(order.total) - 59) * 0.08).toFixed(2)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '8px',
                    color: '#6b7280'
                  }}>
                    <span>Shipping:</span>
                    <span>₹59</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    marginBottom: '16px',
                    color: '#6b7280'
                  }}>
                    <span>Tax:</span>
                    <span>₹{((parseFloat(order.total) - 59) * 0.08).toFixed(2)}</span>
                  </div>
                  <div style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between',
                    fontSize: '20px',
                    fontWeight: '700',
                    borderTop: '1px solid #e5e7eb',
                    paddingTop: '12px'
                  }}>
                    <span>Total:</span>
                    <span>₹{order.total}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ 
            background: 'white', 
            padding: '32px', 
            borderRadius: '12px',
            marginBottom: '32px'
          }}>
            <h3 style={{ fontWeight: '600', marginBottom: '20px' }}>
              What's Next?
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📧</div>
                <h4 style={{ marginBottom: '8px' }}>Email Confirmation</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  You'll receive an email confirmation shortly with your order details.
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>📦</div>
                <h4 style={{ marginBottom: '8px' }}>Order Processing</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  We'll start processing your order within 24 hours.
                </p>
              </div>
              <div style={{ textAlign: 'center', padding: '20px' }}>
                <div style={{ fontSize: '32px', marginBottom: '12px' }}>🚚</div>
                <h4 style={{ marginBottom: '8px' }}>Shipping Updates</h4>
                <p style={{ color: '#6b7280', fontSize: '14px' }}>
                  You'll receive tracking information once your order ships.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ 
            display: 'flex', 
            gap: '16px', 
            justifyContent: 'center',
            flexWrap: 'wrap'
          }}>
            <button 
              className="btn btn-outline"
              onClick={() => window.print()}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              <FaPrint />
              Print Order
            </button>
            <Link 
              to="/products" 
              className="btn btn-primary"
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Continue Shopping
            </Link>
          </div>

          {/* Support Info */}
          <div style={{ 
            textAlign: 'center', 
            marginTop: '40px',
            padding: '24px',
            background: '#f8fafc',
            borderRadius: '8px'
          }}>
            <p style={{ color: '#6b7280', marginBottom: '8px' }}>
              Need help with your order?
            </p>
            <p style={{ color: '#6b7280' }}>
              Contact us at <strong>support@ssstores.com</strong> or call <strong>1-800-SS-STORE</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmation;
