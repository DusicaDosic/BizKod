import { useState } from 'react';
import { LiaAngleLeftSolid, LiaAngleRightSolid } from "react-icons/lia";
import "./Pagination.scss"

interface PaginationProps {
    totalPages: number;
    onPageChange: (page: number) => void;
}

const Pagination = ({ totalPages, onPageChange }: PaginationProps) => {
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const pageNumbers: number[] = [];
    const maxPageNumbers = 2;

    for (let page = Math.max(1, currentPage - maxPageNumbers); page <= Math.min(totalPages, currentPage + maxPageNumbers); page++) {
        pageNumbers.push(page);
    }

    return (
        <div className='pagination-container'>
            <button key="first" className='first' onClick={() => handlePageChange(1)} disabled={currentPage === 1}>
                First
            </button>
            <button key="prev" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                <LiaAngleLeftSolid size="14px" />
            </button>
            {pageNumbers.map((page) => <button
                key={page}
                onClick={() => handlePageChange(page)}
                disabled={currentPage === page}>
                {page}
            </button>)}
            <button key="next" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                <LiaAngleRightSolid size="14px" />
            </button>
            <button key="last" className='last' onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages}>
                Last
            </button>
        </div>
    )
}

export default Pagination;