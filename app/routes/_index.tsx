import { ActionFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import PostList from "~/components/posts/PostList";
import { getComments, getPostLikes, getPosts, getUsers } from "~/db";
import { performPostActionsForIntent } from "~/utils/actionUtils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  await performPostActionsForIntent(formData);
  return null;
}

export const loader = async () => {
  const users = await getUsers();
  const posts = await getPosts();
  const postLikes = await getPostLikes();
  const comments = await getComments();
  return json({ users, posts, postLikes, comments });
}

const AllFeeds = () => {
  const {
    users,
    posts,
    postLikes,
    comments,
  } = useLoaderData<typeof loader>();

  return (
    <div className="p-4">
      <PostList
        users={users}
        posts={posts}
        postLikes={postLikes}
        comments={comments}
      />
    </div>
  )
}

export default AllFeeds;
