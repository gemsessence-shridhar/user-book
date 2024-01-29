import { Card, CardBody, CardHeader, Image } from "@nextui-org/react";
import { NavLink } from "@remix-run/react";
import moment from "moment";
import { PostType } from "~/types";

interface PostProps {
  post: PostType;
}

const Post = ({ post }: PostProps) => {
  return (
    <NavLink to={post.id}>
      <Card className="post-card py-4">
        <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
          <p className="text-tiny uppercase font-bold">{post.title}</p>
          <p className="text-xs">{moment(post.created_at?.seconds).fromNow()}</p>
        </CardHeader>
        <CardBody className="overflow-visible py-2">
          <Image
            alt="Image"
            className="object-cover rounded-xl"
            src={post.photo}
            width={270}
          />
          <p className="mt-2 whitespace-nowrap overflow-hidden text-ellipsis">{post.description}</p>
        </CardBody>
      </Card>
    </NavLink>
  )
}

export default Post;
