import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import UserForm from "~/components/users/UserForm";
import { createUser } from "~/db";
import { getBlankUser } from "~/db/blankCollections";
import { authenticator } from "~/services/auth.server";
import { UserType } from "~/types";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const fieldValues = Object.fromEntries(formData) as UserType;

  let errors: Partial<UserType> = {};
  if (fieldValues.first_name === "") {
    errors.first_name = "First name can't be blank"
  }

  return errors;

  // await createUser(fieldValues);

  // TODO:: Check if user creation is successful
  // return await authenticator.authenticate("user-pass", request, {
  //   successRedirect: "/",
  //   failureRedirect: "/signup",
  // });

  // return redirect("/");
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return await authenticator.isAuthenticated(request, {
    successRedirect: "/",
  });
}

const SignupUser = () => {
  const formErrors = useActionData<typeof action>();

  return (
    <UserForm user={getBlankUser()} formErrors={formErrors} />
  )
}

export default SignupUser;
