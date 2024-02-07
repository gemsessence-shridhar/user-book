import { Button, Input, Textarea } from "@nextui-org/react";
import { Form, useNavigate } from "@remix-run/react";
import { UserType } from "~/types";

interface UserProps {
  user: UserType;
  formFor?: "New" | "Edit"
  formErrors?: Partial<UserType>;
}

const UserForm = ({ user, formFor = "New", formErrors = {} }: UserProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto w-6/12 p-4">
      <p className="font-bold text-2xl mb-4">{`${formFor} User`}</p>
      <Form method="post" className="user-form">
        <Input
          autoFocus
          isRequired
          name="first_name"
          label="First Name"
          defaultValue={user.first_name}
          errorMessage={formErrors?.first_name}
          isInvalid={"first_name" in formErrors}
        />

        <Input
          isRequired
          name="last_name"
          label="Last Name"
          defaultValue={user.last_name}
          errorMessage={formErrors?.last_name}
          isInvalid={"last_name" in formErrors}
        />

        <Input
          isRequired
          name="email"
          type="email"
          label="Email"
          defaultValue={user.email}
          autoComplete="off"
          errorMessage={formErrors?.email}
          isInvalid={"email" in formErrors}
        />

        <Input
          isRequired
          name="password"
          type="password"
          label="Password"
          defaultValue={user.password}
          autoComplete="off"
          errorMessage={formErrors?.password}
          isInvalid={"password" in formErrors}
        />

        <Input
          name="contact"
          label="Contact Number"
          defaultValue={user.contact}
          minLength={10}
          maxLength={13}
          errorMessage={formErrors?.contact}
          isInvalid={"contact" in formErrors}
        />

        <Input
          isRequired
          name="avatar"
          label="Avatar URL"
          defaultValue={user.avatar}
          errorMessage={formErrors?.avatar}
          isInvalid={"avatar" in formErrors}
        />

        <Textarea
          name="about"
          label="About"
          defaultValue={user.about}
        />

        <span>
          <Button
            type="submit"
            radius="full"
            color="success"
            className="mr-4"
          >
            Submit
          </Button>

          <Button
            radius="full"
            color="warning"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
        </span>
      </Form>
    </div>
  )
}

export default UserForm;
