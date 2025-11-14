import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { 
  removeFromCart, 
  addToCart, 
  removeItemCompletely, 
  clearCart 
} from '../features/cart/cartSlice';

const Checkout = () => {
  const { items, totalAmount, totalQuantity } = useSelector(state => state.cart);
  const { isAuthenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(addToCart(item));
  };

  const handleDecrement = (itemId) => {
    dispatch(removeFromCart(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItemCompletely(itemId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      alert('Please login to proceed with checkout');
      window.location.href = '/login';
      return;
    }
    
    alert('Order placed successfully!');
    dispatch(clearCart());
  };

  if (items.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <h2>Your cart is empty</h2>
        <p>Add some products to your cart to see them here.</p>
        <a href="/" style={styles.continueShopping}>
          Continue Shopping
        </a>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1>Shopping Cart</h1>
        <button onClick={handleClearCart} style={styles.clearButton}>
          Clear Cart
        </button>
      </div>

      <div style={styles.cartContainer}>
        <div style={styles.cartItems}>
          {items.map(item => (
            <div key={item.id} style={styles.cartItem}>
              <img 
                src={item.image} 
                alt={item.title}
                style={styles.itemImage}
              />
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemTitle}>{item.title}</h3>
                <p style={styles.itemPrice}>${item.price}</p>
              </div>

              <div style={styles.quantityControls}>
                <button 
                  onClick={() => handleDecrement(item.id)}
                  style={styles.quantityButton}
                >
                  -
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => handleIncrement(item)}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>

              <div style={styles.itemTotal}>
                ${(item.quantity * item.price).toFixed(2)}
              </div>

              <button 
                onClick={() => handleRemove(item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summary}>
          <h2>Order Summary</h2>
          <div style={styles.summaryRow}>
            <span>Total Items:</span>
            <span>{totalQuantity}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Subtotal:</span>
            <span>${totalAmount.toFixed(2)}</span>
          </div>
          <div style={styles.summaryRow}>
            <span>Shipping:</span>
            <span>$5.00</span>
          </div>
          <div style={{...styles.summaryRow, ...styles.total}}>
            <span>Total:</span>
            <span>${(totalAmount + 5).toFixed(2)}</span>
          </div>
          
          <button 
            onClick={handleCheckout}
            style={styles.checkoutButton}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '2rem 1rem',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
  },
  clearButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  cartContainer: {
    display: 'grid',
    gridTemplateColumns: '1fr 300px',
    gap: '2rem',
  },
  cartItems: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  cartItem: {
    display: 'grid',
    gridTemplateColumns: '100px 1fr auto auto auto',
    gap: '1rem',
    alignItems: 'center',
    padding: '1rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    backgroundColor: 'white',
  },
  itemImage: {
    width: '100px',
    height: '100px',
    objectFit: 'contain',
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    fontSize: '1rem',
    marginBottom: '0.5rem',
  },
  itemPrice: {
    color: '#666',
    fontWeight: 'bold',
  },
  quantityControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
  },
  quantityButton: {
    width: '30px',
    height: '30px',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  quantity: {
    padding: '0 1rem',
    fontWeight: 'bold',
  },
  itemTotal: {
    fontWeight: 'bold',
    fontSize: '1.1rem',
  },
  removeButton: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  summary: {
    backgroundColor: 'white',
    padding: '1.5rem',
    border: '1px solid #ddd',
    borderRadius: '8px',
    height: 'fit-content',
  },
  summaryRow: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #eee',
  },
  total: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    borderBottom: 'none',
    marginTop: '1rem',
  },
  checkoutButton: {
    width: '100%',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    padding: '1rem',
    borderRadius: '4px',
    fontSize: '1.1rem',
    cursor: 'pointer',
    marginTop: '1rem',
  },
  emptyContainer: {
    textAlign: 'center',
    padding: '4rem 2rem',
  },
  continueShopping: {
    display: 'inline-block',
    backgroundColor: '#3498db',
    color: 'white',
    padding: '1rem 2rem',
    textDecoration: 'none',
    borderRadius: '4px',
    marginTop: '1rem',
  },
};

export default Checkout;