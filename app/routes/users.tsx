import { Button, User } from "@nextui-org/react";
import type { LoaderFunctionArgs } from "@remix-run/node";
import { Form, NavLink, Outlet, useLoaderData, useOutletContext } from "@remix-run/react";
import { authenticator } from "~/services/auth.server";
import { OutletContextType, UserType } from "~/types";
import { getUsers } from "~/db/users";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await authenticator.isAuthenticated(request, { failureRedirect: "/login" });
  return await getUsers();
}

const Users = () => {
  const { currentUser } = useOutletContext<OutletContextType>();
  const users = useLoaderData<typeof loader>();

  const moveCurrentUserAtFirstPosition = (allUsers: Array<UserType>) => {
    const index = allUsers.findIndex((user: UserType) => user.id === currentUser.id);
    if (index !== -1) {
      const movedObject = allUsers.splice(index, 1)[0];
      allUsers.unshift(movedObject);
    }
    return allUsers;
  }

  return (
    <div className="app-content flex">
      <aside id="outlet-wrapper">
        <Outlet context={{ currentUser }} />
      </aside>

      <div className="user-list">
        <div className="users-side-nav gap-2 grid p-4">
          {moveCurrentUserAtFirstPosition(users).map((user: UserType) => (
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
                name={user.id === currentUser.id ? "Me" : `${user.first_name} ${user.last_name}`}
                avatarProps={{ src: user.avatar }}
              />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Users;
