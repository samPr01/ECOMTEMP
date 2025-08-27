import React from 'react';

const SizeGuide = () => {
  return (
    <div className="page-container">
      <div className="container" style={{ padding: '60px 0' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Size Guide</h1>
        
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>How to Measure</h2>
            <p style={{ marginBottom: '16px' }}>
              For the best fit, measure yourself using a soft measuring tape. Keep the tape snug but not tight.
            </p>
            <ul style={{ marginLeft: '20px', marginBottom: '20px' }}>
              <li><strong>Chest/Bust:</strong> Measure around the fullest part of your chest</li>
              <li><strong>Waist:</strong> Measure around your natural waistline</li>
              <li><strong>Hips:</strong> Measure around the fullest part of your hips</li>
              <li><strong>Inseam:</strong> Measure from crotch to ankle</li>
            </ul>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Men's Clothing</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Size</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Chest (inches)</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Waist (inches)</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Hip (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XS</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>32-34</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>26-28</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>32-34</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>S</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>28-30</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>M</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>36-38</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-32</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>36-38</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>L</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>38-40</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>32-34</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>38-40</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>40-42</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>40-42</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XXL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>42-44</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>36-38</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>42-44</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Women's Clothing</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Size</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Bust (inches)</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Waist (inches)</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Hip (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XS</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-32</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>24-26</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>S</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>32-34</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>26-28</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>36-38</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>M</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>28-30</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>38-40</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>L</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>36-38</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>30-32</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>40-42</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>38-40</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>32-34</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>42-44</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>XXL</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>40-42</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>34-36</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>44-46</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ marginBottom: '20px' }}>Footwear</h2>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #ddd' }}>
                <thead>
                  <tr style={{ backgroundColor: '#f8fafc' }}>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>US Men's</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>US Women's</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>EU</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>UK</th>
                    <th style={{ padding: '12px', border: '1px solid #ddd', textAlign: 'left' }}>Length (inches)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>7</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>8.5</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>40</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>6</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>9.6</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>8</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>9.5</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>41</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>7</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>9.9</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>9</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10.5</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>42</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>8</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10.2</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>11.5</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>43</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>9</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10.5</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>11</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>12.5</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>44</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10</td>
                    <td style={{ padding: '12px', border: '1px solid #ddd' }}>10.8</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <div style={{ 
            backgroundColor: '#f8fafc', 
            padding: '24px', 
            borderRadius: '8px', 
            border: '1px solid #e2e8f0' 
          }}>
            <h3 style={{ marginBottom: '16px' }}>Still Need Help?</h3>
            <p style={{ marginBottom: '12px' }}>
              If you're between sizes or need additional assistance, our customer service team is here to help.
            </p>
            <p>
              <strong>Email:</strong> support@ssstores.com<br />
              <strong>Phone:</strong> 1-800-SS-STORE
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SizeGuide;
