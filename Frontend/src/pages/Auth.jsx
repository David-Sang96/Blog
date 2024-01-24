/* eslint-disable react-refresh/only-export-components */
import { json, redirect } from "react-router-dom";
import AuthForm from "../components/AuthForm";

const Auth = () => {
  return (
    <div>
      <AuthForm />
    </div>
  );
};

export default Auth;

export const action = async ({ request }) => {
  const searchParams = new URL(request.url).searchParams; //current full route (URL is ES6 default api)
  const mode = searchParams.get("mode") || "login";

  if (mode !== "login" && mode !== "signup") {
    throw new Error("");
  }

  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch(`http://localhost:8080/${mode}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "401 Unauthorized" }, { status: 401 });
  }

  const resData = await response.json();
  const authToken = resData.token;

  localStorage.setItem("token", authToken);
  const expDate = new Date();
  expDate.setHours(expDate.getHours() + 1);
  localStorage.setItem("exp", expDate.toISOString());
  return redirect("/");
};
