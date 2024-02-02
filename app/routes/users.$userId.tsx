import { Outlet, useLocation, useOutletContext, useParams } from "@remix-run/react";;
import { Tab, Tabs } from "@nextui-org/react";
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
        <Outlet context={{ currentUser }} />
      </div>
    </>
  )
}

export default UserDetails;
