import { useRouteLoaderData } from "react-router-dom";
import PostForm from "../components/PostForm";

const EditPost = () => {
  const post = useRouteLoaderData("post-detail");

  return (
    <>
      <PostForm
        header={"Edit Your Post Here"}
        currentPostData={post}
        method={"patch"}
      />
    </>
  );
};

export default EditPost;
