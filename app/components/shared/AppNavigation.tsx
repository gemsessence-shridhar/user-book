import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { Form } from "@remix-run/react";

interface AppNavigationProps {
  isAuthenticated: boolean;
}

const AppNavigation = ({ isAuthenticated }: AppNavigationProps) => (
  <Navbar isBordered className="top-navbar">
    <NavbarBrand>
      <p className="font-bold text-inherit">UserBook</p>
    </NavbarBrand>

    {/* {isAuthenticated && (
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link color="foreground" href="#">
            Features
          </Link>
        </NavbarItem>
        <NavbarItem isActive>
          <Link href="#" aria-current="page">
            Customers
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="#">
            Integrations
          </Link>
        </NavbarItem>
      </NavbarContent>
    )} */}

    <NavbarContent justify="end">
      {isAuthenticated ? (
        <NavbarItem>
          <Form action="logout" method="post">
            <Button type="submit" color="danger" size="sm" variant="flat">
              Logout
            </Button>
          </Form>
        </NavbarItem>
      ) : (
        <>
          {/* <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem> */}
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign Up
            </Button>
          </NavbarItem>
        </>
      )}
    </NavbarContent>
  </Navbar>
);

export default AppNavigation;
