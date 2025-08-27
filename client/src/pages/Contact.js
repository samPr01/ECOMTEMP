import React from 'react';
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Contact = () => {
  return (
    <div className="page-container">
      <div className="container" style={{ padding: '60px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Contact Us</h1>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
          <div>
            <h2>Get in Touch</h2>
            <p style={{ marginBottom: '30px' }}>
              We're here to help! Reach out to us with any questions, concerns, or feedback.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaPhone style={{ color: '#2563eb', fontSize: '20px' }} />
                <div>
                  <strong>Phone:</strong> 1-800-SS-STORE
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaEnvelope style={{ color: '#2563eb', fontSize: '20px' }} />
                <div>
                  <strong>Email:</strong> support@ssstores.com
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FaMapMarkerAlt style={{ color: '#2563eb', fontSize: '20px' }} />
                <div>
                  <strong>Address:</strong> 123 Commerce St, Shopping District, NY 10001
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h2>Send us a Message</h2>
            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Name</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="Your full name"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  placeholder="your.email@example.com"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Subject</label>
                <input 
                  type="text" 
                  className="form-input" 
                  placeholder="How can we help?"
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px' }}
                />
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Message</label>
                <textarea 
                  className="form-input" 
                  rows="5"
                  placeholder="Tell us more about your inquiry..."
                  style={{ width: '100%', padding: '12px', border: '1px solid #ddd', borderRadius: '6px', resize: 'vertical' }}
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ padding: '12px 24px', backgroundColor: '#2563eb', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
