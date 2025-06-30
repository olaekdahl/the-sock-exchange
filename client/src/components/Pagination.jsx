import PropTypes from 'prop-types';

const Pagination = ({ totalItems, currentPage, setCurrentPage, itemsPerPage = 10 }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <nav aria-label="Page navigation example">
      <ul className="pagination justify-content-center">
        <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handlePrevious} 
            disabled={currentPage === 1}
            aria-label="Go to previous page"
          >
            Previous
          </button>
        </li>
        {[...Array(totalPages)].map((_, index) => (
          <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
            <button 
              className="page-link" 
              onClick={() => setCurrentPage(index + 1)}
              aria-label={`Go to page ${index + 1}`}
              aria-current={currentPage === index + 1 ? "page" : undefined}
            >
              {index + 1}
            </button>
          </li>
        ))}
        <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
          <button 
            className="page-link" 
            onClick={handleNext} 
            disabled={currentPage === totalPages}
            aria-label="Go to next page"
          >
            Next
          </button>
        </li>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  totalItems: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  itemsPerPage: PropTypes.number,
};

export default Pagination;
