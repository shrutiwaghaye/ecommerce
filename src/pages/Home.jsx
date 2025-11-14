import React, { useState } from 'react';
import { useGetAllProductsQuery, useGetCategoriesQuery } from '../features/products/productsAPI';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState('');
  const productsPerPage = 8;

  const { 
    data: products = [], 
    isLoading: productsLoading, 
    error: productsError 
  } = useGetAllProductsQuery();

  const { 
    data: categories = [], 
    isLoading: categoriesLoading 
  } = useGetCategoriesQuery();

  // Filter products by category
  const filteredProducts = selectedCategory
    ? products.filter(product => product.category === selectedCategory)
    : products;

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  if (productsLoading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (productsError) {
    return (
      <div style={styles.error}>
        <h2>Error loading products</h2>
        <p>Please try again later.</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Our Products</h1>

        {/* Category Filter */}
        <div style={styles.filters}>
          <button
            onClick={() => handleCategoryChange('')}
            style={{
              ...styles.filterButton,
              ...(selectedCategory === '' ? styles.activeFilter : {})
            }}
          >
            All Products
          </button>

          {categoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                style={{
                  ...styles.filterButton,
                  ...(selectedCategory === category ? styles.activeFilter : {})
                }}
              >
                {category}
              </button>
            ))
          )}
        </div>
      </div>

      {/* Products Grid */}
      <div style={styles.productsGrid}>
        {currentProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
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
    textAlign: 'center',
    marginBottom: '2rem',
  },
  title: {
    fontSize: '2.5rem',
    color: '#2c3e50',
    marginBottom: '1rem',
  },
  filters: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginBottom: '2rem',
  },
  filterButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s',
    textTransform: 'capitalize',
  },
  activeFilter: {
    backgroundColor: '#3498db',
    color: 'white',
    borderColor: '#3498db',
  },
  productsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '2rem',
    marginBottom: '2rem',
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '50vh',
  },
  spinner: {
    border: '4px solid #f3f3f3',
    borderTop: '4px solid #3498db',
    borderRadius: '50%',
    width: '50px',
    height: '50px',
    animation: 'spin 2s linear infinite',
  },
  error: {
    textAlign: 'center',
    padding: '2rem',
    color: '#e74c3c',
  },
};

export default Home;
