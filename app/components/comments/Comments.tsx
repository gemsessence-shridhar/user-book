import { CommentType } from "~/types";

interface CommentProps {
  comments: Array<CommentType>;
}

const Comments = ({ comments }: CommentProps) => {
  return (
    <div className="mb-8">
      {comments.map((comment: CommentType) => (
        <p>{comment.description}</p>
      ))}
    </div>
  )
}

export default Comments;
