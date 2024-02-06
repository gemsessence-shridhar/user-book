import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useFetchers,
  useLoaderData,
  useNavigation,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import NProgress from "nprogress";
import { useEffect } from "react";
import AppNavigation from "./components/shared/AppNavigation";
import UserList from "./components/users/UserList";

import { getUsers } from "./db";
import { authenticator } from "./services/auth.server";

import stylesheet from "./tailwind.css";
import nProgressStyles from "nprogress/nprogress.css";
import styles from "./app.css";

NProgress.configure({ showSpinner: false });

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: "stylesheet", href: cssBundleHref },
  ] : [
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: nProgressStyles },
    { rel: "stylesheet", href: styles },
  ]),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  let currentUser;
  let users = [];

  if (!["/login", "/signup"].includes(url.pathname)) {
    currentUser = await authenticator.isAuthenticated(request, {
      failureRedirect: "/login",
    });
  }

  if (currentUser) {
    users = await getUsers();
  }

  return { currentUser, users };
}

export default function App() {
  const navigation = useNavigation();
  let fetchers = useFetchers();
  const { currentUser, users } = useLoaderData<typeof loader>();

  useEffect(() => {
    const fetchersIdle = fetchers.every((f) => f.state === 'idle');
    if (navigation.state === 'idle' && fetchersIdle) {
      NProgress.done();
    } else {
      NProgress.start();
    }
  }, [navigation.state, fetchers]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider className="h-full">
          <AppNavigation currentUser={currentUser} />

          {currentUser ? (
            <div className="app-content flex">
              <aside id="outlet-wrapper">
                <Outlet context={{ currentUser }} />
              </aside>

              <UserList currentUser={currentUser} users={users} />
            </div>
          ) : (
            <Outlet />
          )}

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html >
  );
}
