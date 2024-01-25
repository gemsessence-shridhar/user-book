import { ActionFunctionArgs, redirect } from "@remix-run/node";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";
import { createUser } from "~/db";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const fieldValues: any = Object.fromEntries(formData);
  const userRecord: any = await createUser(fieldValues);
  return redirect(`/users/${userRecord.id}`);
} 

const NewUser = () => {
  const newUserAttributes: UserType = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    contact: "",
    avatar: "",
    about: ""
  };

  return (
    <UserForm user={newUserAttributes} />
  )
}

export default NewUser;
