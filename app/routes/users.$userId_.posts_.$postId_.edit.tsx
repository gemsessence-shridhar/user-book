import { redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { getUserPost, updateUserPost } from "~/db";
import PostForm from "~/components/posts/PostForm";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  invariant(params.postId, "Missing postId param");
  const formData = await request.formData();
  const postData: any = Object.fromEntries(formData);
  await updateUserPost(params.userId, params.postId, postData);
  return redirect(`/users/${params.userId}/posts/${params.postId}`);
}


export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  invariant(params.postId, "Missing postId param");
  const post:any = await getUserPost(params.userId, params.postId);
  return post;
}


const EditPost = () => {
  const post = useLoaderData<typeof loader>();

  return (
    <PostForm post={post} />
  )
}

export default EditPost;
