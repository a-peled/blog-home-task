"use client";

import PropTypes from "prop-types";
import { PaginationButton, PaginationWrapper } from "./styled";
import Link from "next/link";

export default function Pagination({ pageInfo }) {
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } = pageInfo; // data recieved about the amount of posts left after the offset,
  // we get some cursors here for dealing with the next request
  return (
    <PaginationWrapper>
      {hasPreviousPage && (
        <Link href={`/blogs?before=${startCursor}`}>
          <PaginationButton>← Previous</PaginationButton>
        </Link>
      )}
      {hasNextPage && (
        <Link href={`/blogs?after=${endCursor}`}>
          <PaginationButton>Next →</PaginationButton>
        </Link>
      )}
    </PaginationWrapper>
  );
}

Pagination.propTypes = {
  pageInfo: PropTypes.shape({
    hasNextPage: PropTypes.bool.isRequired,
    hasPreviousPage: PropTypes.bool.isRequired,
    endCursor: PropTypes.string,
    startCursor: PropTypes.string,
  }).isRequired,
};

Pagination.defaultProps = {
  pageInfo: {
    endCursor: null,
    startCursor: null,
  },
};
