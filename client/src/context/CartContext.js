import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { toast } from 'react-toastify';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        total: action.payload.total,
        count: action.payload.count
      };
    case 'SET_LOADING':
      return {
        ...state,
        loading: action.payload
      };
    case 'ADD_ITEM':
      return {
        ...state,
        count: state.count + 1
      };
    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        total: 0,
        count: 0
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    count: 0,
    loading: false,
    sessionId: localStorage.getItem('cartSessionId') || uuidv4()
  });

  useEffect(() => {
    // Save session ID to localStorage
    localStorage.setItem('cartSessionId', state.sessionId);
    
    // Load cart on mount
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      const response = await axios.get(`/api/cart/${state.sessionId}`);
      dispatch({ type: 'SET_CART', payload: response.data });
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const addToCart = async (productId, quantity = 1, size = null) => {
    try {
      const response = await axios.post('/api/cart/add', {
        sessionId: state.sessionId,
        productId,
        quantity,
        size
      });
      
      dispatch({ type: 'ADD_ITEM' });
      toast.success('Product added to cart!');
      await loadCart(); // Refresh cart
      
      return response.data;
    } catch (error) {
      toast.error('Failed to add product to cart');
      throw error;
    }
  };

  const updateCartItem = async (itemId, quantity) => {
    try {
      await axios.put('/api/cart/update', {
        sessionId: state.sessionId,
        itemId,
        quantity
      });
      
      await loadCart(); // Refresh cart
      toast.success('Cart updated!');
    } catch (error) {
      toast.error('Failed to update cart');
      throw error;
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      await axios.delete('/api/cart/remove', {
        data: {
          sessionId: state.sessionId,
          itemId
        }
      });
      
      await loadCart(); // Refresh cart
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item from cart');
      throw error;
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const value = {
    ...state,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart,
    loadCart
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
