import { RouterProvider, createBrowserRouter } from "react-router-dom";
import {
  action as createPostAction,
  action as editPostAction,
} from "./components/PostForm";
import Layout from "./layout";
import Auth, { action as authAction } from "./pages/Auth";
import CreatePost from "./pages/CreatePost";
import EditPost from "./pages/EditPost";
import Error from "./pages/Error";
import { loader as logoutLoader } from "./pages/LogOut";
import PostDetails, {
  action as deleteAction,
  loader as postDetailsLoader,
} from "./pages/PostDetails";
import Posts, { loader as postLoader } from "./pages/Posts";
import { checkTokenLoader, tokenLoader } from "./util/auth";

function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <Layout />,
      errorElement: <Error />,
      id: "root",
      loader: tokenLoader,
      children: [
        {
          index: true,
          element: <Posts />,
          loader: postLoader,
        },
        {
          path: "/create-post",
          element: <CreatePost />,
          action: createPostAction,
          loader: checkTokenLoader,
        },
        {
          path: "/auth",
          element: <Auth />,
          action: authAction,
        },
        {
          path: "/logout",
          loader: logoutLoader,
        },
        {
          path: ":id",
          id: "post-detail",
          loader: postDetailsLoader,
          children: [
            {
              index: true,
              element: <PostDetails />,
              action: deleteAction,
            },
            {
              path: "edit-post",
              element: <EditPost />,
              action: editPostAction,
              loader: checkTokenLoader,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
