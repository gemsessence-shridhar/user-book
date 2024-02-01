import { Button } from "@nextui-org/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData } from "@remix-run/react";
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
      <section className="mb-4 text-right">
        <Form action="new">
          <Button color="primary" className="font-bold" type="submit" size="sm">
            + New Post
          </Button>
        </Form>
      </section>

      <div className="gap-4 grid grid-cols-6 md:grid-cols-3 sm:grid-cols-2">
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    </>
  )
}

export default Posts;
