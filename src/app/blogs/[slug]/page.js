import { notFound } from "next/navigation";
import { getPost } from "@/lib/wordpress";
import { stripHtml } from "@/lib/utils";
import {
  PostContainer,
  PostHeroImage,
  PostHeader,
  PostMetaInfo,
  PostContent,
  TagList,
  Tag,
  BackLink,
  PageWrapper,
} from "./styled";

// generateMetadata is a saved name for next to know this is the
// function for generation the meta tags for the html page,
// based on data received from the server (like title, description...)
export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return { title: "פוסט לא נמצא" };
  }

  const plainTitle = stripHtml(post.title);
  const plainDescription = stripHtml(post.content).slice(0, 155);

  return {
    title: plainTitle,
    description: plainDescription,
    openGraph: {
      title: plainTitle,
      description: plainDescription,
      type: "article",
      publishedTime: post.date,
      images: post.featuredImage?.node?.sourceUrl
        ? [
            {
              url: post.featuredImage.node.sourceUrl,
              alt: post.featuredImage.node.altText || plainTitle,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title: plainTitle,
      description: plainDescription,
      images: post.featuredImage?.node?.sourceUrl
        ? [post.featuredImage.node.sourceUrl]
        : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  return (
    <PageWrapper>
      <BackLink href="/blogs">← Back to blogs</BackLink>

      <PostContainer>
        {post.featuredImage?.node && (
          <PostHeroImage
            src={post.featuredImage.node.sourceUrl}
            alt={post.featuredImage.node.altText || ""}
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
    </PageWrapper>
  );
}
