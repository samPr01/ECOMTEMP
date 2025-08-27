import React, { useState, useEffect } from 'react';
import { FaBox, FaShoppingCart, FaUsers, FaDollarSign, FaEye, FaEdit, FaTrash } from 'react-icons/fa';
import axios from 'axios';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (activeTab === 'products') {
      fetchProducts();
    } else if (activeTab === 'orders') {
      fetchOrders();
    }
  }, [activeTab]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/orders');
      setOrders(response.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const getDashboardStats = () => {
    const totalProducts = products.length;
    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((sum, order) => sum + parseFloat(order.total), 0);
    const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    return {
      totalProducts,
      totalOrders,
      totalRevenue,
      avgOrderValue
    };
  };

  const stats = getDashboardStats();

  return (
    <div style={{ padding: '40px 0', background: '#f8fafc', minHeight: '100vh' }}>
      <div className="container">
        <h1 style={{ fontSize: '32px', fontWeight: '700', marginBottom: '32px' }}>
          SS Stores Admin Dashboard
        </h1>

        {/* Navigation Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '8px', 
          marginBottom: '32px',
          borderBottom: '2px solid #e5e7eb'
        }}>
          {[
            { key: 'dashboard', label: 'Dashboard', icon: <FaDollarSign /> },
            { key: 'products', label: 'Products', icon: <FaBox /> },
            { key: 'orders', label: 'Orders', icon: <FaShoppingCart /> }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 24px',
                border: 'none',
                background: activeTab === tab.key ? '#2563eb' : 'transparent',
                color: activeTab === tab.key ? 'white' : '#6b7280',
                borderRadius: '8px 8px 0 0',
                cursor: 'pointer',
                fontWeight: '500',
                fontSize: '16px'
              }}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div>
            {/* Stats Cards */}
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '24px',
              marginBottom: '40px'
            }}>
              <div style={{ 
                background: 'white', 
                padding: '24px', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FaBox style={{ fontSize: '24px', color: '#2563eb' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>
                    Total Products
                  </h3>
                </div>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                  {stats.totalProducts.toLocaleString()}
                </p>
              </div>

              <div style={{ 
                background: 'white', 
                padding: '24px', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FaShoppingCart style={{ fontSize: '24px', color: '#10b981' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>
                    Total Orders
                  </h3>
                </div>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                  {stats.totalOrders.toLocaleString()}
                </p>
              </div>

              <div style={{ 
                background: 'white', 
                padding: '24px', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FaDollarSign style={{ fontSize: '24px', color: '#f59e0b' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>
                    Total Revenue
                  </h3>
                </div>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                  ${stats.totalRevenue.toFixed(2)}
                </p>
              </div>

              <div style={{ 
                background: 'white', 
                padding: '24px', 
                borderRadius: '12px',
                border: '1px solid #e5e7eb'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                  <FaUsers style={{ fontSize: '24px', color: '#8b5cf6' }} />
                  <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#6b7280' }}>
                    Avg Order Value
                  </h3>
                </div>
                <p style={{ fontSize: '32px', fontWeight: '700', color: '#1f2937' }}>
                  ${stats.avgOrderValue.toFixed(2)}
                </p>
              </div>
            </div>

            {/* Recent Orders */}
            <div style={{ background: 'white', padding: '24px', borderRadius: '12px' }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '20px' }}>
                Recent Orders
              </h3>
              {orders.slice(0, 5).map(order => (
                <div 
                  key={order.id}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '16px 0',
                    borderBottom: '1px solid #e5e7eb'
                  }}
                >
                  <div>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                      {order.orderNumber}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      {order.customerInfo.firstName} {order.customerInfo.lastName}
                    </p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontWeight: '600', marginBottom: '4px' }}>
                      ${order.total}
                    </p>
                    <p style={{ color: '#6b7280', fontSize: '14px' }}>
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Products Tab */}
        {activeTab === 'products' && (
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px' }}>
            <div style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              alignItems: 'center',
              marginBottom: '24px'
            }}>
              <h3 style={{ fontSize: '20px', fontWeight: '700' }}>
                Products ({products.length})
              </h3>
              <button className="btn btn-primary">
                Add Product
              </button>
            </div>

            {loading ? (
              <div className="spinner"></div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Product</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Category</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Price</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Stock</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Status</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.slice(0, 20).map(product => (
                      <tr key={product.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{
                              width: '40px',
                              height: '40px',
                              background: '#f3f4f6',
                              borderRadius: '6px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontSize: '16px',
                              color: '#6b7280'
                            }}>
                              📷
                            </div>
                            <div>
                              <p style={{ fontWeight: '500', marginBottom: '2px' }}>
                                {product.title}
                              </p>
                              <p style={{ color: '#6b7280', fontSize: '12px' }}>
                                {product.brand}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>
                          {product.categoryName}
                        </td>
                        <td style={{ padding: '12px', fontWeight: '600' }}>
                          ${product.price}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: product.stock > 10 ? '#dcfce7' : '#fef3c7',
                            color: product.stock > 10 ? '#166534' : '#92400e',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {product.stock} units
                          </span>
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: product.inStock ? '#dcfce7' : '#fee2e2',
                            color: product.inStock ? '#166534' : '#dc2626',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
                            <button style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#2563eb', 
                              cursor: 'pointer',
                              padding: '4px'
                            }}>
                              <FaEye />
                            </button>
                            <button style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#f59e0b', 
                              cursor: 'pointer',
                              padding: '4px'
                            }}>
                              <FaEdit />
                            </button>
                            <button style={{ 
                              background: 'none', 
                              border: 'none', 
                              color: '#ef4444', 
                              cursor: 'pointer',
                              padding: '4px'
                            }}>
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div style={{ background: 'white', padding: '24px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '24px' }}>
              Orders ({orders.length})
            </h3>

            {loading ? (
              <div className="spinner"></div>
            ) : (
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Order #</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Customer</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Date</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Items</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Total</th>
                      <th style={{ textAlign: 'left', padding: '12px', fontWeight: '600' }}>Status</th>
                      <th style={{ textAlign: 'center', padding: '12px', fontWeight: '600' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '12px', fontWeight: '500' }}>
                          {order.orderNumber}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <div>
                            <p style={{ fontWeight: '500', marginBottom: '2px' }}>
                              {order.customerInfo.firstName} {order.customerInfo.lastName}
                            </p>
                            <p style={{ color: '#6b7280', fontSize: '12px' }}>
                              {order.customerInfo.email}
                            </p>
                          </div>
                        </td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                        <td style={{ padding: '12px', color: '#6b7280' }}>
                          {order.items.length} items
                        </td>
                        <td style={{ padding: '12px', fontWeight: '600' }}>
                          ${order.total}
                        </td>
                        <td style={{ padding: '12px' }}>
                          <span style={{
                            background: '#dcfce7',
                            color: '#166534',
                            padding: '4px 8px',
                            borderRadius: '4px',
                            fontSize: '12px',
                            fontWeight: '500'
                          }}>
                            {order.status}
                          </span>
                        </td>
                        <td style={{ padding: '12px', textAlign: 'center' }}>
                          <button style={{ 
                            background: 'none', 
                            border: 'none', 
                            color: '#2563eb', 
                            cursor: 'pointer',
                            padding: '4px'
                          }}>
                            <FaEye />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
