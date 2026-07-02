"use client";

import WordPressImage from "@/components/WordpressImage";
import {
  PostsContainer,
  PostsList,
  PostCard,
  PostTitle,
  PostMeta,
  PostExcerpt,
} from "./styled";
import Link from "next/link";
import PropTypes from "prop-types";

export default function Posts({ posts }) {
  return (
    <PostsContainer>
      <PostsList>
        {posts.map((post) => (
          <PostCard key={post.id}>
            <Link href={`/blogs/${post.slug}`}>
              {post.featuredImage?.node && (
                <WordPressImage
                  src={post.featuredImage.node.sourceUrl}
                  alt={post.featuredImage.node.altText}
                  height="180px"
                  borderRadius="8px 8px 0 0"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              )}

              <PostTitle dangerouslySetInnerHTML={{ __html: post.title }} />

              <PostMeta>
                {new Date(post.date).toLocaleDateString()} —
                {post.categories.nodes.map((c) => c.name).join(", ")}
              </PostMeta>

              <PostExcerpt dangerouslySetInnerHTML={{ __html: post.excerpt }} />
              {
                // the dangerouslySetInnerHTML is needed because wordpress
                // can and does hold and return html type of data,
                // like 'some words <b>this text needs to be bold</b> some
                // more words' so to render this correctly we should use
                // the dangerouslySetInnerHTML prop. this is why we sanatize
                // the html that we get from the api.
              }
            </Link>
          </PostCard>
        ))}
      </PostsList>
    </PostsContainer>
  );
}

Posts.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      slug: PropTypes.string.isRequired,
      excerpt: PropTypes.string,
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
    }),
  ).isRequired,
  pageInfo: PropTypes.shape({
    hasNextPage: PropTypes.bool.isRequired,
    hasPreviousPage: PropTypes.bool.isRequired,
    endCursor: PropTypes.string,
    startCursor: PropTypes.string,
  }).isRequired,
};

Posts.defaultProps = {
  posts: [],
};
