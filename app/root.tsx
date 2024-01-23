import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Form,
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useSubmit,
} from "@remix-run/react";
import { NextUIProvider, User, Button } from "@nextui-org/react";
import { NavLink } from "@remix-run/react";
import AppNavigation from "./components/shared/AppNavigation";

import type { UserType } from "~/types";

import { db } from "~/utils/db.server";

import stylesheet from "./tailwind.css";
import styles from "./app.css";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [
    { rel: "stylesheet", href: cssBundleHref },
  ] : [
    { rel: "stylesheet", href: stylesheet },
    { rel: "stylesheet", href: styles },
  ]),
];

export const loader = async () => {
  const querySnapshots = await db.collection("users").get();
  const data: any = [];
  querySnapshots.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

export default function App() {
  const submit = useSubmit();
  const users = useLoaderData<typeof loader>()

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
          <AppNavigation />
          <div className="app-content flex">
            <div className="user-list">
              <section className="border-b p-4">
                <Form action="users/new">
                  <Button type="submit" color="primary" size="sm" className="font-bold">
                    + New
                  </Button>
                </Form>
              </section>

              <div className="gap-2 grid p-4">
                {users.map((user: UserType) => (
                  <NavLink key={user.id} to={`users/${user.id}`}>
                    <User
                      name={`${user.first_name} ${user.last_name}`}
                      avatarProps={{ src: user.avatar }}
                    />
                  </NavLink>
                ))}
              </div>
            </div>

            <aside id="outlet-wrapper">
              <Outlet />
            </aside>
          </div>

          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html>
  );
}
