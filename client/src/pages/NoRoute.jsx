import { useLocation, useNavigate } from "react-router-dom";
import { Meta } from "../components";

const NoRoute = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="h-52 flex justify-center items-center flex-col gap-5">
      <Meta
        title="Page not found | Worknity"
        description="Oops! The page you're looking for doesn't exist. Use the button below to return to the homepage or explore other sections of Worknity."
        robots="noindex, follow"
      />
      <h1 className="text-lg w-3/5 text-center sm:text-2xl sm:w-full font-semibold">
        Oops! We couldn&apos;t find the page{" "}
        <span className="text-gray-700">{location.pathname}</span>
      </h1>
      <button
        onClick={() => navigate(-1)}
        className="bg-black rounded px-3 py-1 text-white text-sm sm:text-xl"
      >
        Go Back
      </button>
    </div>
  );
};

export default NoRoute;
