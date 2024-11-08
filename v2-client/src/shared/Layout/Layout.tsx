import { Navigate, Outlet } from "react-router-dom";
import { Navbar, Footer } from "@/shared";

const PublicRoutes = () => {
  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

const ProtectedRoutes = () => {
  const user = localStorage.getItem("ud")
    ? JSON.parse(localStorage.getItem("ud")!)
    : null;

  return !user ? (
    <Navigate to="/auth/sign-in" />
  ) : (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 pt-4">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export { PublicRoutes, ProtectedRoutes };
