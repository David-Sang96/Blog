/* eslint-disable react-refresh/only-export-components */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Form,
  Link,
  json,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import uuid from "react-uuid";
import { getToken } from "../util/auth";

const PostForm = ({
  header,
  create = "Update",
  currentPostData,
  method = "post",
}) => {
  const data = useActionData();
  const navigate = useNavigation();
  const isSubmitting = navigate.state === "submitting";
  return (
    <Form
      method={method}
      className="mt-3 mx-auto space-y-4 pb-2 md:w-1/2  md:space-y-7  font-mono "
    >
      <h2 className="text-center text-2xl font-bold">{header}</h2>
      {data?.errors && (
        <ul>
          {Object.values(data.errors).map((err) => (
            <li key={err}>{err}</li>
          ))}
        </ul>
      )}
      <div className="flex flex-col md:flex-row md:items-center md:gap-4 ">
        <label
          htmlFor="form-title"
          className="text-xl mb-2 md:font-bold md:mb-0 "
        >
          Title
        </label>
        <input
          type="text"
          id="form-title"
          name="title"
          className="required:border-pink-600 border p-2 text-sm focus:outline-none focus:border-pink-600 rounded-md ps-2 bg-gray-100 md:w-full font-sans"
          required
          defaultValue={currentPostData && currentPostData.title}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center ">
        <label
          htmlFor="form-image"
          className="text-xl mb-2 md:mb-0 md:mr-3 md:font-bold "
        >
          Image
        </label>
        <input
          type="url"
          id="form-image"
          name="image"
          className="border p-2 text-sm focus:outline-none  font-sans focus:border-pink-600 rounded-md ps-2 bg-gray-100 md:w-full"
          required
          defaultValue={currentPostData && currentPostData.image}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center ">
        <label
          htmlFor="form-date"
          className="text-xl mb-2 md:mb-0 md:mr-5 md:font-bold "
        >
          Date
        </label>
        <input
          type="date"
          id="form-date"
          name="date"
          className="border p-2 text-sm focus:outline-none  focus:border-pink-600 rounded-md ps-2 bg-gray-100 md:w-full"
          required
          defaultValue={currentPostData && currentPostData.date}
        />
      </div>
      <div className="flex flex-col md:flex-row md:items-center md:gap-8 ">
        <div className="textRotate mb-2 md:mb-2">
          <label htmlFor="form-date" className="text-xl md:mb-0 md:font-bold">
            Description
          </label>
        </div>

        <textarea
          name="description"
          id=""
          cols="30"
          rows="10"
          className="border focus:outline-none bg-gray-100  font-sans focus:border-pink-600 rounded-md p-2 w-full"
          required
          defaultValue={currentPostData && currentPostData.description}
        ></textarea>
      </div>
      <div className="text-center space-x-3">
        <button
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-8 rounded-full active:bg-slate-500"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting Now" : create}
        </button>
        <Link
          to={"/"}
          className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-8 rounded-full active:bg-slate-500 inline-block"
        >
          Cancel
        </Link>
      </div>
    </Form>
  );
};

export default PostForm;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const method = request.method;
  const token = getToken();
  const postData = {
    id: uuid(),
    title: data.get("title"),
    date: data.get("date"),
    image: data.get("image"),
    description: data.get("description"),
  };

  let url = "http://localhost:8080/posts";

  if (method === "PATCH") {
    const id = params.id;
    url = `http://localhost:8080/posts/${id}`;
  }

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token, //need space after Bearer
    },
    body: JSON.stringify(postData),
  });
  if (response.status === 422) {
    return response;
  }
  if (!response.ok) {
    throw json({ message: "can't create post" }, { status: 405 });
  }
  return redirect("/");
};
