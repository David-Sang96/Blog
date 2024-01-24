import { json, useLoaderData } from "react-router-dom";
import Post from "../components/Post";

/* eslint-disable react-refresh/only-export-components */
const Posts = () => {
  const posts = useLoaderData();

  return (
    <div className="space-y-6 mt-7">
      {posts.length > 0 &&
        posts.map((post) => <Post key={post.id} post={post} />)}
    </div>
  );
};

export default Posts;

export const loader = async () => {
  const response = await fetch("http://localhost:8080/posts");
  if (!response.ok) {
    throw json({ message: "failed to get posts" }, { status: 404 });
  } else {
    const data = await response.json();
    return data.posts;
  }
};
