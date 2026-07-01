import "server-only";

const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL;

export async function getPosts({ after = null, before = null } = {}) {
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
    },
    body: JSON.stringify({
      query,
      variables: {
        after,
        first: !before ? 10 : null, // works together - after is the curser, first tells it how much, same with before and last. this way we dont risk sql injection because we pass both as variables
        before,
        last: before ? 10 : null,
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

  return json.data.posts;
}
