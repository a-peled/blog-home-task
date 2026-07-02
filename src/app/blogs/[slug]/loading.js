import { PostContainer, SkeletonBox } from "./styled";

export default function Loading() {
  return (
    <PostContainer>
      <SkeletonBox $height="180px" />
      <SkeletonBox $height="36px" />
      <SkeletonBox $height="16px" />
      <SkeletonBox $height="200px" />
      <SkeletonBox $height="16px" />
      <SkeletonBox $height="16px" />
      <SkeletonBox $height="16px" />
    </PostContainer>
  );
}
