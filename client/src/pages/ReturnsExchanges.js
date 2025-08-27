import React from 'react';

const ReturnsExchanges = () => {
  return (
    <div className="page-container">
      <div className="container" style={{ padding: '60px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Returns & Exchanges</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Return Policy</h2>
            <p style={{ marginBottom: '16px' }}>
              We want you to be completely satisfied with your purchase. If you're not happy with your order, 
              you can return it within <strong>30 days</strong> of delivery for a full refund.
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <li>Items must be in original condition with tags attached</li>
              <li>Original packaging and receipt required</li>
              <li>Personalized or custom items cannot be returned</li>
              <li>Sale items are final sale unless defective</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Exchange Policy</h2>
            <p style={{ marginBottom: '16px' }}>
              Need a different size or color? We offer free exchanges within 30 days of purchase.
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <li>Exchanges available for size, color, or style variations</li>
              <li>Items must be unworn and in original condition</li>
              <li>Free return shipping for exchanges</li>
              <li>Processing time: 3-5 business days</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>How to Return or Exchange</h2>
            <ol style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <li><strong>Contact Us:</strong> Email support@ssstores.com or call 1-800-SS-STORE</li>
              <li><strong>Get Return Label:</strong> We'll send you a prepaid return shipping label</li>
              <li><strong>Package Items:</strong> Include original packaging and receipt</li>
              <li><strong>Ship Back:</strong> Drop off at any authorized shipping location</li>
              <li><strong>Receive Refund:</strong> Refunds processed within 5-7 business days</li>
            </ol>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Refund Information</h2>
            <p style={{ marginBottom: '16px' }}>
              Refunds will be issued to your original payment method:
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <li>Credit/Debit Cards: 3-5 business days</li>
              <li>PayPal: 1-2 business days</li>
              <li>Store Credit: Immediate</li>
              <li>Original shipping costs are non-refundable</li>
            </ul>
          </section>

          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '24px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0' 
          }}>
            <h3 style={{ marginBottom: '16px' }}>Need Help?</h3>
            <p style={{ marginBottom: '12px' }}>
              Our customer service team is here to help with your return or exchange.
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

export default ReturnsExchanges;
