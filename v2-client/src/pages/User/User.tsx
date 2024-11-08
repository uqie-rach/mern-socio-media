import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  picturePath: string;
  friends: string[];
  location: string;
  occupation: string;
  viewedProfile: number;
  impression: number;
}
const User = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<any>({
    firstName: "",
    lastName: "",
    occupation: "",
    location: "",
    email: "",
    picturePath: "",
    friends: [],
    viewedProfile: 0,
    impression: 0,
  });
  const [loading, setLoading] = useState(false);

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

      if (!formData?.picturePath) {
        setFormData({ ...formData!, picturePath: user?.picturePath ?? "" });
        return;
      }

      console.log(formData);

      const newUser = await axios.put(
        `http://localhost:4001/api/user/${user?._id}`,
        formData!,
        {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (newUser.status === 200) {
        alert("Updated successfully!");

        fetchUser();
      }
    } catch (error) {
      alert(error.response.data.errors);
      console.log("Error while updating profile...", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
        window.location.reload();
      }, 1500);
      setFormData(null);
    }
  }

  const fetchUser = async () => {
    try {
      const userId = localStorage.getItem("id");
      console.log(userId);
      const temp = await axios.get(`http://localhost:4001/api/user/${userId}`, {
        withCredentials: true,
      });

      localStorage.setItem("ud", JSON.stringify(temp.data));

      setFormData({
        firstName: temp?.data?.firstName,
        lastName: temp?.data?.lastName,
        email: temp?.data?.email,
        occupation: temp?.data?.occupation,
        location: temp?.data?.location,
        picturePath: temp?.data?.picturePath,
      });

      setUser(temp.data);
    } catch (error) {
      console.log("Error while fetching user...", error);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      const userId = localStorage.getItem("id");
      const res = await axios.delete(
        `http://localhost:4001/api/user/${userId}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        alert("Account deleted successfully!");
        localStorage.clear();
        window.location.href = "/auth/sign-in";
      }
    } catch (error) {
      console.log("Error while deleting account...", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <section className="mt-10 relative">
      <div className="container py-6 px-4 relative flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-fit">
        <div className="flex gap-5 items-center">
          <Button
            onClick={() => setIsEditing(!isEditing)}
            className="w-fit"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            {isEditing ? "Cancel" : "Edit"}
          </Button>

          <Button
            onClick={handleDeleteAccount}
            className="w-fit"
            color="red"
            placeholder={undefined}
            onPointerEnterCapture={undefined}
            onPointerLeaveCapture={undefined}
          >
            Delete Account
          </Button>
        </div>

        {isEditing ? (
          <>
            {/* Update form */}
            <form className="mt-8 mb-2">
              <div className="mb-1 flex flex-col gap-6">
                {/* FIRST ROW OF INPUTS [FIRSTNAME | LASTNAME] */}
                <div className="flex gap-4">
                  <div className="mb-3 flex-1">
                    <Input
                      onChange={handleChange}
                      value={formData?.firstName ?? ""}
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
                      value={formData?.lastName ?? ""}
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
                      value={formData?.occupation ?? ""}
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
                      value={formData?.location ?? ""}
                      placeholder={undefined}
                      onPointerEnterCapture={undefined}
                      onPointerLeaveCapture={undefined}
                    >
                      {[
                        "asia",
                        "europe",
                        "africa",
                        "north-america",
                        "south-america",
                        "australia",
                        "antarctica",
                      ].map((continent: string, idx: number) => (
                        <Option key={idx} value={continent}>
                          {continent?.split("-").join(" ")}
                        </Option>
                      ))}
                    </Select>
                  </div>
                </div>
                {/* SECOND ROW OF INPUTS [OCCUPATION | LOCATION] */}

                {/* EMAIL FIELD */}
                <div className="mb-3">
                  <Input
                    onChange={handleChange}
                    value={formData?.email ?? ""}
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
                loading={loading}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleSubmit(e)
                }
                placeholder={undefined}
                onPointerEnterCapture={undefined}
                onPointerLeaveCapture={undefined}
              >
                Save
              </Button>
            </form>
          </>
        ) : (
          <>
            <div className="relative mx-4 mt-4 w-[400px] overflow-hidden text-gray-700 bg-white shadow-lg bg-clip-border rounded-xl h-80">
              <img
                className="w-full h-full object-cover"
                src={`https://drive.google.com/thumbnail?id=${user?.picturePath}&sz=w500`}
                alt={user?.firstName}
                loading="lazy"
              />
            </div>
            <div className="p-6 text-center">
              <h4 className="block mb-2 font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900">
                {user?.firstName} {user?.lastName}
              </h4>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                {user?.occupation}
              </p>
              <p className="block font-sans text-base antialiased font-medium leading-relaxed text-transparent bg-clip-text bg-gradient-to-tr from-blue-gray-600 to-blue-gray-400">
                {user?.location}
              </p>
            </div>
            <div className="flex justify-center p-6 pt-2 gap-7"></div>
          </>
        )}
      </div>

      {/* Update form ends */}
    </section>
  );
};

export default User;
