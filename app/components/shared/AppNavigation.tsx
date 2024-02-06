import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  User,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Form, NavLink } from "@remix-run/react";
import { UserType } from "~/types";
import { LogoutIcon } from "../icons";

interface AppNavigationProps {
  currentUser: UserType | null;
}

const AppNavigation = ({ currentUser }: AppNavigationProps) => {
  return (
    <Navbar isBordered className="top-navbar">
      <NavbarBrand>
        <NavLink to="/">
          <p className="font-bold text-inherit">Friends Book</p>
        </NavLink>
      </NavbarBrand>

      {currentUser && (
        <>
          <NavbarContent justify="center">
            <NavbarItem className="app-nav-item">
              <NavLink to="/" end>Home</NavLink>
            </NavbarItem>

            <NavbarItem className="app-nav-item">
              <NavLink to={`/users/${currentUser.id}`} end>Profile</NavLink>
            </NavbarItem>

            <NavbarItem className="app-nav-item">
              <NavLink to={`/users/${currentUser.id}/posts`} end>Posts</NavLink>
            </NavbarItem>
          </NavbarContent>

          <NavbarContent justify="end">
            <Dropdown>
              <DropdownTrigger>
                <User
                  name={`${currentUser.first_name} ${currentUser.last_name}`}
                  avatarProps={{ src: currentUser.avatar }}
                  classNames={{ base: "cursor-pointer", name: "font-bold text-amber-700" }}
                />
              </DropdownTrigger>

              <DropdownMenu variant="shadow">
                <DropdownItem key="edit" startContent={<LogoutIcon />}>
                  <Form action="/logout" method="post">
                    <button className="navbar-button" type="submit">
                      Logout
                    </button>
                  </Form>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
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
