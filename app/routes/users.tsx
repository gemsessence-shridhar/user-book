import { Button, User } from "@nextui-org/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, NavLink, Outlet, useLoaderData } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { UserType } from "~/types";
import { db } from "~/utils/db.server";

export const loader = async ({ request }: LoaderFunctionArgs ) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  const querySnapshots = await db.collection("users").get();
  const data: any = [];
  querySnapshots.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

const Users = () => {
  const users = useLoaderData<typeof loader>()

  return (
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
            <NavLink
              key={user.id}
              to={`${user.id}`}
              className={({ isActive, isPending }) => 
                isActive
                  ? "active"
                  : isPending
                  ? "pending"
                  : ""
              }
            >
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
  )
}

export default Users;
