import { ActionFunctionArgs, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { useActionData } from "@remix-run/react";
import UserForm from "~/components/users/UserForm";
import { createUser } from "~/db";
import { getBlankUser } from "~/db/blankCollections";
import { authenticator } from "~/services/auth.server";
import { UserType } from "~/types";
import { validateUser } from "~/utils/userFormValidationUtils";

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.formData();
  const newUser = Object.fromEntries(formData) as UserType;

  const errors = validateUser(newUser)
  if (Object.keys(errors).length > 0) {
    return errors;
  } else {
    await createUser(newUser);
    return redirect("/");
    // TODO:: Check if user creation is successful
    // return await authenticator.authenticate("user-pass", request, {
    //   successRedirect: "/",
    //   failureRedirect: "/signup",
    // });
  }
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
