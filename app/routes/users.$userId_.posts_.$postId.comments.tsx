import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import Comments from "~/components/comments/Comments";
import { destroyComment, getComments, updateComment } from "~/db/comments";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  const userId = params.userId;
  const postId = params.postId;
  invariant(userId, "Missing userId param");
  invariant(postId, "Missing postId param");

  const formData = await request.formData();
  const intent = formData.get("intent");
  const id = formData.get("id")?.toString();
  if (!id) throw new Error("id not found to delete the comment");
  
  switch(intent) {
    case "like":
      await updateComment(userId, postId, id, { liked: true, disliked: false });
      break;
    case "dislike":
      await updateComment(userId, postId, id, { liked: false, disliked: true });
      break;
    case "pin":
      await updateComment(userId, postId, id, { pinned: true });
      break;
    case "remove-pin":
      await updateComment(userId, postId, id, { pinned: false });
      break;
    case "destroy":
      await destroyComment(userId, postId, id);
      break;
    default: throw new Error("Unexpected action");
  }
  return null
}

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
