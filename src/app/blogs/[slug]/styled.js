"use client";
import styled from "styled-components";
import Link from "next/link";

export const PageWrapper = styled.div`
  height: 100%;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: ${(props) => props.theme.spacing.md};

  padding: ${(props) => props.theme.spacing.xl};
`;

export const PostContainer = styled.div`
  height: 0;
  flex: 1 1 auto;
  max-width: 768px;

  overflow-y: auto;
`;

export const PostHeroImage = styled.img`
  width: 100%;
  height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: ${(props) => props.theme.spacing.lg};
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
