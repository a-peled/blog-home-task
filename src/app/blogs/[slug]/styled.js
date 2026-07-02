"use client";

import styled, { keyframes } from "styled-components";
import Link from "next/link";

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${(props) => props.theme.spacing.md};

  padding: ${(props) => props.theme.spacing.xl};
`;

export const PostContainer = styled.div`
  height: 0;
  flex: 1 1 auto;
  width: 100%;
  max-width: 768px;

  overflow-y: auto;
`;

export const PostHeader = styled.h1`
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.typography.fontFamily};
  margin-bottom: ${(props) => props.theme.spacing.sm};
`;

export const PostMetaInfo = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.muted};
  margin-bottom: ${(props) => props.theme.spacing.lg};
`;

export const PostContent = styled.div`
  font-size: ${(props) => props.theme.typography.fontSizes.base};
  color: ${(props) => props.theme.colors.text};
  font-family: ${(props) => props.theme.typography.fontFamily};
  line-height: 1.8;

  p {
    margin-bottom: ${(props) => props.theme.spacing.md};
  }

  h1 {
    font-size: ${(props) => props.theme.typography.fontSizes.xl};
    margin: ${(props) => props.theme.spacing.lg} 0
      ${(props) => props.theme.spacing.sm};
  }

  h2 {
    font-size: ${(props) => props.theme.typography.fontSizes.lg};
    margin: ${(props) => props.theme.spacing.lg} 0
      ${(props) => props.theme.spacing.sm};
  }

  img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    margin: ${(props) => props.theme.spacing.md} 0;
  }

  figure {
    margin: ${(props) => props.theme.spacing.lg} 0;
  }

  a {
    color: ${(props) => props.theme.colors.primary};
    text-decoration: underline;
  }

  strong {
    font-weight: 500;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${(props) => props.theme.spacing.sm};
  margin-top: ${(props) => props.theme.spacing.lg};
`;

export const Tag = styled.span`
  background: ${(props) => props.theme.colors.surface};
  color: ${(props) => props.theme.colors.muted};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  padding: ${(props) => props.theme.spacing.xs}
    ${(props) => props.theme.spacing.sm};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
`;

export const BackLink = styled(Link)`
  display: inline-block;
  color: ${(props) => props.theme.colors.primary};
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  text-decoration: none;
  margin-bottom: ${(props) => props.theme.spacing.lg};

  &:hover {
    text-decoration: underline;
  }
`;

const shimmer = keyframes`
  0% { background-position: -200px 0; }
  100% { background-position: 200px 0; }
`;

export const SkeletonBox = styled.div`
  height: ${(props) => props.$height || "20px"};
  border-radius: 4px;
  background: linear-gradient(90deg, #e0e0e0 25%, #f0f0f0 50%, #e0e0e0 75%);
  background-size: 400px 100%;
  animation: ${shimmer} 1.5s ease-in-out infinite;
  margin-bottom: ${(props) => props.theme.spacing.md};
`;

export const ErrorWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const ErrorTitle = styled.h2`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  color: ${(props) => props.theme.colors.text};
`;

export const ErrorMessage = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.base};
  color: ${(props) => props.theme.colors.muted};
`;

export const RetryButton = styled.button`
  background: ${(props) => props.theme.colors.primary};
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.lg};
  font-size: ${(props) => props.theme.typography.fontSizes.base};
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }
`;

export const NotFoundWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
`;

export const NotFoundTitle = styled.h1`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSizes.xl};
  color: ${(props) => props.theme.colors.text};
`;

export const NotFoundMessage = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.base};
  color: ${(props) => props.theme.colors.muted};
`;
