import React, { useState } from 'react';
import Pagination from 'react-bootstrap/Pagination';
import { useSelector } from 'react-redux';

const Paggination = (props) => {
  const hotels = useSelector((state) => state.hotels);
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(hotels.length / props.number); ++i) {
    pageNumbers.push(
      <Pagination.Item
        key={i}
        onClick={() => props.paginateHandler(i)}
        active={i == props.currentPage ? 'active' : ''}
      >
        {i}
      </Pagination.Item>
    );
  }
  return (
    <div className="d-flex mt-3 max-w-100">
      {pageNumbers.length ? <Pagination> {pageNumbers}</Pagination> : null}
    </div>
  );
};

export default Paggination;
