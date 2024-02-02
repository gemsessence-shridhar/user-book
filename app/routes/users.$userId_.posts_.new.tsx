import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import PostForm from "~/components/posts/PostForm";
import { createPost } from "~/db";
import { BlankPost } from "~/db/blankCollections";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const postData: any = Object.fromEntries(formData);
  await createPost(params.userId, postData);
  return redirect(`/users/${params.userId}/posts`);
}

const NewPost = () => {
  return (
    <PostForm post={BlankPost} />
  )
}

export default NewPost;
