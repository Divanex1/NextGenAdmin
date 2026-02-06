import React from "react";

const Pagination = ({ currentPage, onPageChange, totalItems, itemPerPage }) => {

    const maxPages = Math.ceil(totalItems / itemPerPage);
    // console.log("maxPAges", maxPages)
    const gotoPrevPage = () => {
        if (currentPage > 1) {
            onPageChange(currentPage - 1);
        }
    };
    const gotoNextPage = () => {
        if (currentPage < maxPages) {
            onPageChange(currentPage + 1);
        }
    };

    const gotoFirstPage = () => {
        if (currentPage !== 1) {
            onPageChange(1);
        }
    };

    const gotoLastPage = () => {
        if (currentPage !== maxPages) {
            onPageChange(maxPages);
        }
    };
    return (
        <>
            <div className="d-flex justify-content-end pt-30 mt-3">
                <nav aria-label="..." className="dm-page">
                    <ul className="dm-pagination d-flex">
                        {currentPage > 1 && (
                            <li className="dm-pagination__item">
                                <button
                                    className="dm-pagination__link pagination-control"
                                    onClick={gotoFirstPage}
                                    aria-label="First"
                                >
                                    <span className="fa fa-angle-double-left"></span>
                                </button>
                            </li>
                        )}
                        {currentPage > 1 && (
                            <li className="dm-pagination__item">
                                <button
                                    className="dm-pagination__link pagination-control"
                                    onClick={gotoPrevPage}
                                    disabled={currentPage === 1}
                                    aria-label="Previous"
                                >
                                    <span className="fa fa-angle-left"></span>
                                </button>
                            </li>
                        )}
                        {currentPage > 1 && (
                            // <li className="page-item">
                            <a
                                className="dm-pagination__link"
                                onClick={() => onPageChange(currentPage - 1)}
                                disabled={currentPage === 1}

                            >

                                <span className="page-number">{currentPage - 1}</span>
                            </a>
                            // </li>
                        )}
                        <a className="dm-pagination__link active">
                            <span className="page-number" >
                                {currentPage}
                            </span>
                        </a>

                        {currentPage < maxPages && (
                            // <li className="page-item">
                            <a
                                className="dm-pagination__link "
                                onClick={() => onPageChange(currentPage + 1)}
                            >
                                {currentPage + 1}
                            </a>
                            // </li>
                        )}
                        {currentPage < maxPages && (
                            <li className="page-item">
                                <button
                                    className="dm-pagination__link pagination-control"
                                    onClick={gotoNextPage}
                                    disabled={currentPage >= maxPages}
                                    aria-label="Next"
                                >
                                    <span className="fa fa-angle-right" />
                                </button>
                            </li>
                        )}
                        {currentPage < maxPages && (
                            <li className="dm-pagination__item">
                                <button
                                    className="dm-pagination__link pagination-control"
                                    onClick={gotoLastPage}
                                    aria-label="Last"
                                >
                                    <span className="fa fa-angle-double-right"></span>
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div >
        </>
    );
};

export default Pagination;
