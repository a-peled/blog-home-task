"use client";
import { useEffect } from "react";
import PropTypes from "prop-types";
import { ErrorWrapper, ErrorTitle, ErrorMessage, RetryButton } from "./styled";

export default function Error({ error, reset }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <ErrorWrapper>
      <ErrorTitle>Something went wrong loading the blog posts.</ErrorTitle>
      <ErrorMessage>{error.message}</ErrorMessage>
      <RetryButton onClick={() => reset()}>Try again</RetryButton>
    </ErrorWrapper>
  );
}

Error.propTypes = {
  error: PropTypes.shape({
    message: PropTypes.string,
  }).isRequired,
  reset: PropTypes.func.isRequired,
};
