import { useState } from "react";

import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Textarea,
  Input,
  Typography,
} from "@material-tailwind/react";

import reactIcon from "/assets/react.svg";
import axios from "axios";

interface PostFormProps {
  attachement: File | null;
  content: string;
}

const PostForm = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [postData, setPostData] = useState<PostFormProps>({
    attachement: null,
    content: "",
  });
  const [message, setMessage] = useState({
    message: "",
    type: "error",
    color: "red",
  });

  const [loading, setLoading] = useState(false);

  const handleOpen = () => setOpen(!open);

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPostData({
      ...postData,
      [e.target.name]: e.target.value,
    });
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log("file change", e.target.files?.[0]);
    if (e.target.files && e.target.files.length > 0) {
      setPostData({
        ...postData,
        attachement: e.target.files[0],
      });
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    try {
      setLoading(true);
      e.preventDefault();

      console.log(postData);
      const post = await axios.post(
        "http://localhost:3001/api/post",
        postData!,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (post.status === 201) {
        setMessage({
          message: "Post created successfully",
          type: "success",
          color: "green",
        });

        setPostData({
          attachement: null,
          content: "",
        });
      }
    } catch (error) {
      setMessage({
        message: error.response.data.errors,
        type: "error",
        color: "red",
      });
      console.log("Error while creating post", error);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1500);

      setTimeout(() => {
        setMessage({
          message: "",
          type: "error",
          color: "red",
        });
      }, 4000);
    }
  }
  return (
    <>
      {/* MODAL */}
      <Dialog className="p-4" open={open} handler={handleOpen}>
        <form id="new-post" encType="multipart/form-data">
          <DialogHeader>
            <Typography variant="h4">Write your thoughts here...</Typography>
          </DialogHeader>
          <DialogBody>
            <Typography variant="small" color={message.color} className="mb-4">
              {message.message}
            </Typography>
            <Textarea
              onChange={handleContentChange}
              name="content"
              className="w-full"
              variant="outlined"
              label="What's on your mind?"
              size="lg"
              value={postData?.content}
              required
            ></Textarea>
          </DialogBody>
          <DialogFooter className="flex justify-between items-center">
            <div className="">
              <Input
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                type="file"
                name="attachement"
                onChange={handleFileChange}
              />
              <Typography
                className="mt-1 text-sm text-gray-500 dark:text-gray-300"
                variant="small"
              >
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </Typography>
            </div>
            <div className="">
              <Button
                variant="text"
                color="red"
                onClick={handleOpen}
                className="mr-1"
                disabled={loading}
              >
                <span>Cancel</span>
              </Button>
              <Button
                type="button"
                variant="gradient"
                className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 shadow-lg shadow-blue-500/50 dark:shadow-lg dark:shadow-blue-800/80"
                disabled={loading}
                onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
                  handleSubmit(e)
                }
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
                  "Post"
                )}
              </Button>
            </div>
          </DialogFooter>
        </form>
      </Dialog>
      {/* MODAL ENDS */}

      {/* POST AREA */}
      <section className="mb-12 flex flex-col items-center justify-center w-full h-32 bg-white rounded-2xl border shadow-sm dark:bg-gray-800 dark:border-gray-700 p-10">
        {/* NEW POST FORM */}
        <div className="flex gap-4 items-center justify-center w-full">
          {/* PROFILE PHOTO */}
          <div className="flex items-center gap-4">
            <img
              src={reactIcon}
              alt="Profile"
              className="w-10 h-10 rounded-full"
            />
          </div>
          {/* PROFILE PHOTO ENDS */}

          {/* INPUT FIELD */}

          <Button
            className="rounded-full flex justify-center items-center gap-5"
            type="button"
            onClick={handleOpen}
            variant="outlined"
            color="light-blue"
          >
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.133 12.632v-1.8a5.406 5.406 0 0 0-4.154-5.262.955.955 0 0 0 .021-.106V3.1a1 1 0 0 0-2 0v2.364a.955.955 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C6.867 15.018 5 15.614 5 16.807 5 17.4 5 18 5.538 18h12.924C19 18 19 17.4 19 16.807c0-1.193-1.867-1.789-1.867-4.175ZM6 6a1 1 0 0 1-.707-.293l-1-1a1 1 0 0 1 1.414-1.414l1 1A1 1 0 0 1 6 6Zm-2 4H3a1 1 0 0 1 0-2h1a1 1 0 1 1 0 2Zm14-4a1 1 0 0 1-.707-1.707l1-1a1 1 0 1 1 1.414 1.414l-1 1A1 1 0 0 1 18 6Zm3 4h-1a1 1 0 1 1 0-2h1a1 1 0 1 1 0 2ZM8.823 19a3.453 3.453 0 0 0 6.354 0H8.823Z" />
            </svg>

            <p>What's on your mind?</p>
          </Button>

          {/* INPUT FIELD ENDS */}
        </div>
        {/* NEW POST FORM ENDS */}

        {/* BUTTONS */}
        {/* BUTTONS ENDS */}
      </section>
      {/* POST AREA ENDS */}
    </>
  );
};

export default PostForm;
