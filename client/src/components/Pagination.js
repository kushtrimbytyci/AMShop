import React from 'react'
import {Pagination} from 'react-bootstrap'


const PaginationComponent = ({active,length,setActivePage}) => {
    
let items = [];

for (let number = 1; number <= Math.ceil(length); number++) {
  items.push(
    <Pagination.Item key={number} active={number === active} onClick={()=>setActivePage(number)}>
      {number}
    </Pagination.Item>,
  );
}
    return (
        <Pagination size="sm">{items}</Pagination>
    )
}

export default PaginationComponent;
