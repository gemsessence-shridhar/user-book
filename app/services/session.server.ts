import { createCookieSessionStorage } from "@remix-run/node";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "_user_book_app_session", // use any name you want here
    sameSite: "lax", // this helps with CSRF
    path: "/", // remember to add this so the cookie will work in all routes
    httpOnly: true, // for security reasons, make this cookie http only
    secrets: [process.env.COOKIE_SESSION_STORAGE_SECRET || "s3cr3t"],
    secure: process.env.NODE_ENV === "production",
  }
});

export const { getSession, commitSession, destroySession } = sessionStorage;
