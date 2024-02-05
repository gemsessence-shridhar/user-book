import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Image,
  Input,
} from "@nextui-org/react";
import { ChatIcon, ChevronDownIcon, PencilIcon, ThumbUpIcon, TrashIcon } from "../icons";
import { useFetcher } from "@remix-run/react";
import { PostCommentType, PostLikeType, PostType } from "~/types";
import { Key, useEffect, useState } from "react";

interface PostProps {
  currentUserId: string;
  currentUserPostLike?: PostLikeType;
  handlePostDropdownChange: (key: Key, post: PostType) => void;
  overAllLikesCountForPost: number;
  post: PostType;
  comments: Array<PostCommentType>;
}

const Post = ({
  currentUserId,
  currentUserPostLike,
  handlePostDropdownChange,
  overAllLikesCountForPost,
  post,
  comments,
}: PostProps) => {
  const [isCommentVisible, setIsCommentVisible] = useState(false);
  const [comment, setComment] = useState("");
  const fetcher = useFetcher();
  const isLikedByCurrentUser = currentUserPostLike !== undefined;

  const isSubmittingComment = (
    fetcher.state === "submitting"
    && fetcher.formData?.get("intent") === "comment"
  )

  useEffect(() => {
    const hasSubmittedComment = fetcher.state === "loading"
      && fetcher.formData?.get("intent") === "comment";
    if (hasSubmittedComment) setComment("");
  }, [fetcher.state]);

  return (
    <Card radius="none" className="post-card pt-2">
      <CardHeader className="pb-0 pt-2 px-4 flex-row justify-between items-center">
        <section>
          <p className="text-tiny uppercase font-bold">{post.title}</p>
          {/* <p className="text-xs">{}</p> */}
        </section>

        <section>
          <Dropdown>
            <DropdownTrigger>
              <Button variant="light" className="min-w-4 h-4 p-0">
                <ChevronDownIcon />
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              variant="faded"
              onAction={(key: React.Key) => handlePostDropdownChange(key, post)}
            >
              <DropdownItem key="edit" startContent={<PencilIcon />}>
                Edit post
              </DropdownItem>
              <DropdownItem
                key="destroy"
                className="text-danger"
                color="danger"
                startContent={<TrashIcon />}
              >
                Delete post
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </section>
      </CardHeader>

      <CardBody className="py-2">
        <Image
          alt="Image"
          className="object-cover rounded"
          src={post.photo}
        />
        <p className="mt-2">{post.description}</p>
      </CardBody>

      <CardFooter>
        <fetcher.Form method="post" className="post-action-form">
          <div className="flex gap-2">
            <button
              type="submit"
              name="intent"
              value={isLikedByCurrentUser ? "unlike" : "like"}
              className="post-action-btn"
            >
              <span className="flex gap-1 items-center justify-center">
                <ThumbUpIcon className={isLikedByCurrentUser ? "text-[#3b5998]" : ""} /> {overAllLikesCountForPost > 0 && overAllLikesCountForPost}
              </span>
            </button>

            {/* comment buttton */}
            <button
              type="button"
              className="post-action-btn"
              onClick={() => setIsCommentVisible(true)}
            >
              <span className="flex gap-1 items-center justify-center">
                <ChatIcon className="-scale-x-100" />
                {comments.length > 0 && comments.length}
              </span>
            </button>
          </div>

          <input type="hidden" name="current_user_id" value={currentUserId} />
          <input type="hidden" name="post_id" value={post.id} />
          {isLikedByCurrentUser && (
            <input
              type="hidden"
              name="like_id"
              value={currentUserPostLike.id}
            />
          )}

          {isCommentVisible && (
            <div className="comments flex flex-col gap-2 pb-4">
              <section className="flex justify-between items-end gap-4">
                <Input
                  required
                  color="warning"
                  name="comment_description"
                  placeholder="Type your comment here..."
                  size="sm"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  variant="underlined"
                />
                <Button
                  color="warning"
                  name="intent"
                  radius="full"
                  size="sm"
                  type="submit"
                  value="comment"
                  disabled={isSubmittingComment}
                >
                  submit
                </Button>
              </section>

              {comments.map(comment => (
                <section className="comments-list">
                  <div>
                    <p>{comment.description}</p>
                  </div>
                </section>
              ))}
            </div>
          )}
        </fetcher.Form>
      </CardFooter>
    </Card>
  )
}

export default Post;
