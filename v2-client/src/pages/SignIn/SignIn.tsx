import {
  Card,
  Input,
  Typography,
  Button,
  DialogHeader,
  Dialog,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";

interface SignInProps {
  email: string;
  password: string;
}

const SignIn = () => {
  const [formData, setFormData] = useState<SignInProps>({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    title: "",
    body: "",
    color: "",
    status: false,
  });

  const handleOpen = () => setOpen(!open);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      e.preventDefault();

      console.log(formData);
      const newUser = await axios.post(
        "http://localhost:3001/api/auth/login",
        JSON.stringify(formData!),
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          withCredentials: true,
        }
      );

      console.log(newUser.data);
      console.log(newUser);

      if (newUser.status === 200) {
        localStorage.setItem("ud", JSON.stringify(newUser.data));
        localStorage.setItem('id', newUser.data._id);

        setModalContent({
          title: "Success!",
          body: "You have successfully Signed.",
          color: "green",
          status: true,
        });
        handleOpen();
      }
    } catch (error: unknown) {
      console.log("Error while submitting form", error);
      setModalContent({
        title: "Sign in failed!",
        body: error?.response?.data?.errors,
        color: "red",
        status: false,
      });
      handleOpen();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
    }
  }

  return (
    <section className="container">
      <Card
        color="white"
        shadow={true}
        className="w-fit p-10 mx-auto mt-20"
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <Typography
          variant="h4"
          color="blue-gray"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Sign In
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Welcome back!
        </Typography>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Input
              onChange={handleChange}
              required
              variant="standard"
              label="Email"
              name="email"
              size="lg"
              placeholder="name@mail.com"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
            <Input
              onChange={handleChange}
              required
              variant="standard"
              label="Password"
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onPointerEnterCapture={undefined}
              onPointerLeaveCapture={undefined}
              crossOrigin={undefined}
            />
          </div>
          <Button
            className="mt-6"
            fullWidth
            disabled={loading}
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
              handleSubmit(e)
            }
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {loading ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                className="animate-spin h-5 w-5 mx-auto"
              >
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                  className="opacity-25"
                ></circle>
                <path
                  fill="currentColor"
                  d="M12 2a10 10 0 00-7.64 16.28L12 22l7.64-3.72A10 10 0 0012 2zm0 18V4m0 14a8 8 0 110-16 8 8 0 010 16z"
                ></path>
              </svg>
            ) : (
              "Sign In"
            )}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Don't have an account?{" "}
            <Link to="/auth/sign-up" className="font-medium text-blue-500">
              Sign Up
            </Link>
          </Typography>
        </form>
      </Card>

      {/* MODAL */}
      <Dialog
        open={open}
        handler={handleOpen}
        placeholder={undefined}
        onPointerEnterCapture={undefined}
        onPointerLeaveCapture={undefined}
      >
        <DialogHeader
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Typography variant="h5" color={modalContent?.color || "blue-gray"}>
            {modalContent?.title}
          </Typography>
        </DialogHeader>
        <DialogBody
          divider
          className="grid place-items-center gap-4"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          {modalContent?.status ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="text-green-500 h-12 w-12"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17.59L5.41 13L6.83 11.59L10 14.76L17.17 7.59L18.59 9L10 17.59Z"
                fill="currentColor"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              className="text-red-500 h-12 w-12"
            >
              <path
                d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"
                fill="currentColor"
              />
            </svg>
          )}
          <Typography
            color="black"
            variant="h5"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {modalContent?.body}
          </Typography>
        </DialogBody>
        <DialogFooter
          className="space-x-2"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          <Button
            variant="text"
            color="blue-gray"
            onClick={handleOpen}
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            close
          </Button>
          <Button
            variant="gradient"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            <Link to="/feed">Continue to feeds</Link>
          </Button>
        </DialogFooter>
      </Dialog>
      {/* MODAL ENDS */}
    </section>
  );
};

export default SignIn;
