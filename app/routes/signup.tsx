import { ActionFunctionArgs, redirect } from "@remix-run/node";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";
import { createUser } from "~/db";
import { getBlankUser } from "~/db/blankCollections";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const fieldValues: any = Object.fromEntries(formData);
  await createUser(fieldValues);
  return redirect(`/login`);
}

const SignupUser = () => {
  return (
    <UserForm user={getBlankUser()} />
  )
}

export default SignupUser;
