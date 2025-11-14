import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const { totalQuantity } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <h2>Ecommerce RTK</h2>
        </div>
        
        <div style={styles.navLinks}>
          <a href="/" style={styles.navLink}>Home</a>
          <a href="/checkout" style={styles.navLink}>
            Cart ({totalQuantity})
          </a>
          
          {isAuthenticated ? (
            <>
              <span style={styles.user}>Hello, {user?.username}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <a href="/login" style={styles.navLink}>Login</a>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#2c3e50',
    color: 'white',
    padding: '1rem 0',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 1rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
  },
  navLinks: {
    display: 'flex',
    alignItems: 'center',
    gap: '1.5rem',
  },
  navLink: {
    color: 'white',
    textDecoration: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  },
  user: {
    marginRight: '1rem',
  },
  logoutBtn: {
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

export default Navbar;