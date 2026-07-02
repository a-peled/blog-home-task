import { getPosts } from "@/lib/wordpress";
import Posts from "./Posts";
import Pagination from "./Pagination";

export default async function BlogsPage({ searchParams }) {
  const params = await searchParams;
  const after = params?.after ?? null;
  const before = params?.before ?? null;
  // kind of offset, called 'after' or 'before' in wordpress for spliting the amount of data
  //  using a cursor - base64 string representing a place in the db

  const data = await getPosts({ after, before });

  const posts = data.nodes; // the regular information of the posts recieved, up-to 10 with current split

  return (
    <>
      <Posts posts={posts} />

      <Pagination pageInfo={data.pageInfo} />
    </>
  );
}
