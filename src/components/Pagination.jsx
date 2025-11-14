import React from 'react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const pages = [];
  
  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div style={styles.pagination}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.button}
      >
        Previous
      </button>
      
      {pages.map(page => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          style={{
            ...styles.button,
            ...(page === currentPage ? styles.activeButton : {})
          }}
        >
          {page}
        </button>
      ))}
      
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.button}
      >
        Next
      </button>
    </div>
  );
};

const styles = {
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '0.5rem',
    margin: '2rem 0',
  },
  button: {
    padding: '0.5rem 1rem',
    border: '1px solid #ddd',
    backgroundColor: 'white',
    cursor: 'pointer',
    borderRadius: '4px',
    transition: 'all 0.3s',
  },
  activeButton: {
    backgroundColor: '#3498db',
    color: 'white',
    borderColor: '#3498db',
  },
};

export default Pagination;