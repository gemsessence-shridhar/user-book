import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Form, NavLink } from "@remix-run/react";
import { UserType } from "~/types";

interface AppNavigationProps {
  currentUser?: UserType;
}

const AppNavigation = ({ currentUser }: AppNavigationProps) => {
  return (
    <Navbar isBordered className="top-navbar">
      <NavbarBrand>
        <p className="font-bold text-inherit">Friends Book</p>
      </NavbarBrand>

      {currentUser && (
        <>
          <NavbarContent justify="center">
            <NavbarItem>
              <NavLink to={`/users/${currentUser.id}`}>Profile</NavLink>
            </NavbarItem>

            <NavbarItem>
              <NavLink to="/users">Users</NavLink>
            </NavbarItem>

            <NavbarItem>
              <Form action="logout" method="post">
                <Button type="submit" as={NavLink}>
                  Logout
                </Button>
              </Form>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <span className="font-bold text-xl">
              {`${currentUser.first_name} ${currentUser.last_name}`}
            </span>
          </NavbarContent>
        </>
      )}

      {!currentUser && (
        <NavbarContent justify="end">
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      )}
    </Navbar >
  )
};

export default AppNavigation;
