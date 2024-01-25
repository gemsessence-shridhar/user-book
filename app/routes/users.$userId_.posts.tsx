import type { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Post from "~/components/posts/Post";
import { getUserPosts } from "~/db/posts";
import { PostType } from "~/types";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  return await getUserPosts(params.userId);
}

const Posts = () => {
  const posts = useLoaderData<typeof loader>();

  return (
    <>
      <div>Posts</div>
      <div className="gap-4 grid grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Posts;
