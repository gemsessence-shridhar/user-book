import { Button, Image, Switch, Textarea } from "@nextui-org/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form, Outlet, useFetcher, useLoaderData, useNavigate } from "@remix-run/react";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import Comments from "~/components/comments/Comments";
import PencilIcon from "~/components/icons/PencilIcon";
import { getPost } from "~/db";
import { createComment } from "~/db/comments";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  invariant(params.postId, "Missing postId param");
  const formData = await request.formData();
  const commentData: any = Object.fromEntries(formData);
  const commentId = await createComment(params.userId, params.postId, commentData);
  return json({ status: "success", comment: { id: commentId, ...commentData } });
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const userId = params.userId;
  const postId = params.postId
  invariant(userId, "Missing userId param");
  invariant(postId, "Missing postId param");
  return await getPost(postId);
}

const PostDetails = () => {
  const [isCommentsSwitchSelected, setCommentsSwitchSelection] = useState(false);
  const fetcher = useFetcher<typeof action>();
  const navigate = useNavigate()
  const post = useLoaderData<typeof loader>();
  const $form = useRef<HTMLFormElement>(null);


  useEffect(function resetCommentFormOnSuccess() {
    if (fetcher.state === "idle" && fetcher.data?.status === "success") {
      $form.current?.reset();
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    const urlSegments = getURLPathSegments();
    if (urlSegments[urlSegments.length - 1] === "comments") {
      setCommentsSwitchSelection(true);
    }
  }, []);

  const getURLPathSegments = () => {
    const url = new URL(document.URL);
    return url.pathname.split("/");
  }

  const handleViewAllCommentsSwitch = (isSelected: boolean) => {
    if (isSelected) {
      setCommentsSwitchSelection(true);
      document.getElementById("comments-form-submit-button")?.click();
    } else {
      const urlSegments = getURLPathSegments();
      urlSegments.pop(); // Remove the last segment ("comments")
      const transformedURL = urlSegments.join("/");
      setCommentsSwitchSelection(false);
      navigate(transformedURL);
    }
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4">
        <p className="font-bold text-2xl">{post.title}</p>
        <Form action="edit">
          <Button isIconOnly color="primary" aria-label="Edit" type="submit" size="sm">
            <PencilIcon />
          </Button>
        </Form>
      </div>


      <div className="flex flex-col gap-4">
        <Image
          alt={post.title}
          src={post.photo}
          width={400}
        />
        <p>{post.description}</p>
      </div>

      <div className="mt-8">
        <section className="flex gap-4 items-center">
          <p className="font-bold text-2xl mb-2">Comments</p>
          <Form action="comments">
            <button type="submit" id="comments-form-submit-button" />
            <Switch
              isSelected={isCommentsSwitchSelected}
              onValueChange={handleViewAllCommentsSwitch}
              size="sm"
            >
              View All Comments
            </Switch>
          </Form>
        </section>

        <fetcher.Form method="post" ref={$form} className="flex items-end gap-4 mb-2">
          <Textarea
            required
            name="description"
            placeholder="Write about post..."
            size="sm"
            variant="bordered"
          />
          <Button size="sm" type="submit" color="primary">Comment</Button>
        </fetcher.Form>
      </div>

      {!isCommentsSwitchSelected && fetcher.data?.status === "success" && (
        <Comments comments={[fetcher.data.comment]} />
      )}

      <Outlet />
    </div>
  )
}

export default PostDetails;
