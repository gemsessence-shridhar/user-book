import { Input, User } from "@nextui-org/react";
import { Form, NavLink, useSubmit } from "@remix-run/react";
import { UserType } from "~/types";
import { SearchIcon } from "../icons";
import { useEffect } from "react";

interface UserListProps {
  currentUser: UserType;
  users: Array<UserType>;
  searchTerm: string | null;
}

const UserList = ({ currentUser, users, searchTerm }: UserListProps) => {
  const submit = useSubmit();
  const moveCurrentUserAtFirstPosition = (allUsers: Array<UserType>) => {
    const index = allUsers.findIndex((user: UserType) => user.id === currentUser.id);
    if (index !== -1) {
      const movedObject = allUsers.splice(index, 1)[0];
      allUsers.unshift(movedObject);
    }
    return allUsers;
  }

  return (
    <div className="user-list">
      <div className="users-side-nav gap-2 grid p-4">
        <Form
          role="search"
          onChange={(event) => {
            const isFirstSearch = searchTerm === null;
            submit(event.currentTarget, {
              replace: !isFirstSearch,
            })
          }}
        >
          <Input
            id="search-user-input"
            defaultValue={searchTerm || ""}
            name="search"
            placeholder="Search"
            size="sm"
            startContent={<SearchIcon />}
            type="search"
          />
        </Form>

        {moveCurrentUserAtFirstPosition(users).map((user: UserType) => (
          <NavLink
            key={user.id}
            to={`/users/${user.id}`}
            className={({ isActive, isPending }) =>
              isActive
                ? "active"
                : isPending
                  ? "pending"
                  : ""
            }
          >
            <User
              avatarProps={{ src: user.avatar }}
              name={`${user.first_name} ${user.last_name} ${user.id === currentUser.id && "(Me)"}`}
              classNames={{ name: `${user.id === currentUser.id && "font-bold"}` }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default UserList;
