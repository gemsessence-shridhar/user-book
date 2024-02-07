import { Button, Card, Input } from "@nextui-org/react";
import { ActionFunctionArgs, LoaderFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";
import EmailIcon from "~/components/icons/EMailIcon";
import PasswordIcon from "~/components/icons/PasswordIcon";
import { authenticator } from "~/services/auth.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  return await authenticator.authenticate("user-pass", request, {
    successRedirect: "/",
    failureRedirect: "/login",
  });
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

const Login = () => {
  return (
    <div className="login-container container flex items-center justify-center min-w-full">
      <Form method="post">
        <Card className="min-w-96 p-8 gap-4">
          <p className="font-bold text-3xl text-center mb-2">
            Login
          </p>

          <Input
            isClearable    
            fullWidth
            required
            color="primary"
            size="sm"
            name="email"
            type="email"
            placeholder="Email"
            startContent={<EmailIcon />}
          />

          <Input
            isClearable
            fullWidth
            required
            color="primary"
            size="sm"
            name="password"
            type="password"
            placeholder="Password"
            autoComplete="current-password"
            startContent={<PasswordIcon />}
          />

          {/* <div className="justify-between">
            <Checkbox>
              <Text size={14}>Remember me</Text>
            </Checkbox>
            <Text size={14}>Forgot password?</Text>
          </div> */}

          <Button type="submit" color="primary" variant="flat">Sign in</Button>
        </Card>
      </Form>
    </div>
  )
}

export default Login;
