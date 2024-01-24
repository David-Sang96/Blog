import { Link, NavLink, useRouteLoaderData } from "react-router-dom";

const Navbar = () => {
  const isToken = useRouteLoaderData("root");

  return (
    <nav className="flex justify-between items-center py-2 sticky top-0 backdrop-blur-md ">
      <Link to={"/"}>
        <h1 className="text-xl md:text-3xl font-bold text-pink-600">BLOG</h1>
      </Link>

      <ul className="flex items-center space-x-4 text-pink-500 font-bold md:text-lg">
        <NavLink to={"/"}>Posts</NavLink>
        {isToken && <NavLink to={"/create-post"}>Create Post</NavLink>}
        {!isToken && <NavLink to={"/auth?mode=login"}>Login</NavLink>}
        {isToken && <NavLink to={"/logout"}>Logout</NavLink>}
      </ul>
    </nav>
  );
};

export default Navbar;
