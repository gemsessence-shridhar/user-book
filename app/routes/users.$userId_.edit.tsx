import { redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";
import { getUser, updateUser } from "~/db";
import { validateUser } from "~/utils/userFormValidationUtils";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId params");
  const formData = await request.formData();
  const updatedUser = Object.fromEntries(formData) as UserType;

  const errors = validateUser(updatedUser)
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    await updateUser(params.userId, updatedUser);
    return redirect(`/users/${params.userId}`);
  }
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  return await getUser(params.userId);
}

const EditUser = () => {
  const user: UserType = useLoaderData();

  return (
    <UserForm user={user} formFor="Edit" />
  )
}

export default EditUser;
