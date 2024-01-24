import { MdOutlineDateRange } from "react-icons/md";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Post = ({ post }) => {
  const { id, title, image, date } = post;
  return (
    <section className=" md:w-1/2 md:mx-auto  border-b-2 pb-3">
      <Link to={`${id}`}>
        <img
          src={image}
          alt={title}
          className="w-full  md:h-[250px] rounded-md mb-4"
        />
        <p className="text-2xl font-bold mb-3">{title}</p>
        <p className="text-slate-500 flex items-center space-x-2">
          <MdOutlineDateRange className="text-xl" />
          <span> Posted on - {date}</span>
        </p>
      </Link>
    </section>
  );
};

export default Post;
