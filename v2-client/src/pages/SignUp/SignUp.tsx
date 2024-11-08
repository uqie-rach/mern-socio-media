import axios from "axios";
import {
  Card,
  Input,
  Typography,
  Button,
  Select,
  Option,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { useState } from "react";
import { Link } from "react-router-dom";

interface FormData {
  firstName: string;
  lastName: string;
  occupation: string;
  location: string;
  email: string;
  password: string;
  attachement: File | null;
}

const SignUp = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    email: "",
    password: "",
    attachement: null,
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

  function handleSelectChange(value: string) {
    console.log("location", value);
    setFormData({
      ...formData,
      location: value,
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file change", e.target.files?.[0]);
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        attachement: e.target.files[0],
      });
    }
  };

  async function handleSubmit(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    try {
      setLoading(true);
      e.preventDefault();

      const newUser = await axios.post(
        "http://localhost:3001/api/auth/register",
        formData!,
        {
          method: "post",
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (newUser.status === 201) {
        setModalContent({
          title: "Success!",
          body: "You have successfully registered.",
          color: "green",
          status: true,
        });
        handleOpen();
      }
    } catch (error) {
      console.log("Error while submitting form", error);
      setModalContent({
        title: "Error!",
        body: error.response.data.errors,
        color: "red",
        status: false,
      });
      handleOpen();
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);
      setFormData({
        firstName: "",
        lastName: "",
        occupation: "",
        location: "",
        email: "",
        password: "",
        attachement: null,
      });
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
          Sign Up
        </Typography>
        <Typography
          color="gray"
          className="mt-1 font-normal"
          placeholder={undefined}
          onPointerEnterCapture={undefined}
          onPointerLeaveCapture={undefined}
        >
          Nice to meet you! Enter your details to register.
        </Typography>
        <form className="mt-8 mb-2">
          <div className="mb-1 flex flex-col gap-6">
            {/* FIRST ROW OF INPUTS [FIRSTNAME | LASTNAME] */}
            <div className="flex gap-4">
              <div className="mb-3 flex-1">
                <Input
                  onChange={handleChange}
                  type="text"
                  name="firstName"
                  size="lg"
                  placeholder="First Name"
                  variant="outlined"
                  label="First Name"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <div className="mb-3 flex-1">
                <Input
                  onChange={handleChange}
                  type="text"
                  name="lastName"
                  size="lg"
                  placeholder="Last Name"
                  variant="outlined"
                  label="Last Name"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
            </div>
            {/* FIRST ROW OF INPUTS [FIRSTNAME | LASTNAME] */}

            {/* SECOND ROW OF INPUTS [OCCUPATION | LOCATION] */}
            <div className="flex gap-4">
              <div className="mb-3 flex-1">
                <Input
                  onChange={handleChange}
                  type="text"
                  name="occupation"
                  size="lg"
                  placeholder="Occupation"
                  variant="outlined"
                  label="Occupation"
                  required
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                  crossOrigin={undefined}
                />
              </div>
              <div className="mb-3 flex-1">
                <Select
                  label="Location (by contintent)"
                  size="lg"
                  onChange={(value) => handleSelectChange(value!)}
                  value={formData.location}
                  placeholder={undefined}
                  onPointerEnterCapture={undefined}
                  onPointerLeaveCapture={undefined}
                >
                  <Option value="asia">Asia</Option>
                  <Option value="europe">Europe</Option>
                  <Option value="africa">Africa</Option>
                  <Option value="north-america">North America</Option>
                  <Option value="south-america">South America</Option>
                  <Option value="australia">Australia</Option>
                  <Option value="antarctica">Antarctica</Option>
                </Select>
              </div>
            </div>
            {/* SECOND ROW OF INPUTS [OCCUPATION | LOCATION] */}

            {/* EMAIL FIELD */}
            <div className="mb-3">
              <Input
                onChange={handleChange}
                type="email"
                name="email"
                size="lg"
                placeholder="Email"
                variant="outlined"
                label="Email"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
            </div>
            {/* EMAIL FIELD ENDS */}

            {/* PASSWORD FIELD */}
            <div className="mb-3">
              <Input
                onChange={handleChange}
                type="password"
                name="password"
                size="lg"
                placeholder="********"
                variant="outlined"
                label="password"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Use at least 5 characters, one uppercase, one lowercase and one
                number.
              </Typography>
            </div>
            {/* PASSWORD FIELD ENDS */}

            {/* IMAGE FIELD  */}
            <div className="mb-3">
              <Input
                onChange={handleFileChange}
                type="file"
                name="attachement"
                size="lg"
                accept="image/*.jpg, image/*.png, image/*.jpeg"
                placeholder="File"
                variant="outlined"
                label="File"
                required
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
                crossOrigin={undefined}
              />
              <Typography
                variant="small"
                color="gray"
                className="mt-2 flex items-center gap-1 font-normal"
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="-mt-px h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm8.706-1.442c1.146-.573 2.437.463 2.126 1.706l-.709 2.836.042-.02a.75.75 0 01.67 1.34l-.04.022c-1.147.573-2.438-.463-2.127-1.706l.71-2.836-.042.02a.75.75 0 11-.671-1.34l.041-.022zM12 9a.75.75 0 100-1.5.75.75 0 000 1.5z"
                    clipRule="evenodd"
                  />
                </svg>
                Allowed file types: png, jpg, jpeg.
              </Typography>
            </div>
            {/* IMAGE FIELD ENDS */}
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
              "Sign Up"
            )}
          </Button>
          <Typography
            color="gray"
            className="mt-4 text-center font-normal"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Already have an account?{" "}
            <Link to="/auth/sign-in" className="font-medium text-gray-900">
              Sign In
            </Link>
          </Typography>
        </form>
      </Card>

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
            <Link to="/auth/sign-in" className="text-blue-500">
              Go Sign In
            </Link>
          </Button>
        </DialogFooter>
      </Dialog>
    </section>
  );
};

export default SignUp;
