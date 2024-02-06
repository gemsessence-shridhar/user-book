import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import PostList from "~/components/posts/PostList";
import { getUsers } from "~/db";
import {
  getComments,
  getPostLikes,
  getPosts,
} from "~/db/posts";
import { performPostActionsForIntent } from "~/utils/actionUtils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  await performPostActionsForIntent(formData);
  return null;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const users = await getUsers();
  const posts = await getPosts(params.userId);
  const postLikes = await getPostLikes();
  const comments = await getComments();
  return json({ users, posts, postLikes, comments });
}

const Posts = () => {
  const {
    users,
    posts,
    postLikes,
    comments,
  } = useLoaderData<typeof loader>();

  return (
    <PostList
      users={users}
      posts={posts}
      postLikes={postLikes}
      comments={comments}
    />
  )
}

export default Posts;
