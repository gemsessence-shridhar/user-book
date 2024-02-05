import {
  Form,
  Outlet,
  useLocation,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { OutletContextType } from "~/types";

const TABS = {
  bio: { key: "bio", name: "Bio" },
  posts: { key: "posts", name: "Posts" }
}

const UserDetails = () => {
  const { currentUser } = useOutletContext<OutletContextType>();
  const { pathname } = useLocation();
  const params = useParams();

  return (
    <>
      <div className="flex items-end justify-between">
        <Tabs
          selectedKey={pathname}
          variant="underlined"
        >
          <Tab
            href={`/users/${params.userId}`}
            key={`/users/${params.userId}`}
            title={TABS.bio.name}
          />
          <Tab
            href={`/users/${params.userId}/posts`}
            key={`/users/${params.userId}/posts`}
            title={TABS.posts.name}
          />
        </Tabs>

        {currentUser.id === params.userId && (
          <Form action={`/users/${params.userId}/posts/new`} className="pr-4">
            <Button color="primary" className="font-bold" type="submit" size="sm">
              + New Post
            </Button>
          </Form>
        )}
      </div>

      <div className="p-4">
        <Outlet context={{ currentUser }} />
      </div>
    </>
  )
}

export default UserDetails;
