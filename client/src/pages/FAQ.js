import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQ = () => {
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (index) => {
    setOpenItems(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const faqData = [
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express, Discover), PayPal, Apple Pay, Google Pay, and store gift cards."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping takes 3-7 business days. Express shipping (1-2 business days) and overnight shipping are also available for an additional fee. Free shipping is available on orders over ₹500."
    },
    {
      question: "Can I track my order?",
      answer: "Yes! Once your order ships, you'll receive a tracking number via email. You can also track your order by logging into your account or using our Track Your Order page."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be in original condition with tags attached. See our Returns & Exchanges page for complete details."
    },
    {
      question: "Do you offer international shipping?",
      answer: "Currently, we only ship within the United States. We're working on expanding our shipping options to include international destinations in the future."
    },
    {
      question: "How do I know what size to order?",
      answer: "Check out our comprehensive Size Guide which includes measurement instructions and size charts for all our clothing categories. If you're still unsure, our customer service team can help."
    },
    {
      question: "Can I cancel or modify my order?",
      answer: "You can cancel or modify your order within 1 hour of placing it. After that, orders are processed quickly and cannot be changed. Contact customer service immediately if you need assistance."
    },
    {
      question: "Do you have a loyalty program?",
      answer: "Yes! Our SS Rewards program offers points for every purchase, exclusive discounts, early access to sales, and special member-only events. Sign up is free with any purchase."
    },
    {
      question: "What if I receive a damaged or defective item?",
      answer: "We're sorry if you received a damaged item! Contact us immediately with photos of the damage, and we'll send a replacement or full refund right away. Defective items are covered under our quality guarantee."
    },
    {
      question: "How can I contact customer service?",
      answer: "You can reach us by email at support@ssstores.com, call 1-800-SS-STORE, or use the contact form on our Contact page. Our team is available Monday-Friday 9AM-6PM EST."
    },
    {
      question: "Do you offer price matching?",
      answer: "We offer price matching on identical items from authorized retailers. The item must be in stock and the competitor's price must be verifiable. Contact customer service with the details for approval."
    },
    {
      question: "Can I use multiple discount codes?",
      answer: "Only one discount code can be used per order. If you have multiple codes, we'll automatically apply the one that gives you the best savings."
    }
  ];

  return (
    <div className="page-container">
      <div className="container" style={{ padding: '60px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Frequently Asked Questions</h1>
        
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '18px', color: '#666' }}>
            Find answers to common questions about shopping, shipping, returns, and more.
          </p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {faqData.map((item, index) => (
              <div 
                key={index}
                style={{ 
                  border: '1px solid #e2e8f0', 
                  borderRadius: '8px',
                  overflow: 'hidden'
                }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  style={{
                    width: '100%',
                    padding: '20px',
                    backgroundColor: openItems[index] ? '#f8fafc' : 'white',
                    border: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: '16px',
                    fontWeight: '600',
                    transition: 'background-color 0.2s ease'
                  }}
                >
                  <span>{item.question}</span>
                  {openItems[index] ? (
                    <FaMinus style={{ color: '#2563eb', fontSize: '14px' }} />
                  ) : (
                    <FaPlus style={{ color: '#2563eb', fontSize: '14px' }} />
                  )}
                </button>
                
                {openItems[index] && (
                  <div style={{ 
                    padding: '0 20px 20px 20px',
                    backgroundColor: '#f8fafc',
                    borderTop: '1px solid #e2e8f0'
                  }}>
                    <p style={{ 
                      margin: 0, 
                      lineHeight: '1.6',
                      color: '#4a5568'
                    }}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div style={{ 
            marginTop: '40px',
            textAlign: 'center',
            backgroundColor: '#f8fafc', 
            padding: '24px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0' 
          }}>
            <h3 style={{ marginBottom: '16px' }}>Still Have Questions?</h3>
            <p style={{ marginBottom: '16px' }}>
              Can't find what you're looking for? Our customer service team is here to help.
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

export default FAQ;
