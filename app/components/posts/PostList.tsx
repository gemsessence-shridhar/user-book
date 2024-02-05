import { useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import { OutletContextType, PostCommentType, PostLikeType, PostType } from "~/types";
import Post from "./Post";

interface PostListProps {
  posts: Array<PostType>;
  postLikes: Array<PostLikeType>;
  comments: Array<PostCommentType>;
}

const PostList = ({
  posts,
  postLikes,
  comments,
}: PostListProps) => {
  const submit = useSubmit();
  const navigate = useNavigate();
  const { currentUser } = useOutletContext<OutletContextType>();

  const handlePostDropdownChange = (key: React.Key, post: PostType) => {
    if (key === "edit") {
      navigate(`/users/${post.user_id}/posts/${post.id}/edit`);
    } else if (key === "destroy") {
      const response = confirm("Please confirm! do you want to delete this record?");
      if (response) submit({ intent: "destroy", post_id: post.id }, { method: "post" });
    }
  }

  const getCurrentUserPostLike = (postId: string) => postLikes.find(
    (like) => like.post_id === postId && like.user_id === currentUser.id
  )

  const getLikesCount = (postId: string) => {
    const allLikesForThePost = postLikes.filter((like) => like.post_id === postId);
    return allLikesForThePost.length;
  }

  const getCommentsForPost = (postId: string) => {
    return comments.filter(comment => comment.post_id === postId)
  }

  return (
    <div className="gap-4 grid justify-center" >
      {/* TODO:: post type should not be "any" */}
      {posts.map((post: any) => (
        <Post
          key={post.id}
          currentUserId={currentUser.id}
          currentUserPostLike={getCurrentUserPostLike(post.id)}
          handlePostDropdownChange={handlePostDropdownChange}
          overAllLikesCountForPost={getLikesCount(post.id)}
          post={post}
          comments={getCommentsForPost(post.id)}
        />
      ))}
    </div >
  )
}

export default PostList;
