import { Button } from "@nextui-org/react";
import { CommentType } from "~/types";
import { PencilIcon, PinAngleIcon, ThumbDownIcon, ThumbUpIcon, TrashIcon } from "../icons";
import { useFetcher } from "@remix-run/react";
interface CommentProps {
  comments: Array<CommentType>;
}

const Comments = ({ comments }: CommentProps) => {
  const fetcher = useFetcher();

  return (
    <div className="mb-8">
      {comments.map((comment: CommentType) => (
        <div key={comment.id} className="actions-on-comment relative border rounded-lg mb-4 p-4">
          <p className="text-sm">{comment.description}</p>

          {(comment.liked || comment.disliked || comment.pinned) && (
            <section className="flex fex-row absolute left-6 -top-3 text-indianred">
              {comment.pinned && (
                <div className="flex border rounded-full p-1 bg-neutral-400">
                  <PinAngleIcon />
                </div>
              )}
              {(comment.liked || comment.disliked) && (
                <div className="flex border rounded-full p-1 bg-yellow-500">
                  {comment.liked && <ThumbUpIcon />}
                  {comment.disliked && <ThumbDownIcon />}
                </div>
              )}
            </section>
          )}

          <fetcher.Form method="post" className="flex flex-row gap-2 border rounded-full p-2 px-3 bg-emerald-500 absolute right-4 -top-3">
            <input type="hidden" name="id" value={comment.id} />
            {(!comment.liked) && (
              <Button
                aria-label="Like the comment"
                color="warning"
                className="text-blue-700"
                isIconOnly
                name="intent"
                size="sm"
                type="submit"
                value="like"
                variant="faded"
              >
                <ThumbUpIcon />
              </Button>
            )}

            {!comment.disliked && (
              <Button
                aria-label="Like the comment"
                color="warning"
                className="text-blue-700"
                isIconOnly
                name="intent"
                size="sm"
                type="submit"
                value="dislike"
                variant="faded"
              >
                <ThumbDownIcon />
              </Button>
            )}

            {!comment.pinned && (
              <Button
                aria-label="Delete the comment"
                color="danger"
                isIconOnly
                name="intent"
                size="sm"
                type="submit"
                value="pin"
                variant="faded"
              >
                <PinAngleIcon />
              </Button>
            )}

            {/* <Button
              aria-label="Delete the comment"
              color="primary"
              isIconOnly
              size="sm"
              variant="faded"
            >
              <PencilIcon />
            </Button> */}

            <Button
              aria-label="Delete the comment"
              color="danger"
              className="text-red-700"
              isIconOnly
              name="intent"
              size="sm"
              type="submit"
              value="destroy"
              variant="faded"
            >
              <TrashIcon />
            </Button>
          </fetcher.Form>
        </div>
      ))}
    </div>
  )
}

export default Comments;
