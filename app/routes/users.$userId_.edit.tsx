import { Input, Button, Textarea } from "@nextui-org/react";
import { Form, json, redirect, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";
import type {
  ActionFunctionArgs,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { db } from "~/utils/db.server";
import UserForm from "~/components/users/UserForm";
import type { UserType } from "~/types";

export const action = async ({ params, request }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId params");
  const formData = await request.formData();
  const updates = Object.fromEntries(formData);
  await db.collection("users").doc(params.userId).update(updates);
  return redirect(`/users/${params.userId}`);
}

export const loader = async ({ params }: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const userResponse = await db.collection("users").doc(params.userId).get();
  return userResponse.data();
}

const EditContact = () => {
  const user: UserType = useLoaderData();

  return (
    <UserForm user={user} />
  )
}

export default EditContact;
