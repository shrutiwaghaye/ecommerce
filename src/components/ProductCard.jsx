import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div style={styles.card}>
      <img src={product.thumbnail} alt={product.title} style={styles.image} />
      <h3>{product.title}</h3>
      <p>${product.price}</p>
      <button style={styles.button} onClick={handleAddToCart}>
        Add to Cart
      </button>
    </div>
  );
};

const styles = {
  card: { border: '1px solid #ddd', padding: '1rem', borderRadius: '8px', textAlign: 'center' },
  image: { width: '100%', height: '200px', objectFit: 'cover', marginBottom: '1rem' },
  button: { padding: '0.5rem 1rem', backgroundColor: '#3498db', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
};

export default ProductCard;
