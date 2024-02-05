import { redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";
import { getUser, updateUser } from "~/db";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId params");
  const formData = await request.formData();
  const updates: any = Object.fromEntries(formData);
  await updateUser(params.userId, updates);
  return redirect(`/users/${params.userId}`);
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
