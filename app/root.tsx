import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { NextUIProvider } from "@nextui-org/react";
import AppNavigation from "./components/shared/AppNavigation";
import { authenticator } from "./services/auth.server";
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

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request);
}

export default function App() {
  const currentUser = useLoaderData<typeof loader>();

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
          <AppNavigation isAuthenticated={currentUser !== null} />
          <Outlet context={{ currentUser }} />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </NextUIProvider>
      </body>
    </html>
  );
}
