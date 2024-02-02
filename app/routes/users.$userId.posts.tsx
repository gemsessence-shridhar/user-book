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
} from "@nextui-org/react";
import type { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { Form, json, useFetcher, useLoaderData, useNavigate, useOutletContext, useSubmit } from "@remix-run/react";
import invariant from "tiny-invariant";
import { ChatIcon, ChevronDownIcon, PencilIcon, ThumbUpIcon, TrashIcon } from "~/components/icons";
import { destroyPost, getPostLikes, getPosts, likePost, unlikePost } from "~/db/posts";
import { OutletContextType } from "~/types";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const formData = await request.formData();
  const postId = formData.get("post_id")?.toString();

  if (postId) {
    switch (formData.get("intent")) {
      case "like":
        await likePost(params.userId, postId);
        break;
      case "unlike":
        const likeId = formData.get("like_id")?.toString();
        if (likeId) await unlikePost(likeId);
        break;
      case "comment":
        break;
      case "destroy":
        await destroyPost(params.userId, postId);
        break;
      default: throw new Error("Unexpected intent");
    }
  }
  return null;
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const posts = await getPosts(params.userId);
  const postLikes = await getPostLikes();
  return json({ userId: params.userId, posts, postLikes });
}

const Posts = () => {
  const fetcher = useFetcher();
  const submit = useSubmit();
  const navigate = useNavigate();
  const { currentUser } = useOutletContext<OutletContextType>();
  const { userId, posts, postLikes } = useLoaderData<typeof loader>();

  // TODO:: post type should not be "any"
  const handlePostDropdownChange = (key: React.Key, post: any) => {
    if (key === "edit") {
      navigate(`/users/${post.user_id}/posts/${post.id}/edit`);
    } else if (key === "destroy") {
      const response = confirm("Please confirm! do you want to delete this record?");
      if (response) submit({ intent: "destroy", post_id: post.id }, { method: "post" });
    }
  }

  const currentUserLikedPostIds = postLikes.map((like) => {
    if (like.user_id === currentUser.id) return like.post_id
  });

  const getLikeRecordOfPostForCurrentUser = (postId: string) => {
    const likeRecord = postLikes.find((like) => like.post_id === postId && like.user_id === currentUser.id)
    return likeRecord?.id;
  }

  const getLikesCount = (postId: string) => {
    const allLikesForThePost = postLikes.filter((like) => like.post_id === postId);
    return allLikesForThePost.length;
  }

  return (
    <>
      <section className="mb-4 text-right">
        <Form action="new">
          <Button color="primary" className="font-bold" type="submit" size="sm">
            + New Post
          </Button>
        </Form>
      </section>

      <div className="gap-4 grid justify-center">
        {posts.map((post) => (
          <Card key={post.id} radius="none" className="post-card pt-2">
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
              <fetcher.Form className="flex gap-2" method="post">
                <input type="hidden" name="post_id" value={post.id} />
                {currentUserLikedPostIds.includes(post.id) && (
                  <input
                    type="hidden"
                    name="like_id"
                    value={getLikeRecordOfPostForCurrentUser(post.id)}
                  />
                )}
                <button
                  type="submit"
                  name="intent"
                  value={currentUserLikedPostIds.includes(post.id) ? "unlike" : "like"}
                  className="post-action-btn"
                >
                  <span className="flex gap-1 items-center">
                    <ThumbUpIcon
                      className={
                        currentUserLikedPostIds.includes(post.id) ? "text-[#3b5998]" : ""
                      }
                    /> {getLikesCount(post.id)}
                  </span>
                </button>

                <button type="submit" name="intent" value="comment" className="post-action-btn">
                  <span className="flex gap-1 items-center">
                    <ChatIcon className="-scale-x-100" /> 123
                  </span>
                </button>
              </fetcher.Form>
            </CardFooter>
          </Card>
        ))}
      </div >
    </>
  )
}

export default Posts;
