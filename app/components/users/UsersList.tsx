import { NavLink } from "@remix-run/react";

type User = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
}

type UsersListProps = {
  users: Array<User>
};

const UsersList = ({ users }: UsersListProps) => {
  return (
    <aside>
      {users.map((user) => (
        <NavLink key={user.id} to={`/${user.id}`}>
          {`${user.first_name} ${user.last_name}`}
        </NavLink>
      ))}
    </aside>
  )
};

export default UsersList;
