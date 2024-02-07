import {
  Form,
  Outlet,
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "@remix-run/react";
import { Button, Tab, Tabs } from "@nextui-org/react";
import { OutletContextType } from "~/types";
import { useEffect, useState } from "react";

const TABS = {
  bio: { key: "bio", name: "Bio" },
  posts: { key: "posts", name: "Posts" }
}

const UserDetails = () => {
  const [selectedTab, setSelectedTab] = useState<string>();
  const { currentUser } = useOutletContext<OutletContextType>();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const params = useParams();
  const USER_URL_REGEX = /^\/users\/[^/]+\/?$/;
  const POSTS_URL_REGEX = /^\/users\/[^/]+\/posts\/?$/;

  useEffect(() => {
    if (USER_URL_REGEX.test(pathname)) {
      setSelectedTab(TABS.bio.key);
    } else if (POSTS_URL_REGEX.test(pathname)) {
      setSelectedTab(TABS.posts.key);
    }
  }, [pathname]);

  useEffect(() => {
    if (selectedTab === TABS.bio.key) {
      return navigate(`/users/${params.userId}`);
    } else if (selectedTab === TABS.posts.key) {
      return navigate(`/users/${params.userId}/posts`);
    }
  }, [selectedTab]);

  return (
    <>
      <div className="flex items-end justify-between">
        <Tabs
          onSelectionChange={(key: any) => setSelectedTab(key)}
          selectedKey={selectedTab}
          variant="underlined"
        >
          <Tab key={TABS.bio.key} title={TABS.bio.name} />
          <Tab key={TABS.posts.key} title={TABS.posts.name} />
        </Tabs>

        {currentUser.id === params.userId && POSTS_URL_REGEX.test(pathname) && (
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
