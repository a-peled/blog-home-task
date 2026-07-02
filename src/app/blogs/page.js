import Link from "next/link";
import {
  PageWrapper,
  PaginationButton,
  PaginationWrapper,
  PostCard,
  PostExcerpt,
  PostList,
  PostMeta,
  PostsContainer,
  PostTitle,
} from "./styled";
import { getPosts } from "@/lib/wordpress";
import WordPressImage from "@/components/WordpressImage";

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const after = params?.after ?? null;
  const before = params?.before ?? null;
  // kind of offset, called 'after' or 'before' in wordpress for spliting the amount of data
  //  using a cursor - base64 string representing a place in the db

  const data = await getPosts({ after, before });

  const posts = data.nodes; // the regular information of the posts recieved, up-to 10 with current split
  const { hasNextPage, hasPreviousPage, endCursor, startCursor } =
    data.pageInfo; // data recieved about the amount of posts left after the offset,
  // we get some cursors here for dealing with the next request

  return (
    <PageWrapper>
      <PostsContainer>
        <PostList>
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

                <PostExcerpt
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
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
        </PostList>
      </PostsContainer>

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
    </PageWrapper>
  );
}
