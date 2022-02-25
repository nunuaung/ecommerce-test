import React from 'react'
import "./pagination.css";

const Pagination = ({perPage,totalProducts,paginate,activePage}) => {
    const pageNumbers = [];

    for(let i=1;  i<=Math.ceil(totalProducts/perPage); i++){
        pageNumbers.push(i);
    }

  return (
    <div className="pagination-nav">
        <ul className="pagination-list">
            {pageNumbers.length>1 ? (
                pageNumbers.map(num=>(
                    <li key={num} className={activePage==num ? "pagination-item active": "pagination-item"}>
                        <span className="pagination-link" onClick={()=>paginate(num)}>{num}</span>
                    </li>
                ))
            ) : ''   
            }
        </ul>
    </div>
  )
}

export default Pagination