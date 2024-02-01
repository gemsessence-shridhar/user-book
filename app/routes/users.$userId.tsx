import { Outlet, useLocation, useParams } from "@remix-run/react";;
import { Tab, Tabs } from "@nextui-org/react";

const TABS = {
  bio: { key: "bio", name: "Bio" },
  posts: { key: "posts", name: "Posts" }
}

const UserDetails = () => {
  const { pathname } = useLocation();
  const params = useParams();

  return (
    <>
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

      <div className="p-4">
        <Outlet />
      </div>
    </>
  )
}

export default UserDetails;
