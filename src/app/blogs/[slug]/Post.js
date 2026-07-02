"use client";

import PropTypes from "prop-types";
import WordPressImage from "@/components/WordpressImage";
import {
  PostContainer,
  PostContent,
  PostHeader,
  PostMetaInfo,
  Tag,
  TagList,
} from "./styled";

export default function Post({ post }) {
  return (
    <PostContainer>
      {post.featuredImage?.node && (
        <WordPressImage
          src={post.featuredImage.node.sourceUrl}
          alt={post.featuredImage.node.altText}
          height="180px"
          borderRadius="8px 8px 0 0"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      )}

      <PostHeader dangerouslySetInnerHTML={{ __html: post.title }} />

      <PostMetaInfo>
        {new Date(post.date).toLocaleDateString()} —{" "}
        {post.categories.nodes.map((c) => c.name).join(", ")}
      </PostMetaInfo>

      <PostContent dangerouslySetInnerHTML={{ __html: post.content }} />

      {post.tags.nodes.length > 0 && (
        <TagList>
          {post.tags.nodes.map((tag) => (
            <Tag key={tag.slug}>{tag.name}</Tag>
          ))}
        </TagList>
      )}
    </PostContainer>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    featuredImage: PropTypes.shape({
      node: PropTypes.shape({
        sourceUrl: PropTypes.string.isRequired,
        altText: PropTypes.string,
      }),
    }),
    categories: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
        }),
      ),
    }),
    tags: PropTypes.shape({
      nodes: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          slug: PropTypes.string.isRequired,
        }),
      ),
    }),
  }).isRequired,
};
