import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "react-router-dom";

const AuthForm = () => {
  const data = useActionData();
  const navigate = useNavigation();

  const [searchParams] = useSearchParams(); //searchParams is ?mode=login (mode is key and login is value) after question mark in route.Same with query parameter
  const isLogin = searchParams.get("mode") === "login";
  const isSubmitting = navigate.state === "submitting";

  return (
    <div className="box">
      <div className="border shadow-xl rounded-md w-[400px] p-10  space-y-4">
        <h2 className="text-center text-3xl font-bold mb-10">
          {isLogin ? "Login your account" : "Create new account"}
        </h2>
        {data?.errors && (
          <ul>
            {Object.values(data.errors).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
        {data?.message && <p>{data.message}</p>}
        <Form className="space-y-3" method="post">
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            className="block  border-2 border-slate-300 w-full p-2 rounded-xl  pl-4"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            className="block  border-2 border-slate-300 w-full p-2 rounded-xl  pl-4"
            required
          />
          <button
            className="block border w-full p-2 rounded-xl  bg-red-500 text-white"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting Now" : isLogin ? "Login" : "Register"}
          </button>
        </Form>
        {isLogin ? (
          <div className="flex justify-between text-sm ">
            <p>Don't have an account?</p>
            <Link className="underline" to={"/auth?mode=signup"}>
              Register here
            </Link>
          </div>
        ) : (
          <div className="flex justify-between text-sm ">
            <p>Already have account?</p>
            <Link className="underline" to={"/auth?mode=login"}>
              Login here
            </Link>
          </div>
        )}
        <hr className="border-black" />
      </div>
    </div>
  );
};

export default AuthForm;
