"use client";

import styled from "styled-components";

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: ${(props) => props.$height || "200px"};
  overflow: hidden;
  border-radius: ${(props) => props.$borderRadius || "8px"};

  img {
    object-fit: cover;
    width: 100% !important;
    height: 100% !important;
  }
`;
