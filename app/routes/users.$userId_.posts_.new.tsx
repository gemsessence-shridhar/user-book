import { redirect, type ActionFunctionArgs } from "@remix-run/node";
import invariant from "tiny-invariant";
import PostForm from "~/components/posts/PostForm";
import { createUserPost } from "~/db";
import { PostType } from "~/types";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const postData: any = Object.fromEntries(formData);
  await createUserPost(params.userId, postData);
  return redirect(`/users/${params.userId}/posts`);
}

const NewPost = () => {
  const blankPost: PostType = {
    id: "",
    title: "",
    description: "",
    photo: "",
    created_at: ""
  };

  return (
    <PostForm post={blankPost} />
  )
}

export default NewPost;
