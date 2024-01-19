import type { MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import UsersList from "~/components/users/UsersList";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};


export const loader = async () => {
  const response = await fetch("https://reqres.in/api/users");
  return await response.json();
}

export default function Index() {
  const users = useLoaderData<typeof loader>()
  console.log(users);

  return (
    <UsersList users={users.data} />
  );
}
