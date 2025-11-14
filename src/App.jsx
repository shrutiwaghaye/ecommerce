import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import './styles.css';

function App() {
  const { isAuthenticated } = useSelector(state => state.auth);
  
  // Simple routing based on URL path
  const getCurrentPage = () => {
    const path = window.location.pathname;
    
    switch (path) {
      case '/login':
        return <Login />;
      case '/checkout':
        return <Checkout />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="App">
      <Navbar />
      <main>
        {getCurrentPage()}
      </main>
    </div>
  );
}

export default App;