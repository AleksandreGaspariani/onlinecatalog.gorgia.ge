import React from 'react';

const Pagination = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const getPageNumbers = () => {
    if (totalPages <= 5) {
      return [...Array(totalPages).keys()].map(n => n + 1);
    }
    let pages = [];
    if (currentPage <= 3) {
      pages = [1, 2, 3, '...', totalPages];
    } else if (currentPage >= totalPages - 2) {
      pages = [1, '...', totalPages - 2, totalPages - 1, totalPages];
    } else {
      pages = [1, '...', currentPage, '...', totalPages];
    }
    return pages;
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '32px auto', justifyContent: 'center' }}>
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className={'hoveredButton'}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '22px',
          color: currentPage === 1 ? '#bdbdbd' : '#017dbe',
          outline: 'none'
        }}
      >
        &lt;
      </button>
      {getPageNumbers().map((page, idx) =>
        page === '...' ? (
          <span key={idx} style={{ padding: '0 8px', color: '#017dbe' }}>...</span>
        ) : (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            style={{
              background: currentPage === page ? '#017dbe' : 'none',
              color: currentPage === page ? '#fff' : '#017dbe',
              border: 'none',
              width: '32px',
              height: '32px',
              cursor: 'pointer',
              fontWeight: 'bold',
              textAlign: 'center',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              outline: 'none'
            }}
          >
            {page}
          </button>
        )
      )}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '22px',
          color: currentPage === totalPages ? '#bdbdbd' : '#017dbe',
          outline: 'none'
        }}
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
