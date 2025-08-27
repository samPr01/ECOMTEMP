import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

/**
 * Logout Button Component
 * Handles user logout with confirmation
 * Clears stored tokens and updates auth state
 */
const LogoutButton = ({ className = '', showConfirmation = true, children }) => {
  const [showModal, setShowModal] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  // Handle logout action
  const handleLogout = async () => {
    if (showConfirmation && !showModal) {
      setShowModal(true);
      return;
    }

    setIsLoggingOut(true);
    
    try {
      await logout();
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoggingOut(false);
      setShowModal(false);
    }
  };

  // Cancel logout
  const handleCancel = () => {
    setShowModal(false);
  };

  return (
    <>
      <button
        onClick={handleLogout}
        className={`logout-button ${className}`}
        disabled={isLoggingOut}
        title="Sign out of your account"
      >
        {isLoggingOut ? (
          <>
            <span className="spinner-small"></span>
            Signing out...
          </>
        ) : (
          children || (
            <>
              <span className="logout-icon">🚪</span>
              Logout
            </>
          )
        )}
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={handleCancel}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Confirm Logout</h3>
            </div>
            <div className="modal-body">
              <p>
                Are you sure you want to sign out of your account?
              </p>
              {user && (
                <div className="user-info">
                  <strong>{user.firstName} {user.lastName}</strong>
                  <br />
                  <small>{user.email}</small>
                </div>
              )}
            </div>
            <div className="modal-footer">
              <button
                onClick={handleCancel}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={handleLogout}
                className="btn btn-danger"
                disabled={isLoggingOut}
              >
                {isLoggingOut ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

/**
 * Simple Logout Link Component
 * For use in navigation menus without confirmation
 */
export const LogoutLink = ({ className = '' }) => {
  return (
    <LogoutButton 
      className={`logout-link ${className}`}
      showConfirmation={false}
    >
      Sign Out
    </LogoutButton>
  );
};

/**
 * Logout Menu Item Component
 * For dropdown menus with icon
 */
export const LogoutMenuItem = ({ onClick }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = async () => {
    if (onClick) onClick();
    await logout();
    navigate('/', { replace: true });
  };

  return (
    <button
      onClick={handleClick}
      className="menu-item logout-menu-item"
    >
      <span className="menu-icon">🚪</span>
      Sign Out
    </button>
  );
};

export default LogoutButton;
