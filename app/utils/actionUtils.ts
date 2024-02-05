import { commentForAPost, destroyPost, likePost, unlikePost } from "~/db";

export const performPostActionsForIntent = async (formData: FormData) => {
  const postId = formData.get("post_id")?.toString();
  const currentUserId = formData.get("current_user_id")?.toString();

  if (postId) {
    switch (formData.get("intent")) {
      case "like":
        if (currentUserId) await likePost(currentUserId, postId);
        break;
      case "unlike":
        const likeId = formData.get("like_id")?.toString();
        if (likeId) await unlikePost(likeId);
        break;
      case "comment":
        const commentDescription = formData.get("comment_description")?.toString();
        if (currentUserId && commentDescription) {
          await commentForAPost(currentUserId, postId, commentDescription);
        }
        break;
      case "destroy":
        await destroyPost(postId);
        break;
      default: throw new Error("Unexpected intent");
    }
  }
}