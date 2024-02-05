import { Button, Input, Textarea } from "@nextui-org/react";
import { Form, useNavigate } from "@remix-run/react";
import { UserType } from "~/types";

interface UserProps {
  user: UserType;
  formFor?: "New" | "Edit"
}

const UserForm = ({ user, formFor = "New" }: UserProps) => {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 w-6/12 mt-4">
      <p className="font-bold text-2xl mb-4">{`${formFor} User`}</p>
      <Form method="post" className="user-form">
        <input type="hidden" name="type" value="user" />
        <Input name="first_name" label="First Name" defaultValue={user.first_name} />
        <Input name="last_name" label="Last Name" defaultValue={user.last_name} />
        <Input name="email" type="email" label="Email" defaultValue={user.email} autoComplete="off" />
        <Input name="password" type="password" label="Password" defaultValue={user.password} autoComplete="off" />
        <Input name="contact" label="Contact Number" defaultValue={user.contact} />
        <Input name="avatar" label="Avatar URL" defaultValue={user.avatar} />
        <Textarea name="about" label="About" defaultValue={user.about} />

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
