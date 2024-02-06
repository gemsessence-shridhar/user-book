import { User } from "@nextui-org/react";
import { NavLink } from "@remix-run/react";
import { UserType } from "~/types";

interface UserListProps {
  currentUser: UserType;
  users: Array<UserType>;
}

const UserList = ({ currentUser, users }: UserListProps) => {
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
              name={user.id === currentUser.id ? "Me" : `${user.first_name} ${user.last_name}`}
              avatarProps={{ src: user.avatar }}
            />
          </NavLink>
        ))}
      </div>
    </div>
  )
}

export default UserList;
