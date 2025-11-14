import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../features/auth/authAPI';
import { loginStart, loginSuccess, loginFailure } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate('/'); // redirect to home
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Login</h2>
        {error && <div style={styles.error}>{error}</div>}
        <div style={styles.inputGroup}>
          <label style={styles.label}>Username</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <div style={styles.inputGroup}>
          <label style={styles.label}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <div style={styles.demo}>
          <p>Demo credentials:</p>
          <p>Username: johnd</p>
          <p>Password: m38rmF$</p>
        </div>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', padding: '2rem',
  },
  form: {
    backgroundColor: 'white', padding: '2rem', borderRadius: '8px',
    boxShadow: '0 4px 6px rgba(0,0,0,0.1)', width: '100%', maxWidth: '400px',
  },
  title: { textAlign: 'center', marginBottom: '2rem', color: '#2c3e50' },
  inputGroup: { marginBottom: '1rem' },
  label: { display: 'block', marginBottom: '0.5rem', color: '#555' },
  input: { width: '100%', padding: '0.75rem', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1rem' },
  button: { width: '100%', padding: '0.75rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', fontSize: '1rem', cursor: 'pointer', transition: 'background-color 0.3s' },
  error: { backgroundColor: '#f8d7da', color: '#721c24', padding: '0.75rem', borderRadius: '4px', marginBottom: '1rem' },
  demo: { marginTop: '1.5rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '4px', fontSize: '0.9rem', color: '#666' },
};

export default Login;
