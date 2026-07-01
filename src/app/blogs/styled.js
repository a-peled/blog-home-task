"use client"; // needed because these use the theme context, which can only run on the client (browser)

import styled from "styled-components";

export const PostList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${(props) => props.theme.spacing.lg};
  padding: ${(props) => props.theme.spacing.lg};

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export const PostCard = styled.li`
  background: ${(props) => props.theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const PostImage = styled.img`
  width: 100%;
  height: 180px;
  object-fit: cover;
`;

export const PostTitle = styled.h2`
  font-family: ${(props) => props.theme.typography.fontFamily};
  font-size: ${(props) => props.theme.typography.fontSizes.lg};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md} 0;
`;

export const PostMeta = styled.p`
  font-size: ${(props) => props.theme.typography.fontSizes.sm};
  color: ${(props) => props.theme.colors.muted};
  padding: 0 ${(props) => props.theme.spacing.md};
`;

export const PostExcerpt = styled.div`
  font-size: ${(props) => props.theme.typography.fontSizes.base};
  color: ${(props) => props.theme.colors.text};
  padding: ${(props) => props.theme.spacing.sm}
    ${(props) => props.theme.spacing.md} ${(props) => props.theme.spacing.md};
`;

export const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: ${(props) => props.theme.spacing.md};
  padding: ${(props) => props.theme.spacing.xl};
`;

export const PaginationButton = styled.button`
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
