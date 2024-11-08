import { Button } from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem("ud") ? JSON.parse(localStorage.getItem("ud")!) : null
  );
  const user = localStorage.getItem("ud")
    ? JSON.parse(localStorage.getItem("ud")!)
    : null;

  useEffect(() => {
    setCurrentUser(user);
  }, []);

  async function handleSignOut() {
    try {
      setLoading(true);

      await axios.post("http://localhost:3001/api/auth/logout");

      localStorage.removeItem("ud");
      window.location.reload();
      window.location.href = "/auth/sign-in";
    } catch (error) {
      console.error(error);
      console.log("Error signing out");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  return (
    <header className="bg-white border-gray-200 dark:bg-gray-900">
      <nav className="container">
        <div className="flex flex-wrap items-center justify-between mx-auto p-4">
          <Link
            to="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <img
              src="https://flowbite.com/docs/images/logo.svg"
              className="h-8"
              alt="Flowbite Logo"
            />
            <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
              LinkedOut
            </span>
          </Link>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <ul>
              {currentUser ? (
                <div className="flex items-center gap-4">
                  <Button className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80 font-medium capitalize rounded-full text-sm px-5 py-2.5 text-center ">
                    <Link to="/user">Profile</Link>
                  </Button>
                  <Button variant="text" color="red" onClick={handleSignOut}>
                    <svg
                      className="w-6 h-6"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"
                      />
                    </svg>
                  </Button>
                </div>
              ) : (
                <Link to="/auth/sign-in">
                  <Button children="Sign In" />
                </Link>
              )}
            </ul>
            <button
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          </div>
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-cta"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <Link to="/network">Networks</Link>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;