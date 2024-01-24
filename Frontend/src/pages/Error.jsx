import { Link } from "react-router-dom";

const Error = () => {
  return (
    <main className="h-96 mt-20 mx-2 md:w-1/2 md:mx-auto flex flex-col justify-center items-center bg-[#1A2238]">
      <h1 className="text-9xl font-extrabold text-white tracking-widest">
        405
      </h1>
      <div className="bg-[#FF6A3D] py-1 px-2 text-md rounded rotate-12 absolute">
        something went wrong
      </div>
      <button className="mt-5">
        <div className="relative inline-block text-sm font-medium text-[#FF6A3D] group active:text-orange-500 focus:outline-none focus:ring">
          <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-[#FF6A3D] group-hover:translate-y-0 group-hover:translate-x-0"></span>

          <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
            <Link to={"/"}>Go Home</Link>
          </span>
        </div>
      </button>
    </main>
  );
};

export default Error;
