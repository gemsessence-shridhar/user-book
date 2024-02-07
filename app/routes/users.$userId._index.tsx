import { Button, Image } from "@nextui-org/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { Form, useLoaderData, useOutletContext } from "@remix-run/react";
import invariant from "tiny-invariant";
import { PencilIcon, TrashIcon } from "~/components/icons";
import EnvelopeIcon from "~/components/icons/EnvelopeIcon";
import TelephoneIcon from "~/components/icons/TelephoneIcon";
import { getUser } from "~/db";
import { OutletContextType } from "~/types";


export const loader = async ({
  params
}: LoaderFunctionArgs) => {
  invariant(params.userId, "Missing userId param");
  const user = await getUser(params.userId);
  if (!user) throw new Response("Not Found", { status: 404 });
  return user;
}

const UserBio = () => {
  const { currentUser } = useOutletContext<OutletContextType>();
  const user = useLoaderData<typeof loader>();

  return (
    <div className="flex gap-4">
      <Image
        width={250}
        alt={`${user.first_name} ${user.last_name}`}
        src={user.avatar}
      />

      <section className="user-details-sections">
        <div className="flex gap-1">
          <p className="text-3xl font-bold mr-4">{`${user.first_name} ${user.last_name}`}</p>

          {currentUser.id === user.id && (
            <>
              <Form action="edit">
                <Button isIconOnly color="primary" aria-label="Edit" type="submit" size="sm">
                  <PencilIcon />
                </Button>
              </Form>

              <Form action="destroy" method="post">
                <Button
                  isIconOnly
                  color="danger"
                  aria-label="Delete"
                  type="submit"
                  size="sm"
                  onClick={(event) => {
                    const response = confirm("Are you sure to delete this user?");
                    if (!response) {
                      event.preventDefault();
                    }
                  }}
                >
                  <TrashIcon />
                </Button>
              </Form>
            </>
          )}
        </div>

        <div className="flex gap-2">
          <EnvelopeIcon />
          <p className="text-sm">{user.email}</p>
        </div>

        <div className="flex gap-2">
          <TelephoneIcon />
          <p className="text-xs">{user.contact}</p>
        </div>

        <div className="mt-4 py-4">
          <p className="text-base">{user.about}</p>
        </div>
      </section>
    </div>
  )
}

export default UserBio;
