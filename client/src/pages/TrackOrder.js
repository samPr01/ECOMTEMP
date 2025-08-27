import React, { useState } from 'react';
import { FaSearch, FaBox, FaTruck, FaCheckCircle } from 'react-icons/fa';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [trackingResult, setTrackingResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrackOrder = (e) => {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setTrackingResult({
        orderNumber: orderNumber,
        status: 'In Transit',
        estimatedDelivery: 'March 15, 2024',
        trackingNumber: 'TRK123456789',
        timeline: [
          { status: 'Order Placed', date: 'March 10, 2024', completed: true },
          { status: 'Processing', date: 'March 11, 2024', completed: true },
          { status: 'Shipped', date: 'March 12, 2024', completed: true },
          { status: 'In Transit', date: 'March 13, 2024', completed: true },
          { status: 'Out for Delivery', date: 'March 15, 2024', completed: false },
          { status: 'Delivered', date: 'March 15, 2024', completed: false }
        ]
      });
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="page-container">
      <div className="container" style={{ padding: '60px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Track Your Order</h1>
        
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <div style={{ 
            backgroundColor: 'white', 
            padding: '32px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)',
            marginBottom: '32px'
          }}>
            <h2 style={{ marginBottom: '24px', textAlign: 'center' }}>Enter Order Details</h2>
            
            <form onSubmit={handleTrackOrder} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Order Number
                </label>
                <input
                  type="text"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="Enter your order number (e.g., SS-123456)"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ddd', 
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter the email used for your order"
                  style={{ 
                    width: '100%', 
                    padding: '12px', 
                    border: '1px solid #ddd', 
                    borderRadius: '6px',
                    fontSize: '16px'
                  }}
                  required
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                style={{
                  padding: '12px 24px',
                  backgroundColor: loading ? '#94a3b8' : '#2563eb',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '16px',
                  fontWeight: '500',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                <FaSearch />
                {loading ? 'Tracking...' : 'Track Order'}
              </button>
            </form>
          </div>

          {trackingResult && (
            <div style={{ 
              backgroundColor: 'white', 
              padding: '32px', 
              borderRadius: '12px', 
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}>
              <h2 style={{ marginBottom: '24px' }}>Order Status</h2>
              
              <div style={{ marginBottom: '24px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span><strong>Order Number:</strong> {trackingResult.orderNumber}</span>
                  <span><strong>Status:</strong> <span style={{ color: '#2563eb' }}>{trackingResult.status}</span></span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <span><strong>Tracking Number:</strong> {trackingResult.trackingNumber}</span>
                  <span><strong>Est. Delivery:</strong> {trackingResult.estimatedDelivery}</span>
                </div>
              </div>

              <h3 style={{ marginBottom: '20px' }}>Tracking Timeline</h3>
              
              <div style={{ position: 'relative' }}>
                {trackingResult.timeline.map((item, index) => (
                  <div key={index} style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '20px',
                    position: 'relative'
                  }}>
                    <div style={{ 
                      width: '40px', 
                      height: '40px', 
                      borderRadius: '50%',
                      backgroundColor: item.completed ? '#10b981' : '#e5e7eb',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginRight: '16px',
                      zIndex: 1
                    }}>
                      {item.completed ? (
                        <FaCheckCircle style={{ color: 'white', fontSize: '20px' }} />
                      ) : (
                        <div style={{ 
                          width: '12px', 
                          height: '12px', 
                          borderRadius: '50%', 
                          backgroundColor: '#9ca3af' 
                        }} />
                      )}
                    </div>
                    
                    {index < trackingResult.timeline.length - 1 && (
                      <div style={{
                        position: 'absolute',
                        left: '19px',
                        top: '40px',
                        width: '2px',
                        height: '20px',
                        backgroundColor: item.completed ? '#10b981' : '#e5e7eb'
                      }} />
                    )}
                    
                    <div>
                      <div style={{ 
                        fontWeight: '500', 
                        color: item.completed ? '#1f2937' : '#6b7280' 
                      }}>
                        {item.status}
                      </div>
                      <div style={{ 
                        fontSize: '14px', 
                        color: '#6b7280' 
                      }}>
                        {item.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ 
            marginTop: '32px',
            backgroundColor: '#f8fafc', 
            padding: '24px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0' 
          }}>
            <h3 style={{ marginBottom: '16px' }}>Need Help?</h3>
            <p style={{ marginBottom: '12px' }}>
              If you're having trouble tracking your order or have questions about delivery, we're here to help.
            </p>
            <p>
              <strong>Email:</strong> support@ssstores.com<br />
              <strong>Phone:</strong> 1-800-SS-STORE<br />
              <strong>Hours:</strong> Monday-Friday 9AM-6PM EST
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
