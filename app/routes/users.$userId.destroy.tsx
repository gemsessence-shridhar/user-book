import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { destroyUser } from "~/db";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  await destroyUser(params.userId);
  return redirect("/");
}