/* eslint-disable no-unused-vars */
/* eslint-disable react-refresh/only-export-components */
import { FcDeleteDatabase } from "react-icons/fc";
import { IoArrowBackCircleOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { RiEditLine } from "react-icons/ri";
import {
  Link,
  json,
  redirect,
  useRouteLoaderData,
  useSubmit,
} from "react-router-dom";
import { getToken } from "../util/auth";

const PostDetails = () => {
  const post = useRouteLoaderData("post-detail");
  const isToken = useRouteLoaderData("root");
  const submit = useSubmit();

  const handleDelete = () => {
    const confirmation = window.confirm("Are you sure deleting the post?");
    if (confirmation) {
      submit(null, { method: "DELETE" });
    }
  };

  return (
    <section className=" md:w-1/2 md:mx-auto  border-b-2 pb-3">
      {isToken && (
        <div className="flex justify-between py-3">
          <Link to={"edit-post"} className="flex items-center gap-1">
            <p>Edit</p>
            <RiEditLine className="text-lg" />
          </Link>

          <button
            className="flex items-center gap-1 me-1"
            onClick={handleDelete}
          >
            <p>Delete</p>
            <FcDeleteDatabase className="text-lg" />
          </button>
        </div>
      )}
      <img
        src={post.image}
        alt={post.title}
        className="w-full  rounded-md mb-4"
      />
      <div className="px-2 space-y-3">
        <p className="text-2xl font-bold ">{post.title}</p>
        <p className="text-justify">{post.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-slate-500  flex items-center space-x-2">
            <MdOutlineDateRange className="text-xl" />
            <span>Posted on - {post.date}</span>
          </p>
          <Link to={"/"}>
            <IoArrowBackCircleOutline className="me-2 text-3xl text-pink-600" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PostDetails;

export const loader = async ({ request, params }) => {
  const response = await fetch(`http://localhost:8080/posts/${params.id}`);

  if (!response.ok) {
    throw json({ message: "can't find post" }, { status: 404 });
  } else {
    const data = await response.json();
    return data.post;
  }
};

export const action = async ({ request, params }) => {
  const token = getToken();
  const response = await fetch(`http://localhost:8080/posts/${params.id}`, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });
  if (!response.ok) {
    throw new Error("");
  }
  return redirect("/");
};
