import { PostsContainer, PostsList, PostCard, SkeletonBox } from "./styled";

export default function Loading() {
  return (
    <PostsContainer>
      <PostsList>
        {Array.from({ length: 6 }).map((_, i) => (
          <PostCard key={i}>
            <SkeletonBox $height="180px" />
            <SkeletonBox $height="24px" />
            <SkeletonBox $height="16px" />
            <SkeletonBox $height="16px" />
          </PostCard>
        ))}
      </PostsList>
    </PostsContainer>
  );
}
