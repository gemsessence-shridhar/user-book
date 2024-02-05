import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostList from "~/components/posts/PostList";
import { getComments, getPostLikes, getPosts } from "~/db";
import { authenticator } from "~/services/auth.server";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  const posts = await getPosts();
  const postLikes = await getPostLikes();
  const comments = await getComments();
  return json({ posts, postLikes, comments });
}

const AllFeeds = () => {
  const { posts, postLikes, comments } = useLoaderData<typeof loader>();

  return (
    <PostList posts={posts} postLikes={postLikes} comments={comments} />
  )
}

export default AllFeeds;
