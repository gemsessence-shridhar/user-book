import { Button, Input, Textarea } from "@nextui-org/react";
import { Form, useNavigate } from "@remix-run/react";
import moment from "moment";
import { PostType } from "~/types";

interface PostFormProps {
  post: PostType;
}

const PostForm = ({ post }: PostFormProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 w-6/12 mt-4">
      <p className="font-bold text-2xl mb-4">{`${post.user_id === "" ? "New" : "Edit"} Post`}</p>
      <Form method="post" className="user-form">
        <input
          type="hidden"
          name="created_at"
          value={post.created_at}
        />
        <Input name="title" label="Title" defaultValue={post.title} />
        <Textarea
          name="description"
          label="Description"
          defaultValue={post.description}
        />
        <Input name="photo" label="Photo URL" defaultValue={post.photo} />

        <span>
          <Button
            type="submit"
            radius="full"
            color="success"
            className="mr-4"
          >
            Submit
          </Button>

          <Button
            radius="full"
            color="warning"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </span>
      </Form>
    </div>
  )
}

export default PostForm;
