import { Button } from "@/shared";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  friends: string["2"];
  location: string;
  occupation: string;
  picturePath: string;
  createdAt: string;
  updatedAt: string;
}

const ProfileBar = () => {
  const user = localStorage.getItem("ud")
    ? JSON.parse(localStorage.getItem("ud")!)
    : null;
  return (
    <div className="relative h-fit lg:w-1/3 xl:w-1/2 bg-white border rounded-2xl shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div
        className={`${
          !user ? "block" : "hidden"
        } absolute top-0 left-0 right-0 bottom-0 backdrop-blur-sm rounded-3xl`}
      ></div>
      {user ? <ProtectedProfileBar user={user} /> : <PublicProfileBar />}
    </div>
  );
};

const ProtectedProfileBar = ({ user }: { user: User }) => {
  return (
    <>
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <div className="overflow-hidden w-24 h-24 rounded-full shadow-lg">
          <img
            className="object-cover w-full h-full"
            src={`https://drive.google.com/thumbnail?id=${user?.picturePath}&sz=w300`}
            alt={`${user?.firstName} ${user?.lastName}`}
          />
        </div>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          {user?.firstName} {user?.lastName}
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {user?.occupation}
        </span>
        <div className="flex mt-4 md:mt-6">
          <Link to="/user">
            <Button children="Profile" />
          </Link>
        </div>
      </div>
    </>
  );
};

const PublicProfileBar = () => {
  return (
    <>
      <div className="flex justify-end px-4 pt-4">
        <button
          id="dropdownButton"
          className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
          type="button"
        >
          <span className="sr-only">Open dropdown</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 16 3"
          >
            <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
          </svg>
        </button>
      </div>
      <div className="flex flex-col items-center pb-10">
        <span className="w-24 h-24 mb-3 rounded-full shadow-lg bg-blue-400"></span>
        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
          Text placeholder
        </h5>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Text placeholder for bio
        </span>
        <div className="flex mt-4 md:mt-6">
          <Link to="/user">
            <Button children="Profile" />
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProfileBar;
