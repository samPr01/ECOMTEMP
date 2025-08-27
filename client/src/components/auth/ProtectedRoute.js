import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

/**
 * Protected Route Component
 * Redirects unauthenticated users to login page
 * Preserves the intended destination for post-login redirect
 */
const ProtectedRoute = ({ children, requiredRole = null }) => {
  const { isAuthenticated, user, loading } = useAuth();
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="protected-route-loading">
        <div className="spinner-container">
          <div className="spinner"></div>
          <p>Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return (
      <Navigate 
        to="/login" 
        state={{ from: location }} 
        replace 
      />
    );
  }

  // Check role-based access if required
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to unauthorized page or dashboard based on role
    const redirectPath = user?.role === 'admin' ? '/admin' : '/dashboard';
    return (
      <Navigate 
        to={redirectPath} 
        replace 
      />
    );
  }

  // Render children if authenticated and authorized
  return children;
};

/**
 * Admin Route Component
 * Specifically for admin-only routes
 */
export const AdminRoute = ({ children }) => {
  return (
    <ProtectedRoute requiredRole="admin">
      {children}
    </ProtectedRoute>
  );
};

/**
 * Customer Route Component
 * For customer-specific routes (optional, defaults to any authenticated user)
 */
export const CustomerRoute = ({ children }) => {
  return (
    <ProtectedRoute>
      {children}
    </ProtectedRoute>
  );
};

export default ProtectedRoute;
