import React from 'react';
import PropTypes from 'prop-types';

/**
 * ErrorBoundary Component
 * 
 * A React Error Boundary that catches JavaScript errors anywhere in the child component tree,
 * logs those errors, and displays a fallback UI instead of the component tree that crashed.
 * 
 * Usage:
 * <ErrorBoundary>
 *   <YourComponent />
 * </ErrorBoundary>
 * 
 * Or with custom fallback:
 * <ErrorBoundary fallback={<CustomErrorComponent />}>
 *   <YourComponent />
 * </ErrorBoundary>
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Update state with error details
    this.setState({
      error: error,
      errorInfo: errorInfo,
      eventId: this.generateEventId()
    });

    // Log to external service (if configured)
    this.logErrorToService(error, errorInfo);
  }

  generateEventId = () => {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  };

  logErrorToService = (error, errorInfo) => {
    // In a real application, you would send this to your error reporting service
    // Examples: Sentry, LogRocket, Bugsnag, etc.
    
    const errorReport = {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      userId: this.props.userId || 'anonymous',
      eventId: this.state.eventId
    };

    // Example: Send to your API endpoint
    if (process.env.NODE_ENV === 'production' && this.props.reportErrors) {
      fetch('/api/errors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(errorReport)
      }).catch(err => {
        console.error('Failed to report error:', err);
      });
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.group('🚨 Error Boundary Report');
      console.error('Error:', error);
      console.error('Error Info:', errorInfo);
      console.error('Full Report:', errorReport);
      console.groupEnd();
    }
  };

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
      eventId: null
    });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI provided by parent
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Custom fallback render function
      if (this.props.fallbackRender) {
        return this.props.fallbackRender(
          this.state.error,
          this.state.errorInfo,
          this.handleRetry
        );
      }

      // Default fallback UI
      return (
        <div className="error-boundary">
          <div className="error-boundary-container">
            <div className="error-boundary-icon">
              ⚠️
            </div>
            <h2 className="error-boundary-title">
              {this.props.title || 'Oops! Something went wrong'}
            </h2>
            <p className="error-boundary-message">
              {this.props.message || 
                'We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.'}
            </p>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="error-boundary-details">
                <summary>Error Details (Development Only)</summary>
                <div className="error-boundary-error-info">
                  <h4>Error:</h4>
                  <pre>{this.state.error && this.state.error.toString()}</pre>
                  <h4>Component Stack:</h4>
                  <pre>{this.state.errorInfo.componentStack}</pre>
                  {this.state.eventId && (
                    <>
                      <h4>Event ID:</h4>
                      <code>{this.state.eventId}</code>
                    </>
                  )}
                </div>
              </details>
            )}

            <div className="error-boundary-actions">
              <button 
                className="error-boundary-button error-boundary-button-primary"
                onClick={this.handleRetry}
              >
                Try Again
              </button>
              <button 
                className="error-boundary-button error-boundary-button-secondary"
                onClick={this.handleReload}
              >
                Reload Page
              </button>
              {this.props.onContactSupport && (
                <button 
                  className="error-boundary-button error-boundary-button-tertiary"
                  onClick={() => this.props.onContactSupport(this.state.eventId)}
                >
                  Contact Support
                </button>
              )}
            </div>

            {this.state.eventId && (
              <p className="error-boundary-event-id">
                Error ID: <code>{this.state.eventId}</code>
              </p>
            )}
          </div>

          <style jsx>{`
            .error-boundary {
              display: flex;
              align-items: center;
              justify-content: center;
              min-height: 400px;
              padding: 20px;
              background-color: #f8f9fa;
              border: 1px solid #dee2e6;
              border-radius: 8px;
              margin: 20px 0;
            }

            .error-boundary-container {
              text-align: center;
              max-width: 600px;
              padding: 40px;
              background: white;
              border-radius: 12px;
              box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            }

            .error-boundary-icon {
              font-size: 4rem;
              margin-bottom: 20px;
            }

            .error-boundary-title {
              color: #dc3545;
              margin-bottom: 16px;
              font-size: 1.5rem;
              font-weight: 600;
            }

            .error-boundary-message {
              color: #6c757d;
              margin-bottom: 24px;
              line-height: 1.6;
            }

            .error-boundary-details {
              text-align: left;
              margin: 20px 0;
              padding: 16px;
              background-color: #f8f9fa;
              border: 1px solid #dee2e6;
              border-radius: 6px;
            }

            .error-boundary-details summary {
              cursor: pointer;
              font-weight: 600;
              margin-bottom: 12px;
            }

            .error-boundary-error-info h4 {
              margin: 12px 0 8px 0;
              color: #495057;
            }

            .error-boundary-error-info pre {
              background-color: #e9ecef;
              padding: 12px;
              border-radius: 4px;
              overflow-x: auto;
              font-size: 0.875rem;
              white-space: pre-wrap;
              word-break: break-word;
            }

            .error-boundary-error-info code {
              background-color: #e9ecef;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: 'Monaco', 'Consolas', monospace;
            }

            .error-boundary-actions {
              display: flex;
              gap: 12px;
              justify-content: center;
              flex-wrap: wrap;
              margin-bottom: 20px;
            }

            .error-boundary-button {
              padding: 12px 24px;
              border: none;
              border-radius: 6px;
              font-weight: 500;
              cursor: pointer;
              transition: all 0.2s ease;
              font-size: 0.875rem;
            }

            .error-boundary-button:hover {
              transform: translateY(-1px);
            }

            .error-boundary-button-primary {
              background-color: #007bff;
              color: white;
            }

            .error-boundary-button-primary:hover {
              background-color: #0056b3;
            }

            .error-boundary-button-secondary {
              background-color: #6c757d;
              color: white;
            }

            .error-boundary-button-secondary:hover {
              background-color: #545b62;
            }

            .error-boundary-button-tertiary {
              background-color: #28a745;
              color: white;
            }

            .error-boundary-button-tertiary:hover {
              background-color: #1e7e34;
            }

            .error-boundary-event-id {
              font-size: 0.75rem;
              color: #6c757d;
              margin-top: 16px;
            }

            .error-boundary-event-id code {
              background-color: #e9ecef;
              padding: 2px 6px;
              border-radius: 3px;
              font-family: 'Monaco', 'Consolas', monospace;
            }

            @media (max-width: 768px) {
              .error-boundary {
                margin: 10px 0;
                padding: 10px;
              }

              .error-boundary-container {
                padding: 20px;
              }

              .error-boundary-actions {
                flex-direction: column;
              }

              .error-boundary-button {
                width: 100%;
              }
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  fallback: PropTypes.element,
  fallbackRender: PropTypes.func,
  title: PropTypes.string,
  message: PropTypes.string,
  userId: PropTypes.string,
  reportErrors: PropTypes.bool,
  onContactSupport: PropTypes.func
};

ErrorBoundary.defaultProps = {
  reportErrors: true
};

export default ErrorBoundary;

/**
 * Higher-Order Component (HOC) to wrap components with ErrorBoundary
 * 
 * Usage:
 * const SafeComponent = withErrorBoundary(MyComponent, {
 *   title: 'Custom Error Title',
 *   message: 'Custom error message'
 * });
 */
export const withErrorBoundary = (WrappedComponent, errorBoundaryProps = {}) => {
  const WithErrorBoundaryComponent = (props) => (
    <ErrorBoundary {...errorBoundaryProps}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  WithErrorBoundaryComponent.displayName = 
    `withErrorBoundary(${WrappedComponent.displayName || WrappedComponent.name})`;

  return WithErrorBoundaryComponent;
};

/**
 * Hook to manually trigger error boundary (for testing purposes)
 * 
 * Usage:
 * const throwError = useErrorHandler();
 * throwError(new Error('Test error'));
 */
export const useErrorHandler = () => {
  return (error) => {
    throw error;
  };
};
