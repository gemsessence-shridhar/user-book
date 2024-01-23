import { ActionFunctionArgs, redirect } from "@remix-run/node";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";
import { db } from "~/utils/db.server";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const fieldValues = Object.fromEntries(formData);
  const userRecord = await db.collection("users").add(fieldValues);
  return redirect(`/users/${userRecord.id}`);
} 

const NewUser = () => {
  const newUserAttributes: UserType = {
    id: "",
    first_name: "",
    last_name: "",
    email: "",
    contact: "",
    avatar: "",
    about: ""
  };

  return (
    <UserForm user={newUserAttributes} />
  )
}

export default NewUser;
