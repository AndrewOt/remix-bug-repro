import type { LoaderFunctionArgs } from "@remix-run/node";
import { redirect } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { Link, useParams } from "react-router-dom";

export async function action({ params, request }: LoaderFunctionArgs) {
  const { theId } = params;
  const formData = await request.formData();
  const name = formData.get("name");
  if (!name) {
    return { error: "Name is required" };
  }
  console.log(name);
  return redirect(`/my-page/${theId}/success`);
}

export default function MyPage() {
  const { theId } = useParams();
  const data = useActionData() as { error: string };

  return (
    <>
      <Form method="post">
        <input type="text" name="name" />
        {data?.error ? <span>{data.error}</span> : null}
        <input type="submit" />
      </Form>
      <Link to={`/my-page/${theId}/success`}>Link test</Link>
    </>
  );
}
