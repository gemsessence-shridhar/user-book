import { LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Comments from "~/components/comments/Comments";
import { getComments } from "~/db/comments";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  invariant(params.postId, "Missing postId param");
  return await getComments(params.userId, params.postId);
}

const CommentsList = () => {
  const comments = useLoaderData<typeof loader>();

  return (
    <Comments comments={comments} />
  )
}

export default CommentsList;
