import { ActionFunctionArgs, redirect } from "@remix-run/node";
import invariant from "tiny-invariant";
import { db } from "~/utils/db.server";

export const action = async ({ params }: ActionFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  await db.collection("users").doc(params.userId).delete();
  return redirect("/");
}