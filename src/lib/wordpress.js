import "server-only";
import { cache } from "react";
import { sanitizeWpContent } from "./utils";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

// WordPress returns absolute upload URLs (http://localhost:8080/wp-content/...).
// We strip the origin so images resolve relative to the Next.js server, which
// proxies /wp-content/uploads to WordPress (see rewrites in next.config.mjs).
function toRelativeUploadUrl(url) {
  if (!url) return url;
  return url.replace(/^https?:\/\/[^/]+/, "");
}

function withRelativeFeaturedImage(post) {
  if (!post.featuredImage?.node?.sourceUrl) return post;
  return {
    ...post,
    featuredImage: {
      node: {
        ...post.featuredImage.node,
        sourceUrl: toRelativeUploadUrl(post.featuredImage.node.sourceUrl),
      },
    },
  };
}

export async function getPosts({ after = null, before = null } = {}) {
  const credentials = Buffer.from(
    `${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APP_PASSWORD}`,
  ).toString("base64");

  const query = `
    query GetPosts($after: String, $first: Int, $last: Int, $before: String) {
      posts(first: $first, after: $after, last: $last, before: $before, where: { orderby: { field: DATE, order: DESC } }) {
        pageInfo {
          hasNextPage
          hasPreviousPage
          startCursor
          endCursor
        }
        nodes {
          id
          title
          excerpt
          date
          slug
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  `;

  const response = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({
      query,
      variables: {
        after,
        first: !before ? 12 : null, // works together - after is the curser, first tells it how much, same with before and last. this way we dont risk sql injection because we pass both as variables
        before,
        last: before ? 12 : null,
      },
    }), // here we add the kind of offset as variables
    next: { revalidate: 60 }, // will keep the same request as cached for the next 60 seconds
  });

  if (!response.ok) {
    throw new Error(`WPGraphQL request failed: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const posts = json.data.posts;

  return {
    ...posts,
    nodes: posts.nodes.map((post) => ({
      ...withRelativeFeaturedImage(post),
      title: sanitizeWpContent(post.title),
      excerpt: sanitizeWpContent(post.excerpt), // util function for sanitizing the html for safe rendering
    })),
  };
}

// the cache is needed because this function is being used
// both in the generateMetadata and in the actual page, both
// in the same request - so the react cache making the call
// only once. in different from the next cache, this is valid
// only for the same request, not for a set time.
export const getPost = cache(async function getPost(slug) {
  const credentials = Buffer.from(
    `${process.env.WORDPRESS_USERNAME}:${process.env.WORDPRESS_APP_PASSWORD}`,
  ).toString("base64");

  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        content
        date
        slug
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
        tags {
          nodes {
            name
            slug
          }
        }
      }
    }
  `;

  const response = await fetch(WORDPRESS_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Basic ${credentials}`,
    },
    body: JSON.stringify({ query, variables: { slug } }),
  }); // no caching here - if you are in a specific post you would like to get the newest data on each refresh
  if (!response.ok) {
    throw new Error(`WPGraphQL request failed: ${response.status}`);
  }

  const json = await response.json();

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`);
  }

  const post = json.data.post;

  if (!post) {
    return null;
  }

  return {
    ...withRelativeFeaturedImage(post),
    title: sanitizeWpContent(post.title),
    content: sanitizeWpContent(post.content).replace(
      /https?:\/\/[^/"'\s]+\/wp-content\/uploads/g,
      "/wp-content/uploads",
    ), // inline images in content also go through the /wp-content/uploads proxy
  };
});
