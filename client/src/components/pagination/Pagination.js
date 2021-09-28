import React from 'react';
import { Link } from 'react-router-dom';


const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            {/* <a onClick={() => paginate(number)} href='!#' className='page-link'> */}
            <Link to='u!#' onClick={(e) => {paginate(number); e.preventDefault()}} className='page-link'>
              {number}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;